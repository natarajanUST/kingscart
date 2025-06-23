import { LiveReload, Outlet } from "@remix-run/react";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <title>Kings Cart - Ecommerce App</title>
      </head>
      <body>
        
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
        Home Page - Product Catalog 
        <LiveReload />
      </body>
    </html>
  );
}