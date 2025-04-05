import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutDashboard from "./layout/LayoutDashboard";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ListOrder from "./pages/order/list-order";
import Overview from "./pages/overview/Overview";
import Products from "./pages/product/Products";

const router = createBrowserRouter([
	{
		path: "",
		element: <LayoutDashboard></LayoutDashboard>,
		children: [
			{
				path: "/sign-in",
				element: <SignIn></SignIn>,
			},
			{
				path: "/sign-up",
				element: <SignUp></SignUp>,
			},
			{
				path: "/",
				element: <Overview></Overview>,
			},

			{
				path: "/products",
				element: <Products></Products>,
			},

			{
				path: "/orders",
				element: <ListOrder></ListOrder>,
			},
		],
	},
]);

function App() {
	return (
		<Suspense fallback={<></>}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;
