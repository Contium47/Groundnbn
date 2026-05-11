import { NavLink, Outlet } from "react-router";

function AdminPanelPage() {
  return (
    <>
      <div className="tabs">
        <NavLink className="tab" to="users" end>
          Users
        </NavLink>
        <NavLink className="tab" to="listings">
          Listings
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminPanelPage;
