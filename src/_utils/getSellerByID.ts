import { GET_SELLER_BY_ID } from "../_api/queries";
import { client } from "../_api/apollo";

export const getSellerByID = async (id: string| undefined) => {
    try {
      const { data } = await client.query({
        query: GET_SELLER_BY_ID,
        variables: { id }
      });
      return data.seller.quantitysold;
    } catch (error) {
      console.error("Error fetching seller by ID:", error);
      throw error;
    }
  };