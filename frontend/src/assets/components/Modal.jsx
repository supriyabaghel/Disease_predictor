import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked, responseCall } =
    useGlobalContext();

  if (loginButtonClicked) {
    return (
      <>
        {/* Response Call (success feedback animation) */}
        {responseCall && (
          <div className="fixed responseCall top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50">
            <div className="flex flex-col items-center">
              <div className="rounded-full h-20 w-20 bg-green-400 animate-bounce flex items-center justify-center">
                ✅
              </div>
              <div className="w-28 h-2 bg-teal-700 rounded-lg mt-4"></div>
            </div>
          </div>
        )}

        {/* Main Modal */}
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-40 z-40">
          <div className="flex justify-center items-center bg-white rounded-lg shadow-lg p-6 relative w-[90%] max-w-3xl">
            {/* Left illustration */}
            <figure className="hidden xl:block w-80 pr-6">
              <img src={ModalImg} alt="Modal" className="w-full h-auto" />
            </figure>

            {/* Form Section */}
            <div className="flex-1">
              {registrationToggle ? <RegisterForm /> : <LoginForm />}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Modal;
