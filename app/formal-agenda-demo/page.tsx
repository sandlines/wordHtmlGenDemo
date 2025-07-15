'use client'

import { useState, useEffect } from 'react'
import FormalAgendaTemplate, { dublinSampleData, sausalitSampleData } from '../components/FormalAgendaTemplate'
import AdvancedTemplateDesigner, { defaultCityCouncilTemplate } from '../components/AdvancedTemplateDesigner'

export default function FormalAgendaDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState<'dublin' | 'sausalito'>('dublin')
  const [mode, setMode] = useState<'template-design' | 'advanced-design' | 'content-edit' | 'preview'>('preview')
  const [agendaData, setAgendaData] = useState(dublinSampleData)
  const [templateDesign, setTemplateDesign] = useState(defaultCityCouncilTemplate)

  // Check URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const modeParam = urlParams.get('mode')
    if (modeParam === 'advanced-design') {
      setMode('advanced-design')
    }
  }, [])

  const switchTemplate = (template: 'dublin' | 'sausalito') => {
    setSelectedTemplate(template)
    setAgendaData(template === 'dublin' ? dublinSampleData : sausalitSampleData)
  }

  const addAgendaItem = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "New Agenda Item",
      description: {
        type: "doc",
        content: "<p>Enter agenda item description...</p>"
      },
      timeEstimate: "5 minutes",
      type: 'discussion' as const
    }
    
    setAgendaData(prev => ({
      ...prev,
      agendaItems: [...prev.agendaItems, newItem]
    }))
  }

  const generatePDF = async () => {
    try {
      // Convert the agenda data to HTML for PDF generation
      const htmlContent = document.getElementById('agenda-preview')?.innerHTML || ''
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          title: `${agendaData.template.city} City Council Agenda - ${agendaData.meeting.date}`
        }),
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${agendaData.template.city}_agenda_${agendaData.meeting.date.replace(/[,\s]/g, '_')}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to generate PDF')
      }
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('Failed to generate PDF')
    }
  }

  // If in advanced template design mode, show the designer
  if (mode === 'advanced-design') {
    return (
      <AdvancedTemplateDesigner
        initialTemplate={templateDesign}
        onSave={(template) => {
          setTemplateDesign(template)
          console.log('Template saved:', template)
        }}
        onPreview={(template) => {
          setTemplateDesign(template)
          setMode('preview')
        }}
        mode="visual"
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Controls */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Formal City Council Agenda System
              </h1>
              <p className="text-gray-600 mt-1">
                Complete template system with advanced structural editing
              </p>
            </div>
            
            <div className="flex space-x-4">
              {/* Template Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => switchTemplate('dublin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    selectedTemplate === 'dublin'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dublin Style
                </button>
                <button
                  onClick={() => switchTemplate('sausalito')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    selectedTemplate === 'sausalito'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sausalito Style
                </button>
              </div>

              {/* Mode Selector */}
              <div className="flex bg-blue-100 rounded-lg p-1">
                <button
                  onClick={() => setMode('template-design')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    mode === 'template-design'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  Basic Design
                </button>
                <button
                  onClick={() => setMode('advanced-design')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    mode === 'advanced-design'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-purple-700 hover:text-purple-900'
                  }`}
                >
                  Advanced Design
                </button>
                <button
                  onClick={() => setMode('content-edit')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    mode === 'content-edit'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setMode('preview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    mode === 'preview'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  Preview
                </button>
              </div>

              <button
                onClick={generatePDF}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Descriptions */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          {mode === 'template-design' && (
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Basic Template Design Mode</h3>
              <p className="text-blue-800 text-sm">
                Customize basic template elements like city name, colors, and layout. This mode allows simple template customization.
              </p>
            </div>
          )}
          {mode === 'advanced-design' && (
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">Advanced Template Design Mode</h3>
              <p className="text-purple-800 text-sm">
                Complete structural template editor. Modify layout sections, styling, typography, spacing, and even the JSON schema. 
                Visual editor with code view for full control over template structure.
              </p>
            </div>
          )}
          {mode === 'content-edit' && (
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Content Edit Mode</h3>
              <p className="text-blue-800 text-sm">
                Edit meeting details, procedures, and agenda items using rich text editing. 
                This is where city clerks would populate the agenda with specific meeting information.
              </p>
            </div>
          )}
          {mode === 'preview' && (
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Preview Mode</h3>
              <p className="text-blue-800 text-sm">
                View the complete agenda exactly as it will appear in the PDF. 
                This matches the final output for review before publication.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content Editing Controls */}
      {mode === 'content-edit' && (
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="flex space-x-4">
              <button
                onClick={addAgendaItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add Agenda Item
              </button>
              <button
                onClick={() => {
                  const newDate = prompt('Enter new meeting date:', agendaData.meeting.date)
                  if (newDate) {
                    setAgendaData(prev => ({
                      ...prev,
                      meeting: { ...prev.meeting, date: newDate }
                    }))
                  }
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Change Date
              </button>
              <button
                onClick={() => {
                  const newTime = prompt('Enter new meeting time:', agendaData.meeting.time)
                  if (newTime) {
                    setAgendaData(prev => ({
                      ...prev,
                      meeting: { ...prev.meeting, time: newTime }
                    }))
                  }
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Change Time
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Design Controls */}
      {mode === 'template-design' && (
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
            <h3 className="font-semibold mb-4">Template Customization</h3>
            <div className="mb-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-900">Need More Control?</h4>
                    <p className="text-sm text-purple-700">Use Advanced Design mode for complete structural editing</p>
                  </div>
                  <button
                    onClick={() => setMode('advanced-design')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                  >
                    Advanced Designer
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City Name
                </label>
                <input
                  type="text"
                  value={agendaData.template.city}
                  onChange={(e) => setAgendaData(prev => ({
                    ...prev,
                    template: { ...prev.template, city: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  value={agendaData.template.state}
                  onChange={(e) => setAgendaData(prev => ({
                    ...prev,
                    template: { ...prev.template, state: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={agendaData.template.styling.primaryColor}
                  onChange={(e) => setAgendaData(prev => ({
                    ...prev,
                    template: { 
                      ...prev.template, 
                      styling: { ...prev.template.styling, primaryColor: e.target.value }
                    }
                  }))}
                  className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg" id="agenda-preview">
          <FormalAgendaTemplate
            data={agendaData}
            onChange={setAgendaData}
            mode={mode}
          />
        </div>
      </div>

      {/* Advanced Features Info */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">🚀 Advanced Template Designer Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">🏗️ Structure Editor</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Visual section tree</li>
                <li>• Drag & drop reordering</li>
                <li>• Add/remove sections</li>
                <li>• Nested layouts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">🎨 Visual Styling</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Typography controls</li>
                <li>• Color palette editor</li>
                <li>• Spacing & layout</li>
                <li>• CSS class editor</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-300 mb-2">⚡ Live Editing</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Visual + Code modes</li>
                <li>• Real-time preview</li>
                <li>• JSON schema editor</li>
                <li>• Direct HTML editing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-300 mb-2">🔧 Professional Tools</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Export templates</li>
                <li>• Version control</li>
                <li>• Multi-format output</li>
                <li>• Template library</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-black bg-opacity-30 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Pro Tip:</h4>
            <p className="text-sm">
              Click "Advanced Design" mode to access the full template designer where you can modify 
              every aspect of the template structure, create custom layouts, and even edit the underlying JSON schema.
            </p>
          </div>
        </div>
      </div>

      {/* Data Structure Viewer */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Current Template Data</h3>
            <p className="text-sm text-gray-600 mt-1">
              This structured data drives the template rendering
            </p>
          </div>
          <div className="p-4">
            <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto max-h-64">
              {JSON.stringify({ agendaData, templateDesign }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 