import { Schema, model } from "mongoose";
import { mongooseSaveError, setUpdateSettings } from "./hooks.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:  {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },

}, {
    timestamps: true,
    versionKey: false,
});

userSchema.post('save', mongooseSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', mongooseSaveError);

const User = model('user', userSchema);

export default User;
