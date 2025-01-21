import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { forgotPassword } from "../../services/authServices";
import { Notification } from "../../components/ui/Notification";

const ForgotPassword = () => {

  const [email, setEmail] = useState();
  const [loading,setLoading] = useState(false);
  const [notification,setNotification] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    const formData = new FormData();
    formData.append("email",email);

    setLoading(true);
    try {
      const response = await forgotPassword(formData);
      setLoading(false);
      if(response.status === 200){
        setNotification({type:"success",message:response.data.message});
      }
    } catch (error) {
      setLoading(false);
      if(error.response){
        setNotification({type:"error",message:error.response.data.message})
      }else{
        setNotification({type:"error",message:"Try again later"})
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-32">
        <div className="bg-white flex flex-col gap-5 justify-center p-5 pt-6 w-[90%] md:w-[40%] mx-auto shadow-2xl border rounded-md border-gray-300">
          <div className="mb-2">
            <h1 className="text-4xl mb-2">Forgot password</h1>
            <h4>
              Enter the email assosiated with your account
            </h4>
          </div>

          <div>
            <Label text={"Email"} />
            <Input
              type={"email"}
              name={"email"}
              placholder={"ex:john00.0@exemple.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {
              notification && <Notification type={notification.type} message={notification.message} />
            }
          </div>
          <div>
            <Button type="Submit" text="Send reset link" loading={loading}/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
