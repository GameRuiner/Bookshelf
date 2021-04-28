import React, { useCallback }  from 'react'

export const BookToReadCard = ({ book, onMarkBook, onRemoveBook }) => {
    const handleClickMark = useCallback(() => {
        onMarkBook(book)
    }, [book])
    const handleClickRemove = useCallback(() => {
        onRemoveBook(book)
    }, [book])
    return (
        <div className={`book-card ${book.read ? 'book-read' : ''}`}>
            <div className="book-card-item">{book.title}</div>
            <div className={`book-details-subtitle${book.read ? '-read' : ''} book-card-item`}>{book.subtitle}</div>
            <div className="book-card-item">{book.author_name?.join(', ')}</div>
            {!book.read && (
                <>
                    <button onClick={handleClickMark} className="read-list-btn">Mark as read</button>
                    <button onClick={handleClickRemove} className="read-list-btn">Remove from list</button>
                </>
            )}
        </div>
    )
}
