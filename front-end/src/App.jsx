import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import { SignUp } from "./pages/auth/SignUp"
import { ForgotPassword } from "./pages/auth/ForgotPassword"
import { ResetPassword } from "./pages/auth/ResetPassword"

export const App = () => {
    return(
        <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<SignUp />} />
            <Route path={'/forgotPassword'} element={<ForgotPassword />}/>
            <Route path={'/resetPassword/:token'} element={<ResetPassword />} />
        </Routes>
    )
}
