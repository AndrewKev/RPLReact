import { DataTypes, Model } from "sequelize";
import db from '../config/Database.js'

export class ShareModel extends Model{}

ShareModel.init({
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
    idFriend:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"idUser"
        }
    }
},
{
	sequelize:db,
	modelName:'shares'
});

/* UNCOMMENT UNTUK RUN */
// await ShareModel.sync();
// console.log("Tabel Share berhasil dibuat");