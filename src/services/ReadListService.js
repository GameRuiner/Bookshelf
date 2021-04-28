export class ReadListService {
    static #setReadList(readList) {
        localStorage.setItem('readList', JSON.stringify(readList))
    }

    static get readList() {
        const json = localStorage.getItem('readList')
        return json ? JSON.parse(json) : []
    }

    static addBook(book) {
        const newReadList = [...ReadListService.readList, book]
        ReadListService.#setReadList(newReadList)
        return newReadList
    }

    static getIsBookDuplicate(book) {
        if (ReadListService.readList.filter( 
                bookList => bookList.key == book.key).length != 0) {
            return true
        }
        return false
    }

    static markBook(bookId) {
        const newReadList = ReadListService.readList.map(
            book => {
            book.key === bookId ? book.read = true : null;
            return book
        })
        ReadListService.#setReadList(newReadList)
        return newReadList
    }

    static removeBook(bookId) {
        const newReadList = ReadListService.readList.filter(
            book => book.key !== bookId )
        ReadListService.#setReadList(newReadList)
        return newReadList
    }
}
