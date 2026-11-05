import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Scale,
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  ShieldAlert,
  ChevronDown,
  BookmarkCheck,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCompare } from '../../context/CompareContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { count: compareCount } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Schools', path: '/schools' },
    { name: 'Boarding Schools', path: '/schools?boardingType=Full+Boarding' },
    {
      name: 'Girls Boarding',
      path: '/girls-boarding-schools',
      highlight: true,
    },
    {
      name: 'Compare',
      path: '/compare',
      badge: compareCount > 0 ? compareCount : null,
    },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-md shadow-premium border-b border-navy-800/80 py-3'
          : 'bg-navy-950 border-b border-navy-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-serif">
                  EDUMINATTI
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-400/20 text-gold-300 border border-gold-400/30 uppercase tracking-widest">
                  Premier
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                School Discovery & Admissions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-gold-400 font-semibold bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.highlight && (
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                )}
                <span>{link.name}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-gold-400 text-navy-950">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA / User Menu */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-navy-800/80 border border-navy-700 hover:border-gold-400/50 text-white transition-all text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-xs border border-gold-400/30">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold text-white leading-tight">
                      {user?.name?.split(' ')[0]}
                    </p>
                    <span className="text-[10px] text-gold-400 font-medium capitalize">
                      {user?.role || 'Parent'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-navy-900 border border-navy-700 shadow-2xl py-2 z-50 text-slate-200 divide-y divide-navy-800 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gold-300 hover:bg-white/5 transition-colors font-medium"
                        >
                          <ShieldAlert className="w-4 h-4 text-gold-400" />
                          Admin Console
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile & Enquiries
                      </Link>
                      <Link
                        to="/profile?tab=saved"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      >
                        <BookmarkCheck className="w-4 h-4 text-slate-400" />
                        Saved Schools
                      </Link>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 rounded-xl shadow-md transition-all hover:shadow-gold-400/20 active:scale-95"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <NavLink
              to="/compare"
              className="relative p-2 rounded-lg bg-navy-800 text-slate-300"
              aria-label="Compare schools"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 text-navy-950 text-[10px] font-bold flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-navy-800 border border-navy-700 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-navy-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-gold-400/10 text-gold-300 border border-gold-400/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  {link.highlight && (
                    <Sparkles className="w-4 h-4 text-gold-400" />
                  )}
                  {link.name}
                </span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gold-400 text-navy-950">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-navy-800 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 flex items-center gap-3 bg-navy-800/50 rounded-xl border border-navy-700">
                  <div className="w-9 h-9 rounded-lg bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-gold-300 bg-gold-500/10 border border-gold-400/30 text-sm font-medium"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-slate-200 hover:bg-white/5 text-sm font-medium"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Profile & Admission Enquiries
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 text-sm font-medium text-white bg-navy-800 hover:bg-navy-700 border border-navy-700 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 text-sm font-semibold text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl shadow-md"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
