import { model, Schema } from 'mongoose';

const Warehouse: Schema = new Schema({
    name: String,
    address: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
});

export default model("warehouse", Warehouse);