import React, { useCallback } from 'react'

export const BookCard = ({ book, selectedBook, onBookSelection }) => {
    const handleClick = useCallback(() => {
        onBookSelection(book)
    }, [book])
    const isBookSelected = selectedBook?.key === book.key
    return (
        <div
            onClick={handleClick}
            className={`book-list-card book-card ${isBookSelected ? 'selected' : ''}`}
        >
            {book.title} {book.language?.length > 0 ? `(${book.language})` : ''}
            <div>
                <small>{book.subtitle}</small>
            </div>
            <div>{book.author_name?.join(', ')}</div>
        </div>
    )
}
