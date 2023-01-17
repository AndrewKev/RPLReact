import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

// Relasi
// import { UsersModel } from "./UsersModel.js";

export class FriendshipModel extends Model{}

FriendshipModel.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'idUser'
      }
    },
    idFriend: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'idUser'
      }
    }
  },
  {
    sequelize: db,
    modelName: 'friendship'
  }
)

// UsersModel.hasOne(FriendshipModel)

/* UNCOMMENT UNTUK RUN */
// await FriendshipModel.sync();
// console.log("Tabel friendship berhasil dibuat");

// const check = await FriendshipModel.findOne({where: {idUser: 1, idFriend: 2}})
// const check2 = await FriendshipModel.findOne({where: {idUser: 4, idFriend: 1}})
// const check3 = await FriendshipModel.findOne({where: {idUser: 4, idFriend: 2}})
// const check4 = await FriendshipModel.findOne({where: {idUser: 1, idFriend: 3}})
// const check5 = await FriendshipModel.findOne({where: {idUser: 4, idFriend: 3}})

// if(check === null) {
//   await FriendshipModel.create({ idUser: 1, idFriend: 2 });
//   await FriendshipModel.create({ idUser: 2, idFriend: 1 });
// }

// if(check2 === null) {
//   await FriendshipModel.create({ idUser: 4, idFriend: 1 });
//   await FriendshipModel.create({ idUser: 1, idFriend: 4 });
// }

// if(check3 === null) {
//   await FriendshipModel.create({ idUser: 4, idFriend: 2 });
//   await FriendshipModel.create({ idUser: 2, idFriend: 4 });
// }

// if(check4 === null) {
//   await FriendshipModel.create({ idUser: 1, idFriend: 3 });
//   await FriendshipModel.create({ idUser: 3, idFriend:1 });
// }

// if(check5 === null) {
//   await FriendshipModel.create({ idUser: 4, idFriend: 3 });
//   await FriendshipModel.create({ idUser: 3, idFriend: 4 });
// }