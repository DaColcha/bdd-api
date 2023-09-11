import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//import de pages
import Reseñas from "./pages/reseñas/Reseñas";
import Alquileres from "./pages/alquileres/Alquileres";
import Socios from "./pages/socios/Socios";
import Ejemplares_Info from "./pages/ejemplares_info/Ejemplares_Info";
import Ejemplares_Conservacion from "./pages/ejemplares_conservacion/Ejemplares_Conservacion";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/glob-guster/resenia",
          element: <Reseñas />,
        },        
        {
          path: "/glob-guster/alquiler",
          element: <Alquileres />,
        },
        {
          path: "/glob-guster/socio",
          element: <Socios />,
        },
        {
          path: "/glob-guster/ejemplar-info",
          element: <Ejemplares_Info />,
        },
        {
          path: "/glob-guster/ejemplar-conservacion",
          element: <Ejemplares_Conservacion />,
        },
        
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
