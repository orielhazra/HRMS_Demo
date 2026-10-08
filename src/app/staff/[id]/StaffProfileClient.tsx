'use client';

import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, Building2, 
  Shield, Award, GraduationCap, Clock, FileText, 
  CheckCircle2, AlertCircle, ExternalLink
} from 'lucide-react';
import { 
  getStaffById, getDepartmentName, getStaffEnrollments, 
  getStaffCertifications, trainingPrograms
} from '@/lib/mockData';
import Link from 'next/link';

export default function StaffProfileClient({ staffId }: { staffId: string }) {
  const person = getStaffById(staffId);
  
  if (!person) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-slate-700">Staff member not found</h2>
        <Link href="/staff" className="text-blue-600 mt-4 inline-block">← Back to directory</Link>
      </div>
    );
  }

  const staffEnrollments = getStaffEnrollments(person.id);
  const staffCertifications = getStaffCertifications(person.id);
  
  const completedCount = staffEnrollments.filter(e => e.status === 'completed').length;
  const inProgressCount = staffEnrollments.filter(e => e.status === 'in_progress').length;
  const avgScore = staffEnrollments
    .filter(e => e.score)
    .reduce((sum, e) => sum + (e.score || 0), 0) / 
    (staffEnrollments.filter(e => e.score).length || 1);

  const activeCertCount = staffCertifications.filter(c => c.isActive).length;
  const refDate = new Date('2024-03-15');
  const expiringCerts = staffCertifications.filter(c => {
    const expiry = new Date(c.expiryDate);
    return c.isActive && expiry <= new Date(refDate.getTime() + 90 * 24 * 60 * 60 * 1000);
  });

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link href="/staff" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Staff Directory
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-24"></div>
        <div className="px-8 pb-6 -mt-10">
          <div className="flex items-end gap-6">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-blue-600 border-4 border-white">
              {person.firstName[0]}{person.lastName[0]}
            </div>
            <div className="flex-1 pt-10">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{person.firstName} {person.lastName}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium status-${person.status}`}>
                  {person.status.replace('_', ' ')}
                </span>
                {person.role === 'admin' && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>
              <p className="text-slate-500 mt-1">{person.position}</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Info */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm text-slate-700">{person.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="text-sm text-slate-700">{person.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="text-sm text-slate-700">{person.location}, {person.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Department</p>
                  <p className="text-sm text-slate-700">{getDepartmentName(person.departmentId)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Hire Date</p>
                  <p className="text-sm text-slate-700">{new Date(person.hireDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-400">Employee ID</p>
                  <p className="text-sm text-slate-700 font-mono">{person.employeeId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Training Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{staffEnrollments.length}</p>
                <p className="text-xs text-slate-500">Enrolled</p>
              </div>
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
                <p className="text-xs text-slate-500">In Progress</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{Math.round(avgScore)}%</p>
                <p className="text-xs text-slate-500">Avg Score</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Certifications</h3>
              <span className="text-xs text-slate-400">{activeCertCount} active</span>
            </div>
            {staffCertifications.length === 0 ? (
              <p className="text-sm text-slate-400">No certifications on file</p>
            ) : (
              <div className="space-y-3">
                {staffCertifications.map(cert => {
                  const isExpired = !cert.isActive;
                  const isExpiring = expiringCerts.some(c => c.id === cert.id);
                  return (
                    <div key={cert.id} className={`p-3 rounded-lg border ${isExpired ? 'bg-red-50 border-red-200' : isExpiring ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-700">{cert.name}</p>
                          <p className="text-xs text-slate-400">{cert.issuingBody}</p>
                        </div>
                        {isExpired ? (
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        ) : isExpiring ? (
                          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {isExpired && <span className="text-red-500 ml-1">(Expired)</span>}
                        {isExpiring && !isExpired && <span className="text-amber-600 ml-1">(Expiring soon)</span>}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Training History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900">Training History</h3>
              <GraduationCap className="w-5 h-5 text-slate-300" />
            </div>
            
            {staffEnrollments.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No training enrollments yet</p>
            ) : (
              <div className="space-y-4">
                {staffEnrollments.map(enrollment => {
                  const program = trainingPrograms.find(p => p.id === enrollment.programId);
                  if (!program) return null;
                  return (
                    <div key={enrollment.id} className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        enrollment.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                        enrollment.status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                        enrollment.status === 'enrolled' ? 'bg-blue-100 text-blue-600' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-slate-700">{program.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium status-${enrollment.status}`}>
                            {enrollment.status.replace('_', ' ')}
                          </span>
                          {program.isMandatory && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-700">
                              Mandatory
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                          <span>{program.category}</span>
                          <span>{program.durationHours}h</span>
                          {enrollment.enrolledAt && <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>}
                          {enrollment.completedAt && <span>Completed: {new Date(enrollment.completedAt).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      {enrollment.score && (
                        <div className="text-right">
                          <p className={`text-lg font-bold ${enrollment.score >= 90 ? 'text-emerald-600' : enrollment.score >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>
                            {enrollment.score}%
                          </p>
                          <p className="text-[10px] text-slate-400">Score</p>
                        </div>
                      )}
                      <Link href={`/training/${program.id}`} className="p-2 text-slate-400 hover:text-slate-600">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}