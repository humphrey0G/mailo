import React from 'react';
import { Mail, Search, Settings, Plus, Star, Send, Archive, Trash } from 'lucide-react';
import { format } from 'date-fns';

const emails = [
  {
    id: 1,
    subject: "Weekly Team Update",
    sender: "Sarah Johnson",
    preview: "Here's a summary of what the team accomplished this week...",
    date: new Date(2023, 7, 15, 14, 30),
    unread: true,
  },
  {
    id: 2,
    subject: "Project Milestone Achieved",
    sender: "David Chen",
    preview: "I'm pleased to announce that we've successfully completed...",
    date: new Date(2023, 7, 15, 11, 15),
    unread: false,
  },
  {
    id: 3,
    subject: "New Feature Release",
    sender: "Product Team",
    preview: "We're excited to announce the launch of our latest feature...",
    date: new Date(2023, 7, 14, 16, 45),
    unread: true,
  },
];

function App() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r">
        <button className="w-full bg-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
          <Plus size={20} />
          <span>Compose</span>
        </button>
        
        <nav>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-2 bg-blue-100 rounded-lg text-blue-600">
              <Mail size={20} />
              <span>Inbox</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
              <Star size={20} />
              <span>Starred</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
              <Send size={20} />
              <span>Sent</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
              <Archive size={20} />
              <span>Archive</span>
            </li>
            <li className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-200 rounded-lg">
              <Trash size={20} />
              <span>Trash</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search emails..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings size={20} className="text-gray-600" />
          </button>
        </header>

        {/* Email List */}
        <div className="flex-1 overflow-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full ${email.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${email.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                    {email.sender}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(email.date, 'MMM d, h:mm a')}
                  </span>
                </div>
                <h3 className={`truncate ${email.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                  {email.subject}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {email.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;