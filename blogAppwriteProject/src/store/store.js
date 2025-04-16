import { configureStore } from "@reduxjs/toolkit";
import authServiceReducer from "../store/authSlice";

const store = configureStore({
    reducer:{
        authServiceReducer
    }
});

export default store;