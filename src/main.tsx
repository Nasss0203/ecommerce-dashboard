import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { ThemeProvider } from "./components/dark-mode/theme-provider.tsx";
import "./index.css";
import { persistor, store } from "./redux/store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider
						defaultTheme='dark'
						storageKey='vite-ui-theme'
					>
						<App />
						<Toaster />
					</ThemeProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	</StrictMode>,
);
