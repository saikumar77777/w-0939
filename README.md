# 🌆 CivicSync – Community-Driven Issue Management Platform

## 📋 Introduction
CivicSync represents a cutting-edge digital solution for community engagement, enabling residents to actively participate in local governance through issue reporting and democratic voting. This comprehensive platform facilitates seamless issue tracking, community voting, and progress monitoring, all while maintaining robust security and scalability.

## 🎯 Mission
To develop a comprehensive fullstack application that seamlessly integrates authentication and authorization, empowering users to:
- Submit detailed reports of community issues with precise location data
- Access a dynamic, paginated stream of community-reported issues
- Exercise their democratic right through single-vote participation
- Monitor and manage their personal submissions
- Analyze issue distribution and voting patterns through intuitive visualizations
- Navigate between list and geographical representations of community concerns

## 👥 User Framework
The platform operates on a single-user model (citizen), with permissions dynamically assigned based on issue ownership and current status.

## 🔐 Security Framework
- Secure user registration and authentication via email/password
- Persistent authentication across sessions
- Comprehensive route protection
- Granular permissions:
  - Issue modification limited to original reporters
  - Editing restricted to pending issues
  - One vote per user per issue

## 📝 Feature Set

### 1. Issue Reporting
Comprehensive issue submission form including:
- **Title:** Concise issue summary
- **Description:** Detailed explanation
- **Category:** Selection menu (Road, Water, Sanitation, Electricity, Other)
- **Location:** Text-based address input
- **Media:** Optional image attachment
- **Status:** Defaults to Pending
- **Timestamp:** Automatic creation time

### 2. Personal Dashboard
Dedicated user space featuring:
- Complete list of submitted issues
- Edit/delete capabilities for pending issues
- Real-time vote tracking
- Direct access to detailed views

### 3. Community Feed
Global issue display with:
- Comprehensive issue cards showing:
  - Title
  - Category
  - Location
  - Current Status
  - Vote tally
  - Time elapsed
- Advanced functionality:
  - Title-based search
  - Category/status filtering
  - Chronological/popularity sorting
- Detailed view access with:
  - Complete description
  - Attached images
  - Precise location
  - Vote statistics
  - Voting interface

### 4. Democratic Voting
- Single-vote system per user per issue
- Real-time vote count updates
- Visual confirmation of vote status

### 5. Analytics Dashboard
Post-authentication analytics featuring:
- Category distribution visualization
- Weekly submission trends
- Top-voted issues by category
- Dynamic data updates

### 6. Geographic Interface
- Interactive map visualization
- Issue markers with:
  - Title
  - Current status
  - Vote count
- Location mapping from text input

## 🧪 Implementation Notes
- Status transitions (Pending → In Progress → Resolved) available through database or UI
- Complete image handling implementation
- Emphasis on intuitive user experience

## 🛠️ Technical Architecture

### 🏗️ System Design
- **Frontend:** React + TypeScript powered by Vite
- **Backend:** Supabase for comprehensive backend services
- **State Management:** Context API implementation

### 📦 Technology Stack
- **React:** UI framework
- **TypeScript:** Type-safe development
- **Tailwind CSS:** Responsive styling
- **shadcn-ui:** Component library
- **Supabase:** Backend services
- **React Query:** Data management

### 📁 Code Organization
- `src/pages/`: Application views
- `src/components/`: Reusable elements
- `src/context/`: State management
- `src/lib/`: Core functionality
- `src/types/`: Type definitions
- `src/utils/`: Helper functions

### 🔄 System Flow
- **Data Management:** React Query for Supabase integration
- **User Interaction:** Real-time database synchronization

### 📊 Data Structure
- **User Profile:** id, email, name, createdAt
- **Issue Record:** id, title, description, category, location, status, createdAt, userId, imageUrl, votes, coordinates

### 🔗 API Structure
- **Authentication:**
  - `/auth/signup`: New user registration
  - `/auth/signin`: User authentication
- **Issues:**
  - `/issues`: Issue creation
  - `/issues/:id`: Issue management
  - `/issues/:id/vote`: Vote recording
- **User Management:**
  - `/users/profile`: Profile operations
- **Analytics:**
  - `/analytics/trends`: Trend analysis
  - `/analytics/top-voted`: Popular issues

## 🚀 Launch Instructions
- **Development:** Execute `npm i` followed by `npm run dev`
- **Production:** Deploy via Lovable platform with domain customization

## 📝 Summary
CivicSync stands as a powerful tool for community engagement, combining modern technology with user-centric design to facilitate effective local governance.

---

We welcome your exploration and contribution to this project! For any inquiries or support, please don't hesitate to contact us.
