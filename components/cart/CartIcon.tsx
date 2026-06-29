// components/cart/CartIcon.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <button className="relative p-2 rounded-full hover:bg-bg-secondary transition-colors">
      <ShoppingBag className="w-6 h-6 text-text-primary" />
      
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {totalItems > 99 ? '99+' : totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}