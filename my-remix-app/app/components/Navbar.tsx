import { Link } from "@remix-run/react";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li>            
                <li style={styles.navItem}>
                    <Link to="/about-us" style={styles.navLink}>About Us</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/products" style={styles.navLink}>Products</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/cart" style={styles.navLink}>Cart</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/login" style={styles.navLink}>Login</Link>
                </li>              
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "#333",
        padding: "1rem",
    },
    navList: {
        listStyle: "none",
        display: "flex",
        justifyContent: "space-around",
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: "0 1rem",
    },
    navLink: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "1rem",
    },
};

export default Navbar;