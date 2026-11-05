import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedSchools from '../components/home/FeaturedSchools';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import PopularCities from '../components/home/PopularCities';
import AdmissionSupportBanner from '../components/home/AdmissionSupportBanner';
import Testimonials from '../components/home/Testimonials';
import FaqSection from '../components/home/FaqSection';
import EnquiryModal from '../components/common/EnquiryModal';

const HomePage = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedSchoolForEnquiry, setSelectedSchoolForEnquiry] = useState(null);

  const handleOpenEnquiry = (school = null) => {
    setSelectedSchoolForEnquiry(school);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Multi-parameter Search */}
      <HeroSection />

      {/* Categories Grid */}
      <CategorySection />

      {/* Featured Institutions */}
      <FeaturedSchools onEnquire={handleOpenEnquiry} />

      {/* Why Choose Eduminatti */}
      <WhyChooseUs />

      {/* How It Works (4 Steps) */}
      <HowItWorks />

      {/* Popular Cities */}
      <PopularCities />

      {/* Admission Advisory Banner */}
      <AdmissionSupportBanner onOpenEnquiry={handleOpenEnquiry} />

      {/* Parent Testimonials */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedSchool={selectedSchoolForEnquiry}
      />
    </div>
  );
};

export default HomePage;

