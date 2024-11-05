import heroImg from "../assets/banner.jpg";

const HeroImageCard = () => {
  return (
    <div className="hero-image w-4/5 lg:w-3/4  absolute p-5 rounded-lg border border-white bg-white/15 left-20 lg:left-48 top-[350px] lg:top-72">
      <img
        className="w-full rounded-lg lg:h-[500px] object-cover object-center"
        src={heroImg}
        alt="banner-img"
      />
    </div>
  );
};
export default HeroImageCard;
