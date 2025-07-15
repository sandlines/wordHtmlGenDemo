'use client'

import { useState } from 'react'
import RichTextEditor from './RichTextEditor'

// Complete agenda data structure
interface AgendaData {
  template: {
    city: string
    state: string
    logo?: string
    layout: 'formal-council' | 'simple' | 'sausalito'
    styling: {
      primaryColor: string
      backgroundColor: string
      fontFamily: string
    }
  }
  meeting: {
    title: string
    date: string
    time: string
    location: {
      venue: string
      address: string
      additionalInfo?: string
    }
    meetingType: 'regular' | 'special' | 'both'
    specialTime?: string
  }
  councilMembers: Array<{
    name: string
    title: string
  }>
  contactInfo: {
    website?: string
    email?: string
    phone?: string
  }
  procedures: {
    broadcastInfo: any // Rich text content
    publicComment: any // Rich text content
    additionalNotes: any // Rich text content
  }
  virtualMeeting?: {
    platform: 'zoom' | 'teams' | 'other'
    url?: string
    meetingId?: string
    passcode?: string
    phoneNumbers?: string[]
  }
  agendaItems: Array<{
    id: string
    title: string
    description: any // Rich text content
    timeEstimate?: string
    type: 'call-to-order' | 'approval' | 'public-hearing' | 'discussion' | 'action' | 'report' | 'other'
  }>
}

interface FormalAgendaTemplateProps {
  data: AgendaData
  onChange: (data: AgendaData) => void
  mode: 'template-design' | 'advanced-design' | 'content-edit' | 'preview'
}

