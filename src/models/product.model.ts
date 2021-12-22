import { model, Schema } from 'mongoose';

const Product: Schema = new Schema({
    sku: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    taxes: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'tax'
        }
    ],
    description: String,
    weight: {
        type: Number,
        required: true,
    },
    brand: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'brand'
        }
    ],
    boughtAt: [
        { 
            type: Date,
            default: new Date(),
        }
    ],
    provider: { 
        type: Schema.Types.ObjectId,
        ref: 'provider'
    }
});

export default model("product", Product);
