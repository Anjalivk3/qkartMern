import { Link } from "react-router-dom";
import {
    FaShoppingCart,
    FaTags,
    FaTruck
} from "react-icons/fa";

function Home() {

    return (

        <div className="home-page">

            {/* Hero */}

            <section className="home-hero">

                <div className="hero-content">

                    <h1>
                        Welcome to QKart
                    </h1>

                    <p>
                        Discover amazing products at
                        great prices. Shop electronics,
                        fashion, mobiles and more.
                    </p>

                    <Link
                        to="/products"
                        className="shop-btn"
                    >
                        Shop Now
                    </Link>

                </div>

            </section>


            {/* Features */}

            <section className="features-section">

                <h2>
                    Why Shop With QKart?
                </h2>

                <div className="features-grid">

                   <div className="feature-card">

    <FaShoppingCart className="feature-icon" />

    <h3>Wide Selection</h3>

    <p>
        Explore products across multiple categories.
    </p>

</div>

                    <div className="feature-card">

    <FaTags className="feature-icon" />

    <h3>Great Prices</h3>

    <p>
        Find quality products at competitive prices.
    </p>

</div>


                    <div className="feature-card">

    <FaTruck className="feature-icon" />

    <h3>Easy Shopping</h3>

    <p>
        Simple cart, checkout and order management.
    </p>

</div>

                </div>

            </section>


            {/* CTA */}

            <section className="home-cta">

                <h2>
                    Ready to start shopping?
                </h2>

                <Link
                    to="/products"
                    className="shop-btn"
                >
                    Explore Products
                </Link>

            </section>

        </div>

    );
}

export default Home;