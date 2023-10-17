import { Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Navbar, AuthLayout, GuestLayout } from "./components";


  function App() {

    return (
      <div className="">
        <Navbar />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    );
  }

export default App;
