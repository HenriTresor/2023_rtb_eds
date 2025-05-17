const BASE_URL = import.meta.env.VITE_API_BASE_URL


const api = {
    POST: async <T = any>(uri: string, body: Record<string, any>): Promise<T> => {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
        const response = await fetch(`${BASE_URL}${uri}`, {
            method:'POST',
            headers,
            body: JSON.stringify(body)
        })

        const data = await response.json()
        return data
    },
    GET: async (uri: string) => {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
        console.log(token)
        const response = await fetch(`${BASE_URL}${uri}`, {
            method:'GET',
            headers
        })

        const data = response.json()
        return data
    },
    PUT: async () => { },
    DELETE: async () => { }
}



export default api