'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useState, useCallback } from 'react'
import { 
  DublinParagraph, 
  LocationBlock,
  CouncilList, 
  CoverHeader,
  NoticeBox, 
  SectionBreak, 
  DublinLogo, 
  DublinTitle 
} from './extensions'

interface DublinCoverEditorProps {
  content?: any
  onChange?: (content: any) => void
  editable?: boolean
}

export default function DublinCoverEditor({ 
  content, 
  onChange, 
  editable = true 
}: DublinCoverEditorProps) {
  const [isEditing, setIsEditing] = useState(editable)
  const [showStylePanel, setShowStylePanel] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit, // Keep default paragraph for compatibility
      DublinParagraph,
      LocationBlock,
      CouncilList,
      CoverHeader,
      NoticeBox,
      SectionBreak,
      DublinLogo,
      DublinTitle,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['dublinParagraph', 'paragraph', 'heading'],
      }),
      TextStyle,
      Color,
    ],
    content: content || getDefaultDublinContent(),
    editable: isEditing,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getJSON())
      }
    },
  })

  const insertLocationBlock = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertLocationBlock().run()
  }, [editor])

  const insertCouncilList = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertCouncilList().run()
  }, [editor])

  const insertCoverHeader = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertCoverHeader().run()
  }, [editor])

  const insertNoticeBox = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertNoticeBox().run()
  }, [editor])

  const insertSectionBreak = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertSectionBreak('REGULAR MEETING 7:00 PM').run()
  }, [editor])

  const insertDublinLogo = useCallback(() => {
    if (!editor) return
    editor.chain().focus().insertDublinLogo().run()
  }, [editor])

  const insertDublinTitle = useCallback((text: string, level: string = 'main') => {
    if (!editor) return
    editor.chain().focus().insertDublinTitle(text, level).run()
  }, [editor])

  // Style panel controls
  const setParagraphAlign = useCallback((align: string) => {
    if (!editor) return
    editor.chain().focus().setParagraphAlign(align).run()
  }, [editor])

  const setParagraphSpacing = useCallback((spacing: string) => {
    if (!editor) return
    editor.chain().focus().setParagraphSpacing(spacing).run()
  }, [editor])

  const setParagraphVariant = useCallback((variant: string) => {
    if (!editor) return
    editor.chain().focus().setParagraphVariant(variant).run()
  }, [editor])

  const setParagraphColor = useCallback((color: string) => {
    if (!editor) return
    editor.chain().focus().setParagraphColor(color).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="dublin-cover-editor">
      {/* Top toolbar */}
      {isEditing && (
        <div className="toolbar border-b border-gray-200 p-4 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {/* Basic formatting */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`px-3 py-1 rounded text-sm border ${
                editor.isActive('bold') 
                  ? 'bg-blue-100 border-blue-300' 
                  : 'bg-white border-gray-300'
              }`}
            >
              Bold
            </button>
            
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`px-3 py-1 rounded text-sm border ${
                editor.isActive('italic') 
                  ? 'bg-blue-100 border-blue-300' 
                  : 'bg-white border-gray-300'
              }`}
            >
              Italic
            </button>

            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`px-3 py-1 rounded text-sm border ${
                editor.isActive('bulletList') 
                  ? 'bg-blue-100 border-blue-300' 
                  : 'bg-white border-gray-300'
              }`}
            >
              List
            </button>

            <div className="border-l border-gray-300 mx-2"></div>

            {/* Dublin-specific components */}
            <button
              onClick={insertCoverHeader}
              className="px-3 py-1 rounded text-sm border bg-blue-50 border-blue-300 hover:bg-blue-100"
            >
              Cover Header
            </button>
            
            <button
              onClick={insertLocationBlock}
              className="px-3 py-1 rounded text-sm border bg-green-50 border-green-300 hover:bg-green-100"
            >
              Location Block
            </button>
            
            <button
              onClick={insertCouncilList}
              className="px-3 py-1 rounded text-sm border bg-green-50 border-green-300 hover:bg-green-100"
            >
              Council List
            </button>
            
            <button
              onClick={insertNoticeBox}
              className="px-3 py-1 rounded text-sm border bg-green-50 border-green-300 hover:bg-green-100"
            >
              Notice Box
            </button>
            
            <button
              onClick={insertSectionBreak}
              className="px-3 py-1 rounded text-sm border bg-green-50 border-green-300 hover:bg-green-100"
            >
              Section Break
            </button>
            
            <button
              onClick={insertDublinLogo}
              className="px-3 py-1 rounded text-sm border bg-green-50 border-green-300 hover:bg-green-100"
            >
              Dublin Logo
            </button>
            
            <button
              onClick={() => insertDublinTitle('DUBLIN', 'main')}
              className="px-3 py-1 rounded text-sm border bg-green-50 border-green-300 hover:bg-green-100"
            >
              Dublin Title
            </button>

            <div className="border-l border-gray-300 mx-2"></div>

            {/* Style panel toggle */}
            <button
              onClick={() => setShowStylePanel(!showStylePanel)}
              className={`px-3 py-1 rounded text-sm border ${
                showStylePanel 
                  ? 'bg-blue-100 border-blue-300' 
                  : 'bg-white border-gray-300'
              }`}
            >
              Style Panel
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Editor content */}
        <div className="flex-1">
          <EditorContent editor={editor} className="dublin-cover-page" />
        </div>

        {/* Floating style panel */}
        {isEditing && showStylePanel && (
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-4">
            <h3 className="font-semibold mb-4">Block Settings</h3>
            
            {/* Editing Instructions */}
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
              <h4 className="font-medium text-blue-800 mb-2">✏️ Editing Tips</h4>
              <ul className="text-blue-700 space-y-1 text-xs">
                <li>• <strong>Council Members:</strong> Click inside the council list to edit member names directly</li>
                <li>• <strong>Location:</strong> Click inside the location block to edit meeting address</li>
                <li>• <strong>Style Controls:</strong> Select text and use controls below to change formatting</li>
              </ul>
            </div>
            
            {/* Alignment */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Alignment</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setParagraphAlign('left')}
                  className={`px-2 py-1 rounded text-xs border ${
                    editor.isActive({ textAlign: 'left' }) 
                      ? 'bg-blue-100 border-blue-300' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Left
                </button>
                <button
                  onClick={() => setParagraphAlign('center')}
                  className={`px-2 py-1 rounded text-xs border ${
                    editor.isActive({ textAlign: 'center' }) 
                      ? 'bg-blue-100 border-blue-300' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Center
                </button>
                <button
                  onClick={() => setParagraphAlign('right')}
                  className={`px-2 py-1 rounded text-xs border ${
                    editor.isActive({ textAlign: 'right' }) 
                      ? 'bg-blue-100 border-blue-300' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  Right
                </button>
              </div>
            </div>

            {/* Spacing */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Spacing</label>
              <select
                onChange={(e) => setParagraphSpacing(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="tight">Tight</option>
                <option value="normal">Normal</option>
                <option value="loose">Loose</option>
              </select>
            </div>

            {/* Variant */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Text Variant</label>
              <select
                onChange={(e) => setParagraphVariant(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="body">Body Text</option>
                <option value="fine-print">Fine Print</option>
                <option value="heading">Heading</option>
                <option value="subtitle">Subtitle</option>
              </select>
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Color</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setParagraphColor('#000000')}
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: '#000000' }}
                  title="Black"
                />
                <button
                  onClick={() => setParagraphColor('#2e8b57')}
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: '#2e8b57' }}
                  title="Dublin Green"
                />
                <button
                  onClick={() => setParagraphColor('#666666')}
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: '#666666' }}
                  title="Gray"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dublin-specific CSS with attribute-based styling */}
      <style jsx global>{`
        /* Dublin Cover Page Styles */
        .dublin-cover-page {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.3;
          color: #000;
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.75in;
          background: white;
        }

        /* Attribute-based paragraph styling */
        .dublin-cover-page p[data-align="left"] {
          text-align: left;
        }

        .dublin-cover-page p[data-align="center"] {
          text-align: center;
        }

        .dublin-cover-page p[data-align="right"] {
          text-align: right;
        }

        .dublin-cover-page p[data-spacing="tight"] {
          line-height: 1.15;
          margin-bottom: 4pt;
        }

        .dublin-cover-page p[data-spacing="normal"] {
          line-height: 1.3;
          margin-bottom: 12pt;
        }

        .dublin-cover-page p[data-spacing="loose"] {
          line-height: 1.5;
          margin-bottom: 20pt;
        }

        .dublin-cover-page p[data-variant="fine-print"] {
          font-size: 9pt;
          color: #666;
        }

        .dublin-cover-page p[data-variant="heading"] {
          font-size: 14pt;
          font-weight: bold;
        }

        .dublin-cover-page p[data-variant="subtitle"] {
          font-size: 11pt;
          color: #666;
        }

        .dublin-cover-page             p[data-color="#000000"] {
              color: #000000;
            }

            p[data-color="#2e8b57"] {
              color: #2e8b57;
            }

            p[data-color="#666666"] {
              color: #666666;
            }

        /* Dublin component styles */
        .cover-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
          align-items: start;
        }

        .council-list {
          text-align: left;
        }

        .council-list h3,
        .council-title {
          font-size: 11pt;
          color: #666;
          font-weight: 500;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-family: 'Times New Roman', Times, serif;
        }

        .council-member {
          font-size: 10pt;
          color: #333;
          margin-bottom: 2px;
          line-height: 1.3;
          font-family: 'Times New Roman', Times, serif;
        }

        .council-members-content {
          margin-top: 8px;
        }

        .council-members-content p {
          font-size: 10pt;
          color: #333;
          margin-bottom: 2px;
          line-height: 1.3;
          font-family: 'Times New Roman', Times, serif;
        }

        .dublin-logo-container {
          text-align: center;
          margin: 1rem 0;
        }

        .dublin-logo {
          display: block;
          margin: 0 auto;
          width: 80px;
          height: 80px;
        }

        .location-block {
          text-align: right;
          font-size: 10pt;
          color: #666;
          line-height: 1.2;
        }

        .location-line {
          margin-bottom: 2px;
          font-family: 'Times New Roman', Times, serif;
        }

        .location-block p {
          font-size: 10pt;
          color: #666;
          margin-bottom: 2px;
          line-height: 1.2;
          font-family: 'Times New Roman', Times, serif;
          text-align: right;
        }

        .notice-box {
          border: 2px solid #000;
          padding: 20px;
          margin: 25px 0;
          page-break-inside: avoid;
        }

        .notice-box-title {
          text-align: center;
          font-size: 14pt;
          font-weight: bold;
          text-decoration: underline;
          margin-bottom: 15px;
          font-family: 'Times New Roman', Times, serif;
        }

        .notice-box-content {
          font-size: 10pt;
          line-height: 1.4;
          text-align: left;
        }

        .notice-box-content p {
          margin-bottom: 12px;
          font-family: 'Times New Roman', Times, serif;
        }

        .notice-box-content ul {
          margin-left: 20px;
          margin-bottom: 12px;
        }

        .notice-box-content li {
          margin-bottom: 10px;
          font-family: 'Times New Roman', Times, serif;
        }

        .section-break {
          text-align: center;
          font-size: 14pt;
          font-weight: bold;
          margin: 25px 0;
          font-family: 'Times New Roman', Times, serif;
        }

        /* Dublin Branding Colors */
        .dublin-title {
          font-size: 28pt;
          font-weight: bold;
          color: #2e8b57;
          text-align: center;
          margin: 1rem 0;
          font-family: 'Times New Roman', Times, serif;
        }

        .dublin-title-main {
          font-size: 28pt;
          font-weight: bold;
          color: #2e8b57;
          text-align: center;
          margin: 1rem 0;
          font-family: 'Times New Roman', Times, serif;
        }

        .dublin-title-sub {
          font-size: 14pt;
          color: #666;
          text-align: center;
          margin-bottom: 25px;
          font-family: 'Times New Roman', Times, serif;
        }

        /* Print Styles */
        @media print {
          .toolbar {
            display: none;
          }
          
          .dublin-cover-page {
            padding: 0.75in;
            margin: 0;
            max-width: none;
          }
          
          .cover-header {
            page-break-inside: avoid;
          }
          
          .notice-box {
            page-break-inside: avoid;
          }
        }

        /* WeasyPrint compatibility */
        @page {
          size: letter;
          margin: 0.75in;
        }
      `}</style>
    </div>
  )
}

// Default Dublin content with proper JSON structure
function getDefaultDublinContent() {
  return {
    type: 'doc',
    content: [
      {
        type: 'coverHeader',
        content: [
          {
            type: 'councilList',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Dr. Sherry Hu, Mayor' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Kashef Qaadri, Vice Mayor' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Jean Josey, Councilmember' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Michael McCorriston, Councilmember' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'John Morada, Councilmember' }]
              }
            ]
          },
          {
            type: 'dublinLogo'
          },
          {
            type: 'locationBlock',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Peter W. Snyder Council Chamber' }]
              },
              {
                type: 'paragraph', 
                content: [{ type: 'text', text: 'Dublin Civic Center' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: '100 Civic Plaza' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Dublin, CA 94568' }]
              },
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'www.dublin.ca.gov' }]
              }
            ]
          }
        ]
      },
      {
        type: 'dublinTitle',
        attrs: { level: 'main' },
        content: [{ type: 'text', text: 'DUBLIN' }]
      },
      {
        type: 'dublinParagraph',
        attrs: { align: 'center', variant: 'subtitle' },
        content: [{ type: 'text', text: 'CALIFORNIA' }]
      },
      {
        type: 'dublinParagraph',
        attrs: { align: 'center', variant: 'subtitle' },
        content: [{ type: 'text', text: 'Regular Meeting of the' }]
      },
      {
        type: 'dublinTitle',
        attrs: { level: 'main' },
        content: [{ type: 'text', text: 'DUBLIN CITY COUNCIL' }]
      },
      {
        type: 'dublinParagraph',
        attrs: { align: 'center', spacing: 'loose' },
        content: [
          { type: 'text', text: 'Tuesday, May 6, 2025' },
          { type: 'hardBreak' },
          { type: 'text', text: 'Location: Peter W. Snyder Council Chamber, 100 Civic Plaza, Dublin, CA 94568' }
        ]
      },
      {
        type: 'sectionBreak',
        attrs: { text: 'REGULAR MEETING 7:00 PM' }
      },
      {
        type: 'noticeBox',
        attrs: { title: 'Additional Meeting Procedures' },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This City Council meeting will be broadcast live on Comcast T.V. channel 28 beginning at 7:00 p.m. This meeting will also be livestreamed at www.tv30.org and on the City\'s website at: https://dublin.ca.gov/ccmeetings'
              }
            ]
          }
        ]
      }
    ]
  }
} 