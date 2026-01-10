import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/login/Login";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./guards/PrivateRoute";
import PublicRoute from "./guards/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute></PublicRoute>}>
            <Route path="/login" element={<Login></Login>} />
          </Route>
          <Route element={<PrivateRoute></PrivateRoute>}>
            <Route path="/" element={<Home></Home>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
