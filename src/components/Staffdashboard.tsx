import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Calendar, Megaphone, Users, LogOut,
  Plus, Pencil, Trash2, X, Check, AlertCircle, Loader2,
  Menu, BarChart3, Image, FileText, Building2, UserCheck, MessageCircle, Star, Eye, ClipboardList,
} from 'lucide-react';
import { supabase } from '../supabaseClient';

interface StaffDashboardProps {
  staffId: string;
  onLogout: () => void;
}

type Tab = 'overview' | 'events' | 'announcements' | 'users' | 'media' | 'feedback' | 'departments' | 'participants' | 'applications';

interface Event {
  id: number;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  department_id: string;
  category: string;
  description: string;
  expected_attendees: number;
  is_published: boolean;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  body: string;
  published_at: string;
  is_published: boolean;
  department_id: string | null;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  user_type: string;
  department_id: string;
  is_active: boolean;
  position: string;
}

interface MediaItem {
  id: number;
  title: string;
  media_type: 'photo' | 'video';
  department_id: string | null;
  event_label: string | null;
  thumbnail_url: string;
  media_date: string | null;
  is_published: boolean;
}

interface FeedbackForm {
  id: number;
  title: string;
  description: string;
  file_type: string;
  file_url: string | null;
  is_active: boolean;
  sort_order: number;
}

interface Department {
  id: string;
  name: string;
  head_name: string;
  staff_count: number;
  student_count: number;
  description: string;
  color_hex: string;
}

const DEPT_IDS = [
  { id: 'civil',        name: 'Civil Engineering & Construction' },
  { id: 'electrical',   name: 'Electrical & Electronics Engineering' },
  { id: 'mechanical',   name: 'Mechanical & Automotive Engineering' },
  { id: 'computing',    name: 'Computing & Software Engineering' },
  { id: 'biotechnology',name: 'Biotechnology & Agricultural Science' },
];

const CATEGORIES = ['Conference', 'Workshop', 'Seminar', 'Competition', 'Field Trip', 'Other'];

