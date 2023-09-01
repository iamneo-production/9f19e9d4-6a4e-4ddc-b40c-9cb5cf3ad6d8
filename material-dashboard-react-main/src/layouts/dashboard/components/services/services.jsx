import axios from "axios"

const BASE_URL='http://localhost:3002/'
export const totalItems = () => {
     return axios.get(BASE_URL+'inventory')
}

export const allocatedItems = () => {
    return axios.get(BASE_URL+'inventory?isAllocated=true')
}
