import "./calendar.scss";
import React, { Fragment,useState,useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"




interface MyEvent {
  title: string;
  start: Date;
  end: Date;
}




const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

type CalendarProps = {};

Modal.setAppElement('#root');
const MyCalendar: React.FC<CalendarProps> = () => {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<MyEvent | null>(null);
  

  const handleSelect = ({ start, end }: { start: Date | string, end: Date | string }) => {
    const endDate = moment(start).startOf('day').add(23, 'hours').add(59, 'minutes').toDate();
    setStartDate(moment(start).toDate());
    setEndDate(endDate);
    setIsOpen(true);
    setSelectedEvent(null); // Reset selected event when creating a new one
  };
  

  const handleEventDrop = (data: any) => {
    const { event, start, end } = data;
    setEvents(events ? events.map(evt => evt === event ? { ...event, start, end } : evt) : []);
  };
  
  const handleEventResize = (data: any) => {
    const { event, start, end } = data;
    setEvents(events ? events.map(evt => evt === event ? { ...event, start, end } : evt) : []);
  };
  
  
  const handleDoubleClickEvent = (event: any) => {
    setSelectedEvent(event);
    setStartDate(new Date(event.start));
    setEndDate(new Date(event.end));
    setEventTitle(event.title);
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

  const updateEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (eventTitle && startDate && endDate && selectedEvent) {
      setEvents(events.map(evt => evt === selectedEvent ? { ...evt, start: startDate, end: endDate, title: eventTitle } : evt));
      setEventTitle("");
      setStartDate(null);
      setEndDate(null);
      setSelectedEvent(null);
      closeModal();
    }
  };
  
  const deleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(evt => evt !== selectedEvent));
      setSelectedEvent(null);
      setEventTitle("");
      closeModal();
    }
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleUpdateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateEvent({
      preventDefault: () => {},
      currentTarget: formRef.current
    } as React.FormEvent<HTMLFormElement>);
  };
  
  const handleCreateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSubmit({
      preventDefault: () => {},
      currentTarget: formRef.current
    } as React.FormEvent<HTMLFormElement>);
  };
  


  return (
    <div>
      <DnDCalendar
         selectable
         localizer={localizer}
         events={events}
         startAccessor={(event: any) => moment(event.start).toDate()}
         endAccessor={(event: any) => moment(event.end).toDate()}
         allDayAccessor={() => false} // Add this line
         style={{ height: 500 }}
         onSelectSlot={handleSelect}
         onEventDrop={handleEventDrop}
         onEventResize={handleEventResize}
         onDoubleClickEvent={handleDoubleClickEvent}
         popup={true}
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
    <h2>{selectedEvent ? "Edit Event" : "Create Event"}</h2>
    <div className="form-container">
      <form ref={formRef} onSubmit={selectedEvent ? updateEvent : handleSubmit} className="event-form">
        <h4>Start Date</h4>
        <DatePicker
          className="input-field date-picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <h4>End Date</h4>
        <DatePicker
          className="input-field"
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
      <form>
        {selectedEvent ? (
          <Fragment>
            <button type="button" className="modal-button modal-input" onClick={handleUpdateClick}>Update</button>
            <button type="button" className="modal-button modal-input" onClick={deleteEvent}>Delete</button>
          </Fragment>
        ) : (
          <button type="button" className="modal-button modal-input" onClick={handleCreateClick}>Create</button>

        )}
        <button type="button" className="modal-button modal-input" onClick={closeModal}>Close</button>
      </form>
    </div>
  </div>
</Modal>


    </div>
  );
};


export default MyCalendar;