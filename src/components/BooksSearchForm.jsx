import React, { useCallback } from 'react'

export const BooksSearchForm = ({ onSearch, onDebounce, isLoading }) => {
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            const formDataEntries = new FormData(e.target).entries()
            const data = Object.fromEntries(formDataEntries)
            onSearch(data)
        },
        [onSearch]
    )
    const handleKeyUp = useCallback(
        (e) => {
            const data = e.target.value
            onDebounce(data)
        },
        [onDebounce]
    )

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                onKeyUp={handleKeyUp}
                className="search-form-input"
                type="text"
                name="search"
            />
            <button
                className="search-form-button"
                type="submit"
                disabled={isLoading}
            >
                Go!
            </button>
        </form>
    )
}
