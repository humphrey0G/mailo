import React, { useState } from 'react';
import { X, Layout, List, Grid, User, MessageSquare, Bot, Briefcase, Code, ToggleLeft, ToggleRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export interface SettingsData {
  emailLayout: 'traditional' | 'bento';
  viewMode: 'list' | 'detail';
  signature: string;
  vacationMessage: string;
  developerMode: boolean;
  aiPersonality: {
    knowledge: string;
    character: string;
    careerJourney: string;
    inboxExpectations: string;
  };
}

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsData;
  onSettingsChange: (settings: SettingsData) => void;
}

export function Settings({ isOpen, onClose, settings, onSettingsChange }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<SettingsData>(settings);
  const [activeTab, setActiveTab] = useState<'display' | 'email' | 'ai' | 'developer'>('display');

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const updateSettings = (updates: Partial<SettingsData>) => {
    setLocalSettings(prev => ({ ...prev, ...updates }));
  };

  const updateAIPersonality = (updates: Partial<SettingsData['aiPersonality']>) => {
    setLocalSettings(prev => ({
      ...prev,
      aiPersonality: { ...prev.aiPersonality, ...updates }
    }));
  };

  const tabs = [
    { id: 'display', label: 'Display & Layout', icon: Layout },
    { id: 'email', label: 'Email Preferences', icon: MessageSquare },
    { id: 'ai', label: 'AI Assistant', icon: Bot },
    { id: 'developer', label: 'Developer', icon: Code },
  ] as const;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-50">
          <Dialog.Title className="sr-only">Settings</Dialog.Title>
          <div className="flex h-full max-h-[90vh]">
            {/* Settings Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                <Dialog.Close asChild>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <X size={20} className="text-gray-600" />
                  </button>
                </Dialog.Close>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="space-y-8">
                {/* Display & Layout Tab */}
                {activeTab === 'display' && (
                  <>
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Layout size={20} />
                        Email Layout
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            localSettings.emailLayout === 'traditional' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateSettings({ emailLayout: 'traditional' })}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <List size={16} />
                            <span className="font-medium">Traditional</span>
                          </div>
                          <p className="text-sm text-gray-600">Classic list view with email details on the right</p>
                          <div className="mt-3 bg-gray-100 rounded p-2">
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-300 rounded w-full"></div>
                              <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            localSettings.emailLayout === 'bento' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateSettings({ emailLayout: 'bento' })}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Grid size={16} />
                            <span className="font-medium">Bento Cards</span>
                          </div>
                          <p className="text-sm text-gray-600">Modern card-based layout with masonry grid</p>
                          <div className="mt-3 bg-gray-100 rounded p-2">
                            <div className="grid grid-cols-2 gap-1">
                              <div className="h-8 bg-gray-300 rounded"></div>
                              <div className="h-6 bg-gray-300 rounded"></div>
                              <div className="h-6 bg-gray-300 rounded"></div>
                              <div className="h-8 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">View Mode</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            localSettings.viewMode === 'list' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateSettings({ viewMode: 'list' })}
                        >
                          <span className="font-medium">All Lists</span>
                          <p className="text-sm text-gray-600 mt-1">Show all emails in list/card format</p>
                          <div className="mt-3 bg-gray-100 rounded p-2">
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-300 rounded w-full"></div>
                              <div className="h-2 bg-gray-300 rounded w-full"></div>
                              <div className="h-2 bg-gray-300 rounded w-full"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            localSettings.viewMode === 'detail' 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => updateSettings({ viewMode: 'detail' })}
                        >
                          <span className="font-medium">List + Detail</span>
                          <p className="text-sm text-gray-600 mt-1">Left sidebar list with right detail panel</p>
                          <div className="mt-3 bg-gray-100 rounded p-2 flex gap-1">
                            <div className="w-1/3 space-y-1">
                              <div className="h-1 bg-gray-300 rounded"></div>
                              <div className="h-1 bg-gray-300 rounded"></div>
                              <div className="h-1 bg-gray-300 rounded"></div>
                            </div>
                            <div className="flex-1 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {/* Email Preferences Tab */}
                {activeTab === 'email' && (
                  <>
                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Signature</h3>
                      <textarea
                        value={localSettings.signature}
                        onChange={(e) => updateSettings({ signature: e.target.value })}
                        placeholder="Enter your email signature..."
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                      <p className="text-sm text-gray-500 mt-2">This signature will be automatically added to your outgoing emails.</p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vacation Message</h3>
                      <textarea
                        value={localSettings.vacationMessage}
                        onChange={(e) => updateSettings({ vacationMessage: e.target.value })}
                        placeholder="Enter your vacation auto-reply message..."
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                      <p className="text-sm text-gray-500 mt-2">This message will be sent automatically when vacation mode is enabled.</p>
                    </section>
                  </>
                )}

                {/* AI Assistant Tab */}
                {activeTab === 'ai' && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Bot size={20} />
                      AI Assistant Personality
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <User size={16} />
                          General Knowledge & Background
                        </label>
                        <textarea
                          value={localSettings.aiPersonality.knowledge}
                          onChange={(e) => updateAIPersonality({ knowledge: e.target.value })}
                          placeholder="Tell the AI about your expertise, interests, and general background..."
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Character & Communication Style
                        </label>
                        <textarea
                          value={localSettings.aiPersonality.character}
                          onChange={(e) => updateAIPersonality({ character: e.target.value })}
                          placeholder="Describe your preferred communication style, tone, and personality traits..."
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Briefcase size={16} />
                          Career Journey & Current Position
                        </label>
                        <textarea
                          value={localSettings.aiPersonality.careerJourney}
                          onChange={(e) => updateAIPersonality({ careerJourney: e.target.value })}
                          placeholder="Share your career path, current role, and professional goals..."
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Inbox Expectations & Priorities
                        </label>
                        <textarea
                          value={localSettings.aiPersonality.inboxExpectations}
                          onChange={(e) => updateAIPersonality({ inboxExpectations: e.target.value })}
                          placeholder="What do you expect from your inbox? What types of emails are most important to you?"
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      This information helps the AI assistant provide more personalized and relevant suggestions for your emails.
                    </p>
                  </section>
                )}

                {/* Developer Tab */}
                {activeTab === 'developer' && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Code size={20} />
                      Developer Settings
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Developer Mode</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            When enabled, uses mock data instead of real IMAP connections. 
                            Turn off for production email functionality.
                          </p>
                        </div>
                        <button
                          onClick={() => updateSettings({ developerMode: !localSettings.developerMode })}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            localSettings.developerMode
                              ? 'bg-yellow-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {localSettings.developerMode ? (
                            <>
                              <ToggleRight size={20} />
                              <span>ON</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft size={20} />
                              <span>OFF</span>
                            </>
                          )}
                        </button>
                      </div>

                      {!localSettings.developerMode && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-2">Production Mode Active</h4>
                          <p className="text-sm text-green-700">
                            Real IMAP email fetching is enabled. Make sure your email settings are configured correctly.
                          </p>
                        </div>
                      )}

                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Debug Information</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Layout: {localSettings.emailLayout}</div>
                          <div>View Mode: {localSettings.viewMode}</div>
                          <div>Developer Mode: {localSettings.developerMode ? 'Enabled' : 'Disabled'}</div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}