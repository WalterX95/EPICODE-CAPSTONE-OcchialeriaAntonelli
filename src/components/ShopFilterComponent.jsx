import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShopFilterComponent = ({ dataUrl, isOpen, onClose }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    category: "all",
    priceRange: [0, 1000],
    sortBy: "price-asc"
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error("Errore nel caricamento dati");
        const data = await response.json();
        
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [dataUrl, isOpen]);

  const filteredProducts = products
    .filter(product => 
      product.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())
    )
    .filter(product => 
      filters.category === "all" || product.category === filters.category
    )
    .filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )
    .sort((a, b) => {
      switch(filters.sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Filtri e Prodotti</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="text-center p-8">Caricamento...</div>
          ) : error ? (
            <div className="text-red-500 p-8">Errore: {error}</div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filtri */}
              <div className="lg:w-64 space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Cerca prodotti..."
                    className="w-full p-2 border rounded"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                  />
                </div>

                <div>
                  <h3 className="font-bold mb-2">Categoria</h3>
                  <select 
                    className="w-full p-2 border rounded"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="all">Tutte le categorie</option>
                    {categories
                      .filter(Boolean)
                      .map((category, idx) => (
                        <option key={`${category}-${idx}`} value={category}>
                          {category}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Fascia di Prezzo</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="number"
                      className="w-1/2 p-1 border rounded"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters((prev) => ({
                        ...prev,
                        priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                      }))}
                    />
                    <input
                      type="number"
                      className="w-1/2 p-1 border rounded"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters((prev) => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value) || 0]
                      }))}
                    />
                  </div>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="1000"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value) || 0]
                    }))}
                  />
                </div>

                <div>
                  <h3 className="font-bold mb-2">Ordina per</h3>
                  <select
                    className="w-full p-2 border rounded"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                  >
                    <option value="price-asc">Prezzo: Crescente</option>
                    <option value="price-desc">Prezzo: Decrescente</option>
                    <option value="name-asc">Nome: A-Z</option>
                    <option value="name-desc">Nome: Z-A</option>
                  </select>
                </div>
              </div>

              {/* Lista prodotti */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <div key={product.id ?? `prod-${idx}`} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name || 'Senza nome'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Link
                          to={`/product/${product.id}`}
                          className="bg-white/90 px-4 py-2 rounded-full hover:bg-white transition-colors"
                          onClick={onClose}
                        >
                          Dettagli
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{product.name || 'Senza nome'}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {product.description || 'Descrizione non disponibile'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">
                          €{(product.price != null ? product.price.toFixed(2) : '0.00')}
                        </span>
                        <button 
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            console.log('Aggiunto al carrello:', product.id);
                            onClose();
                          }}
                        >
                          Acquista
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">
                      {filters.searchTerm 
                        ? "Nessun risultato per la tua ricerca" 
                        : "Nessun prodotto disponibile"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t p-4 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopFilterComponent;