export function StaffDashboard({ staffId, onLogout }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [feedbackForms, setFeedbackForms] = useState<FeedbackForm[]>([]);
  const [feedbackSubmissions, setFeedbackSubmissions] = useState<any[]>([]);
  const [feedbackView, setFeedbackView] = useState<'submissions' | 'forms'>('submissions');
  const [applications, setApplications] = useState<any[]>([]);
  const [appFilter, setAppFilter] = useState<string>('all');
  const [appSearch, setAppSearch] = useState<string>('');
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [feedbackFilter, setFeedbackFilter] = useState<string>('all');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [selectedEventFilter, setSelectedEventFilter] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // ── Form states ──
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '', event_date: '', start_time: '09:00', end_time: '17:00',
    location: '', department_id: 'computing', category: 'Workshop',
    description: '', expected_attendees: 50, is_published: true,
  });

  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '', content: '', is_published: true, department_id: '',
  });

  const [showMediaForm, setShowMediaForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [mediaForm, setMediaForm] = useState({
    title: '', media_type: 'photo' as 'photo' | 'video',
    department_id: '', event_label: '', thumbnail_url: '',
    media_date: '', is_published: true,
  });

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<FeedbackForm | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    title: '', description: '', file_type: 'PDF', file_url: '', is_active: true, sort_order: 0,
  });

  const [showDeptForm, setShowDeptForm] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deptForm, setDeptForm] = useState({
    head_name: '', staff_count: 0, student_count: 0, description: '', color_hex: '#1e3a8a',
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── FETCH ──
  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('event_date', { ascending: true });
    if (data) setEvents(data);
  };
  const fetchAnnouncements = async () => {
    const { data } = await supabase.from('announcements').select('*').order('published_at', { ascending: false });
    if (data) setAnnouncements(data);
  };
  const fetchUsers = async () => {
    const { data } = await supabase.from('users').select('id, full_name, email, user_type, department_id, is_active, position').order('user_type');
    if (data) setUsers(data);
  };
  const fetchMedia = async () => {
    const { data } = await supabase.from('media_gallery').select('*').order('created_at', { ascending: false });
    if (data) setMedia(data);
  };
  const fetchFeedback = async () => {
    const { data } = await supabase.from('feedback_forms').select('*').order('sort_order');
    if (data) setFeedbackForms(data);
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('programme_applications')
        .select('*')
        .order('applied_at', { ascending: false });
      if (!error && data && data.length >= 0) {
        const local: any[] = JSON.parse(localStorage.getItem('programme_applications') || '[]');
        const supaIds = new Set(data.map((d: any) => String(d.id)));
        const merged = [...data, ...local.filter((l: any) => !supaIds.has(String(l.id)))];
        setApplications(merged);
      } else {
        setApplications(JSON.parse(localStorage.getItem('programme_applications') || '[]'));
      }
    } catch {
      setApplications(JSON.parse(localStorage.getItem('programme_applications') || '[]'));
    }
  };

  const fetchFeedbackSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });
      if (!error && data && data.length >= 0) {
        // Merge with localStorage fallback
        const local: any[] = JSON.parse(localStorage.getItem('feedback_submissions') || '[]');
        const supaIds = new Set(data.map((d: any) => String(d.id)));
        const merged = [...data, ...local.filter((l: any) => !supaIds.has(String(l.id)))];
        setFeedbackSubmissions(merged);
      } else {
        setFeedbackSubmissions(JSON.parse(localStorage.getItem('feedback_submissions') || '[]'));
      }
    } catch {
      setFeedbackSubmissions(JSON.parse(localStorage.getItem('feedback_submissions') || '[]'));
    }
  };
  const fetchDepartments = async () => {
    const { data } = await supabase.from('departments').select('*');
    if (data) setDepartments(data);
  };

  const fetchParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('event_participants')
        .select('event_id, student_id, joined_at, events(title, event_date, location), users(full_name, email, department_id)')
        .order('joined_at', { ascending: false });
      if (!error && data && data.length >= 0) {
        // Also merge in any localStorage registrations (fallback)
        const localEntries = buildLocalParticipants();
        const supaIds = new Set(data.map((d: any) => `${d.event_id}-${d.student_id}`));
        const merged = [...data, ...localEntries.filter((e: any) => !supaIds.has(`${e.event_id}-${e.student_id}`))];
        setParticipants(merged);
      } else {
        // Table might not exist yet — use localStorage only
        setParticipants(buildLocalParticipants());
      }
    } catch {
      setParticipants(buildLocalParticipants());
    }
  };

  // Build participant list from localStorage (fallback when Supabase table doesn't exist)
  const buildLocalParticipants = (): any[] => {
    const entries: any[] = [];
    try {
      // Scan all localStorage keys for joined_events_<userId>
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('joined_events_')) {
          const studentId = key.replace('joined_events_', '');
          const eventIds: number[] = JSON.parse(localStorage.getItem(key) || '[]');
          eventIds.forEach(eventId => {
            entries.push({ event_id: eventId, student_id: studentId, joined_at: null, events: null, users: null });
          });
        }
      }
    } catch {}
    return entries;
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchEvents(), fetchAnnouncements(), fetchUsers(), fetchMedia(), fetchFeedback(), fetchFeedbackSubmissions(), fetchApplications(), fetchDepartments(), fetchParticipants()])
      .finally(() => setLoading(false));
  }, []);

  // ── EVENTS ──
  const saveEvent = async () => {
    if (!eventForm.title || !eventForm.event_date) return showToast('Title and date required', 'error');
    const payload = { ...eventForm, expected_attendees: Number(eventForm.expected_attendees) };
    const { error } = editingEvent
      ? await supabase.from('events').update(payload).eq('id', editingEvent.id)
      : await supabase.from('events').insert([payload]);
    if (error) return showToast(error.message, 'error');
    showToast(editingEvent ? 'Event updated!' : 'Event created!');
    setShowEventForm(false);
    fetchEvents();
  };
  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    showToast('Event deleted'); fetchEvents();
  };

  // ── ANNOUNCEMENTS ──
  const saveAnnouncement = async () => {
    if (!announcementForm.title || !announcementForm.content) return showToast('Title and content required', 'error');
    const payload = {
      title: announcementForm.title,
      content: announcementForm.content,
      body: announcementForm.content,
      is_published: announcementForm.is_published,
      department_id: announcementForm.department_id || null,
      published_at: new Date().toISOString(),
    };
    const { error } = editingAnnouncement
      ? await supabase.from('announcements').update(payload).eq('id', editingAnnouncement.id)
      : await supabase.from('announcements').insert([payload]);
    if (error) return showToast(error.message, 'error');
    showToast(editingAnnouncement ? 'Updated!' : 'Published!');
    setShowAnnouncementForm(false);
    fetchAnnouncements();
  };
  const deleteAnnouncement = async (id: number) => {
    if (!confirm('Delete?')) return;
    await supabase.from('announcements').delete().eq('id', id);
    showToast('Deleted'); fetchAnnouncements();
  };
  const togglePublished = async (a: Announcement) => {
    await supabase.from('announcements').update({ is_published: !a.is_published }).eq('id', a.id);
    showToast(`${!a.is_published ? 'Published' : 'Unpublished'}`); fetchAnnouncements();
  };

  // ── USERS ──
  const toggleUserActive = async (u: User) => {
    await supabase.from('users').update({ is_active: !u.is_active }).eq('id', u.id);
    showToast(`User ${!u.is_active ? 'activated' : 'deactivated'}`); fetchUsers();
  };
  const deleteUser = async (id: string) => {
    if (!confirm(`Delete user ${id}?`)) return;
    await supabase.from('users').delete().eq('id', id);
    showToast('User deleted'); fetchUsers();
  };

  // ── MEDIA ──
  const saveMedia = async () => {
    if (!mediaForm.title || !mediaForm.thumbnail_url) return showToast('Title and image URL required', 'error');
    const payload = { ...mediaForm, department_id: mediaForm.department_id || null };
    const { error } = editingMedia
      ? await supabase.from('media_gallery').update(payload).eq('id', editingMedia.id)
      : await supabase.from('media_gallery').insert([payload]);
    if (error) return showToast(error.message, 'error');
    showToast(editingMedia ? 'Updated!' : 'Added!');
    setShowMediaForm(false); fetchMedia();
  };
  const deleteMedia = async (id: number) => {
    if (!confirm('Delete?')) return;
    await supabase.from('media_gallery').delete().eq('id', id);
    showToast('Deleted'); fetchMedia();
  };
  const toggleMediaPublished = async (m: MediaItem) => {
    await supabase.from('media_gallery').update({ is_published: !m.is_published }).eq('id', m.id);
    fetchMedia();
  };

  // ── FEEDBACK FORMS ──
  const saveFeedback = async () => {
    if (!feedbackForm.title) return showToast('Title required', 'error');
    const payload = { ...feedbackForm, sort_order: Number(feedbackForm.sort_order) };
    const { error } = editingFeedback
      ? await supabase.from('feedback_forms').update(payload).eq('id', editingFeedback.id)
      : await supabase.from('feedback_forms').insert([payload]);
    if (error) return showToast(error.message, 'error');
    showToast(editingFeedback ? 'Updated!' : 'Created!');
    setShowFeedbackForm(false); fetchFeedback();
  };
  const deleteFeedback = async (id: number) => {
    if (!confirm('Delete?')) return;
    await supabase.from('feedback_forms').delete().eq('id', id);
    showToast('Deleted'); fetchFeedback();
  };

  // ── DEPARTMENTS ──
  const saveDept = async () => {
    if (!editingDept) return;
    const { error } = await supabase.from('departments').update(deptForm).eq('id', editingDept.id);
    if (error) return showToast(error.message, 'error');
    showToast('Department updated!');
    setShowDeptForm(false); fetchDepartments();
  };

  // ── STATS ──
  const stats = [
    { label: 'Events',        value: events.length,                         icon: Calendar,   color: 'bg-blue-500' },
    { label: 'Registrations', value: participants.length,                   icon: UserCheck,  color: 'bg-green-500' },
    { label: 'Announcements', value: announcements.length,                  icon: Megaphone,  color: 'bg-emerald-500' },
    { label: 'Users',         value: users.length,                          icon: Users,      color: 'bg-violet-500' },
    { label: 'Active Users',  value: users.filter(u => u.is_active).length, icon: BarChart3,  color: 'bg-amber-500' },
    { label: 'Media Items',   value: media.length,                          icon: Image,      color: 'bg-pink-500' },
    { label: 'Feedback',       value: feedbackSubmissions.length,             icon: MessageCircle, color: 'bg-rose-500' },
    { label: 'Applications',   value: applications.length,                    icon: ClipboardList, color: 'bg-indigo-500' },
  ];

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview',      label: 'Overview',      icon: LayoutDashboard },
    { id: 'events',        label: 'Events',         icon: Calendar },
    { id: 'announcements', label: 'Announcements',  icon: Megaphone },
    { id: 'users',         label: 'Users',          icon: Users },
    { id: 'media',         label: 'Media Gallery',  icon: Image },
    { id: 'feedback',      label: 'Feedback Forms', icon: FileText },
    { id: 'departments',   label: 'Departments',    icon: Building2 },
    { id: 'participants',  label: 'Participants',    icon: UserCheck },
    { id: 'applications',  label: 'Applications',    icon: ClipboardList },
  ];

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white";
  const labelCls = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1";

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── SIDEBAR ── */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-[#1e3a8a] text-white flex flex-col transition-all duration-300 flex-shrink-0 min-h-screen`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors">
            <Menu className="w-4 h-4" />
          </button>
          {sidebarOpen && <span className="font-bold text-sm">FEST Staff Panel</span>}
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === item.id ? 'bg-white/20 font-semibold' : 'hover:bg-white/10 text-white/80'
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          {sidebarOpen && <div className="text-xs text-white/60 px-2 pb-2 truncate">{staffId}</div>}
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-all">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-auto p-6 md:p-8">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
            <p className="text-gray-500 mb-8">Welcome, {staffId}</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {stats.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5">
                    <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{s.value}</div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                {events.slice(0, 5).map(ev => (
                  <div key={ev.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{ev.title}</p>
                      <p className="text-xs text-gray-400">{ev.event_date} · {ev.location}</p>
                    </div>
                    <span className="text-xs bg-blue-50 text-[#1e3a8a] px-2 py-1 rounded-full">{ev.category}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Announcements</h2>
                {announcements.slice(0, 5).map(a => (
                  <div key={a.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{a.title}</p>
                      <p className="text-xs text-gray-400">{new Date(a.published_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${a.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {a.is_published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Events</h1>
              <button onClick={() => { setEditingEvent(null); setEventForm({ title:'', event_date:'', start_time:'09:00', end_time:'17:00', location:'', department_id:'computing', category:'Workshop', description:'', expected_attendees:50, is_published:true }); setShowEventForm(true); }}
                className="flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#1e40af]">
                <Plus className="w-4 h-4" /> Add Event
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden lg:table-cell">Location</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Registered</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {events.map(ev => (
                    <tr key={ev.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{ev.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{ev.event_date}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{ev.location}</td>
                      <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs bg-blue-50 text-[#1e3a8a] px-2 py-1 rounded-full">{ev.category}</span></td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => { setActiveTab('participants'); setSelectedEventFilter(ev.id); }}
                          className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a8a] hover:underline"
                        >
                          <UserCheck className="w-4 h-4" />
                          {participants.filter((p: any) => p.event_id === ev.id).length}
                          <span className="text-xs text-gray-400 font-normal">/ {ev.expected_attendees}</span>
                        </button>
                      </td>
                      <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${ev.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{ev.is_published ? 'Live' : 'Draft'}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => { setEditingEvent(ev); setEventForm({ title:ev.title, event_date:ev.event_date?.slice(0,10)||'', start_time:ev.start_time?.slice(0,5)||'09:00', end_time:ev.end_time?.slice(0,5)||'17:00', location:ev.location||'', department_id:ev.department_id||'computing', category:ev.category||'Workshop', description:ev.description||'', expected_attendees:ev.expected_attendees||50, is_published:ev.is_published??true }); setShowEventForm(true); }}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => deleteEvent(ev.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
              <button onClick={() => { setEditingAnnouncement(null); setAnnouncementForm({ title:'', content:'', is_published:true, department_id:'' }); setShowAnnouncementForm(true); }}
                className="flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#1e40af]">
                <Plus className="w-4 h-4" /> New
              </button>
            </div>
            <div className="space-y-4">
              {announcements.map(a => (
                <div key={a.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-800">{a.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${a.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {a.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{new Date(a.published_at).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{a.content || a.body}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => togglePublished(a)} className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-400" title="Toggle publish"><Check className="w-4 h-4" /></button>
                      <button onClick={() => { setEditingAnnouncement(a); setAnnouncementForm({ title:a.title, content:a.content||a.body||'', is_published:a.is_published, department_id:a.department_id||'' }); setShowAnnouncementForm(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteAnnouncement(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Users</h1>
              <span className="text-sm text-gray-500">{users.length} total · {users.filter(u=>u.is_active).length} active</span>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Type</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{u.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 hidden sm:table-cell">{u.full_name}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{u.email}</td>
                      <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${u.user_type==='staff' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.user_type}</span></td>
                      <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{u.is_active ? 'Active' : 'Inactive'}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => toggleUserActive(u)} className={`p-1.5 rounded-lg transition-colors ${u.is_active ? 'hover:bg-red-50 text-red-400' : 'hover:bg-green-50 text-green-600'}`} title={u.is_active ? 'Deactivate' : 'Activate'}><Check className="w-4 h-4" /></button>
                          <button onClick={() => deleteUser(u.id)} disabled={u.id===staffId} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MEDIA */}
        {activeTab === 'media' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Media Gallery</h1>
              <button onClick={() => { setEditingMedia(null); setMediaForm({ title:'', media_type:'photo', department_id:'', event_label:'', thumbnail_url:'', media_date:'', is_published:true }); setShowMediaForm(true); }}
                className="flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#1e40af]">
                <Plus className="w-4 h-4" /> Add Media
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map(m => (
                <div key={m.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                  <div className="relative h-36">
                    <img src={m.thumbnail_url} alt={m.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => { setEditingMedia(m); setMediaForm({ title:m.title, media_type:m.media_type, department_id:m.department_id||'', event_label:m.event_label||'', thumbnail_url:m.thumbnail_url, media_date:m.media_date||'', is_published:m.is_published }); setShowMediaForm(true); }}
                        className="p-1.5 bg-white rounded-lg text-blue-500"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteMedia(m.id)} className="p-1.5 bg-white rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${m.is_published ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {m.is_published ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 truncate">{m.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-400">{m.media_type}</span>
                      <button onClick={() => toggleMediaPublished(m)} className="text-xs text-[#1e3a8a] hover:underline">
                        {m.is_published ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK */}
        {activeTab === 'feedback' && (
          <div>
            {/* Header + tab toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {feedbackSubmissions.length} submission{feedbackSubmissions.length !== 1 ? 's' : ''} received
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setFeedbackView('submissions')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${feedbackView === 'submissions' ? 'bg-white shadow text-[#1e3a8a]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Submissions</span>
                  </button>
                  <button
                    onClick={() => setFeedbackView('forms')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${feedbackView === 'forms' ? 'bg-white shadow text-[#1e3a8a]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Manage Forms</span>
                  </button>
                </div>
                {feedbackView === 'forms' && (
                  <button onClick={() => { setEditingFeedback(null); setFeedbackForm({ title:'', description:'', file_type:'PDF', file_url:'', is_active:true, sort_order:0 }); setShowFeedbackForm(true); }}
                    className="flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#1e40af]">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                )}
              </div>
            </div>

            {/* SUBMISSIONS VIEW */}
            {feedbackView === 'submissions' && (
              <div>
                {/* Summary stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {['event','programme','facility','general'].map(cat => {
                    const count = feedbackSubmissions.filter((s: any) => s.category === cat).length;
                    const labels: Record<string,string> = { event:'Event', programme:'Programme', facility:'Facility', general:'General' };
                    const colors: Record<string,string> = { event:'bg-blue-500', programme:'bg-purple-500', facility:'bg-orange-500', general:'bg-teal-500' };
                    return (
                      <button key={cat} onClick={() => setFeedbackFilter(feedbackFilter === cat ? 'all' : cat)}
                        className={`bg-white rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-all ${feedbackFilter === cat ? 'ring-2 ring-[#1e3a8a]' : ''}`}>
                        <div className={`w-8 h-8 ${colors[cat]} rounded-lg flex items-center justify-center mb-2`}>
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">{count}</div>
                        <div className="text-xs text-gray-500">{labels[cat]} Feedback</div>
                      </button>
                    );
                  })}
                </div>

                {/* Filter bar */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['all','event','programme','facility','general'].map(f => (
                    <button key={f} onClick={() => setFeedbackFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${feedbackFilter === f ? 'bg-[#1e3a8a] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>

                {/* Submissions list */}
                {feedbackSubmissions.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400">No feedback submissions yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Submissions from guests and students will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {feedbackSubmissions
                      .filter((s: any) => feedbackFilter === 'all' || s.category === feedbackFilter)
                      .map((s: any, idx: number) => (
                        <div key={s.id || idx} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                                  s.category === 'event' ? 'bg-blue-100 text-blue-700' :
                                  s.category === 'programme' ? 'bg-purple-100 text-purple-700' :
                                  s.category === 'facility' ? 'bg-orange-100 text-orange-700' :
                                  'bg-teal-100 text-teal-700'
                                }`}>{s.category}</span>
                                {s.department_id && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{s.department_id}</span>}
                                {s.is_anonymous && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Anonymous</span>}
                                {/* Star rating */}
                                {s.rating > 0 && (
                                  <span className="flex items-center gap-0.5">
                                    {[1,2,3,4,5].map(r => (
                                      <Star key={r} className={`w-3 h-3 ${s.rating >= r ? 'text-yellow-400' : 'text-gray-200'}`} fill={s.rating >= r ? 'currentColor' : 'none'} />
                                    ))}
                                  </span>
                                )}
                              </div>
                              {s.subject && <p className="font-semibold text-gray-800 text-sm mb-1">{s.subject}</p>}
                              <p className="text-sm text-gray-700 line-clamp-2">{s.message}</p>
                              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                                <span>From: <span className="text-gray-600">{s.is_anonymous ? 'Anonymous' : (s.submitter_name || s.submitted_by || 'Guest')}</span></span>
                                {s.submitter_email && !s.is_anonymous && <span>· {s.submitter_email}</span>}
                                {s.submitted_at && <span>· {new Date(s.submitted_at).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}</span>}
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedSubmission(selectedSubmission?.id === s.id ? null : s)}
                              className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 flex-shrink-0"
                              title="View full message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Expanded view */}
                          {selectedSubmission && (selectedSubmission.id === s.id || (selectedSubmission.id === undefined && idx === feedbackSubmissions.indexOf(s))) && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">{s.message}</p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* FORMS MANAGEMENT VIEW */}
            {feedbackView === 'forms' && (
              <div className="space-y-3">
                {feedbackForms.map(f => (
                  <div key={f.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800">{f.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${f.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{f.is_active ? 'Active' : 'Inactive'}</span>
                        <span className="text-xs bg-blue-50 text-[#1e3a8a] px-2 py-0.5 rounded-full">{f.file_type}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{f.description}</p>
                      {f.file_url && <p className="text-xs text-blue-500 truncate mt-1">{f.file_url}</p>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => { setEditingFeedback(f); setFeedbackForm({ title:f.title, description:f.description||'', file_type:f.file_type, file_url:f.file_url||'', is_active:f.is_active, sort_order:f.sort_order }); setShowFeedbackForm(true); }}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteFeedback(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {feedbackForms.length === 0 && (
                  <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400">No feedback forms created yet.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* DEPARTMENTS */}
        {activeTab === 'departments' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Departments</h1>
            <div className="grid md:grid-cols-2 gap-4">
              {departments.map(d => (
                <div key={d.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{d.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Head: {d.head_name || '—'}</p>
                    </div>
                    <button onClick={() => { setEditingDept(d); setDeptForm({ head_name:d.head_name||'', staff_count:d.staff_count||0, student_count:d.student_count||0, description:d.description||'', color_hex:d.color_hex||'#1e3a8a' }); setShowDeptForm(true); }}
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil className="w-4 h-4" /></button>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>👥 {d.staff_count} staff</span>
                    <span>🎓 {d.student_count} students</span>
                  </div>
                  {d.description && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{d.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PARTICIPANTS */}
        {activeTab === 'participants' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Event Participants</h1>
                <p className="text-sm text-gray-500 mt-1">{participants.length} total registrations</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Filter by event:</label>
                <select
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
                  value={selectedEventFilter}
                  onChange={e => setSelectedEventFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                >
                  <option value="all">All Events</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats per event */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {events.map(ev => {
                const count = participants.filter((p: any) => p.event_id === ev.id).length;
                return (
                  <button
                    key={ev.id}
                    onClick={() => setSelectedEventFilter(selectedEventFilter === ev.id ? 'all' : ev.id)}
                    className={`bg-white rounded-xl shadow-sm p-4 text-left transition-all hover:shadow-md ${selectedEventFilter === ev.id ? 'ring-2 ring-[#1e3a8a]' : ''}`}
                  >
                    <p className="font-semibold text-gray-800 text-sm line-clamp-1">{ev.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{ev.event_date?.slice(0,10)}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <UserCheck className="w-4 h-4 text-[#1e3a8a]" />
                      <span className="text-lg font-bold text-[#1e3a8a]">{count}</span>
                      <span className="text-xs text-gray-500">/ {ev.expected_attendees} expected</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Participants Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Student ID</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Event</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 hidden lg:table-cell">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {participants
                    .filter((p: any) => selectedEventFilter === 'all' || p.event_id === selectedEventFilter)
                    .map((p: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.student_id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800 hidden sm:table-cell">
                          {p.users?.full_name || '—'}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">
                          {p.users?.email || '—'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {p.events?.title || `Event #${p.event_id}`}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                          {p.joined_at ? new Date(p.joined_at).toLocaleString('en-US', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) : '—'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {participants.filter((p: any) => selectedEventFilter === 'all' || p.event_id === selectedEventFilter).length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <UserCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No participants yet for this event.</p>
                </div>
              )}
            </div>
          </div>
        )}


        {/* APPLICATIONS */}
        {activeTab === 'applications' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Programme Applications</h1>
                <p className="text-sm text-gray-500 mt-1">{applications.length} total application{applications.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Search by name, email or programme..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
                value={appSearch}
                onChange={e => setAppSearch(e.target.value)}
              />
              <select
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
                value={appFilter}
                onChange={e => setAppFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <ClipboardList className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400">No applications received yet.</p>
                <p className="text-sm text-gray-400 mt-1">Applications submitted from the Programmes page will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications
                  .filter((a: any) => appFilter === 'all' || (a.status || 'pending') === appFilter)
                  .filter((a: any) => {
                    if (!appSearch) return true;
                    const q = appSearch.toLowerCase();
                    return (a.full_name || '').toLowerCase().includes(q) ||
                      (a.email || '').toLowerCase().includes(q) ||
                      (a.programme_name || '').toLowerCase().includes(q);
                  })
                  .map((a: any, idx: number) => (
                    <div key={a.id || idx} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-800">{a.full_name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                (a.status || 'pending') === 'accepted' ? 'bg-green-100 text-green-700' :
                                (a.status || 'pending') === 'rejected' ? 'bg-red-100 text-red-700' :
                                (a.status || 'pending') === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>{(a.status || 'pending').charAt(0).toUpperCase() + (a.status || 'pending').slice(1)}</span>
                            </div>
                            <p className="text-sm font-medium text-[#1e3a8a] mb-1">{a.programme_name}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500">
                              <span>{a.email}</span>
                              {a.phone && <span>· {a.phone}</span>}
                              {a.intake_preference && <span>· Intake: {a.intake_preference}</span>}
                              {a.applied_at && <span>· {new Date(a.applied_at).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => setExpandedApp(expandedApp === (a.id || idx) ? null : (a.id || idx))}
                              className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400" title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Expanded details */}
                        {expandedApp === (a.id || idx) && (
                          <div className="mt-4 pt-4 border-t border-gray-100 grid sm:grid-cols-2 gap-3 text-sm">
                            {a.nationality && <div><span className="text-gray-400">Nationality:</span> <span className="text-gray-700 ml-1">{a.nationality}</span></div>}
                            {a.date_of_birth && <div><span className="text-gray-400">Date of Birth:</span> <span className="text-gray-700 ml-1">{a.date_of_birth}</span></div>}
                            {a.qualification && <div><span className="text-gray-400">Qualification:</span> <span className="text-gray-700 ml-1">{a.qualification}</span></div>}
                            {a.cgpa && <div><span className="text-gray-400">CGPA/Grade:</span> <span className="text-gray-700 ml-1">{a.cgpa}</span></div>}
                            {a.message && (
                              <div className="sm:col-span-2">
                                <span className="text-gray-400">Message:</span>
                                <p className="text-gray-700 mt-1 bg-gray-50 rounded-lg p-3">{a.message}</p>
                              </div>
                            )}
                            {/* Status update */}
                            <div className="sm:col-span-2 flex items-center gap-2 mt-1">
                              <span className="text-gray-500 text-xs">Update status:</span>
                              {['pending','reviewed','accepted','rejected'].map(s => (
                                <button key={s}
                                  onClick={async () => {
                                    try {
                                      await supabase.from('programme_applications').update({ status: s }).eq('id', a.id);
                                    } catch {}
                                    // update locally
                                    setApplications(prev => prev.map((app: any) => app.id === a.id ? { ...app, status: s } : app));
                                    showToast(`Status updated to ${s}`);
                                  }}
                                  className={`text-xs px-2.5 py-1 rounded-lg capitalize border transition-colors ${(a.status || 'pending') === s ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >{s}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ── EVENT MODAL ── */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
              <button onClick={() => setShowEventForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className={labelCls}>Title *</label><input className={inputCls} value={eventForm.title} onChange={e => setEventForm({...eventForm, title:e.target.value})} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className={labelCls}>Date *</label><input type="date" className={inputCls} value={eventForm.event_date} onChange={e => setEventForm({...eventForm, event_date:e.target.value})} /></div>
                <div><label className={labelCls}>Start</label><input type="time" className={inputCls} value={eventForm.start_time} onChange={e => setEventForm({...eventForm, start_time:e.target.value})} /></div>
                <div><label className={labelCls}>End</label><input type="time" className={inputCls} value={eventForm.end_time} onChange={e => setEventForm({...eventForm, end_time:e.target.value})} /></div>
              </div>
              <div><label className={labelCls}>Location</label><input className={inputCls} value={eventForm.location} onChange={e => setEventForm({...eventForm, location:e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Department</label>
                  <select className={inputCls} value={eventForm.department_id} onChange={e => setEventForm({...eventForm, department_id:e.target.value})}>
                    {DEPT_IDS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div><label className={labelCls}>Category</label>
                  <select className={inputCls} value={eventForm.category} onChange={e => setEventForm({...eventForm, category:e.target.value})}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div><label className={labelCls}>Expected Attendees</label><input type="number" className={inputCls} value={eventForm.expected_attendees} onChange={e => setEventForm({...eventForm, expected_attendees:Number(e.target.value)})} /></div>
              <div><label className={labelCls}>Description</label><textarea className={inputCls+' resize-none'} rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description:e.target.value})} /></div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setEventForm({...eventForm, is_published:!eventForm.is_published})} className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${eventForm.is_published ? 'bg-[#1e3a8a]' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${eventForm.is_published ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-gray-700">Publish immediately</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowEventForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveEvent} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm hover:bg-[#1e40af]">{editingEvent ? 'Save Changes' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ANNOUNCEMENT MODAL ── */}
      {showAnnouncementForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}</h2>
              <button onClick={() => setShowAnnouncementForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className={labelCls}>Title *</label><input className={inputCls} value={announcementForm.title} onChange={e => setAnnouncementForm({...announcementForm, title:e.target.value})} /></div>
              <div><label className={labelCls}>Department (optional)</label>
                <select className={inputCls} value={announcementForm.department_id} onChange={e => setAnnouncementForm({...announcementForm, department_id:e.target.value})}>
                  <option value="">All Departments</option>
                  {DEPT_IDS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>Content *</label><textarea className={inputCls+' resize-none'} rows={5} value={announcementForm.content} onChange={e => setAnnouncementForm({...announcementForm, content:e.target.value})} /></div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setAnnouncementForm({...announcementForm, is_published:!announcementForm.is_published})} className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${announcementForm.is_published ? 'bg-[#1e3a8a]' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${announcementForm.is_published ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-gray-700">Publish immediately</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowAnnouncementForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveAnnouncement} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm hover:bg-[#1e40af]">{editingAnnouncement ? 'Save' : 'Publish'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MEDIA MODAL ── */}
      {showMediaForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{editingMedia ? 'Edit Media' : 'Add Media'}</h2>
              <button onClick={() => setShowMediaForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className={labelCls}>Title *</label><input className={inputCls} value={mediaForm.title} onChange={e => setMediaForm({...mediaForm, title:e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Type</label>
                  <select className={inputCls} value={mediaForm.media_type} onChange={e => setMediaForm({...mediaForm, media_type:e.target.value as 'photo'|'video'})}>
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div><label className={labelCls}>Department</label>
                  <select className={inputCls} value={mediaForm.department_id} onChange={e => setMediaForm({...mediaForm, department_id:e.target.value})}>
                    <option value="">All</option>
                    {DEPT_IDS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div><label className={labelCls}>Image / Thumbnail URL *</label><input className={inputCls} value={mediaForm.thumbnail_url} onChange={e => setMediaForm({...mediaForm, thumbnail_url:e.target.value})} placeholder="https://..." /></div>
              <div><label className={labelCls}>Event Label</label><input className={inputCls} value={mediaForm.event_label} onChange={e => setMediaForm({...mediaForm, event_label:e.target.value})} placeholder="e.g. Graduation 2025" /></div>
              <div><label className={labelCls}>Date</label><input type="date" className={inputCls} value={mediaForm.media_date} onChange={e => setMediaForm({...mediaForm, media_date:e.target.value})} /></div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setMediaForm({...mediaForm, is_published:!mediaForm.is_published})} className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${mediaForm.is_published ? 'bg-[#1e3a8a]' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${mediaForm.is_published ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-gray-700">Publish immediately</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowMediaForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveMedia} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm hover:bg-[#1e40af]">{editingMedia ? 'Save' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── FEEDBACK FORM MODAL ── */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{editingFeedback ? 'Edit Form' : 'Add Feedback Form'}</h2>
              <button onClick={() => setShowFeedbackForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className={labelCls}>Title *</label><input className={inputCls} value={feedbackForm.title} onChange={e => setFeedbackForm({...feedbackForm, title:e.target.value})} /></div>
              <div><label className={labelCls}>Description</label><textarea className={inputCls+' resize-none'} rows={3} value={feedbackForm.description} onChange={e => setFeedbackForm({...feedbackForm, description:e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>File Type</label>
                  <select className={inputCls} value={feedbackForm.file_type} onChange={e => setFeedbackForm({...feedbackForm, file_type:e.target.value})}>
                    <option>PDF</option><option>DOCX</option><option>Google Form</option>
                  </select>
                </div>
                <div><label className={labelCls}>Sort Order</label><input type="number" className={inputCls} value={feedbackForm.sort_order} onChange={e => setFeedbackForm({...feedbackForm, sort_order:Number(e.target.value)})} /></div>
              </div>
              <div><label className={labelCls}>File / Form URL</label><input className={inputCls} value={feedbackForm.file_url} onChange={e => setFeedbackForm({...feedbackForm, file_url:e.target.value})} placeholder="https://..." /></div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setFeedbackForm({...feedbackForm, is_active:!feedbackForm.is_active})} className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${feedbackForm.is_active ? 'bg-[#1e3a8a]' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${feedbackForm.is_active ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-gray-700">Active (visible to students)</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowFeedbackForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveFeedback} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm hover:bg-[#1e40af]">{editingFeedback ? 'Save' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DEPARTMENT EDIT MODAL ── */}
      {showDeptForm && editingDept && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Edit: {editingDept.name}</h2>
              <button onClick={() => setShowDeptForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className={labelCls}>Head of Department</label><input className={inputCls} value={deptForm.head_name} onChange={e => setDeptForm({...deptForm, head_name:e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Staff Count</label><input type="number" className={inputCls} value={deptForm.staff_count} onChange={e => setDeptForm({...deptForm, staff_count:Number(e.target.value)})} /></div>
                <div><label className={labelCls}>Student Count</label><input type="number" className={inputCls} value={deptForm.student_count} onChange={e => setDeptForm({...deptForm, student_count:Number(e.target.value)})} /></div>
              </div>
              <div><label className={labelCls}>Theme Color</label>
                <div className="flex gap-2 items-center">
                  <input type="color" className="h-10 w-16 rounded border border-gray-200 cursor-pointer" value={deptForm.color_hex} onChange={e => setDeptForm({...deptForm, color_hex:e.target.value})} />
                  <input className={inputCls} value={deptForm.color_hex} onChange={e => setDeptForm({...deptForm, color_hex:e.target.value})} />
                </div>
              </div>
              <div><label className={labelCls}>Description</label><textarea className={inputCls+' resize-none'} rows={4} value={deptForm.description} onChange={e => setDeptForm({...deptForm, description:e.target.value})} /></div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowDeptForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={saveDept} className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-lg text-sm hover:bg-[#1e40af]">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.type==='success' ? 'bg-emerald-600' : 'bg-red-500'}`}>
          {toast.type==='success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}