import "./calendar.scss";
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




interface MyEvent {
  title: string;
  start: Date;
  end: Date;
}


const myEventsList = [
  {
    title: 'Birthday Party',
    start: new Date(2023, 8, 20, 7, 0, 0), // 20th of September, 2023 at 07:00
    end: new Date(2023, 8, 20, 9, 30, 0), // 20th of September, 2023 at 09:30
  },
  {
    title: 'Business Meeting',
    start: new Date(2023, 8, 22, 10, 30, 0), // 22nd of September, 2023 at 10:30
    end: new Date(2023, 8, 22, 12, 30, 0), // 22nd of September, 2023 at 12:30
  },
  // More events...
];

const localizer = momentLocalizer(moment);

type CalendarProps = {};

Modal.setAppElement('#root');
const MyCalendar: React.FC<CalendarProps> = () => {
  const [events, setEvents] = useState<MyEvent[]>(myEventsList);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  
  
  const handleSelect = ({ start, end }: { start: Date | string, end: Date | string }) => {
    setStartDate(new Date(start));
    setEndDate(new Date(end));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (eventTitle && startDate && endDate) {
      setEvents([
        ...events,
        {
          start: startDate,
          end: endDate,
          title: eventTitle,
        },
      ]);
      setEventTitle("");
      setStartDate(null);
      setEndDate(null);
      closeModal();
    }
  };

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelect}
      />
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  shouldCloseOnOverlayClick={true}
  contentLabel="Event Modal"
  className="my-modal-class"
  overlayClassName="my-modal-overlay"
>
<div className="modal-content">
 
  <h2>Create Event</h2>
  <div className="form-container">
  
  <form onSubmit={handleSubmit} className="event-form">
  <h4>Start Date</h4>
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
  />

  <h4>End Date</h4>
  <DatePicker
    selected={endDate}
    onChange={(date) => setEndDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
  />

  <h4>Title</h4>
  <input
    type="text"
    className="title-input"
    placeholder="Event Title"
    value={eventTitle}
    onChange={(e) => setEventTitle(e.target.value)}
    required
  />
</form>


     <button type="submit" className="modal-button">Create</button>
     <button className="modal-button" onClick={closeModal}>Close</button>
  </div>
</div>

</Modal>


    </div>
  );
};


export default MyCalendar;