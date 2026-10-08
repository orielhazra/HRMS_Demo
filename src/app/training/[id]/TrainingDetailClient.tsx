'use client';

import { 
  ArrowLeft, Clock, Users, MapPin, Calendar, Award, 
  BookOpen, CheckCircle2, AlertCircle, GraduationCap,
  User, Star, Download
} from 'lucide-react';
import { 
  getProgramById, getProgramEnrollments, staff, getStaffById, getDepartmentName 
} from '@/lib/mockData';
import Link from 'next/link';

export default function TrainingDetailClient({ programId }: { programId: string }) {
  const program = getProgramById(programId);
  
  if (!program) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-slate-700">Program not found</h2>
        <Link href="/training" className="text-blue-600 mt-4 inline-block">← Back to training</Link>
      </div>
    );
  }

  const programEnrollments = getProgramEnrollments(program.id);
  const completedEnrollments = programEnrollments.filter(e => e.status === 'completed');
  const avgScore = completedEnrollments.length > 0 
    ? Math.round(completedEnrollments.reduce((sum, e) => sum + (e.score || 0), 0) / completedEnrollments.length)
    : 0;
  const completionRate = programEnrollments.length > 0 
    ? Math.round((completedEnrollments.length / programEnrollments.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <Link href="/training" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Training Programs
      </Link>

      {/* Program Header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className={`h-2 ${program.status === 'active' ? 'bg-emerald-500' : program.status === 'completed' ? 'bg-blue-500' : 'bg-slate-300'}`} />
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  program.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  program.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </span>
                {program.isMandatory && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    Mandatory
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  {program.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{program.title}</h1>
              <p className="text-slate-500 mt-2 max-w-2xl">{program.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                <Download className="w-4 h-4 inline mr-2" />
                Export
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Enroll Staff
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-medium text-slate-700">{program.durationHours} hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-medium text-slate-700">{program.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Period</p>
                <p className="text-sm font-medium text-slate-700">
                  {new Date(program.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(program.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Instructor</p>
                <p className="text-sm font-medium text-slate-700">{program.instructor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-3xl font-bold text-blue-600">{programEnrollments.length}</p>
          <p className="text-sm text-slate-500 mt-1">Total Enrolled</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-3xl font-bold text-emerald-600">{completedEnrollments.length}</p>
          <p className="text-sm text-slate-500 mt-1">Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-3xl font-bold text-amber-600">{completionRate}%</p>
          <p className="text-sm text-slate-500 mt-1">Completion Rate</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-3xl font-bold text-purple-600">{avgScore}%</p>
          <p className="text-sm text-slate-500 mt-1">Avg Score</p>
        </div>
      </div>

      {/* Enrolled Staff */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Enrolled Staff</h2>
            <span className="text-sm text-slate-400">{programEnrollments.length} participants</span>
          </div>
        </div>
        
        {programEnrollments.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="mt-3 text-sm text-slate-400">No staff enrolled yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {programEnrollments.map(enrollment => {
              const person = getStaffById(enrollment.staffId);
              if (!person) return null;
              return (
                <div key={enrollment.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  <Link href={`/staff/${person.id}`} className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {person.firstName[0]}{person.lastName[0]}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/staff/${person.id}`} className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      {person.firstName} {person.lastName}
                    </Link>
                    <p className="text-xs text-slate-400">{person.position} · {getDepartmentName(person.departmentId)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{person.location}, {person.country}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {enrollment.score && (
                      <div className="text-right">
                        <p className={`text-sm font-bold ${enrollment.score >= 90 ? 'text-emerald-600' : enrollment.score >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>
                          {enrollment.score}%
                        </p>
                      </div>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium status-${enrollment.status}`}>
                      {enrollment.status.replace('_', ' ')}
                    </span>
                    {enrollment.status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Certification Info */}
      {program.certificationName && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Certification: {program.certificationName}</h3>
              <p className="text-sm text-slate-500">
                Valid for {program.certificationValidityMonths} months upon completion. 
                Staff who complete this program will receive their certification automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}