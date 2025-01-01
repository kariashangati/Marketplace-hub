import  { useState } from "react";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { verifyCode } from "../../services/authServices";
import { LinearProgress } from "@mui/material";
import { Notification } from "../../components/ui/Notification";

const Verification = ({formData}) => {
  const [verificationCode, setVerificationCode] = useState();
  
    const [newFormdata, setNewFormData] = useState({ ...formData, verificationCode });
    const [loading,setLoading] = useState(false);
    const [notification,setNotification] = useState({});
    const [registred,setRegistred] = useState(false);
    const navigate = useNavigate();

    const handleVerificationCodeChange = (e) => {
        const code = e.target.value;
        setVerificationCode(code);
        setNewFormData((prevData) => ({
            ...prevData,
            verificationCode: code,
        }));
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);
    try {
      const response = await verifyCode(newFormdata);
      setLoading(false);
      if(response.status === 200){
        setRegistred(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      if(error.response){
        setNotification({type:"error",message:error.response.data.message});
      }else{
        setNotification({type:"error",message:"Try again later"});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-32">
        <div className="bg-dark flex flex-col gap-5 justify-center p-5 pt-6 w-[90%] md:w-[40%] mx-auto ">
          <div className="mb-6">
            <h1 className="text-4xl mb-2">Verification code</h1>
            <h4>
              A verification code sent to <span className="text-blue-500"> {formData.email}</span>
            </h4>
          </div>

          <div>
            <Label text={"Verification code"} />
            <Input
              type={"number"}
              name={"numberVerification"}
              placholder={"max: 6 chars"}
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
          </div>
          <div>
            {
              registred ?
              <div className="text-center">
                <span className="text-lg mb-1">Success! redirecting to login</span>
                <br></br>
                <LinearProgress />
              </div>:null
            }
          </div>

          <div>
            <Button type="Submit" text="Submit" loading={loading}/>
          </div>
        </div>
      </div>
      {
        notification && <Notification message={notification.message} type={notification.type} />
      }
    </form>
  );
};

export default Verification;
