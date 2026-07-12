import PageHeader from '../components/PageHeader';

const DashboardPage = () => {
  const stats = [
    { label: 'Enrolled Courses', value: '3', icon: '📚' },
    { label: 'Learning Hours', value: '24', icon: '⏱️' },
    { label: 'Completion Rate', value: '68%', icon: '✓' },
    { label: 'Certificates', value: '1', icon: '🎓' },
  ];

  const recentActivity = [
    { course: 'Computer Networks', action: 'Completed Module 5', date: '2 hours ago' },
    { course: 'Cybersecurity Fundamentals', action: 'Started new lesson', date: '1 day ago' },
    { course: 'Operating Systems', action: 'Quiz score: 92%', date: '3 days ago' },
    { course: 'Hardware & Motherboards', action: 'Completed lab exercise', date: '1 week ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <PageHeader
        title="Dashboard"
        icon="📊"
        description="Overview of your learning journey, performance stats, and recent activity."
      />
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
            <div className="text-3xl font-bold text-cyan-400 mt-2">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-slate-200 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start justify-between pb-4 border-b border-slate-700 last:border-b-0">
              <div>
                <div className="font-semibold text-slate-300">{activity.course}</div>
                <div className="text-slate-400 text-sm mt-1">{activity.action}</div>
              </div>
              <div className="text-slate-500 text-sm whitespace-nowrap ml-4">{activity.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
