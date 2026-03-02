import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { supabase } from '../supabaseClient';

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
  expected_attendees: number;
  is_published: boolean;
}

const DEPARTMENTS = [
  { id: 'all',          name: 'All Departments',                   color: '#1e3a8a' },
  { id: 'civil',        name: 'Civil Engineering',                  color: '#1e3a8a' },
  { id: 'electrical',   name: 'Electrical & Electronics',           color: '#0ea5e9' },
  { id: 'mechanical',   name: 'Mechanical & Automotive',            color: '#0891b2' },
  { id: 'computing',    name: 'Computing & Software',               color: '#06b6d4' },
  { id: 'biotechnology',name: 'Biotechnology & Agricultural',       color: '#14b8a6' },
];

export function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
    };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => {
      const evDate = e.event_date?.slice(0, 10);
      const deptMatch = selectedDepartment === 'all' || e.department_id === selectedDepartment || e.department_id === 'all';
      return evDate === dateStr && deptMatch;
    });
  };

  const filteredMonthEvents = events.filter(e => {
    const d = new Date(e.event_date);
    const deptMatch = selectedDepartment === 'all' || e.department_id === selectedDepartment || e.department_id === 'all';
    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear() && deptMatch;
  }).sort((a, b) => a.event_date.localeCompare(b.event_date));

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="mb-4">Event Calendar</h1>
        <p className="text-gray-600">View all upcoming events and activities across FEST departments</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3>Filter by Department</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedDepartment === dept.id ? 'text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedDepartment === dept.id ? { backgroundColor: dept.color } : {}}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="text-center py-16 text-gray-500">Loading events...</div>}

      {!loading && (
        <>
          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#1e3a8a] text-white p-6">
              <div className="flex items-center justify-between">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-6 h-6" />
                  <h2 className="text-white">{monthName}</h2>
                </div>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-600 py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDate(day);
                  const hasEvents = dayEvents.length > 0;
                  return (
                    <div key={day}
                      className={`aspect-square border rounded-lg p-2 ${hasEvents ? 'bg-blue-50 border-[#1e3a8a]' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                      <div className={`text-sm mb-1 ${hasEvents ? 'text-[#1e3a8a]' : 'text-gray-700'}`}>{day}</div>
                      {hasEvents && (
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event, idx) => (
                            <div key={idx}
                              className="text-xs bg-[#1e3a8a] text-white px-1 py-0.5 rounded truncate"
                              title={event.title}>
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-600">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Event List */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="mb-6">Events This Month</h2>
            {filteredMonthEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No events this month.</p>
            ) : (
              <div className="space-y-4">
                {filteredMonthEvents.map((event) => {
                  const dept = DEPARTMENTS.find(d => d.id === event.department_id) || DEPARTMENTS[0];
                  return (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: dept.color }}>
                        <div className="text-xs">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}</div>
                        <div className="text-2xl">{new Date(event.event_date).getDate()}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-1 truncate">{event.title}</h3>
                        <p className="text-sm text-gray-600">{dept.name}</p>
                        {event.start_time && (
                          <p className="text-xs text-gray-400">{event.start_time.slice(0,5)} – {event.end_time?.slice(0,5)} · {event.location}</p>
                        )}
                      </div>
                      <button className="text-[#1e3a8a] hover:text-[#1e40af] text-sm flex-shrink-0">
                        View Details →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}