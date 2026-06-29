// components/layout/Header.tsx
'use client';

import ThemeToggle from '@/components/ui/ThemeToggle';

import Link from 'next/link';
import { useState } from 'react';
import CartIcon from '../cart/CartIcon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-text-muted/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="gradient-text">Meblanje</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
            Services
          </Link>
          <Link href="/products" className="text-text-secondary hover:text-text-primary transition-colors">
            Products
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CartIcon />
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-bg-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-text-primary mb-1.5" />
            <div className="w-6 h-0.5 bg-text-primary mb-1.5" />
            <div className="w-6 h-0.5 bg-text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-bg-primary border-t border-text-muted/10">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-text-secondary hover:text-text-primary">
              Home
            </Link>
            <Link href="/services" className="text-text-secondary hover:text-text-primary">
              Services
            </Link>
            <Link href="/products" className="text-text-secondary hover:text-text-primary">
              Products
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}