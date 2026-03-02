import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle, LogIn } from 'lucide-react';
import { supabase } from '../supabaseClient';
import type { Page } from '../App';

interface EventsSectionProps {
  onNavigate: (page: Page) => void;
  fullPage?: boolean;
  isLoggedIn?: boolean;
  userId?: string;
  userType?: 'student' | 'staff';
  onLoginClick?: () => void;
}

interface Event {
  id: number;
  title: string;
  category: string;
  department_id: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  image_url: string | null;
  expected_attendees: number;
  is_published: boolean;
}

const DEPT_IMAGES: Record<string, string> = {
  all:           'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  computing:     'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
  mechanical:    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
  biotechnology: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
  civil:         'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
  electrical:    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
};

const DEPT_LABELS: Record<string, string> = {
  all:           'All Departments',
  computing:     'Computing & Software Engineering',
  mechanical:    'Mechanical & Automotive Engineering',
  biotechnology: 'Biotechnology & Agricultural Science',
  civil:         'Civil Engineering & Construction',
  electrical:    'Electrical & Electronics Engineering',
};

export function EventsSection({
  onNavigate,
  fullPage = false,
  isLoggedIn = false,
  userId = '',
  userType = 'student',
  onLoginClick,
}: EventsSectionProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [joinedEvents, setJoinedEvents] = useState<Set<number>>(new Set());
  const [joiningId, setJoiningId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('event_date', { ascending: true });
      if (!error && data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Load which events the current student has already joined
  useEffect(() => {
    if (!isLoggedIn || !userId || userId === 'guest' || userType !== 'student') return;
    const fetchParticipations = async () => {
      const { data } = await supabase
        .from('event_participants')
        .select('event_id')
        .eq('student_id', userId);
      if (data) setJoinedEvents(new Set(data.map((r: any) => r.event_id)));
    };
    fetchParticipations();
  }, [isLoggedIn, userId, userType]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleJoin = async (event: Event) => {
    if (!isLoggedIn || userId === 'guest') {
      onLoginClick?.();
      return;
    }
    if (userType !== 'student') return;

    setJoiningId(event.id);
    try {
      if (joinedEvents.has(event.id)) {
        // Leave event
        await supabase
          .from('event_participants')
          .delete()
          .eq('event_id', event.id)
          .eq('student_id', userId);
        setJoinedEvents(prev => { const s = new Set(prev); s.delete(event.id); return s; });
        showToast('You have withdrawn from this event.');
      } else {
        // Join event
        const { error } = await supabase.from('event_participants').insert([{
          event_id: event.id,
          student_id: userId,
          joined_at: new Date().toISOString(),
        }]);
        if (error) {
          // Fallback: store in localStorage if table doesn't exist yet
          const key = `joined_events_${userId}`;
          const stored = JSON.parse(localStorage.getItem(key) || '[]');
          if (!stored.includes(event.id)) {
            stored.push(event.id);
            localStorage.setItem(key, JSON.stringify(stored));
          }
        }
        setJoinedEvents(prev => new Set([...prev, event.id]));
        showToast(`You have joined "${event.title}"! ✅`);
      }
    } catch {
      showToast('Something went wrong. Please try again.');
    }
    setJoiningId(null);
  };

  // Load from localStorage as fallback
  useEffect(() => {
    if (!isLoggedIn || !userId || userId === 'guest' || userType !== 'student') return;
    const key = `joined_events_${userId}`;
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    if (stored.length > 0) setJoinedEvents(prev => new Set([...prev, ...stored]));
  }, [isLoggedIn, userId, userType]);

  const displayEvents = fullPage ? events : events.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e3a8a] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
          {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <h2>Events & Activities</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('calendar')}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Calendar View</span>
            <span className="sm:hidden">Calendar</span>
          </button>
          {!fullPage && (
            <button
              onClick={() => onNavigate('events')}
              className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg hover:bg-[#1e40af] transition-colors flex items-center gap-2"
            >
              <span className="hidden sm:inline">View All Events</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Login prompt for guests */}
      {!isLoggedIn && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
          <LogIn className="w-5 h-5 text-[#1e3a8a] flex-shrink-0" />
          <p className="text-sm text-[#1e3a8a]">
            <button onClick={onLoginClick} className="font-semibold underline hover:no-underline">Log in as a student</button> to register for events.
          </p>
        </div>
      )}

      {loading && <div className="text-center py-16 text-gray-500">Loading events...</div>}
      {!loading && events.length === 0 && <div className="text-center py-16 text-gray-500">No events found.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayEvents.map((event) => {
          const joined = joinedEvents.has(event.id);
          const isJoining = joiningId === event.id;
          return (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image_url || DEPT_IMAGES[event.department_id] || DEPT_IMAGES.all}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-xs">
                  {event.category}
                </div>
                {joined && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Joined
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="mb-2 line-clamp-2">{event.title}</h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{new Date(event.event_date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}</span>
                    {event.start_time && (
                      <span className="text-gray-400">· {event.start_time.slice(0, 5)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{event.expected_attendees} participants expected</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2 mb-4 flex-1">{event.description}</p>

                <div className="flex items-center justify-between flex-wrap gap-2 mt-auto">
                  <span className="text-xs text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-full truncate max-w-[160px]">
                    {DEPT_LABELS[event.department_id] || event.department_id}
                  </span>

                  {/* Join / Leave button — only for students */}
                  {userType === 'student' && isLoggedIn && userId !== 'guest' ? (
                    <button
                      onClick={() => handleJoin(event)}
                      disabled={isJoining}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        joined
                          ? 'bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600'
                          : 'bg-[#1e3a8a] text-white hover:bg-[#1e40af]'
                      } disabled:opacity-60`}
                    >
                      {isJoining ? '...' : joined ? (
                        <><CheckCircle className="w-3.5 h-3.5" /> Joined</>
                      ) : 'Join Event'}
                    </button>
                  ) : !isLoggedIn ? (
                    <button
                      onClick={onLoginClick}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <LogIn className="w-3.5 h-3.5" /> Login to Join
                    </button>
                  ) : (
                    <span className="text-[#1e3a8a] hover:text-[#1e40af] text-sm cursor-pointer">Learn More →</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}