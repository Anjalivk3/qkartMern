import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/productDetails.css";

import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";


function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getProductById(id);

                setProduct(data.product);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProduct();

    }, [id]);


    const navigate = useNavigate();

const handleAddToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login to add products to cart");
        navigate("/login");
        return;
    }

    try {
        setAdding(true);
        await addToCart(product._id, 1);

        alert("Product added to cart");

    } catch (error) {

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
    }finally {

            setAdding(false);
        }
    };    


    if (loading) {
        return <h2>Loading product...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }


    return (

        <div className="product-details">

            <div className="product-details-image">

                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                />

            </div>


            <div className="product-details-content">

                <h1>{product.name}</h1>

                <p>
                    Brand: {product.brand}
                </p>

                <h2>
                    ₹{product.price}
                </h2>

                <p>
                    {product.description}
                </p>

                <p>
                    Stock: {product.stock}
                </p>

                <p>
                    Rating: {product.ratings}
                </p>

                <p>
                    Reviews: {product.numReviews}
                </p>

            <button
                className="details-cart-btn"
                onClick={handleAddToCart}
                disabled={adding}
            >
            {adding? "Adding...": "Add to Cart"}
            </button>            

            </div>

        </div>
    );
}

export default ProductDetails;