import React, { useCallback } from 'react'

export const BooksListFooter = ({ booksFound, booksShown }) => {
    if (booksFound == 0) {
        return (<div></div>)
    }
    return (
        <div className="book-list-footer">
            <span>{booksFound > 0 ? `Found: ${booksFound}` : ""}</span>
            <span>{booksShown > 0 ? `Shown: ${booksShown}` : ""}</span>
        </div>
    )
}
