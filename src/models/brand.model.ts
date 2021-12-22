import { model, Schema } from 'mongoose';

const Brand: Schema = new Schema({
    name: String,
});

export default model("brand", Brand);
