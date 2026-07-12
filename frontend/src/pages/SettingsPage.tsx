import { useState } from 'react';

interface Preferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  courseReminders: boolean;
  theme: string;
  language: string;
}

const SettingsPage = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    emailNotifications: true,
    pushNotifications: false,
    courseReminders: true,
    theme: 'dark',
    language: 'en',
  });

  const handleToggle = (key: keyof Preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* User Profile Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-200 mb-6">Account Settings</h2>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-2xl">
              👨‍🎓
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-200">Hasan Al-Yasiri</h3>
              <p className="text-slate-400">hasan@example.com</p>
              <p className="text-slate-500 text-sm mt-1">Student • Joined June 2026</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded transition">
            Edit Profile
          </button>
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-slate-200 mb-4">Preferences</h3>

        <div className="bg-slate-800 border border-slate-700 rounded-lg divide-y divide-slate-700">
          {/* Email Notifications */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <label className="text-slate-200 font-semibold">Email Notifications</label>
              <p className="text-slate-400 text-sm">Receive updates about your courses and assignments</p>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative w-12 h-6 rounded-full transition ${
                preferences.emailNotifications ? 'bg-green-600' : 'bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                  preferences.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Push Notifications */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <label className="text-slate-200 font-semibold">Push Notifications</label>
              <p className="text-slate-400 text-sm">Real-time notifications on your device</p>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`relative w-12 h-6 rounded-full transition ${
                preferences.pushNotifications ? 'bg-green-600' : 'bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                  preferences.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Course Reminders */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <label className="text-slate-200 font-semibold">Course Reminders</label>
              <p className="text-slate-400 text-sm">Reminders for upcoming lessons and deadlines</p>
            </div>
            <button
              onClick={() => handleToggle('courseReminders')}
              className={`relative w-12 h-6 rounded-full transition ${
                preferences.courseReminders ? 'bg-green-600' : 'bg-slate-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                  preferences.courseReminders ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </section>

      {/* Display Settings */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-slate-200 mb-4">Display</h3>

        <div className="bg-slate-800 border border-slate-700 rounded-lg divide-y divide-slate-700">
          {/* Theme */}
          <div className="p-6">
            <label className="text-slate-200 font-semibold mb-3 block">Theme</label>
            <select
              value={preferences.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          {/* Language */}
          <div className="p-6">
            <label className="text-slate-200 font-semibold mb-3 block">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h3 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h3>

        <div className="bg-slate-800 border border-red-600/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-slate-200 font-semibold">Delete Account</label>
              <p className="text-slate-400 text-sm mt-1">Permanently delete your account and all associated data</p>
            </div>
            <button className="px-4 py-2 bg-red-600/20 border border-red-600 text-red-400 hover:bg-red-600/30 rounded transition font-semibold">
              Delete
            </button>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition font-semibold">
          Save Changes
        </button>
        <button className="px-6 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded transition font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
