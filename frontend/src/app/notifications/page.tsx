'use client';

export default function NotificationsPage() {
  // Placeholder notifications list
  const notifications = [
    { id: 1, title: 'Welcome to ADORA', body: 'Thanks for joining! Your account was created successfully.', read: false },
    { id: 2, title: 'Profile Reminder', body: 'Complete your profile information to get better visibility.', read: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h1>
        <div className="space-y-4">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-70' : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'}`}>
              <h2 className="font-semibold text-gray-900 dark:text-white">{n.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{n.body}</p>
              {!n.read && <span className="mt-2 inline-block text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full">New</span>}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">No notifications yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
