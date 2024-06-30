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
export const GET_SELLER_BY_ID = gql`
    query GetSellersByID($id: ID) {
        seller(where: {id: $id}) {
            quantitysold
    }
}`;
export const GET_SLOTS = gql`
    query GetSlots {
        buyers {
            slots
        }
}`;
