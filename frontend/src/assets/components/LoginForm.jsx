import { useGlobalContext } from "./context";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import cancelIcon from "../img/cross icon.svg";
import SignIn from "../components/GoogleSignIn";

const LoginForm = () => {
  const [errorDisplay, setErrorDisplay] = useState("");
  const { email, password, submitLogin, closeModal, error } = useGlobalContext();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div>
      {/* Close button */}
      <div className="flex justify-end mb-3 mr-2">
        <button onClick={closeModal}>
          <img src={cancelIcon} alt="close-login-form" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl modal-heading text-center w-full">
            Hello Again!
          </h2>
          <p className="text-center w-full">
            Welcome back, we’ve missed you 👋
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={(event) => {
            setErrorDisplay(error.current); // show error if any
            submitLogin(event);
          }}
          className="flex flex-col justify-center gap-3"
        >
          {/* Email */}
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            value={userEmail}
            onChange={(event) => {
              setUserEmail(event.target.value);
              email.current = event.target.value;
            }}
            helperText="We'll never share your email"
            color="success"
            required
          />

          {/* Password */}
          <TextField
            id="formBasicPassword"
            label="Password"
            type="password"
            variant="outlined"
            value={userPassword}
            onChange={(event) => {
              setUserPassword(event.target.value);
              password.current = event.target.value;
            }}
            color="success"
            required
          />

          {/* Submit button */}
          <Button variant="outlined" color="primary" type="submit">
            Login
          </Button>

          {/* Error message */}
          {errorDisplay && (
            <p className="text-red-500 text-sm">{errorDisplay}</p>
          )}

          {/* Google sign-in */}
          <SignIn />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
