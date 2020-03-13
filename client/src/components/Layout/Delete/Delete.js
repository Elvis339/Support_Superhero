import React from 'react';
import axios from 'axios';
import { getJwt } from '../../../helpers/jwt';

const deleteIcon = props => {

    const deleteFunc =  async () => {
        try {
            const res = await axios.delete(props.path, { headers: { "Authorization": `Bearer: ${getJwt()}` } });
            if (res.status !== 200) return
            return window.location.href = '/'
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <img onClick={deleteFunc} style={{ cursor: 'pointer' }} className='mx-2' src='/assets/delete.svg' height='30px' width='30px' />
    )
};

export default deleteIcon;