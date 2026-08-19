import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalProducts: 0,
    currentPage: 1,
    totalPages: 0,    
    loading: false,
    error: null
};

const productSlice = createSlice({

    name: "products",

    initialState,

    reducers: {

        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.totalProducts =
                action.payload.totalProducts;
            state.currentPage =
                action.payload.currentPage;
            state.totalPages =
                action.payload.totalPages;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPagination: (state, action) => {
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
       }
    }

});

export const {
    setProducts,
    setLoading,
    setError, setPagination
} = productSlice.actions;

export default productSlice.reducer;