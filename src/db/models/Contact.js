import { Schema,  model } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email:  {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
     contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        default: "personal",
        requried: true,
    },
},{
    timestamps: true,
    versionKey: false,
});

const Contact = model('contact', contactSchema);

export default Contact;
