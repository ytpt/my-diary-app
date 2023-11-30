"use server";

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';

type ToggleDutyParams = {
    duty: string;
    dutyTime: Record<string, boolean> | null;
    date: string | null;
    done: boolean;
}

export async function toggleDuty({ duty, dutyTime, date, done }: ToggleDutyParams) {
    if (!dutyTime || !date) {
        return;
    }

    const updatedDutyTime = {
        [duty]: {...dutyTime, [date]: done === undefined ? true : !done}
    }

    await kv.hset("duties", updatedDutyTime);
    revalidatePath("/duty/[duty]", "page");
    revalidatePath("/");
}