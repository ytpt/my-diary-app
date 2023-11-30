import Image from 'next/image'
import DayState from '@/components/DayState';
import Link from 'next/link';
import { kv } from '@vercel/kv';

type DutySchedule = { [duty: string]: Record<string, boolean> } | null;

export default async function Home() {
    const duties: DutySchedule = (await kv.hgetall("duties")) as DutySchedule | null;
    const today = new Date();
    const todayWeekDay = today.getDay();
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const sortedWeekDays = weekDays.slice(todayWeekDay).concat(weekDays.slice(0, todayWeekDay));

    const last7Days = weekDays.map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() -index);
        return date.toISOString().slice(0, 10);
    }).reverse();

    return (
        <main className="container relative flex flex-col gap-8 px-4 pt-16">
            {Object.keys(duties).length === 0 && (
                <h1 className="mt-20 text-4xl font-light text-white font-display text-center">
                    You have no registered duty :(
                </h1>
            )}
            {Object.entries(duties).map(([dutyName, dutyTime]) => (
                <div key={dutyName} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-light text-white font-sans">
                            {dutyName}
                        </span>
                        <button>
                            <Image src="/images/delete.svg" width={20} height={20} alt="Delete icon"/>
                        </button>
                    </div>
                    <Link href={`duty/${dutyName}`}>
                        <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2">
                            {sortedWeekDays.map((day, index) => (
                                <div key={day} className="flex flex-col">
                                    <span className="font-sans text-center text-xs text-white">
                                        {day}
                                    </span>
                                    <DayState day={dutyTime[last7Days[index]]}/>
                                </div>
                            ))}
                        </section>
                    </Link>
                </div>
            ))}
            <Link
                href="new-duty"
                className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2 text-neutral-900 bg-[#45EDAD] font-display font-regular text-2xl rounded-md"
            >
                add new duty
            </Link>
        </main>
    )
}
