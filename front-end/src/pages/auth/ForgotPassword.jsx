import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";

const ForgotPassword = () => {
  const [inputVerification, setInputVerification] = useState();

  const handleChange = (e) => {
    setInputVerification(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("said");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mt-32">
        <div className="bg-dark flex flex-col gap-5 justify-center p-5 pt-6 w-[90%] md:w-[40%] mx-auto ">
          <div className="mb-2">
            <h1 className="text-4xl mb-2">Forgot password</h1>
            <h4>
              Enter the email assosiated with your account
            </h4>
          </div>

          <div>
            <Label text={"Verification code"} />
            <Input
              type={"number"}
              name={"numberVerification"}
              placholder={"max: 6 chars"}
              value={inputVerification}
              onChange={handleChange}
            />
          </div>

          <div>
            <Button type="Submit" text="Send reset link" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
