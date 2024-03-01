import { Navigate, Outlet } from 'react-router-dom';

function AuthRoutes() {
    const token = localStorage.getItem('token');

    const MainComponent = () => ( <Outlet /> );
    return ( token ? <MainComponent /> : <Navigate to="/" replace /> )
}

export default AuthRoutes;
