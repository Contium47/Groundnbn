import { Navigate, Outlet } from "react-router";

function ProtectedAdmin({isAuth, isAdmin}) {

    return (
        <>
            {(isAuth && isAdmin) ? <Outlet /> : <Navigate to='/auth' />}
        </>
    )
}

export default ProtectedAdmin;