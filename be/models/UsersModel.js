import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

// const {DataTypes} = Sequelize

export class UsersModel extends Model{}

UsersModel.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoProfile: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.ibb.co/L5MRjKd/default-1.jpg'
    },
    birthday: {
      type: DataTypes.DATEONLY
    },
    country: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize: db,
    modelName: 'users'
  }
)

// const User = db.define('users', {
//   idUser: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   photoProfile: {
//     type: DataTypes.STRING,
//     defaultValue: 'https://i.ibb.co/L5MRjKd/default-1.jpg'
//   },
//   birthday: {
//     type: DataTypes.DATE
//   },
//   country: {
//     type: DataTypes.STRING
//   },
//   bio: {
//     type: DataTypes.STRING
//   }
// })

// export default UsersModel


/* UNCOMMENT UNTUK RUN */
// await UsersModel.sync();
// console.log("Tabel users berhasil dibuat");



// // --- TESTING BIKIN USER BARU --- //
// const check = await UsersModel.findOne({where: {username: 'jane'}})
// const check2 = await UsersModel.findOne({where: {username: 'doe'}})
// const check3 = await UsersModel.findOne({where: {username: 'alex'}})
// const check4 = await UsersModel.findOne({where: {username: 'mekel'}})

// if(check === null) {
//   const jane = await UsersModel.create({ username: "jane", password: "jane" });
//   console.log("jane's auto-generated ID:", jane.idUser);
// }

// if(check2 === null) {
//   const doe = await UsersModel.create({ username: "doe", password: "doe" });
//   console.log("doe's auto-generated ID:", doe.idUser);
// }

// if(check3 === null) {
//   const alex = await UsersModel.create({ username: "alex", password: "alex" });
//   console.log("alex's auto-generated ID:", alex.idUser);
// }

// if(check4 === null) {
//   const mekel = await UsersModel.create({ username: "mekel", password: "mekel" });
//   console.log("mekel's auto-generated ID:", mekel.idUser);
// }