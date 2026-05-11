import { Navigate, Outlet } from "react-router";

function ProtectedRoutes({isAuth}) {

    return (
        <>
            {isAuth ? <Outlet /> : <Navigate to='/auth' />}
        </>
    )
}

export default ProtectedRoutes;