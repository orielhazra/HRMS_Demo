-- ============================================
-- Seed Data for NGO HRMS
-- Sample data for development and demo
-- ============================================

-- ============================================
-- DEPARTMENTS
-- ============================================

INSERT INTO departments (id, name, description) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Programs & Operations', 'Field operations and program delivery'),
  ('a2222222-2222-2222-2222-222222222222', 'Human Resources', 'People management and organizational development'),
  ('a3333333-3333-3333-3333-333333333333', 'Finance & Administration', 'Financial management and administrative support'),
  ('a4444444-4444-4444-4444-444444444444', 'Monitoring & Evaluation', 'Impact measurement and program evaluation'),
  ('a5555555-5555-5555-5555-555555555555', 'Communications & Advocacy', 'Public relations, media, and advocacy'),
  ('a6666666-6666-6666-6666-666666666666', 'Logistics & Supply Chain', 'Procurement, warehousing, and distribution');

-- ============================================
-- STAFF PROFILES
-- ============================================

INSERT INTO staff_profiles (id, employee_id, first_name, last_name, email, phone, role, status, department_id, position, location, country, hire_date) VALUES
  ('b1111111-1111-1111-1111-111111111111', 'EMP-001', 'Amara', 'Diallo', 'amara.diallo@ngo.org', '+221 77 123 4567', 'admin', 'active', 'a1111111-1111-1111-1111-111111111111', 'Country Director', 'Dakar', 'Senegal', '2019-03-15'),
  ('b2222222-2222-2222-2222-222222222222', 'EMP-002', 'Sarah', 'Mitchell', 'sarah.mitchell@ngo.org', '+44 7700 123456', 'admin', 'active', 'a2222222-2222-2222-2222-222222222222', 'HR Director', 'London', 'UK', '2020-01-10'),
  ('b3333333-3333-3333-3333-333333333333', 'EMP-003', 'Carlos', 'Mendoza', 'carlos.mendoza@ngo.org', '+502 5555 1234', 'manager', 'active', 'a3333333-3333-3333-3333-333333333333', 'Finance Manager', 'Guatemala City', 'Guatemala', '2020-06-01'),
  ('b4444444-4444-4444-4444-444444444444', 'EMP-004', 'Fatima', 'Al-Hassan', 'fatima.alhassan@ngo.org', '+961 71 123 456', 'manager', 'active', 'a4444444-4444-4444-4444-444444444444', 'M&E Lead', 'Beirut', 'Lebanon', '2021-02-15'),
  ('b5555555-5555-5555-5555-555555555555', 'EMP-005', 'James', 'Okonkwo', 'james.okonkwo@ngo.org', '+234 803 123 4567', 'manager', 'active', 'a5555555-5555-5555-5555-555555555555', 'Communications Manager', 'Abuja', 'Nigeria', '2021-04-20'),
  ('b6666666-6666-6666-6666-666666666666', 'EMP-006', 'Priya', 'Sharma', 'priya.sharma@ngo.org', '+977 984 123 4567', 'manager', 'active', 'a6666666-6666-6666-6666-666666666666', 'Logistics Manager', 'Kathmandu', 'Nepal', '2020-09-01'),
  ('b7777777-7777-7777-7777-777777777777', 'EMP-007', 'Ahmed', 'Khalil', 'ahmed.khalil@ngo.org', '+249 91 123 4567', 'staff', 'active', 'a1111111-1111-1111-1111-111111111111', 'Field Coordinator', 'Khartoum', 'Sudan', '2022-01-15'),
  ('b8888888-8888-8888-8888-888888888888', 'EMP-008', 'Maria', 'Santos', 'maria.santos@ngo.org', '+63 917 123 4567', 'staff', 'active', 'a1111111-1111-1111-1111-111111111111', 'Program Officer', 'Manila', 'Philippines', '2022-03-10'),
  ('b9999999-9999-9999-9999-999999999999', 'EMP-009', 'David', 'Nkurunziza', 'david.nkurunziza@ngo.org', '+250 788 123 456', 'staff', 'active', 'a4444444-4444-4444-4444-444444444444', 'M&E Officer', 'Kigali', 'Rwanda', '2022-06-01'),
  ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'EMP-010', 'Elena', 'Popova', 'elena.popova@ngo.org', '+380 50 123 4567', 'staff', 'active', 'a1111111-1111-1111-1111-111111111111', 'Protection Officer', 'Kyiv', 'Ukraine', '2022-08-15'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'EMP-011', 'Omar', 'Farah', 'omar.farah@ngo.org', '+252 61 123 4567', 'staff', 'on_leave', 'a6666666-6666-6666-6666-666666666666', 'Warehouse Manager', 'Mogadishu', 'Somalia', '2021-11-01'),
  ('bcccccccc-cccc-cccc-cccc-cccccccccccc', 'EMP-012', 'Lina', 'Tran', 'lina.tran@ngo.org', '+84 912 345 678', 'staff', 'active', 'a2222222-2222-2222-2222-222222222222', 'HR Officer', 'Hanoi', 'Vietnam', '2023-01-10'),
  ('bdddddddd-dddd-dddd-dddd-ddddddddddd', 'EMP-013', 'Jean-Pierre', 'Uwimana', 'jp.uwimana@ngo.org', '+250 788 987 654', 'staff', 'active', 'a3333333-3333-3333-3333-333333333333', 'Finance Officer', 'Kigali', 'Rwanda', '2023-03-20'),
  ('beeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'EMP-014', 'Nadia', 'Benali', 'nadia.benali@ngo.org', '+213 555 123 456', 'staff', 'contractor', 'a5555555-5555-5555-5555-555555555555', 'Communications Specialist', 'Algiers', 'Algeria', '2023-06-01'),
  ('bffffffff-ffff-ffff-ffff-ffffffffffff', 'EMP-015', 'Michael', 'Chen', 'michael.chen@ngo.org', '+1 555 123 4567', 'staff', 'active', 'a1111111-1111-1111-1111-111111111111', 'WASH Engineer', 'Port-au-Prince', 'Haiti', '2023-09-01');

-- ============================================
-- TRAINING PROGRAMS
-- ============================================

INSERT INTO training_programs (id, title, description, category, status, duration_hours, max_participants, instructor, location, is_mandatory, certification_name, certification_validity_months, start_date, end_date) VALUES
  ('c1111111-1111-1111-1111-111111111111', 'Security & Safety in the Field', 'Essential security protocols for field staff operating in conflict-affected areas.', 'Security', 'active', 16, 30, 'Security Advisor Team', 'Online + In-person', true, 'Field Security Certification', 12, '2024-01-15', '2024-01-19'),
  ('c2222222-2222-2222-2222-222222222222', 'Protection from Sexual Exploitation & Abuse (PSEA)', 'Mandatory training on preventing and responding to sexual exploitation and abuse.', 'Compliance', 'active', 8, 50, 'Ethics & Compliance Unit', 'Online', true, 'PSEA Certification', 24, '2024-02-01', '2024-02-02'),
  ('c3333333-3333-3333-3333-333333333333', 'Project Cycle Management', 'Comprehensive training on managing projects from design to evaluation.', 'Technical', 'active', 24, 20, 'Dr. Sarah Mitchell', 'Dakar Office', false, NULL, NULL, '2024-03-01', '2024-03-05'),
  ('c4444444-4444-4444-4444-444444444444', 'Financial Reporting & Compliance', 'Training on donor financial reporting requirements and budget management.', 'Finance', 'active', 12, 25, 'Carlos Mendoza', 'Online', false, NULL, NULL, '2024-02-15', '2024-02-17'),
  ('c5555555-5555-5555-5555-555555555555', 'Data Collection & M&E Tools', 'Hands-on training on digital data collection tools and data analysis.', 'M&E', 'completed', 16, 20, 'Fatima Al-Hassan', 'Beirut Office', false, NULL, NULL, '2023-11-10', '2023-11-14'),
  ('c6666666-6666-6666-6666-666666666666', 'Humanitarian Principles & Code of Conduct', 'Introduction to humanitarian principles and the Red Cross/NGO Code of Conduct.', 'Compliance', 'active', 4, 100, 'Online Self-paced', 'Online', true, 'Humanitarian Principles Certificate', 36, '2024-01-01', '2024-12-31'),
  ('c7777777-7777-7777-7777-777777777777', 'Gender Mainstreaming in Programs', 'Training on integrating gender analysis into program design and evaluation.', 'Technical', 'draft', 12, 25, 'External Consultant', 'Kigali Office', false, NULL, NULL, '2024-04-01', '2024-04-03'),
  ('c8888888-8888-8888-8888-888888888888', 'Logistics & Procurement Best Practices', 'Training on procurement policies, vendor management, and warehouse operations.', 'Operations', 'completed', 20, 15, 'Priya Sharma', 'Kathmandu Office', false, NULL, NULL, '2023-10-01', '2023-10-05');

-- ============================================
-- TRAINING ENROLLMENTS
-- ============================================

INSERT INTO training_enrollments (id, staff_id, program_id, status, enrolled_at, started_at, completed_at, score) VALUES
  -- Security training
  ('d1111111-1111-1111-1111-111111111111', 'b7777777-7777-7777-7777-777777777777', 'c1111111-1111-1111-1111-111111111111', 'completed', '2024-01-10', '2024-01-15', '2024-01-19', 92),
  ('d2222222-2222-2222-2222-222222222222', 'b8888888-8888-8888-8888-888888888888', 'c1111111-1111-1111-1111-111111111111', 'completed', '2024-01-10', '2024-01-15', '2024-01-19', 88),
  ('d3333333-3333-3333-3333-333333333333', 'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'c1111111-1111-1111-1111-111111111111', 'completed', '2024-01-10', '2024-01-15', '2024-01-19', 95),
  ('d4444444-4444-4444-4444-444444444444', 'bffffffff-ffff-ffff-ffff-ffffffffffff', 'c1111111-1111-1111-1111-111111111111', 'in_progress', '2024-01-10', '2024-01-15', NULL, NULL),
  -- PSEA training
  ('d5555555-5555-5555-5555-555555555555', 'b7777777-7777-7777-7777-777777777777', 'c2222222-2222-2222-2222-222222222222', 'completed', '2024-01-20', '2024-02-01', '2024-02-02', 96),
  ('d6666666-6666-6666-6666-666666666666', 'b8888888-8888-8888-8888-888888888888', 'c2222222-2222-2222-2222-222222222222', 'completed', '2024-01-20', '2024-02-01', '2024-02-02', 91),
  ('d7777777-7777-7777-7777-777777777777', 'b9999999-9999-9999-9999-999999999999', 'c2222222-2222-2222-2222-222222222222', 'in_progress', '2024-01-20', '2024-02-01', NULL, NULL),
  ('d8888888-8888-8888-8888-888888888888', 'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'c2222222-2222-2222-2222-222222222222', 'completed', '2024-01-20', '2024-02-01', '2024-02-02', 89),
  -- PCM training
  ('d9999999-9999-9999-9999-999999999999', 'b7777777-7777-7777-7777-777777777777', 'c3333333-3333-3333-3333-333333333333', 'in_progress', '2024-02-20', '2024-03-01', NULL, NULL),
  ('daaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'b8888888-8888-8888-8888-888888888888', 'c3333333-3333-3333-3333-333333333333', 'in_progress', '2024-02-20', '2024-03-01', NULL, NULL),
  -- Financial Reporting
  ('dbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bdddddddd-dddd-dddd-dddd-ddddddddddd', 'c4444444-4444-4444-4444-444444444444', 'completed', '2024-02-01', '2024-02-15', '2024-02-17', 85),
  ('dcccccccc-cccc-cccc-cccc-cccccccccccc', 'b3333333-3333-3333-3333-333333333333', 'c4444444-4444-4444-4444-444444444444', 'completed', '2024-02-01', '2024-02-15', '2024-02-17', 94),
  -- M&E Tools
  ('dddddddd-dddd-dddd-dddd-ddddddddddd', 'b9999999-9999-9999-9999-999999999999', 'c5555555-5555-5555-5555-555555555555', 'completed', '2023-10-15', '2023-11-10', '2023-11-14', 90),
  ('deeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'b4444444-4444-4444-4444-444444444444', 'c5555555-5555-5555-5555-555555555555', 'completed', '2023-10-15', '2023-11-10', '2023-11-14', 93),
  -- Humanitarian Principles
  ('dffffffff-ffff-ffff-ffff-ffffffffffff', 'b7777777-7777-7777-7777-777777777777', 'c6666666-6666-6666-6666-666666666666', 'completed', '2024-01-05', '2024-01-05', '2024-01-10', 88),
  ('d1111111-2222-3333-4444-555555555555', 'bcccccccc-cccc-cccc-cccc-cccccccccccc', 'c6666666-6666-6666-6666-666666666666', 'completed', '2024-01-05', '2024-01-05', '2024-01-08', 92);

-- ============================================
-- CERTIFICATIONS
-- ============================================

INSERT INTO certifications (id, staff_id, name, issuing_body, issued_date, expiry_date, is_active) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'PMP - Project Management Professional', 'PMI', '2018-06-15', '2025-06-15', true),
  ('e2222222-2222-2222-2222-222222222222', 'b1111111-1111-1111-1111-111111111111', 'Field Security Certification', 'Internal', '2024-01-19', '2025-01-19', true),
  ('e3333333-3333-3333-3333-333333333333', 'b7777777-7777-7777-7777-777777777777', 'Field Security Certification', 'Internal', '2024-01-19', '2025-01-19', true),
  ('e4444444-4444-4444-4444-444444444444', 'b7777777-7777-7777-7777-777777777777', 'PSEA Certification', 'Internal', '2024-02-02', '2026-02-02', true),
  ('e5555555-5555-5555-5555-555555555555', 'b8888888-8888-8888-8888-888888888888', 'Field Security Certification', 'Internal', '2024-01-19', '2025-01-19', true),
  ('e6666666-6666-6666-6666-666666666666', 'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Field Security Certification', 'Internal', '2024-01-19', '2025-01-19', true),
  ('e7777777-7777-7777-7777-777777777777', 'bffffffff-ffff-ffff-ffff-ffffffffffff', 'WASH Engineering License', 'Engineers Board', '2022-03-01', '2024-03-01', false),
  ('e8888888-8888-8888-8888-888888888888', 'b3333333-3333-3333-3333-333333333333', 'CPA - Certified Public Accountant', 'AICPA', '2019-09-20', '2025-09-20', true),
  ('e9999999-9999-9999-9999-999999999999', 'b6666666-6666-6666-6666-666666666666', 'CSCP - Supply Chain Professional', 'ASCM', '2020-04-10', '2025-04-10', true);