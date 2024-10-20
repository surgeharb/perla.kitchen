import Image from 'next/image';

export const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <Image src="/whatsapp.svg" alt="WhatsApp" width={size} height={size} />
);
