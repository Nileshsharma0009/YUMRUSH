import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white/60 pt-16 pb-6 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-secondary font-bold text-white tracking-wider">YUMRUSH</h3>
            <p className="text-sm leading-relaxed">
              Elevating the art of dining with passion, precision, and premium ingredients.
            </p>
          </div>

          {/* Visit Us */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">Visit Us</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Culinary Avenue,<br />Metropolis, NY 10012</li>
              <li className="pt-2"> <span className="text-accent">Open:</span> 11:00 AM - 11:00 PM</li>
              <li className="pt-2"> <a href="tel:+919876543210" className="hover:text-accent transition-colors">+91 98765 43210</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-accent transition-colors">Our Menu</Link></li>
              <li><Link to="/book" className="hover:text-accent transition-colors">Book a Table</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/admin/login" className="hover:text-accent transition-colors opacity-50 text-xs">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-wide uppercase text-sm">Follow</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} YumRush. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
