import { model, Schema } from 'mongoose';

const Provider: Schema = new Schema({
    name: String,
    contact: String
});

export default model("provider", Provider);
