import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Reply, 
  ReplyAll, 
  Forward, 
  Archive, 
  Star, 
  Trash, 
  MoreHorizontal,
  Paperclip,
  Download,
  Image as ImageIcon,
  Send
} from 'lucide-react';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  tag: string;
}

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
}

export function EmailDetail({ email, onBack }: EmailDetailProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Mock attachments
  const attachments = [
    { name: 'project-proposal.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'budget-overview.xlsx', size: '1.2 MB', type: 'excel' },
  ];

  // Mock images (inactive as requested)
  const images = [
    { name: 'screenshot-1.png', url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300', size: '856 KB' },
    { name: 'diagram.jpg', url: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=300', size: '1.1 MB' },
  ];

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Mock send functionality
      console.log('Sending reply:', replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">{email.subject}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Archive size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Star size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Trash size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {email.sender.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{email.sender}</div>
              <div className="text-sm text-gray-500">to me</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(email.date), 'MMM d, yyyy at h:mm a')}
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            {email.preview}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Best regards,<br />
            {email.sender}
          </p>
        </div>

        {/* Attachments Section */}
        {attachments.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Paperclip size={16} />
              Attachments ({attachments.length})
            </h3>
            <div className="space-y-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Paperclip size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{attachment.name}</div>
                      <div className="text-xs text-gray-500">{attachment.size}</div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Download size={16} className="text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Section (Inactive) */}
        {images.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <ImageIcon size={16} />
              Images ({images.length}) - Preview Disabled
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <ImageIcon size={24} className="text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-500">{image.name}</div>
                      <div className="text-xs text-gray-400">{image.size}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gray-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Preview Disabled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reply Section */}
      {isReplying ? (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Reply to {email.sender}</div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSendReply}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={16} />
                Send Reply
              </button>
              <button 
                onClick={() => setIsReplying(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Paperclip size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Action Buttons */
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsReplying(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Reply size={16} />
              Reply
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <ReplyAll size={16} />
              Reply All
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Forward size={16} />
              Forward
            </button>
          </div>
        </div>
      )}
    </div>
  );
}