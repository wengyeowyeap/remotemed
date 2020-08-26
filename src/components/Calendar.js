import React, { useState } from "react";
import  { addMonths, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isSameMonth, addDays, format, parse } from "date-fns";
import "../styles/Calendar.css";

const Calendar = (props) => {
    const {showAppointment, setShowAppointment} = props;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const header = () => {
    const dateFormat = "MMMM yyyy";
    return (
       <div className="header row-calendar flex-middle">
          <div className="column text-center">
             <div className="icon" onClick={prevMonth}>
                chevron_left
             </div>
          </div>
          <div className="column text-center">
             <span>{format(currentDate, dateFormat)}</span>
          </div>
          <div className="column text-center">
             <div className="icon" onClick={nextMonth}>
                chevron_right
             </div>
          </div>
       </div>
       );
    };
    
    const daysOfWeek = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
          days.push(
             <div className="column text-center" key={i}>
             {format(addDays(startDate, i), dateFormat)}
             </div>
          );
       }
       return <div className="days row-calendar ">{days}</div>;
    };

   //  const handleAppointment = (e) => {
   //     if (showAppointment == null){
   //        setShowAppointment(false);
   //     } else{
   //        setShowAppointment(true);
   //     }
       
   //  }

    const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
       for (let i = 0; i < 7; i++) {
       formattedDate = format(day, dateFormat);
       const cloneDay = day;
    days.push(
          <div 
           className={`column cell ${!isSameMonth(day, monthStart)
           ? "disabled" : isSameDay(day, selectedDate) 
           ? "selected" : "" }`} 
           key={day} 
         //   onClick={handleAppointment}
           > 
           <span className="number">{formattedDate}</span>
           <span className="bg">{formattedDate}</span>
         </div>
         );
       day = addDays(day, 1);
      }
    rows.push(
          <div className="row-calendar" key={day}> {days} </div>
        );
       days = [];
     }
     return <div className="body">{rows}</div>;
    }
    const nextMonth = () => {
       setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
       setCurrentDate(subMonths(currentDate, 1));
    };
    const onDateClick = day => {
    setSelectedDate(day);
    }
    
    return (
       <div className="calendar">
          <div>{header()}</div>
          <div>{daysOfWeek()}</div>
          <div>{cells()}</div>
       </div>
      );
    };
    export default Calendar;