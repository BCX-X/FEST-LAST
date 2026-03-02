import { Search, Menu, User, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from 'figma:asset/4653ff6cf8a4f8a9fbd27432e29687229ded73fd.png';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isLoggedIn?: boolean;
  userType?: 'student' | 'staff';
  userName?: string;
  onProfileClick?: () => void;
  onLoginClick?: () => void;
  onLogout?: () => void;
}

export function Header({ currentPage, onNavigate, isLoggedIn, userType, userName, onProfileClick, onLoginClick, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    const storedCount = localStorage.getItem('visitorCount');

    if (lastVisit === today) {
      setVisitorCount(parseInt(storedCount || '1', 10));
    } else {
      const newCount = Math.floor(Math.random() * 100) + 50;
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisit', today);
      setVisitorCount(newCount);
    }

    const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');
    if (!hasVisitedThisSession) {
      const currentCount = parseInt(localStorage.getItem('visitorCount') || '1', 10);
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      sessionStorage.setItem('hasVisitedThisSession', 'true');
      setVisitorCount(newCount);
    }
  }, []);

  // Contact removed to keep nav from crowding
  const navItems: { label: string; page: Page }[] = [
    { label: 'Home',          page: 'home' },
    { label: 'Announcements', page: 'announcements' },
    { label: 'Departments',   page: 'departments' },
    { label: 'Programmes',    page: 'programmes' },
    { label: 'Events',        page: 'events' },
    { label: 'Feedback',      page: 'feedback' },
     { label: 'About FEST',    page: 'about' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-20 gap-6">

          {/* Logo */}
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
            <img src={logo} alt="KLUST Logo" className="h-12 w-auto" />
          </div>

          {/* Desktop Nav — grows to fill space */}
          <nav className="hidden lg:flex items-center gap-4 flex-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm whitespace-nowrap hover:text-[#1e3a8a] transition-colors ${
                  currentPage === item.page ? 'text-[#1e3a8a] font-semibold' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth + Search — pinned to the right */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0 ml-auto">
            <button className="text-gray-700 hover:text-[#1e3a8a]">
              <Search className="w-5 h-5" />
            </button>

            {isLoggedIn ? (
              <>
                {onProfileClick && (
                  <button
                    onClick={onProfileClick}
                    className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#1e3a8a] transition-colors bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 whitespace-nowrap"
                  >
                    <User className="w-4 h-4" />
                    {userName || (userType === 'staff' ? 'Dashboard' : 'Profile')}
                  </button>
                )}
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 transition-colors bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 whitespace-nowrap"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1.5 text-sm text-white bg-[#1e3a8a] px-4 py-2 rounded-lg hover:bg-[#1e40af] transition-colors whitespace-nowrap"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-2 ml-auto">
            {!isLoggedIn && (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1 text-xs text-white bg-[#1e3a8a] px-3 py-1.5 rounded-lg"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
            )}
            {isLoggedIn && onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            )}
            <button className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Visitor Counter - Desktop */}
        <div className="hidden lg:block text-right pb-2">
          <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Visitor Today: {visitorCount.toLocaleString()}
          </span>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-1 border-t border-gray-100 pt-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg ${
                  currentPage === item.page ? 'text-[#1e3a8a] bg-gray-50 font-semibold' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isLoggedIn && onProfileClick && (
              <button
                onClick={() => { onProfileClick(); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-[#1e3a8a] hover:bg-gray-100 rounded-lg"
              >
                {userType === 'staff' ? '⚙️ Staff Dashboard' : '👤 My Profile'}
              </button>
            )}
            <div className="px-4 py-2">
              <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Visitor Today: {visitorCount.toLocaleString()}
              </span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}