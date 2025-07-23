import { Constant } from '@/utils/constant/constant';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth) || localStorage.getItem(Constant.USER_TOKEN);

  if (userToken) {
    // Redirect to dashboard if user is already logged in
    return <Navigate to="/candidates-dashboard/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;