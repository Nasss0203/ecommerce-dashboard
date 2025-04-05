import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/auth.slice";
import brandReducer from "./slice/brand.slice";
import catetoryReducer from "./slice/category.slice";
import orderReducer from "./slice/order.slice";
import productReducer from "./slice/product.slice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["product", "auth"],
};

const rootReducer = combineReducers({
	product: productReducer,
	auth: authReducer,
	order: orderReducer,
	category: catetoryReducer,
	brand: brandReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
