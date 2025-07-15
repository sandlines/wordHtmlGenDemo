'use client'

import { useState } from 'react'
import SausalitoWordEditor, { getCleanHTML } from '../components/sausalito/SausalitoWordEditor'

export default function SausalitoWordDemo() {
  const [content, setContent] = useState(`
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="/assets/sausalito.jpeg" alt="City of Sausalito Seal" style="width: 80px; height: 80px; margin: 0 auto 10px auto; display: block;">
      <h1 style="font-size: 18px; font-weight: bold; margin: 5px 0;">CITY OF SAUSALITO</h1>
      <h2 style="font-size: 16px; font-weight: bold; margin: 5px 0;">SPECIAL & REGULAR CITY COUNCIL AGENDA</h2>
      <p style="font-size: 12px; margin: 5px 0;"><strong>In the COUNCIL CHAMBERS via Zoom at 420 LITHO STREET, SAUSALITO, CA 94965</strong></p>
      <p style="font-size: 12px; margin: 5px 0;"><strong>TUESDAY, DECEMBER 17, 2024</strong></p>
      <p style="font-size: 12px; margin: 5px 0;"><strong>SPECIAL MEETING BEGINS AT 6:00 PM</strong></p>
      <p style="font-size: 12px; margin: 5px 0;"><strong>REGULAR MEETING BEGINS AT 7:00 PM</strong></p>
    </div>

    <div style="margin: 20px 0;">
      <p style="text-align: center; font-size: 12px; margin: 10px 0;"><strong>Members of the public may participate over Zoom:</strong></p>
      
      <p style="text-align: center; font-size: 12px; margin: 15px 0;">
        <strong>If you would like to speak on an agenda item, you can access the meeting remotely by joining from a PC, MAC, IPAD, iPhone, or Android device.</strong>
      </p>
      
      <p style="text-align: center; font-size: 12px; margin: 15px 0;">
        <strong>Please click this URL to join.</strong>
      </p>
      
      <p style="text-align: center; font-size: 12px; margin: 10px 0;">
        <a href="https://us02web.zoom.us/j/85275894165?pwd=KlKaETkUjjIbIUh8OI0QeCg9PIE9jn5.1" style="text-decoration: underline; color: blue;">
          https://us02web.zoom.us/j/85275894165?pwd=KlKaETkUjjIbIUh8OI0QeCg9PIE9jn5.1
        </a>
      </p>
      
      <p style="text-align: center; font-size: 12px; margin: 10px 0;">
        <span style="background-color: #ffff00; padding: 2px 4px; font-weight: bold;">PASSCODE: 123456</span>
      </p>
      
      <p style="text-align: center; font-size: 12px; margin: 15px 0;">
        <strong>Or join by phone:</strong><br>
        <strong>+1 669 900 6833</strong><br>
        <strong>+1 669 444 9171</strong><br>
        <strong>+1 719 359 4580</strong><br>
        <strong>+1 253 205 0468</strong>
      </p>
      
      <p style="text-align: center; font-size: 12px; margin: 15px 0;">
        <strong>Webinar ID: 852 7589 4165</strong><br>
        <span style="background-color: #ffff00; padding: 2px 4px; font-weight: bold;">PASSCODE: 123456</span>
      </p>
      
      <p style="font-size: 11px; margin: 15px 0; line-height: 1.4;">
        <strong>Your phone number will appear on the screen unless you first dial *67 before dialing the numbers shown above.</strong> 
        If you want to comment during the public comment portion of the agenda, you can use the "Raise Hand" function in Zoom under Reactions or Press *9 if you are calling in. 
        If you do not want to speak during the public comment portion of the agenda, you may also submit email correspondence to 
        <a href="mailto:cityclerk@sausalito.gov" style="text-decoration: underline; color: blue;">cityclerk@sausalito.gov</a>. 
        <strong>Emails will be accepted up until 2:00 PM the day of the meeting.</strong>
      </p>
      
      <hr style="margin: 20px 0; border: 1px solid #000;">
      
      <p style="font-size: 11px; margin: 15px 0; line-height: 1.4;">
        <strong>IF STARTING TIMES ARE LISTED FOR EACH AGENDA ITEM THEY SHOULD BE CONSIDERED A GUIDELINE ONLY. 
        THE CITY COUNCIL RESERVES THE RIGHT TO ALTER THE ORDER OF DISCUSSION IN ORDER TO RUN AN EFFECTIVE MEETING.</strong> 
        IF YOU WISH TO ASSURE YOURSELF OF HEARING A PARTICULAR DISCUSSION, PLEASE ATTEND THE ENTIRE MEETING. 
        THE CITY VALUES AND INVITES WRITTEN COMMENTS FROM THE PUBLIC ON MATTERS SET FOR CITY COUNCIL CONSIDERATION. 
        IN ORDER TO PROVIDE CITY COUNCIL MEMBERS AMPLE TIME TO REVIEW ALL CORRESPONDENCE, PLEASE SUBMIT CORRESPONDENCE TO STAFF IN ADVANCE OF THE MEETING.
      </p>
      
      <p style="font-size: 11px; margin: 15px 0; line-height: 1.4;">
        <strong>To give everyone an opportunity to be heard and to ensure the presentation of different points of view, 
        the City Council requests that members of the audience who wish to speak, complete a Speakers' Card and 
        when called on: 1) Always address the Chair; 2) State your name; 3) State views succinctly; and 4) Limit 
        presentations to two (2) minutes.</strong> However, if there is a large group present to speak on the same issue, 
        the City Council has the discretion to limit speakers to less than two minutes.
      </p>
    </div>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">CALL TO ORDER</h2>
    <p style="font-size: 12px; margin: 10px 0;">Mayor Wilson called the meeting to order at 7:00 PM.</p>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">ROLL CALL</h2>
    <p style="font-size: 12px; margin: 10px 0;"><strong>Present:</strong> Mayor Wilson, Vice Mayor Chen, Councilmembers Davidson, Martinez, and Thompson</p>
    <p style="font-size: 12px; margin: 10px 0;"><strong>Staff Present:</strong> City Manager Rodriguez, City Attorney Smith, City Clerk Johnson</p>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">PUBLIC COMMENT</h2>
    <div style="margin: 15px 0;">
      <h3 style="font-size: 12px; font-weight: bold; margin: 10px 0;">Public Comment on Non-Agenda Items</h3>
      <p style="font-size: 12px; margin: 10px 0; font-style: italic;">This is the time for members of the public to address the City Council on matters not on the agenda. Comments are limited to 3 minutes per speaker.</p>
      <p style="font-size: 12px; margin: 10px 0;">Comments received: None</p>
    </div>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">CONSENT CALENDAR</h2>
    <p style="font-size: 12px; margin: 10px 0;">Items 1-3 may be acted upon by one motion. Any Councilmember may request an item be removed for separate discussion.</p>

    <div style="margin: 15px 0;">
      <div style="font-size: 12px; font-weight: bold; margin: 10px 0;">1. Approve Minutes of March 18, 2025 Regular Meeting</div>
      <div style="font-size: 12px; margin: 10px 0;">
        <p>Staff recommends approval of the minutes from the March 18, 2025 Regular City Council Meeting.</p>
      </div>
      <div style="font-size: 11px; margin: 10px 0; color: #666;">Attachment: Draft Minutes (March 18, 2025)</div>
    </div>

    <div style="margin: 15px 0;">
      <div style="font-size: 12px; font-weight: bold; margin: 10px 0;">2. Monthly Financial Report</div>
      <div style="font-size: 12px; margin: 10px 0;">
        <div style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #007cba;">
          <h3 style="font-size: 12px; font-weight: bold; margin: 5px 0;">Staff Report</h3>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Subject:</strong> Monthly Financial Report for March 2025</p>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Background:</strong> The City provides monthly financial reports to the City Council to maintain transparency and oversight of municipal finances.</p>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Discussion:</strong> The March 2025 report shows revenues tracking at 95% of budget projections, with expenditures at 88% of budget. All major funds remain in positive balance.</p>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Recommendation:</strong> Staff recommends accepting the Monthly Financial Report for March 2025.</p>
        </div>
      </div>
      <div style="font-size: 11px; margin: 10px 0; color: #666;">Attachment: Financial Report (March 2025)</div>
    </div>

    <div style="page-break-before: always;"></div>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">REGULAR AGENDA</h2>

    <div style="margin: 15px 0;">
      <div style="font-size: 12px; font-weight: bold; margin: 10px 0;">3. Richardson Bay Shoreline Protection Project</div>
      <div style="font-size: 12px; margin: 10px 0;">
        <p>Consider approval of the Richardson Bay Shoreline Protection Project and authorize the City Manager to execute agreements with the State Coastal Conservancy.</p>
        
        <div style="background-color: #f9f9f9; padding: 10px; border-left: 3px solid #007cba; margin: 10px 0;">
          <h3 style="font-size: 12px; font-weight: bold; margin: 5px 0;">Staff Report</h3>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Subject:</strong> Richardson Bay Shoreline Protection Project Approval</p>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Background:</strong> The City has been working with the State Coastal Conservancy on a comprehensive shoreline protection project along Richardson Bay to address sea level rise and erosion concerns.</p>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Discussion:</strong> The project includes installation of living shoreline features, habitat restoration, and improved public access. Total project cost is $2.3 million, with $1.8 million in grant funding secured.</p>
          <p style="font-size: 12px; margin: 5px 0;"><strong>Recommendation:</strong> Staff recommends approval of the project and authorization to execute necessary agreements.</p>
        </div>

        <div style="background-color: #fff3cd; padding: 10px; border: 1px solid #ffeaa7; margin: 10px 0;">
          <div style="font-size: 12px; font-weight: bold; margin: 5px 0;">ENVIRONMENTAL REVIEW</div>
          <p style="font-size: 12px; margin: 5px 0;">This project is categorically exempt under CEQA Guidelines Section 15333 (Small Habitat Restoration Projects).</p>
        </div>
      </div>
      <div style="font-size: 11px; margin: 10px 0; color: #666;">
        Attachments: Project Plans, Environmental Documents, Grant Agreement
      </div>
    </div>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">CLOSED SESSION</h2>
    <div style="margin: 15px 0;">
      <div style="font-size: 12px; font-weight: bold; margin: 10px 0;">4. Conference with Legal Counsel - Existing Litigation</div>
      <div style="font-size: 12px; margin: 10px 0;">
        <p>Government Code Section 54956.9(d)(1)</p>
        <p style="font-size: 11px; color: #666;">Case: Harbor Point Homeowners Association v. City of Sausalito</p>
      </div>
    </div>

    <h2 style="font-size: 14px; font-weight: bold; margin: 20px 0 10px 0;">ADJOURNMENT</h2>
    <p style="font-size: 12px; margin: 10px 0;">The meeting was adjourned at 9:15 PM.</p>

    <hr style="margin: 20px 0; border: 1px solid #000;">
    <p style="font-size: 10px; margin: 10px 0; line-height: 1.4;">
      <strong>Note:</strong> If you need assistance to participate in this meeting due to a disability, please contact the City Clerk at (415) 289-4100 at least 48 hours in advance. All agenda materials are available for review at City Hall during normal business hours and on the City's website at www.sausalito.gov.
    </p>
  `)
  
  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const cleanHTML = getCleanHTML(content)
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: 'sausalito-word',
          html_content: cleanHTML,
          title: 'Sausalito City Council Agenda',
          date: new Date().toISOString().split('T')[0]
        }),
      })

      if (!response.ok) {
        throw new Error('PDF generation failed')
      }

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sausalito-agenda-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sausalito Word-Style Editor</h1>
              <p className="mt-2 text-gray-600">TinyMCE 6 Community • Full Word-like authoring experience</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  'Generate PDF'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Feature Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">✨ Word-Style Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">🎨 Rich Formatting</h3>
              <p className="text-sm text-blue-800">Full toolbar with bold, italic, alignment, colors, and more</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">📝 Predefined Styles</h3>
              <p className="text-sm text-green-800">Section headings, staff reports, notice boxes, fine print</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">🔧 Custom Templates</h3>
              <p className="text-sm text-purple-800">Sausalito-specific templates for common agenda items</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">🖼️ Images & Tables</h3>
              <p className="text-sm text-orange-800">Drag-and-drop images, full table editing with borders</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">📄 Page Breaks</h3>
              <p className="text-sm text-red-800">Insert page breaks for proper PDF pagination</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">🔒 HTML Sanitization</h3>
              <p className="text-sm text-indigo-800">Automatic cleanup of pasted content and security</p>
            </div>
          </div>
        </div>

        {/* Schema Integration Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔗 Firestore Integration</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Schema Enhancement:</h3>
            <pre className="text-sm text-gray-700 bg-white p-3 rounded border overflow-x-auto">
{`agendaRender.sections[n].items[k] = {
  title: "Approve minutes",
  html: "<p><strong>Staff Report:</strong> The City Manager...",
  attachments: [...],
  // Existing fields remain unchanged
}`}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              ✅ Backward compatible • ✅ HTML sanitized • ✅ Shared CSS for PDF consistency
            </p>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Live Editor</h2>
            <div className="text-sm text-gray-600">
              Try the predefined styles in the Format dropdown ↓
            </div>
          </div>
          
          <SausalitoWordEditor
            initialContent={content}
            onChange={handleContentChange}
            height={600}
          />
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <details>
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                📋 View Generated HTML (Click to expand)
              </summary>
              <pre className="mt-2 text-xs text-gray-600 bg-white p-3 rounded border overflow-x-auto max-h-40">
                {getCleanHTML(content)}
              </pre>
            </details>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">🛠️ Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Frontend Stack</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>TinyMCE 6 Community:</strong> MIT license, no royalties</li>
                <li>• <strong>React Integration:</strong> @tinymce/tinymce-react</li>
                <li>• <strong>HTML Sanitization:</strong> DOMPurify for security</li>
                <li>• <strong>Shared CSS:</strong> /public/sausalito-agenda.css</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Backend Processing</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>PDF Generation:</strong> WeasyPrint with shared CSS</li>
                <li>• <strong>Content Sanitization:</strong> Server-side cleanup</li>
                <li>• <strong>Page Breaks:</strong> CSS @page rules</li>
                <li>• <strong>Font Embedding:</strong> Times New Roman for consistency</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
} 