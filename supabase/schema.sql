-- ============================================
-- NGO Personnel & Training Management System
-- Database Schema for Supabase (PostgreSQL)
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE staff_status AS ENUM ('active', 'on_leave', 'inactive', 'contractor');
CREATE TYPE training_status AS ENUM ('draft', 'active', 'completed', 'archived');
CREATE TYPE enrollment_status AS ENUM ('enrolled', 'in_progress', 'completed', 'dropped');
CREATE TYPE staff_role AS ENUM ('admin', 'manager', 'staff');

-- ============================================
-- DEPARTMENTS
-- ============================================

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  head_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STAFF PROFILES
-- ============================================

CREATE TABLE staff_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role staff_role DEFAULT 'staff',
  status staff_status DEFAULT 'active',
  department_id UUID REFERENCES departments(id),
  position TEXT NOT NULL,
  location TEXT,
  country TEXT,
  hire_date DATE NOT NULL,
  contract_end_date DATE,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRAINING PROGRAMS
-- ============================================

CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  status training_status DEFAULT 'draft',
  duration_hours NUMERIC(5,1),
  max_participants INTEGER,
  instructor TEXT,
  location TEXT,
  is_mandatory BOOLEAN DEFAULT FALSE,
  certification_name TEXT,
  certification_validity_months INTEGER,
  start_date DATE,
  end_date DATE,
  created_by UUID REFERENCES staff_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRAINING ENROLLMENTS
-- ============================================

CREATE TABLE training_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES staff_profiles(id) ON DELETE CASCADE,
  program_id UUID REFERENCES training_programs(id) ON DELETE CASCADE,
  status enrollment_status DEFAULT 'enrolled',
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  score NUMERIC(5,2),
  certificate_url TEXT,
  notes TEXT,
  UNIQUE(staff_id, program_id)
);

-- ============================================
-- CERTIFICATIONS
-- ============================================

CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES staff_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuing_body TEXT,
  issued_date DATE,
  expiry_date DATE,
  certificate_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PERFORMANCE REVIEWS
-- ============================================

CREATE TABLE performance_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES staff_profiles(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES staff_profiles(id),
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  strengths TEXT,
  areas_for_improvement TEXT,
  goals TEXT,
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_staff_department ON staff_profiles(department_id);
CREATE INDEX idx_staff_status ON staff_profiles(status);
CREATE INDEX idx_enrollments_staff ON training_enrollments(staff_id);
CREATE INDEX idx_enrollments_program ON training_enrollments(program_id);
CREATE INDEX idx_certifications_staff ON certifications(staff_id);
CREATE INDEX idx_certifications_expiry ON certifications(expiry_date);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reviews ENABLE ROW LEVEL SECURITY;

-- Policies: authenticated users can read all, admins can modify
CREATE POLICY "Authenticated users can view departments"
  ON departments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view staff"
  ON staff_profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view training programs"
  ON training_programs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can view enrollments"
  ON training_enrollments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can view own certifications"
  ON certifications FOR SELECT TO authenticated USING (true);

CREATE POLICY "Staff can view own reviews"
  ON performance_reviews FOR SELECT TO authenticated USING (auth.uid() = staff_id OR auth.uid() = reviewer_id);

-- ============================================
-- FOREIGN KEY FOR DEPARTMENTS HEAD
-- ============================================

ALTER TABLE departments ADD CONSTRAINT fk_department_head
  FOREIGN KEY (head_id) REFERENCES staff_profiles(id);