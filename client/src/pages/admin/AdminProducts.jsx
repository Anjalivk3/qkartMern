import { useEffect, useState } from "react";

import AdminNavbar from "../../components/Navbar/AdminNavbar";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../../services/productService";

import {
    getCategories
} from "../../services/categoryService";


function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        image: null,
        existingImage: ""
    });


    // =========================
    // FETCH PRODUCTS + CATEGORIES
    // =========================

    const fetchData = async () => {

        try {

            const productData = await getProducts();
            const categoryData = await getCategories();

            setProducts(
                productData.products || productData
            );

            setCategories(
                categoryData.categories || categoryData
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchData();

    }, []);


    // =========================
    // HANDLE INPUT CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

    };


    // =========================
    // HANDLE IMAGE CHANGE
    // =========================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }


        // Check file type

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (!allowedTypes.includes(file.type)) {

            alert(
                "Only JPG, PNG and WEBP images are allowed"
            );

            e.target.value = "";

            return;
        }


        // Check file size - 5 MB

        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Image size must be less than 5 MB"
            );

            e.target.value = "";

            return;
        }


        setForm({
            ...form,
            image: file
        });

    };


    // =========================
    // EDIT PRODUCT
    // =========================

    const handleEdit = (product) => {

        setEditingId(product._id);

        setForm({

            name: product.name || "",

            description:
                product.description || "",

            price:
                product.price || "",

            category:
                product.category?._id ||
                product.category ||
                "",

            brand:
                product.brand || "",

            stock:
                product.stock || "",

            // New image will be selected only if user
            // wants to replace old image
            image: null,

            // Existing Cloudinary image
            existingImage:
                product.images?.[0]?.url || ""

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================
    // RESET FORM
    // =========================

    const resetForm = () => {

        setForm({

            name: "",
            description: "",
            price: "",
            category: "",
            brand: "",
            stock: "",
            image: null,
            existingImage: ""

        });

        setEditingId(null);

    };


    // =========================
    // SUBMIT PRODUCT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            // IMPORTANT:
            // We are using FormData because image
            // needs multipart/form-data

            const formData = new FormData();


            formData.append(
                "name",
                form.name
            );

            formData.append(
                "description",
                form.description
            );

            formData.append(
                "price",
                Number(form.price)
            );

            formData.append(
                "category",
                form.category
            );

            formData.append(
                "brand",
                form.brand
            );

            formData.append(
                "stock",
                Number(form.stock)
            );


            // Add image only if selected

            if (form.image) {

                formData.append(
                    "image",
                    form.image
                );

            }


            // =========================
            // UPDATE PRODUCT
            // =========================

            if (editingId) {

                await updateProduct(
                    editingId,
                    formData
                );

                alert(
                    "Product updated successfully"
                );

            }

            // =========================
            // CREATE PRODUCT
            // =========================

            else {

                // Image required when creating
                // a new product

                if (!form.image) {

                    alert(
                        "Please select a product image"
                    );

                    return;
                }


                await createProduct(
                    formData
                );

                alert(
                    "Product created successfully"
                );

            }


            resetForm();

            await fetchData();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    // =========================
    // DELETE PRODUCT
    // =========================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );


        if (!confirmed) {
            return;
        }


        try {

            await deleteProduct(id);

            alert(
                "Product deleted successfully"
            );

            fetchData();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        }

    };


    return (

        <div>

            <AdminNavbar />


            <div className="admin-container">

                <h1>
                    Product Management
                </h1>


                {/* =========================
                    PRODUCT FORM
                ========================= */}

                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    <h2>

                        {editingId
                            ? "Edit Product"
                            : "Add Product"
                        }

                    </h2>


                    {/* PRODUCT NAME */}

                    <input
                        name="name"
                        placeholder="Product name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />


                    {/* DESCRIPTION */}

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />


                    {/* PRICE */}

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        min="0"
                        required
                    />


                    {/* CATEGORY */}

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select category
                        </option>


                        {categories.map(
                            (category) => (

                                <option
                                    key={category._id}
                                    value={category._id}
                                >

                                    {category.name}

                                </option>

                            )
                        )}

                    </select>


                    {/* BRAND */}

                    <input
                        name="brand"
                        placeholder="Brand"
                        value={form.brand}
                        onChange={handleChange}
                    />


                    {/* STOCK */}

                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        min="0"
                        required
                    />


                    {/* =========================
                        IMAGE
                    ========================= */}

                    <div className="image-upload">

                        <label>
                            Product Image
                        </label>


                        <input
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageChange}
                        />


                        <p>
                            JPG, PNG or WEBP. Maximum 5 MB.
                        </p>


                        {/* Existing image */}

                        {form.existingImage &&
                            !form.image && (

                                <div>

                                    <p>
                                        Current Image:
                                    </p>

                                    <img
                                        src={form.existingImage}
                                        alt="Current product"
                                        className="image-preview"
                                    />

                                </div>

                            )}


                        {/* New image preview */}

                        {form.image && (

                            <div>

                                <p>
                                    New Image Preview:
                                </p>

                                <img
                                    src={URL.createObjectURL(
                                        form.image
                                    )}
                                    alt="New product preview"
                                    className="image-preview"
                                />

                            </div>

                        )}

                    </div>


                    {/* SUBMIT */}

                    <button type="submit">

                        {editingId
                            ? "Update Product"
                            : "Add Product"
                        }

                    </button>


                    {/* CANCEL */}

                    {editingId && (

                        <button
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel Edit
                        </button>

                    )}

                </form>


                <hr />


                {/* =========================
                    PRODUCT LIST
                ========================= */}

                <h2>
                    Products
                </h2>


                <div className="admin-product-list">


                    {products.length === 0 && (

                        <p>
                            No products found.
                        </p>

                    )}


                    {products.map(
                        (product) => (

                            <div
                                className="admin-product"
                                key={product._id}
                            >

                                {/* PRODUCT IMAGE */}

                                <div className="admin-product-image-container">

    {product.images?.[0]?.url ? (

        <img
            src={product.images[0].url}
            alt={product.name}
            className="admin-product-image"
        />

    ) : (

        <div className="no-image">
            No Image
        </div>

    )}

</div>

                                <div>

                                    <h3>
                                        {product.name}
                                    </h3>


                                    <p>
                                        ₹{product.price}
                                    </p>


                                    <p>
                                        Stock: {product.stock}
                                    </p>


                                    <p>
                                        Category:{" "}
                                        {product.category?.name ||
                                            "N/A"}
                                    </p>

                                </div>


                                <div>

                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                product
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>

    );

}


export default AdminProducts;