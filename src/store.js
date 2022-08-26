import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./reducers/repos-reducer"
import { reposApi } from "./http/repos";


export const store = configureStore({
    reducer: {
        repos: repoReducer,
        [reposApi.reducerPath]: reposApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(reposApi.middleware)
    // .,
});

