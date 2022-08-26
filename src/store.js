import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./reducers/repos-reducer"


export const store = configureStore({
    reducer: {
        repos: repoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

