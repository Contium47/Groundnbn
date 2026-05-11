import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

function MainLayout({isAuth, setIsAuth, isUserMenuOpen, setIsUserMenuOpen, isAdmin}) {
    return (
        <>
            <Header isAuth={isAuth} setIsAuth={setIsAuth} isUserMenuOpen={isUserMenuOpen} setIsUserMenuOpen={setIsUserMenuOpen} isAdmin={isAdmin} />
            <Outlet context={{isAuth, setIsAuth}} />
            <Footer />
        </>
    )
}

export default MainLayout;