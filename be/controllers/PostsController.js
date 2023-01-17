import { PostModel } from "../models/PostModel.js";
import { LikeModel } from "../models/LikeModel.js";
import { CommentModel } from "../models/CommentModel.js";
import { ShareModel } from "../models/ShareModel.js";
import { PhotosModel } from "../models/PhotosModel.js";
import { UsersModel } from "../models/UsersModel.js";

export const getAllPost = async (req, res) => {
  try {
    const result = await PostModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllLikes = async (req, res) => {
  try {
    const result = await LikeModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllComments = async (req, res) => {
  try {
    const result = await CommentModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllShares = async (req, res) => {
  try {
    const result = await ShareModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}

export const getAllPhotos = async (req, res) => {
  try {
    const result = await PhotosModel.findAll()
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}


// --- METHOD --- //
export const userPostText = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        where: {
          username: req.params.username
        }
      }
    )
    const newPost = await PostModel.create({idUser: user[0].idUser, description: req.body.description})
    res.status(201).json({msg: "Post berhasil diupload", isiPost: newPost})
  } catch (error) {
    console.log(error.message)
  }
}

export const userPostImage = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        where: {
          username: req.params.username
        }
      }
    )

    const newGambar = await PostModel.create({idUser: user[0].idUser, url: req.body.url})
    res.status(201).json({msg: "Post gambar berhasil diupload", isiPost: newGambar})
  } catch (error) {
    console.log(error.message)
  }
}

export const deletePost = async (req, res) => {
  try {
    await LikeModel.destroy(
      {
        where: {
          idPost: req.params.idPost
        }
      }
    )
    await CommentModel.destroy(
      {
        where: {
          idPost: req.params.idPost
        }
      }
    )
    await ShareModel.destroy(
      {
        where: {
          idPost: req.params.idPost
        }
      }
    )
    const dataPost = await PostModel.destroy(
      {
        where: {
          idPost: req.params.idPost
        }
      }
    )
    res.status(200).json({ msg: "Post berhasil dihapus", idPost: dataPost })
  } catch (error) {
    console.log(error.message)
  }
}

export const likePost = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )

    const like = LikeModel.create(
      {
        idUser: user[0].idUser,
        idPost: req.params.idPost
      }
    )

    res.status(201).json({msg: 'Post liked', like})
  } catch (error) {
    console.log(error.message)
  }
}

export const unLike = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )

    await LikeModel.destroy(
      {
        where: {
          idUser: user[0].idUser,
          idPost: req.params.idPost
        }
      }
    )

    res.status(200).json({msg: 'Berhasil Unlike'})
  } catch (error) {
    console.log(error.message)
  }
}

export const isLike = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    const post = await PostModel.findAll(
      {
        attributes: ['idPost'],
        where: {
          idPost: req.params.idPost
        }
      }
    )
    const [liked, metadata] = await LikeModel.sequelize.query(`SELECT * FROM likes WHERE idUser = ${user[0].idUser} && idPost = ${post[0].idPost};`)

    res.status(200).json(liked)
  } catch (error) {
    console.log(error.message)
  }
}

export const showComment = async (req, res) => {
  try {

    const comment = await CommentModel.findAll(
      {
        where: {
          idPost: req.params.idPost
        }
      }
    )

    let usr = []
    for(let i = 0; i < comment.length; i++) {
      const userComment = await UsersModel.findAll(
        {
          attributes: ['idUser','username', 'photoProfile'],
          where: {
            idUser: comment[i].idUser
          }
        }
      )
      usr.push(userComment[0])
    }

    const userPost = await UsersModel.sequelize.query(`SELECT u.username as "usernamePost", u.photoProfile, p.idPost, p.description, p.url, CONCAT(DATE(p.createdAt), ' ', TIME(p.createdAt)) as "postCreated" 
    FROM posts as p
    JOIN users as u ON p.idUser = u.idUser
    WHERE idPost = ${req.params.idPost};`)

    let arrComment = []
    for(let i = 0; i < comment.length; i++) {
      const objComment = {}

      objComment.idUserComment = comment[i].idUser
      objComment.username = usr[i].username
      objComment.photoProfile = usr[i].photoProfile
      objComment.idPost = comment[i].idPost
      objComment.userComment = comment[i].comment
      // objComment.createdAt = comment[i].createdAt

      arrComment.push(objComment)
    }

    

    res.status(200).json({userPost: userPost[0], arrComment})
  } catch (error) {
    console.log(error.message)
  }
}

