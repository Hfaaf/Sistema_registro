import mongoose, {Schema} from "mongoose";

const DB = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export default DB.model("User", userSchema);