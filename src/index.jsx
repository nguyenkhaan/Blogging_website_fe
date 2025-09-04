import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient() //Cau hinh query Client cho React Query - Sau nay se bo sung them 
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <App />
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
