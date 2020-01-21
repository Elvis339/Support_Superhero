import axios from 'axios';
import { getJwt } from './jwt';

const logoff = async props => {
    const LOGOUT = '/api/v1/logout'

      try {
          await axios.post(LOGOUT, { _id: getJwt }, { headers: { "Authorization": `Bearer: ${getJwt()}` }})
      } catch (error) {
          // Deal with error
          console.log(error)
      }
};

export default logoff;