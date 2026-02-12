'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Shield } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline tracking-tight">GiftCardChecker</span>
            <span className="font-bold text-xl text-foreground sm:hidden tracking-tight">GCC</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-foreground hover:text-primary transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition">
              How It Works
            </Link>
            <Link href="#faq" className="text-sm font-medium text-foreground hover:text-primary transition">
              FAQ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border/50">
            <nav className="flex flex-col gap-2 pt-4">
              <Link href="#features" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition">
                Features
              </Link>
              <Link href="#how-it-works" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition">
                How It Works
              </Link>
              <Link href="#faq" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition">
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
