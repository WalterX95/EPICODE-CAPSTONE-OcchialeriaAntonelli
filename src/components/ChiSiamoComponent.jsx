import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const ChiSiamoComponent = ({
  title,
  subtitle,
  content,
  imgSrc,
  imgAlt = 'Chi siamo image',
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white w-full max-w-5xl h-full max-h-screen overflow-auto p-8 relative flex flex-col lg:flex-row">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl z-10"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Image on the left */}
        <div className="w-full lg:w-5/12 flex-shrink-0">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Text content on the right */}
        <div className="w-full lg:w-7/12 mt-6 lg:mt-0 lg:pl-10 flex flex-col justify-center text-left">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <h3 className="text-2xl text-blue-500 mb-3">{subtitle}</h3>}
          <p className="text-lg text-gray-800 mb-6 whitespace-pre-line">{content}</p>
          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded shadow-md self-start"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  );

  // Render modal via portal to body
  return createPortal(modalContent, document.body);
};

export default ChiSiamoComponent;
