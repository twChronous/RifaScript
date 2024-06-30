import React, { useState } from "react";
import { DropdownButtonProps } from "@/_utils/types";

export default function DropdownButton(props: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (id: string | null, name: string | null) => {
    setSellerId(id);
    setSellerName(name);
    props.onSelect(id!);
  };

  return (
    <div className="flex justify-center items-center mt-5 ">
      <a className="flex flex-col items-center min-w-64" onClick={handleClick}>
        <p className="text-black rounded p-4 ml-5 min-w-20 bg-grey-500">
          {sellerName ? sellerName : props.text}
        </p>
        {isOpen && (
          <div className="flex flex-col p-5 bg-white text-black rounded mt-3 justify-center items-center">
            {props.data.map((seller) => (
              <a
                className="border-b-2 border-indigo-500 p-2 mb-2"
                key={seller.id}
                onClick={() => handleSelect(seller.id, seller.name)}
              >
                {seller.name}
              </a>
            ))}
            {sellerName ? (
              <a
                className="border-b-2 border-indigo-500 p-2 mb-2"
                onClick={() => handleSelect(null, null)}
              >
                Limpar escolha
              </a>
            ) : (
              <></>
            )}
          </div>
        )}
      </a>
    </div>
  );
}
