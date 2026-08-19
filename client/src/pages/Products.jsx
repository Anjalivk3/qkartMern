import {
    useEffect,
    useState,
    useCallback
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    setProducts,
    setLoading,
    setError, setPagination
} from "../redux/slices/productSlice";

import {
    getProducts
} from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "../components/ProductCard";

import "../styles/products.css";


function Products() {

    const dispatch = useDispatch();

    const {
            products,
            loading,
            error,
            totalPages,
            currentPage
        } = useSelector(
            (state) => state.products
        );

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);


    const fetchProducts = useCallback(
        async (searchValue = "",
        categoryValue = "", pageValue = 1) => {

            dispatch(setLoading(true));
            dispatch(setError(null));

            try {

                const data = await getProducts({
                    search: searchValue,
                    category: categoryValue,
                    page: pageValue,
                    limit: 8
                });

                dispatch(setProducts(data));

                dispatch(
                setPagination({
                    totalPages: data.totalPages,
                    currentPage: data.currentPage
                    })
                );

            } catch (error) {

                dispatch(
                    setError(
                        error.response?.data?.message ||
                        "Failed to fetch products"
                    )
                );

            } finally {

                dispatch(setLoading(false));

            }

        },
        [dispatch]
    );


    useEffect(() => {

        fetchProducts();

    }, [fetchProducts]);

    useEffect(() => {

    const fetchCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data.categories);

        } catch (error) {

            console.log(
                "Failed to fetch categories",
                error
            );

        }

    };

    fetchCategories();

}, []);


    if (loading) {
        return <h2>Loading products...</h2>;
    }


    if (error) {
        return <h2>{error}</h2>;
    }


    return (

        <div className="products-page">

            <h1>Products</h1>

            {/* <div className="search-container">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button
                    onClick={() =>
                        fetchProducts(search, category)
                    }>Search
                </button>

            </div>
            <div className="filter-container">

    <label>
        Category:
    </label>

    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    >

        <option value="">
            All Categories
        </option>

        <option value="Electronics">
            Electronics
        </option>

        <option value="Fashion">
            Fashion
        </option>

        <option value="Beauty">
            Beauty
        </option>

        <option value="Sports">
            Sports
        </option>

    </select>

</div> */}

<div className="filter-container">

    <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
>
    <option value="">
        All Categories
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

    <button
        onClick={() => {
            setPage(1);
            fetchProducts(search, category, 1);
        }}
    >
        Apply
    </button>








</div>


            {products.length === 0 ? (

                <h2>
                    No products found
                </h2>

            ) : (

                <div className="products-grid">

                    {products.map((product) => (

                        <ProductCard
                            key={product._id}
                            product={product}
                        />

                    ))}

                </div>
                

            )}

            <div className="pagination">

    <button
    disabled={currentPage === 1}
    onClick={() => {

        const newPage = currentPage - 1;

        setPage(newPage);

        fetchProducts(
            search,
            category,
            newPage
        );

    }}
>
    Previous
</button>

    <span>
        Page {currentPage} of {totalPages}
    </span>

    <button
    disabled={currentPage === totalPages}
    onClick={() => {

        const newPage = currentPage + 1;

        setPage(newPage);

        fetchProducts(
            search,
            category,
            newPage
        );

            }}
        >
            Next
        </button>

         </div>

        </div>
    );
}

export default Products;