export const willComment = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    const usrCmnt = await CommentModel.create(
      {
        idUser: user[0].idUser,
        idPost: req.params.idPost,
        comment: req.body.comment
      }
    )
    
    res.status(201).json({msg: 'Berhasil mengirim comment', usrCmnt})
  } catch (error) {
    console.log(error)
  }
}

export const share = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.body.username
        }
      }
    )
    const shared = ShareModel.create(
      {
        idUser: user[0].idUser,
        idPost: req.body.idPost,
        idFriend: req.body.idFriend,
      }
    )

    res.status(201).json({msg: "Share berhasil", shared})
  } catch (error) {
    console.log(error.message)
  }
}

export const getSharedContent = async (req, res) => {
  try {
    const user = await UsersModel.findAll(
      {
        attributes: ['idUser'],
        where: {
          username: req.params.username
        }
      }
    )

    const [shared, rowShared] = await PostModel.sequelize.query(`SELECT post.idPost, post.description, post.url, users.username, post.idUser, users.photoProfile, CONCAT(DATE(post.createdAt), ' ', TIME(post.createdAt)) AS 'postCreated'
    FROM posts as post 
    JOIN users ON users.idUser = post.idUser
    WHERE post.idPost IN (SELECT idPost FROM shares WHERE idFriend = ${user[0].idUser});`)

    const [totalLike, likeMetadata] = await LikeModel.sequelize.query(`SELECT idPost, COUNT(idPost) as "totalLike"
    FROM likes
    GROUP BY idPost;`)

    const [usrShare, rowUsrShare] = await ShareModel.sequelize.query(`SELECT s.id, s.idUser, s.idPost, u.username 
    FROM shares as s
    JOIN users as u ON s.idUser = u.idUser
    WHERE s.idFriend = ${user[0].idUser};`)

    let dataLiked = []
    for(let i = 0; i < shared.length; i++) {
      const post1 = await PostModel.findAll(
        {
          attributes: ['idPost'],
          where: {
            idPost: shared[i].idPost
          }
        }
      )
      const [liked, likedMetadata] = await LikeModel.sequelize.query(`SELECT * FROM likes WHERE idUser = ${user[0].idUser} && idPost = ${post1[0].idPost};`)

      dataLiked.push(liked)
    }

    let arrPost = []
    for(let i = 0; i < shared.length; i++) {
      const dataPost = {}
      let ttlLike = 0
      dataPost.idPost = shared[i].idPost
      for(let k = 0; k < usrShare.length; k++) {
        if(usrShare[k].idPost === shared[i].idPost) {
          dataPost.id = usrShare[k].id
          dataPost.whoShare = usrShare[k].username
        }
      }
      dataPost.description = shared[i].description
      dataPost.url = shared[i].url
      for(let j = 0; j < totalLike.length; j++) {
        if(totalLike[j].idPost == dataPost.idPost) {
          ttlLike = totalLike[j].totalLike
        } 
        dataPost.totalLike = ttlLike
      }
      dataPost.username = shared[i].username
      dataPost.idUser = shared[i].idUser
      dataPost.photoProfile = shared[i].photoProfile
      dataPost.postCreated = shared[i].postCreated
      if(dataLiked[i].length != 0) {
        dataPost.isLiked = true
      } else {
        dataPost.isLiked = false
      }
      arrPost.push(dataPost)
    }

    res.status(200).json(arrPost)
    // res.status(200).json(usrShare)
  } catch (error) {
    console.log(error)
  }
}