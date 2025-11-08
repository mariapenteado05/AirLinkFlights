import FlightSearchBar from "../components/FlightSearchBar";

const Hero = () => {
  return (
    <header className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
      <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] text-gradient">
        Viaje mais. <br /> Pague menos.
      </h1>

      <FlightSearchBar showLink={true} />
    </header>
  );
};

export default Hero;
