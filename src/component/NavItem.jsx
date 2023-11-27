import React, { useState, useEffect } from 'react';

export default function NavItem({
    pagination,
    setPagination,
    dataValues,
    prevOrNext
}) {
    const [btnGray, setBtnGray] = useState('');
    // Effect to update the button state based on pagination and data length
    useEffect(() => {
        if (
            (prevOrNext === 'previous' && pagination <= 0) ||
            (prevOrNext === 'next' && pagination >= dataValues.length - 5)
        ) {
            setBtnGray('gray');
        } else {
            setBtnGray('');
        }
    }, [pagination, dataValues, prevOrNext]);

    // Navigate to previous or next pages based on prevOrNext
    function handleClick() {
        if (prevOrNext === 'previous') {
            setPagination((prev) => Math.max(prev - 5, 0));
        } else if (prevOrNext === 'next') {
            setPagination((prev) => Math.min(prev + 5, dataValues.length - 5));
        }
    }

    return (
        <button
            className={`nav__item nav__item--${prevOrNext} ${
                btnGray && 'gray'
            }`}
            onClick={handleClick}
            disabled={btnGray}
        >
            {prevOrNext}
        </button>
    );
}
