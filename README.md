# Grade Management System - BTIK UDINUS

A modern, comprehensive grade management system for Outcome Based Education (OBE) built with Next.js 14, TypeScript, Material UI, and enhanced with authentication, reporting, and modern UI/UX features.

## 🚀 Features

### Core Functionality
- **🏠 Class Overview Dashboard**: Modern card-based layout with animated interactions
- **⚙️ Grade Component Configuration**: Dynamic percentage setup with real-time validation
- **📝 Student Grade Input**: Multi-component scoring with live calculations
- **📊 Real-time Grade Calculation**: Weighted scoring with visual feedback
- **📈 Comprehensive Reports**: Detailed analytics and export functionality
- **➕ Add New Classes**: Dynamic class creation with form validation

### Authentication System
- **🔐 Secure Login**: Email/password authentication with demo credentials
- **📝 User Registration**: Complete signup flow with validation
- **🔑 Password Recovery**: Forgot password functionality with email simulation
- **👤 User Profile**: Header with user information and logout functionality
- **🛡️ Protected Routes**: Authentication-based access control

### Modern UI/UX Features
- **🎨 Modern Design**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **📱 Fully Responsive**: Mobile-first design with tablet and desktop optimization
- **✨ Smooth Animations**: Framer Motion integration for fluid interactions
- **🌙 Professional Theme**: Material UI with custom theming and consistent design system
- **🎯 Intuitive Navigation**: Clear user flows with breadcrumbs and contextual actions

### Technical Highlights
- **⚡ Next.js 14**: App Router with server-side rendering capabilities
- **🔷 TypeScript**: Full type safety throughout the application
- **🎨 Material UI**: Comprehensive component library with custom theming
- **🎭 Framer Motion**: Smooth animations and page transitions
- **📊 Zustand**: Lightweight state management with persistence
- **📋 React Hook Form**: Efficient form handling with validation
- **🏗️ Component Architecture**: Modular, reusable components

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Material UI + Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Form Handling**: React Hook Form with validation
- **Icons**: Lucide React
- **Charts**: Recharts for analytics
- **Authentication**: Custom auth system with mock data

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grade-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials
For testing the authentication system:
- **Email**: `dosen@udinus.ac.id`
- **Password**: `password123`

Or create a new account using the registration form.

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Material UI theme
│   ├── page.tsx           # Main application entry point
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   │   ├── LoginPage.tsx # Login interface with modern design
│   │   ├── RegisterPage.tsx # Registration form
│   │   └── ForgotPasswordPage.tsx # Password recovery
│   ├── layout/           # Layout components
│   │   └── Header.tsx    # Application header with user menu
│   ├── reports/          # Reporting components
│   │   └── ReportsPage.tsx # Comprehensive reports interface
│   ├── modals/           # Modal dialogs
│   │   └── AddClassModal.tsx # Add new class modal
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   │   ├── StatCard.tsx  # Statistics display component
│   │   └── LoadingSpinner.tsx
│   ├── ClassCard.tsx     # Class overview card component
│   ├── ClassDashboard.tsx # Main dashboard view
│   ├── GradeConfiguration.tsx # Grade setup interface
│   └── GradeInput.tsx    # Grade entry interface
├── lib/                  # Utilities and helpers
│   ├── constants.ts      # Application constants
│   ├── utils.ts          # Utility functions
│   ├── store.ts          # Zustand state management
│   └── authStore.ts      # Authentication state management
├── types/                # TypeScript type definitions
│   ├── index.ts          # Core type definitions
│   └── auth.ts           # Authentication type definitions
└── hooks/                # Custom React hooks
    └── useGradeCalculations.ts
