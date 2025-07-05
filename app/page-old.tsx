'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users, FileText, Download, Edit3, Eye, Plus, X, GripVertical, MoreHorizontal, Minus } from 'lucide-react'
import AgendaContent from './components/AgendaContent'

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

interface FontSettings {
  document_font: string
  heading_font: string
  font_size: number
  heading_size: number
  margin_top: number
  margin_bottom: number
  margin_left: number
  margin_right: number
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
  font_settings: FontSettings
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'agenda' | 'packet' | 'comments' | 'minutes'>('agenda')
  const [viewMode, setViewMode] = useState<'web' | 'pdf' | 'side-by-side'>('web')
  const [meetingData, setMeetingData] = useState<MeetingData>({
    city_name: 'City of Sausalito',
    meeting_type: 'City Council Regular Meeting',
    meeting_date: 'May 15, 2025',
    meeting_time: '6:00 PM',
    location: 'City Hall Council Chambers',
    address: '420 Litho Street, Sausalito, CA 94965',
    council_members: 'Mayor Ian Sobieski\nVice Mayor Joan Cox\nCouncilmember Bill Mertens\nCouncilmember Melissa Blaustein\nCouncilmember Steven Woodside',
    staff_list: 'City Manager Chris Zapata\nCity Attorney Sergio Rudin\nCity Clerk Heidi Scoble',
    agenda_sections: [
      {
        id: 1,
        type: 'section',
        number: 'I',
        title: 'Call to Order',
        items: []
      },
      {
        id: 2,
        type: 'section',
        number: 'II',
        title: 'Roll Call',
        items: []
      },
      {
        id: 3,
        type: 'section',
        number: 'III',
        title: 'Approval of Minutes',
        items: []
      },
      {
        id: 4,
        type: 'section',
        number: 'IV',
        title: 'Regular Agenda',
        items: [
          {
            id: 1,
            prefix: '1',
            number: '',
            title: 'Downtown Revitalization Project Update',
            presenter: 'Jane Smith, Economic Development Director',
            description: 'Staff will present an update on the ongoing downtown revitalization project.',
            documents: ['Staff Report', 'Project Timeline'],
            type: 'presentation'
          },
          {
            id: 2,
            prefix: '2',
            number: '',
            title: 'Public Hearing on Zoning Amendment',
            presenter: 'David Johnson, Planning Director',
            description: 'Public hearing and possible action on proposed amendments to zoning ordinance.',
            documents: ['Ordinance Draft', 'Planning Commission Recommendation'],
            type: 'hearing'
          }
        ]
      },
      {
        id: 5,
        type: 'section',
        number: 'V',
        title: 'Council Comments',
        items: []
      }
    ],
    font_settings: {
      document_font: 'Times New Roman',
      heading_font: 'Times New Roman',
      font_size: 12,
      heading_size: 18,
      margin_top: 1,
      margin_bottom: 1,
      margin_left: 1,
      margin_right: 1
    }
  })

  const [isEditMode, setIsEditMode] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // Clear PDF URL when data changes to ensure fresh generation
  useEffect(() => {
    if (pdfUrl) {
      window.URL.revokeObjectURL(pdfUrl)
      setPdfUrl(null)
    }
  }, [meetingData])

  const addAgendaItem = (sectionId: number) => {
    const section = meetingData.agenda_sections.find(s => s.id === sectionId)
    if (section && section.type === 'section') {
      const newItem: AgendaItem = {
        id: Date.now(),
        prefix: String(section.items?.length ? section.items.length + 1 : 1),
        number: '',
        title: 'New Agenda Item',
        type: 'discussion'
      }
      
      const updatedSections = meetingData.agenda_sections.map(s => 
        s.id === sectionId 
          ? { ...s, items: [...(s.items || []), newItem] }
          : s
      )
      
      setMeetingData({ ...meetingData, agenda_sections: updatedSections })
    }
  }

  const updateAgendaItem = (sectionId: number, itemId: number, updates: Partial<AgendaItem>) => {
    const updatedSections = meetingData.agenda_sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items?.map(item => 
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : section
    )
    
    setMeetingData({ ...meetingData, agenda_sections: updatedSections })
  }

  const updateSectionTitle = (sectionId: number, title: string) => {
    const updatedSections = meetingData.agenda_sections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    )
    
