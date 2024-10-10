import axios from "axios"
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchData(){
    const res = await axios({
        method: "get",
            baseURL: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
            params: {
                limit: 100,
                offset: 0,
            },
            headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": 1,
             },
          });
        return res.data
        }
export async function fetchlasttransaction(){
    const res=await axios({
        method:"get",
        params: {
            limit: 3,
            offset:1
        },
        baseURL:'https://bursting-gelding-24.hasura.app/api/rest/all-transactions',
        headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": 1,
        },

    })
    return res.data 
}
export async function fetchtotaltransaction(){
    const res=await axios({
        method:"get",
        baseURL:' https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals',
        headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
        "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": 1,
        },

    })
    return res.data 
}
export const handleTransactionDelete = async ({id}) => {
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id="+id;
        const res = await axios.delete(url, {
            headers: {
                "x-hasura-admin-secret":
                  "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                "x-hasura-role": "user",
                "x-hasura-user-id": 1,
              },
            });  
  };
export async function handelAddTranscation({data}){
    console.log(data)
    const url =
    "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

  const res = await axios.post(
    url,
    {...data,user_id:1},
    {
      headers: {
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": 1,
      },
    }
  );

   
}
export async function handelEditTranscation({data,id}){
    console.log(id)
    const url =
    "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

  const res = await axios.post(
    url,
    {...data,id:id},
    {
      headers: {
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": 1,
      },
    }
  );

   
}