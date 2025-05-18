import { generateHeaders } from "../lib/utils"

const BASE_URL = import.meta.env.VITE_API_BASE_URL



const api = {
    POST: async <T = any>(uri: string, body: Record<string, any>): Promise<T> => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}${uri}`, {
            method: 'POST',
            headers: generateHeaders(token as string),
            body: JSON.stringify(body)
        })

        const data = await response.json()
        return data
    },
    GET: async (uri: string) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}${uri}`, {
            method: 'GET',
            headers: generateHeaders(token as string)
        })

        const data = await response.json()
        return data
    },
    PUT: async (uri: string, body: Record<string, any>) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}${uri}`, {
            headers: generateHeaders(token as string),
            method: "PUT",
            body: JSON.stringify(body)
        })

        const data = await response.json()
        return data
    },
    DELETE: async (uri: string) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}${uri}`, {
            headers: generateHeaders(token as string),
            method: "DELETE"
        })

        const data = await response.json()
        return data
    }
}



export default api