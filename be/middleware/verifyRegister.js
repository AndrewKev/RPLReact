import {UsersModel} from '../models/UsersModel.js'

export const checkDuplikatUser = (req, res, next) => {
  UsersModel.findOne(
    {
      where: {
        username: req.body.username
      }
    }
  ).then(user => {
    if (user) {
      res.status(400).send(
        {msg: 'User telah dibuat'}
      )
      return
    }
  })
}