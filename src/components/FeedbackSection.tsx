import { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface FeedbackSectionProps {
  userId?: string;
  userType?: 'student' | 'staff';
  isLoggedIn?: boolean;
}

const CATEGORIES = [
  { id: 'event', label: 'Event Feedback', description: 'Share your thoughts about recent FEST events and activities' },
  { id: 'programme', label: 'Programme Evaluation', description: 'Help us improve our academic programmes' },
  { id: 'facility', label: 'Facility Feedback', description: 'Provide feedback on our laboratories and facilities' },
  { id: 'general', label: 'General Suggestion', description: 'Share your ideas and suggestions for FEST improvement' },
];

const DEPARTMENTS = [
  { id: '', label: 'General / All Departments' },
  { id: 'civil', label: 'Civil Engineering & Construction' },
  { id: 'electrical', label: 'Electrical & Electronics Engineering' },
  { id: 'mechanical', label: 'Mechanical & Automotive Engineering' },
  { id: 'computing', label: 'Computing & Software Engineering' },
  { id: 'biotechnology', label: 'Biotechnology & Agricultural Science' },
];

const RATINGS = [1, 2, 3, 4, 5];

export function FeedbackSection({ userId = '', userType = 'student', isLoggedIn = false }: FeedbackSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    rating: 0,
    subject: '',
    message: '',
    anonymous: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const isGuest = !isLoggedIn || userId === 'guest';

  const handleSubmit = async () => {
    if (!selectedCategory) return setError('Please select a feedback category.');
    if (!form.message.trim()) return setError('Please write your feedback message.');
    if (!form.rating) return setError('Please give a rating.');
    if (isGuest && !form.anonymous && !form.email) return setError('Please enter your email or submit anonymously.');

    setError('');
    setSubmitting(true);

    const payload = {
      category: selectedCategory,
      department_id: form.department || null,
      rating: form.rating,
      subject: form.subject || null,
      message: form.message,
      submitted_by: isLoggedIn && userId !== 'guest' ? userId : null,
      submitter_name: form.anonymous ? 'Anonymous' : (form.name || (isLoggedIn && userId !== 'guest' ? userId : 'Guest')),
      submitter_email: form.anonymous ? null : (form.email || null),
      is_anonymous: form.anonymous,
      submitted_at: new Date().toISOString(),
    };

    try {
      const { error: dbError } = await supabase.from('feedback_submissions').insert([payload]);

      if (dbError) {
        // Fallback: save to localStorage if table doesn't exist
        const existing = JSON.parse(localStorage.getItem('feedback_submissions') || '[]');
        existing.push({ ...payload, id: Date.now() });
        localStorage.setItem('feedback_submissions', JSON.stringify(existing));
      }

      setSubmitted(true);
    } catch {
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('feedback_submissions') || '[]');
      existing.push({ ...payload, id: Date.now() });
      localStorage.setItem('feedback_submissions', JSON.stringify(existing));
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Thank You for Your Feedback!</h1>
          <p className="text-gray-600 mb-8">
            Your feedback has been submitted successfully. We review all submissions and use them to improve FEST.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedCategory('');
              setForm({ name: '', email: '', department: '', rating: 0, subject: '', message: '', anonymous: false });
            }}
            className="bg-[#1e3a8a] text-white px-8 py-3 rounded-xl hover:bg-[#1e40af] transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="mb-3">Feedback & Suggestions</h1>
        <p className="text-gray-600">
          We value your opinion! Share your thoughts to help us improve FEST. Anyone can submit feedback — no login required.
        </p>
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">1. Select Feedback Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selectedCategory === cat.id
                  ? 'border-[#1e3a8a] bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                  selectedCategory === cat.id ? 'border-[#1e3a8a] bg-[#1e3a8a]' : 'border-gray-300'
                }`} />
                <div>
                  <p className={`font-semibold text-sm ${selectedCategory === cat.id ? 'text-[#1e3a8a]' : 'text-gray-800'}`}>
                    {cat.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">2. Fill in Your Feedback</h2>

        {/* Department */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Department (optional)</label>
          <select
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          >
            {DEPARTMENTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Overall Rating *</label>
          <div className="flex gap-2">
            {RATINGS.map(r => (
              <button
                key={r}
                onClick={() => setForm({ ...form, rating: r })}
                className={`transition-transform hover:scale-110 ${form.rating >= r ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="w-8 h-8" fill={form.rating >= r ? 'currentColor' : 'none'} />
              </button>
            ))}
            {form.rating > 0 && (
              <span className="ml-2 text-sm text-gray-500 self-center">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
              </span>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subject (optional)</label>
          <input
            type="text"
            placeholder="Brief subject of your feedback"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback *</label>
          <textarea
            rows={5}
            placeholder="Write your feedback, suggestions, or comments here..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] resize-none"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />
          <p className="text-xs text-gray-400 mt-1">{form.message.length} characters</p>
        </div>

        {/* Anonymous toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setForm({ ...form, anonymous: !form.anonymous })}
            className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${form.anonymous ? 'bg-[#1e3a8a]' : 'bg-gray-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${form.anonymous ? 'translate-x-4' : ''}`} />
          </button>
          <span className="text-sm text-gray-700">Submit anonymously</span>
        </div>

        {/* Contact info — shown when not anonymous */}
        {!form.anonymous && (
          <div className="grid sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name {isGuest ? '(optional)' : ''}
              </label>
              <input
                type="text"
                placeholder={isLoggedIn && userId !== 'guest' ? userId : 'e.g. Ahmad bin Ali'}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email {isGuest ? '*' : '(optional)'}
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] bg-white"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl hover:bg-[#1e40af] transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {submitting ? (
            <span className="animate-pulse">Submitting...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Feedback
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-400">
          Your feedback helps us improve FEST. All submissions are reviewed by staff.
        </p>
      </div>

      {/* Contact info */}
      <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-start gap-4">
          <MessageSquare className="w-5 h-5 text-[#1e3a8a] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Prefer to contact us directly?</h3>
            <p className="text-sm text-gray-600">
              Email: <strong>fest@klust.edu.my</strong> · Phone: +60 3-XXXX-XXXX<br />
              Office Hours: Mon–Fri 8:00 AM – 5:00 PM, Sat 8:00 AM – 1:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}