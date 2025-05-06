const HeroSectionComponent = ({ title, imgHeroSection }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold">
              Sunglasses EveryWhere.
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                {title}
                <span className="text-blue-500"> Vieni a Scoprire </span>
              </h1>
              <div className="w-20 h-2 bg-blue-500 my-4"></div>
              <p className="text-xl mb-10">
                Scopri di più per i nostri prodotti.
              </p>
              <button className="bg-blue-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
                Shop
              </button>
            </div>
          </header>
        </div>
      </div>
      <img
        src={imgHeroSection}
        alt="img Hero Section"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
};

export default HeroSectionComponent;
