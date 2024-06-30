import React, { useState, ChangeEvent, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { Seller } from "@/_utils/types";
import Inputs from "@/components/inputs";
import Tables from "@/components/Tables";
import Button from "@/components/Button";
import { GET_SELLERS } from '../_api/queries';
import { getSellerByID } from '@/_utils/getSellerByID';
import DropdownButton from '@/components/DropdownButton';

import { CREATE_BUYERS, PUBLISH_BUYER, UPDATE_SELLER, PUBLISH_SELLER } from '@/_api/mutations';
import { GetSlots } from '@/_utils/slotvalid';

export default function Home() {
    const [sellerId, setSellerId] = useState<string>();
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [buyerName, setBuyerName] = useState<string>();
    const [buyerEmail, setBuyerEmail] = useState<string>();
    const [buyerPhone, setBuyerPhone] = useState<number>();
    const [slotValues, setSlotValues] = useState<number[]>([]);
    const [quantityOfSlots, setQuantityOfSlots] = useState<number>(0);
    
    const { loading: sellersLoading, error: sellersError, data: sellersData } = useQuery(GET_SELLERS);
    const [mutateFunction, { data: mutateData, loading: mutateLoading, error: mutateError }] = useMutation(CREATE_BUYERS);
    const [publishFunction, { data: publishData, loading: publishLoading, error: publishError }] = useMutation(PUBLISH_BUYER);
    const [updateFunction, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_SELLER);
    const [publishSellerFunction, { data: publishSellerData, loading: publishSellerLoading, error: publishSellerError }] = useMutation(PUBLISH_SELLER);

    const checkSlotAvailability = GetSlots();

    const handleSubmit = async () => {
        for (let slot of slotValues) {
            if (!checkSlotAvailability(slot)) {
                alert(`O numero ${slot} já foi selecionado! \nUse outro valor por favor.`);
                return;
            }
        }

        try {
            console.log(sellerId, buyerEmail, buyerName,slotValues, buyerPhone)
            const response = await mutateFunction({
                variables: {
                    id: sellerId,
                    name: buyerName,
                    email: buyerEmail,
                    slots: slotValues,
                    cellphone: Number(buyerPhone)
                }
            });

            const buyerId = response.data.createBuyer.id;

            const publishResponse = await publishFunction({
                variables: {
                    id: buyerId
                }
            });
            await handleUpdateSeller();
            console.log('Buyer published:', publishResponse);

            if (confirm(`Dados Salvos com sucesso! \n ID: ${publishResponse.data.publishBuyer.id} \n por favor aperte OK`) == true) {
                window.location.reload()
              } 
        } catch (error) {
            console.error('Error:', error);
            alert(`Ocorreu um erro! \n ${error}`);
        }
    };

    const handleUpdateSeller = async () => {
        try {
          const oldQuantity = await getSellerByID(sellerId)
          const updateResponse = await updateFunction({
            variables: {
              id: sellerId,
              quantitysold: oldQuantity + quantityOfSlots,
            },
          });
          const publishSellerResponse = await publishSellerFunction({
            variables: {
                id: sellerId
            }
        });

          console.log('Publish seller response:', publishSellerResponse);
          console.log('Update response:', updateResponse);
        } catch (error) {
          console.error('Update error:', error);
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
                        <Inputs title="Quantidade de rifas" type="number" placeholder='00'  onChange={(event: ChangeEvent<HTMLInputElement>) => setQuantityOfSlots(Number(event.target.value))} />
                        {Array.from({ length: quantityOfSlots }).map((_, index) => (
                            <Inputs
                                key={index}
                                title={`Rifa ${index + 1}`}
                                type="number"
                                placeholder={`Digite o valor da rifa ${index + 1}`}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleSlotValueChange(index, event.target.value)}
                            />
                        ))}
                    </div>
                    <div className="mt-5 space-y-5 ">
                        <DropdownButton text='Clique aqui para escolher seu vendedor' data={sellers} onSelect={(id: string) => setSellerId(id)}/>
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
