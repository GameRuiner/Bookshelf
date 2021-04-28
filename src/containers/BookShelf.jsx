import React, { useCallback, useState } from 'react'
import { ReadListService } from '../services'
import { Col, Grid } from '../components'
import { BooksList } from './BooksList'
import { BookDetails } from './BookDetails'
import { ReadList } from './ReadList'
import { WindowDimensions } from './WindowDimensions'

export const BookShelf = () => {
    const [selectedBook, setSelectedBook] = useState()
    const [readList, setReadList] = useState(ReadListService.readList)
    const { height, width } = WindowDimensions()

    const handleBookSelection = useCallback((book) => {
        setSelectedBook(book)
    }, [])

    const handleAddBook = useCallback((book) => {
        const isDuplicate = ReadListService.getIsBookDuplicate(book)
        if (isDuplicate === false) {
            const newReadList = ReadListService.addBook(book)
            setReadList(newReadList)
        }
    }, [])

    const handleMarkBook = useCallback((book) => {
        const newReadList = ReadListService.markBook(book.key)
        setReadList(newReadList)
    }, [])

    const handleRemoveBook = useCallback((book) => {
        const newReadList = ReadListService.removeBook(book.key)
        console.log(selectedBook)
        setReadList(newReadList)
    }, [])

    if (width > 740) {
        return (
            <Grid>
                <Col>
                    <BooksList
                        selectedBook={selectedBook}
                        onBookSelection={handleBookSelection}
                    />
                </Col>
                <Col>
                    {selectedBook && (
                        <BookDetails
                            selectedBook={selectedBook}
                            onAddBook={handleAddBook}
                        />
                    )}
                </Col>
                <Col>
                    <ReadList
                        readList={readList}
                        onMarkBook={handleMarkBook}
                        onRemoveBook={handleRemoveBook}
                    />
                </Col>
            </Grid>
        )
    } else {
        return (
            <Grid>
                <Col>
                    <BooksList
                        selectedBook={selectedBook}
                        onBookSelection={handleBookSelection}
                    />
                </Col>
                <Col>
                    <ReadList
                        readList={readList}
                        onMarkBook={handleMarkBook}
                        onRemoveBook={handleRemoveBook}
                    />
                </Col>
                {selectedBook && (
                        <BookDetails
                            selectedBook={selectedBook}
                            onAddBook={handleAddBook}
                        />
                    )}
            </Grid>
        )
    }
}
