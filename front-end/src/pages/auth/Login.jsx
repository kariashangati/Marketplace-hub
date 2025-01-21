import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { checkUserLogin } from "../../services/authServices";
import { Notification } from "../../components/ui/Notification";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);
    try {
      const response = await checkUserLogin(formData);
      setLoading(false);
      if (response.status === 200) {
        if (
          response.data.role === "admin" ||
          response.data.role === "super admin"
        ) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate("/admin/dashboard");
        } else if (response.data.role === "user") {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id", response.data.userData.id);
          navigate("/user/home");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };
  return (
    <div className="bg-white">
      <div className="bg-white w-[90%] md:w-[45%] mx-auto mt-32 px-6 py-8 shadow-2xl border rounded-md border-gray-300">
        <h1 className="text-4xl mb-2">Sign in</h1>
        <h4 className="">
          D'ont have an account ?
          <Link to={"/register"} className="text-blue-500 underline">
            Sign up
          </Link>
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mt-8">
            <div>
              <Label text={"Email"} />
              <Input
                type={"email"}
                name={"email"}
                placholder={"ex:john00.0@exemple.com"}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <Label text={"Password"} />
              <Input
                type={"password"}
                name={"password"}
                placholder={"●●●●●●●●"}
                value={formData.password}
                onChange={handleChange}
              />
              <Link
                className="float-end text-blue-500 underline"
                to={"/forgotPassword"}
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mt-14">
              <Button type={"submit"} text={"Sign in"} loading={loading} />
            </div>
            {notification && (
              <Notification
                type={notification.type}
                message={notification.message}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
