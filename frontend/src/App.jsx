import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";
import { Register } from "./pages/register/Register";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute></PublicRoute>}>
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
          </Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path="/" element={<Home></Home>} />
          </Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
