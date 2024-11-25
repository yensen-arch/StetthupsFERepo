import Image from "../assets/Image-bundle.png";

export default function Events() {
  const events = [
    {
      title: "Effects of Internet on focus : Design for mindfulness",
      host: "Angela Longeria",
      date: "Nov 2nd, 2023",
      time: "2:30 - 4:30 pm",
      platform: "Google Meet",
    },
    {
      title: "Stress and focus : Design for mindfulness",
      host: "Stephen Johns",
      date: "Nov 2nd, 2023",
      time: "2:30 - 4:30 pm",
      platform: "Google Meet",
    },
  ];

  return (
    <div className="w-full max-w-md p-4 font-sans">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-left">Events</h2>
      {events.map((event, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-md mb-4 overflow-hidden text-left"
        >
          <div className="p-4">
            <h3 className="text-lg font-medium text-left">{event.title}</h3>
            <p className="text-sm text-gray-500 text-left">Hosted by {event.host}</p>
            <div className="mt-4 text-left">
              <p className="font-medium mb-2">Meeting Attending</p>
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  src={Image}
                  alt="Attendee 1"
                  className="h-8 w-18 rounded-full ring-2 ring-white"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-4 text-left">
              <span>{event.date}</span>
              <span>{event.time}</span>
              <span>{event.platform}</span>
            </div>
          </div>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-medium">
            Enroll Now!
          </button>
        </div>
      ))}
    </div>
  );
}
