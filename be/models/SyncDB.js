import { UsersModel } from "./UsersModel.js";
import { FriendshipModel } from './FriendshipModel.js'
import { PostModel } from './PostModel.js'
import { ShareModel } from './ShareModel.js'
import { LikeModel } from "./LikeModel.js";
import { CommentModel } from "./CommentModel.js";
import { PhotosModel } from "./PhotosModel.js";

await UsersModel.sync({ alter: true })
console.log("Tabel users berhasil dibuat");

await FriendshipModel.sync();
console.log("Tabel friendship berhasil dibuat");

await PostModel.sync({ alter: true });
console.log("Tabel Post berhasil dibuat");

await ShareModel.sync();
console.log("Tabel Share berhasil dibuat");

await LikeModel.sync({ alter: true });
console.log("Tabel likes berhasil dibuat");

await CommentModel.sync();
console.log("Tabel comments berhasil dibuat");

// await PhotosModel.sync();
// console.log("Tabel Photos berhasil dibuat");