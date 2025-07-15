'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Plus, Trash2, Edit, Save, Eye, Code, Palette, Layout, Type, Maximize } from 'lucide-react'
import RichTextEditor from './RichTextEditor'

// Template structure types
interface TemplateSection {
  id: string
  type: 'header' | 'content' | 'footer' | 'grid' | 'list' | 'custom'
  name: string
  className: string
  style: Record<string, any>
  children?: TemplateSection[]
  content?: any
  visible: boolean
  order: number
}

interface TemplateDesign {
  id: string
  name: string
  description: string
  layout: 'single-column' | 'two-column' | 'three-column' | 'custom'
  styling: {
    fonts: {
      primary: string
      secondary: string
      heading: string
    }
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      text: string
      border: string
    }
    spacing: {
      section: string
      paragraph: string
      margin: string
      padding: string
    }
    borders: {
      width: string
      style: string
      radius: string
    }
    pageSize: 'letter' | 'a4' | 'legal'
    orientation: 'portrait' | 'landscape'
  }
  sections: TemplateSection[]
  dataSchema: Record<string, any>
}

interface AdvancedTemplateDesignerProps {
  initialTemplate: TemplateDesign
  onSave: (template: TemplateDesign) => void
  onPreview: (template: TemplateDesign) => void
  mode: 'visual' | 'code' | 'split'
}

