import patternImg from "../img/pattern.svg";

const About = () => {
  return (
    <div id="about" className="w-full flex justify-center mt-10">
      <div className="about-container flex flex-col-reverse md:flex-row items-center md:justify-between max-w-5xl w-full px-6">
        
        {/* Left Section - Text */}
        <div className="hero flex flex-col justify-center md:w-2/3 space-y-4">
          <div className="hero-text text-3xl text-center md:text-left font-bold">
            About Medware
          </div>
          <div className="hero-stanza lg:text-lg text-center md:text-left text-gray-700">
            Your one-stop healthcare provider. Our innovative medical tools
            and disease predictor offer personalized insights into your health.
            Convenient doctor consultations and a range of healthcare solutions
            are just a click away. Experience the difference with modern
            and advanced technologies with <span className="font-semibold">Medware</span>.
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="img-wrapper w-80 mb-5 md:w-1/3">
          <img src={patternImg} alt="hero" className="block w-full h-auto" />
        </div>

      </div>
    </div>
  );
};

export default About;
