import express from 'express'
import { getUsers, getFriend, getFriendById, getUser, getFriendFromUser, addFriend, register, login, logout, delFriend, editProfile, editProfilePicture, editUsername, editBirthday, editCountry, editBio, editPass, forgotPass } from '../controllers/UsersController.js'
import { getAllPost, getAllLikes, getAllComments, getAllShares, getAllPhotos, userPostText, deletePost, likePost, isLike, unLike, showComment, willComment, userPostImage, share, getSharedContent } from '../controllers/PostsController.js'
import { showAllUser, testRaw, viewFriendPost } from '../controllers/HomeController.js'
import { verifyToken } from '../middleware/VerifyToken.js'

const router = express.Router()

router.get('/user', getUsers)
router.get('/user/friends', getFriend)
router.get('/user/friends/:id', getFriendById)
router.get('/allPosts', getAllPost)
router.get('/allLikes', getAllLikes)
router.get('/allComments', getAllComments)
router.get('/allshares', getAllShares)
router.get('/allPhotos', getAllPhotos)


// --- DATA USERNAME DARI URL
router.post('/auth/register', register)
router.post('/auth/login', login)
router.delete('/:username/logout', logout)
// router.get('/:username', verifyToken, getUser)
// router.get('/:username/home', viewFriendPost)
router.get('/:username', getUser)
// -- edit
router.put('/:username/edit', editProfile)
router.put('/:username/edit-pp', editProfilePicture)
router.put('/:username/edit-username', editUsername)
router.put('/:username/edit-birthday', editBirthday)
router.put('/:username/edit-country', editCountry)
router.put('/:username/edit-bio', editBio)
router.put('/:username/edit-pass', editPass)
//------
router.get('/:username/home', testRaw)
router.get('/comment/:idPost', showComment)
router.post('/:username/comment/:idPost', willComment)
router.get('/:username/friends/', getFriendFromUser)
router.get('/:username/allUser', showAllUser)
router.post('/:username/friends/add/:idFriend', addFriend)
router.delete('/:username/friends/del/:idFriend', delFriend)
router.post('/:username/new-post', userPostText)
router.post('/:username/new-image', userPostImage)
router.post('/:username/like/:idPost', likePost)
router.get('/:username/likedPost/:idPost', isLike)
router.delete('/:username/unlike/:idPost', unLike)
router.delete('/:username/deletePostId/:idPost', deletePost)
router.post('/content/share', share)
router.get('/:username/content/shared', getSharedContent)
// -----
// --- Forgot Password --- //
router.put('/:username/forgot', forgotPass)

export default router