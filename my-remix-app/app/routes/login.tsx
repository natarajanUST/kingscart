import { Form } from "@remix-run/react";

export default function Login() {
    return (
        <main style={{ padding: "2rem" }}>
            <h1>Login</h1>
            <Form method="post" style={{ display: "flex", flexDirection: "column", maxWidth: 320 }}>
                <label>
                    Email:
                    <input type="email" name="email" required style={{ marginBottom: "1rem" }} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required style={{ marginBottom: "1rem" }} />
                </label>
                <button type="submit">Login</button>
            </Form>
        </main>
    );
}
