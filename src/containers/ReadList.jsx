import React from 'react'

import { BookToReadCard, ReadListPanel } from '../components'

export const ReadList = ({ readList, onMarkBook, onRemoveBook }) => (
    <div className="read-list">
        <ReadListPanel readList={readList} />
        {readList.map((book) => (
            <BookToReadCard key={book.key} 
                            book={book} 
                            onMarkBook={onMarkBook} 
                            onRemoveBook={onRemoveBook} />
        ))}
    </div>
)
