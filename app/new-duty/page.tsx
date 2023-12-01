import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import NewDutyButton from '../../components/NewDutyButton';

export default function NewDuty() {
    async function newDuty(formData: FormData) {
        "use server";

        const duty = formData.get("duty");
        await kv.hset("duties", {[duty as string]: {}});
        revalidatePath("/");
        redirect("/");
    }

    return (
        <main className="container relative flex flex-col gap-8 px-12 pt-16">
            <h1 className="text-4xl font-light text-center text-white font-display">
                new duty
            </h1>
            <form
                action={newDuty}
                className="flex flex-col gap-4 mt-4"
            >
                <input
                    type="text"
                    name="duty"
                    id="duty"
                    className="p-2 font-sans text-xl text-white rounded-md bg-neutral-800"
                />
                <NewDutyButton text="Save" bgColor="bg-[#45EDAD]"/>
                <NewDutyButton text="Cancel" bgColor="bg-[#ed454d]"/>
            </form>
        </main>
    );
};
