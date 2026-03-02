import { useState } from 'react';
import { User, Lock, X, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (userType: 'student' | 'staff', userId: string, userName: string) => void;
}

export function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const [loginType, setLoginType] = useState<'student' | 'staff'>('student');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const trimmedId = userId.trim().toUpperCase();

    try {
      // Query database for user by ID and type
      const { data, error: dbError } = await supabase
        .from('users')
        .select('id, full_name, user_type, password, is_active')
        .eq('id', trimmedId)
        .eq('user_type', loginType)
        .eq('is_active', true)
        .maybeSingle();

      if (dbError) {
        setError('Database error: ' + dbError.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setError(
          `No active ${loginType} account found with ID "${trimmedId}". ` +
          `Please check your ID and login type.`
        );
        setLoading(false);
        return;
      }

      // Check password
      if (data.password && data.password !== password) {
        setError('Incorrect password. Please try again.');
        setLoading(false);
        return;
      }

      // ✅ Login success
      onLoginSuccess(data.user_type as 'student' | 'staff', data.id, data.full_name || data.id);

    } catch (err: any) {
      setError('Connection error. Check your internet and try again.');
    }

    setLoading(false);
  };

  const handleGuestContinue = () => {
    onLoginSuccess('student', 'guest', 'Guest');
  };

  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
          <button onClick={() => setShowForgotPassword(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl mb-2">Forgot Password?</h2>
            <p className="text-gray-600">Please contact KLUST staff for password reset assistance</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Contact Information:</h3>
            <p className="text-sm text-gray-700 mb-1"><strong>Location:</strong> Block 11, KLUST Campus</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Office Hours:</strong> Mon - Fri, 8:00 AM - 5:00 PM</p>
            <p className="text-sm text-gray-700"><strong>Email:</strong> support@klust.edu.my</p>
          </div>
          <button onClick={() => setShowForgotPassword(false)} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl mb-2">Welcome to KLUST FEST</h2>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setLoginType('student'); setError(''); setUserId(''); setPassword(''); }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              loginType === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Student Login
          </button>
          <button
            onClick={() => { setLoginType('staff'); setError(''); setUserId(''); setPassword(''); }}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              loginType === 'staff' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Staff Login
          </button>
        </div>

        {/* Login Hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 text-sm text-blue-900">
          {loginType === 'student' ? (
            <p>Student IDs: <strong>STU001–STU005</strong> · Password: <strong>student123</strong></p>
          ) : (
            <p>Staff IDs: <strong>STAFF001–STAFF005</strong> · Password: <strong>staff123</strong></p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-4 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">
              {loginType === 'student' ? 'Student ID' : 'Staff ID'}
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => { setUserId(e.target.value); setError(''); }}
              placeholder={loginType === 'student' ? 'e.g. STU001' : 'e.g. STAFF001'}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase placeholder:normal-case"
              required
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        {loginType === 'student' && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <button
              onClick={handleGuestContinue}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Continue as Guest
            </button>
          </>
        )}
      </div>
    </div>
  );
}