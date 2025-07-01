import { Link } from "@remix-run/react";

export default function Cart() {
    // Placeholder cart items
    const cartItems = [];

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {/* Render cart items here */}
                </ul>
            )}
            <Link to="/products">
                <button style={{ marginTop: "1rem" }}>Back to Products</button>
            </Link>
        </main>
    );
}