export default function AdvancedTemplateDesigner({
  initialTemplate,
  onSave,
  onPreview,
  mode: initialMode = 'visual'
}: AdvancedTemplateDesignerProps) {
  const [template, setTemplate] = useState<TemplateDesign>(initialTemplate)
  const [mode, setMode] = useState<'visual' | 'code' | 'split'>(initialMode)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'structure' | 'styling' | 'data'>('structure')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const updateTemplate = (updates: Partial<TemplateDesign>) => {
    setTemplate(prev => ({ ...prev, ...updates }))
  }

  const updateSection = (sectionId: string, updates: Partial<TemplateSection>) => {
    const updateSectionRecursive = (sections: TemplateSection[]): TemplateSection[] => {
      return sections.map(section => {
        if (section.id === sectionId) {
          return { ...section, ...updates }
        }
        if (section.children) {
          return { ...section, children: updateSectionRecursive(section.children) }
        }
        return section
      })
    }
    
    setTemplate(prev => ({
      ...prev,
      sections: updateSectionRecursive(prev.sections)
    }))
  }

  const addSection = (parentId?: string) => {
    const newSection: TemplateSection = {
      id: Date.now().toString(),
      type: 'content',
      name: 'New Section',
      className: 'mb-4',
      style: {},
      visible: true,
      order: 0,
      content: { type: 'doc', content: '<p>New section content</p>' }
    }

    if (parentId) {
      // Add as child
      const updateSectionRecursive = (sections: TemplateSection[]): TemplateSection[] => {
        return sections.map(section => {
          if (section.id === parentId) {
            return {
              ...section,
              children: [...(section.children || []), newSection]
            }
          }
          if (section.children) {
            return { ...section, children: updateSectionRecursive(section.children) }
          }
          return section
        })
      }
      
      setTemplate(prev => ({
        ...prev,
        sections: updateSectionRecursive(prev.sections)
      }))
    } else {
      // Add as top-level section
      setTemplate(prev => ({
        ...prev,
        sections: [...prev.sections, newSection]
      }))
    }
  }

  const deleteSection = (sectionId: string) => {
    const deleteSectionRecursive = (sections: TemplateSection[]): TemplateSection[] => {
      return sections.filter(section => {
        if (section.id === sectionId) return false
        if (section.children) {
          section.children = deleteSectionRecursive(section.children)
        }
        return true
      })
    }
    
    setTemplate(prev => ({
      ...prev,
      sections: deleteSectionRecursive(prev.sections)
    }))
  }

  const toggleExpanded = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const renderSectionTree = (sections: TemplateSection[], depth = 0) => {
    return sections.map(section => (
      <div key={section.id} className="mb-2">
        <div 
          className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
            selectedSection === section.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => setSelectedSection(section.id)}
        >
          {section.children && section.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(section.id)
              }}
              className="mr-2 p-1 hover:bg-gray-200 rounded"
            >
              {expandedSections.has(section.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium">{section.name}</span>
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                {section.type}
              </span>
              {!section.visible && (
                <span className="ml-2 text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                  Hidden
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  addSection(section.id)
                }}
                className="p-1 hover:bg-gray-200 rounded"
                title="Add child section"
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteSection(section.id)
                }}
                className="p-1 hover:bg-red-200 rounded text-red-600"
                title="Delete section"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        
        {section.children && expandedSections.has(section.id) && (
          <div>
            {renderSectionTree(section.children, depth + 1)}
          </div>
        )}
      </div>
    ))
  }

  const renderSectionProperties = () => {
    if (!selectedSection) {
      return (
        <div className="p-4 text-gray-500">
          Select a section to edit its properties
        </div>
      )
    }

    const findSection = (sections: TemplateSection[], id: string): TemplateSection | null => {
      for (const section of sections) {
        if (section.id === id) return section
        if (section.children) {
          const found = findSection(section.children, id)
          if (found) return found
        }
      }
      return null
    }

    const section = findSection(template.sections, selectedSection)
    if (!section) return null

    return (
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Name
          </label>
          <input
            type="text"
            value={section.name}
            onChange={(e) => updateSection(selectedSection, { name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Type
          </label>
          <select
            value={section.type}
            onChange={(e) => updateSection(selectedSection, { type: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="header">Header</option>
            <option value="content">Content</option>
            <option value="footer">Footer</option>
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CSS Classes
          </label>
          <input
            type="text"
            value={section.className}
            onChange={(e) => updateSection(selectedSection, { className: e.target.value })}
            placeholder="mb-4 p-6 border rounded-lg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="visible"
            checked={section.visible}
            onChange={(e) => updateSection(selectedSection, { visible: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="visible" className="text-sm font-medium text-gray-700">
            Visible
          </label>
        </div>

        {section.content && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <RichTextEditor
              content={section.content}
              onChange={(content) => updateSection(selectedSection, { content })}
              placeholder="Enter section content..."
            />
          </div>
        )}
      </div>
    )
  }

  const renderStylingControls = () => (
    <div className="p-4 space-y-6">
      {/* Typography */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Typography
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Font
            </label>
            <select
              value={template.styling.fonts.primary}
              onChange={(e) => updateTemplate({
                styling: {
                  ...template.styling,
                  fonts: { ...template.styling.fonts, primary: e.target.value }
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading Font
            </label>
            <select
              value={template.styling.fonts.heading}
              onChange={(e) => updateTemplate({
                styling: {
                  ...template.styling,
                  fonts: { ...template.styling.fonts, heading: e.target.value }
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Colors
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(template.styling.colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={value}
                  onChange={(e) => updateTemplate({
                    styling: {
                      ...template.styling,
                      colors: { ...template.styling.colors, [key]: e.target.value }
                    }
                  })}
                  className="w-8 h-8 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateTemplate({
                    styling: {
                      ...template.styling,
                      colors: { ...template.styling.colors, [key]: e.target.value }
                    }
                  })}
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center">
          <Maximize className="w-4 h-4 mr-2" />
          Spacing
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(template.styling.spacing).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => updateTemplate({
                  styling: {
                    ...template.styling,
                    spacing: { ...template.styling.spacing, [key]: e.target.value }
                  }
                })}
                placeholder="1rem, 16px, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center">
          <Layout className="w-4 h-4 mr-2" />
          Layout
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Size
            </label>
            <select
              value={template.styling.pageSize}
              onChange={(e) => updateTemplate({
                styling: { ...template.styling, pageSize: e.target.value as any }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="letter">Letter</option>
              <option value="a4">A4</option>
              <option value="legal">Legal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orientation
            </label>
            <select
              value={template.styling.orientation}
              onChange={(e) => updateTemplate({
                styling: { ...template.styling, orientation: e.target.value as any }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCodeEditor = () => (
    <div className="h-full">
      <div className="p-4 border-b">
        <h4 className="font-semibold">Template JSON Schema</h4>
        <p className="text-sm text-gray-600">Edit the template structure directly</p>
      </div>
      <div className="p-4">
        <textarea
          value={JSON.stringify(template, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value)
              setTemplate(parsed)
            } catch (error) {
              // Invalid JSON, don't update
            }
          }}
          className="w-full h-96 font-mono text-sm border border-gray-300 rounded p-2"
          spellCheck={false}
        />
      </div>
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="text-xl font-semibold">Advanced Template Designer</h2>
          <p className="text-sm text-gray-600">{template.name}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Mode Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('visual')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                mode === 'visual' ? 'bg-white shadow' : 'hover:bg-gray-200'
              }`}
            >
              <Layout className="w-4 h-4 inline mr-1" />
              Visual
            </button>
            <button
              onClick={() => setMode('code')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                mode === 'code' ? 'bg-white shadow' : 'hover:bg-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-1" />
              Code
            </button>
            <button
              onClick={() => setMode('split')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                mode === 'split' ? 'bg-white shadow' : 'hover:bg-gray-200'
              }`}
            >
              Split
            </button>
          </div>

          <button
            onClick={() => onPreview(template)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          
          <button
            onClick={() => onSave(template)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {(mode === 'visual' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2' : 'w-full'} flex border-r`}>
            {/* Sidebar */}
            <div className="w-80 border-r bg-gray-50 flex flex-col">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('structure')}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    activeTab === 'structure' 
                      ? 'bg-white border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Structure
                </button>
                <button
                  onClick={() => setActiveTab('styling')}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    activeTab === 'styling' 
                      ? 'bg-white border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Styling
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`flex-1 px-4 py-2 text-sm font-medium ${
                    activeTab === 'data' 
                      ? 'bg-white border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Data
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'structure' && (
                  <div>
                    <div className="p-4 border-b">
                      <button
                        onClick={() => addSection()}
                        className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Section
                      </button>
                    </div>
                    <div className="p-2">
                      {renderSectionTree(template.sections)}
                    </div>
                  </div>
                )}
                
                {activeTab === 'styling' && renderStylingControls()}
                
                {activeTab === 'data' && (
                  <div className="p-4">
                    <h4 className="font-semibold mb-3">Data Schema</h4>
                    <textarea
                      value={JSON.stringify(template.dataSchema, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value)
                          updateTemplate({ dataSchema: parsed })
                        } catch (error) {
                          // Invalid JSON
                        }
                      }}
                      className="w-full h-64 font-mono text-sm border border-gray-300 rounded p-2"
                      placeholder="Define your data schema..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Properties Panel */}
            <div className="w-80 bg-white border-r">
              <div className="p-4 border-b">
                <h4 className="font-semibold">Properties</h4>
              </div>
              <div className="overflow-y-auto">
                {renderSectionProperties()}
              </div>
            </div>
          </div>
        )}

        {(mode === 'code' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2' : 'w-full'} flex flex-col`}>
            {renderCodeEditor()}
          </div>
        )}
      </div>
    </div>
  )
}

// Default template structure for city council agendas
export const defaultCityCouncilTemplate: TemplateDesign = {
  id: 'city-council-default',
  name: 'City Council Agenda Template',
  description: 'Professional city council meeting agenda template',
  layout: 'single-column',
  styling: {
    fonts: {
      primary: 'Inter',
      secondary: 'Inter', 
      heading: 'Inter'
    },
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb'
    },
    spacing: {
      section: '2rem',
      paragraph: '1rem',
      margin: '1.5rem',
      padding: '1rem'
    },
    borders: {
      width: '1px',
      style: 'solid',
      radius: '0.5rem'
    },
    pageSize: 'letter',
    orientation: 'portrait'
  },
  sections: [
    {
      id: 'header',
      type: 'header',
      name: 'Header',
      className: 'text-center mb-8',
      style: {},
      visible: true,
      order: 1,
      children: [
        {
          id: 'city-logo',
          type: 'custom',
          name: 'City Logo',
          className: 'mb-4',
          style: {},
          visible: true,
          order: 1
        },
        {
          id: 'city-name',
          type: 'content',
          name: 'City Name',
          className: 'text-2xl font-bold mb-2',
          style: {},
          visible: true,
          order: 2,
          content: { type: 'doc', content: '<h1>CITY NAME</h1>' }
        },
        {
          id: 'meeting-title',
          type: 'content',
          name: 'Meeting Title',
          className: 'text-xl mb-4',
          style: {},
          visible: true,
          order: 3,
          content: { type: 'doc', content: '<h2>CITY COUNCIL MEETING</h2>' }
        }
      ]
    },
    {
      id: 'meeting-info',
      type: 'content',
      name: 'Meeting Information',
      className: 'mb-8',
      style: {},
      visible: true,
      order: 2,
      content: { type: 'doc', content: '<p>Meeting date, time, and location information</p>' }
    },
    {
      id: 'procedures',
      type: 'content',
      name: 'Meeting Procedures',
      className: 'border border-gray-300 p-4 mb-8',
      style: {},
      visible: true,
      order: 3,
      content: { type: 'doc', content: '<h3>Additional Meeting Procedures</h3><p>Broadcast and public comment information</p>' }
    },
    {
      id: 'agenda-items',
      type: 'list',
      name: 'Agenda Items',
      className: 'space-y-4',
      style: {},
      visible: true,
      order: 4
    }
  ],
  dataSchema: {
    city: { type: 'string', required: true },
    meetingDate: { type: 'string', required: true },
    meetingTime: { type: 'string', required: true },
    location: { type: 'object', properties: { venue: 'string', address: 'string' } },
    councilMembers: { type: 'array', items: { type: 'object' } },
    agendaItems: { type: 'array', items: { type: 'object' } }
  }
} 