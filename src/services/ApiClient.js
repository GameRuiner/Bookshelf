export class ApiClient {
    #apiUrl

    constructor(baseUrl) {
        this.#apiUrl = baseUrl
    }

    async get(resource) {
        const url = `${this.#apiUrl}${resource}`
        try {
            const response = await fetch(url)
            if (response.ok) {
                return await response.json()
            }
            // Do something with error
            console.error(`Request ${url} failed with ${response.status}`)
        } catch (error) {
            console.error(`Request ${url} failed with error`, error)
        }
    }
}
