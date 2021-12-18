import { model, Schema } from 'mongoose';

const User: Schema = new Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: String
});

export default model("user", User);
