import { Link, NavLink, Outlet } from "react-router";
import UserListingCard from "../components/UserListingCard";
import EmptyState from "../components/EmptyState";

import './UserListingsPage.css'

function UserListingsPage() {

  return (
    <div className="bookings">
      <h2 className="bookings-title">Your listings</h2>
      <div className="tabs">
        <NavLink className="tab" to="" end>Published</NavLink>
        <NavLink className="tab" to="requests">Requests</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default UserListingsPage;
