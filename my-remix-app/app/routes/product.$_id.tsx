import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/models/Product";
import "~/utils/db.server";
import { Cart } from "~/models/Cart";
// Ensure the correct path to ProductType or create the file if it doesn't exist
import { ProductType } from "../types/ProductType";

export const loader = async ({ params }: { params: { _id: string } }) => {
  try {
    const product = await Product.findById(params._id);
    if (!product) throw new Response("Product not found", { status: 404 });
    return json(product);
  } catch (error) {
    console.error("Error loading product:", error);
    throw new Response("Failed to load product", { status: 500 });
  }
};

export const action = async ({ request, params }: { request: Request; params: { _id: string } }) => {
  try {
    const productId = params._id;
    const product = await Product.findById(productId);

    if (!product) {
      throw new Response("Product not found", { status: 404 });
    }

    const cartItem = {
      product_id: productId,
      product_name: product.product_name,
      quantity: 1,
      price: product.final_price,
      currency: product.currency,
    };

    await Cart.addToCart(cartItem);

    return json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw new Response("Failed to add product to cart", { status: 500 });
  }
};
export default function ProductDetail() {
  const product = useLoaderData<typeof loader>();

  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log(`Added ${product.product_name} to cart`);
    alert(`${product.product_name} has been added to your cart!`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.product_name}</h1>
      <img src={product.main_image} alt={product.product_name} style={{ width: "300px", borderRadius: "8px" }} />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> {product.currency} {product.final_price}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>In Stock:</strong> {product.in_stock ? "Yes" : "No"}</p>
      <button 
        onClick={handleAddToCart} 
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Add to Cart
      </button>
    </div>
  );
}
