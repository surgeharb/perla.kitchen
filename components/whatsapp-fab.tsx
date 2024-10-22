'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { useOnLoadEffect } from '@/hooks/useOnLoadEffect';
import { WhatsAppIcon } from './whatsapp-icon';

const phoneNumber = '+34606466550';
const message = encodeURIComponent('Hello! I would like to place an order.');

export const WhatsAppFAB: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useOnLoadEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, true);

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* Spacer */}
      <div className="p-10" />
      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none',
        )}
        aria-label="Contact us on WhatsApp">
        <WhatsAppIcon size={24} />
      </a>
    </>
  );
};
