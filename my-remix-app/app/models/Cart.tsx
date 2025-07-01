import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for the Cart document
export interface ICart extends Document {
    productId: string;
    product_name: string;
    main_image?: string;
    final_price: number;
    currency: string;
    brand?: string;
    category?: string;
    in_stock?: boolean;
    url?: string;
    quantity: number;
}

// Define the Mongoose schema
const CartSchema: Schema = new Schema({
    productId: { type: String, required: true },
    product_name: { type: String, required: true },
    main_image: { type: String },
    final_price: { type: Number, required: true },
    currency: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
    in_stock: { type: Boolean },
    url: { type: String },
    quantity: { type: Number, required: true },
});

// Create the Mongoose model
const Cart = mongoose.model<ICart>("cart", CartSchema);

export default Cart;