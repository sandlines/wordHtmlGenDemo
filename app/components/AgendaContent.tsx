'use client'

import React from 'react'
import { Plus, X, GripVertical, FileText } from 'lucide-react'
import RichTextEditor from './RichTextEditor'

interface AgendaItem {
  id: number
  prefix: string
  number: string
  title: string
  presenter?: string
  description?: string
  documents?: string[]
  type?: 'presentation' | 'hearing' | 'action' | 'discussion'
}

interface AgendaSection {
  id: number
  type: 'section' | 'break'
  number?: string
  title: string
  items?: AgendaItem[]
}

interface MeetingData {
  city_name: string
  meeting_type: string
  meeting_date: string
  meeting_time: string
  location: string
  address: string
  council_members: string
  staff_list: string
  agenda_sections: AgendaSection[]
  font_settings: {
    document_font: string
    heading_font: string
    font_size: number
    heading_size: number
    margin_top: number
    margin_bottom: number
    margin_left: number
    margin_right: number
  }
}

interface AgendaContentProps {
  meetingData: MeetingData
  isEditMode: boolean
  updateAgendaItem: (sectionId: number, itemId: number, updates: Partial<AgendaItem>) => void
  updateSectionTitle: (sectionId: number, title: string) => void
  removeAgendaItem: (sectionId: number, itemId: number) => void
  addAgendaItem: (sectionId: number) => void
  addSection: () => void
  addSectionBreak: () => void
  setMeetingData: (data: MeetingData) => void
}

export default function AgendaContent({
  meetingData,
  isEditMode,
  updateAgendaItem,
  updateSectionTitle,
  removeAgendaItem,
  addAgendaItem,
  addSection,
  addSectionBreak,
  setMeetingData
}: AgendaContentProps) {
  return (
    <div>
      {/* Meeting Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {meetingData.city_name}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {meetingData.meeting_type}
        </h2>
        <p className="text-gray-600 mb-1">
          {meetingData.meeting_date} at {meetingData.meeting_time}
        </p>
        <p className="text-gray-600">
          {meetingData.location}
        </p>
      </div>

      {/* Public Participation */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Public Participation Instructions
        </h3>
        <p className="text-gray-600">
          Members of the public wishing to comment may do so in person or via Zoom.
        </p>
      </div>

      {/* Agenda Sections */}
      <div className="space-y-8">
        {meetingData.agenda_sections.map((section) => (
          <div key={section.id}>
            {section.type === 'break' ? (
              <div className="section-break">
                <div className="section-break-line"></div>
                <div className="section-break-text">
                  {isEditMode ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        className="text-center text-gray-500 font-medium bg-transparent border-b border-gray-300 focus:border-violet-500 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const updatedSections = meetingData.agenda_sections.filter(s => s.id !== section.id)
                          setMeetingData({ ...meetingData, agenda_sections: updatedSections })
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    section.title
                  )}
                </div>
                <div className="section-break-line"></div>
              </div>
            ) : (
              <div>
                {isEditMode ? (
                  <div className="mb-6 flex items-center space-x-2">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      className="text-lg font-semibold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-violet-500 focus:outline-none flex-1"
                    />
                    <button
                      onClick={() => {
                        const updatedSections = meetingData.agenda_sections.filter(s => s.id !== section.id)
                        setMeetingData({ ...meetingData, agenda_sections: updatedSections })
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {section.title}
                  </h3>
                )}
                
                {section.items && section.items.length > 0 && (
                  <div className="space-y-8">
                    {section.items.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3 flex-1">
                                <span className="text-sm font-medium text-gray-900">
                                  Item {item.prefix}:
                                </span>
                                {isEditMode ? (
                                  <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateAgendaItem(section.id, item.id, { title: e.target.value })}
                                    className="text-base font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-violet-500 focus:outline-none flex-1"
                                  />
                                ) : (
                                  <span className="text-base font-semibold text-gray-900">
                                    {item.title}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {item.type && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                    item.type === 'presentation' ? 'bg-blue-100 text-blue-800' :
                                    item.type === 'hearing' ? 'bg-red-100 text-red-800' :
                                    item.type === 'action' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                  </span>
                                )}
                                {isEditMode && (
                                  <button
                                    onClick={() => removeAgendaItem(section.id, item.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Description - Rich Text */}
                              <div className="mb-4">
                              <label className="text-sm font-medium text-gray-700 block mb-2">
                                  Description:
                                </label>
                              <RichTextEditor
                                content={item.description || { type: 'doc', content: [] }}
                                onChange={(content) => updateAgendaItem(section.id, item.id, { description: content })}
                                editable={isEditMode}
                                  placeholder="Enter item description..."
                                minimal={true}
                                />
                              </div>
                            
                            {/* Presenter */}
                            {isEditMode ? (
                              <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                  Presenter:
                                </label>
                                <input
                                  type="text"
                                  value={item.presenter || ''}
                                  onChange={(e) => updateAgendaItem(section.id, item.id, { presenter: e.target.value })}
                                  className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded p-2 focus:border-violet-500 focus:outline-none"
                                  placeholder="Enter presenter name..."
                                />
                              </div>
                            ) : (
                              item.presenter && (
                                <div className="mb-4">
                                  <span className="text-sm font-medium text-gray-700">
                                    Presenter:
                                  </span>
                                  <span className="text-sm text-gray-600 ml-2">
                                    {item.presenter}
                                  </span>
                                </div>
                              )
                            )}
                            
                            {/* Type selector in edit mode */}
                            {isEditMode && (
                              <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                  Type:
                                </label>
                                <select
                                  value={item.type || 'discussion'}
                                  onChange={(e) => updateAgendaItem(section.id, item.id, { type: e.target.value as any })}
                                  className="text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded p-2 focus:border-violet-500 focus:outline-none"
                                >
                                  <option value="discussion">Discussion</option>
                                  <option value="presentation">Presentation</option>
                                  <option value="hearing">Hearing</option>
                                  <option value="action">Action</option>
                                </select>
                              </div>
                            )}
                            
                            {/* Supporting Documents */}
                            {isEditMode ? (
                              <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                  Supporting Documents (one per line):
                                </label>
                                <textarea
                                  value={item.documents?.join('\n') || ''}
                                  onChange={(e) => updateAgendaItem(section.id, item.id, { 
                                    documents: e.target.value.split('\n').filter(doc => doc.trim() !== '') 
                                  })}
                                  className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded p-2 focus:border-violet-500 focus:outline-none"
                                  rows={3}
                                  placeholder="Enter document names, one per line..."
                                />
                              </div>
                            ) : (
                              item.documents && item.documents.length > 0 && (
                                <div>
                                  <span className="text-sm font-medium text-gray-700 mb-3 block">
                                    Supporting Documents
                                  </span>
                                  <div className="flex flex-wrap gap-3">
                                    {item.documents.map((doc, index) => (
                                      <button
                                        key={index}
                                        className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
                                      >
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {doc}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Item button for this section */}
                {isEditMode && (
                  <div className="mt-4">
                    <button
                      onClick={() => addAgendaItem(section.id)}
                      className="btn btn-secondary"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item to {section.title}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Mode Controls */}
      {isEditMode && (
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Content
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={addSection}
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </button>
            <button
              onClick={addSectionBreak}
              className="btn btn-secondary"
            >
              <GripVertical className="w-4 h-4 mr-2" />
              Add Section Break
            </button>
          </div>
        </div>
      )}

      {/* Council Comments Section */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Council Comments
        </h3>
        <div className="text-sm text-gray-600">
          <p>Space for council member comments and discussion.</p>
        </div>
      </div>
    </div>
  )
} 