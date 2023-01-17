import jwt from 'jsonwebtoken'
import config from '../config/auth.config.js'
import { UsersModel } from '../models/UsersModel.js'

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if(!token) {
    return res.status(403).send({msg: 'No token provided!'})
  }

  jwt.verify(
    token, 
    config.secret,
    (err, decoded) => {
      if(err) {
        return res.status(401).send({msg: 'Unauthorized'})
      }
      req.userId = decoded.id
    }
  )
}