import { Routes as Switch, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgetPassword';
import VerifyUser from '../pages/VerifyUser';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Invites from '../pages/Invites';
import Hotels from '../pages/Hotels';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" element={<PublicRoutes />}>
					<Route path="" element={<Login />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route path="forgot-password" element={<ForgotPassword />} />
					<Route path="verify" element={<VerifyUser />} />
					<Route path="reset" element={<ResetPassword />} />
				</Route>
				<Route path="/" element={<AuthRoutes />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="invites" element={<Invites />} />
					<Route path="hotels" element={<Hotels />} />
				</Route>
				<Route path="/404" element={<>Not Found</>} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Switch>
		</BrowserRouter>
	);
}
