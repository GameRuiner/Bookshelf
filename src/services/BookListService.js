export class BookListService {
    static hasMoreBooks(currentPage, limit, total) {
        return currentPage * limit < total
    }

    static booksShown(currentPage, limit, total) {
        if (this.hasMoreBooks(currentPage, limit, total)) {
            return currentPage * limit
        } else {
            return (currentPage - 1) * limit + (total % limit)
        }
    }

    static isListBottom(scrollTop, scrollHeight, clientHeight) {
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            return true
        }
        return false
    }

    static debounce(fn, d) {
        let timer
        return function () {
            let context = this,
                args = arguments
            
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, d)
        }
    }
}
