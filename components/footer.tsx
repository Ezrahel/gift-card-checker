import Link from 'next/link'
import { Shield, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white to-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield size={22} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">GiftCardChecker</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Secure, instant gift card verification for complete peace of mind. Trusted by thousands of users worldwide.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Features</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition">
                  Supported Cards
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-primary transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:lilianagarcia08112@gmail.com" className="text-muted-foreground hover:text-primary transition">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8">
          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} GiftCardChecker. All rights reserved. Secure & encrypted verification.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                LinkedIn
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
