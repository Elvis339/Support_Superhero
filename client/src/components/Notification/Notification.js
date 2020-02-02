import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
    autoClose: 5000,
    draggable: false,
    position: "top-right",
    
})

const notification = props => {
    let show = null, clicked = false;

    let notify = () => {
        return toast.success(`${props.notification.created_by} has new notification for you.`)
    }

    if (props.notification != null) {
        show = (
            <Fragment>
                <div onClick={notify}>Click</div>
            </Fragment>
        )
    }

    return (
        show
    )
}

export default notification;