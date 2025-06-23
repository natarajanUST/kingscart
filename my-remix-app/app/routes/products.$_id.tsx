import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/models/Product";
import "~/utils/db.server";

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

export default function ProductDetail() {
  const product = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.product_name}</h1>
      <img src={product.main_image} alt={product.product_name} style={{ width: "300px", borderRadius: "8px" }} />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> {product.currency} {product.final_price}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>In Stock:</strong> {product.in_stock ? "Yes" : "No"}</p>
    </div>
  );
}
