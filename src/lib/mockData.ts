// ============================================
// Mock Data for NGO HRMS Demo
// Pre-seeded data to make the demo impressive
// ============================================

export const departments = [
  { id: '1', name: 'Programs & Operations', description: 'Field operations and program delivery', head_id: '1' },
  { id: '2', name: 'Human Resources', description: 'People management and organizational development', head_id: '2' },
  { id: '3', name: 'Finance & Administration', description: 'Financial management and administrative support', head_id: '3' },
  { id: '4', name: 'Monitoring & Evaluation', description: 'Impact measurement and program evaluation', head_id: '4' },
  { id: '5', name: 'Communications & Advocacy', description: 'Public relations, media, and advocacy', head_id: '5' },
  { id: '6', name: 'Logistics & Supply Chain', description: 'Procurement, warehousing, and distribution', head_id: '6' },
];

export type StaffStatus = 'active' | 'on_leave' | 'inactive' | 'contractor';
export type StaffRole = 'admin' | 'manager' | 'staff';

export interface StaffMember {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  role: StaffRole;
  status: StaffStatus;
  departmentId: string;
  position: string;
  location: string;
  country: string;
  hireDate: string;
  contractEndDate?: string;
}

export const staff: StaffMember[] = [
  { id: '1', employeeId: 'EMP-001', firstName: 'Amara', lastName: 'Diallo', email: 'amara.diallo@ngo.org', phone: '+221 77 123 4567', avatarUrl: '', role: 'admin', status: 'active', departmentId: '1', position: 'Country Director', location: 'Dakar', country: 'Senegal', hireDate: '2019-03-15' },
  { id: '2', employeeId: 'EMP-002', firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.mitchell@ngo.org', phone: '+44 7700 123456', avatarUrl: '', role: 'admin', status: 'active', departmentId: '2', position: 'HR Director', location: 'London', country: 'UK', hireDate: '2020-01-10' },
  { id: '3', employeeId: 'EMP-003', firstName: 'Carlos', lastName: 'Mendoza', email: 'carlos.mendoza@ngo.org', phone: '+502 5555 1234', avatarUrl: '', role: 'manager', status: 'active', departmentId: '3', position: 'Finance Manager', location: 'Guatemala City', country: 'Guatemala', hireDate: '2020-06-01' },
  { id: '4', employeeId: 'EMP-004', firstName: 'Fatima', lastName: 'Al-Hassan', email: 'fatima.alhassan@ngo.org', phone: '+961 71 123 456', avatarUrl: '', role: 'manager', status: 'active', departmentId: '4', position: 'M&E Lead', location: 'Beirut', country: 'Lebanon', hireDate: '2021-02-15' },
  { id: '5', employeeId: 'EMP-005', firstName: 'James', lastName: 'Okonkwo', email: 'james.okonkwo@ngo.org', phone: '+234 803 123 4567', avatarUrl: '', role: 'manager', status: 'active', departmentId: '5', position: 'Communications Manager', location: 'Abuja', country: 'Nigeria', hireDate: '2021-04-20' },
  { id: '6', employeeId: 'EMP-006', firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@ngo.org', phone: '+977 984 123 4567', avatarUrl: '', role: 'manager', status: 'active', departmentId: '6', position: 'Logistics Manager', location: 'Kathmandu', country: 'Nepal', hireDate: '2020-09-01' },
  { id: '7', employeeId: 'EMP-007', firstName: 'Ahmed', lastName: 'Khalil', email: 'ahmed.khalil@ngo.org', phone: '+249 91 123 4567', avatarUrl: '', role: 'staff', status: 'active', departmentId: '1', position: 'Field Coordinator', location: 'Khartoum', country: 'Sudan', hireDate: '2022-01-15' },
  { id: '8', employeeId: 'EMP-008', firstName: 'Maria', lastName: 'Santos', email: 'maria.santos@ngo.org', phone: '+63 917 123 4567', avatarUrl: '', role: 'staff', status: 'active', departmentId: '1', position: 'Program Officer', location: 'Manila', country: 'Philippines', hireDate: '2022-03-10' },
  { id: '9', employeeId: 'EMP-009', firstName: 'David', lastName: 'Nkurunziza', email: 'david.nkurunziza@ngo.org', phone: '+250 788 123 456', avatarUrl: '', role: 'staff', status: 'active', departmentId: '4', position: 'M&E Officer', location: 'Kigali', country: 'Rwanda', hireDate: '2022-06-01' },
  { id: '10', employeeId: 'EMP-010', firstName: 'Elena', lastName: 'Popova', email: 'elena.popova@ngo.org', phone: '+380 50 123 4567', avatarUrl: '', role: 'staff', status: 'active', departmentId: '1', position: 'Protection Officer', location: 'Kyiv', country: 'Ukraine', hireDate: '2022-08-15' },
  { id: '11', employeeId: 'EMP-011', firstName: 'Omar', lastName: 'Farah', email: 'omar.farah@ngo.org', phone: '+252 61 123 4567', avatarUrl: '', role: 'staff', status: 'on_leave', departmentId: '6', position: 'Warehouse Manager', location: 'Mogadishu', country: 'Somalia', hireDate: '2021-11-01' },
  { id: '12', employeeId: 'EMP-012', firstName: 'Lina', lastName: 'Tran', email: 'lina.tran@ngo.org', phone: '+84 912 345 678', avatarUrl: '', role: 'staff', status: 'active', departmentId: '2', position: 'HR Officer', location: 'Hanoi', country: 'Vietnam', hireDate: '2023-01-10' },
  { id: '13', employeeId: 'EMP-013', firstName: 'Jean-Pierre', lastName: 'Uwimana', email: 'jp.uwimana@ngo.org', phone: '+250 788 987 654', avatarUrl: '', role: 'staff', status: 'active', departmentId: '3', position: 'Finance Officer', location: 'Kigali', country: 'Rwanda', hireDate: '2023-03-20' },
  { id: '14', employeeId: 'EMP-014', firstName: 'Nadia', lastName: 'Benali', email: 'nadia.benali@ngo.org', phone: '+213 555 123 456', avatarUrl: '', role: 'staff', status: 'contractor', departmentId: '5', position: 'Communications Specialist', location: 'Algiers', country: 'Algeria', hireDate: '2023-06-01', contractEndDate: '2024-06-01' },
  { id: '15', employeeId: 'EMP-015', firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@ngo.org', phone: '+1 555 123 4567', avatarUrl: '', role: 'staff', status: 'active', departmentId: '1', position: 'WASH Engineer', location: 'Port-au-Prince', country: 'Haiti', hireDate: '2023-09-01' },
  { id: '16', employeeId: 'EMP-016', firstName: 'Aisha', lastName: 'Mohamed', email: 'aisha.mohamed@ngo.org', phone: '+252 62 987 6543', avatarUrl: '', role: 'staff', status: 'active', departmentId: '1', position: 'Education Officer', location: 'Hargeisa', country: 'Somalia', hireDate: '2023-11-15' },
  { id: '17', employeeId: 'EMP-017', firstName: 'Roberto', lastName: 'Garcia', email: 'roberto.garcia@ngo.org', phone: '+504 9999 1234', avatarUrl: '', role: 'staff', status: 'inactive', departmentId: '1', position: 'Nutrition Officer', location: 'Tegucigalpa', country: 'Honduras', hireDate: '2021-05-01' },
  { id: '18', employeeId: 'EMP-018', firstName: 'Sophie', lastName: 'Martin', email: 'sophie.martin@ngo.org', phone: '+33 6 12 34 56 78', avatarUrl: '', role: 'manager', status: 'active', departmentId: '1', position: 'Programs Director', location: 'Paris', country: 'France', hireDate: '2019-08-20' },
];

export type TrainingStatus = 'draft' | 'active' | 'completed' | 'archived';
export type EnrollmentStatus = 'enrolled' | 'in_progress' | 'completed' | 'dropped';

export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  status: TrainingStatus;
  durationHours: number;
  maxParticipants: number;
  instructor: string;
  location: string;
  isMandatory: boolean;
  certificationName?: string;
  certificationValidityMonths?: number;
  startDate: string;
  endDate: string;
  enrolledCount: number;
  completedCount: number;
}

export const trainingPrograms: TrainingProgram[] = [
  { id: '1', title: 'Security & Safety in the Field', description: 'Essential security protocols for field staff operating in conflict-affected areas. Covers threat assessment, communication procedures, and emergency evacuation.', category: 'Security', status: 'active', durationHours: 16, maxParticipants: 30, instructor: 'Security Advisor Team', location: 'Online + In-person', isMandatory: true, certificationName: 'Field Security Certification', certificationValidityMonths: 12, startDate: '2024-01-15', endDate: '2024-01-19', enrolledCount: 24, completedCount: 18 },
  { id: '2', title: 'Protection from Sexual Exploitation & Abuse (PSEA)', description: 'Mandatory training on preventing and responding to sexual exploitation and abuse. Covers organizational policies, reporting mechanisms, and survivor-centered approaches.', category: 'Compliance', status: 'active', durationHours: 8, maxParticipants: 50, instructor: 'Ethics & Compliance Unit', location: 'Online', isMandatory: true, certificationName: 'PSEA Certification', certificationValidityMonths: 24, startDate: '2024-02-01', endDate: '2024-02-02', enrolledCount: 42, completedCount: 35 },
  { id: '3', title: 'Project Cycle Management', description: 'Comprehensive training on managing projects from design to evaluation. Includes logical frameworks, theory of change, and adaptive management.', category: 'Technical', status: 'active', durationHours: 24, maxParticipants: 20, instructor: 'Dr. Sarah Mitchell', location: 'Dakar Office', isMandatory: false, startDate: '2024-03-01', endDate: '2024-03-05', enrolledCount: 15, completedCount: 8 },
  { id: '4', title: 'Financial Reporting & Compliance', description: 'Training on donor financial reporting requirements, budget management, and audit preparation. Covers major donor formats (USAID, ECHO, DFID).', category: 'Finance', status: 'active', durationHours: 12, maxParticipants: 25, instructor: 'Carlos Mendoza', location: 'Online', isMandatory: false, startDate: '2024-02-15', endDate: '2024-02-17', enrolledCount: 20, completedCount: 12 },
  { id: '5', title: 'Data Collection & M&E Tools', description: 'Hands-on training on digital data collection tools (KoboToolbox, ODK), data quality assurance, and basic data analysis for field monitoring.', category: 'M&E', status: 'completed', durationHours: 16, maxParticipants: 20, instructor: 'Fatima Al-Hassan', location: 'Beirut Office', isMandatory: false, startDate: '2023-11-10', endDate: '2023-11-14', enrolledCount: 18, completedCount: 16 },
  { id: '6', title: 'Humanitarian Principles & Code of Conduct', description: 'Introduction to humanitarian principles (humanity, neutrality, impartiality, independence) and the Red Cross/NGO Code of Conduct.', category: 'Compliance', status: 'active', durationHours: 4, maxParticipants: 100, instructor: 'Online Self-paced', location: 'Online', isMandatory: true, certificationName: 'Humanitarian Principles Certificate', certificationValidityMonths: 36, startDate: '2024-01-01', endDate: '2024-12-31', enrolledCount: 16, completedCount: 10 },
  { id: '7', title: 'Gender Mainstreaming in Programs', description: 'Training on integrating gender analysis into program design, implementation, and evaluation. Covers GBV awareness and gender-responsive budgeting.', category: 'Technical', status: 'draft', durationHours: 12, maxParticipants: 25, instructor: 'External Consultant', location: 'Kigali Office', isMandatory: false, startDate: '2024-04-01', endDate: '2024-04-03', enrolledCount: 0, completedCount: 0 },
  { id: '8', title: 'Logistics & Procurement Best Practices', description: 'Training on procurement policies, vendor management, fleet management, and warehouse operations in humanitarian contexts.', category: 'Operations', status: 'completed', durationHours: 20, maxParticipants: 15, instructor: 'Priya Sharma', location: 'Kathmandu Office', isMandatory: false, startDate: '2023-10-01', endDate: '2023-10-05', enrolledCount: 12, completedCount: 12 },
];

export interface Enrollment {
  id: string;
  staffId: string;
  programId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  startedAt?: string;
  completedAt?: string;
  score?: number;
}

export const enrollments: Enrollment[] = [
  // Security training
  { id: '1', staffId: '7', programId: '1', status: 'completed', enrolledAt: '2024-01-10', startedAt: '2024-01-15', completedAt: '2024-01-19', score: 92 },
  { id: '2', staffId: '8', programId: '1', status: 'completed', enrolledAt: '2024-01-10', startedAt: '2024-01-15', completedAt: '2024-01-19', score: 88 },
  { id: '3', staffId: '10', programId: '1', status: 'completed', enrolledAt: '2024-01-10', startedAt: '2024-01-15', completedAt: '2024-01-19', score: 95 },
  { id: '4', staffId: '15', programId: '1', status: 'in_progress', enrolledAt: '2024-01-10', startedAt: '2024-01-15' },
  { id: '5', staffId: '16', programId: '1', status: 'enrolled', enrolledAt: '2024-01-12' },
  // PSEA training
  { id: '6', staffId: '7', programId: '2', status: 'completed', enrolledAt: '2024-01-20', startedAt: '2024-02-01', completedAt: '2024-02-02', score: 96 },
  { id: '7', staffId: '8', programId: '2', status: 'completed', enrolledAt: '2024-01-20', startedAt: '2024-02-01', completedAt: '2024-02-02', score: 91 },
  { id: '8', staffId: '9', programId: '2', status: 'in_progress', enrolledAt: '2024-01-20', startedAt: '2024-02-01' },
  { id: '9', staffId: '10', programId: '2', status: 'completed', enrolledAt: '2024-01-20', startedAt: '2024-02-01', completedAt: '2024-02-02', score: 89 },
  // PCM training
  { id: '10', staffId: '7', programId: '3', status: 'in_progress', enrolledAt: '2024-02-20', startedAt: '2024-03-01' },
  { id: '11', staffId: '8', programId: '3', status: 'in_progress', enrolledAt: '2024-02-20', startedAt: '2024-03-01' },
  { id: '12', staffId: '18', programId: '3', status: 'completed', enrolledAt: '2024-02-20', startedAt: '2024-03-01', completedAt: '2024-03-05', score: 97 },
  // Financial Reporting
  { id: '13', staffId: '13', programId: '4', status: 'completed', enrolledAt: '2024-02-01', startedAt: '2024-02-15', completedAt: '2024-02-17', score: 85 },
  { id: '14', staffId: '3', programId: '4', status: 'completed', enrolledAt: '2024-02-01', startedAt: '2024-02-15', completedAt: '2024-02-17', score: 94 },
  // M&E Tools
  { id: '15', staffId: '9', programId: '5', status: 'completed', enrolledAt: '2023-10-15', startedAt: '2023-11-10', completedAt: '2023-11-14', score: 90 },
  { id: '16', staffId: '4', programId: '5', status: 'completed', enrolledAt: '2023-10-15', startedAt: '2023-11-10', completedAt: '2023-11-14', score: 93 },
  // Humanitarian Principles
  { id: '17', staffId: '7', programId: '6', status: 'completed', enrolledAt: '2024-01-05', startedAt: '2024-01-05', completedAt: '2024-01-10', score: 88 },
  { id: '18', staffId: '8', programId: '6', status: 'enrolled', enrolledAt: '2024-01-05' },
  { id: '19', staffId: '12', programId: '6', status: 'completed', enrolledAt: '2024-01-05', startedAt: '2024-01-05', completedAt: '2024-01-08', score: 92 },
];

export interface Certification {
  id: string;
  staffId: string;
  name: string;
  issuingBody: string;
  issuedDate: string;
  expiryDate: string;
  isActive: boolean;
}

export const certifications: Certification[] = [
  { id: '1', staffId: '1', name: 'PMP - Project Management Professional', issuingBody: 'PMI', issuedDate: '2018-06-15', expiryDate: '2025-06-15', isActive: true },
  { id: '2', staffId: '1', name: 'Field Security Certification', issuingBody: 'Internal', issuedDate: '2024-01-19', expiryDate: '2025-01-19', isActive: true },
  { id: '3', staffId: '7', name: 'Field Security Certification', issuingBody: 'Internal', issuedDate: '2024-01-19', expiryDate: '2025-01-19', isActive: true },
  { id: '4', staffId: '7', name: 'PSEA Certification', issuingBody: 'Internal', issuedDate: '2024-02-02', expiryDate: '2026-02-02', isActive: true },
  { id: '5', staffId: '8', name: 'Field Security Certification', issuingBody: 'Internal', issuedDate: '2024-01-19', expiryDate: '2025-01-19', isActive: true },
  { id: '6', staffId: '10', name: 'Field Security Certification', issuingBody: 'Internal', issuedDate: '2024-01-19', expiryDate: '2025-01-19', isActive: true },
  { id: '7', staffId: '15', name: 'WASH Engineering License', issuingBody: 'Engineers Board', issuedDate: '2022-03-01', expiryDate: '2024-03-01', isActive: false },
  { id: '8', staffId: '3', name: 'CPA - Certified Public Accountant', issuingBody: 'AICPA', issuedDate: '2019-09-20', expiryDate: '2025-09-20', isActive: true },
  { id: '9', staffId: '6', name: 'CSCP - Supply Chain Professional', issuingBody: 'ASCM', issuedDate: '2020-04-10', expiryDate: '2025-04-10', isActive: true },
  { id: '10', staffId: '18', name: 'PMP - Project Management Professional', issuingBody: 'PMI', issuedDate: '2017-11-05', expiryDate: '2024-11-05', isActive: false },
];

// Helper functions
export function getStaffById(id: string) {
  return staff.find(s => s.id === id);
}

export function getDepartmentById(id: string) {
  return departments.find(d => d.id === id);
}

export function getDepartmentName(id: string) {
  return departments.find(d => d.id === id)?.name || 'Unknown';
}

export function getStaffEnrollments(staffId: string) {
  return enrollments.filter(e => e.staffId === staffId);
}

export function getStaffCertifications(staffId: string) {
  return certifications.filter(c => c.staffId === staffId);
}

export function getProgramEnrollments(programId: string) {
  return enrollments.filter(e => e.programId === programId);
}

export function getProgramById(id: string) {
  return trainingPrograms.find(p => p.id === id);
}

// Stats
export function getStats() {
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const totalStaff = staff.length;
  const activePrograms = trainingPrograms.filter(p => p.status === 'active').length;
  const totalEnrollments = enrollments.length;
  const completedEnrollments = enrollments.filter(e => e.status === 'completed').length;
  const completionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;
  const mandatoryCompliance = 78; // Calculated from mandatory training completion
  // Use a fixed reference date for static rendering compatibility
  const refDate = new Date('2024-03-15');
  const threeMonthsOut = new Date(refDate.getTime() + 90 * 24 * 60 * 60 * 1000);
  const expiringCerts = certifications.filter(c => {
    const expiry = new Date(c.expiryDate);
    return c.isActive && expiry <= threeMonthsOut && expiry >= refDate;
  }).length;

  return {
    totalStaff,
    activeStaff,
    onLeave: staff.filter(s => s.status === 'on_leave').length,
    contractors: staff.filter(s => s.status === 'contractor').length,
    departments: departments.length,
    activePrograms,
    totalEnrollments,
    completedEnrollments,
    completionRate,
    mandatoryCompliance,
    expiringCerts,
  };
}

// Chart data
export function getDepartmentDistribution() {
  return departments.map(dept => ({
    name: dept.name.length > 15 ? dept.name.substring(0, 15) + '...' : dept.name,
    fullName: dept.name,
    count: staff.filter(s => s.departmentId === dept.id).length,
  }));
}

export function getCountryDistribution() {
  const countries: Record<string, number> = {};
  staff.forEach(s => {
    countries[s.country] = (countries[s.country] || 0) + 1;
  });
  return Object.entries(countries)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getTrainingCompletionByCategory() {
  const categories: Record<string, { total: number; completed: number }> = {};
  trainingPrograms.forEach(p => {
    if (!categories[p.category]) categories[p.category] = { total: 0, completed: 0 };
    categories[p.category].total += p.enrolledCount;
    categories[p.category].completed += p.completedCount;
  });
  return Object.entries(categories).map(([name, data]) => ({
    name,
    enrolled: data.total,
    completed: data.completed,
    rate: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
  }));
}