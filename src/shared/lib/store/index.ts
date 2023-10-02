import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "shared/api/apiSlice";
import authReducer from "widgets/LoginForm/api/features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    authState: authReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            apiSlice.middleware
        ])
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);