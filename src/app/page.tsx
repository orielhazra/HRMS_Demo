'use client';

import { 
  Users, UserCheck, GraduationCap, Award, 
  AlertTriangle, TrendingUp, Building2, Clock,
  ArrowUpRight, ArrowDownRight, ChevronRight
} from 'lucide-react';
import { 
  getStats, getDepartmentDistribution, getCountryDistribution,
  getTrainingCompletionByCategory, staff, getDepartmentName,
  trainingPrograms, enrollments
} from '@/lib/mockData';
import Link from 'next/link';

const stats = getStats();

function StatCard({ 
  title, value, subtitle, icon: Icon, trend, trendUp, color 
}: { 
  title: string; value: string | number; subtitle: string;
  icon: React.ElementType; trend?: string; trendUp?: boolean; color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    cyan: 'bg-cyan-50 text-cyan-600',
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="mt-3 sm:mt-4">
        <p className="text-xl sm:text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">{title}</p>
      </div>
      <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 sm:mt-2 line-clamp-2">{subtitle}</p>
    </div>
  );
}

function SimpleBarChart({ data }: { data: { name: string; value: number; color?: string }[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs text-slate-500 w-16 sm:w-24 truncate text-right">{item.name}</span>
          <div className="flex-1 h-5 sm:h-6 bg-slate-100 rounded-md overflow-hidden">
            <div
              className="h-full rounded-md flex items-center px-1.5 sm:px-2"
              style={{ 
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.color || '#3b82f6',
                minWidth: '20px'
              }}
            >
              <span className="text-[10px] font-medium text-white">{item.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrainingProgressBar({ label, completed, total, color }: { label: string; completed: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm text-slate-600 truncate pr-2">{label}</span>
        <span className="text-xs sm:text-sm font-medium text-slate-800 flex-shrink-0">{pct}%</span>
      </div>
      <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <div className="flex justify-between text-[10px] sm:text-xs text-slate-400">
        <span>{completed} completed</span>
        <span>{total} enrolled</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const deptData = getDepartmentDistribution();
  const countryData = getCountryDistribution();
  const trainingByCategory = getTrainingCompletionByCategory();
  
  const deptColors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
  const categoryColors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  const recentEnrollments = enrollments
    .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Overview of personnel and training metrics across all operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          title="Total Staff"
          value={stats.totalStaff}
          subtitle={`${stats.activeStaff} active across ${stats.departments} departments`}
          icon={Users}
          trend="+12% YoY"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Active Programs"
          value={stats.activePrograms}
          subtitle={`${stats.totalEnrollments} total enrollments`}
          icon={GraduationCap}
          trend="+3 this quarter"
          trendUp={true}
          color="purple"
        />
        <StatCard
          title="Training Completion"
          value={`${stats.completionRate}%`}
          subtitle={`${stats.completedEnrollments} of ${stats.totalEnrollments} enrolled`}
          icon={TrendingUp}
          trend="+5% vs last Q"
          trendUp={true}
          color="green"
        />
        <StatCard
          title="Compliance Alerts"
          value={stats.expiringCerts}
          subtitle="Certifications expiring soon"
          icon={AlertTriangle}
          trend="Action needed"
          trendUp={false}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Staff by Department */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-slate-900">Staff by Department</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Current headcount distribution</p>
            </div>
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 flex-shrink-0" />
          </div>
          <SimpleBarChart 
            data={deptData.map((d, i) => ({ name: d.name, value: d.count, color: deptColors[i % deptColors.length] }))} 
          />
        </div>

        {/* Staff by Country */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-slate-900">Geographic Presence</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Staff distributed across countries</p>
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-slate-500">{countryData.length} countries</span>
          </div>
          <SimpleBarChart 
            data={countryData.map((d, i) => ({ ...d, color: deptColors[i % deptColors.length] }))} 
          />
        </div>
      </div>

      {/* Training & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Training by Category */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-slate-900">Training Completion by Category</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Enrollment vs completion rates</p>
            </div>
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 flex-shrink-0" />
          </div>
          <div className="space-y-4 sm:space-y-5">
            {trainingByCategory.map((cat, i) => (
              <TrainingProgressBar
                key={cat.name}
                label={cat.name}
                completed={cat.completed}
                total={cat.enrolled}
                color={categoryColors[i % categoryColors.length]}
              />
            ))}
          </div>
        </div>

        {/* Mandatory Training Compliance */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-slate-900">Mandatory Compliance</h3>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">Required training status</p>
            </div>
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 flex-shrink-0" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            {trainingPrograms
              .filter(p => p.isMandatory)
              .map(prog => {
                const rate = prog.enrolledCount > 0 ? Math.round((prog.completedCount / prog.enrolledCount) * 100) : 0;
                return (
                  <div key={prog.id} className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-slate-600 truncate">{prog.title}</span>
                      <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${rate >= 80 ? 'text-emerald-600' : rate >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                        {rate}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ 
                          width: `${rate}%`,
                          backgroundColor: rate >= 80 ? '#16a34a' : rate >= 50 ? '#d97706' : '#dc2626'
                        }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-400">{prog.completedCount} of {prog.enrolledCount} staff completed</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="font-semibold text-sm sm:text-base text-slate-900">Recent Activity</h3>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
          </div>
          <div className="space-y-2 sm:space-y-3">
            {recentEnrollments.map(enrollment => {
              const staffMember = staff.find(s => s.id === enrollment.staffId);
              const program = trainingPrograms.find(p => p.id === enrollment.programId);
              if (!staffMember || !program) return null;
              return (
                <div key={enrollment.id} className="flex items-center gap-2.5 sm:gap-3 py-2 border-b border-slate-50 last:border-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px] sm:text-xs font-bold flex-shrink-0">
                    {staffMember.firstName[0]}{staffMember.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-slate-700 truncate">
                      <span className="font-medium">{staffMember.firstName} {staffMember.lastName}</span>
                      {' '}enrolled in{' '}
                      <span className="font-medium">{program.title}</span>
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-400">{new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium flex-shrink-0 status-${enrollment.status}`}>
                    {enrollment.status.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-3 sm:mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link href="/staff" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-blue-700">Add Staff</p>
                <p className="text-[10px] sm:text-xs text-slate-400">Register new</p>
              </div>
            </Link>
            <Link href="/training" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-purple-700">New Program</p>
                <p className="text-[10px] sm:text-xs text-slate-400">Create training</p>
              </div>
            </Link>
            <Link href="/reports" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-emerald-700">Compliance</p>
                <p className="text-[10px] sm:text-xs text-slate-400">View reports</p>
              </div>
            </Link>
            <Link href="/staff" className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-amber-700">Alerts</p>
                <p className="text-[10px] sm:text-xs text-slate-400">{stats.expiringCerts} expiring</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}