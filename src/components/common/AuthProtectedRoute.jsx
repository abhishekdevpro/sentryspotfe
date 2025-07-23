import { Constant } from '@/utils/constant/constant';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth) || localStorage.getItem(Constant.USER_TOKEN);
  const location = useLocation();

  if (!userToken) {
    // Redirect to login if no token exists
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthProtectedRoute;