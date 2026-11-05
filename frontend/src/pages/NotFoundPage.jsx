import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Building } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-premium text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-navy-50 text-navy-900 border border-navy-100 flex items-center justify-center mx-auto">
          <GraduationCap className="w-8 h-8 text-gold-500" />
        </div>
        <div>
          <span className="text-4xl font-extrabold font-serif text-slate-300">404</span>
          <h2 className="text-xl font-serif font-bold text-navy-950 mt-1">
            Page Not Found
          </h2>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            The page you are looking for does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Link
            to="/"
            className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/schools"
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
          >
            Browse Schools Directory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

