import { useEffect, useState } from "react";

import AdminNavbar from "../../components/Navbar/AdminNavbar";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";


function AdminCategories() {

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);


    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(
                data.categories || data
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchCategories();

    }, []);


    const resetForm = () => {

        setName("");

        setDescription("");

        setEditingId(null);

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = {
                name,
                description
            };


            if (editingId) {

                await updateCategory(
                    editingId,
                    data
                );

                alert(
                    "Category updated successfully"
                );

            } else {

                await createCategory(data);

                alert(
                    "Category created successfully"
                );

            }


            resetForm();

            fetchCategories();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    const handleEdit = (category) => {

        setEditingId(category._id);

        setName(category.name);

        setDescription(
            category.description || ""
        );

    };


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this category?"
        );

        if (!confirmed) return;


        try {

            await deleteCategory(id);

            alert("Category deleted");

            fetchCategories();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }

    };


    return (

        <div>

            <AdminNavbar />


            <div className="admin-container">

                <h1>
                    Category Management
                </h1>


                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    <h2>
                        {editingId
                            ? "Edit Category"
                            : "Add Category"
                        }
                    </h2>


                    <input
                        placeholder="Category name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />


                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                    />


                    <button type="submit">

                        {editingId
                            ? "Update Category"
                            : "Add Category"
                        }

                    </button>


                    {editingId && (

                        <button
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>

                    )}

                </form>


                <h2>
                    Categories
                </h2>


                <div className="category-list">

                    {categories.map((category) => (

                        <div
                            className="category-item"
                            key={category._id}
                        >

                            <div>

                                <h3>
                                    {category.name}
                                </h3>

                                <p>
                                    {category.description}
                                </p>

                            </div>


                            <div>

                                <button
                                    onClick={() =>
                                        handleEdit(
                                            category
                                        )
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            category._id
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

        </div>

    );

}

export default AdminCategories;