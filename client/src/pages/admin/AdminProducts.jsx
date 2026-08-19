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
        imageUrl: "",
        publicId: ""
    });

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


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const resetForm = () => {

        setForm({
            name: "",
            description: "",
            price: "",
            category: "",
            brand: "",
            stock: "",
            imageUrl: "",
            publicId: ""
        });

        setEditingId(null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const productData = {

                name: form.name,
                description: form.description,
                price: Number(form.price),
                category: form.category,
                brand: form.brand,
                stock: Number(form.stock),
                images: [
                    {
                        url: form.imageUrl,
                        public_id: form.publicId
                    }
                ]

            };


            if (editingId) {

                await updateProduct(
                    editingId,
                    productData
                );

                alert("Product updated successfully");

            } else {

                await createProduct(productData);
                alert("Product created successfully");

            }

            resetForm();

            fetchData();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    const handleEdit = (product) => {

        setEditingId(product._id);

        setForm({

            name: product.name || "",

            description:
                product.description || "",

            price: product.price || "",

            category:
                product.category?._id ||
                product.category ||
                "",

            brand: product.brand || "",

            stock: product.stock || "",

            imageUrl:
                product.images?.[0]?.url || "",

            publicId:
                product.images?.[0]?.public_id || ""

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) return;

        try {

            await deleteProduct(id);

            alert("Product deleted");

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


                    <input
                        name="name"
                        placeholder="Product name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />


                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />


                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />


                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select category
                        </option>

                        {categories.map((category) => (

                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>


                    <input
                        name="brand"
                        placeholder="Brand"
                        value={form.brand}
                        onChange={handleChange}
                    />


                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
                    />


                    <input
                        name="imageUrl"
                        placeholder="Image URL"
                        value={form.imageUrl}
                        onChange={handleChange}
                    />


                    <input
                        name="publicId"
                        placeholder="Image public ID"
                        value={form.publicId}
                        onChange={handleChange}
                    />


                    <button type="submit">

                        {editingId
                            ? "Update Product"
                            : "Add Product"
                        }

                    </button>


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


                <h2>
                    Products
                </h2>


                <div className="admin-product-list">

                    {products.map((product) => (

                        <div
                            className="admin-product"
                            key={product._id}
                        >

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

                            </div>


                            <div>

                                <button
                                    onClick={() =>
                                        handleEdit(product)
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
                    ))}
                </div>
            </div>
        </div>);}

export default AdminProducts;