```

## 📊 Key Features Overview

### 1. Class Dashboard
- **Modern Card Layout**: Animated class cards with hover effects
- **Quick Statistics**: Real-time dashboard metrics with visual indicators
- **Add New Classes**: Modal-based class creation with form validation
- **Reports Access**: Direct navigation to comprehensive reporting system
- **Responsive Design**: Optimized for all screen sizes with floating action button

### 2. Authentication System
- **Secure Login**: Professional login interface with gradient backgrounds
- **User Registration**: Complete signup flow with department selection
- **Password Recovery**: Forgot password with email simulation
- **User Management**: Header with profile information and logout
- **Demo Mode**: Pre-configured demo credentials for testing

### 2. Grade Configuration
- **Component Setup**: 5 grade components with dynamic percentage allocation
- **Real-time Validation**: Instant feedback ensuring 100% total
- **Visual Preview**: Sample calculation display with component breakdown
- **Chapter Weights**: Configurable chapter contribution system

### 3. Student Grade Input
- **Interactive Tables**: Responsive grade input with real-time validation
- **Multi-component Support**: Tabbed interface for different assessment types
- **Live Calculations**: Instant final grade computation and preview
- **Progress Tracking**: Visual completion indicators and statistics

### 4. Comprehensive Reports
- **Detailed Analytics**: Class statistics with grade distribution
- **Export Functionality**: PDF, Excel, and CSV export options
- **Student Search**: Real-time filtering and search capabilities
- **Visual Indicators**: Color-coded grade displays and progress bars

### 5. Modern UI/UX
- **Smooth Animations**: Framer Motion for fluid page transitions
- **Gradient Design**: Modern gradient backgrounds and glassmorphism effects
- **Responsive Layout**: Mobile-first design with adaptive components
- **Interactive Elements**: Hover effects, loading states, and micro-interactions

## 🎨 Design System

### Color Palette
- **Primary**: #1976d2 (Professional Blue) - Trust and reliability
- **Secondary**: #00695c (Academic Teal) - Balance and focus
- **Success**: #2e7d32 (Achievement Green) - Completion and success
- **Warning**: #f57c00 (Attention Orange) - Alerts and pending actions
- **Error**: #d32f2f (Critical Red) - Errors and failures
- **Gradients**: Dynamic gradient combinations for modern appeal

### Typography
- **Font Family**: Inter - Modern, readable, professional
- **Headings**: Bold weights (700, 600) for clear hierarchy
- **Body Text**: Regular weight (400) for optimal readability
- **Line Height**: 1.5 for body, 1.2 for headings

### Spacing System
- **8px Base Unit**: Consistent spacing throughout the application
- **Material UI Scale**: 8, 16, 24, 32px for logical spacing relationships
- **Component Spacing**: Adequate white space for visual clarity

## 📱 Responsive Design

- **Mobile**: < 768px - Touch-optimized with floating action buttons
- **Tablet**: 768px - 1024px - Balanced two-column layouts
- **Desktop**: > 1024px - Full multi-column experience with sidebars
- **Adaptive Components**: Components that adjust based on screen size

## 🧪 Sample Data

The application includes realistic mock data for demonstration:
- **Sample Classes**: Pemrograman Web, Basis Data, Algoritma dan Struktur Data
- **Mock Students**: 20 students with Indonesian names and UDINUS NPM format
- **Course Chapters**: 5 chapters with weighted contributions
- **Grade Components**: Pre-configured with UDINUS standards
- **User Accounts**: Demo lecturer and admin accounts

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checking

### Code Quality
- **TypeScript Strict Mode**: Full type safety and error prevention
- **ESLint Configuration**: React and TypeScript best practices
- **Component Architecture**: Modular, reusable, and maintainable
- **Custom Hooks**: Business logic separation and reusability

## 📈 Performance Features

- **React.memo**: Optimized rendering for expensive components
- **Lazy Loading**: Efficient loading for large datasets
- **Zustand Optimization**: Minimal re-renders with selective subscriptions
- **Framer Motion**: Hardware-accelerated animations
- **Image Optimization**: Responsive images with proper sizing

## 🔐 Authentication Features

- **Mock Authentication**: Realistic login/register flow without backend
- **Session Persistence**: User session maintained across browser refreshes
- **Protected Routes**: Authentication-based access control
- **User Profiles**: Complete user information management
- **Demo Accounts**: Pre-configured accounts for immediate testing

## 📊 Reporting System

- **Class Analytics**: Comprehensive grade statistics and distributions
- **Export Options**: Multiple format support (PDF, Excel, CSV)
- **Real-time Filtering**: Dynamic search and filter capabilities
- **Visual Indicators**: Color-coded grades and progress indicators
- **Responsive Tables**: Mobile-optimized data display

## 🔮 Future Enhancements

- **Backend Integration**: Supabase database and real-time features
- **Advanced Analytics**: Detailed performance metrics and trends
- **Collaboration Tools**: Multi-user editing and commenting
- **Mobile App**: React Native version for mobile devices
- **AI Integration**: Automated grading suggestions and insights

## 🎯 Technical Challenge Compliance

This application fully meets the BTIK UDINUS Frontend Developer technical challenge requirements:

### ✅ Priority 1 Features (All Implemented)
1. **Class Overview Dashboard** - Modern card-based layout with statistics
2. **Grade Component Configuration** - Dynamic percentage setup with validation
3. **Student Grade Input** - Multi-component table-based input system
4. **Grade Calculation Display** - Real-time calculations with visual feedback

### ✅ Enhanced Features (Bonus Implementation)
- **Authentication System** - Complete login/register/forgot password flow
- **Reporting System** - Comprehensive analytics and export functionality
- **Add New Classes** - Dynamic class creation with validation
- **Modern UI/UX** - Framer Motion animations and gradient design
- **Mobile Optimization** - Fully responsive with touch-friendly interface

### ✅ Technical Requirements
- **Next.js 14** with App Router
- **TypeScript** with strict type safety
- **Material UI** with custom theming
- **Tailwind CSS** for utility styling
- **Zustand** for state management
- **React Hook Form** with validation
- **Framer Motion** for animations

## 📄 License

This project is created for the BTIK UDINUS Frontend Developer technical challenge and demonstrates modern React development practices with a focus on user experience and code quality.

## 🤝 Contributing

This is a technical challenge submission showcasing:
- Modern React development patterns
- Professional UI/UX design
- Comprehensive feature implementation
- Production-ready code quality
- Responsive design principles

---

**Built with ❤️ for BTIK UDINUS OBE System**

*Demonstrating modern web development practices with Next.js, TypeScript, and Material UI*