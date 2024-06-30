import React, { ChangeEvent } from 'react';

export interface DropdownButtonProps {
    text: string;
    data: { id: string; name: string }[];
    onSelect: (id: string) => void; 
} 
export interface Seller {
    id: string;
    name: string;
    quantitysold: number;
}
export interface Buyer {
    name: string;
    slots: number[];
}
export interface InputsProps {
    title?: string;
    placeholder?: string;
    isCellPhone?: boolean;
    type: 'text' | 'number' | 'email';
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export interface createBuyersInterface {
    id: string;
    name: string;
    email: string;
    quantity: number;
    slotvalue: number;
    cellphone: number;
}