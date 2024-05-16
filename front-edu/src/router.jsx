import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import App from "./App";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
