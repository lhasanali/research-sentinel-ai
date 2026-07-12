const MyLearningPage = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Computer Networks',
      instructor: 'Dr. Ahmed Salem',
      progress: 68,
      nextLesson: 'Module 6: Routing Protocols',
      lastAccessed: '2 hours ago',
    },
    {
      id: 2,
      title: 'Cybersecurity Fundamentals',
      instructor: 'Prof. Fatima Al-Rashid',
      progress: 45,
      nextLesson: 'Lesson 8: Encryption Basics',
      lastAccessed: '1 day ago',
    },
    {
      id: 3,
      title: 'Operating Systems',
      instructor: 'Dr. Hassan Al-Mazrouei',
      progress: 92,
      nextLesson: 'Final Quiz: OS Concepts',
      lastAccessed: '3 days ago',
    },
  ];

  const certificates = [
    {
      id: 1,
      title: 'Introduction to Python',
      issuedDate: 'June 15, 2026',
      status: 'Earned',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* My Courses */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-200 mb-6">My Enrolled Courses</h2>
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-200">{course.title}</h3>
                  <p className="text-slate-400 text-sm">{course.instructor}</p>
                </div>
                <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition font-semibold">
                  Continue Learning
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Progress</span>
                  <span className="text-cyan-400 font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500">Next Lesson:</span>
                  <p className="text-slate-300 mt-1">{course.nextLesson}</p>
                </div>
                <div>
                  <span className="text-slate-500">Last Accessed:</span>
                  <p className="text-slate-300 mt-1">{course.lastAccessed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-600/30 rounded-lg p-6">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-lg font-bold text-yellow-300 mb-2">{cert.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Issued:</span>
                  <span className="text-slate-300">{cert.issuedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-green-400">{cert.status}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 border border-yellow-600/50 text-yellow-300 hover:bg-yellow-600/10 rounded transition font-semibold">
                Download Certificate
              </button>
            </div>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-lg">
            <div className="text-4xl mb-2">📜</div>
            <p className="text-slate-400">No certificates earned yet. Complete a course to earn your first certificate!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyLearningPage;
