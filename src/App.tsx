import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { DepartmentCards } from "./components/DepartmentCards";
import { EventsSection } from "./components/EventsSection";
import { MediaGallery } from "./components/MediaGallery";
import { FeedbackSection } from "./components/FeedbackSection";
import { Footer } from "./components/Footer";
import { DepartmentPage } from "./components/DepartmentPage";
import { EventCalendar } from "./components/EventCalendar";
import { LoginModal } from "./components/LoginModal";
import { UserProfile } from "./components/UserProfile";
import { ProgrammesPage } from "./components/ProgrammesPage";
import { StaffDashboard } from "./components/StaffDashboard";
import { supabase } from "./supabaseClient";

export type Department =
  | "civil"
  | "electrical"
  | "mechanical"
  | "computing"
  | "biotechnology";

export type Page =
  | "home"
  | "about"
  | "departments"
  | "programmes"
  | "announcements"
  | "events"
  | "calendar"
  | "feedback"
  | "contact"
  | "gallery"
  | "profile"
  | "staff-dashboard";

interface Announcement {
  id: number;
  title: string;
  content: string;
  body: string;
  published_at: string;
  is_published: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'student' | 'staff'>('student');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setAnnouncementsLoading(true);
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    if (!error && data) setAnnouncements(data);
    setAnnouncementsLoading(false);
  };

  // Fetch announcements when page changes to announcements
  useEffect(() => {
    if (currentPage === 'announcements') {
      fetchAnnouncements();
    }
  }, [currentPage]);

  const handleDepartmentClick = (dept: Department) => {
    setSelectedDepartment(dept);
    setCurrentPage("departments");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedDepartment(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (type: 'student' | 'staff', id: string, name: string = id) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserId(id);
    setUserName(name);
    setShowLoginModal(false);
    if (type === 'staff') {
      setCurrentPage('staff-dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('student');
    setUserId('');
    setUserName('');
    setCurrentPage('home');
  };

  const handleProfileClick = () => {
    if (userType === 'staff') {
      setCurrentPage('staff-dashboard');
    } else {
      setCurrentPage('profile');
    }
  };

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLoginModal(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (currentPage === 'staff-dashboard' && isLoggedIn && userType === 'staff') {
    return (
      <StaffDashboard
        staffId={userId}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        userType={userType}
        userName={userName}
        onProfileClick={handleProfileClick}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      {currentPage === "home" && (
        <>
          <Hero onNavigate={handleNavigate} />
          <DepartmentCards onDepartmentClick={handleDepartmentClick} />
          <EventsSection onNavigate={handleNavigate} isLoggedIn={isLoggedIn} userId={userId} userType={userType} onLoginClick={() => setShowLoginModal(true)} />
          <MediaGallery fullPage={false} />
        </>
      )}

      {currentPage === "departments" && !selectedDepartment && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="mb-4">Our Departments</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Faculty of Engineering, Science & Technology comprises five dynamic departments,
              each committed to excellence in education and research.
            </p>
          </div>
          <DepartmentCards onDepartmentClick={handleDepartmentClick} />
        </div>
      )}

      {currentPage === "departments" && selectedDepartment && (
        <DepartmentPage
          department={selectedDepartment}
          onBack={() => handleNavigate("departments")}
        />
      )}

      {currentPage === "events" && <EventsSection onNavigate={handleNavigate} fullPage isLoggedIn={isLoggedIn} userId={userId} userType={userType} onLoginClick={() => setShowLoginModal(true)} />}
      {currentPage === "calendar" && <EventCalendar />}
      {currentPage === "gallery" && <MediaGallery fullPage />}
      {currentPage === "feedback" && <FeedbackSection isLoggedIn={isLoggedIn} userId={userId} userName={userName} userType={userType} />}

      {currentPage === "about" && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="mb-8">About FEST</h1>
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="mb-6">Overview of Faculty</h2>
              <div className="mb-6">
                <h3 className="mb-4">Faculty Introduction</h3>
                <p className="italic text-lg text-blue-600 mb-4">Be the Engineer, Scientist and Technologist of tomorrow</p>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>The Faculty of Engineering, Science & Technology (FEST) was among the first faculties established in KLUST. The strong industry linkages and the rich history of the university enabled us to groom future engineers, scientists, and technologist to be successful technopreneurs.</p>
                <p>The optional courses are carefully chosen to complement the core curriculum and are designed to develop communication skills, stimulate creativity and originality which will help students to embrace global perspectives and cultural diversity.</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
              <h2 className="mb-4">Vision</h2>
              <p className="text-lg">To establish the Faculty of Engineering, Science & Technology (FEST) as a premier infrastructure engineering, science and technology faculty of outstanding academic, and research excellence.</p>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-md p-8">
              <h2 className="mb-4">Mission</h2>
              <p className="text-lg">Deliver the highest quality of engineering, science and technology education that promotes excellence and innovation, ethical practices, responsibility towards society, and encourages entrepreneurship spirit.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="mb-6">Message from Dean</h2>
              <div className="space-y-4 text-gray-700">
                <p>I would like to take this opportunity to welcome all new students as well as returning students to the Faculty of Engineering, Science and Technology (FEST) at Infrastructure University Kuala Lumpur (IUKL).</p>
                <p>The Faculty of Engineering, Science and Technology is committed to excellence and continuously striving for improvement that makes it one of the more reputable national higher education provider in Malaysia.</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-semibold">Sincerely,</p>
                  <p className="font-semibold text-blue-600 mt-2">TS. DR. NG KHAI MUN, CEng</p>
                  <p className="text-sm text-gray-600">DEAN, Faculty of Engineering, Science & Technology (FEST)</p>
                  <p className="text-sm text-gray-600">Infrastructure University Kuala Lumpur (IUKL)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === "programmes" && <ProgrammesPage />}

      {/* ── ANNOUNCEMENTS (live from Supabase) ── */}
      {currentPage === "announcements" && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="mb-2">Announcements</h1>
          <p className="text-gray-500 mb-8">Latest news and updates from FEST</p>

          {announcementsLoading && (
            <div className="text-center py-16 text-gray-400">Loading announcements...</div>
          )}

          {!announcementsLoading && announcements.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">No announcements yet.</p>
            </div>
          )}

          <div className="space-y-4">
            {announcements.map((a) => (
              <div key={a.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{a.title}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {new Date(a.published_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{a.content || a.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentPage === "contact" && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="mb-8">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4">Faculty of Engineering, Science and Technology</h3>
                <div className="space-y-3">
                  <p><strong>Address:</strong><br />Kuala Lumpur University of Science and Technology<br />Kuala Lumpur, Malaysia</p>
                  <p><strong>Email:</strong><br />fest@klust.edu.my</p>
                  <p><strong>Phone:</strong><br />+60 3-XXXX-XXXX</p>
                </div>
              </div>
              <div>
                <h3 className="mb-4">Office Hours</h3>
                <p className="mb-4">Monday - Friday: 8:00 AM - 5:00 PM<br />Saturday: 8:00 AM - 1:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === "profile" && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="mb-8">User Profile</h1>
          <UserProfile userType={userType} userId={userId} userName={userName} onLogout={handleLogout} />
        </div>
      )}

      <Footer onNavigate={handleNavigate} />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}