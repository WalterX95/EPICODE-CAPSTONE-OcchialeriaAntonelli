const ServiziComponent = ({ title, services }) => {
    return (
      <section className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-white dark:text-gray-600 mb-12 animate-fade-in">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: srv.delay }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-800 dark:text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={srv.svgPath} />
              </svg>
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-2">
                {srv.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {srv.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ServiziComponent;