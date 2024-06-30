import { ButtonProps } from "@/_utils/types";

export default function Button(props: ButtonProps) {
    return (
        <div className="mt-5">
            <button className="bg-green-500 text-white p-5 rounded w-60" onClick={props.onClick}>
                {props.text}
            </button>
        </div>
    );
}
