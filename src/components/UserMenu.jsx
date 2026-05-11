import { Link, NavLink } from "react-router";

import "./UserMenu.css";

function UserMenu({ isUserMenuOpen, setIsUserMenuOpen, isAuth, setIsAuth, isAdmin }) {

  if (!isUserMenuOpen) return null;

  function closeMenu() {
    setIsUserMenuOpen(false)
  }

  return (
    <div className="user-menu">
      {isAuth && isAdmin ? (
        <ul className="user-menu__list">
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/admin-panel/users" onClick={closeMenu}>
              Admin panel
            </Link>
          </li>
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/help" onClick={closeMenu}>
              Help Centre
            </Link>
          </li>
          <li className="user-menu__item">
            <Link
              to="/auth"
              className="user-menu__link"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsAuth(false);
                closeMenu();
              }}
            >
              Log out
            </Link>
          </li>
        </ul>
      ) : isAuth ? (
        <ul className="user-menu__list">
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/wishlist" onClick={closeMenu}>
              Wishlist
            </Link>
          </li>
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/bookings" onClick={closeMenu}>
              Bookings
            </Link>
          </li>
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/my-listings" onClick={closeMenu}>
              My Listings
            </Link>
          </li>
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/become-a-host" onClick={closeMenu}>
              Become a host
            </Link>
          </li>
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/help" onClick={closeMenu}>
              Help Centre
            </Link>
          </li>
          <li className="user-menu__item">
            <Link
              to="/auth"
              className="user-menu__link"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsAuth(false);
                closeMenu()
              }}
            >
              Log out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="user-menu__list">
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/help" onClick={closeMenu}>
              Help Centre
            </Link>
          </li>
          <li className="user-menu__item">
            <Link className="user-menu__link" to="/auth" onClick={closeMenu}>
              Log in or sign up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
