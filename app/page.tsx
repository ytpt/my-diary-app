import Image from 'next/image'
import DayState from "../components/DayState";

export default function Home() {
  const duties = {
    'daily coding': {
      '10.11.2023': true,
      '11.11.2023': false,
      '12.11.2023': true,
    },
    'daily React/Next JS': {
      '10.11.2023': false,
      '11.11.2023': true,
      '12.11.2023': true,
    },
    'daily looking for a job': {
      '10.11.2023': true,
      '11.11.2023': false,
      '12.11.2023': false,
    },
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
     <main className="container relative flex flex-col gap-8 px-4 pt-16">
       {Object.keys(duties).length === 0 && (
           <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
             You have no registered duty!
           </h1>
       )}
       {Object.entries(duties).map(([dutyName, dates]) => (
          <div key={dutyName} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xl font-light text-white font-sans">
                {dutyName}
              </span>
              <button>
                <Image src="/images/delete.svg" width={20} height={20} alt="Delete icon" />
              </button>
            </div>
            <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
              {weekDays.map(day => (
                  <div key={day} className="flex flex-col">
                    <span className="font-sans text-center text-xs text-white">
                      {day}
                    </span>
                    <DayState day={false} />
                  </div>
              ))}
            </section>
          </div>
       ))}
     </main>
  )
}
