import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'When should parents begin applying for boarding schools in India?',
    a: 'Most premier boarding schools (including Dehradun and Ajmer heritage institutions) begin their annual registration cycle between July and November for the academic session starting the following April. Selective entrance tests are conducted between October and January. We recommend starting your research 10 to 12 months in advance.',
  },
  {
    q: 'How safe and secure are all-girls boarding schools like Ecole Globale?',
    a: "Top girls boarding schools maintain stringent multi-tiered safety protocols: 24/7 high-definition perimeter CCTV surveillance, female security guards, biometric access controls at all dormitory entry points, resident female housemistresses, and on-campus medical infirmaries with 24-hour resident doctors and ambulances. Visitor authorizations undergo rigorous verification.",
  },
  {
    q: 'What is the key difference between Full Boarding and Weekly Boarding?',
    a: 'Full Boarding students reside on campus throughout the semester, participating in weekend excursions, sports leagues, and cultural societies. Weekly Boarding allows students to stay on campus Monday through Friday and spend weekends at home with their families — an ideal solution for parents residing in metropolitan proximity.',
  },
  {
    q: 'What are the typical annual fee structures for premier boarding schools in India?',
    a: 'Annual fees generally range from INR 5.5 Lakhs to 12.0 Lakhs for established Indian curriculum schools (CBSE / ICSE), and INR 12.0 Lakhs to 22.0 Lakhs for International Baccalaureate (IB) Continuum schools like Woodstock and TISB. This comprehensive figure typically includes academic tuition, boarding, laundry, and meals, while pocket money and specialized overseas expeditions are billed separately.',
  },
  {
    q: 'Does Eduminatti charge parents or students for using the platform?',
    a: 'No. Eduminatti is 100% free for parents and students. You can explore school directories, filter curricula, compare facilities, view transparent fee schedules, and submit admission enquiries without paying any platform consultation fee.',
  },
  {
    q: 'How do I choose between CBSE, ICSE, and IB curricula?',
    a: 'CBSE is optimal for students focusing on Indian competitive examinations (JEE, NEET, CUET). ICSE/ISC emphasizes deep literature, humanities, and comprehensive foundational sciences. The IB Diploma Programme emphasizes critical inquiry (TOK, Extended Essay, CAS) and is globally recognized for applications to universities in the US, UK, and Europe.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-600 bg-gold-400/10 px-3.5 py-1 rounded-full border border-gold-400/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-navy-950 mt-3">
            Everything Parents Ask About School Admissions
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Clear answers to common questions regarding boarding life, admissions, and financial planning.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-navy-950 font-serif">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-navy-900 text-white border-navy-900' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-2 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
