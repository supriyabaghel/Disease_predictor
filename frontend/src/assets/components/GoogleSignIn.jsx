import { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "./context";

const SignIn = () => {
  const {
    email,
    submitLogin,
    username,
    password,
    submitRegistration,
  } = useGlobalContext();

  const userObject = useRef({});

  // Callback when Google sends credential
  const handleCallback = async (response) => {
    try {
      console.log("Google JWT:", response.credential);
      userObject.current = jwtDecode(response.credential);  // ✅ fixed
      console.log("Decoded user:", userObject.current);

      username.current = userObject.current.name;
      email.current = userObject.current.email;
      password.current = response.credential.slice(0, 8);

      // Call your backend to check if email exists
      const fetchResponse = await fetch(
        `http://127.0.0.1:8000/check_email?email=${email.current}`
      );
      const data = await fetchResponse.json();

      if (data.email_exists) {
        submitLogin();
      } else {
        submitRegistration();
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "384473256270-1mj8si38j3hi51757j4r79igbotd51jh.apps.googleusercontent.com", // 🔹 Replace this
          callback: handleCallback,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        );
      } else {
        console.error("Google API not loaded. Check index.html script.");
      }
    };

    initializeGoogleSignIn();
  }, []);

  return (
    <div className="App">
      {/* Google Sign-in button will be injected here */}
      <div id="signInDiv"></div>
    </div>
  );
};

export default SignIn;
