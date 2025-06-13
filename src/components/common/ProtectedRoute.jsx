import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Constant } from '@/utils/constant/constant';

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const token = localStorage.getItem(Constant.USER_INFO);

  if (!userToken && !token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 