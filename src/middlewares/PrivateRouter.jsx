import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useAuth();

  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to={"/login"} />
}

export default PrivateRouter