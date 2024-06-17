import { gql } from '@apollo/client';

export const GET_BUYERS = gql`
    query Buyers {
        buyers {
        id
        name
        slots
        }
  }`;
export const GET_SELLERS = gql`
    query Sellers {
        sellers(orderBy: quantitysold_DESC) {
        id
        name
        quantitysold
    }
  }`;
