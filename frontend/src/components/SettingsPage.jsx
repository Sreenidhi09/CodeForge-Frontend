import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (use the same config as your login page)
const supabaseUrl = 'https://bvlcdseawnvuabwtqord.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bGNkc2Vhd252dWFid3Rxb3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NzAyMzksImV4cCI6MjA1ODU0NjIzOX0.kA5Alvn9zmBRypyVrykWiU3z-wySXk7AGtEbFYDC5OA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    website: '',
    bio: '',
    avatar_url: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [currentTab, setCurrentTab] = useState('profile');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        
        // Get user data
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
          
          // Get profile data from custom table if you have one
          // This assumes you have a 'profiles' table in Supabase
          // If not, you can use just the auth user data
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (data) {
            setProfile({
              full_name: data.full_name || '',
              username: data.username || '',
              website: data.website || '',
              bio: data.bio || '',
              avatar_url: data.avatar_url || ''
            });
          } else {
            // If there's no profile yet, use values from auth
            setProfile({
              full_name: user.user_metadata?.full_name || '',
              username: '',
              website: '',
              bio: '',
              avatar_url: user.user_metadata?.avatar_url || ''
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setMessage({ text: 'Error loading profile', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    
    getProfile();
  }, []);
  
  async function updateProfile(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      
      // Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: profile.full_name }
      });
      
      if (updateError) throw updateError;
      
      // Update or insert into profiles table
      // This assumes you have a profiles table. If not, you can skip this part
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          username: profile.username,
          website: profile.website,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          updated_at: new Date()
        });
      
      if (profileError) throw profileError;
      
      setMessage({ text: 'Profile updated successfully', type: 'success' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: error.message || 'Error updating profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  }
  
  async function updatePassword(e) {
    e.preventDefault();
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }
    
    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      setMessage({ text: 'Password updated successfully', type: 'success' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ text: error.message || 'Error updating password', type: 'error' });
    } finally {
      setLoading(false);
    }
  }
  
  // Function to handle avatar upload - you can implement this later
  async function uploadAvatar(e) {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    
    setMessage({ text: 'Avatar upload functionality coming soon!', type: 'info' });
    // Implementation would require Supabase storage configuration
  }
  
  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-navy-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-navy-900 text-gray-200">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
            <div className="bg-navy-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-500 mb-6 flex items-center">
                <span className="mr-2">⚙️</span> Settings
              </h2>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setCurrentTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentTab === 'profile' 
                      ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500' 
                      : 'hover:bg-navy-700'
                  }`}
                >
                  <span className="mr-3">👤</span>
                  Profile
                </button>
                <button 
                  onClick={() => setCurrentTab('account')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentTab === 'account' 
                      ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500' 
                      : 'hover:bg-navy-700'
                  }`}
                >
                  <span className="mr-3">🔒</span>
                  Account & Security
                </button>
                <button 
                  onClick={() => setCurrentTab('preferences')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentTab === 'preferences' 
                      ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500' 
                      : 'hover:bg-navy-700'
                  }`}
                >
                  <span className="mr-3">🎨</span>
                  Preferences
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:ml-8 md:flex-1">
            <div className="bg-navy-800 rounded-xl shadow-lg p-6">
              {/* Message display */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-md ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-200' 
                    : message.type === 'error'
                      ? 'bg-red-500/20 border border-red-500/50 text-red-200'
                      : 'bg-blue-500/20 border border-blue-500/50 text-blue-200'
                }`}>
                  {message.text}
                </div>
              )}
              
              {currentTab === 'profile' && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>
                  
                  <div className="mb-8 flex flex-col sm:flex-row items-center">
                    <div className="w-24 h-24 bg-navy-700 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex items-center justify-center border-2 border-navy-600">
                      {profile.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">👤</span>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-white">{profile.full_name || user.email}</h4>
                      <p className="text-gray-400">{user.email}</p>
                      <div className="mt-3">
                        <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                          Change Avatar
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={uploadAvatar} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={updateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-400 mb-2">
                          Full Name
                        </label>
                        <input
                          id="full_name"
                          type="text"
                          value={profile.full_name || ''}
                          onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                          className="w-full p-3 rounded-md border border-navy-700 bg-navy-900/50 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                          style={{ color: 'white', caretColor: 'white' }}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          value={profile.username || ''}
                          onChange={e => setProfile({ ...profile, username: e.target.value })}
                          className="w-full p-3 rounded-md border border-navy-700 bg-navy-900/50 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                          style={{ color: 'white', caretColor: 'white' }}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-2">
                          Website
                        </label>
                        <input
                          id="website"
                          type="url"
                          value={profile.website || ''}
                          onChange={e => setProfile({ ...profile, website: e.target.value })}
                          className="w-full p-3 rounded-md border border-navy-700 bg-navy-900/50 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                          style={{ color: 'white', caretColor: 'white' }}
                          placeholder="https://example.com"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          value={profile.bio || ''}
                          onChange={e => setProfile({ ...profile, bio: e.target.value })}
                          rows={4}
                          className="w-full p-3 rounded-md border border-navy-700 bg-navy-900/50 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                          style={{ color: 'white', caretColor: 'white' }}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </>
              )}
              
              {currentTab === 'account' && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-6">Account & Security</h3>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-white mb-2">Email Address</h4>
                    <p className="text-gray-400 mb-4">Your current email address is <span className="text-blue-400">{user.email}</span></p>
                    
                    <div className="bg-navy-700/50 border border-navy-600 rounded-md p-4">
                      <p className="text-sm text-gray-400">
                        Email change functionality is currently disabled. Please contact support if you need to change your email.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-white mb-4">Change Password</h4>
                    
                    <form onSubmit={updatePassword}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="new_password" className="block text-sm font-medium text-gray-400 mb-2">
                            New Password
                          </label>
                          <input
                            id="new_password"
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="w-full p-3 rounded-md border border-navy-700 bg-navy-900/50 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            style={{ color: 'white', caretColor: 'white' }}
                            placeholder="Enter new password"
                            minLength={6}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-400 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            id="confirm_password"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="w-full p-3 rounded-md border border-navy-700 bg-navy-900/50 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            style={{ color: 'white', caretColor: 'white' }}
                            placeholder="Confirm new password"
                            minLength={6}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition shadow-lg hover:shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                          disabled={loading || !newPassword || !confirmPassword}
                        >
                          {loading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">Account Deletion</h4>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
                      <p className="text-sm text-gray-300 mb-3">
                        Deleting your account is permanent and cannot be undone. All your data will be permanently removed.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-600/70 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              {currentTab === 'preferences' && (
                <>
                  <h3 className="text-xl font-semibold text-white mb-6">Preferences</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4">Theme</h4>
                      <div className="bg-navy-700 p-4 rounded-md">
                        <p className="text-gray-400 mb-3">Currently using dark theme (Superhuman style)</p>
                        <div className="flex space-x-3">
                          <button className="w-10 h-10 rounded-md bg-navy-900 border-2 border-blue-500" title="Dark theme"></button>
                          <button className="w-10 h-10 rounded-md bg-gray-200 border border-navy-700" title="Light theme"></button>
                          <button className="w-10 h-10 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900 border border-navy-700" title="Deep blue"></button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4">Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-3 border-b border-navy-700">
                          <div>
                            <p className="font-medium text-white">Email notifications</p>
                            <p className="text-sm text-gray-400">Receive emails about your account activity</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-navy-700">
                            <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between py-3 border-b border-navy-700">
                          <div>
                            <p className="font-medium text-white">Push notifications</p>
                            <p className="text-sm text-gray-400">Receive push notifications on your device</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-white">Marketing emails</p>
                            <p className="text-sm text-gray-400">Receive marketing and promotional emails</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-navy-700">
                            <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;