'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState } from 'react'
import DOMPurify from 'dompurify'

interface SausalitoWordEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  placeholder?: string
  height?: number
}

export default function SausalitoWordEditor({
  initialContent = '',
  onChange,
  placeholder = 'Start typing your agenda content...',
  height = 400
}: SausalitoWordEditorProps) {
  const editorRef = useRef<any>(null)
  const [isReady, setIsReady] = useState(false)

  const handleEditorInit = () => {
    setIsReady(true)
  }

  const handleEditorChange = (content: string) => {
    // Sanitize content before passing to parent
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'strong', 'em', 'u', 'br', 'hr',
        'ul', 'ol', 'li',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span', 'blockquote'
      ],
      ALLOWED_ATTR: [
        'href', 'target', 'src', 'alt', 'width', 'height',
        'class', 'style', 'colspan', 'rowspan'
      ]
    })
    
    if (onChange) {
      onChange(sanitizedContent)
    }
  }

  const insertPageBreak = () => {
    if (editorRef.current) {
      editorRef.current.insertContent('<div class="page-break-before"><hr class="page-break-line" /></div>')
    }
  }

  const insertNoticeBox = () => {
    if (editorRef.current) {
      editorRef.current.insertContent(`
        <div class="notice-box">
          <p class="notice-title">NOTICE</p>
          <p>Enter your notice content here...</p>
        </div>
      `)
    }
  }

  return (
    <div className="sausalito-word-editor">
      {/* Custom toolbar actions */}
      <div className="mb-2 flex gap-2">
        <button
          onClick={insertPageBreak}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          disabled={!isReady}
        >
          Page Break
        </button>
        <button
          onClick={insertNoticeBox}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          disabled={!isReady}
        >
          Notice Box
        </button>
      </div>

      <Editor
        ref={editorRef}
        apiKey="08308xkq9i0eg4hsgdgpql1kk0yhvrcqzwfrqa1nl3sdnnah" // Using open-source version
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'paste'
          ],
          toolbar: `
            styleselect | 
            bold italic underline | 
            alignleft aligncenter alignright alignjustify | 
            bullist numlist outdent indent | 
            table image link | 
            removeformat help
          `,
          style_formats: [
            { 
              title: 'Section Heading', 
              block: 'h2', 
              classes: 'section-heading',
              wrapper: false
            },
            { 
              title: 'Sub-heading', 
              block: 'h3', 
              classes: 'sub-heading',
              wrapper: false
            },
            { 
              title: 'Staff Report', 
              block: 'div', 
              classes: 'staff-report',
              wrapper: true
            },
            { 
              title: 'Notice Box', 
              block: 'div', 
              classes: 'notice-box',
              wrapper: true
            },
            { 
              title: 'Fine Print', 
              selector: 'p', 
              classes: 'fine-print'
            },
            { 
              title: 'Recommendation', 
              selector: 'p', 
              classes: 'recommendation'
            }
          ],
          content_css: '/sausalito-agenda.css', // Shared CSS for WYSIWYG
          content_style: `
            body { 
              font-family: 'Times New Roman', Times, serif; 
              font-size: 12pt; 
              line-height: 1.4; 
              margin: 20px; 
              background: white;
            }
            .section-heading {
              color: #1a365d;
              font-size: 16pt;
              font-weight: bold;
              margin-top: 20px;
              margin-bottom: 10px;
              text-transform: uppercase;
            }
            .sub-heading {
              color: #2d3748;
              font-size: 14pt;
              font-weight: bold;
              margin-top: 15px;
              margin-bottom: 8px;
            }
            .staff-report {
              background: #f7fafc;
              border-left: 4px solid #4299e1;
              padding: 15px;
              margin: 15px 0;
            }
            .notice-box {
              border: 2px solid #e53e3e;
              background: #fed7d7;
              padding: 15px;
              margin: 15px 0;
              text-align: center;
            }
            .notice-title {
              font-weight: bold;
              font-size: 14pt;
              margin-bottom: 10px;
              text-decoration: underline;
            }
            .fine-print {
              font-size: 9pt;
              color: #4a5568;
              line-height: 1.3;
            }
            .recommendation {
              font-weight: bold;
              background: #f0fff4;
              padding: 10px;
              border-left: 4px solid #38a169;
            }
            .page-break-before {
              page-break-before: always;
            }
            .page-break-line {
              border: 1px dashed #cbd5e0;
              margin: 20px 0;
            }
            @media print {
              .page-break-line {
                display: none;
              }
            }
          `,
          paste_data_images: true,
          paste_as_text: false,
          paste_webkit_styles: "color font-weight font-style",
          paste_retain_style_properties: "color font-weight font-style text-align",
          
          // Image handling
          images_upload_handler: (blobInfo: any, progress: any) => {
            return new Promise((resolve, reject) => {
              // In a real app, upload to your storage service
              // For demo, we'll convert to base64
              const reader = new FileReader()
              reader.onload = () => {
                resolve(reader.result as string)
              }
              reader.onerror = reject
              reader.readAsDataURL(blobInfo.blob())
            })
          },
          
          // Custom formats
          formats: {
            alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: { textAlign: 'left' } },
            aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: { textAlign: 'center' } },
            alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: { textAlign: 'right' } },
            alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', styles: { textAlign: 'justify' } }
          },
          
          // Restrict allowed elements
          valid_elements: `
            p[class|style],h1[class|style],h2[class|style],h3[class|style],h4[class|style],h5[class|style],h6[class|style],
            strong,em,u,br,hr[class],
            ul[class|style],ol[class|style],li[class|style],
            a[href|target|class],
            img[src|alt|width|height|class|style],
            table[class|style],thead,tbody,tr,th[colspan|rowspan|class|style],td[colspan|rowspan|class|style],
            div[class|style],span[class|style],blockquote[class|style]
          `,
          
          // Only allow specific styles
          valid_styles: {
            '*': 'text-align,color,font-weight,font-style,text-decoration'
          },
          
          setup: (editor: any) => {
            editor.on('init', handleEditorInit)
            
            // Add custom button for agenda-specific content
            editor.ui.registry.addButton('sausalito-template', {
              text: 'Templates',
              onAction: () => {
                editor.windowManager.open({
                  title: 'Insert Sausalito Template',
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'button',
                        text: 'Staff Report Template',
                        onAction: () => {
                          editor.insertContent(`
                            <div class="staff-report">
                              <h3>Staff Report</h3>
                              <p><strong>Subject:</strong> </p>
                              <p><strong>Background:</strong> </p>
                              <p><strong>Discussion:</strong> </p>
                              <p><strong>Recommendation:</strong> </p>
                            </div>
                          `)
                          editor.windowManager.close()
                        }
                      },
                      {
                        type: 'button',
                        text: 'Public Comment Template',
                        onAction: () => {
                          editor.insertContent(`
                            <h3>Public Comment</h3>
                            <p><em>This is the time for members of the public to address the City Council on matters not on the agenda.</em></p>
                            <p>Comments: </p>
                          `)
                          editor.windowManager.close()
                        }
                      }
                    ]
                  },
                  buttons: [
                    {
                      type: 'cancel',
                      text: 'Close'
                    }
                  ]
                })
              }
            })
          }
        }}
        initialValue={initialContent}
        onEditorChange={handleEditorChange}
      />
      
      {/* Word count and status */}
      <div className="mt-2 text-sm text-gray-600 flex justify-between">
        <span>Word-style editing enabled • TinyMCE 6 Community</span>
        <span className={`${isReady ? 'text-green-600' : 'text-orange-600'}`}>
          {isReady ? 'Ready' : 'Loading...'}
        </span>
      </div>
    </div>
  )
}

// Export utility function for getting clean HTML
export function getCleanHTML(dirtyHTML: string): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Server-side: return the HTML as-is since DOMPurify requires a browser environment
    return dirtyHTML
  }
  
  // Client-side: use DOMPurify to sanitize
  return DOMPurify.sanitize(dirtyHTML, {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'em', 'u', 'br', 'hr',
      'ul', 'ol', 'li',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'blockquote'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'src', 'alt', 'width', 'height',
      'class', 'style', 'colspan', 'rowspan'
    ]
  })
} 