import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layout/admin/Header";
import Home from "./Pages/Home";
import Footer from "./layout/admin/Footer";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Details from "./Pages/Components/Details";
import Admin from "./layout/admin/Admin";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/Not-Found";

function App() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const isConnected = localStorage.getItem("isConnected");
        if (isConnected) {
            setIsLogged(true);
        }
    }, []);

    function onClickLogoutHandler() {
        localStorage.removeItem("isConnected");
        setIsLogged(false);
    }

    return (
        <>
            <Header
                isLogged={isLogged}
                onClickLogoutHandler={onClickLogoutHandler}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/auth/login"
                    element={<Login setIsLogged={setIsLogged} />}
                />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/details" element={<Details />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/admin"
                    element={
                        <Admin
                            isLogged={isLogged}
                            onClickLogoutHandler={onClickLogoutHandler}
                        />
                    }
                />

                <Route path="/admin/*" element={<NotFound />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;