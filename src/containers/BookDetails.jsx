import React, { useCallback } from 'react'

export const BookDetails = ({ selectedBook, onAddBook }) => {
    const handleClick = useCallback(() => {
        onAddBook(selectedBook)
    }, [selectedBook])
    return (
        <div className="book-details">
            <h2 className="book-details-title">{selectedBook.title}</h2>
            <p  className="book-details-subtitle">{selectedBook.subtitle}</p>
            <p  className="book-details-info">{selectedBook.author_name? `Author name: ${selectedBook.author_name?.join(', ')}` : ''} </p>
            <p  className="book-details-info">{selectedBook.language?.length > 0 ? `Languages available: ${selectedBook.language}` : ''}</p>
            <p  className="book-details-info">{selectedBook.has_fulltext? `Full text available: ${selectedBook.has_fulltext ? 'yes' : 'no'}` : ''}</p>
            <p  className="book-details-info">{selectedBook.first_publish_year? `First publish year: ${selectedBook.first_publish_year}` : ''}</p>
            <p  className="book-details-info">{selectedBook.publish_year? `Years published: ${selectedBook.publish_year?.join(', ')}` : ''}</p>
            <button onClick={handleClick} className={`${false ?  '' : 'book-details-btn'}`}>
                Add book to Read List
            </button>
        </div>
    )
}
