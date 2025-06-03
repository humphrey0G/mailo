import React, { useState } from 'react';
import { Mail, Search, Settings, Plus, Star, Send, Archive, Trash, LogOut, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Masonry from 'react-masonry-css';

const emails = [
  {
    id: 1,
    subject: "Weekly Team Update",
    sender: "Sarah Johnson",
    preview: "Here's a summary of what the team accomplished this week. We made significant progress on the main features and resolved several critical bugs. The client feedback has been positive, and we're on track for the next milestone. The team has shown exceptional dedication, and I'm particularly impressed with how everyone handled the challenges we faced. Looking forward to our continued success in the coming weeks.",
    date: new Date(2023, 7, 15, 14, 30),
    unread: true,
    tag: "team",
  },
  {
    id: 2,
    subject: "Project Milestone Achieved",
    sender: "David Chen",
    preview: "I'm pleased to announce that we've successfully completed the first phase of the project. The team has shown exceptional dedication and skill throughout this period.",
    date: new Date(2023, 7, 15, 11, 15),
    unread: false,
    tag: "project",
  },
  {
    id: 3,
    subject: "New Feature Release",
    sender: "Product Team",
    preview: "We're excited to announce the launch of our latest feature. This update includes performance improvements and new user-requested functionality.",
    date: new Date(2023, 7, 14, 16, 45),
    unread: true,
    tag: "product",
  },
  {
    id: 4,
    subject: "Client Meeting Summary",
    sender: "Emily White",
    preview: "Following up on today's client meeting, here are the key points we discussed and the action items we need to address in the coming week.",
    date: new Date(2023, 7, 14, 15, 20),
    unread: true,
    tag: "client",
  },
  {
    id: 5,
    subject: "Design Review Feedback",
    sender: "Alex Turner",
    preview: "I've reviewed the latest design mockups and have some suggestions for improving the user flow. Let's discuss these changes in our next meeting.",
    date: new Date(2023, 7, 14, 14, 10),
    unread: false,
    tag: "design",
  },
  {
    id: 6,
    subject: "Q3 Planning Meeting",
    sender: "Management Team",
    preview: "Please find attached the agenda for our upcoming Q3 planning meeting. We'll be discussing our goals and strategies for the next quarter.",
    date: new Date(2023, 7, 14, 11, 30),
    unread: true,
    tag: "management",
  },
  {
    id: 7,
    subject: "System Maintenance Notice",
    sender: "IT Department",
    preview: "We will be performing scheduled maintenance this weekend. Please save your work and log out of all systems by Friday evening.",
    date: new Date(2023, 7, 13, 17, 45),
    unread: false,
    tag: "system",
  },
  {
    id: 8,
    subject: "Team Building Event",
    sender: "HR Department",
    preview: "Join us for our monthly team building event! This time we're planning an exciting virtual escape room experience.",
    date: new Date(2023, 7, 13, 16, 20),
    unread: true,
    tag: "team",
  }
];

const colorTags = [
  { id: 'team', name: 'Team', color: 'bg-blue-500' },
  { id: 'project', name: 'Project', color: 'bg-green-500' },
  { id: 'client', name: 'Client', color: 'bg-purple-500' },
  { id: 'product', name: 'Product', color: 'bg-yellow-500' },
  { id: 'design', name: 'Design', color: 'bg-pink-500' },
  { id: 'management', name: 'Management', color: 'bg-red-500' },
  { id: 'system', name: 'System', color: 'bg-gray-500' },
];

function App() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2'
  });

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const breakpointColumns = {
    default: 2,
    1100: 2,
    700: 1
  };

  // Sort emails by date and separate the most recent
  const sortedEmails = [...emails].sort((a, b) => b.date.getTime() - a.date.getTime());
  const [mostRecentEmail, ...otherEmails] = sortedEmails;

  return (
    <div className="h-screen flex">
      {/* Brand Bar */}
      <div className="w-16 bg-blue-600 flex flex-col items-center py-4">
        <Mail className="text-white w-8 h-8 mb-8" />
        <div className="flex-1" />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="w-10 h-10 rounded-full overflow-hidden hover:ring-2 hover:ring-white focus:outline-none">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-lg shadow-lg p-2 mt-2"
              sideOffset={5}
              align="center"
            >
              <div className="px-2 py-2 mb-2">
                <div className="font-medium">{user.name}</div>
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
      <div className="w-64 bg-gray-100 p-4 border-r flex flex-col">
        <button className="w-full bg-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
          <Plus size={20} />
          <span>Compose</span>
        </button>
        
        <nav className="mb-8">
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

        {/* Color Tags */}
        <div className="mt-auto">
          <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
            <Tag size={16} />
            Color Tags
          </h3>
          <div className="space-y-2">
            {colorTags.map(tag => (
              <div key={tag.id} className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                <span className="text-sm text-gray-700">{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
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
        <div className="flex-1 overflow-auto p-6">
          {/* Featured Email */}
          <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {mostRecentEmail.unread && (
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                  <span className="font-medium text-lg text-gray-900">
                    {mostRecentEmail.sender}
                  </span>
                  <div className={`px-2 py-1 rounded-full text-xs ${colorTags.find(t => t.id === mostRecentEmail.tag)?.color.replace('bg-', 'bg-opacity-20 text-')}`}>
                    {colorTags.find(t => t.id === mostRecentEmail.tag)?.name}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {format(mostRecentEmail.date, 'MMM d, h:mm a')}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {mostRecentEmail.subject}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-4">
                {mostRecentEmail.preview}
              </p>
              <div className="flex justify-end gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Archive size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Star size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Trash size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Other Emails */}
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {otherEmails.map((email) => (
              <div
                key={email.id}
                className="mb-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {email.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <span className={`font-medium ${email.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                        {email.sender}
                      </span>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${colorTags.find(t => t.id === email.tag)?.color.replace('bg-', 'bg-opacity-20 text-')}`}>
                        {colorTags.find(t => t.id === email.tag)?.name}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(email.date, 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <h3 className={`mb-2 ${email.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                    {email.subject}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {email.preview}
                  </p>
                </div>
                <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Archive size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Star size={16} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Trash size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
}

export default App;