    setMeetingData({ ...meetingData, agenda_sections: updatedSections })
  }

  const removeAgendaItem = (sectionId: number, itemId: number) => {
    const updatedSections = meetingData.agenda_sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items?.filter(item => item.id !== itemId)
          }
        : section
    )
    
    setMeetingData({ ...meetingData, agenda_sections: updatedSections })
  }

  const addSection = () => {
    const newSection: AgendaSection = {
      id: Date.now(),
      type: 'section',
      number: String(meetingData.agenda_sections.length + 1),
      title: 'New Section',
      items: []
    }
    
    setMeetingData({
      ...meetingData,
      agenda_sections: [...meetingData.agenda_sections, newSection]
    })
  }

  const addSectionBreak = () => {
    const newBreak: AgendaSection = {
      id: Date.now(),
      type: 'break',
      title: '────────────────────────────────────────'
    }
    
    setMeetingData({
      ...meetingData,
      agenda_sections: [...meetingData.agenda_sections, newBreak]
    })
  }

  const generatePDF = async (forView = false) => {
    setIsGeneratingPdf(true)
    try {
      // Transform data to match the backend API format
      const apiData = {
        city_name: meetingData.city_name,
        meeting_type: meetingData.meeting_type,
        meeting_date: meetingData.meeting_date,
        address: meetingData.address,
        department_name: "Administration Department",
        department_phone: "(415) 289-4199",
        department_email: "clerk@sausalito.gov",
        special_time: "6:00 PM",
        regular_time: meetingData.meeting_time,
        zoom_url: "https://us02web.zoom.us/j/123456789",
        zoom_passcode: "123456",
        zoom_phone: "+1 669 900 6833, +1 669 444 9171",
        council_members: meetingData.council_members,
        staff_list: meetingData.staff_list,
        agenda_sections: meetingData.agenda_sections.map(section => ({
          id: section.id,
          type: section.type,
          number: section.number,
          title: section.title,
          items: section.items || []
        })),
        font_settings: meetingData.font_settings
      }

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        
        if (forView) {
          // For PDF view, set the URL to display in iframe
          if (pdfUrl) {
            window.URL.revokeObjectURL(pdfUrl)
          }
          setPdfUrl(url)
        } else {
          // For download, create download link
          const a = document.createElement('a')
          a.href = url
          a.download = `agenda_${meetingData.meeting_date.replace(/,?\s+/g, '_')}.pdf`
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }
      } else {
        throw new Error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('Failed to generate PDF. Please check your connection and try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleViewModeChange = (mode: 'web' | 'pdf' | 'side-by-side') => {
    setViewMode(mode)
    if ((mode === 'pdf' || mode === 'side-by-side') && !pdfUrl) {
      generatePDF(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {meetingData.meeting_type}
                </h1>
                <span className="text-xs text-gray-500">
                  ID: MTG-2025-0123
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.953 8.953 0 01-2.172-.214l-3.425 1.03c-.584.175-1.186-.262-1.011-.847l1.03-3.425A8.953 8.953 0 014 12C4 7.582 7.582 4 12 4s8 3.582 8 8z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 3h16a1 1 0 011 1v9H3V4a1 1 0 011-1z" />
                </svg>
              </button>
              <button className="btn btn-purple">
                Review
              </button>
              <button
                onClick={() => generatePDF(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Sidebar */}
          <div className="lg:col-span-1 bg-gray-50 border-r border-gray-200 min-h-screen">
            <div className="p-6 sticky top-14">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-medium text-gray-900">Meeting Details</h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Upcoming
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                      {meetingData.meeting_date}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-3 text-gray-400" />
                      {meetingData.meeting_time}
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                      <div>
                        <div>{meetingData.location}</div>
                        <div className="text-xs text-gray-500 mt-1">{meetingData.address}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-3 text-gray-400 inline" />
                      City Clerk
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Participants</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {meetingData.council_members.split('\n').slice(0,3).map((member, index) => (
                      <div key={index}>
                        {member}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                  <p className="text-sm text-gray-600">
                    Regular meeting of the City Council to discuss city business and vote on agenda items.
                  </p>
                </div>

                {/* Edit Mode Toggle */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`w-full btn ${isEditMode ? 'btn-active' : 'btn-secondary'}`}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditMode ? 'Exit Edit Mode' : 'Edit Template'}
                  </button>
                </div>

                {/* Editable Meeting Details */}
                {isEditMode && (
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Edit Meeting Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="label">City Name</label>
                        <input
                          type="text"
                          value={meetingData.city_name}
                          onChange={(e) => setMeetingData({...meetingData, city_name: e.target.value})}
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="label">Meeting Type</label>
                        <input
                          type="text"
                          value={meetingData.meeting_type}
                          onChange={(e) => setMeetingData({...meetingData, meeting_type: e.target.value})}
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="label">Date</label>
                        <input
                          type="text"
                          value={meetingData.meeting_date}
                          onChange={(e) => setMeetingData({...meetingData, meeting_date: e.target.value})}
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="label">Time</label>
                        <input
                          type="text"
                          value={meetingData.meeting_time}
                          onChange={(e) => setMeetingData({...meetingData, meeting_time: e.target.value})}
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="label">Location</label>
                        <input
                          type="text"
                          value={meetingData.location}
                          onChange={(e) => setMeetingData({...meetingData, location: e.target.value})}
                          className="input"
                        />
                      </div>
                                              <div>
                          <label className="label">Address</label>
                          <input
                            type="text"
                            value={meetingData.address}
                            onChange={(e) => setMeetingData({...meetingData, address: e.target.value})}
                            className="input"
                          />
                        </div>
                        <div>
                          <label className="label">Council Members (one per line)</label>
                          <textarea
                            value={meetingData.council_members}
                            onChange={(e) => setMeetingData({...meetingData, council_members: e.target.value})}
                            className="input"
                            rows={5}
                          />
                        </div>
                        <div>
                          <label className="label">Staff List (one per line)</label>
                          <textarea
                            value={meetingData.staff_list}
                            onChange={(e) => setMeetingData({...meetingData, staff_list: e.target.value})}
                            className="input"
                            rows={3}
                                                    />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Font and Layout Settings */}
                  {isEditMode && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Font & Layout Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Document Font</label>
                          <select
                            value={meetingData.font_settings.document_font}
                            onChange={(e) => setMeetingData({
                              ...meetingData,
                              font_settings: { ...meetingData.font_settings, document_font: e.target.value }
                            })}
                            className="input"
                          >
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Arial">Arial</option>
                            <option value="Calibri">Calibri</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Book Antiqua">Book Antiqua</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Palatino">Palatino</option>
                          </select>
                        </div>
                        <div>
                          <label className="label">Heading Font</label>
                          <select
                            value={meetingData.font_settings.heading_font}
                            onChange={(e) => setMeetingData({
                              ...meetingData,
                              font_settings: { ...meetingData.font_settings, heading_font: e.target.value }
                            })}
                            className="input"
                          >
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Arial">Arial</option>
                            <option value="Calibri">Calibri</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Book Antiqua">Book Antiqua</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Palatino">Palatino</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="label">Font Size</label>
                            <select
                              value={meetingData.font_settings.font_size}
                              onChange={(e) => setMeetingData({
                                ...meetingData,
                                font_settings: { ...meetingData.font_settings, font_size: parseInt(e.target.value) }
                              })}
                              className="input"
                            >
                              {[10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24].map(size => (
                                <option key={size} value={size}>{size}pt</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="label">Heading Size</label>
                            <select
                              value={meetingData.font_settings.heading_size}
                              onChange={(e) => setMeetingData({
                                ...meetingData,
                                font_settings: { ...meetingData.font_settings, heading_size: parseInt(e.target.value) }
                              })}
                              className="input"
                            >
                              {[14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36].map(size => (
                                <option key={size} value={size}>{size}pt</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="label">Margins (inches)</label>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-gray-600">Top</label>
                              <input
                                type="number"
                                min="0.5"
                                max="3"
                                step="0.1"
                                value={meetingData.font_settings.margin_top}
                                onChange={(e) => setMeetingData({
                                  ...meetingData,
                                  font_settings: { ...meetingData.font_settings, margin_top: parseFloat(e.target.value) }
                                })}
                                className="input text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600">Bottom</label>
                              <input
                                type="number"
                                min="0.5"
                                max="3"
                                step="0.1"
                                value={meetingData.font_settings.margin_bottom}
                                onChange={(e) => setMeetingData({
                                  ...meetingData,
                                  font_settings: { ...meetingData.font_settings, margin_bottom: parseFloat(e.target.value) }
                                })}
                                className="input text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600">Left</label>
                              <input
                                type="number"
                                min="0.5"
                                max="3"
                                step="0.1"
                                value={meetingData.font_settings.margin_left}
                                onChange={(e) => setMeetingData({
                                  ...meetingData,
                                  font_settings: { ...meetingData.font_settings, margin_left: parseFloat(e.target.value) }
                                })}
                                className="input text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600">Right</label>
                              <input
                                type="number"
                                min="0.5"
                                max="3"
                                step="0.1"
                                value={meetingData.font_settings.margin_right}
                                onChange={(e) => setMeetingData({
                                  ...meetingData,
                                  font_settings: { ...meetingData.font_settings, margin_right: parseFloat(e.target.value) }
                                })}
                                className="input text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                        </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 bg-white">
            {/* Top Bar with Date and View Toggles */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="text-sm font-medium text-gray-900">May 13, 2025 Final</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewModeChange('web')}
                  className={`btn ${viewMode === 'web' ? 'btn-active' : 'btn-secondary'}`}
                >
                  Web View
                </button>
                <button
                  onClick={() => handleViewModeChange('pdf')}
                  className={`btn ${viewMode === 'pdf' ? 'btn-active' : 'btn-secondary'} ${isGeneratingPdf ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isGeneratingPdf}
                >
                  {isGeneratingPdf ? 'Generating...' : 'PDF View'}
                </button>
                <button
                  onClick={() => handleViewModeChange('side-by-side')}
                  className={`btn ${viewMode === 'side-by-side' ? 'btn-active' : 'btn-secondary'} ${isGeneratingPdf ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isGeneratingPdf}
                >
                  Side by Side
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'agenda', label: 'Agenda' },
                  { key: 'packet', label: 'Packet' },
                  { key: 'comments', label: 'Public Comments' },
                  { key: 'minutes', label: 'Minutes' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`tab-button ${
                      activeTab === key ? 'tab-active' : 'tab-inactive'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Agenda Content */}
            {activeTab === 'agenda' && (
              <div className={`${viewMode === 'side-by-side' ? 'flex h-screen' : 'px-6 py-6'}`}>
                {viewMode === 'side-by-side' ? (
                  <>
                    {/* Left Side - Web View */}
                    <div className="w-1/2 px-6 py-6 overflow-y-auto border-r border-gray-200">
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
                                      
                                      {/* Description */}
                                      {isEditMode ? (
                                        <div className="mb-4">
                                          <label className="text-sm font-medium text-gray-700 block mb-1">
                                            Description:
                                          </label>
                                          <textarea
                                            value={item.description || ''}
                                            onChange={(e) => updateAgendaItem(section.id, item.id, { description: e.target.value })}
                                            className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded p-2 focus:border-violet-500 focus:outline-none"
                                            rows={2}
                                            placeholder="Enter item description..."
                                          />
                                        </div>
                                      ) : (
                                        item.description && (
                                          <p className="text-sm text-gray-600 mb-4">
                                            {item.description}
                                          </p>
                                        )
                                      )}
                                      
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
                  <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
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
                      </div>
                    </div>
                    
                    {/* Right Side - PDF View */}
                    <div className="w-1/2 bg-gray-50">
                      {isGeneratingPdf ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Generating PDF...</p>
                          </div>
                        </div>
                      ) : pdfUrl ? (
                        <iframe
                          src={pdfUrl}
                          className="w-full h-full border-0"
                          title="PDF Preview"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">PDF will appear here</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : viewMode === 'web' ? (
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
                                          
                                          {/* Description */}
                                          {isEditMode ? (
                                            <div className="mb-4">
                                              <label className="text-sm font-medium text-gray-700 block mb-1">
                                                Description:
                                              </label>
                                              <textarea
                                                value={item.description || ''}
                                                onChange={(e) => updateAgendaItem(section.id, item.id, { description: e.target.value })}
                                                className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-300 rounded p-2 focus:border-violet-500 focus:outline-none"
                                                rows={2}
                                                placeholder="Enter item description..."
                                              />
                                            </div>
                                          ) : (
                                            item.description && (
                                              <p className="text-sm text-gray-600 mb-4">
                                                {item.description}
                                              </p>
                                            )
                                          )}
                                          
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
                ) : (
                  <div className="h-screen">
                    {isGeneratingPdf ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
                          <p className="text-gray-600">Generating PDF...</p>
                        </div>
                      </div>
                    ) : pdfUrl ? (
                      <iframe
                        src={pdfUrl}
                        className="w-full h-full border-0"
                        title="PDF Preview"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Click "PDF View" to generate and view the PDF</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Other tabs content */}
            {activeTab !== 'agenda' && (
              <div className="px-6 py-12 text-center">
                <div className="max-w-md mx-auto">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} View
                  </h3>
                  <p className="text-gray-600">
                    This section is coming soon. Content will be available in a future update.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 