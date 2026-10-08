'use client';

import { useState, useMemo } from 'react';
import { 
  Search, Filter, Plus, Download, MoreHorizontal, Users,
  MapPin, Mail, Phone, Calendar, Building2, ChevronRight,
  UserCheck, UserX, Clock, Briefcase
} from 'lucide-react';
import { staff, getDepartmentName, departments, type StaffStatus } from '@/lib/mockData';
import Link from 'next/link';

const statusOptions = [
  { value: 'all', label: 'All Status', icon: null },
  { value: 'active', label: 'Active', icon: UserCheck },
  { value: 'on_leave', label: 'On Leave', icon: Clock },
  { value: 'inactive', label: 'Inactive', icon: UserX },
  { value: 'contractor', label: 'Contractor', icon: Briefcase },
];

export default function StaffDirectory() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  const filtered = useMemo(() => {
    return staff.filter(s => {
      const matchesSearch = search === '' || 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.position.toLowerCase().includes(search.toLowerCase()) ||
        s.employeeId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchesDept = deptFilter === 'all' || s.departmentId === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [search, statusFilter, deptFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: staff.length };
    staff.forEach(s => {
      counts[s.status] = (counts[s.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Directory</h1>
          <p className="text-sm text-slate-500 mt-1">Manage personnel across all field offices and departments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, position, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {statusOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                statusFilter === opt.value
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-500 hover:bg-slate-50 border border-transparent'
              }`}
            >
              {opt.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                statusFilter === opt.value ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {statusCounts[opt.value] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(person => (
          <Link 
            key={person.id} 
            href={`/staff/${person.id}`}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {person.firstName[0]}{person.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {person.firstName} {person.lastName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium flex-shrink-0 ml-2 status-${person.status}`}>
                    {person.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{person.position}</p>
                <p className="text-xs text-slate-400 mt-0.5">{getDepartmentName(person.departmentId)}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{person.location}, {person.country}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Since {new Date(person.hireDate).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3 h-3 text-slate-400" />
                <span className="truncate">{person.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>{person.employeeId}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="mt-4 text-lg font-semibold text-slate-700">No staff found</h3>
          <p className="mt-2 text-sm text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <p>Showing {filtered.length} of {staff.length} staff members</p>
      </div>
    </div>
  );
}