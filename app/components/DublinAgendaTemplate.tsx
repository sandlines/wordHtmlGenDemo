import React from 'react';

interface AgendaItem {
  title: string;
  description?: string;
  timeEstimate?: string;
}

interface MeetingData {
  date: string;
  agendaItems: AgendaItem[];
}

interface DublinAgendaTemplateProps {
  meetingData: MeetingData;
}

const DublinAgendaTemplate: React.FC<DublinAgendaTemplateProps> = ({ meetingData }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-sans">
      {/* Header with three columns */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Left column - Councilmembers */}
        <div className="text-left">
          <h3 className="text-gray-600 font-medium mb-2">COUNCILMEMBERS</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div>Dr. Sherry Hu, Mayor</div>
            <div>Kashef Qaadri, Vice Mayor</div>
            <div>Jean Josey, Councilmember</div>
            <div>Michael McCorriston, Councilmember</div>
            <div>John Morada, Councilmember</div>
          </div>
        </div>

        {/* Center column - Dublin logo and title */}
        <div className="text-center">
          <div className="mb-4">
            {/* Shamrock logo placeholder */}
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">☘</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">DUBLIN</h1>
          <p className="text-sm text-gray-600">CALIFORNIA</p>
        </div>

        {/* Right column - Location info */}
        <div className="text-right">
          <div className="text-sm text-gray-600 space-y-1">
            <div>Peter W. Snyder Council Chamber</div>
            <div>Dublin Civic Center</div>
            <div>100 Civic Plaza</div>
            <div>Dublin, CA 94568</div>
            <div>www.dublin.ca.gov</div>
          </div>
        </div>
      </div>

      {/* Meeting title and details */}
      <div className="text-center mb-6">
        <h2 className="text-lg text-gray-600 mb-2">Regular Meeting of the</h2>
        <h1 className="text-3xl font-bold text-black mb-6">DUBLIN CITY COUNCIL</h1>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-left">
            <p className="font-semibold">{meetingData.date}</p>
          </div>
          <div className="text-right">
            <p><span className="font-semibold">Location:</span> Peter W. Snyder</p>
            <p className="ml-16">Council Chamber</p>
            <p className="ml-16">100 Civic Plaza</p>
            <p className="ml-16">Dublin, CA 94568</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-semibold">REGULAR MEETING 7:00 PM</p>
        </div>
      </div>

      {/* Additional Meeting Procedures Box */}
      <div className="border-2 border-black p-4 mb-6">
        <h3 className="text-center font-bold text-lg mb-4 underline">Additional Meeting Procedures</h3>
        
        <div className="text-sm text-left space-y-4">
          <p>
            This City Council meeting will be broadcast live on Comcast T.V. channel 28 
            beginning at 7:00 p.m. This meeting will also be livestreamed at www.tv30.org 
            and on the City's website at: https://dublin.ca.gov/ccmeetings
          </p>

          <p>
            For the convenience of the City and as a courtesy to the public, members of the 
            public who wish to offer comments electronically have the option of giving public 
            comment via Zoom, subject to the following procedures:
          </p>

          <div className="ml-4 space-y-3">
            <div className="flex">
              <span className="mr-2">-</span>
              <p>
                Fill out an online speaker slip available at www.dublin.ca.gov. The speaker slip 
                will be made available at 10:00 a.m. on Tuesday, May 6, 2025. Upon 
                submission, you will receive Zoom link information from the City Clerk. 
                Speakers slips will be accepted until the staff presentation ends, or until the 
                public comment period on non-agenda items is closed.
              </p>
            </div>

            <div className="flex">
              <span className="mr-2">-</span>
              <p>
                Once connected to the Zoom platform using the Zoom link information from 
                the City Clerk, the public speaker will be added to the Zoom webinar as an 
                attendee and muted. The speaker will be able to observe the meeting from the 
                Zoom platform.
              </p>
            </div>

            <div className="flex">
              <span className="mr-2">-</span>
              <p>
                When the agenda item upon which the individual would like to comment is 
                addressed, the City Clerk will announce the speaker in the meeting when it is 
                their time to give public comment. The speaker will then be unmuted to give 
                public comment via Zoom.
              </p>
            </div>

            <div className="flex">
              <span className="mr-2">-</span>
              <p>
                Technical difficulties may occur that make the option unavailable, and, in 
                such event, the meeting will continue despite the inability to provide the 
                option.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agenda items */}
      <div className="space-y-4">
        {meetingData.agendaItems.map((item: AgendaItem, index: number) => (
          <div key={index} className="border-b border-gray-300 pb-2">
            <h3 className="font-bold text-lg">{item.title || ''}</h3>
            {item.description && item.description.trim() && (
              <p className="text-sm text-gray-700 mt-1">{item.description}</p>
            )}
            {item.timeEstimate && item.timeEstimate.trim() && (
              <p className="text-xs text-gray-500 mt-1">Est. Time: {item.timeEstimate}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DublinAgendaTemplate; 