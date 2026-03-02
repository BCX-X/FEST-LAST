import { useState, useEffect } from 'react';
import { User, Mail, Phone, BookOpen, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface UserProfileProps {
  userType: 'student' | 'staff';
  userId: string;
  onLogout: () => void;
}

export function UserProfile({ userType, userId, onLogout }: UserProfileProps) {
  const isGuest = userId === 'guest';

  const [userData, setUserData] = useState<{
    name: string; id: string; email: string; phone: string;
    department: string; programme?: string; position?: string;
  }>({
    name: isGuest ? 'Guest User' : userId,
    id: isGuest ? 'Guest' : userId,
    email: '-',
    phone: '-',
    department: '-',
    programme: '-',
    position: '-',
  });

  useEffect(() => {
    if (isGuest) return;
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, phone, department_id, position, programme_id')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('UserProfile fetch error:', error.message);
        return;
      }

      if (data) {
        const deptNames: Record<string, string> = {
          civil: 'Civil Engineering & Construction',
          electrical: 'Electrical & Electronics Engineering',
          mechanical: 'Mechanical & Automotive Engineering',
          computing: 'Computing & Software Engineering',
          biotechnology: 'Biotechnology & Agricultural Science',
        };
        setUserData({
          name: data.full_name || userId,
          id: data.id,
          email: data.email || '-',
          phone: data.phone || '-',
          department: deptNames[data.department_id] || data.department_id || '-',
          programme: data.programme_id || '-',
          position: data.position || '-',
        });
      }
    };
    fetchUser();
  }, [userId, isGuest]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userData.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
            <p className="text-gray-600">
              {isGuest ? 'Guest' : userType === 'student' ? 'Student' : 'Staff Member'}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">ID Number</p>
              <p className="font-semibold">{userData.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{userData.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold">{userData.department}</p>
            </div>
          </div>

          {userType === 'student' && !isGuest && (
            <div className="flex items-center space-x-3 text-gray-700">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Programme</p>
                <p className="font-semibold">{userData.programme}</p>
              </div>
            </div>
          )}

          {userType === 'staff' && !isGuest && (
            <div className="flex items-center space-x-3 text-gray-700">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-semibold">{userData.position}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isGuest && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            You are browsing as a guest. Some features may be limited. Please log in with your Student ID or Staff ID to access all features.
          </p>
        </div>
      )}
    </div>
  );
}