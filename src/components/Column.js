import React from 'react'

const Column = (props) => {
    return (
        <>
            <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
            >
                {props.title}
            </th>
        </>
    )
}

export default Column
