import axios from "axios";

import { API_URL } from "../../constants";

export default function useCustomerData() {

    const createCustomer = () => {
        const payload = {
            status: "active",
            name: "Avni",
            email: "avni@espranza.in",
           role:"customer"
        };

        axios.post(`${API_URL}items/customer`, payload).then(
            response => {
                console.log("Response: ", response.data);
            }
        ).catch(
            error => {
                console.log("Error: ", error.response);
            }
        );
    };

    return {
        createCustomer
    };

}
