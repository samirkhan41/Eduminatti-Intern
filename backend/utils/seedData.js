const schoolsData = [
  {
    name: "Ecole Globale International Girls' School",
    slug: "ecole-globale-international-girls-school",
    tagline: "Empowering Young Women to Lead with Grace, Intellect, and Resilience",
    city: "Dehradun",
    state: "Uttarakhand",
    address: "Sahaspur Road, Horawalla, Dehradun, Uttarakhand 248197",
    pincode: "248197",
    establishedYear: 2012,
    category: "Girls Boarding Schools",
    gender: "Girls Only",
    boardingType: "Full Boarding",
    curriculum: ["CBSE", "CIE"],
    gradeLevels: "Grade 4 to 12",
    annualFeesMin: 750000,
    annualFeesMax: 950000,
    rating: 4.9,
    reviewCount: 128,
    isVerified: true,
    isFeatured: true,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Ranked among India's top premier fully-residential girls' boarding schools, Ecole Globale spans a lush 40-acre campus against the picturesque backdrop of the Shivalik hills. It provides world-class holistic pedagogy, international sports training, and an empowering pastoral ecosystem tailored specifically for young female leaders.",
    about: "Founded with the conviction that girls' education should cultivate intellectual curiosity, emotional fortitude, and global awareness, Ecole Globale offers dual affiliations with the Central Board of Secondary Education (CBSE) and Cambridge Assessment International Education (CAIE). The curriculum integrates rigorous STEM and humanities programmes with comprehensive performing arts, equestrian training, and community service.",
    academics: {
      description: "Blended academic model combining experiential laboratories, project-based inquiry, and personalized academic mentoring. Advanced college counseling prepares students for top Ivy League and Indian universities.",
      studentTeacherRatio: "8:1",
      streamOptions: ["Science (Medical & Non-Medical)", "Commerce", "Humanities / Liberal Arts"],
      teachingMethodology: "Student-Centred Inquiry, Design Thinking, and Global Perspectives",
      languagesOffered: ["English", "Hindi", "French", "Spanish", "Sanskrit"]
    },
    boardingFacilities: {
      description: "Air-conditioned architecturally planned residential dormitories structured into 4 vibrant houses. Each floor is monitored by dedicated resident Housemistresses and pastoral assistants.",
      roomSharing: "2-3 girls per spacious dorm with climate control and ergonomic study desks",
      messDietary: "ISO-certified multi-cuisine dining hall serving freshly cooked organic vegetarian and non-vegetarian selections planned by certified pediatric dieticians",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Resident female Housemistresses, full-time clinical psychologist, life-skills tutors, and compassionate pastoral counselors available 24 hours a day"
    },
    sportsFacilities: [
      "Championship Equestrian & Horse Riding Arena",
      "All-Weather Temperature Regulated Swimming Pool",
      "Floodlit Synthetic Tennis Courts",
      "Indoor Badminton Arena (BWF Approved Flooring)",
      "10m Air Rifle Shooting Range",
      "Squash Courts & Gymnastics Studio",
      "Yoga, Martial Arts, and Aerobics Pavilion"
    ],
    infrastructure: [
      "40-Acre Zero-Emission Green Campus",
      "State-of-the-Art Apple Mac Computing & Robotics Labs",
      "600-Seat Acoustic Performing Arts Auditorium",
      "Central Automated Library with 25,000+ Volumes",
      "Smart Interactive Promethean Boards in All Classrooms",
      "Soundproof Music Recording Studio & Dance Conservatories"
    ],
    safetyFeatures: [
      "Strict Female-Led Campus Security & Residence Management",
      "24/7 Monitored High-Definition Perimeter CCTV Coverage",
      "Biometric Access at All Residential Dormitory Entrances",
      "12-Bed Modern Medical Infirmary with Resident Doctors & Ambulance",
      "Zero-Tolerance Anti-Bullying Protocol and POSH Compliance"
    ],
    feeStructure: {
      registrationFee: 25000,
      admissionFee: 150000,
      securityDepositRefundable: 200000,
      annualTuitionBoarding: "INR 7.5 Lakhs - 9.5 Lakhs per annum (All Inclusive)"
    },
    admissionProcedure: {
      eligibility: "Girls seeking admission to Grades 4 through 11 based on age criteria and academic baseline performance.",
      steps: [
        "Online Registration and Submission of Student Portfolio",
        "Aptitude Diagnostic Assessment in English, Mathematics and Science",
        "Interactive Video or Campus Session with Principal and Pastoral Dean",
        "Provisional Admission Letter and Document Attestation",
        "Enrolment Confirmation and Medical Fitness Clearance"
      ],
      applicationDeadline: "Rolling Admissions for Academic Year 2025-2026",
      applicationFee: 5000
    },
    contactInfo: {
      phone: "+91-135-2698100",
      email: "admissions@ecoleglobale.mock",
      website: "https://www.ecoleglobale.com",
      counsellorName: "Ms. Shalini Sharma (Head of Admissions)",
      counsellorContact: "+91-9557291888"
    }
  },
  {
    name: "Welham Girls' School",
    slug: "welham-girls-school",
    tagline: "Cultivating Courage, Integrity, and Excellence Since 1957",
    city: "Dehradun",
    state: "Uttarakhand",
    address: "19 - Municipal Road, Dalanwala, Dehradun, Uttarakhand 248001",
    pincode: "248001",
    establishedYear: 1957,
    category: "Girls Boarding Schools",
    gender: "Girls Only",
    boardingType: "Full Boarding",
    curriculum: ["ICSE", "ISC"],
    gradeLevels: "Grade 6 to 12",
    annualFeesMin: 720000,
    annualFeesMax: 880000,
    rating: 4.9,
    reviewCount: 165,
    isVerified: true,
    isFeatured: true,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Established in 1957 by Ms. Oliphant, Welham Girls' School is one of the most prestigious legacy all-girls residential institutions in South Asia. Renowned for academic excellence, fierce debating, and distinguished alumnae across public policy and diplomacy.",
    about: "Welham Girls' School provides an environment where traditions meet contemporary educational thinking. Alumnae include distinguished civil servants, authors, and corporate leaders. Its tranquil Dalanwala campus offers an ideal sanctuary for scholarly depth and character building.",
    academics: {
      description: "Rigorous ICSE and ISC curriculum consistently yielding state and national toppers. High focus on critical reading, MUNs, and social sciences.",
      studentTeacherRatio: "10:1",
      streamOptions: ["Science", "Commerce", "Humanities"],
      teachingMethodology: "Socratic Method, Empirical Science Labs, and Debating Colloquiums",
      languagesOffered: ["English", "Hindi", "French", "Sanskrit"]
    },
    boardingFacilities: {
      description: "Historic boarding houses fostering lifelong sisterhood bonds under matron supervision.",
      roomSharing: "3-4 students per dorm room grouped by academic house",
      messDietary: "Traditional hygienic boarding fare with multi-regional Indian and Continental dishes",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Resident house parents and counselling psychologists"
    },
    sportsFacilities: [
      "Basketball Courts with Glass Backboards",
      "Grass Hockey Ground",
      "25m Swimming Pool",
      "Synthetic Tennis Courts",
      "Karate & Taekwondo Arena"
    ],
    infrastructure: [
      "Heritage Colonial Academic Blocks",
      "Modernized Science and Computer Labs",
      "Amphitheatre for Cultural Festivals",
      "Extensive Archival Library"
    ],
    safetyFeatures: [
      "24/7 Monitored Campus Perimeter",
      "Gated Security with Verification Checks",
      "Dedicated Full-Time Infirmary and Resident Medical Officer"
    ],
    feeStructure: {
      registrationFee: 20000,
      admissionFee: 120000,
      securityDepositRefundable: 150000,
      annualTuitionBoarding: "INR 7.2 Lakhs - 8.8 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Competitive written entrance exam for Class 6 and Class 7.",
      steps: [
        "Registration by October preceding academic year",
        "Common All-India Written Entrance Examination",
        "Personal Interaction Session with Candidate and Parents",
        "Merit List Announcement"
      ],
      applicationDeadline: "Annual cut-off: 15th November",
      applicationFee: 6000
    },
    contactInfo: {
      phone: "+91-135-2657296",
      email: "admissions@welhamgirls.mock",
      website: "https://www.welhamgirls.com",
      counsellorName: "Registrar Admissions",
      counsellorContact: "+91-135-2654753"
    }
  },
  {
    name: "Scindia Kanya Vidyalaya",
    slug: "scindia-kanya-vidyalaya",
    tagline: "Empowering Indian Girls with Heritage, Values, and Modern Dynamism",
    city: "Gwalior",
    state: "Madhya Pradesh",
    address: "Moti Mahal Road, Gwalior, Madhya Pradesh 474007",
    pincode: "474007",
    establishedYear: 1956,
    category: "Girls Boarding Schools",
    gender: "Girls Only",
    boardingType: "Full Boarding",
    curriculum: ["CBSE"],
    gradeLevels: "Grade 6 to 12",
    annualFeesMin: 550000,
    annualFeesMax: 700000,
    rating: 4.8,
    reviewCount: 94,
    isVerified: true,
    isFeatured: true,
    isPopular: false,
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Founded by Rajmata Vijaya Raje Scindia of Gwalior in 1956, SKV is a member of the prestigious Round Square conference. It emphasizes experiential learning, cultural preservation, and modern scientific acumen.",
    about: "Located in the historic city of Gwalior, SKV combines princely heritage with cutting-edge academic pedagogy. The school has pioneered vocational training, entrepreneurial incubation for girls, and international student exchange programmes.",
    academics: {
      description: "CBSE curriculum augmented with Round Square IDEALS (Internationalism, Democracy, Environment, Adventure, Leadership, and Service).",
      studentTeacherRatio: "11:1",
      streamOptions: ["Science", "Commerce", "Humanities", "Vocational Arts"],
      teachingMethodology: "Round Square Discovery Framework and Experiential Workstations",
      languagesOffered: ["English", "Hindi", "French", "German"]
    },
    boardingFacilities: {
      description: "Air-cooled and air-conditioned heritage dorms named after iconic Indian historical figures.",
      roomSharing: "3-4 students per suite",
      messDietary: "Pure vegetarian nutritious Indian kitchen with supervised dining etiquette",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Dedicated housemothers and peer mentorship buddies"
    },
    sportsFacilities: [
      "Archery and Shooting Academy",
      "Swimming Pool",
      "Lawn Tennis & Basketball Courts",
      "Yoga & Aerobics Center"
    ],
    infrastructure: [
      "35-Acre Serene Green Campus",
      "Tinkering Science Labs & Innovation Centre",
      "Heritage Open-Air Amphitheatre",
      "Textile Designing and Pottery Studios"
    ],
    safetyFeatures: [
      "Round-the-clock Security Staff",
      "Campus Hospital with Resident Doctor",
      "Bio-metric Gates and Visitor Scanners"
    ],
    feeStructure: {
      registrationFee: 15000,
      admissionFee: 80000,
      securityDepositRefundable: 100000,
      annualTuitionBoarding: "INR 5.5 Lakhs - 7.0 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Girls seeking admission to Grades 6 to 11 via SKV Aptitude Assessment.",
      steps: [
        "Online Application Submission",
        "Common Aptitude Assessment Test (CAAT)",
        "Candidate & Family Interaction",
        "Offer of Admission"
      ],
      applicationDeadline: "January 15th for April Session",
      applicationFee: 4000
    },
    contactInfo: {
      phone: "+91-751-2449500",
      email: "admissions@skvgwalior.mock",
      website: "https://www.skvgwalior.org",
      counsellorName: "Admissions Secretariat",
      counsellorContact: "+91-751-2449501"
    }
  },
  {
    name: "Mayo College Girls' School",
    slug: "mayo-college-girls-school",
    tagline: "Nurturing Global Visionaries Grounded in Indian Ethos",
    city: "Ajmer",
    state: "Rajasthan",
    address: "Mayo Link Road, Bhajan Ganj, Ajmer, Rajasthan 305001",
    pincode: "305001",
    establishedYear: 1987,
    category: "Girls Boarding Schools",
    gender: "Girls Only",
    boardingType: "Full Boarding",
    curriculum: ["ICSE", "ISC"],
    gradeLevels: "Grade 4 to 12",
    annualFeesMin: 780000,
    annualFeesMax: 920000,
    rating: 4.9,
    reviewCount: 110,
    isVerified: true,
    isFeatured: true,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Sister school to the legendary Mayo College, MCGS is situated on a sprawling 46-acre oasis in Ajmer. Celebrated for aristocratic polish, stellar equestrian achievements, and intellectual depth.",
    about: "MCGS is an institution steeped in royal traditions that has seamlessly embraced contemporary pedagogical innovation. With students hailing from over 15 nations, the school instills profound cosmopolitan sensibilities while honoring traditional Indian values.",
    academics: {
      description: "Comprehensive CISCE framework emphasizing analytical writing, debate, and advanced mathematical problem solving.",
      studentTeacherRatio: "9:1",
      streamOptions: ["Science", "Commerce", "Humanities"],
      teachingMethodology: "Interactive Inquiry, Experiential Trips, and Model United Nations",
      languagesOffered: ["English", "Hindi", "French", "Sanskrit", "German"]
    },
    boardingFacilities: {
      description: "Seven graceful boarding houses equipped with modern domestic science rooms, music parlours, and leisure lounges.",
      roomSharing: "2-3 girls per room with attached dressing rooms",
      messDietary: "Exquisite dining hall serving balanced international and Indian cuisine under nutritionist supervision",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Housemistresses assisted by Matrons and Resident Tutors"
    },
    sportsFacilities: [
      "Full Equestrian Club with 30+ Thoroughbred Horses",
      "Olympic Length Swimming Pool",
      "Indoor Squash & Badminton Courts",
      "Grass Polo and Athletics Field",
      "Golf Driving Range"
    ],
    infrastructure: [
      "Majestic Indo-Saracenic Red Sandstone Architecture",
      "State-of-the-art Science and Computer Pavilions",
      "Open Air Greek Theatre",
      "Audio-Visual Resource Center"
    ],
    safetyFeatures: [
      "High Perimeter Security Walls with Motion Sensors",
      "24/7 Security Patrols and Closed Circuit Monitoring",
      "Resident Lady Doctor and Emergency Trauma Van"
    ],
    feeStructure: {
      registrationFee: 25000,
      admissionFee: 150000,
      securityDepositRefundable: 200000,
      annualTuitionBoarding: "INR 7.8 Lakhs - 9.2 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Admissions granted for Classes 4 to 8 through the Mayo Common Entrance Examination.",
      steps: [
        "Registration by November",
        "All-India Written Examination (English, Maths, Hindi)",
        "Personal Interaction Session in Ajmer",
        "Final Admission Letter"
      ],
      applicationDeadline: "November 30th",
      applicationFee: 6500
    },
    contactInfo: {
      phone: "+91-145-2661286",
      email: "admissions@mcgs.mock",
      website: "https://www.mcgs.ac.in",
      counsellorName: "Dean of Admissions",
      counsellorContact: "+91-145-2661287"
    }
  },
  {
    name: "Hopetown Girls' School",
    slug: "hopetown-girls-school",
    tagline: "Inspiring Confidence, Creativity, and Compassion in Every Girl",
    city: "Dehradun",
    state: "Uttarakhand",
    address: "Rajawala Road, Selaqui, Dehradun, Uttarakhand 248011",
    pincode: "248011",
    establishedYear: 1999,
    category: "Girls Boarding Schools",
    gender: "Girls Only",
    boardingType: "Full Boarding",
    curriculum: ["ICSE", "ISC"],
    gradeLevels: "Grade 5 to 12",
    annualFeesMin: 680000,
    annualFeesMax: 820000,
    rating: 4.8,
    reviewCount: 78,
    isVerified: true,
    isFeatured: false,
    isPopular: false,
    heroImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Nestled in a picturesque 50-acre valley in Selaqui, Hopetown Girls' School is a residential school that nurtures 500 girls into compassionate, open-minded, and self-assured young women.",
    about: "Hopetown is renowned for warm pastoral care, vibrant art and design curricula, and expansive sporting facilities. The non-competitive early learning atmosphere fosters deep bonding and individual discovery.",
    academics: {
      description: "CISCE curriculum complemented with rigorous performing arts, environmental sustainability programs, and leadership summits.",
      studentTeacherRatio: "9:1",
      streamOptions: ["Science", "Commerce", "Humanities"],
      teachingMethodology: "Collaborative problem solving and expressive arts integration",
      languagesOffered: ["English", "Hindi", "French"]
    },
    boardingFacilities: {
      description: "Cottage-style residential houses designed to feel like cozy second homes.",
      roomSharing: "3-4 girls per room",
      messDietary: "Wholesome vegetarian and non-vegetarian fare cooked in a clean modern kitchen",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Live-in residential housemistresses and counsellors"
    },
    sportsFacilities: [
      "Swimming Pool",
      "Football & Hockey Fields",
      "Tennis & Basketball Courts",
      "Roller Skating Rink"
    ],
    infrastructure: [
      "Sprawling 50-Acre Scenic Green Campus",
      "Design & Visual Arts Studios",
      "Modern Science & Computer Labs",
      "Performing Arts Hall"
    ],
    safetyFeatures: [
      "24/7 Gated Security",
      "High Density CCTV Coverage",
      "Well-Staffed Campus Infirmary"
    ],
    feeStructure: {
      registrationFee: 20000,
      admissionFee: 100000,
      securityDepositRefundable: 150000,
      annualTuitionBoarding: "INR 6.8 Lakhs - 8.2 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Girls entering Classes 5 to 9 and Class 11.",
      steps: [
        "Online Registration",
        "General Aptitude Assessment",
        "Family Interaction",
        "Admission Confirmation"
      ],
      applicationDeadline: "Rolling Basis",
      applicationFee: 4500
    },
    contactInfo: {
      phone: "+91-135-2698534",
      email: "admissions@hopetown.mock",
      website: "https://www.hopetown.co.in",
      counsellorName: "Admissions Office",
      counsellorContact: "+91-9897000000"
    }
  },
  {
    name: "The Doon School",
    slug: "the-doon-school",
    tagline: "An All-India School for Boys of Exceptional Calibre",
    city: "Dehradun",
    state: "Uttarakhand",
    address: "Mall Road, Krishna Nagar, Dehradun, Uttarakhand 248001",
    pincode: "248001",
    establishedYear: 1935,
    category: "Boys Boarding Schools",
    gender: "Boys Only",
    boardingType: "Full Boarding",
    curriculum: ["IB", "ICSE", "ISC"],
    gradeLevels: "Grade 7 to 12",
    annualFeesMin: 1100000,
    annualFeesMax: 1450000,
    rating: 5.0,
    reviewCount: 220,
    isVerified: true,
    isFeatured: true,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Often dubbed the 'Eton of India', The Doon School is the premier full boarding school for boys, situated on a verdant 70-acre estate known as Chandbagh. Renowned for generating prime ministers, authors, diplomats, and industry captains.",
    about: "Founded in 1935 by Satish Ranjan Das, Doon specializes solely in boys' boarding education for ages 12 to 18. Its alumni (Doscos) form one of the world's most influential networks. It offers both the Indian CISCE curriculum and the International Baccalaureate (IB) Diploma.",
    academics: {
      description: "Dual track CISCE / IB Diploma offering extraordinary academic rigour and world-class university placements worldwide.",
      studentTeacherRatio: "8:1",
      streamOptions: ["Science", "Commerce", "Humanities", "IB Diploma"],
      teachingMethodology: "Harkness Table Discussions, Field Expeditions, Social Service",
      languagesOffered: ["English", "Hindi", "French", "German", "Spanish", "Sanskrit"]
    },
    boardingFacilities: {
      description: "Five main houses and two holding houses with heritage architecture and modern amenities.",
      roomSharing: "Junior dorms of 4-6, single/double rooms for senior boys in Grade 11 & 12",
      messDietary: "Central Dining Hall with world-class international standards",
      airConditioned: false,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Resident Housemasters, Assistant Masters, and Dames"
    },
    sportsFacilities: [
      "Cricket Pavilion and Turf Wickets",
      "Olympic 25m Heated Swimming Pool",
      "Squash & Tennis Courts Complex",
      "Obstacle Course & Boxing Ring",
      "Shooting Range"
    ],
    infrastructure: [
      "70-Acre Chandbagh Estate Arboretum",
      "Kilachand Central Library",
      "Rose Bowl Open-Air Amphitheatre",
      "State-of-the-art Design & Technology Workshop"
    ],
    safetyFeatures: [
      "Perimeter Guard Force and High Security Gates",
      "Modern 15-Bed Hospital with resident surgeon and physician",
      "Strict Anti-Ragging Code"
    ],
    feeStructure: {
      registrationFee: 30000,
      admissionFee: 400000,
      securityDepositRefundable: 450000,
      annualTuitionBoarding: "INR 11.0 Lakhs - 14.5 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Boys entering Class 7 (age 11-12) or Class 8 via national competitive entrance.",
      steps: [
        "Registration by May of the preceding year",
        "All-India Entrance Examination in multiple cities",
        "Personal Interviews at Chandbagh",
        "Final Selection"
      ],
      applicationDeadline: "May 31st annually",
      applicationFee: 12000
    },
    contactInfo: {
      phone: "+91-135-2526400",
      email: "admissions@doonschool.mock",
      website: "https://www.doonschool.com",
      counsellorName: "Director of Admissions",
      counsellorContact: "+91-135-2526406"
    }
  },
  {
    name: "Woodstock School",
    slug: "woodstock-school",
    tagline: "An International Education in the Himalayas",
    city: "Mussoorie",
    state: "Uttarakhand",
    address: "Tehri Road, Landour, Mussoorie, Uttarakhand 248179",
    pincode: "248179",
    establishedYear: 1854,
    category: "International Schools",
    gender: "Co-Educational",
    boardingType: "Full Boarding",
    curriculum: ["IB"],
    gradeLevels: "Grade 6 to 12",
    annualFeesMin: 1600000,
    annualFeesMax: 2100000,
    rating: 4.9,
    reviewCount: 140,
    isVerified: true,
    isFeatured: true,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Perched 7,000 feet up in the Indian Himalayas, Woodstock School is Asia's oldest accredited international co-educational residential school, offering the complete IB Continuum (PYP, MYP, DP).",
    about: "Founded in 1854, Woodstock provides students from 30+ nationalities with a transformative education. The Hanifl Centre for Outdoor Environmental Education anchors its pioneering curriculum in high-altitude ecology, leadership, and outdoor mountaineering.",
    academics: {
      description: "Full IB World School offering IB Middle Years Programme (MYP) and IB Diploma Programme (DP), accredited by Middle States Association (MSA).",
      studentTeacherRatio: "7:1",
      streamOptions: ["IB Diploma Programme", "American High School Diploma"],
      teachingMethodology: "Himalayan Outdoor Inquiry, Experiential Leadership, and Global Citizenship",
      languagesOffered: ["English", "Hindi", "French", "Spanish", "German", "Korean", "Mandarin"]
    },
    boardingFacilities: {
      description: "Co-educational modern mountain residences with breathtaking valley vistas.",
      roomSharing: "Double rooms with central heating",
      messDietary: "Comprehensive international cuisine accommodating multi-religious and dietary lifestyles",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Resident international dorm staff and wellness counselors"
    },
    sportsFacilities: [
      "Win Mumby Indoor Sports Complex",
      "Outdoor Rock Climbing and Bouldering Walls",
      "Heated Swimming Pool",
      "Mountain Trekking and Expeditions Base",
      "Badminton, Basketball and Volleyball Courts"
    ],
    infrastructure: [
      "Himalayan Forest Campus",
      "Hanifl Environmental Education Centre",
      "Centre for Imagination Innovation Hub",
      "Media Arts and Music Production Studios"
    ],
    safetyFeatures: [
      "Strict Mountain Campus Security",
      "Emergency Evacuation Heli-Access Protocols",
      "Comprehensive Hospital Facility on Site"
    ],
    feeStructure: {
      registrationFee: 40000,
      admissionFee: 450000,
      securityDepositRefundable: 500000,
      annualTuitionBoarding: "INR 16.0 Lakhs - 21.0 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "International and domestic candidates applying for Grades 6 through 11.",
      steps: [
        "Online Profile and Academic Records Submission",
        "Admissions Testing (Maths, English, Cognitive)",
        "Virtual or On-Campus Student & Family Interview",
        "Admissions Committee Review"
      ],
      applicationDeadline: "October 31st for Fall Admissions",
      applicationFee: 15000
    },
    contactInfo: {
      phone: "+91-135-2639000",
      email: "admissions@woodstock.mock",
      website: "https://www.woodstockschool.in",
      counsellorName: "Director of International Admissions",
      counsellorContact: "+91-135-2639100"
    }
  },
  {
    name: "The Lawrence School, Sanawar",
    slug: "the-lawrence-school-sanawar",
    tagline: "Never Give In - Nurturing Stalwarts in the Pine-Clad Kasauli Hills",
    city: "Kasauli",
    state: "Himachal Pradesh",
    address: "Sanawar, Kasauli, Solan District, Himachal Pradesh 173202",
    pincode: "173202",
    establishedYear: 1847,
    category: "Residential Schools",
    gender: "Co-Educational",
    boardingType: "Full Boarding",
    curriculum: ["CBSE"],
    gradeLevels: "Grade 5 to 12",
    annualFeesMin: 650000,
    annualFeesMax: 800000,
    rating: 4.8,
    reviewCount: 96,
    isVerified: true,
    isFeatured: false,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Established in 1847 by Sir Henry Lawrence, Sanawar is the world's oldest co-educational boarding school. Set across 139 acres of pine forests in the Himalayas, it is celebrated for discipline, military traditions, and all-round leadership.",
    about: "Sanawar fosters a resilient spirit encapsulated in its historic motto 'Never Give In'. The school has sent teams of young teenagers to summit Mount Everest and counts prominent diplomats, armed forces generals, actors, and industrialists among its Old Sanawarians.",
    academics: {
      description: "CBSE curriculum focused on deep analytical foundations and holistic arts & sciences balance.",
      studentTeacherRatio: "10:1",
      streamOptions: ["Science", "Commerce", "Humanities"],
      teachingMethodology: "Disciplinary Academic Modules and Leadership Cadet Drills",
      languagesOffered: ["English", "Hindi", "French", "Punjabi", "Sanskrit"]
    },
    boardingFacilities: {
      description: "Separate boys and girls boarding houses set amidst pine woods.",
      roomSharing: "Dormitory system with individual lockable wardrobes and study bays",
      messDietary: "Wholesome dining hall providing balanced nutritional menus",
      airConditioned: false,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Dedicated housemasters and matrons"
    },
    sportsFacilities: [
      "Historic Barne Field for Cricket, Hockey & Football",
      "All-Weather Swimming Pool",
      "Indoor Sports Hall & Badminton Courts",
      "Shooting Range and Obstacle Drill Course"
    ],
    infrastructure: [
      "139-Acre Pine-Forested Hilltop Campus",
      "Historic 19th Century Chapel",
      "Central Barne Hall Auditorium",
      "Modern Robotics & IT Labs"
    ],
    safetyFeatures: [
      "Strict Military-Standard Perimeter Security",
      "Stationed 24x7 Hospital and Medical Specialists",
      "Surveillance Network across key arterial paths"
    ],
    feeStructure: {
      registrationFee: 20000,
      admissionFee: 150000,
      securityDepositRefundable: 150000,
      annualTuitionBoarding: "INR 6.5 Lakhs - 8.0 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Boys and girls entering Class 5 or Class 6 based on competitive assessment.",
      steps: [
        "Registration by end of October",
        "Sanawar Competitive Aptitude Assessment",
        "Candidate & Guardian Interview",
        "Final Admission Letter"
      ],
      applicationDeadline: "October 31st",
      applicationFee: 6000
    },
    contactInfo: {
      phone: "+91-1792-261208",
      email: "admissions@sanawar.mock",
      website: "https://www.sanawar.edu.in",
      counsellorName: "Admissions Dean",
      counsellorContact: "+91-1792-261209"
    }
  },
  {
    name: "The International School Bangalore (TISB)",
    slug: "the-international-school-bangalore",
    tagline: "Global Standards, Traditional Values",
    city: "Bengaluru",
    state: "Karnataka",
    address: "NAFL Valley, Whitefield - Sarjapur Road, Circle, Bengaluru, Karnataka 562125",
    pincode: "562125",
    establishedYear: 2000,
    category: "International Schools",
    gender: "Co-Educational",
    boardingType: "Weekly Boarding",
    curriculum: ["IB", "CIE"],
    gradeLevels: "Kindergarten to Grade 12",
    annualFeesMin: 950000,
    annualFeesMax: 1350000,
    rating: 4.8,
    reviewCount: 112,
    isVerified: true,
    isFeatured: true,
    isPopular: false,
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Set on a 140-acre campus in India's technology capital, TISB is consistently ranked among the world's leading IB and Cambridge day and boarding schools, preparing graduates for MIT, Oxford, Cambridge, and Stanford.",
    about: "Founded by educationist Dr. K. P. Gopalkrishna, TISB blends rigorous international academics with classical Indian values. The school offers Day, Weekly, and Regular boarding options for domestic and expat families.",
    academics: {
      description: "Cambridge IGCSE in Grades 9-10 followed by the International Baccalaureate (IB) Diploma in Grades 11-12.",
      studentTeacherRatio: "8:1",
      streamOptions: ["IGCSE", "IB Diploma Programme"],
      teachingMethodology: "Global Benchmarking, Advanced Research Essays, STEM Labs",
      languagesOffered: ["English", "French", "Spanish", "German", "Hindi", "Mandarin"]
    },
    boardingFacilities: {
      description: "Three separate boarding houses with international boarding parents.",
      roomSharing: "2 students per en-suite room",
      messDietary: "Continental, Indian, Pan-Asian cuisines with salad bars and fresh bakeries",
      airConditioned: true,
      laundryService: true,
      medicalCare24x7: true,
      pastoralCare: "Resident tutors and pastoral welfare leads"
    },
    sportsFacilities: [
      "Cricket & Football Stadium with Floodlights",
      "25m Heated Swimming Pool",
      "Indoor Sports Arena with Wooden Badminton Courts",
      "Tennis Academy with 4 Hard Courts"
    ],
    infrastructure: [
      "140-Acre Technologically Advanced Eco Campus",
      "Concert Hall with Bosendorfer Grand Piano",
      "Aviation & Drone Flight Simulators",
      "State-of-the-Art Science Laboratories"
    ],
    safetyFeatures: [
      "RFID Smart Tracking Badges for Students",
      "24/7 Security Gate with Baggage Scanners",
      "On-site Paramedic Unit and Clinic"
    ],
    feeStructure: {
      registrationFee: 25000,
      admissionFee: 200000,
      securityDepositRefundable: 250000,
      annualTuitionBoarding: "INR 9.5 Lakhs - 13.5 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Students entering Kindergarten to Grade 11 based on academic review.",
      steps: [
        "Online Registration Form",
        "Diagnostic Assessments in English and Mathematics",
        "Principal / Head of Section Interaction",
        "Offer Letter"
      ],
      applicationDeadline: "Rolling Admissions with Early Bird in December",
      applicationFee: 7500
    },
    contactInfo: {
      phone: "+91-80-22634900",
      email: "admissions@tisb.mock",
      website: "https://www.tisb.org",
      counsellorName: "Director of Admissions",
      counsellorContact: "+91-80-22634901"
    }
  },
  {
    name: "Heritage Xperiential Learning School",
    slug: "heritage-xperiential-learning-school",
    tagline: "Freedom to Learn, Power to Grow",
    city: "Gurugram",
    state: "Haryana",
    address: "Sector 62, Golf Course Extension Road, Gurugram, Haryana 122011",
    pincode: "122011",
    establishedYear: 2003,
    category: "Day Schools",
    gender: "Co-Educational",
    boardingType: "Day School",
    curriculum: ["CBSE", "IB"],
    gradeLevels: "Nursery to Grade 12",
    annualFeesMin: 320000,
    annualFeesMax: 480000,
    rating: 4.7,
    reviewCount: 88,
    isVerified: true,
    isFeatured: false,
    isPopular: true,
    heroImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Consistently ranked as the No. 1 Co-educational Day School in Delhi-NCR, Heritage Xperiential Learning School (HXLS) is recognized nationally for its pioneering experiential curriculum and project-based learning model.",
    about: "HXLS eschews rote learning in favour of expeditions, interdisciplinary real-world projects, and emotional intelligence. Located in Gurgaon's corporate corridor, it offers an enriching ecosystem for creative problem solvers.",
    academics: {
      description: "CBSE and IB Diploma tracks emphasizing deep experiential inquiry rather than exam cramming.",
      studentTeacherRatio: "10:1",
      streamOptions: ["Science", "Commerce", "Humanities", "IB DP"],
      teachingMethodology: "Expeditionary Learning, Design Thinking, Social Emotional Learning (SEL)",
      languagesOffered: ["English", "Hindi", "French", "Spanish"]
    },
    boardingFacilities: {
      description: "Non-residential Day School with extended daycare and evening coaching programs.",
      roomSharing: "N/A - Day School Facility",
      messDietary: "Hygienic multi-cuisine cafeteria serving nutritious morning snack and lunch",
      airConditioned: true,
      laundryService: false,
      medicalCare24x7: false,
      pastoralCare: "Class mentors, guidance counsellors, and special education educators"
    },
    sportsFacilities: [
      "Indoor Sports Arena",
      "Semi-Olympic Swimming Pool",
      "Rock Climbing Arena",
      "Badminton, Squash, and Basketball Courts",
      "Synthetic Football Pitch"
    ],
    infrastructure: [
      "12-Acre Architectural Campus with Air Filtration Units",
      "Makerspaces & Woodworking Studios",
      "Black Box Theatre and Performing Arts Amphitheatre",
      "Extensive Junior and Senior Discovery Libraries"
    ],
    safetyFeatures: [
      "RFID Enabled Campus and GPS Tracked AC Buses",
      "Strict Visitor Screening Protocols",
      "Full-Time Medical Infirmary with Pediatric Nurse"
    ],
    feeStructure: {
      registrationFee: 10000,
      admissionFee: 60000,
      securityDepositRefundable: 50000,
      annualTuitionBoarding: "INR 3.2 Lakhs - 4.8 Lakhs per annum"
    },
    admissionProcedure: {
      eligibility: "Nursery to Grade 11 based on sibling criteria, proximity, and informal interaction.",
      steps: [
        "Online Registration Form",
        "Parent and Child Interaction Session",
        "Document Verification",
        "Fee Payment"
      ],
      applicationDeadline: "August to October for next academic year",
      applicationFee: 2500
    },
    contactInfo: {
      phone: "+91-124-4703400",
      email: "admissions@heritage.mock",
      website: "https://www.heritagexperiential.org",
      counsellorName: "Admissions Desk",
      counsellorContact: "+91-124-4703401"
    }
  }
];

