import { InputsProps } from "@/_utils/types";

export default function Inputs(props:InputsProps) {
    const containerClass = (props.type === 'number' && props.isCellPhone != true)
    ? 'flex justify-center items-center mt-5'
    : 'mt-5';
    const InputClass =  (props.type === 'number' && props.isCellPhone != true)
    ? 'text-black rounded p-4 ml-5 w-14 bg-grey-500'
    : 'text-black rounded p-4 bg-grey-500';
    return (
        <div className={containerClass}>
            <p>{props.title}</p>
        <div className='text-center content-center'>
            <input 
                type={props.type} 
                className={InputClass}
                onChange={props.onChange}
                placeholder={props.placeholder} 
                />
        </div>
    </div>
    );
  }
  