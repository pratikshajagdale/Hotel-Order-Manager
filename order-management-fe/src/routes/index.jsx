import Login from "../components/Login";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgetPassword";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Switch>
        </BrowserRouter>
    )
}

