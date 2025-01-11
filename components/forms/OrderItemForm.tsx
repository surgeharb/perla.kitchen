'use client';

const PERLA_PHONE_NUMBER = '+34606466550';

interface OrderItemFormProps {
  children: React.ReactNode;
  itemTitle: string;
  className?: string;
}

export function OrderItemForm({ children, className, itemTitle }: OrderItemFormProps) {
  return (
    <form
      className={className}
      action={(formData: FormData) => {
        const selectedSize = formData.get('serving-size')?.toString().trim();
        let orderMessage = encodeURIComponent(
          `Hello! I would like to place an order for ${itemTitle}`,
        );
        if (selectedSize) {
          orderMessage += encodeURIComponent(` (${selectedSize})`);
        }
        window.open(`https://wa.me/${PERLA_PHONE_NUMBER}?text=${orderMessage}`, '_blank');
      }}>
      {children}
    </form>
  );
}
