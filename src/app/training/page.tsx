'use client';

import { useState, useMemo } from 'react';
import { 
  Search, Plus, Filter, GraduationCap, Clock, Users, 
  Award, MapPin, Calendar, ChevronRight, CheckCircle2,
  AlertTriangle, BookOpen
} from 'lucide-react';
import { trainingPrograms, type TrainingStatus } from '@/lib/mockData';
import Link from 'next/link';

const categories = ['All', 'Security', 'Compliance', 'Technical', 'Finance', 'M&E', 'Operations'];
const statusTabs = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'draft', label: 'Draft' },
];

export default function TrainingPrograms() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    return trainingPrograms.filter(p => {
      const matchesSearch = search === '' || 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      const matchesStatus = status === 'all' || p.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    completed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    draft: { bg: 'bg-slate-50', text: 'text-slate-500', dot: 'bg-slate-400' },
    archived: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Training Programs</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage training programs, enrollments, and certifications</p>
        </div>
        <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors self-start sm:self-auto">
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          New Program
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search training programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {statusTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
                status === tab.value
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filtered.map(program => {
          const completionRate = program.enrolledCount > 0 
            ? Math.round((program.completedCount / program.enrolledCount) * 100) 
            : 0;
          const colors = statusColors[program.status] || statusColors.draft;
          
          return (
            <Link
              key={program.id}
              href={`/training/${program.id}`}
              className="bg-white rounded-xl border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all group overflow-hidden"
            >
              {/* Status Bar */}
              <div className={`h-1 ${program.status === 'active' ? 'bg-emerald-500' : program.status === 'completed' ? 'bg-blue-500' : 'bg-slate-300'}`} />
              
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${colors.bg} ${colors.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </span>
                      {program.isMandatory && (
                        <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-red-50 text-red-700">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {program.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-3 sm:mb-4">{program.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500 mb-3 sm:mb-4">
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                    {program.category}
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                    {program.durationHours}h
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                    {program.location}
                  </span>
                  <span className="flex items-center gap-1 sm:gap-1.5 hidden sm:flex">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(program.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(program.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <span className="text-xs sm:text-sm text-slate-600">
                        {program.completedCount} / {program.enrolledCount} enrolled
                      </span>
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${completionRate >= 80 ? 'text-emerald-600' : completionRate >= 50 ? 'text-amber-600' : 'text-slate-400'}`}>
                      {completionRate}%
                    </span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${completionRate}%`,
                        backgroundColor: completionRate >= 80 ? '#16a34a' : completionRate >= 50 ? '#d97706' : '#94a3b8'
                      }}
                    />
                  </div>
                </div>

                {/* Instructor & Cert */}
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                  <span className="text-[10px] sm:text-xs text-slate-400 truncate pr-2">
                    Instructor: <span className="text-slate-600">{program.instructor}</span>
                  </span>
                  {program.certificationName && (
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-purple-600 flex-shrink-0">
                      <Award className="w-3 h-3" />
                      <span className="hidden sm:inline">{program.certificationName}</span>
                      <span className="sm:hidden">Cert</span>
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center">
          <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 mx-auto" />
          <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-slate-700">No programs found</h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}