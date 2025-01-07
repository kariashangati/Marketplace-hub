import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { ResetPassword } from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { UserRoutes } from "./protectRoutes/userRoutes";
import { AdminRoutes } from "./protectRoutes/AdminRoutes";
import { UserHome } from "./pages/user/UserHome";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UsersList } from "./pages/admin/UsersList";
import StoresList from "./pages/admin/StoresList";
import { TeamList } from "./pages/admin/TeamList";
import { CategoryList } from "./pages/admin/CategoryList";

export const App = () => {
  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<SignUp />} />
      <Route path={"/forgotPassword"} element={<ForgotPassword />} />
      <Route path={"/password-reset/:token"} element={<ResetPassword />} />

      <Route element={<UserRoutes />}>
        <Route path="/user/dashboard" element={<UserHome />} />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/usersList" element={<UsersList />} />
        <Route path="/admin/stores" element={<StoresList />} />
        <Route path="/admin/team" element={<TeamList />} />
        <Route path="/admin/categories" element={<CategoryList />} />
      </Route>
    </Routes>
  );
};
