import React, { ChangeEvent } from 'react';

interface InputsProps {
    title?: string;
    placeholder?: string;
    isCellPhone?: boolean;
    type: 'text' | 'number' | 'radio' | 'email';
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Inputs(props:InputsProps) {
    const containerClass = (props.type === 'number' && props.isCellPhone != true)
    ? 'flex justify-center items-center mt-5'
    : 'mt-5';
    const InputClass =  (props.type === 'number' && props.isCellPhone != true)
    ? 'text-black rounded p-4 ml-5 w-14 bg-grey-500'
    : 'text-black rounded p-4 bg-grey-500';
    const InputsClass = props.type === 'radio' 
    ? 'flex justify-center items-center mt-5'
    : 'text-center content-center';
    return (
        <div className={containerClass}>
            <p>{props.title}</p>
        <div className={InputsClass}>
            <input 
                type={props.type} 
                className={InputClass}
                onChange={props.onChange}
                placeholder={props.placeholder} 
                />

            {props.type === 'radio' ? <p className="ml-2">{props.placeholder}</p> : <></>}
        </div>
    </div>
    );
  }
  