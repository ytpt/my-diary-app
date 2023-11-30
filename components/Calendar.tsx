"use client"

import { useEffect, useState } from 'react';

function getDayInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const firstWeekDay = (date.getDay() + 6) % 7;
    const numberOfEmptyDays = Array(firstWeekDay).fill(null);
    const days = [...numberOfEmptyDays]

    while(date.getMonth() == month) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return days;
}

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default  function Calendar() {
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dayInMonth, setDayInMonth] = useState(getDayInMonth(currentMonth, currentYear));


    useEffect(() => {
        setDayInMonth(getDayInMonth(month, year));
        setSelectedDate(new Date(year, month))
    }, [month, year])

    const goToPrevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    }

    const goToNextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    }

    const getFullDate = () => {
        return `${selectedDate.toLocaleString("en", {
            month: "long",
        })} ${selectedDate.getFullYear()}`;
    }

    return (
        <section className="w-full my-2 rounded-md bg-neutral-800">
            <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
                <button onClick={goToPrevMonth}>←</button>
                <span>{getFullDate()}</span>
                <button onClick={goToNextMonth}>→</button>
            </div>
            <div className="grid w-full grid-cols-7 mt-2">
                {weekDays.map(day => (
                    <div key={day} className="flex flex-col items-center p-2">
                        <span className="font-sans text-xs font-light text-neutral-200">
                            {day}
                        </span>
                    </div>
                ))}
                {dayInMonth.map((day, index) => (
                    <div key={index} className="flex flex-col items-center p-2">
                        <span className="font-sans text-xs text-center font-light text-neutral-400">
                            {day?.getDate()}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};
