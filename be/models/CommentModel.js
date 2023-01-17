import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

export class CommentModel extends Model{}

CommentModel.init({
	idUser:{
		type: DataTypes.INTEGER,
		// primaryKey: true,
		references:{
			model:"users",
			key:"idUser"
		}
	},
	idPost:{
		type:DataTypes.INTEGER,
		// primaryKey:true,
		references:{
			model:"posts",
			key:"idPost"
		}
	},
	comment: {
		type: DataTypes.TEXT
	}
},
{
	sequelize:db,
	modelName:'comments'
});

/* UNCOMMENT UNTUK RUN */
// await CommentModel.sync();
// console.log("Tabel comments berhasil dibuat");