import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const handleAddToCart = async () => {

        const token = localStorage.getItem("token");

        // User login nahi hai
        if (!token) {
            alert("Please login to add products to cart");
            navigate("/login");
            return;
        }

        try {

            await addToCart(product._id, 1);

            alert("Product added to cart");

        } catch (error) {

            // Agar token expired/invalid hai
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to add product"
            );
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
            {product.images?.[0]?.url ? (

    <img
        src={product.images[0].url}
        alt={product.name}
        className="product-image"
        onError={(e) => {
            e.currentTarget.style.display = "none";
        }}
    />

) : (

    <div className="no-image">
        No Image
    </div>

)}
            </div>

            <div className="product-content">

                <h3>{product.name}</h3>

                <p className="product-price">
                    ₹{product.price}
                </p>

                <p className="product-description">
                    {product.description}
                </p>

                <div className="product-actions">

                    <Link
                        className="view-product-btn"
                        to={`/products/${product._id}`}
                    >
                        View Product
                    </Link>

                    <button
                        className="add-cart-btn"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;