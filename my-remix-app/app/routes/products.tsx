import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { Product } from "~/models/Product";
import "~/utils/db.server";
import productsStyles from "~/styles/products.css";

import type { DataFunctionArgs } from "@remix-run/node";
interface ProductType {
    _id: string;
    main_image: string;
    product_name: string;
    description: string;
    currency: string;
    final_price: number;
    brand: string;
    category: string;
    in_stock: boolean;
    url: string;
}

// Add links export for stylesheet
export const links: LinksFunction = () => [
    { rel: "stylesheet", href: productsStyles }
];

export const loader = async ({ request }: DataFunctionArgs) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    return json({
        products,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        },
    });
};

export default function Products() {
    const { products, pagination } = useLoaderData<typeof loader>();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Product List</h1>
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                {pagination.currentPage > 1 && (
                    <Link to={`/products?page=${pagination.currentPage - 1}`}>
                        <button
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "6px",
                                border: "none",
                                background: "#0070f3",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                                transition: "background 0.2s",
                            }}
                        >
                            &#8592; Previous
                        </button>
                    </Link>
                )}
                <span style={{ alignSelf: "center", fontWeight: "bold", color: "#444" }}>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                {pagination.currentPage < pagination.totalPages && (
                    <Link to={`/products?page=${pagination.currentPage + 1}`}>
                        <button
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "6px",
                                border: "none",
                                background: "#0070f3",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                                transition: "background 0.2s",
                            }}
                        >
                            Next &#8594;
                        </button>
                    </Link>
                )}
            </div>
            <div
                className="products-list"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "2rem",
                    alignItems: "stretch",
                }}
            >
                {products.map((product: any) => (
                    <div
                        key={product._id}
                        className="product-card"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                            padding: "1rem",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img
                                src={product.main_image}
                                alt={product.product_name}
                                style={{
                                    width: "100%",
                                    maxWidth: "180px",
                                    height: "180px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    marginBottom: "1rem",
                                    background: "#f5f5f5",
                                }}
                            />
                            <h3 style={{ margin: "0.5rem 0" }}>{product.product_name}</h3>
                            <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>
                                {product.currency} {product.final_price}
                            </p>
                        </div>
                        <Link to={`/products/${product._id}`}>
                            <button
                                type="button"
                                className="product-details-btn"
                                style={{
                                    width: "100%",
                                    padding: "0.6rem 0",
                                    borderRadius: "6px",
                                    border: "none",
                                    background: "linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.09)",
                                    marginTop: "0.5rem",
                                    transition: "background 0.2s",
                                }}
                            >
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                {pagination.currentPage > 1 && (
                    <Link to={`/products?page=${pagination.currentPage - 1}`}>
                        <button
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "6px",
                                border: "none",
                                background: "#0070f3",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                                transition: "background 0.2s",
                            }}
                        >
                            &#8592; Previous
                        </button>
                    </Link>
                )}
                <span style={{ alignSelf: "center", fontWeight: "bold", color: "#444" }}>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                {pagination.currentPage < pagination.totalPages && (
                    <Link to={`/products?page=${pagination.currentPage + 1}`}>
                        <button
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "6px",
                                border: "none",
                                background: "#0070f3",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                cursor: "pointer",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                                transition: "background 0.2s",
                            }}
                        >
                            Next &#8594;
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
