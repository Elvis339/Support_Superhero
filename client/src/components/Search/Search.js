import React from 'react'

const search = props => (
    <div>
        <form onSubmit={props.submit}>
            <input type="text" value={props.value} onChange={props.query} />
            <button type="submit" disabled={props.show}>Search</button>
        </form>
    </div>
)

export default search;