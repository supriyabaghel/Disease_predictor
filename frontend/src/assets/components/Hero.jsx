import hero_img from "../img/hero-img.svg";
import Button from "@mui/material/Button";
import { useGlobalContext } from "./context";

const Hero = () => {
  const { setLoginButtonClicked, setRegistrationToggle } = useGlobalContext();

  return (
    <div className="w-4/5 mx-auto pt-10 lg:pt-0 flex flex-col lg:flex-row items-center justify-between gap-16">
      
      {/* Left text section */}
      <div className="hero flex flex-col text-center lg:text-left max-w-xl lg:max-w-2xl lg:flex-1">
        
        {/* Headline */}
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight text-gray-900">
          Your Healthcare, Simplified!
        </h1>

        {/* Subheading */}
        <h2 className="text-3xl lg:text-4xl text-gray-700 mb-6 leading-relaxed font-medium">
          Experience optimal health with simplified solutions, just a click away!
        </h2>

        {/* Buttons */}
        <div className="flex justify-center lg:justify-start gap-6 mt-4">
          <Button
            variant="contained"
            color="primary"
            className="!px-8 !py-4 !text-lg !rounded-xl !shadow-lg hover:!scale-105 hover:!shadow-xl transition-all"
            onClick={() => {
              setRegistrationToggle(true);
              setLoginButtonClicked(true);
            }}
          >
            Join Us
          </Button>

          <Button
            variant="outlined"
            color="success"
            className="!px-8 !py-4 !text-lg !rounded-xl !border-2 hover:!bg-green-50 hover:!scale-105 transition-all"
            onClick={() => {
              setLoginButtonClicked(true);
              setRegistrationToggle(false);
            }}
          >
            Already a Member?
          </Button>
        </div>
      </div>

      {/* Right image section */}
      <div className="img-wrapper w-80 sm:w-96 lg:w-1/2 lg:flex-1 flex justify-center">
        <img src={hero_img} alt="hero" className="block w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
