import { gql } from '@apollo/client';

export const CREATE_BUYERS = gql`
      mutation CreateBuyer($name: String!, $email: String!, $slots: [Int!]!, $cellphone: Int!, $id: ID) {
        createBuyer(
            data: {
                name: $name, 
                email: $email, 
                slots: $slots, 
                cellphone: $cellphone, 
                sellers: {
                    connect: {
                        id: $id
                    }
                }
            }
        ) {
          id
        }
    }`;

export const PUBLISH_BUYER = gql`
    mutation PublishBuyer($id: ID!) {
        publishBuyer(where: { id: $id }, to: PUBLISHED) {
            id
        }
}`;

export const UPDATE_SELLER = gql`
    mutation UpdateSeller($id: ID!, $quantitysold: Int!) {
        updateSeller(data: { quantitysold: $quantitysold }, where: { id: $id }) {
            id
            quantitysold
    }
}`;

export const PUBLISH_SELLER = gql`
    mutation PublishSeller($id: ID!) {
        publishSeller(where: { id: $id }, to: PUBLISHED) {
            id
        }
    }`;