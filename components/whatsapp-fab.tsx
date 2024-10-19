import React from 'react';
import { WhatsAppIcon } from './whatsapp-icon';

export const WhatsAppFAB: React.FC = () => {
  const phoneNumber = '+34606466550';
  const message = encodeURIComponent('Hello! I would like to place an order.');

  return (
    <>
      {/* Spacer */}
      <div className="p-10" />
      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg"
        aria-label="Contact us on WhatsApp">
        <WhatsAppIcon size={24} />
      </a>
    </>
  );
};
