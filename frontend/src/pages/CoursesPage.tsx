import { useState } from 'react';
import PageHeader from '../components/PageHeader';

const CoursesPage = () => {
  const [filter, setFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Computer Networks',
      description: 'Learn networking fundamentals, protocols, and architecture',
      instructor: 'Dr. Ahmed Salem',
      level: 'Beginner',
      students: 234,
      rating: 4.8,
      image: '🌐',
    },
    {
      id: 2,
      title: 'Cybersecurity Fundamentals',
      description: 'Introduction to security concepts, threats, and defense strategies',
      instructor: 'Prof. Fatima Al-Rashid',
      level: 'Intermediate',
      students: 189,
      rating: 4.9,
      image: '🔒',
    },
    {
      id: 3,
      title: 'Operating Systems',
      description: 'Explore kernel, processes, memory management, and scheduling',
      instructor: 'Dr. Hassan Al-Mazrouei',
      level: 'Intermediate',
      students: 156,
      rating: 4.7,
      image: '💻',
    },
    {
      id: 4,
      title: 'Hardware & Motherboards',
      description: 'Understanding hardware components, motherboards, and assembly',
      instructor: 'Eng. Mohammed Al-Mansoori',
      level: 'Beginner',
      students: 145,
      rating: 4.6,
      image: '🖥️',
    },
    {
      id: 5,
      title: 'Microprocessors Advanced',
      description: 'Deep dive into CPU architecture, instruction sets, and optimization',
      instructor: 'Prof. Layla Al-Noor',
      level: 'Advanced',
      students: 89,
      rating: 4.9,
      image: '⚙️',
    },
    {
      id: 6,
      title: 'Network Security',
      description: 'Firewalls, VPNs, intrusion detection, and penetration testing',
      instructor: 'Dr. Rashid Al-Kaabi',
      level: 'Advanced',
      students: 112,
      rating: 4.8,
      image: '🛡️',
    },
  ];

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const filteredCourses = filter === 'all' ? courses : courses.filter((c) => c.level === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title="Courses"
        icon="📚"
        description="Browse the catalog and filter courses to match your skill level and interests."
      />

      {/* Filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded transition ${
              filter === level
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 hover:text-slate-300 hover:bg-slate-700'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-500/50 transition"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 p-6 text-4xl text-center">{course.image}</div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-200 mb-2">{course.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{course.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Instructor:</span>
                  <span className="text-slate-300">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Level:</span>
                  <span className="text-cyan-400">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rating:</span>
                  <span className="text-yellow-400">⭐ {course.rating}</span>
                </div>
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 rounded transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
