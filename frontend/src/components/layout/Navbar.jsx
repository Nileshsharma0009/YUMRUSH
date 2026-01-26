import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const menuRef = useRef(null);
  const linksRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) toggleMenu();
  }, [location]);

  const toggleMenu = () => {
    const isOpen = !menuOpen;
    setMenuOpen(isOpen);

    const tl = gsap.timeline();

    if (isOpen) {
      // Open Animation
      tl.to(menuRef.current, {
        x: '0%',
        duration: 0.6,
        ease: 'power3.out',
      })
        .fromTo(linksRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
          "-=0.2"
        );

      // Hamburger to X
      gsap.to(line1Ref.current, { rotate: 45, y: 6, duration: 0.3 });
      gsap.to(line2Ref.current, { rotate: -45, y: -6, duration: 0.3 });

    } else {
      // Close Animation
      tl.to(linksRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05
      })
        .to(menuRef.current, {
          x: '100%',
          duration: 0.5,
          ease: 'power3.in',
        }, "-=0.1");

      // X to Hamburger
      gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { rotate: 0, y: 0, duration: 0.3 });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'About', path: '/#about' }, // Hash link for scrolling
    { name: 'Reviews', path: '/#reviews' }, // Hash link
    { name: 'Contact', path: '/#contact' }, // Hash link
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-panel' : 'py-6 bg-transparent'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link to="/" className="text-2xl font-secondary font-bold text-accent tracking-wider">
            YUMRUSH
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-textSecondary'}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent"
                  />
                )}
              </Link>
            ))}

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/book">
              <button className="px-6 py-2 rounded-pill bg-accent text-black font-semibold text-sm hover:brightness-110 transition-all transform hover:scale-105">
                Book Table
              </button>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-[6px] focus:outline-none"
          >
            <span ref={line1Ref} className="w-6 h-[2px] bg-white block transform transition-transform"></span>
            <span ref={line2Ref} className="w-6 h-[2px] bg-white block transform transition-transform"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#0B0B0B] z-40 flex flex-col justify-center items-center transform translate-x-full md:hidden"
      >
        <div ref={linksRef} className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-3xl font-secondary font-bold ${location.pathname === link.path ? 'text-accent' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/book">
            <button className="mt-8 px-10 py-4 rounded-pill bg-accent text-black font-bold text-lg">
              Book a Table
            </button>
          </Link>
        </div>

        {/* Decorative background blur */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </>
  );
};

export default Navbar;
