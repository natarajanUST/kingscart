import { Link, BrowserRouter } from "react-router-dom";
export default function NavBar() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">
            <h1>Kings Cart</h1>
          </Link>
        </li>
        <li>
          <Link to="/react/cart">Cart</Link>
        </li>
      </ul>
    </BrowserRouter>
  );
}
