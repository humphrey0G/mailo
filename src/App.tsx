import React, { useState, useEffect } from 'react';
import { Mail, Search, Settings as SettingsIcon, Plus, Star, Send, Archive, Trash, LogOut, User, Tag, Mic, Power } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Toggle from '@radix-ui/react-toggle';
import { Auth } from './components/Auth';
import { EmailSetup } from './components/EmailSetup';
import { Settings, SettingsData } from './components/Settings';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';

// Mock data for development
const mockEmails = [
  {
    id: '1',
    sender: 'John Doe',
    subject: 'Project Update',
    preview: 'Here is the latest update on our project progress. We have made significant improvements to the user interface and added several new features that will enhance the overall user experience.',
    date: new Date().toISOString(),
    unread: true,
    tag: 'work'
  },
  {
    id: '2',
    sender: 'Sarah Wilson',
    subject: 'Meeting Tomorrow',
    preview: 'Just a reminder about our meeting scheduled for tomorrow at 2 PM. Please bring the quarterly reports and be prepared to discuss the upcoming product launch timeline.',
    date: new Date(Date.now() - 86400000).toISOString(),
    unread: false,
    tag: 'important'
  },
  {
    id: '3',
    sender: 'Newsletter',
    subject: 'Weekly Tech News',
    preview: 'This week in technology: AI advances, new frameworks, and more exciting developments in the world of software engineering and digital innovation.',
    date: new Date(Date.now() - 172800000).toISOString(),
    unread: false,
    tag: 'newsletter'
  },
  {
    id: '4',
    sender: 'Mom',
    subject: 'Family Dinner',
    preview: 'Hi honey! Just wanted to remind you about family dinner this Sunday. Your dad is making his famous barbecue and we would love to see you there.',
    date: new Date(Date.now() - 259200000).toISOString(),
    unread: true,
    tag: 'personal'
  },
  {
    id: '5',
    sender: 'GitHub',
    subject: 'Security Alert',
    preview: 'We detected a new sign-in to your GitHub account from a new device. If this was you, you can safely ignore this email.',
    date: new Date(Date.now() - 345600000).toISOString(),
    unread: false,
    tag: 'work'
  },
  {
    id: '6',
    sender: 'LinkedIn',
    subject: 'You have 3 new connection requests',
    preview: 'Connect with professionals in your network and expand your career opportunities.',
    date: new Date(Date.now() - 432000000).toISOString(),
    unread: true,
    tag: 'work'
  }
];

const colorTags = [
  { id: 'work', name: 'Work', color: 'bg-blue-500' },
  { id: 'important', name: 'Important', color: 'bg-red-500' },
  { id: 'newsletter', name: 'Newsletter', color: 'bg-green-500' },
  { id: 'personal', name: 'Personal', color: 'bg-purple-500' }
];

const defaultSettings: SettingsData = {
  emailLayout: 'bento',
  viewMode: 'list',
  signature: '',
  vacationMessage: '',
  developerMode: true,
  aiPersonality: {
    knowledge: '',
    character: '',
    careerJourney: '',
    inboxExpectations: ''
  }
};

