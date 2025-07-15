'use client'

import { useState } from 'react'
import DublinCoverEditor from '../components/dublin/DublinCoverEditor'
import { Download, FileText, Eye } from 'lucide-react'

export default function DublinTipTapDemo() {
  const [coverContent, setCoverContent] = useState<any>(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

  const generatePDF = async () => {
    setIsGeneratingPdf(true)
    try {
      // For TipTap content, we need to get the HTML content
      let tiptapContent = ''
      
      if (typeof coverContent === 'string') {
        tiptapContent = coverContent
      } else if (coverContent && coverContent.type) {
        // If it's TipTap JSON, we'll send it as-is and let the backend handle it
        tiptapContent = JSON.stringify(coverContent)
      }

      const apiData = {
        template: 'dublin-tiptap',
        tiptap_content: tiptapContent,
        city_name: 'Dublin',
        meeting_type: 'Regular City Council Meeting',
        meeting_date: 'Tuesday, May 6, 2025',
        meeting_time: '7:00 PM',
        address: '100 Civic Plaza, Dublin, CA 94568'
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
        
        // Create download link
        const a = document.createElement('a')
        a.href = url
        a.download = `dublin_tiptap_agenda_${new Date().toISOString().split('T')[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        throw new Error('Failed to generate PDF')
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dublin TipTap Cover Editor</h1>
              <p className="text-sm text-gray-600">WYSIWYG editor for Dublin agenda covers with TipTap</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('edit')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'edit'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </button>
              </div>

              {/* Generate PDF Button */}
              <button
                onClick={generatePDF}
                disabled={isGeneratingPdf}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                {isGeneratingPdf ? 'Generating...' : 'Generate PDF'}
              </button>

              {/* Back to Main Demo */}
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                ← Back to Main Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Info Banner */}
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">TipTap WYSIWYG Editor</h3>
                <p className="text-sm text-blue-700 mt-1">
                  This implementation uses TipTap (ProseMirror) to create a fully WYSIWYG editor for Dublin agenda covers.
                  Features include: real-time editing, custom components for council lists and notice boxes, and direct HTML-to-PDF conversion using WeasyPrint.
                </p>
              </div>
            </div>
          </div>

          {/* TipTap Editor */}
          <DublinCoverEditor
            content={coverContent}
            onChange={setCoverContent}
            editable={viewMode === 'edit'}
          />
        </div>

        {/* Features Overview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">🎨 WYSIWYG Editing</h3>
            <p className="text-gray-600 text-sm">
              Real-time visual editing with toolbar controls. What you see in the editor matches exactly what appears in the PDF.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">🧩 Custom Components</h3>
            <p className="text-gray-600 text-sm">
              Pre-built components for Dublin-specific elements: council member lists, notice boxes, section breaks, and city logos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">📄 Perfect PDFs</h3>
            <p className="text-gray-600 text-sm">
              Direct HTML-to-PDF conversion using WeasyPrint ensures pixel-perfect output that matches the original design exactly.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Frontend Technology</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• TipTap React Editor (MIT licensed)</li>
                <li>• Custom Dublin-specific components</li>
                <li>• Real-time HTML generation</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for styling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Backend Processing</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Python Flask API server</li>
                <li>• WeasyPrint HTML-to-PDF conversion</li>
                <li>• CSS-based styling for print optimization</li>
                <li>• Proper Dublin city branding colors</li>
                <li>• Letter-size page formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 