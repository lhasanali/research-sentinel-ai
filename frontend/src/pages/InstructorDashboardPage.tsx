import { useState } from 'react';
import PageHeader from '../components/PageHeader';

interface Course {
  id: number;
  title: string;
  students: number;
  status: 'active' | 'draft' | 'archived';
  createdDate: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number;
  joinDate: string;
}

const InstructorDashboardPage = () => {
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'Computer Networks', students: 45, status: 'active', createdDate: 'Jan 15, 2026' },
    { id: 2, title: 'Cybersecurity Fundamentals', students: 38, status: 'active', createdDate: 'Feb 10, 2026' },
    { id: 3, title: 'Operating Systems', students: 32, status: 'active', createdDate: 'Mar 5, 2026' },
  ]);

  const students: Student[] = [
    { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', enrolledCourses: 2, joinDate: 'Jun 1, 2026' },
    { id: 2, name: 'Fatima Ali', email: 'fatima@example.com', enrolledCourses: 3, joinDate: 'Jun 5, 2026' },
    { id: 3, name: 'Mohammed Khan', email: 'mohammed@example.com', enrolledCourses: 1, joinDate: 'Jun 10, 2026' },
    { id: 4, name: 'Leila Rashid', email: 'leila@example.com', enrolledCourses: 2, joinDate: 'Jun 12, 2026' },
  ];

  const [newCourse, setNewCourse] = useState({ title: '', description: '', level: 'Beginner', capacity: 50 });

  const handleCreateCourse = () => {
    if (newCourse.title.trim()) {
      const course: Course = {
        id: courses.length + 1,
        title: newCourse.title,
        students: 0,
        status: 'draft',
        createdDate: new Date().toLocaleDateString(),
      };
      setCourses([...courses, course]);
      setNewCourse({ title: '', description: '', level: 'Beginner', capacity: 50 });
      setShowCreateCourse(false);
    }
  };

  const publishCourse = (id: number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: 'active' } : c));
  };

  const archiveCourse = (id: number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, status: 'archived' } : c));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title="Instructor Dashboard"
        icon="👨‍🏫"
        description="Manage your courses, students, and create new training programs."
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-slate-400 text-sm">Total Courses</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">{courses.length}</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-slate-400 text-sm">Total Students</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">{students.length}</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-slate-400 text-sm">Active Courses</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">{courses.filter(c => c.status === 'active').length}</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-slate-400 text-sm">Total Enrollments</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">{courses.reduce((sum, c) => sum + c.students, 0)}</div>
        </div>
      </div>

      {/* Course Management */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-200">My Courses</h2>
          <button
            onClick={() => setShowCreateCourse(!showCreateCourse)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition font-semibold"
          >
            {showCreateCourse ? 'Cancel' : '+ Create Course'}
          </button>
        </div>

        {/* Create Course Form */}
        {showCreateCourse && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Create New Course</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g., Advanced Python Programming"
                  className="w-full mt-2 bg-slate-700 border border-slate-600 text-slate-200 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Describe your course..."
                  className="w-full mt-2 bg-slate-700 border border-slate-600 text-slate-200 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">Level</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    className="w-full mt-2 bg-slate-700 border border-slate-600 text-slate-200 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Student Capacity</label>
                  <input
                    type="number"
                    value={newCourse.capacity}
                    onChange={(e) => setNewCourse({ ...newCourse, capacity: parseInt(e.target.value) })}
                    min="1"
                    max="1000"
                    className="w-full mt-2 bg-slate-700 border border-slate-600 text-slate-200 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <button
                onClick={handleCreateCourse}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded transition"
              >
                Create Course
              </button>
            </div>
          </div>
        )}

        {/* Courses List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-200">{course.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">Created {course.createdDate}</p>
                </div>
                <div className={`px-3 py-1 rounded text-sm font-semibold ${
                  course.status === 'active' ? 'bg-green-600/20 text-green-400' :
                  course.status === 'draft' ? 'bg-yellow-600/20 text-yellow-400' :
                  'bg-slate-600/20 text-slate-400'
                }`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{course.students} students enrolled</span>
                <div className="flex gap-2">
                  {course.status === 'draft' && (
                    <button
                      onClick={() => publishCourse(course.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded transition text-sm"
                    >
                      Publish
                    </button>
                  )}
                  {course.status !== 'archived' && (
                    <button
                      onClick={() => archiveCourse(course.id)}
                      className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition text-sm"
                    >
                      Archive
                    </button>
                  )}
                  <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition text-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Management */}
      <section>
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Students</h2>
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900">
                  <th className="px-6 py-3 text-left text-slate-400">Name</th>
                  <th className="px-6 py-3 text-left text-slate-400">Email</th>
                  <th className="px-6 py-3 text-left text-slate-400">Enrolled Courses</th>
                  <th className="px-6 py-3 text-left text-slate-400">Join Date</th>
                  <th className="px-6 py-3 text-left text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4 text-slate-200 font-semibold">{student.name}</td>
                    <td className="px-6 py-4 text-slate-400">{student.email}</td>
                    <td className="px-6 py-4 text-cyan-400">{student.enrolledCourses}</td>
                    <td className="px-6 py-4 text-slate-400">{student.joinDate}</td>
                    <td className="px-6 py-4">
                      <button className="text-cyan-400 hover:text-cyan-300 transition">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboardPage;
