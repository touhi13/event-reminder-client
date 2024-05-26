import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const PublicRouter = ({ children }) => {
    const isLoggedIn = useAuth();

    return !isLoggedIn ? children : <Navigate to={'/'} />;
}

export default PublicRouter;
