import jwt from 'jsonwebtoken'
import { UsersModel } from '../models/UsersModel.js'

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  // const cookieToken = req.cookies.refreshToken

  // const user = await UsersModel.findAll(
  //   {
  //     where: {
  //       refresh_token: token
  //     }
  //   }
  // )

  // console.log(user)

  if(token == null) return res.sendStatus(401)

  jwt.verify(token, 
             process.env.ACCESS_TOKEN_SECRET, 
             (err, decoded) => {
              if(err) return res.sendStatus(403)
              req.username = decoded.username
              next()
             }
            )
}