export default function FormalAgendaTemplate({
  data,
  onChange,
  mode
}: FormalAgendaTemplateProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const updateData = (path: string, value: any) => {
    const keys = path.split('.')
    const newData = JSON.parse(JSON.stringify(data))
    let current = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
    onChange(newData)
  }

  const renderHeader = () => {
    if (data.template.layout === 'sausalito') {
      return (
        <div className="text-center mb-8">
          {data.template.logo && (
            <div className="mb-4">
              <img 
                src={data.template.logo} 
                alt={`${data.template.city} Logo`}
                className="mx-auto h-16 w-16"
              />
            </div>
          )}
          <div className="font-bold text-lg mb-2">CITY OF {data.template.city.toUpperCase()}</div>
          <div className="font-bold text-base mb-1">SPECIAL & REGULAR CITY COUNCIL AGENDA</div>
          <div className="text-sm">
            In the COUNCIL CHAMBERS via Zoom at {data.meeting.location.address}
          </div>
          <div className="text-sm font-semibold mt-2">
            {data.meeting.date.toUpperCase()}
          </div>
          {data.meeting.meetingType === 'both' && (
            <>
              <div className="text-sm">SPECIAL MEETING BEGINS AT {data.meeting.specialTime}</div>
              <div className="text-sm">REGULAR MEETING BEGINS AT {data.meeting.time}</div>
            </>
          )}
        </div>
      )
    }

    // Dublin-style layout
    return (
      <div className="flex justify-between items-start mb-8">
        {/* Left side - Council Members */}
        <div className="w-1/3">
          <div className="font-bold text-sm mb-2">COUNCILMEMBERS</div>
          {data.councilMembers.map((member, index) => (
            <div key={index} className="text-sm mb-1">
              {member.name}, {member.title}
            </div>
          ))}
        </div>

        {/* Center - Logo and City Name */}
        <div className="text-center flex-1">
          {data.template.logo && (
            <img 
              src={data.template.logo} 
              alt={`${data.template.city} Logo`}
              className="mx-auto h-20 w-20 mb-4"
            />
          )}
          <div className="text-green-600 font-bold text-2xl">
            {data.template.city.toUpperCase()}
          </div>
          <div className="text-green-600 text-sm">
            {data.template.state.toUpperCase()}
          </div>
        </div>

        {/* Right side - Contact Info */}
        <div className="w-1/3 text-right text-sm text-gray-600">
          <div>{data.meeting.location.venue}</div>
          <div>{data.meeting.location.address.split(',')[0]}</div>
          <div>{data.meeting.location.address.split(',').slice(1).join(',')}</div>
          {data.contactInfo.website && (
            <div>{data.contactInfo.website}</div>
          )}
        </div>
      </div>
    )
  }

  const renderMeetingInfo = () => (
    <div className="text-center mb-8">
      <div className="text-gray-600 text-lg mb-2">
        {data.meeting.title.includes('Regular') ? 'Regular Meeting of the' : 'Meeting of the'}
      </div>
      <div className="font-bold text-2xl mb-4">
        {data.template.city.toUpperCase()} CITY COUNCIL
      </div>
      
      <div className="flex justify-between items-center">
        <div className="font-semibold">
          {data.meeting.date}
        </div>
        <div className="text-right">
          <div><span className="font-semibold">Location:</span> {data.meeting.location.venue}</div>
          <div>{data.meeting.location.address.split(',')[0]}</div>
          <div>{data.meeting.location.address.split(',').slice(1).join(',')}</div>
        </div>
      </div>
      
      <div className="font-bold text-lg mt-4">
        {data.meeting.meetingType === 'regular' ? 'REGULAR MEETING' : 'MEETING'} {data.meeting.time}
      </div>
    </div>
  )

  const renderProcedures = () => (
    <div className="border border-gray-400 p-4 mb-8">
      <div className="font-bold text-center mb-4 underline">
        Additional Meeting Procedures
      </div>
      
      {mode === 'content-edit' ? (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Broadcast Information:</h4>
            <RichTextEditor
              content={data.procedures.broadcastInfo}
              onChange={(content) => updateData('procedures.broadcastInfo', content)}
              placeholder="Enter broadcast and streaming information..."
              minimal={true}
            />
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Public Comment Procedures:</h4>
            <RichTextEditor
              content={data.procedures.publicComment}
              onChange={(content) => updateData('procedures.publicComment', content)}
              placeholder="Enter public comment procedures..."
              minimal={true}
            />
          </div>
          
          {data.procedures.additionalNotes && (
            <div>
              <h4 className="font-semibold mb-2">Additional Notes:</h4>
              <RichTextEditor
                content={data.procedures.additionalNotes}
                onChange={(content) => updateData('procedures.additionalNotes', content)}
                placeholder="Enter additional notes..."
                minimal={true}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <div dangerouslySetInnerHTML={{ 
            __html: data.procedures.broadcastInfo?.content || '' 
          }} />
          <div dangerouslySetInnerHTML={{ 
            __html: data.procedures.publicComment?.content || '' 
          }} />
          {data.procedures.additionalNotes && (
            <div dangerouslySetInnerHTML={{ 
              __html: data.procedures.additionalNotes?.content || '' 
            }} />
          )}
        </div>
      )}
    </div>
  )

  const renderVirtualMeetingInfo = () => {
    if (!data.virtualMeeting) return null

    return (
      <div className="text-center mb-8 space-y-2">
        <div className="font-semibold">Members of the public may participate over {data.virtualMeeting.platform}:</div>
        
        <div className="text-sm">
          If you would like to speak on an agenda item, you can access the meeting remotely by joining from a PC, MAC, IPAD, iPhone, or Android device.
        </div>
        
        <div className="font-semibold">Please click this URL to join.</div>
        
        {data.virtualMeeting.url && (
          <div className="text-blue-600 underline text-sm">
            {data.virtualMeeting.url}
          </div>
        )}
        
        {data.virtualMeeting.passcode && (
          <div className="bg-yellow-300 inline-block px-2 py-1 font-bold">
            PASSCODE: {data.virtualMeeting.passcode}
          </div>
        )}
        
        {data.virtualMeeting.phoneNumbers && data.virtualMeeting.phoneNumbers.length > 0 && (
          <div>
            <div className="font-semibold">Or join by phone:</div>
            {data.virtualMeeting.phoneNumbers.map((phone, index) => (
              <div key={index} className="text-sm">{phone}</div>
            ))}
          </div>
        )}
        
        {data.virtualMeeting.meetingId && (
          <>
            <div>Webinar ID: {data.virtualMeeting.meetingId}</div>
            <div className="bg-yellow-300 inline-block px-2 py-1 font-bold">
              PASSCODE: {data.virtualMeeting.passcode}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto p-8 bg-white ${mode === 'preview' ? 'print:p-0' : ''}`}>
      {renderHeader()}
      {renderMeetingInfo()}
      {renderProcedures()}
      {renderVirtualMeetingInfo()}
      
      {/* Agenda Items Section */}
      {data.agendaItems.length > 0 && (
        <div className="mt-8">
          <div className="font-bold text-lg mb-4">AGENDA</div>
          {data.agendaItems.map((item, index) => (
            <div key={item.id} className="mb-4">
              <div className="font-semibold">
                {index + 1}. {item.title}
              </div>
              {mode === 'content-edit' ? (
                <RichTextEditor
                  content={item.description}
                  onChange={(content) => updateData(`agendaItems.${index}.description`, content)}
                  placeholder="Enter agenda item description..."
                  minimal={true}
                />
              ) : (
                <div className="ml-4 text-sm" dangerouslySetInnerHTML={{ 
                  __html: item.description?.content || '' 
                }} />
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Footer for disclaimers */}
      <div className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-600">
        <div className="text-center">
          IF STARTING TIMES ARE LISTED FOR EACH AGENDA ITEM THEY SHOULD BE CONSIDERED A GUIDELINE ONLY.
          THE CITY COUNCIL RESERVES THE RIGHT TO ALTER THE ORDER OF DISCUSSION IN ORDER TO RUN AN 
          EFFECTIVE MEETING.
        </div>
      </div>
    </div>
  )
}

// Sample data for Dublin-style agenda
export const dublinSampleData: AgendaData = {
  template: {
    city: "Dublin",
    state: "California",
    logo: "/images/dublin-logo.png",
    layout: "formal-council",
    styling: {
      primaryColor: "#22c55e",
      backgroundColor: "#ffffff",
      fontFamily: "Inter"
    }
  },
  meeting: {
    title: "Regular Meeting of the Dublin City Council",
    date: "Tuesday, May 6, 2025",
    time: "7:00 PM",
    location: {
      venue: "Peter W. Synder Council Chamber",
      address: "100 Civic Plaza, Dublin, CA 94568"
    },
    meetingType: "regular"
  },
  councilMembers: [
    { name: "Dr. Sherry Hu", title: "Mayor" },
    { name: "Kashef Qaadri", title: "Vice Mayor" },
    { name: "Jean Josey", title: "Councilmember" },
    { name: "Michael McCorriston", title: "Councilmember" },
    { name: "John Morada", title: "Councilmember" }
  ],
  contactInfo: {
    website: "www.dublin.ca.gov"
  },
  procedures: {
    broadcastInfo: {
      type: "doc",
      content: "<p>This City Council meeting will be broadcast live on Comcast T.V. channel 28 beginning at 7:00 p.m. This meeting will also be livestreamed at www.tv30.org and on the City's website at: https://dublin.ca.gov/ccmeetings</p>"
    },
    publicComment: {
      type: "doc", 
      content: "<p>For the convenience of the City and as a courtesy to the public, members of the public who wish to offer comments electronically have the option of giving public comment via Zoom, subject to the following procedures:</p><ul><li>Fill out an online speaker slip available at www.dublin.ca.gov. The speaker slip will be made available at 10:00 a.m. on Tuesday, May 6, 2025. Upon submission, you will receive Zoom link information from the City Clerk. Speakers slips will be accepted until the staff presentation ends, or until the public comment period on non-agenda items is closed.</li><li>Once connected to the Zoom platform using the Zoom link information from the City Clerk, the public speaker will be added to the Zoom webinar as an attendee and muted. The speaker will be able to observe the meeting from the Zoom platform.</li><li>When the agenda item upon which the individual would like to comment is addressed, the City Clerk will announce the speaker in the meeting when it is their time to give public comment. The speaker will then be unmuted to give public comment via Zoom.</li><li>Technical difficulties may occur that make the option unavailable, and, in such event, the meeting will continue despite the inability to provide the option.</li></ul>"
    },
    additionalNotes: null
  },
  virtualMeeting: undefined,
  agendaItems: []
}

// Sample data for Sausalito-style agenda  
export const sausalitSampleData: AgendaData = {
  template: {
    city: "Sausalito",
    state: "California", 
    logo: "/images/sausalito-logo.png",
    layout: "sausalito",
    styling: {
      primaryColor: "#1e40af",
      backgroundColor: "#ffffff", 
      fontFamily: "Inter"
    }
  },
  meeting: {
    title: "Special & Regular City Council Agenda",
    date: "Tuesday, December 17, 2024",
    time: "7:00 PM",
    specialTime: "6:00 PM",
    location: {
      venue: "Council Chambers",
      address: "420 Litho Street, Sausalito, CA 94965"
    },
    meetingType: "both"
  },
  councilMembers: [],
  contactInfo: {
    email: "cityclerk@sausalito.gov"
  },
  procedures: {
    broadcastInfo: null,
    publicComment: {
      type: "doc",
      content: "<p>Your phone number will appear on the screen unless you first dial *67 before dialing the numbers shown above. If you want to comment during the public comment portion of the agenda, you can use the \"Raise Hand\" function in Zoom under Reactions or Press *9 if you are calling in. If you do not want to speak during the public comment portion of the agenda, you may also submit email correspondence to cityclerk@sausalito.gov. Emails will be accepted up until 2:00 PM the day of the meeting.</p>"
    },
    additionalNotes: {
      type: "doc", 
      content: "<p>To give everyone an opportunity to be heard and to ensure the presentation of different points of view, the City Council requests that members of the audience who wish to speak, complete a Speakers' Card and when called on: 1) Always address the Chair; 2) State your name; 3) State your views succinctly; and 4) Limit your presentations to two (2) minutes. However, if there is a large group present to speak on the same issue, the City Council has the discretion to limit speakers to less than two minutes.</p>"
    }
  },
  virtualMeeting: {
    platform: "zoom",
    url: "https://us02web.zoom.us/j/85275894165?pwd=KlKaETkUjibIUh8OI0OeCg9PIE9jn5.1",
    meetingId: "852 7589 4165", 
    passcode: "123456",
    phoneNumbers: [
      "+1 669 900 6833",
      "+1 669 444 9171", 
      "+1 719 359 4580",
      "+1 253 205 0468"
    ]
  },
  agendaItems: []
} 