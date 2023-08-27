import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DialogProvider from "./providers/DialogProvider";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
	},
});
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<DialogProvider>
				<App />
			</DialogProvider>
			<ReactQueryDevtools></ReactQueryDevtools>
		</QueryClientProvider>
	</React.StrictMode>
);
