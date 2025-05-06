import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HeaderMenuComponent from './components/HeaderMenuComponent';
import FooterComponent from './components/FooterComponent';
import HeroSectionComponent from './components/HeroSectionComponent';
import ShopProductPage from './components/ShopProductPage';
import SingleProductComponent from './components/SingleProductComponent';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ChiSiamoComponent from './components/ChiSiamoComponent';
import Error404Component from './components/Error404Component';
import ServiziComponent from './components/ServiziComponent';
import serviziData from './assets/data/serviziPage.json';
import ContattiComponent from './components/ContattiComponent';

// Pagina wrapper per la rotta /servizi
function ServiziPage() {
  return (
    <ServiziComponent
      title="I nostri servizi"
      services={serviziData}
    />
  );
}

// Wrapper per la modale "Chi Siamo"
function ChiSiamoRouteWrapper() {
  const navigate = useNavigate();
  return (
    <ChiSiamoComponent
      isOpen={true}
      onClose={() => navigate('/')}
      title="Chi siamo"
      subtitle="Occhiali di fiducia"
      content={`Siamo un’azienda specializzata in occhiali da sole di alta qualità.
La nostra missione è proteggere i tuoi occhi con stile.`}
      imgSrc="src/assets/img/occhialeriaAntonelli-logo.jpg"
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <HeaderMenuComponent logoImg="src/assets/img/occhialeriaAntonelli-logo.jpg" />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSectionComponent title="Benvenuto" imgHeroSection="src/assets/img/home-slider-2.jpg" />
              <ShopProductPage dataUrl="/src/assets/data/products.json" />
            </>
          }
        />
        <Route path="/shop" element={<ShopProductPage dataUrl="/src/assets/data/products.json" />} />
        <Route path="/product/:id" element={<SingleProductComponent />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/chi-siamo" element={<ChiSiamoRouteWrapper />} />
        <Route path="/servizi" element={<ServiziPage />} />
        <Route path="/contatti" element={<ContattiComponent />} />
        <Route path="*" element={<Error404Component />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
