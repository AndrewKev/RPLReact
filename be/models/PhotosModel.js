import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

export class PhotosModel extends Model{}

PhotosModel.init({
	idImage:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
    url:{
        type:DataTypes.STRING
    },
	idPost:{
		type:DataTypes.INTEGER,
		references:{
			model:"posts",
			key:"idPost"
		}
	}
},
{
	sequelize:db,
	modelName:'photos'
});

/* UNCOMMENT UNTUK RUN */
// await PhotosModel.sync();
// console.log("Tabel Photos berhasil dibuat");