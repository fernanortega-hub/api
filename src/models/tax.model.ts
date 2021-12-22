import { model, Schema } from 'mongoose';

const Tax: Schema = new Schema({
    name: String,
    percentage: Number
});

export default model("tax", Tax);