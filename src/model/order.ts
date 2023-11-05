import client from "../database";

type Order = {
    id?: string;
    orderId: string;
    quantity: string;
    status: string;
    user_id: string;
}

