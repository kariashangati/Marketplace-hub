import  { useState } from "react";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";

const Verification = () => {
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
          <div className="mb-6">
            <h1 className="text-4xl mb-2">Verification code</h1>
            <h4>
              A verification code sent to &nbsp;
              <Link to={"mailto;#"} className="text-blue-500 underline">
                gmail
              </Link>
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
            <Button type="Submit" text="Submit" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Verification;
