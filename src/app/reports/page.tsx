'use client';

import { 
  Download, Calendar, Filter, TrendingUp, Users, 
  GraduationCap, Award, AlertTriangle, Globe, Building2,
  BarChart3, PieChart
} from 'lucide-react';
import { 
  getStats, getDepartmentDistribution, getCountryDistribution,
  getTrainingCompletionByCategory, trainingPrograms, staff, 
  enrollments, certifications, getDepartmentName, departments
} from '@/lib/mockData';

function MetricCard({ label, value, change, changeUp, icon: Icon, color }: {
  label: string; value: string | number; change?: string; changeUp?: boolean;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        {change && (
          <span className={`text-xs font-medium ${changeUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function HorizontalBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-32 truncate text-right">{label}</span>
      <div className="flex-1 h-7 bg-slate-100 rounded-md overflow-hidden relative">
        <div className="h-full rounded-md" style={{ width: `${(value / max) * 100}%`, backgroundColor: color, minWidth: '2px' }} />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600">{value}</span>
      </div>
    </div>
  );
}

function DonutChart({ data, colors, centerLabel, centerValue }: { 
  data: { label: string; value: number }[]; colors: string[]; centerLabel: string; centerValue: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercent = 0;
  
  const segments = data.map((d, i) => {
    const percent = total > 0 ? (d.value / total) * 100 : 0;
    const startAngle = cumulativePercent * 3.6;
    cumulativePercent += percent;
    const endAngle = cumulativePercent * 3.6;
    
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    
    const largeArcFlag = percent > 50 ? 1 : 0;
    const radius = 60;
    const x1 = 80 + radius * Math.cos(startRad);
    const y1 = 80 + radius * Math.sin(startRad);
    const x2 = 80 + radius * Math.cos(endRad);
    const y2 = 80 + radius * Math.sin(endRad);
    
    const innerRadius = 40;
    const x3 = 80 + innerRadius * Math.cos(endRad);
    const y3 = 80 + innerRadius * Math.sin(endRad);
    const x4 = 80 + innerRadius * Math.cos(startRad);
    const y4 = 80 + innerRadius * Math.sin(startRad);
    
    return (
      <path
        key={i}
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`}
        fill={colors[i % colors.length]}
      />
    );
  });

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {segments}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-slate-900">{centerValue}</p>
          <p className="text-[10px] text-slate-400">{centerLabel}</p>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="text-xs text-slate-600">{d.label}</span>
            <span className="text-xs font-medium text-slate-800 ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports() {
  const stats = getStats();
  const deptData = getDepartmentDistribution();
  const countryData = getCountryDistribution();
  const trainingByCategory = getTrainingCompletionByCategory();

  const statusDist = [
    { label: 'Active', value: staff.filter(s => s.status === 'active').length },
    { label: 'On Leave', value: staff.filter(s => s.status === 'on_leave').length },
    { label: 'Contractor', value: staff.filter(s => s.status === 'contractor').length },
    { label: 'Inactive', value: staff.filter(s => s.status === 'inactive').length },
  ];

  const roleDist = [
    { label: 'Admin', value: staff.filter(s => s.role === 'admin').length },
    { label: 'Manager', value: staff.filter(s => s.role === 'manager').length },
    { label: 'Staff', value: staff.filter(s => s.role === 'staff').length },
  ];

  const deptColors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
  const statusColors = ['#10b981', '#f59e0b', '#3b82f6', '#94a3b8'];
  const roleColors = ['#8b5cf6', '#3b82f6', '#06b6d4'];

  // Certification alerts (using fixed reference date for static rendering)
  const refDate = new Date('2024-03-15');
  const threeMonthsOut = new Date(refDate.getTime() + 90 * 24 * 60 * 60 * 1000);
  const expiringCerts = certifications.filter(c => {
    const expiry = new Date(c.expiryDate);
    return c.isActive && expiry <= threeMonthsOut && expiry >= refDate;
  });

  const expiredCerts = certifications.filter(c => !c.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive overview of organizational metrics and compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <Calendar className="w-4 h-4" />
            Q1 2024
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MetricCard label="Total Staff" value={stats.totalStaff} change="+12%" changeUp icon={Users} color="bg-blue-50 text-blue-600" />
        <MetricCard label="Active" value={stats.activeStaff} icon={Users} color="bg-emerald-50 text-emerald-600" />
        <MetricCard label="Departments" value={stats.departments} icon={Building2} color="bg-purple-50 text-purple-600" />
        <MetricCard label="Active Programs" value={stats.activePrograms} change="+3" changeUp icon={GraduationCap} color="bg-cyan-50 text-cyan-600" />
        <MetricCard label="Completion Rate" value={`${stats.completionRate}%`} change="+5%" changeUp icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
        <MetricCard label="Cert Alerts" value={stats.expiringCerts} icon={AlertTriangle} color="bg-red-50 text-red-600" />
      </div>

      {/* Staff Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff by Department */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Staff by Department</h3>
              <p className="text-xs text-slate-400 mt-1">Headcount distribution across departments</p>
            </div>
            <Building2 className="w-5 h-5 text-slate-300" />
          </div>
          <div className="space-y-3">
            {deptData.map((d, i) => (
              <HorizontalBar key={d.name} label={d.fullName || d.name} value={d.count} max={Math.max(...deptData.map(x => x.count))} color={deptColors[i % deptColors.length]} />
            ))}
          </div>
        </div>

        {/* Staff Status & Role Donut */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Staff Composition</h3>
              <p className="text-xs text-slate-400 mt-1">Status and role breakdown</p>
            </div>
            <PieChart className="w-5 h-5 text-slate-300" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <DonutChart 
              data={statusDist} 
              colors={statusColors} 
              centerLabel="Total" 
              centerValue={String(stats.totalStaff)} 
            />
            <DonutChart 
              data={roleDist} 
              colors={roleColors} 
              centerLabel="By Role" 
              centerValue={String(stats.totalStaff)} 
            />
          </div>
        </div>
      </div>

      {/* Training Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training by Category */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Training by Category</h3>
              <p className="text-xs text-slate-400 mt-1">Enrolled vs completed across categories</p>
            </div>
            <GraduationCap className="w-5 h-5 text-slate-300" />
          </div>
          <div className="space-y-4">
            {trainingByCategory.map((cat, i) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{cat.name}</span>
                  <span className="text-sm font-medium text-slate-800">{cat.rate}%</span>
                </div>
                <div className="flex gap-1 h-6">
                  <div className="h-full rounded-l-md bg-blue-200" style={{ width: `${(cat.enrolled / Math.max(...trainingByCategory.map(t => t.enrolled))) * 100}%`, minWidth: '2px' }}>
                    <div className="h-full rounded-l-md" style={{ width: `${cat.enrolled > 0 ? (cat.completed / cat.enrolled) * 100 : 0}%`, backgroundColor: deptColors[i % deptColors.length] }} />
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-slate-400">
                  <span><span className="w-2 h-2 rounded-full bg-blue-200 inline-block mr-1"></span>Enrolled: {cat.enrolled}</span>
                  <span><span className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: deptColors[i % deptColors.length] }}></span>Completed: {cat.completed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Presence */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Geographic Presence</h3>
              <p className="text-xs text-slate-400 mt-1">Staff distributed across {countryData.length} countries</p>
            </div>
            <Globe className="w-5 h-5 text-slate-300" />
          </div>
          <div className="space-y-3">
            {countryData.map((c, i) => (
              <HorizontalBar key={c.name} label={c.name} value={c.value} max={Math.max(...countryData.map(x => x.value))} color={deptColors[i % deptColors.length]} />
            ))}
          </div>
        </div>
      </div>

      {/* Compliance & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mandatory Training Compliance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Mandatory Training Compliance</h3>
              <p className="text-xs text-slate-400 mt-1">Organization-wide compliance rates</p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-300" />
          </div>
          <div className="space-y-4">
            {trainingPrograms.filter(p => p.isMandatory).map(prog => {
              const rate = prog.enrolledCount > 0 ? Math.round((prog.completedCount / prog.enrolledCount) * 100) : 0;
              return (
                <div key={prog.id} className="p-4 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{prog.title}</span>
                    <span className={`text-sm font-bold ${rate >= 80 ? 'text-emerald-600' : rate >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                      {rate}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ 
                      width: `${rate}%`,
                      backgroundColor: rate >= 80 ? '#16a34a' : rate >= 50 ? '#d97706' : '#dc2626'
                    }} />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-400">
                    <span>{prog.completedCount} of {prog.enrolledCount} completed</span>
                    <span>Valid: {prog.certificationValidityMonths}mo</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certification Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Certification Alerts</h3>
              <p className="text-xs text-slate-400 mt-1">Expiring and expired certifications</p>
            </div>
            <AlertTriangle className="w-5 h-5 text-slate-300" />
          </div>
          
          {expiringCerts.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-3">Expiring Soon (90 days)</h4>
              <div className="space-y-2">
                {expiringCerts.map(cert => {
                  const person = staff.find(s => s.id === cert.staffId);
                  return (
                    <div key={cert.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700">{cert.name}</p>
                        <p className="text-xs text-slate-400">
                          {person ? `${person.firstName} ${person.lastName}` : 'Unknown'} · Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {expiredCerts.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-red-600 uppercase tracking-wider mb-3">Expired</h4>
              <div className="space-y-2">
                {expiredCerts.map(cert => {
                  const person = staff.find(s => s.id === cert.staffId);
                  return (
                    <div key={cert.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 line-through">{cert.name}</p>
                        <p className="text-xs text-slate-400">
                          {person ? `${person.firstName} ${person.lastName}` : 'Unknown'} · Expired: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {expiringCerts.length === 0 && expiredCerts.length === 0 && (
            <div className="text-center py-8">
              <Award className="w-10 h-10 text-emerald-300 mx-auto" />
              <p className="mt-3 text-sm text-emerald-600 font-medium">All certifications are up to date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}