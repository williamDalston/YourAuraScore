'use client';

import { motion } from 'framer-motion';

interface MerchSectionProps {
  hash: string;
}

const PRODUCTS = [
  { id: 'poster', name: 'Poster (18x24)', price: '$24.99', icon: '🖼️' },
  { id: 'phone-case', name: 'Phone Case', price: '$19.99', icon: '📱' },
  { id: 'stickers', name: 'Sticker Pack (3x)', price: '$9.99', icon: '✨' },
  { id: 'canvas', name: 'Canvas Print', price: '$39.99', icon: '🎨' },
  { id: 'tote', name: 'Tote Bag', price: '$22.99', icon: '👜' },
];

export default function MerchSection({ hash }: MerchSectionProps) {
  const handleMerch = async (productId: string) => {
    try {
      const res = await fetch('/api/printful', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash, product: productId }),
      });

      const data = await res.json();

      if (data.url) {
        window.open(data.url, '_blank');
      } else if (data.demo) {
        alert(`Demo mode: ${productId} merch order. In production, this opens Printful checkout.`);
      }
    } catch {
      console.error('Merch error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.2, duration: 0.5 }}
      className="px-6 py-6"
    >
      <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4 text-center">
        Wear Your Aura
      </h3>
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => handleMerch(product.id)}
            className="flex flex-col items-center gap-2 bg-white/5 border border-white/10
                       hover:bg-white/10 rounded-xl p-4 transition-all duration-200 cursor-pointer"
          >
            <span className="text-2xl">{product.icon}</span>
            <span className="text-white text-xs font-medium">{product.name}</span>
            <span className="text-white/50 text-xs">{product.price}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
