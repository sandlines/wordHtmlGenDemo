'use client'

import { useState } from 'react'
import RichTextEditor from '../components/RichTextEditor'

export default function TiptapDemo() {
  const [content1, setContent1] = useState({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This is a sample agenda item description with '
          },
          {
            type: 'text',
            marks: [{ type: 'bold' }],
            text: 'bold text'
          },
          {
            type: 'text',
            text: ' and '
          },
          {
            type: 'text',
            marks: [{ type: 'italic' }],
            text: 'italic text'
          },
          {
            type: 'text',
            text: '.'
          }
        ]
      }
    ]
  })

  const [content2, setContent2] = useState({
    type: 'doc',
    content: []
  })

  const [content3, setContent3] = useState({
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [
          {
            type: 'text',
            text: 'Meeting Overview'
          }
        ]
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This meeting will cover:'
          }
        ]
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Budget approval for Q1'
                  }
                ]
              }
            ]
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'New policy proposals'
                  }
                ]
              }
            ]
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Community feedback review'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })

  const [isEditMode, setIsEditMode] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tiptap Rich Text Editor Demo</h1>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isEditMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
          </div>

          <div className="space-y-8">
            {/* Minimal Editor Example */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Minimal Editor (for agenda item descriptions)
              </h2>
              <p className="text-gray-600 mb-4">
                This is a minimal editor with basic formatting tools, perfect for agenda item descriptions.
              </p>
              <RichTextEditor
                content={content1}
                onChange={setContent1}
                editable={isEditMode}
                minimal={true}
                placeholder="Enter a brief description..."
              />
              
              <details className="mt-4">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  View JSON Output
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(content1, null, 2)}
                </pre>
              </details>
            </div>

            {/* Full Editor Example */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Full Editor (for detailed content)
              </h2>
              <p className="text-gray-600 mb-4">
                This is a full-featured editor with all formatting options, tables, links, and more.
              </p>
              <RichTextEditor
                content={content2}
                onChange={setContent2}
                editable={isEditMode}
                minimal={false}
                placeholder="Try adding headings, lists, tables, links, and more..."
              />
              
              <details className="mt-4">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  View JSON Output
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(content2, null, 2)}
                </pre>
              </details>
            </div>

            {/* Pre-populated Content Example */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pre-populated Content Example
              </h2>
              <p className="text-gray-600 mb-4">
                This editor shows how content can be pre-loaded and displayed in both edit and read-only modes.
              </p>
              <RichTextEditor
                content={content3}
                onChange={setContent3}
                editable={isEditMode}
                minimal={false}
                placeholder="This shouldn't show since there's content..."
              />
              
              <details className="mt-4">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                  View JSON Output
                </summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(content3, null, 2)}
                </pre>
              </details>
            </div>

            {/* Usage Instructions */}
            <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                How to Use This Editor
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Basic Formatting:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Bold:</strong> Select text and click the Bold button or press Ctrl+B</li>
                    <li><strong>Italic:</strong> Select text and click the Italic button or press Ctrl+I</li>
                    <li><strong>Strikethrough:</strong> Select text and click the Strikethrough button</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Lists:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Bullet List:</strong> Click the bullet list button or type "- " at the beginning of a line</li>
                    <li><strong>Numbered List:</strong> Click the numbered list button or type "1. " at the beginning of a line</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Advanced Features (Full Editor):</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Headings:</strong> Use the dropdown to select heading levels</li>
                    <li><strong>Links:</strong> Select text and click the link button, then enter the URL</li>
                    <li><strong>Tables:</strong> Click the table button to insert a 3x3 table</li>
                    <li><strong>Images:</strong> Click the image button and enter an image URL</li>
                    <li><strong>Quotes:</strong> Click the quote button to create blockquotes</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Keyboard Shortcuts:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Ctrl+Z:</strong> Undo</li>
                    <li><strong>Ctrl+Y:</strong> Redo</li>
                    <li><strong>Ctrl+B:</strong> Bold</li>
                    <li><strong>Ctrl+I:</strong> Italic</li>
                    <li><strong>Ctrl+Shift+X:</strong> Strikethrough</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 