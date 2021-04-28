import React, { useState, useCallback } from 'react'
import { OpenLibraryService, BookListService } from '../services'
import { BooksSearchForm, BookCard, BooksListFooter } from '../components'

export const BooksList = ({ selectedBook, onBookSelection }) => {
    const [booksList, setBooksList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isScrollLoading, setIsScrollLoading] = useState(false)
    const [booksFound, setBooksFound] = useState(0)
    const [booksShown, setBooksShown] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit] = useState(100)
    const [searchPhrase, setSearchPhrase] = useState('')
    const debounceSearch = BookListService.debounce(
        (phrase) => handleSearch({ search: phrase }),
        1000
    )

    const handleSearch = useCallback(
        async ({ search }) => {
            if (!isScrollLoading && !isLoading) {
                setIsLoading(true)
                setBooksFound(0)
                setBooksShown(0)
                setCurrentPage(1)
                const { docs, numFound } = await OpenLibraryService.searchBooks(
                    search,
                    1,
                    limit
                )
                setIsLoading(false)
                setBooksList(docs)
                setBooksFound(numFound)
                setSearchPhrase(search)
                setBooksShown(BookListService.booksShown(1, limit, numFound))
            }
        },
        [limit, isScrollLoading, isLoading]
    )

    const handleScroll = useCallback(
        async (scroll) => {
            const { scrollTop, scrollHeight, clientHeight } = scroll.target
            const scrolledToBottom = BookListService.isListBottom(
                scrollTop,
                scrollHeight,
                clientHeight
            )
            if (
                scrolledToBottom &&
                !isScrollLoading &&
                booksFound > 0 &&
                !isLoading
            ) {
                setIsScrollLoading(true)
                if (
                    BookListService.hasMoreBooks(currentPage, limit, booksFound)
                ) {
                    const {
                        docs,
                        numFound,
                    } = await OpenLibraryService.searchBooks(
                        searchPhrase,
                        currentPage + 1,
                        limit
                    )
                    booksList.push.apply(booksList, docs)
                    setBooksShown(
                        BookListService.booksShown(
                            currentPage + 1,
                            limit,
                            numFound
                        )
                    )
                    setCurrentPage(currentPage + 1)
                }
                setIsScrollLoading(false)
            }
        },
        [
            booksFound,
            currentPage,
            limit,
            searchPhrase,
            booksList,
            isScrollLoading,
            isLoading,
        ]
    )

    const handleDebounce = useCallback((searchPhrase) => {
        if (searchPhrase !== '') {
            debounceSearch(searchPhrase)
        }
    }, [])

    return (
        <div onScroll={handleScroll} className="books-list-container">
            <BooksSearchForm
                isLoading={isLoading}
                onSearch={handleSearch}
                onDebounce={handleDebounce}
            />
            {isLoading
                ? ' Loading....'
                : booksList.map((book) => (
                      <BookCard
                          key={book.key}
                          book={book}
                          selectedBook={selectedBook}
                          onBookSelection={onBookSelection}
                      />
                  ))}
            {isScrollLoading ? ' Loading....' : ''}
            <BooksListFooter booksFound={booksFound} booksShown={booksShown} />
        </div>
    )
}
