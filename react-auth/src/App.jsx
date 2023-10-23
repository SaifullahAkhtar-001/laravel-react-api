import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Contact, AddContact, EditContact } from "./pages";
import { Navbar, AuthLayout, GuestLayout } from "./components/Index";


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
          <Route path="/contact/:userId" element={<Contact />} />
          <Route path="/create" element={<AddContact />} />
          <Route path="/update_contact/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    );
  }

export default App;
