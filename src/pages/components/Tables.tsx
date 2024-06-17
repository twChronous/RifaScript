import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BUYERS, GET_SELLERS } from '../_api/queries';

interface ButtonProps {
    tableType: 'buyer' | 'seller';
}

interface Seller {
    id: string;
    name: string;
    quantitysold: number;
}

interface Buyer {
    name: string;
    slots: number[];
}

export default function Tables(props: ButtonProps) {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [buyers, setBuyers] = useState<Buyer[]>([]);

    const { loading: sellersLoading, error: sellersError, data: sellersData } = useQuery(GET_SELLERS);
    const { loading: buyersLoading, error: buyersError, data: buyersData } = useQuery(GET_BUYERS);

    useEffect(() => {
        if (sellersData && !sellersLoading) {
            setSellers(sellersData.sellers);
        }
    }, [sellersData, sellersLoading]);

    useEffect(() => {
        if (buyersData && !buyersLoading) {
            setBuyers(buyersData.buyers);
        }
    }, [buyersData, buyersLoading]);

    if (sellersError || buyersError) {
        console.log('Erro', sellersError || buyersError);
        return <div>Erro ao carregar dados</div>;
    }

    if (sellersLoading || buyersLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="overflow-x-auto mt-5">
            <table className="min-w-full divide-y table-auto  border-2">
                <thead className="bg-gray-500 text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Nome
                        </th>
                        {props.tableType === 'seller' ? (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Quantidade Vendida
                            </th>
                        ) : (
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Valor
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {props.tableType === 'seller' ? (
                        sellers.map((seller) => (
                            <tr key={seller.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {seller.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {seller.quantitysold}
                                </td>
                            </tr>
                        ))
                    ) : (
                        buyers.map((buyer) =>
                            buyer.slots.map((value, index) => (
                                <tr key={`${buyer.name}-${index}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {buyer.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {value}
                                    </td>
                                </tr>
                            ))
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
