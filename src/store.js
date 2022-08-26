import { configureStore } from "@reduxjs/toolkit";
import { reposApi } from "./http/repos";


export const store = configureStore({
    reducer: {
        [reposApi.reducerPath]: reposApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(reposApi.middleware)
    // .,
});

