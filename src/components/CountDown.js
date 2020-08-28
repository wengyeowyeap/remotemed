import React, { useState, useEffect } from 'react';
import { faDownload, faBatteryEmpty } from '@fortawesome/free-solid-svg-icons';


function CountDown(props) {
    // const [timeLeft, setTimeLeft] = useState({})
    const [timerComp, setTimerComponent] = useState([])
    const { closest_appointment_datetime, triggerButton } = props
    // the reason why we want to put the timer interval inside useEffect is because we don't want a new timer to be created every time we rerender our page. setInterval() will return an id and store that in memory somewhere. What this memory does is that every 1000ms, it will invoke calculateTimeLeft.

    useEffect(() => {
        if (closest_appointment_datetime) {
            const timer = setInterval(() => {
                calculateTimeLeft();
            }, 1000);
        }
        // return () => clearTimeout(timer)
        console.log(closest_appointment_datetime)

    }, [closest_appointment_datetime])


    //   the reason why we need to check closest_appointment_datetime is because initially when they are passed down. It is undefined. This is because the appointmenttimes was an empty list when we initiate the state. And we are passing down appointmenttimes[0]. so a






    const calculateTimeLeft = () => {
        // The + before the new Date object is shorthand to tell JavaScript to cast the object as an integer
        // so its like taking the setted date casted integer and minus the casted integer from current Date. and the reuslt will be in microseconds
        // console.log(closest_appointment_datetime)
        let year = 0
        let month = 0
        let day = 0
        let hour = 0
        let minute = 0
        if (closest_appointment_datetime) {
            // console.log(closest_appointment_datetime)
            day = (closest_appointment_datetime.slice(5, 7))
            month = (closest_appointment_datetime.slice(8, 11))
            year = (closest_appointment_datetime.slice(12, 16))
            hour = (closest_appointment_datetime.slice(17, 19))
            minute = (closest_appointment_datetime.slice(20, 22))
            // console.log(month,day)

            if (month == "Jan") {
                month = 0
            }
            if (month == "Feb") {
                month = 1
            }
            if (month == "Mar") {
                month = 2
            }
            if (month == "Apr") {
                month = 3
            }
            if (month == "May") {
                month = 4
            }
            if (month == "Jun") {
                month = 5
            }
            if (month == "Jul") {
                month = 6
            }
            if (month == "Aug") {
                month = 7
            }
            if (month == "Sep") {
                month = 8
            }
            if (month == "Oct") {
                month = 9
            }
            if (month == "Nov") {
                month = 10
            }
            if (month == "Dis") {
                month = 11
            }
        }
        const difference = (new Date(year, month, day, hour, minute, 0, 0)) - (new Date());
        // differnet is the seconds from currenttime to the date
        let timeLeft = {}
        // console.log(difference)
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }

        triggerButton(timeLeft)

        // console.log(timeLeft)

        // Object.keys(timeLeft) = [days,hours,minutes,seconds]

        const timerComponents = []
        Object.keys(timeLeft).forEach((key) => {
            // below's code are to prepare for if there is no days/hours/minutes.
            if (timeLeft["days"] < 0) {
                timerComponents.push(
                    <span>
                    </span>
                );
            } else {
                timerComponents.push(
                    <span>
                        {timeLeft[key]} {key}{" "}
                    </span>
                );
            }
            //   console.log(timerComponents)

        });
        setTimerComponent(timerComponents)
        // return timeLeft
    };
    console.log(timerComp)
    const stopTimer = () => {
        // return () => clearTimeout(timer)

    }




    return (<>


        <div>
            {timerComp}
        </div>

    </>);
}

export default CountDown;
