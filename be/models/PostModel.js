import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

export class PostModel extends Model{}

PostModel.init({
	idPost:{
		type: DataTypes.INTEGER,
		primaryKey: true,
        autoIncrement:true,
        onDelete: 'restrict'
	},
	description:{
        type:DataTypes.TEXT,
        // allowNull:false
    },
    url:{
        type:DataTypes.STRING
    },
    idUser:{
        type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"idUser"
        },
        onDelete: 'restrict'
    }
},
{
	sequelize:db,
	modelName:'post'
});


/* UNCOMMENT UNTUK RUN */
// try {
//     await PostModel.sync();
//     console.log("Tabel Post berhasil dibuat");
// } catch (error) {
//     console.log(error)
// }

// --- TESTING BIKIN POST BARU --- //
/* UNCOMMENT UNTUK RUN */
// const check = await PostModel.findOne({where: {idPost: 1}})
// const check2 = await PostModel.findOne({where: {idPost: 2}})
// const check3 = await PostModel.findOne({where: {idPost: 3}})
// const check4 = await PostModel.findOne({where: {idPost: 4}})


// if(check === null) {
//     await PostModel.create({ description: 'hello world', idUser: 4 })
// }

// if(check2 === null) {
//     await PostModel.create({ description: 'welcome', idUser: 1 })
// }

// if(check3 === null) {
//     await PostModel.create({ description: 'test post', idUser: 1 })
// }

// if(check4 === null) {
//     await PostModel.create({ description: 'hellloooo', idUser: 2 })
// }