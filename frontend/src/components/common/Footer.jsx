import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Top Banner CTA */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border-b border-navy-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
              Personalized Admission Counselling
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-3">
              Need help selecting the best boarding school?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Connect with our experienced education advisors for confidential, 1-on-1 school selection and admissions guidance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold text-sm shadow-lg hover:shadow-gold-400/20 hover:scale-105 transition-all"
            >
              Talk to a Counsellor
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+911352750000"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-navy-800 text-white font-medium text-sm border border-navy-700 hover:bg-navy-750 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              +91 (135) 275-0000
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-md">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-white font-serif">
                  EDUMINATTI
                </span>
                <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  Premier School Discovery Platform
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              India's premier education advisory and school discovery network. We empower parents and guardians with verified information, transparent fee structures, and comparative insights into the country's finest boarding and day schools.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Rajpur Road Education Hub, Dehradun, Uttarakhand 248001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>admissions@eduminatti.mock</span>
              </div>
            </div>
          </div>

          {/* School Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Explore Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  to="/girls-boarding-schools"
                  className="hover:text-gold-400 transition-colors flex items-center gap-1.5 font-medium text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                  Girls Boarding Schools
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?boardingType=Full+Boarding"
                  className="hover:text-gold-400 transition-colors"
                >
                  Co-Ed Boarding Schools
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?category=Boys+Boarding+Schools"
                  className="hover:text-gold-400 transition-colors"
                >
                  Boys Boarding Schools
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?category=International+Schools"
                  className="hover:text-gold-400 transition-colors"
                >
                  IB & Cambridge Schools
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?category=Day+Schools"
                  className="hover:text-gold-400 transition-colors"
                >
                  Top Day Schools
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?boardingType=Weekly+Boarding"
                  className="hover:text-gold-400 transition-colors"
                >
                  Weekly Boarding Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Education Hubs */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Popular Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link
                  to="/schools?city=Dehradun"
                  className="hover:text-gold-400 transition-colors"
                >
                  Schools in Dehradun
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?city=Mussoorie"
                  className="hover:text-gold-400 transition-colors"
                >
                  Schools in Mussoorie
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?city=Ajmer"
                  className="hover:text-gold-400 transition-colors"
                >
                  Schools in Ajmer
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?city=Gwalior"
                  className="hover:text-gold-400 transition-colors"
                >
                  Schools in Gwalior
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?city=Kasauli"
                  className="hover:text-gold-400 transition-colors"
                >
                  Schools in Kasauli
                </Link>
              </li>
              <li>
                <Link
                  to="/schools?city=Bengaluru"
                  className="hover:text-gold-400 transition-colors"
                >
                  Schools in Bengaluru
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-navy-800 pb-2">
              Platform & Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/compare" className="hover:text-gold-400 transition-colors">
                  School Comparison Tool
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  About Eduminatti
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors">
                  Admission Advisory Desk
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gold-400 transition-colors">
                  Parent Portal Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gold-400 transition-colors">
                  Register as Student/Parent
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gold-400 transition-colors text-xs text-slate-500">
                  School Admin Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer on Demonstration Data */}
        <div className="mt-12 pt-8 border-t border-navy-800 text-xs text-slate-500 leading-relaxed">
          <p className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Accreditation & Data Transparency Notice:</strong> Eduminatti is an independent educational discovery platform built for portfolio and internship demonstration. School fee ranges, admission procedures, and curriculum details are curated from public informational disclosures. We recommend confirming final fee schedules and deadlines directly with school admissions offices.
            </span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EDUMINATTI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
