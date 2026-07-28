import { Link, NavLink } from "react-router";
// import logo from "../imgs/GroundnbnDefaultLogo-Photoroom.svg";
import BurgerMenuBtn from "./BurgerMenuBtn";
import UserMenu from "./UserMenu";
import './Header.css'

function Header({ isAuth, setIsAuth, isUserMenuOpen, setIsUserMenuOpen, isAdmin }) {
  const userData = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">
          {/* <img src={logo} alt="logo" /> */}
          Groundnbn
        </Link>

        <div className="nav-right">
        <BurgerMenuBtn isUserMenuOpen={isUserMenuOpen} setIsUserMenuOpen={setIsUserMenuOpen} />

        <div className="nav-user">
          {/* {isAuth && <p className="nav-user__email">{userData.email}</p>} */}
          <UserMenu setIsAuth={setIsAuth} isAuth={isAuth} isUserMenuOpen={isUserMenuOpen} setIsUserMenuOpen={setIsUserMenuOpen} isAdmin={isAdmin} />
        </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
