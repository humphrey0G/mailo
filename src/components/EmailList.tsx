import React from 'react';
import { format } from 'date-fns';
import { Archive, Star, Trash, Image, Paperclip } from 'lucide-react';
import Masonry from 'react-masonry-css';
import { SettingsData } from './Settings';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  tag: string;
}

interface EmailListProps {
  emails: Email[];
  settings: SettingsData;
  colorTags: Array<{ id: string; name: string; color: string }>;
  onEmailSelect?: (email: Email) => void;
  selectedEmailId?: string;
}

export function EmailList({ emails, settings, colorTags, onEmailSelect, selectedEmailId }: EmailListProps) {
  const breakpointColumns = {
    default: settings.emailLayout === 'bento' ? 2 : 1,
    1100: settings.emailLayout === 'bento' ? 2 : 1,
    700: 1
  };

  const renderEmail = (email: Email) => {
    const emailTag = colorTags.find(t => t.id === email.tag);
    const isSelected = selectedEmailId === email.id;
    const hasAttachment = Math.random() > 0.7; // Mock attachment indicator
    const hasImage = Math.random() > 0.8; // Mock image indicator
    
    return (
      <div
        key={email.id}
        className={`mb-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border cursor-pointer group ${
          isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onEmailSelect?.(email)}
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
              {emailTag && (
                <div className={`px-2 py-0.5 rounded-full text-xs text-white ${emailTag.color}`}>
                  {emailTag.name}
                </div>
              )}
              <div className="flex items-center gap-1 ml-2">
                {hasAttachment && (
                  <Paperclip size={12} className="text-gray-400" />
                )}
                {hasImage && (
                  <Image size={12} className="text-gray-400" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {format(new Date(email.date), 'MMM d, h:mm a')}
            </span>
          </div>
          <h3 className={`mb-2 ${email.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
            {email.subject}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3">
            {email.preview}
          </p>
        </div>
        <div className="px-4 py-3 bg-gray-50 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Archive functionality
            }}
          >
            <Archive size={16} className="text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Star functionality
            }}
          >
            <Star size={16} className="text-gray-600" />
          </button>
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Delete functionality
            }}
          >
            <Trash size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    );
  };

  if (settings.emailLayout === 'bento') {
    return (
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {emails.map(renderEmail)}
      </Masonry>
    );
  }

  // Traditional list layout
  return (
    <div className="space-y-4">
      {emails.map(renderEmail)}
    </div>
  );
}