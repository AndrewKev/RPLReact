import { UsersModel } from "../models/UsersModel.js"
import { FriendshipModel } from "../models/FriendshipModel.js"
import { PostModel } from "../models/PostModel.js";
import { LikeModel } from '../models/LikeModel.js'
import { col, fn } from "sequelize";

export const viewPost = async (req, res) => {
	try {
		const result = await PostModel.findAll()
		res.status(200).json(result)
	} catch (error) {
		console.log(error.message)
	}
}

export const viewFriendPost = async (req, res) => {
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

		let posts = []
		for(let i = 0; i < friend.length; i++) {
			const post = await PostModel.findAll(
				{
					where: {
						idUser: friend[i].idFriend
					}
				}
			)
			posts.push(post)
		}

    const countLike = await LikeModel.findAll(
      {
        attributes: ['idPost', [fn('COUNT', col('idUser')), 'totalLike']],
        group: 'idPost'
      }
    )

    
    let friends = []
    for(let i = 0; i < friend.length; i++) {
      const friendUser = await UsersModel.findAll(
        {
          where: {
            idUser: friend[i].idFriend
          }
        }
      )
      friends.push(friendUser)
    }

    let rslt = []
    rslt.push(countLike)
    rslt.push(posts)
    rslt.push(friends)

    // res.status(200).json(rslt)
    // res.status(200).json(posts)
    res.status(200).json({like: countLike, postsFriends: posts, teman: friends})
  } catch (error) {
    console.log(error.message)
  }
}

export const testRaw = async (req, res) => {
  try {
    // UsersModel.sequelize.query
    const user1 = await UsersModel.findAll(
      {
        attributes:['idUser'],
        where: {
          username: req.params.username
        }
      }
    )

    

    const [selfPost, selfMetaData] = await PostModel.sequelize.query(`SELECT post.idPost, post.description, post.url, users.username, post.idUser, users.photoProfile, CONCAT(DATE(post.createdAt), ' ', TIME(post.createdAt)) AS 'postCreated'
    FROM posts as post 
    JOIN users ON users.idUser = post.idUser
    WHERE post.idUser = ${user1[0].idUser};`)

    const [results, metadata] = await PostModel.sequelize.query(`SELECT post.idPost, post.description, post.url, users.username, post.idUser, users.photoProfile, CONCAT(DATE(post.createdAt), ' ', TIME(post.createdAt)) AS 'postCreated'
    FROM posts as post
    JOIN users ON users.idUser = post.idUser
    WHERE post.idUser IN (SELECT idFriend from friendships WHERE idUser = ${user1[0].idUser});`)

    const [totalLike, likeMetadata] = await LikeModel.sequelize.query(`SELECT idPost, COUNT(idPost) as "totalLike"
    FROM likes
    GROUP BY idPost;`)

    const arrPost = []

    for(let i = 0; i < selfPost.length; i++) {
      results.push(selfPost[i])
    }

    results.sort((a, b) => {
      if(a.postCreated > b.postCreated) {
        return -1
      }
    })

    let dataLiked = []
    for(let i = 0; i < results.length; i++) {
      const post1 = await PostModel.findAll(
        {
          attributes: ['idPost'],
          where: {
            idPost: results[i].idPost
          }
        }
      )
      const [liked, likedMetadata] = await LikeModel.sequelize.query(`SELECT * FROM likes WHERE idUser = ${user1[0].idUser} && idPost = ${post1[0].idPost};`)

      dataLiked.push(liked)
    }

    for(let i = 0; i < results.length; i++) {
      const dataPost = {}
      let ttlLike = 0
      dataPost.idPost = results[i].idPost
      dataPost.description = results[i].description
      dataPost.url = results[i].url
      for(let j = 0; j < totalLike.length; j++) {
        if(totalLike[j].idPost == dataPost.idPost) {
          ttlLike = totalLike[j].totalLike
        } 
        dataPost.totalLike = ttlLike
      }
      dataPost.username = results[i].username
      dataPost.idUser = results[i].idUser
      dataPost.photoProfile = results[i].photoProfile
      dataPost.postCreated = results[i].postCreated
      if(dataLiked[i].length != 0) {
        dataPost.isLiked = true
      } else {
        dataPost.isLiked = false
      }
      arrPost.push(dataPost)
    }

    // res.status(200).json({totalLike, results})
    res.status(200).json(arrPost)
    // res.status(200).json(dataLiked[18].length)
  } catch (error) {
    console.log(error.message)
  }
}

export const showAllUser = async (req, res) => {
  try {
    const user1 = await UsersModel.findAll(
      {
        attributes:['idUser'],
        where: {
          username: req.params.username
        }
      }
    )
    const [result, metadata] = await UsersModel.sequelize.query(`SELECT u.idUser, u.username, u.photoProfile
    FROM users u
    WHERE u.idUser <> ${user1[0].idUser} && u.idUser NOT IN (SELECT idFriend FROM friendships WHERE idUser = ${user1[0].idUser});`)

    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
  }
}