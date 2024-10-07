import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Friends from '@/app/auth/friends/page';
import FriendRequests from '@/app/auth/friend-requests/page';
import Blocks from '@/app/auth/blocks/page';
import Login from '@/app/unauth/login/page';
import Register from '@/app/unauth/register/page';
import AuthLayout from '@/app/auth/layout';
import UnauthLayout from '@/app/unauth/layout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/friend/list" replace />} />
        <Route path="/login" element={<UnauthLayout><Login /></UnauthLayout>} />
        <Route path="/register" element={<UnauthLayout><Register /></UnauthLayout>} />
        <Route path="friend/list" element={<AuthLayout><Friends /></AuthLayout>} />
        <Route path="friend/requests" element={<AuthLayout><FriendRequests /></AuthLayout>} />
        <Route path="friend/blocks" element={<AuthLayout><Blocks /></AuthLayout>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
