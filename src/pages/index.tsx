import React, { useState, ChangeEvent, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Tables from "./components/Tables";
import Button from "@/pages/components/Button";
import Inputs from "@/pages/components/inputs";
import { GET_SELLERS } from './_api/queries';
import { CREATE_BUYERS, PUBLISH_BUYER  } from './_api/mutations';

interface Seller {
    id: string;
    name: string;
    quantitysold: number;
}

export default function Home() {
    const [buyerName, setBuyerName] = useState<string>();
    const [buyerEmail, setBuyerEmail] = useState<string>();
    const [buyerPhone, setBuyerPhone] = useState<number>();
    const [sellerId, setSellerId] = useState<string>();
    const [quantityOfSlots, setQuantityOfSlots] = useState<number>(0);
    const [slotValues, setSlotValues] = useState<number[]>([]);
    const { loading: sellersLoading, error: sellersError, data: sellersData } = useQuery(GET_SELLERS);
    const [sellers, setSellers] = useState<Seller[]>([]);

    const [mutateFunction, { data: mutateData, loading: mutateLoading, error: mutateError }] = useMutation(CREATE_BUYERS);
    const [publishFunction, { data: publishData, loading: publishLoading, error: publishError }] = useMutation(PUBLISH_BUYER);

   const handleSubmit = async () => {
        try {
            const response = await mutateFunction({
                variables: {
                    id: sellerId,
                    name: buyerName,
                    email: buyerEmail,
                    slots: slotValues,
                    cellphone: Number(buyerPhone),
                }
            });

            const buyerId = response.data.createBuyer.id;

            const publishResponse = await publishFunction({
                variables: {
                    id: buyerId
                }
            });

            console.log('Buyer published:', publishResponse);
            if (confirm(`Dados Salvos com sucesso! \n ID: ${publishResponse.data.publishBuyer.id} \n por favor aperte OK`) == true) {
                window.location.reload()
                // setBuyerEmail('');
                // setBuyerName('');
                // setBuyerPhone(undefined);
                // setQuantityOfSlots(0);
              } 
        } catch (error) {
            console.error('Error:', error);
            alert(`Ocorreu um erro! \n ${error}`);
        }
    };

    useEffect(() => {
        if (sellersData && !sellersLoading) {
            setSellers(sellersData.sellers);
        }
    }, [sellersData, sellersLoading]);

    const handleSlotValueChange = (index: number, value: string) => {
        const newSlotValues = [...slotValues];
        newSlotValues[index] = Number(value);
        setSlotValues(newSlotValues);
    };

    useEffect(() => {
        setSlotValues(Array(quantityOfSlots).fill(0));
    }, [quantityOfSlots]);

    if (sellersError) {
        console.log('Erro', sellersError);
    }

    return (
        <main>
            <header className="bg-green-500 h-20 text-center text-white content-center min-w-max">
                <h1 className="text-5xl font-bold">
                    RifaScript
                </h1>
            </header>
            <div className="p-2">
                <div className="items-center content-center text-center">
                    <h2 className="text-3xl font-bold self-center mt-5">Compra e venda</h2>
                    <div className="mt-5 space-y-5">
                        <Inputs title="Nome Comprador" type="text" placeholder='ciclano beltrano' onChange={(event: ChangeEvent<HTMLInputElement>) => setBuyerName(event.target.value)} />
                        <Inputs title="E-mail Comprador" type="email" placeholder='email@mailer.com' onChange={(event: ChangeEvent<HTMLInputElement>) => setBuyerEmail(event.target.value)} />
                        <Inputs title="Telefone do Comprador" type="number" isCellPhone={true} placeholder="(61) 9 9999-9999" onChange={(event: ChangeEvent<HTMLInputElement>) => setBuyerPhone(Number(event.target.value))} />
                    </div>
                    <div className="mt-5 space-y-5">
                        <Inputs title="Quantidade de rifas" type="number" placeholder='00' onChange={(event: ChangeEvent<HTMLInputElement>) => setQuantityOfSlots(Number(event.target.value))} />
                        {Array.from({ length: quantityOfSlots }).map((_, index) => (
                            <Inputs
                                key={index}
                                title={`Rifa ${index + 1}`}
                                type="text"
                                placeholder={`Digite o valor da rifa ${index + 1}`}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleSlotValueChange(index, event.target.value)}
                            />
                        ))}
                    </div>
                    <div className="mt-5 space-y-5">
                        <p>Nome do vendedor</p>
                        {sellers.map((seller) => (
                            <Inputs key={seller.id} type="radio" placeholder={seller.name} onChange={() => setSellerId(seller.id)} />
                        ))}
                    </div>
                    <Button text="Salvar" onClick={handleSubmit} />
                </div>
                <div className="flex flex-col items-center content-center text-center">
                    <h2 className="text-3xl font-bold self-center mt-5">Tabela Vendedores</h2>
                    <Tables tableType='seller' />
                </div>
                <div className="flex flex-col items-center content-center text-center">
                    <h2 className="text-3xl font-bold self-center mt-5">Tabela Compradores</h2>
                    <Tables tableType='buyer' />
                </div>
            </div>
        </main>
    );
}
