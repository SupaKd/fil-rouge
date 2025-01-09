import { Routes, Route } from "react-router-dom";

import Header from "./layout/admin/Header";
import Home from "./Pages/Home";
import Footer from "./layout/admin/Footer";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Details from "./Pages/Components/Details";
import Admin from "./layout/admin/Admin";
import Dashboard from "./Pages/Dashboard";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/details" element={<Details />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;