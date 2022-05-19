import axios from 'axios';
//for dev endpoint 
const BASE_URL = "https://jv7nq0naca.execute-api.ap-southeast-2.amazonaws.com/dev/user-v1" 
export const BASE_MATTR_URL = "https://jv7nq0naca.execute-api.ap-southeast-2.amazonaws.com/dev/mattr-v1" 
export const BASE_VISITOR_URL = "https://jv7nq0naca.execute-api.ap-southeast-2.amazonaws.com/dev/visitor-v1"
//for production endpoint
// const BASE_URL = " https://dldo96p8se.execute-api.ap-southeast-2.amazonaws.com/prod/user-v1"
// export const BASE_MATTR_URL = " https://dldo96p8se.execute-api.ap-southeast-2.amazonaws.com/prod/mattr-v1"

//for local development

// export const BASE_VISITOR_URL = "http://localhost:4000/dev/visitor-v1"

export const Axios = axios.create({
    baseURL: BASE_URL,
    timeout:900000,

})
Axios.defaults.headers = {
    "Content-Type":"application/json"
}

const token = localStorage.getItem('token');
if(token)
    Axios.defaults.headers = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
    }