// axios
import axios from 'axios'

const baseURL = '/api/'

export default axios.create({
    baseURL,
    // You can add your headers here
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        Accept: "application/json",
    },
})
