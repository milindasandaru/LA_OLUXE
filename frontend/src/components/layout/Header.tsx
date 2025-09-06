'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';
import authService, { User } from '@/services/auth';

interface HeaderProps {
  showSidebar?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({ showSidebar = false, onToggleSidebar }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  interface NotificationMessage {
    id: number;
    title: string;
    body: string;
    read: boolean;
    timestamp: string; // ISO
    replies: { id: number; text: string; sender: 'me' | 'system'; at: string }[];
  }

  const [notifications, setNotifications] = useState<NotificationMessage[]>([
    {
      id: 1,
      title: 'Welcome to ADORA',
      body: 'Thanks for joining! Your account was created successfully.',
      read: false,
      timestamp: new Date().toISOString(),
      replies: []
    },
    {
      id: 2,
      title: 'Profile Reminder',
      body: 'Complete your profile to improve trust and visibility.',
      read: false,
      timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
      replies: []
    }
  ]);
  const [activeNotification, setActiveNotification] = useState<NotificationMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const notifRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    checkAuthStatus();
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotificationsDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const openNotification = (id: number) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      const found = updated.find(n => n.id === id) || null;
      setActiveNotification(found);
      return updated;
    });
    setShowNotificationsDropdown(false);
    setShowMessageModal(true);
    setReplyText('');
  };

  const sendReply = () => {
    if (!activeNotification || !replyText.trim()) return;
    setNotifications(prev => prev.map(n => n.id === activeNotification.id ? {
      ...n,
      replies: [...n.replies, { id: Date.now(), text: replyText.trim(), sender: 'me', at: new Date().toISOString() }]
    } : n));
    setReplyText('');
  };

  const closeModal = () => {
    setShowMessageModal(false);
    setActiveNotification(null);
  };

  const checkAuthStatus = async () => {
    try {
      if (authService.isAuthenticated()) {
        const result = await authService.getProfile();
        if (result.success && result.data?.user) {
          setUser(result.data.user);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setShowUserDropdown(false);
      // Optionally redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderAuthSection = () => {
    if (isLoading) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className="hidden md:flex items-center space-x-4">
          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <span>{user.firstName}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/my-ads"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserDropdown(false)}
                >
                  My Ads
                </Link>
                <Link
                  href="/favorites"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserDropdown(false)}
                >
                  Saved Ads
                </Link>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center space-x-4">
        {/* Register */}
        <Link
          href="/register"
          className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          Register
        </Link>

        {/* Login */}
        <Link
          href="/login"
          className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          Login
        </Link>
      </div>
    );
  };

  const renderMobileAuthSection = () => {
    if (user) {
      return (
        <>
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <Link
            href="/profile"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Profile
          </Link>
          <Link
            href="/my-ads"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Ads
          </Link>
          <Link
            href="/favorites"
            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Saved Ads
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Sign out
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/register"
          className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Register
        </Link>
        <Link
          href="/login"
          className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
      </>
    );
  };

  const modalPortal = (showMessageModal && activeNotification && mounted)
    ? createPortal(
      <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/40 p-4">
        <div className="bg-white w-full max-w-lg rounded-lg shadow-xl border border-gray-200 flex flex-col max-h-[85vh] animate-fadeIn">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">{activeNotification.title}</h2>
            <button
              onClick={closeModal}
              className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="px-5 py-4 overflow-y-auto flex-1 space-y-4">
            <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700 leading-relaxed">
              {activeNotification.body}
            </div>
            {activeNotification.replies.length > 0 && (
              <div className="space-y-2">
                {activeNotification.replies.map(r => (
                  <div key={r.id} className={`flex ${r.sender === 'me' ? 'justify-end' : 'justify-start'}`}>                    
                    <div className={`px-3 py-2 rounded-md text-xs max-w-[75%] ${r.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>                    
                      <p>{r.text}</p>
                      <span className="block mt-1 text-[10px] opacity-70">{new Date(r.at).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-end space-x-2">
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                rows={2}
                placeholder="Type your reply..."
                className="flex-1 resize-none text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendReply}
                disabled={!replyText.trim()}
                className="h-10 px-4 rounded-md bg-blue-600 disabled:bg-blue-300 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >Send</button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    ) : null;

  return (
    <>
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-500">ADORA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {renderAuthSection()}

            {/* Notification Bell (only when logged in) */}
            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotificationsDropdown(p => !p)}
                  className="relative text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-full hover:bg-gray-100"
                  title="Notifications"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 inline-flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-semibold rounded-full bg-red-500 text-white">{unreadCount}</span>
                  )}
                </button>
                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                          className="text-xs text-blue-600 hover:underline"
                        >Mark all read</button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map(note => (
                        <button
                          key={note.id}
                          onClick={() => openNotification(note.id)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none transition-colors ${note.read ? 'bg-white' : 'bg-blue-50'}`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${note.read ? 'text-gray-800' : 'text-blue-700'}`}>{note.title}</p>
                              <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{note.body}</p>
                            </div>
                            {!note.read && <span className="ml-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></span>}
                          </div>
                          <p className="mt-1 text-[10px] text-gray-400">{new Date(note.timestamp).toLocaleTimeString()}</p>
                        </button>
                      ))}
                      {notifications.length === 0 && (
                        <div className="px-4 py-8 text-center text-sm text-gray-500">No notifications</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button + notifications (if logged in) */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotificationsDropdown(p => !p)}
                  className="relative text-gray-700 hover:text-gray-900 transition-colors p-3 rounded-full hover:bg-gray-100"
                  title="Notifications"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 inline-flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-semibold rounded-full bg-red-500 text-white">{unreadCount}</span>
                  )}
                </button>
                {showNotificationsDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                          className="text-xs text-blue-600 hover:underline"
                        >Mark all read</button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map(note => (
                        <button
                          key={note.id}
                          onClick={() => openNotification(note.id)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none transition-colors ${note.read ? 'bg-white' : 'bg-blue-50'}`}
                        >
                          <p className={`text-sm font-medium ${note.read ? 'text-gray-800' : 'text-blue-700'}`}>{note.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{note.body}</p>
                        </button>
                      ))}
                      {notifications.length === 0 && (
                        <div className="px-4 py-8 text-center text-sm text-gray-500">No notifications</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 text-gray-700 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {renderMobileAuthSection()}
              <div className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                Theme
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {showUserDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserDropdown(false)}
        ></div>
      )}

  </header>
  {modalPortal}
  </>
  );
}
