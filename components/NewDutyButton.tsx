type ButtonType = "button" | "submit";

export default function NewDutyButton({ type, text, bgColor }: {
    type: ButtonType;
    text: string;
    bgColor: string;
}) {

    return (
        <button
            type={type}
            className={`text-neutral-900 ${bgColor} font-display font-regular text-2xl p-2 rounded-md mt-8`}
        >
            {text}
        </button>
    )
}