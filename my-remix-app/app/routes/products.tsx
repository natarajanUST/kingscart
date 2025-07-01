import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, useFetcher } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import { Product } from "~/models/Product";
import Cart from "~/models/Cart";
import "~/utils/db.server";
import productsStyles from "~/styles/products.css";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faInfoCircle, faArrowLeft, faArrowRight, faCheckCircle, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";

import type { DataFunctionArgs } from "@remix-run/node";
import type { ProductType } from "~/types/ProductType";
// Removed local declaration of ProductType to avoid conflict with the imported type.
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

export const action = async ({ request }: DataFunctionArgs) => {
    const formData = await request.formData();
    const productId = formData.get("productId")?.toString();
    const quantity = parseInt(formData.get("quantity")?.toString() || "1", 10);

    if (!productId || isNaN(quantity) || quantity < 1) {
        return json({ error: "Invalid product or quantity" }, { status: 400 });
    }

    // Fetch product info
    const product = await Product.findById(productId);
    if (!product) {
        return json({ error: "Product not found" }, { status: 404 });
    }


     const updateCart = async (product: any, quantity: number) => {
        const existingCartItem = await Cart.findOne({ productId: product._id });
        if (existingCartItem) {
            await Cart.updateOne(
                { productId: product._id },
                {
                    $set: {
                        product_name: product.product_name,
                        main_image: product.main_image,
                        final_price: product.final_price,
                        currency: product.currency,
                        brand: product.brand,
                        category: product.category,
                        in_stock: product.in_stock,
                        url: product.url,
                    },
                    $inc: { quantity: quantity },
                }
            );
        } else {
            await Cart.create({
                productId: product._id,
                product_name: product.product_name,
                main_image: product.main_image,
                final_price: product.final_price,
                currency: product.currency,
                brand: product.brand,
                category: product.category,
                in_stock: product.in_stock,
                url: product.url,
                quantity: quantity,
            });
        }
    };
    // Optionally, redirect back to products page or return a JSON response
    return redirect("/products");
};

