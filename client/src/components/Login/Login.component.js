import React from 'react';
import classes from './Login.css'

const login = props => (
    <div className={classes.Login}>
        <form onSubmit={props.submit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={props.change} value={props.mail} />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={props.change} value={props.password} />

            <button type="submit">Submit</button>
        </form>
    </div>
);

export default login;