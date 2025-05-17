import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    const navigate = useNavigate()
    const getPages = () => {
        const pages: (number | string)[] = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
            }
        }

        return pages
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-4 px-4 py-2 bg-white rounded shadow">
            {/* Previous Button */}
            <button
                onClick={() => {
                    onPageChange(currentPage - 1)
                    navigate(`?page=${currentPage - 1}`)
                }}
                disabled={currentPage === 1}
                className="px-2 py-1 text-gray-600 hover:text-black disabled:opacity-40 cursor-pointer border border-[var(--deep-background)] rounded-md"
            >
                &lt;
            </button>

            {/* Page Numbers */}
            {getPages().map((item, index) => (
                <button
                    key={index}
                    disabled={item === '...'}
                    onClick={() => typeof item === 'number' && onPageChange(item)}
                    className={`px-3 py-1 rounded cursor-pointer ${item === currentPage
                        ? 'bg-blue-500 text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-200'
                        } ${item === '...' ? 'cursor-default text-gray-400' : ''}`}
                >
                    {item}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => {
                    onPageChange(currentPage + 1)
                    navigate(`?page=${currentPage + 1}`)
                }}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-gray-600 hover:text-black disabled:opacity-40 cursor-pointer border border-[var(--deep-background)] rounded-md"
            >
                &gt;
            </button>
        </div>
    )
}

export default Pagination
