import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

export class LikeModel extends Model{}

LikeModel.init({
	idUser:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		references:{
			model:"users",
			key:"idUser"
		}
	},
	idPost:{
		type:DataTypes.INTEGER,
		primaryKey:true,
		references:{
			model:"posts",
			key:"idPost",
		},
		onDelete: 'RESTRICT'
	}
},
{
	sequelize:db,
	modelName:'likes'
});

/* UNCOMMENT UNTUK RUN */
// await LikeModel.sync();
// console.log("Tabel likes berhasil dibuat");