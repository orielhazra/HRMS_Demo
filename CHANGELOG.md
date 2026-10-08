# Changelog

All notable changes to Humanitarian HRMS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-03-15

### Added

#### Dashboard
- Executive dashboard with key organizational metrics
- Stat cards for total staff, active programs, completion rate, and compliance alerts
- Staff distribution by department (bar chart)
- Geographic presence visualization (country distribution)
- Training completion by category (progress bars)
- Mandatory training compliance tracking
- Recent activity feed with enrollment updates
- Quick action buttons for common tasks

#### Staff Directory
- Searchable card grid displaying all personnel
- Real-time search by name, email, position, or employee ID
- Filter by status: Active, On Leave, Inactive, Contractor
- Filter by department
- Staff count indicators per filter
- Click-through to individual staff profiles

#### Staff Profile
- Employee header with name, role, status, and position
- Contact information panel (email, phone, location, department)
- Training summary statistics (enrolled, completed, in progress, average score)
- Certification tracking with expiry alerts
- Complete training history with scores and completion dates
- Links to related training programs

#### Training Programs
- Program catalog with category and status filters
- Search by title or description
- Rich program cards with status, progress, dates, and instructor
- Mandatory training visual indicators
- Category filters: Security, Compliance, Technical, Finance, M&E, Operations
- Status filters: All, Active, Completed, Draft

#### Training Detail
- Program header with description, duration, location, dates, instructor
- Enrollment statistics (total, completed, rate, average score)
- Participant list with status and scores
- Certification information for qualifying programs
- Enroll staff action button

#### Reports & Analytics
- Key organizational metrics overview
- Staff by department distribution chart
- Staff composition donut charts (status and role)
- Training completion by category comparison
- Geographic presence distribution
- Mandatory training compliance rates
- Certification expiry and alerts section
- Export report functionality

#### Database
- Complete PostgreSQL schema with 6 tables
- Row Level Security policies on all tables
- ENUM types for constrained values
- UUID primary keys
- Automatic timestamp management
- Indexes for query performance
- Seed data with realistic NGO sample data

#### Technical
- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- Custom SVG chart components
- Mock data layer for demo mode
- Supabase integration ready
- Responsive design for mobile and desktop
- Collapsible sidebar navigation
- Global search in header
- User profile display

### Documentation
- Comprehensive README with setup instructions
- Contributing guidelines
- API documentation with examples
- Deployment guide (Vercel, Docker, AWS, self-hosted)
- Architecture document
- Database schema documentation
- Environment variable reference

---

## [Unreleased]

### Planned
- Supabase Auth integration with OAuth providers
- Real-time data subscriptions
- Performance review management
- Leave management system
- Bulk import/export (CSV, Excel)
- Email notifications for expiring certifications
- Audit trail and activity logging
- Mobile app (React Native)
- Multi-tenant support
- Custom report builder
- Dark mode support
- Accessibility improvements (WCAG 2.1 AA)
- End-to-end tests
- API rate limiting
- Webhook integrations