function App() {
  const { user, loading: authLoading } = useAuth();
  const [hasEmailSetup, setHasEmailSetup] = useState(false);
  const [isAutoPilot, setIsAutoPilot] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [selectedEmail, setSelectedEmail] = useState<typeof mockEmails[0] | null>(null);
  const [emails] = useState(mockEmails);
  const [emailsLoading] = useState(false);
  const [error] = useState(null);

  useEffect(() => {
    if (user) {
      // Check if user has email settings
      supabase
        .from('email_settings')
        .select('id')
        .eq('user_id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error && error.code !== 'PGRST116') {
            console.error('Error checking email settings:', error);
          }
          setHasEmailSetup(!!data);
        })
        .catch((error) => {
          console.error('Error in email settings check:', error);
          setHasEmailSetup(false);
        });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleAutoPilot = () => {
    setIsAutoPilot(!isAutoPilot);
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  const handleEmailSelect = (email: typeof mockEmails[0]) => {
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleSettingsChange = (newSettings: SettingsData) => {
    setSettings(newSettings);
    // If switching to list mode, clear selected email
    if (newSettings.viewMode === 'list') {
      setSelectedEmail(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!hasEmailSetup) {
    return <EmailSetup onSetupComplete={() => setHasEmailSetup(true)} />;
  }

  // Generate a default avatar URL if user doesn't have one
  const avatarUrl = user.user_metadata?.avatar_url || 
                   user.user_metadata?.picture || 
                   `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=3b82f6&color=fff`;

  const userName = user.user_metadata?.full_name || 
                   user.user_metadata?.name || 
                   user.email?.split('@')[0] || 
                   'User';

  const showDetailView = settings.viewMode === 'detail' && selectedEmail;
  const showListView = settings.viewMode === 'list' || !selectedEmail;

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Brand Bar */}
      <div className="w-16 bg-blue-600 flex flex-col items-center py-4">
        <Mail className="text-white w-8 h-8 mb-8" />
        <div className="flex-1" />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-white focus:outline-none">
              <img
                src={avatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=3b82f6&color=fff`;
                }}
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-lg shadow-lg p-2 mt-2 z-50"
              sideOffset={5}
              align="center"
            >
              <div className="px-2 py-2 mb-2">
                <div className="font-medium">{userName}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
              <DropdownMenu.Item className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                <User size={16} />
                <span>Account Settings</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item 
                className="flex items-center gap-2 px-2 py-2 text-red-600 hover:bg-gray-100 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white p-4 border-r border-gray-200 flex flex-col">
        <button className="w-full bg-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-6 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Compose</span>
        </button>
        
        <nav className="mb-8">
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-2 bg-blue-100 rounded-lg text-blue-600">
              <Mail size={20} />
              <span>Inbox</span>
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {emails.filter(e => e.unread).length}
              </span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Star size={20} />
              <span>Starred</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Send size={20} />
              <span>Sent</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Archive size={20} />
              <span>Archive</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <Trash size={20} />
              <span>Trash</span>
            </li>
          </ul>
        </nav>

        {/* Color Tags */}
        <div className="mt-auto">
          <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
            <Tag size={16} />
            Color Tags
          </h3>
          <div className="space-y-2">
            {colorTags.map(tag => (
              <div key={tag.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                <span className="text-sm text-gray-700">{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
          <div className="flex-1 max-w-2xl flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search emails or ask AI assistant..."
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                  isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                }`}
                onClick={startVoiceSearch}
              >
                <Mic size={18} />
              </button>
            </div>
            <Toggle.Root
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                isAutoPilot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
              pressed={isAutoPilot}
              onPressedChange={toggleAutoPilot}
            >
              <Power size={18} />
              <span className="text-sm font-medium">Auto-Pilot</span>
            </Toggle.Root>
          </div>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsSettingsOpen(true)}
          >
            <SettingsIcon size={20} className="text-gray-600" />
          </button>
        </header>

        {/* Email Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {settings.viewMode === 'detail' ? (
            <>
              {/* Email List Sidebar for Detail View */}
              <div className="w-96 border-r border-gray-200 overflow-y-auto p-4 bg-gray-50">
                {emailsLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading emails...</p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
                    Error loading emails: {error.message}
                  </div>
                ) : emails.length === 0 ? (
                  <div className="text-center text-gray-500 bg-white p-8 rounded-lg">
                    <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No emails found</h3>
                    <p>Your inbox is empty or still loading.</p>
                  </div>
                ) : (
                  <EmailList 
                    emails={emails} 
                    settings={{ ...settings, emailLayout: 'traditional' }}
                    colorTags={colorTags}
                    onEmailSelect={handleEmailSelect}
                    selectedEmailId={selectedEmail?.id}
                  />
                )}
              </div>
              
              {/* Email Detail Panel */}
              <div className="flex-1">
                {selectedEmail ? (
                  <EmailDetail 
                    email={selectedEmail} 
                    onBack={handleBackToList}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>Select an email to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* List View - Full Width */
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              {emailsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading emails...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
                  Error loading emails: {error.message}
                </div>
              ) : emails.length === 0 ? (
                <div className="text-center text-gray-500 bg-white p-8 rounded-lg">
                  <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No emails found</h3>
                  <p>Your inbox is empty or still loading.</p>
                </div>
              ) : (
                <EmailList 
                  emails={emails} 
                  settings={settings}
                  colorTags={colorTags}
                  onEmailSelect={handleEmailSelect}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

export default App;