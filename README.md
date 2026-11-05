# EDUMINATTI — Complete Full-Stack School Discovery & Admission Platform

> A modern, premium, and production-oriented educational platform designed for discovering India's premier boarding, residential, and day schools, featuring comprehensive institutional profiles, multi-school comparison, dedicated girls boarding school intelligence, and a seamless admission enquiry workflow.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Highlights & Core Modules](#2-key-highlights--core-modules)
3. [Technology Stack](#3-technology-stack)
4. [Project Architecture](#4-project-architecture)
5. [Complete Folder Structure](#5-complete-folder-structure)
6. [Platform Screenshots & UI Previews](#6-platform-screenshots--ui-previews)
7. [Prerequisites](#7-prerequisites)
8. [Installation & Local Setup](#8-installation--local-setup)
   - [Clone & Repository Inspection](#clone--inspect)
   - [Backend Configuration](#backend-configuration)
   - [Frontend Configuration](#frontend-configuration)
   - [Database Seeding](#database-seeding)
   - [Running the Application](#running-the-application)
9. [Demo Accounts & Fast Evaluation](#9-demo-accounts--fast-evaluation)
10. [REST API Documentation](#10-rest-api-documentation)
11. [Database Models & Schemas](#11-database-models--schemas)
12. [Authentication & Authorization Details](#12-authentication--authorization-details)
13. [Admin Dashboard Workflow](#13-admin-dashboard-workflow)
14. [Testing & Quality Assurance](#14-testing--quality-assurance)
15. [Deployment Guide](#15-deployment-guide)
16. [Future Roadmap](#16-future-roadmap)
17. [Contribution Guidelines](#17-contribution-guidelines)
18. [License](#18-license)

---

## 1. Project Overview

**EDUMINATTI** is an education discovery and admissions advisory platform inspired by modern EdTech benchmarks such as [Eduminatti](https://www.eduminatti.com/) and [Ecole Globale](https://www.ecoleglobale.com/).

Selecting the right educational institution is one of the most critical decisions a family undertakes. Traditional brochures often conceal actual tuition fee breakdowns, boarding conditions, and pastoral security. **EDUMINATTI** bridges this information gap by providing parents and students with:

- Transparent, verified school profiles across prominent education hubs (Dehradun, Mussoorie, Ajmer, Gwalior, Kasauli, Bengaluru, Gurugram).
- Specialized discovery for **Girls Boarding Schools**, spotlighting female pastoral leadership, CCTV perimeter safeguards, biometric gates, and 24/7 medical infirmaries.
- An interactive **3-Way School Comparison Engine** benchmarking affiliations, student-teacher ratios, room allocations, sports academies, and estimated annual fees.
- A streamlined **Admission Enquiry Lifecycle** connecting parents directly to admissions counsellors.
- A centralized **Role-Based Admin Console** for catalog CRUD, enquiry triage, counsellor notes, and user account management.

---

## 2. Key Highlights & Core Modules

### 🏛️ Premium Homepage
- **Hero Section**: Campus visual storytelling with headline: *"Discover the Right School for Your Child"*, coupled with a multi-parameter quick search (Name keyword, City selector, Category picker).
- **Institutional Classifications**: Boarding Schools, Girls Boarding Schools, Boys Boarding Schools, International (IB/Cambridge) Schools, Day Schools, and Hill-Station Residential Schools.
- **Curated Featured Grid**: Real-time category filtering (Girls Boarding, Boys Boarding, International).
- **The Eduminatti Advantage**: Four pillars covering school discovery, easy comparison, admission assistance, and parent-friendly transparency.
- **How It Works**: Visual 4-step user journey from discovery to enrolment.
- **Popular Schooling Destinations**: City highlights for Dehradun, Mussoorie, Ajmer, Gwalior, Kasauli, and Bengaluru.
- **Parent Testimonials & Interactive FAQs**: Comprehensive answers covering application timelines, safety protocols, fee structures, and CBSE vs ICSE vs IB curriculum differences.

### 🔍 School Listing & Discovery Engine
- **Multi-Facet Sidebar Filtering**:
  - Search by school name or keyword
  - City selection
  - School category
  - Gender classification (Girls Only, Boys Only, Co-Educational)
  - Boarding type (Full Boarding, Day Boarding, Weekly Boarding, Day School)
  - Curriculum checkboxes (CBSE, ICSE, ISC, IB, CIE)
  - Minimum and maximum fee slider/inputs
- **Dynamic Sorting**: Fees (Low to High / High to Low), Alphabetical (A-Z / Z-A), and Verified Rating.
- **Grid View vs List View Toggle**: Seamlessly switch between modern cards and wide horizontal detail views.
- **Responsive Layout**: Clean desktop sidebar and collapsible mobile drawer.

### 🏫 In-Depth School Profile Page
- **Hero Visual Banner**: Badges for verified status, established year, gender, and boarding type.
- **Interactive Lightbox Photo Gallery**: Main hero view with thumbnail preview carousel.
- **Tabbed Architectural Layout**:
  - *Overview & About*: Institutional history and philosophy.
  - *Academics*: Student-teacher ratios, teaching methodologies, stream options (Science, Commerce, Humanities), and languages taught.
  - *Hostel & Boarding*: Room sharing policies, dining & nutritionist meal plans, laundry, and pastoral care.
  - *Sports & Infrastructure*: Olympic swimming, equestrian arenas, shooting ranges, robotics labs, and auditoriums.
  - *Fee Structure*: Transparent schedule covering tuition, boarding, one-time admission fees, and refundable security deposits.
  - *Admission Procedure*: Step-by-step application timeline and cut-off deadlines.
- **Sticky Admissions Widget**: Direct enquiry submission popup and contact directory.

### 🌸 Dedicated Girls Boarding Schools Hub
- Tailored discovery experience for all-girls boarding education.
- Safety & security feature matrices (24/7 CCTV, female security officers, biometric gate access, resident lady doctors, anti-bullying protocols).
- Featured profiles of premier girls institutions: *Ecole Globale International Girls' School, Welham Girls' School, Scindia Kanya Vidyalaya, Mayo College Girls' School, Hopetown Girls' School*.

### ⚖️ 3-Way School Comparison Matrix
- Shortlist and compare up to **3 institutions** side-by-side.
- Parameter-by-parameter analysis:
  - Location & Pincode
  - Curriculum Affiliations
  - Gender Classification
  - Boarding Accommodation
  - Estimated Annual Fee Schedules
  - Student-Teacher Ratios & Academic Streams
  - Hostel Rooms & Medical Facilities
  - Sports Arenas
  - Admission Deadlines & Enrolment Steps
- **Persistent Floating Comparison Dock**: Tracks selected schools across the site with instant "Compare Now" CTA.

### 📝 Admission Enquiry Workflow
- Comprehensive inquiry form capturing parent name, email, phone number, student name, current grade, target academic year, and specific queries.
- Full client-side and server-side validation.
- Automated email/counsellor dispatch simulation.
- Real-time status tracking in the User Profile dashboard.

### 🛡️ Administrative Console (RBAC Protected)
- **KPI Metrics**: Total schools, active enquiries, unassigned requests, and registered users.
- **School Catalog CRUD**: Modal-based creation, editing, and deletion with image URL and Cloudinary upload support.
- **Enquiry Management**: Filter by status (*New, In Review, Contacted, Admission Offered, Closed*), inspect parent queries, and record internal counsellor notes.
- **User Management**: Inspect registered parents/students and elevate roles to Counsellor or Administrator.

---

## 3. Technology Stack

| Layer | Technology | Purpose & Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | **React.js 18 (Vite)** | High-speed component rendering, fast HMR, strictly JavaScript (NO TypeScript as required). |
| **Styling & Design** | **Tailwind CSS 3** | Navy blue (`#0B192C`), gold accents (`#D4AF37`), white cards, subtle shadows, responsive typography. |
| **Routing** | **React Router DOM 7** | Client-side routing, route state restoration, protected routes. |
| **Icons & Media** | **Lucide React** | Clean, lightweight feather icons tailored for EdTech applications. |
| **HTTP Client** | **Axios** | Interceptor-driven API communication with automatic JWT header attachment. |
| **Backend Runtime** | **Node.js (v20+)** | Event-driven JavaScript runtime for scalable I/O. |
| **Web Server** | **Express.js 4** | Modular RESTful API architecture with CORS, Multer, and error middleware. |
| **Database & ODM** | **MongoDB & Mongoose 8** | Schema validation, indexing, relationship population, with zero-config fallback. |
| **Security & Auth** | **JWT & bcryptjs** | Salted password hashing and signed Bearer token authorization. |
| **Image Management**| **Cloudinary SDK & Multer** | Cloud-hosted campus photography with local storage fallback. |

---

## 4. Project Architecture

```
                                  ┌────────────────────────┐
                                  │   Browser Client       │
                                  │   React 18 + Vite      │
                                  │   Tailwind CSS         │
                                  └───────────┬────────────┘
                                              │ HTTP / JSON
                                              │ (Port 5173 / Proxy)
                                              ▼
                                  ┌────────────────────────┐
                                  │   Express API Server   │
                                  │   (Port 5001)          │
                                  └─────┬──────────────┬───┘
                                        │              │
                     ┌──────────────────┴──┐        ┌──┴──────────────────┐
                     │  Controllers        │        │  Middleware         │
                     │  - authController   │        │  - authMiddleware   │
                     │  - schoolController │        │  - errorMiddleware  │
                     │  - enquiryController│        │  - Multer Upload    │
                     │  - userController   │        └─────────────────────┘
                     └──────────┬──────────┘
                                │ Mongoose ODM
                                ▼
                     ┌────────────────────────┐
                     │   MongoDB Database     │
                     │   (or In-Memory Store) │
                     │   - Users              │
                     │   - Schools            │
                     │   - Enquiries          │
                     └────────────────────────┘
```

---

## 5. Complete Folder Structure

```
EduminattiIntern/
├── package.json                    # Root package scripts (dev, seed, install:all)
├── README.md                       # Comprehensive project documentation
├── .gitignore                      # Git ignore definitions
├── .env.example                    # Environment variable template
│
├── backend/                        # Node.js & Express.js Backend
│   ├── package.json
│   ├── .env.example
│   ├── .env                        # Local backend environment
│   ├── server.js                   # Express application entrypoint
│   ├── config/
│   │   ├── db.js                   # MongoDB connection & connection status
│   │   └── cloudinary.js           # Cloudinary image management config
│   ├── controllers/
│   │   ├── authController.js       # Register, login, profile, bookmark logic
│   │   ├── schoolController.js     # Search, filter, compare, CRUD logic
│   │   ├── enquiryController.js    # Admission enquiry submission & triage
│   │   └── userController.js       # Account and role administration
│   ├── middleware/
│   │   ├── authMiddleware.js       # Protect and admin RBAC checks
│   │   └── errorMiddleware.js      # 404 not found & global error handlers
│   ├── models/
│   │   ├── User.js                 # User schema (parent, student, counsellor, admin)
│   │   ├── School.js               # Comprehensive institutional schema
│   │   └── Enquiry.js              # Admission enquiry schema with statuses
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth
│   │   ├── schoolRoutes.js         # /api/schools
│   │   ├── enquiryRoutes.js        # /api/enquiries
│   │   ├── userRoutes.js           # /api/users
│   │   └── uploadRoutes.js         # /api/upload
│   ├── public/
│   │   └── uploads/                # Local file storage fallback
│   └── utils/
│       ├── generateToken.js        # JWT generation utility
│       └── seedData.js             # Realistic seed catalog & admin accounts
│
└── frontend/                       # React.js & Vite Frontend
    ├── package.json
    ├── vite.config.js              # Vite server & proxy configuration
    ├── tailwind.config.js          # Navy & gold custom theme
    ├── postcss.config.js
    ├── index.html                  # HTML template with Google Fonts
    ├── .env.example
    ├── .env
    ├── public/
    │   └── favicon.svg             # Academic shield SVG favicon
    └── src/
        ├── main.jsx                # Application root with Context Providers
        ├── App.jsx                 # Route definitions & global layout
        ├── index.css               # Tailwind directives & glassmorphism
        ├── context/
        │   ├── AuthContext.jsx     # Authentication state & session storage
        │   ├── CompareContext.jsx  # Multi-school comparison state (max 3)
        │   └── ToastContext.jsx    # Alert toast notifications (success/error/info)
        ├── services/
        │   ├── api.js              # Axios instance with Bearer interceptors
        │   ├── authService.js      # Auth API bindings
        │   ├── schoolService.js    # School discovery & CRUD API bindings
        │   └── enquiryService.js   # Admission enquiry API bindings
        ├── utils/
        │   └── formatters.js       # Currency (INR Lakhs), rating, slug utilities
        ├── components/
        │   ├── common/
        │   │   ├── Navbar.jsx      # Sticky navbar with mobile drawer
        │   │   ├── Footer.jsx      # Comprehensive footer with city & category links
        │   │   ├── SchoolCard.jsx  # Modern school card with badges & compare
        │   │   └── EnquiryModal.jsx# Interactive admission enquiry form
        │   ├── home/
        │   │   ├── HeroSection.jsx # Multi-parameter quick search & campus visual
        │   │   ├── CategorySection.jsx # Categorical cards (Girls Boarding, etc.)
        │   │   ├── FeaturedSchools.jsx # Curated schools with filter tabs
        │   │   ├── WhyChooseUs.jsx # Four value propositions
        │   │   ├── HowItWorks.jsx  # 4-step user guide
        │   │   ├── PopularCities.jsx   # Top education destinations
        │   │   ├── AdmissionSupportBanner.jsx # Counsellor hotline banner
        │   │   ├── Testimonials.jsx# Parent reviews
        │   │   └── FaqSection.jsx  # Expandable parent FAQ accordion
        │   ├── schools/
        │   │   ├── FilterSidebar.jsx   # Multi-facet desktop/mobile filter
        │   │   └── SchoolListItem.jsx  # Horizontal wide list view item
        │   ├── comparison/
        │   │   ├── ComparisonTable.jsx # Side-by-side comparative matrix
        │   │   └── CompareFloatingBar.jsx # Bottom dock of selected schools
        │   └── admin/
        │       ├── SchoolFormModal.jsx # School add/edit modal
        │       └── EnquiryStatusModal.jsx # Enquiry status & counsellor notes
        └── pages/
            ├── HomePage.jsx
            ├── SchoolsPage.jsx
            ├── SchoolDetailsPage.jsx
            ├── GirlsBoardingPage.jsx
            ├── ComparePage.jsx
            ├── AboutPage.jsx
            ├── ContactPage.jsx
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            ├── UserProfilePage.jsx
            ├── AdminDashboardPage.jsx
            └── NotFoundPage.jsx
```

---

## 6. Platform Screenshots & UI Previews

*(Place actual screenshots in `docs/screenshots/` or view live on local deployment)*

### 1. Modern Homepage & Multi-Parameter Hero
```
┌────────────────────────────────────────────────────────────────────────┐
│  [Logo] EDUMINATTI  | Find Schools | Boarding | Girls Boarding | Sign In│
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│            Discover the Right School for Your Child                    │
│   Explore India's finest schools, compare facilities & make decisions │
│                                                                        │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │ [Search] Ecole Globale... | [City] Dehradun | [Category]...  │     │
│   └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2. Multi-Facet School Discovery
```
┌─────────────────┬──────────────────────────────────────────────────────┐
│ Filters (Reset) │ Showing 10 schools              [Sort: Fees ▼] [田 ☰]│
├─────────────────┼──────────────────────────────────────────────────────┤
│ City: Dehradun  │ [Card: Ecole Globale]      [Card: Welham Girls]      │
│ Category: Girls │ Dehradun | Girls Only      Dehradun | Girls Only     │
│ Curriculum:     │ Fees: ₹7.5L - ₹9.5L / yr   Fees: ₹7.2L - ₹8.8L / yr  │
│ [x] CBSE [x] IB │ [Compare] [View Details]   [Compare] [View Details]  │
│ Fees: ₹3L - ₹15L│                                                      │
└─────────────────┴──────────────────────────────────────────────────────┘
```

### 3. Side-by-Side School Comparison Table
```
┌──────────────────────┬────────────────────────┬────────────────────────┐
│ Parameter            │ Ecole Globale          │ The Doon School        │
├──────────────────────┼────────────────────────┼────────────────────────┤
│ Boarding Type        │ Full Boarding          │ Full Boarding          │
│ Gender               │ Girls Only             │ Boys Only              │
│ Curricula            │ CBSE, CIE (Cambridge)  │ IB DP, ICSE, ISC       │
│ Annual Fees          │ ₹7.5 Lakhs - 9.5 Lakhs │ ₹11.0 L - 14.5 Lakhs   │
│ Room Accommodation   │ 2-3 girls / AC room    │ 4-6 junior, 1-2 senior │
│ Sports Infrastructure│ Equestrian, 25m Pool   │ Cricket Turf, Heated P │
│ Safety Safeguards    │ 24/7 CCTV, Biometrics  │ Hospital, Military Sec │
└──────────────────────┴────────────────────────┴────────────────────────┘
```

---

## 7. Prerequisites

Before running the application locally, verify you have the following installed:

- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **MongoDB** *(Optional)*: A local MongoDB daemon running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string.
  > *Note: If MongoDB is offline, the backend automatically operates in an in-memory fallback mode with full mock data for effortless evaluation without local DB requirements.*

---

## 8. Installation & Local Setup

### Clone & Inspect

```bash
# Clone the repository
git clone https://github.com/your-username/EduminattiIntern.git
cd EduminattiIntern

# Install dependencies across both backend and frontend
npm run install:all
```

Or install separately:
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

---

### Backend Configuration

1. Create a `.env` file in the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

2. Configure environment variables in `backend/.env`:

```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/eduminatti
JWT_SECRET=eduminatti_super_secret_jwt_key_2025_prod_ready
JWT_EXPIRES_IN=30d

# Cloudinary Configuration (Optional - falls back to local uploads if not configured)
CLOUDINARY_CLOUD_NAME=eduminatti-demo
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=sample_secret_key
```

> **Note on Port 5001**: On macOS, port 5000 is reserved by the system AirPlay Receiver service. Hence, the backend runs on **Port 5001**, and the Vite frontend proxy is configured to automatically route `/api` and `/uploads` to port 5001.

---

### Frontend Configuration

1. Verify `frontend/.env`:

```env
VITE_API_URL=/api
```

---

### Database Seeding *(Optional when MongoDB is connected)*

To seed the database with realistic Indian premier schools, admin accounts, and sample enquiries:

```bash
npm run seed
```

---

### Running the Application

You can start both frontend and backend concurrently or in separate terminal tabs:

#### Terminal 1 — Backend Server
```bash
cd backend
npm run dev
# Server listening on http://localhost:5001
```

#### Terminal 2 — Frontend Dev Server
```bash
cd frontend
npm run dev
# Vite dev server running on http://localhost:5173
```

Now open **[http://localhost:5173](http://localhost:5173)** in your browser!

---

## 9. Demo Accounts & Fast Evaluation

To enable frictionless evaluation during review, pre-configured accounts are provided with **One-Click Demo Login** buttons on the `/login` page:

| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@eduminatti.com` | `AdminPassword123!` | Full Admin Console, School CRUD, Enquiry Status Triage, User Role Management. |
| **Parent User** | `parent@eduminatti.com` | `ParentPassword123!` | Browse schools, Submit enquiries, View application tracker in Profile. |

---

## 10. REST API Documentation

Base URL: `http://localhost:5001/api`

### 🏥 Health & System
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and version info | Public |

### 🏫 School Directory (`/api/schools`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/schools` | List schools with search, city, category, gender, fee filters, sort & pagination | Public |
| `GET` | `/api/schools/featured` | Fetch top featured schools for homepage | Public |
| `GET` | `/api/schools/girls-boarding` | Fetch girls boarding school listings | Public |
| `GET` | `/api/schools/compare?ids=id1,id2,id3` | Compare up to 3 schools side-by-side | Public |
| `GET` | `/api/schools/:slugOrId` | Get detailed school profile by slug or ObjectId | Public |
| `POST` | `/api/schools` | Create new school record | Admin |
| `PUT` | `/api/schools/:id` | Update school details | Admin |
| `DELETE` | `/api/schools/:id` | Delete school record | Admin |
| `GET` | `/api/schools/stats/overview` | Institutional metrics for admin overview | Admin |

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user (parent or student) | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `GET` | `/api/auth/profile` | Retrieve authenticated user profile | Private |
| `PUT` | `/api/auth/profile` | Update user name, phone, city, password | Private |
| `POST` | `/api/auth/saved-schools/:schoolId` | Bookmark/unbookmark a school | Private |

### 📬 Admission Enquiries (`/api/enquiries`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/enquiries` | Submit admission enquiry | Public |
| `GET` | `/api/enquiries/my` | Retrieve logged-in parent's submitted enquiries | Private |
| `GET` | `/api/enquiries` | List all enquiries with search & status filter | Admin |
| `PUT` | `/api/enquiries/:id` | Update enquiry status (*In Review, Contacted, etc.*) & counsellor notes | Admin |
| `DELETE` | `/api/enquiries/:id` | Delete enquiry record | Admin |
| `GET` | `/api/enquiries/stats` | Status breakdown metrics for admin dashboard | Admin |

### 👥 User Administration (`/api/users`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | List all registered accounts | Admin |
| `PUT` | `/api/users/:id/role` | Modify account role (`parent`, `student`, `counsellor`, `admin`) | Admin |
| `DELETE` | `/api/users/:id` | Delete user account | Admin |

### 🖼️ Image Uploads (`/api/upload`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/upload` | Multipart image upload to Cloudinary (or local server fallback) | Admin |

---

## 11. Database Models & Schemas

### 1. `School` Model
- `name`: String (Required, unique, indexed)
- `slug`: String (Indexed, auto-generated URL slug)
- `tagline`: String
- `city`, `state`, `address`, `pincode`: Location details
- `establishedYear`: Number
- `category`: Enum (`Boarding Schools`, `Girls Boarding Schools`, `Boys Boarding Schools`, `Day Schools`, `International Schools`, `Residential Schools`)
- `gender`: Enum (`Girls Only`, `Boys Only`, `Co-Educational`)
- `boardingType`: Enum (`Full Boarding`, `Day Boarding`, `Weekly Boarding`, `Day School`)
- `curriculum`: Array of Strings (`CBSE`, `ICSE`, `ISC`, `IB`, `CIE`)
- `annualFeesMin`, `annualFeesMax`: Numerical fee range in INR
- `rating`: Number (1.0 to 5.0)
- `isVerified`, `isFeatured`: Booleans
- `heroImage`, `gallery`: Image URLs
- `overview`, `about`: Text descriptions
- `academics`: Sub-document containing `studentTeacherRatio`, `streamOptions`, `teachingMethodology`, `languagesOffered`
- `boardingFacilities`: Sub-document containing `roomSharing`, `messDietary`, `airConditioned`, `pastoralCare`
- `sportsFacilities`: Array of Strings
- `infrastructure`: Array of Strings
- `safetyFeatures`: Array of Strings
- `feeStructure`: Sub-document containing `registrationFee`, `admissionFee`, `securityDepositRefundable`
- `admissionProcedure`: Sub-document containing `eligibility`, `steps`, `applicationDeadline`
- `contactInfo`: Sub-document containing `phone`, `email`, `website`, `counsellorContact`

### 2. `User` Model
- `name`: String
- `email`: String (Unique, lowercase, validated format)
- `password`: String (Hashed via bcrypt with salt factor 10)
- `role`: Enum (`parent`, `student`, `counsellor`, `admin`)
- `phone`: String
- `city`: String
- `savedSchools`: Array of School ObjectIds

### 3. `Enquiry` Model
- `parentName`: String
- `email`: String
- `phone`: String
- `studentName`: String
- `currentClass`: String
- `preferredAdmissionYear`: String
- `school`: School ObjectId
- `schoolName`: String
- `message`: String
- `status`: Enum (`New`, `In Review`, `Contacted`, `Admission Offered`, `Closed`)
- `counselorNotes`: String
- `user`: User ObjectId

---

## 12. Authentication & Authorization Details

1. **Security Standard**: Passwords hashed using `bcryptjs` with auto-generated salts.
2. **Stateless Authorization**: JWT signed tokens transmitted via `Authorization: Bearer <token>` HTTP headers.
3. **Role-Based Access Control (RBAC)**:
   - `protect` middleware decodes token and verifies user existence.
   - `admin` middleware enforces administrative role privileges on sensitive mutation endpoints (`POST /api/schools`, `PUT /api/enquiries/:id`, `GET /api/users`).
4. **Resilient Demo Mode**: Authentication and protected routes function identically when using real MongoDB or in-memory evaluation accounts.

---

## 13. Admin Dashboard Workflow

1. Sign in via `admin@eduminatti.com` (or click **⚡ Quick Evaluation Demo Logins > Admin Console** on `/login`).
2. Navigate to **Admin Console** via top navigation or user menu.
3. **Institutional Management**:
   - Click **Add School Record** to launch the comprehensive institutional modal.
   - Edit any parameter (annual fee bounds, category, curriculum, hostel room allocations).
   - Instant deletion with prompt confirmation.
4. **Admission Enquiry Triage**:
   - Filter inquiries by status (*New, In Review, Contacted, Admission Offered, Closed*).
   - Click **Manage** on any parent enquiry to inspect student details, update status, and log counsellor notes.
5. **User Access Privileges**:
   - Review registered parents and students.
   - Elevate accounts between Parent, Student, Counsellor, and Administrator.

---

## 14. Testing & Quality Assurance

A dedicated automated test suite verifies all critical API endpoints:

```bash
# Run automated API endpoint verification
node test_apis.js
```

### Verified Test Matrix:
- ✅ Health check endpoint returns `200 OK`
- ✅ School listing returns paginated results with curriculum & fee filters
- ✅ Featured schools returns curated top institutions
- ✅ Girls boarding endpoint returns filtered female-only residential schools
- ✅ Multi-school comparison returns matched records
- ✅ Parent login issues valid JWT token
- ✅ Admin login issues valid JWT token with administrative role
- ✅ Public admission enquiry submission succeeds with `201 Created`
- ✅ Protected Admin endpoint `/api/enquiries` enforces token verification
- ✅ Admin stats overview returns KPI counts
- ✅ User administration lists registered accounts
- ✅ Frontend production build compiles with zero errors (`npm run build`)

---

## 15. Deployment Guide

### Deploying Frontend (Vercel / Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables: `VITE_API_URL=https://your-backend-domain.com/api`

### Deploying Backend (Render / Railway / AWS EC2)
1. Build command: `npm install`
2. Start command: `node server.js`
3. Environment variables:
   - `PORT=5001`
   - `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/eduminatti`
   - `JWT_SECRET=production_strong_secret`
   - `CLIENT_URL=https://your-frontend-domain.com`

---

## 16. Future Roadmap

- [ ] **Virtual 360° Campus Tours**: Interactive panorama integration for boarding houses and laboratories.
- [ ] **Parent Community Forum**: Moderated discussion boards for alumni parents and incoming families.
- [ ] **Online Entrance Mock Tests**: Preliminary diagnostic assessments for Class 6 & 8 entrance exams.
- [ ] **Direct Fee Escrow Gateway**: Secure tokenized deposit processing for confirmed admission seats.
- [ ] **SMS & WhatsApp Admission Alerts**: Instant SMS notifications on enquiry status changes.

---

## 17. Contribution Guidelines

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 18. License

This project is licensed under the ISC License. See `package.json` for details. Built for educational evaluation and internship presentation.

