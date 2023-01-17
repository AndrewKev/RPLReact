import { UsersModel } from "../models/UsersModel.js"
import { FriendshipModel } from "../models/FriendshipModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PostModel } from "../models/PostModel.js"
import { LikeModel } from "../models/LikeModel.js"

export const getUsers = async (req, res) => {
  try {
    const result = await UsersModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getFriend = async (req, res) => {
  try {
    const result = await FriendshipModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

// --- METHOD
export const login = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        where: {
          username: req.body.username
        }
      }
    )
    const match = await bcrypt.compare(req.body.password, user[0].password)
    if(!match) {
      res.status(400).json({msg: 'Password salah', bodyPass: req.body.password, pass: user[0].password})
      return
    }
    const idUser = user[0].idUser
    const username = user[0].username
    const refreshToken = jwt.sign(
      {idUser, username},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '1d'}
    )

    // update token user
    await UsersModel.update(
      {
        refresh_token: refreshToken
      },
      {
        where: {
          idUser: idUser
        }
      }
    )

    res.cookie('refreshToken', 
                refreshToken, 
                {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000
                }
              )
    res.json({refreshToken})

  } catch (error) {
    // res.send(error)
    res.status(404).json({msg: 'Username tidak ditemukan'})
  }
}

export const logout = async (req, res) => {
  // const refreshToken = req.cookie.refreshToken
  // if(!refreshToken) return res.sendStatus(204)

  const user = await UsersModel.findAll(
    {
      where: {
        username: req.body.username
      }
    }
  )
  if(!user[0]) return res.sendStatus(204)

  const idUser = user[0].idUser
  await UsersModel.update(
    {
      refresh_token: null
    },
    {
      where: {
        idUser: idUser
      }
    }
  )
  res.clearCookie('refreshToken')
  // console.log(req.cookie.refreshToken)
  return res.sendStatus(200)
}

export const register = async (req, res) => {
  const {username, password} = req.body
  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(password, salt) 
  try {
    const checkUserExist = await UsersModel.findOne(
      {
        where: {
          username: username
        }
      }
    )

    if(!checkUserExist) {
      const regis = await UsersModel.create({username: username, password: hashPassword})
      res.status(200).json(regis)
    } else {
      return res.status(400).send(
        {msg: 'User telah terdaftar'}
      )
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        where: {
          username: req.params.username
        }
      }
    )

    const listPosts = []
    const [selfPost, selfMetaData] = await PostModel.sequelize.query(`SELECT post.idPost, post.description, post.url, users.username, post.idUser, users.photoProfile, CONCAT(DATE(post.createdAt), ' ', TIME(post.createdAt)) AS 'postCreated'
    FROM posts as post 
    JOIN users ON users.idUser = post.idUser
    WHERE post.idUser = ${user[0].idUser};`)

    const [totalLike, likeMetadata] = await LikeModel.sequelize.query(`SELECT idPost, COUNT(idPost) as "totalLike"
    FROM likes
    GROUP BY idPost;`)

    let dataLiked = []
    for(let i = 0; i < selfPost.length; i++) {
      const post1 = await PostModel.findAll(
        {
          attributes: ['idPost'],
          where: {
            idPost: selfPost[i].idPost
          }
        }
      )
      const [liked, likedMetadata] = await LikeModel.sequelize.query(`SELECT * FROM likes WHERE idUser = ${user[0].idUser} && idPost = ${post1[0].idPost};`)

      dataLiked.push(liked)
    }

    for(let i = 0; i < selfPost.length; i++) {
      const dataPost = {}
      let ttlLike = 0
      dataPost.idPost = selfPost[i].idPost
      dataPost.description = selfPost[i].description
      dataPost.url = selfPost[i].url
      for(let j = 0; j < totalLike.length; j++) {
        if(totalLike[j].idPost == dataPost.idPost) {
          ttlLike = totalLike[j].totalLike
        } 
        dataPost.totalLike = ttlLike
      }
      dataPost.username = selfPost[i].username
      dataPost.idUser = selfPost[i].idUser
      dataPost.photoProfile = selfPost[i].photoProfile
      dataPost.postCreated = selfPost[i].postCreated
      if(dataLiked[i].length != 0) {
        dataPost.isLiked = true
      } else {
        dataPost.isLiked = false
      }
      listPosts.push(dataPost)
    }

    res.status(200).json({user, listPosts})
  } catch (error) {
    console.log(error.message)
  }
}

export const getFriendById = async (req, res) => {
  try {
    const result = await FriendshipModel.findByPk(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getFriendFromUser = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        where: {
          username: req.params.username
        }
      }
    )

    const friend = await FriendshipModel.findAll(
      {
        attributes: ['idFriend'],
        where: {
          idUser: user[0].idUser
        }
      }
    )
    
    let rslt = []
    for(let i = 0; i < friend.length; i++) {
      const friendUser = await UsersModel.findAll(
        {
          where: {
            idUser: friend[i].idFriend
          }
        }
      )
      rslt.push(friendUser)
    }

    let result = []
    for(let i = 0; i < rslt.length; i++) {
      result.push(rslt[i][0])
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const addFriend = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        where: {
          username: req.params.username
        }
      }
    )

    const tambahTeman = await FriendshipModel.create(
      {
        idUser: user[0].idUser,
        idFriend: req.params.idFriend
      }
    )
    res.status(201).json(tambahTeman)
  } catch (error) {
    console.log(error.message)
  }
}

export const delFriend = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await FriendshipModel.sequelize.query(`DELETE FROM friendships WHERE idUser = ${user[0].idUser} && idFriend = ${req.params.idFriend};`)
    res.status(200).json({msg: 'Berhasil menghapus pertemanan'})
  } catch (error) {
    console.log(error.message)
  }
}


// Edit Profile
export const editProfile = async (req, res) => {
  try {
    const {pass} = req.body
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(pass, salt) 
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        username: req.body.username,
        password: hashPassword,
        photoProfile: req.body.photoProfile,
        birthday: req.body.birthday,
        country: req.body.country,
        bio: req.body.bio
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Profil Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}

export const editProfilePicture = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        photoProfile: req.body.photoProfile
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Foto Profil Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}

export const editUsername = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )

    // const checkUserExist = await UsersModel.findOne(
    //   {
    //     where: {
    //       username: username
    //     }
    //   }
    // )

    // if(!checkUserExist) {
      await UsersModel.update(
        {
          username: req.body.username
        },
        {
          where: {
            idUser: user[0].idUser
          }
        }
      )
      res.status(201).json({msg: "Edit Username Berhasil"})
    // } else {
    //   return res.status(400).send(
    //     {msg: 'User telah digunakan'}
    //   )
    // }

  } catch (error) {
    console.log(error.message)
  }
}

export const editBirthday = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        birthday: req.body.birthday
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Birthday Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}

export const editCountry = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        country: req.body.country
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Country Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}

export const editBio = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        bio: req.body.bio
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Bio Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}

export const editPass = async (req, res) => {
  try {
    const {pass} = req.body
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(pass, salt) 
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        password: hashPassword
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Password Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}

export const forgotPass = async (req, res) => {
  try {
    const {pass} = req.body
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(pass, salt) 
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    await UsersModel.update(
      {
        password: hashPassword
      },
      {
        where: {
          idUser: user[0].idUser
        }
      }
    )
    res.status(201).json({msg: "Edit Password Berhasil"})
  } catch (error) {
    console.log(error.message)
  }
}