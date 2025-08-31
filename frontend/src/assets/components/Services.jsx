import { Button } from "@mui/material";
import servicesImg from "../img/services-img.svg";
import diseasePredImg from "../img/diseasepredictor.svg";
import { useGlobalContext } from "./context";

const Services = () => {
  const { setLoginButtonClicked } = useGlobalContext();

  return (
    <div id="services" className="w-full flex flex-col items-center">
      {/* First section */}
      <div className="services-container pt-20 flex flex-col lg:flex-row items-center">
        <div className="img-wrapper w-96 lg:w-1/2 flex pt-2">
          <img src={servicesImg} alt="services" className="block w-full" />
        </div>
        <div className="hero flex flex-col justify-center w-full lg:w-1/2">
          <div className="hero-text px-2 text-2xl lg:text-4xl font-bold">
            Access Quality Healthcare Assistance Anytime, Anywhere
          </div>
          <div className="hero-stanza lg:text-lg mt-4 text-gray-600">
            Medware provides you with your go-to Healthcare Services
            with ease from any device and location!
          </div>
        </div>
      </div>

      {/* Disease predictor section */}
      <div className="disease-predictor flex flex-col md:flex-row items-center mt-16 w-full justify-center">
        <div className="img-wrapper-predictor w-full sm:w-4/5 md:w-1/2">
          <img src={diseasePredImg} alt="predictor" className="block w-full" />
        </div>

        <div className="w-4/5 md:w-1/2 flex flex-col justify-center md:pl-8 mt-6 md:mt-0">
          <div className="hero-text text-3xl lg:text-5xl mb-4 font-bold">
            Feeling low?
          </div>
          <div className="hero-stanza lg:text-xl text-gray-600 mb-6">
            Use our built-in Disease Predictor and get recommended
            medical assistance instantly.
          </div>
          <div className="hero-btn-container flex gap-4">
            <Button
              variant="outlined"
              color="secondary"
              className="hover:scale-105 md:w-60 md:h-16"
              onClick={() => setLoginButtonClicked(true)}
            >
              Disease Predictor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="hover:scale-105 md:w-60 md:h-16"
              onClick={() => setLoginButtonClicked(true)}
            >
              Contact Doctor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
