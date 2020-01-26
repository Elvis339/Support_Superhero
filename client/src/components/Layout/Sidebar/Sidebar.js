import React from 'react'

const sidebar = props => {

    const showActive = e => {
        let element = e.target

        if (element.classList.contains('active')) {
            return element.classList.remove('active')
        } else {
            return element.classList.add('active')
        }
    }

    return (
        <div className='float-right mt-2'>
            <h3 className='text-center'>
                Task Lists
            </h3>
            <ul className='list-group list-group-flush' onClick={e => showActive(e)}>
                {props.children}
            </ul>
        </div>
    )
}

export default sidebar;