const adminUser = {
  name: "Eduminatti Lead Administrator",
  email: "admin@eduminatti.com",
  password: "AdminPassword123!",
  role: "admin",
  phone: "+91-9876543210",
  city: "Dehradun",
};

const demoUser = {
  name: "Dr. Ananya Sen",
  email: "parent@eduminatti.com",
  password: "ParentPassword123!",
  role: "parent",
  phone: "+91-9811223344",
  city: "New Delhi",
};

// Seed function for standalone execution
const seedDatabase = async () => {
  const mongoose = require('mongoose');
  const School = require('../models/School');
  const User = require('../models/User');
  const Enquiry = require('../models/Enquiry');
  require('dotenv').config();

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eduminatti';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    // Clear existing data
    await School.deleteMany({});
    await User.deleteMany({});
    await Enquiry.deleteMany({});
    console.log('[Seed] Cleared existing schools, users, and enquiries.');

    // Seed Schools
    const createdSchools = await School.insertMany(schoolsData);
    console.log(`[Seed] Successfully seeded ${createdSchools.length} schools.`);

    // Seed Admin & Demo Parent
    const admin = await User.create(adminUser);
    const parent = await User.create(demoUser);
    console.log(`[Seed] Created Admin user: ${admin.email}`);
    console.log(`[Seed] Created Demo Parent user: ${parent.email}`);

    // Seed Sample Enquiries
    const sampleEnquiries = [
      {
        parentName: "Dr. Ananya Sen",
        email: "parent@eduminatti.com",
        phone: "+91-9811223344",
        studentName: "Aaradhya Sen",
        currentClass: "Grade 6",
        preferredAdmissionYear: "2025-2026",
        school: createdSchools[0]._id,
        schoolName: createdSchools[0].name,
        message: "We are interested in admission to Grade 7 for the 2025 academic session. Would like to know about equestrian sports and pastoral care.",
        status: "In Review",
        counselorNotes: "Parent contacted via email. Requested campus tour on 12th Dec.",
        user: parent._id,
      },
      {
        parentName: "Vikramaditya Rathore",
        email: "vikram.rathore@example.com",
        phone: "+91-9988776655",
        studentName: "Devraj Rathore",
        currentClass: "Grade 7",
        preferredAdmissionYear: "2025-2026",
        school: createdSchools[4]._id,
        schoolName: createdSchools[4].name,
        message: "Looking for registration guidelines and entrance syllabus for The Doon School Class 8 entrance.",
        status: "New",
        counselorNotes: "Prospect sent admission handbook PDF.",
      },
      {
        parentName: "Meenakshi Sundaram",
        email: "meenakshi.s@example.com",
        phone: "+91-9445566778",
        studentName: "Tara Sundaram",
        currentClass: "Grade 8",
        preferredAdmissionYear: "2025-2026",
        school: createdSchools[1]._id,
        schoolName: createdSchools[1].name,
        message: "Inquiring about ICSE curriculum board results and boarding room facilities.",
        status: "Contacted",
        counselorNotes: "Telephonic counseling completed. Interested in financial aid policy.",
      }
    ];

    await Enquiry.insertMany(sampleEnquiries);
    console.log(`[Seed] Seeded ${sampleEnquiries.length} realistic admission enquiries.`);

    console.log('[Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = { schoolsData, adminUser, demoUser, seedDatabase };

