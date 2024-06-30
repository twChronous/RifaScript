import { InputsProps } from "@/_utils/types";

export default function Inputs(props: InputsProps) {
    const containerClass = (props.type === 'number' && props.isCellPhone != true)
        ? 'flex justify-center items-center mt-5'
        : 'mt-5';
    const inputClass = (props.type === 'number' && props.isCellPhone != true)
        ? 'text-black rounded p-4 ml-5 w-14 bg-grey-500'
        : 'text-black rounded p-4 bg-grey-500';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'number') {
            const value = parseFloat(event.target.value);
            if (value < 0) {
                event.target.value = "0";
            }
        }
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <div className={containerClass}>
            <p>{props.title}</p>
            <div className='text-center content-center'>
                <input
                    min={0}
                    type={props.type}
                    className={inputClass}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
}
