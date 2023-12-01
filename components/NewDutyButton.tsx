export default function NewDutyButton({ text, bgColor }: {text: string, bgColor: string}) {
    return (
        <button
            type={text === "Save" ? "submit" : "button"}
            className={`text-neutral-900 ${bgColor} font-display font-regular text-2xl p-2 rounded-md mt-8`}
        >
            {text}
        </button>
    )
}