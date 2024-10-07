import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Friends from '@/app/auth/friends/page';
import FriendRequests from '@/app/auth/friend-requests/page';
import Blocks from '@/app/auth/blocks/page';
import Login from '@/app/unauth/login/page';
import Register from '@/app/unauth/register/page';
import AuthLayout from '@/app/auth/layout';
import UnauthLayout from '@/app/unauth/layout';
import PrivateRoute from '@/routes/private';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/friend/list" replace />} />
        <Route path="/login" element={<UnauthLayout><Login /></UnauthLayout>} />
        <Route path="/register" element={<UnauthLayout><Register /></UnauthLayout>} />
        <Route
          path="friend/list"
          element={
            <PrivateRoute>
              <AuthLayout><Friends /></AuthLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="friend/requests"
          element={
            <PrivateRoute>
              <AuthLayout><FriendRequests /></AuthLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="friend/blocks"
          element={
            <PrivateRoute>
              <AuthLayout><Blocks /></AuthLayout>
            </PrivateRoute>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
