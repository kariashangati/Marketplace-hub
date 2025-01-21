import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { ResetPassword } from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { UserRoutes } from "./protectRoutes/userRoutes";
import { AdminRoutes } from "./protectRoutes/AdminRoutes";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UsersList } from "./pages/admin/UsersList";
import { StoresList } from "./pages/admin/StoresList";
import { TeamList } from "./pages/admin/TeamList";
import { PendingProducts } from "./pages/admin/PendingProducts";
import { CategoryList } from "./pages/admin/CategoryList";
import { ProfileData } from "./pages/admin/ProfileData";
import { Products } from "./pages/user/Products";
import { ReporteProducts } from "./pages/admin/ReporteProducts";
import { UserData } from "./pages/user/UserData";
import { SavedProducts } from "./pages/user/SavedProducts";
import { UserProfile } from "./pages/user/UserProfile";
import { StoreData } from "./pages/user/StoreData";
import { History } from "./pages/user/History";
import { Search } from "./pages/user/Search";
import { ProductDetails } from "./pages/user/ProductDetails";
import { Home } from "./pages/user/Home";
import { Notifications } from "./pages/user/Notifications";
import { MessageUser } from "./pages/user/MessageUser";


const PageBasedOnRole = () => {
  if (
    localStorage.getItem("role") === "admin" ||
    localStorage.getItem("role") === "super admin"
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  } else if (localStorage.getItem("role") === "user") {
    return <Navigate to={"/user/home"} />;
  }

  return <Navigate to={"/user/home"} />;
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageBasedOnRole />} />

      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<SignUp />} />
      <Route path={"/forgotPassword"} element={<ForgotPassword />} />
      <Route path={"/password-reset/:token"} element={<ResetPassword />} />
      
      <Route path="/user/home" element={<Home />} />

      <Route element={<UserRoutes />}>
        <Route path="/user/products" element={<Products />} />
        <Route path="/user/userData/:id" element={<UserData />} />
        <Route path="/user/saves" element={<SavedProducts />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/store/storeData/:id" element={<StoreData />} />
        <Route path="/user/history" element={<History />} />
        <Route path="/user/search" element={<Search />} />
        <Route path="/user/messages" element={<MessageUser />} />
        <Route
          path="/product/productDetails/:id"
          element={<ProductDetails />}
        />
        <Route path="/user/notifications" element={<Notifications />} />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/usersList" element={<UsersList />} />
        <Route path="/admin/stores" element={<StoresList />} />
        <Route path="/admin/team" element={<TeamList />} />
        <Route path="/admin/pendingProducts" element={<PendingProducts />} />
        <Route path="/admin/categories" element={<CategoryList />} />
        <Route path="/admin/profile" element={<ProfileData />} />
        <Route path="/admin/reportedProducts" element={<ReporteProducts />} />
      </Route>
    </Routes>
  );
};
