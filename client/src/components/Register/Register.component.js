import React from 'react'

const register = props => (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={props.submit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={props.change} value={props.name} />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={props.change} value={props.email} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={props.change} value={props.password} />

            <button type="submit">Submit</button>
        </form>
    </div>
)

export default register