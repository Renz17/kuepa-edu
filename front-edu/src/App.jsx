import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import HomePage from "./components/HomePage";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const data = localStorage.getItem("userData");

    if (data) {
      setUser(JSON.parse(data));
    } else {
      enqueueSnackbar("You are not logged in yet! Please log in first.");
      navigate("/login");
    }
  }, [enqueueSnackbar, navigate]);

  const logout = () => {
    localStorage.removeItem("userData");
    enqueueSnackbar("User Logged-out successfully", { variant: "success" });
    navigate("/login");
  };

  return (
    <main className="h-screen overflow-hidden">
      <div className="flex flex-raw justify-between p-5 h-16 bg-orange-500">
        <h1 className="text-white font-semibold">Bienvenido  {user?.name}</h1>
        <button className="text-white font-semibold underline" onClick={logout}>
          Salir
        </button>
      </div>
      <HomePage />
    </main>
  );
}

export default App;

