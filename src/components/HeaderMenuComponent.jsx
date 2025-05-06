
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import CartDropdown from './CartDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import menuItems from '../assets/data/menu.json';

const HeaderMenuComponent = ({ logoImg }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  const toggleSearchModal = () => setIsSearchModalOpen(!isSearchModalOpen);
  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    alert('Logout effettuato');
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem.label.toLowerCase() === 'login') {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-white sticky top-0 z-10 border-gray-200 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to="/" className="flex items-center">
            <img src={logoImg} className="h-6 mr-3 sm:h-9" alt="Occhialeria Antonelli Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Occhialeria Antonelli
            </span>
          </Link>

          <div className="flex items-center lg:order-2">
            <CartDropdown />

            <button
              onClick={toggleSearchModal}
              className="ml-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Cerca
            </button>

            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className={`w-6 h-6 ${isMobileMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.route}
                    className={`block py-2 pl-3 pr-4 ${location.pathname === item.route ? 'text-purple-700' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 lg:p-0`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                {currentUser ? (
                  <button
                    onClick={handleLogout}
                    className="block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700 lg:p-0"
                  >
                    Logout ({currentUser.name})
                  </button>
                ) : (
                  <button
                    onClick={() => handleMenuClick({ label: 'Login' })}
                    className="block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700 lg:p-0"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={toggleSearchModal}>
          <div className="p-6 bg-white rounded-lg shadow-lg w-[400px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cerca Prodotto</h2>
              <button onClick={toggleSearchModal} className="text-gray-600 hover:text-gray-900 text-2xl">&times;</button>
            </div>
            <div className="flex flex-1 items-center justify-center p-6">
              <div className="w-full max-w-lg">
                <form className="mt-5 sm:flex sm:items-center">
                  <input id="q" name="q" type="search" placeholder="Cerca Prodotto" className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" autoFocus />
                  <button type="submit" className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cerca Prodotto
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onRegister={() => setIsRegisterModalOpen(true)} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </>
  );
};

export default HeaderMenuComponent;
