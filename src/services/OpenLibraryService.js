import { ApiClient } from './ApiClient'

const openLibraryUrl = import.meta.env.VITE_OPEN_LIBRARY_API_URL

export class OpenLibraryService {
    static #apiClient = new ApiClient(openLibraryUrl)

    static async searchBooks(searchQuery, page, limit) {
        return OpenLibraryService.#apiClient.get(
            `/search.json?q=${searchQuery}&page=${page}&limit=${limit}`
        )
    }
}
