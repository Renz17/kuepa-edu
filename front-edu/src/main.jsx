import React from "react";
import router from "./router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);