export default function Products() {
    const { products, pagination } = useLoaderData<typeof loader>();

    return (
        <main style={{ padding: "2rem" }} aria-label="Product List Page">
            <h1 tabIndex={-1}>Product List</h1>
            <nav aria-label="Pagination" style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
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
                            aria-label="Go to previous page"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "0.5rem" }} />
                            <span>Prev</span>
                        </button>
                    </Link>
                )}
                <span style={{ alignSelf: "center", fontWeight: "bold", color: "#444" }} aria-live="polite">
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
                            aria-label={`Go to next page, page ${pagination.currentPage + 1}`}
                        >
                            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "0.5rem" }} />
                            <span>Next</span>
                        </button>
                    </Link>
                )}
            </nav>
            <section
                className="products-list"
                aria-label="Products"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "2.5rem",
                    alignItems: "stretch",
                    padding: "1rem 0",
                    background: "#f8fafc",
                    borderRadius: "12px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                }}
            >
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "contents",
                    }}
                >
                {products.map((product: any) => {
                    const fetcher = useFetcher();
                    return (
                        <li
                            key={product._id}
                            className="product-card"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: "90%",
                                background: "#fff",
                                borderRadius: "14px",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                padding: "1.5rem 1.2rem 1.2rem 1.2rem",
                                justifyContent: "space-between",
                                transition: "box-shadow 0.2s, transform 0.2s",
                                border: "1px solid #e5e7eb",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            tabIndex={0}
                            aria-label={`Product: ${product.product_name}`}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.13)";
                                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.02)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                                (e.currentTarget as HTMLElement).style.transform = "none";
                            }}
                        >
                            <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
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
                                        marginTop: "0",
                                        background: "#f5f5f5",
                                    }}
                                />
                                <h2 style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>
                                    {product.product_name.length > 50
                                        ? `${product.product_name.substring(0, 50)}...`
                                        : product.product_name}
                                </h2>
                                <div style={{ display: "flex", alignItems: "center", gap: "2rem", margin: "1.5rem 0" }}>
                                    <span style={{ fontWeight: "bold" }}>
                                        {product.currency} {product.final_price}
                                    </span>
                                    {product.in_stock ? (
                                        <>
                                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#28a745" }} aria-hidden="true" />
                                            <span style={{ color: "#28a745", fontWeight: "bold" }}>In Stock</span>
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#dc3545" }} aria-hidden="true" />
                                            <span style={{ color: "#dc3545", fontWeight: "bold" }}>Out of Stock</span>
                                        </>
                                    )}
                                </div>
                                <fetcher.Form method="post" action="/cart" style={{ width: "100%", display: "flex", justifyContent: "center", marginTop:3 }}>
                                    <input type="hidden" name="productId" value={product._id} />
                                    <input
                                        type="number"
                                        name="quantity"
                                        min={1}
                                        max={product.in_stock ? 99 : 1}
                                        defaultValue={1}
                                        style={{
                                            width: "3.2rem",
                                            padding: "0.3rem",
                                            borderRadius: "4px",
                                            border: "1px solid #ccc",
                                            fontSize: "1rem",
                                            marginBottom: "0.7rem",
                                            textAlign: "center",
                                        }}
                                        aria-label={`Quantity for ${product.product_name}`}
                                        disabled={!product.in_stock}
                                    />
                                </fetcher.Form>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                                <Link to={`/product/${product._id}`} style={{ flex: 1 }}>
                                    <button
                                        type="button"
                                        className="product-details-btn"
                                        style={{
                                            width: "50%",
                                            padding: "0.6rem 0",
                                            borderRadius: "6px",
                                            border: "none",
                                            background: "linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            fontSize: "1rem",
                                            cursor: "pointer",
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.09)",
                                            transition: "background 0.2s",
                                        }}
                                        aria-label={`View details for ${product.product_name}`}
                                    >
                                        <FontAwesomeIcon icon={faEye} aria-hidden="true" />
                                        <span style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                                            View details
                                        </span>
                                    </button>
                                </Link>
                                <fetcher.Form method="post" action="/cart" style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.3rem" }} aria-label={`Add ${product.product_name} to cart`}>
                                    <input type="hidden" name="productId" value={product._id} />
                                    <button
                                        type="submit"
                                        disabled={fetcher.state === "submitting" || !product.in_stock}
                                        aria-disabled={fetcher.state === "submitting" || !product.in_stock}
                                        aria-busy={fetcher.state === "submitting"}
                                        style={{
                                            width: "50%",
                                            padding: "0.6rem 0",
                                            borderRadius: "6px",
                                            border: "none",
                                            background: "#28a745",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            fontSize: "1rem",
                                            marginLeft: "3rem",
                                            cursor: fetcher.state === "submitting" || !product.in_stock ? "not-allowed" : "pointer",
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.09)",
                                            transition: "background 0.2s",
                                            opacity: fetcher.state === "submitting" || !product.in_stock ? 0.7 : 1,
                                        }}
                                        aria-label={`Add ${product.product_name} to cart`}
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: "0.5rem", fontWeight: "lighter" }} aria-hidden="true" />
                                        <script>
                                            {fetcher.state === "idle" && product.in_stock && `
                                                document.querySelector('[aria-label="Add ${product.product_name} to cart"]').addEventListener('click', () => {
                                                    Cart.addItem(product._id, 1);
                                                });
                                            `}
                                        </script>
                                    </button>
                                </fetcher.Form>
                            </div>
                        </li>
                    );
                })}
                </ul>
            </section>
           
            <nav aria-label="Pagination" style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
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
                       aria-label="Go to previous page"
                   >
                       <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "0.5rem" }} />
                       <span>Prev</span>
                   </button>
               </Link>
                )}
                <span style={{ alignSelf: "center", fontWeight: "bold", color: "#444" }} aria-live="polite">
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
                            aria-label={`Go to next page, page ${pagination.currentPage + 1}`}
                        >
                            <span>Next</span>
                            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "0.5rem" }} />
                        </button>
                    </Link>
                )}
            </nav>
        </main>
    );
}
