import React from 'react'

export const ReadListPanel = ({ readList }) => {
    return (
        <div className="read-list-panel">
            <h2 className="read-list-panel-title">To Read list...</h2>
            {readList.length} books, {readList.filter( book => book.read === true).length} read
        </div>
    )
}
