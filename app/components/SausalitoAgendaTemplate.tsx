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

interface SausalitoAgendaTemplateProps {
  meetingData: MeetingData;
}

const SausalitoAgendaTemplate: React.FC<SausalitoAgendaTemplateProps> = ({ meetingData }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-sans">
      {/* City seal placeholder */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto bg-blue-800 rounded-full flex items-center justify-center mb-4">
          <span className="text-white text-xs">CITY SEAL</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">CITY OF SAUSALITO</h1>
        <h2 className="text-lg font-semibold mb-2">SPECIAL & REGULAR CITY COUNCIL AGENDA</h2>
        <p className="text-sm mb-1">In the COUNCIL CHAMBERS via Zoom at 420 LITHO STREET, SAUSALITO, CA 94965</p>
        <p className="text-sm font-semibold mb-2">{meetingData.date}</p>
        <p className="text-sm font-semibold mb-1">SPECIAL MEETING BEGINS AT 6:00 PM</p>
        <p className="text-sm font-semibold mb-4">REGULAR MEETING BEGINS AT 7:00 PM</p>
      </div>

      {/* Zoom participation info */}
      <div className="text-center mb-6">
        <p className="font-semibold mb-4">Members of the public may participate over Zoom:</p>
        
        <div className="text-sm space-y-2 mb-4">
          <p>If you would like to speak on an agenda item, you can access the meeting remotely by joining from a PC,</p>
          <p>MAC, IPAD, iPhone, or Android device.</p>
          <p className="font-semibold mt-4">Please click this URL to join.</p>
          
          <div className="my-4">
            <a href="#" className="text-blue-600 underline text-xs">
              https://us02web.zoom.us/j/85275894165?pwd=KlKaETkUjiblUh8Ol0OeCg9PlE9jn5.1
            </a>
          </div>
          
          <div className="bg-yellow-300 px-2 py-1 inline-block font-bold">
            PASSCODE: 123456
          </div>
          
          <div className="mt-4 text-sm">
            <p className="font-semibold">Or join by phone:</p>
            <p>+1 669 900 6833</p>
            <p>+1 669 444 9171</p>
            <p>+1 719 359 4580</p>
            <p>+1 253 205 0468</p>
          </div>
          
          <div className="mt-4">
            <p className="font-semibold">Webinar ID: 852 7589 4165</p>
            <div className="bg-yellow-300 px-2 py-1 inline-block font-bold">
              PASSCODE: 123456
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-sm text-left mb-6">
        <p className="mb-2">
          Your phone number will appear on the screen unless you first dial *67 before dialing the numbers shown
          above. If you want to comment during the public comment portion of the agenda, you can use the "Raise
          Hand" function in Zoom under Reactions or Press *9 if you are calling in. If you do not want to speak
          during the public comment portion of the agenda, you may also submit email correspondence to{' '}
          <a href="mailto:cityclerk@sausalito.gov" className="text-blue-600 underline">
            cityclerk@sausalito.gov
          </a>
          . Emails will be accepted up until 2:00 PM the day of the meeting.
        </p>
      </div>

      <hr className="border-t-2 border-black mb-6" />

      {/* Meeting guidelines */}
      <div className="text-sm text-left mb-6">
        <p className="font-bold mb-2">
          IF STARTING TIMES ARE LISTED FOR EACH AGENDA ITEM THEY SHOULD BE CONSIDERED A GUIDELINE ONLY.
          THE CITY COUNCIL RESERVES THE RIGHT TO ALTER THE ORDER OF DISCUSSION IN ORDER TO RUN AN
          EFFECTIVE MEETING. IF YOU WISH TO ASSURE YOURSELF OF HEARING A PARTICULAR DISCUSSION, PLEASE
          ATTEND THE ENTIRE MEETING. THE CITY VALUES AND INVITES WRITTEN COMMENTS FROM THE PUBLIC ON
          MATTERS SET FOR CITY COUNCIL CONSIDERATION. IN ORDER TO PROVIDE CITY COUNCIL MEMBERS AMPLE
          TIME TO REVIEW ALL CORRESPONDENCE, PLEASE SUBMIT CORRESPONDENCE TO STAFF IN ADVANCE OF THE
          MEETING.
        </p>
      </div>

      {/* Speaker guidelines */}
      <div className="text-sm text-left mb-6">
        <p>
          To give everyone an opportunity to be heard and to ensure the presentation of different points of view, the
          City Council requests that members of the audience who wish to speak, complete a Speakers' Card and
          when called upon: 1) Always address the Chair; 2) State your name; 3) State your views succinctly; and 4) Limit
          presentations to two (2) minutes. However, if there is a large group present to speak on the same issue,
          the City Council has the discretion to limit speakers to less than two minutes.
        </p>
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

export default SausalitoAgendaTemplate; 