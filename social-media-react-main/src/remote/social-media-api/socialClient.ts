import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const socialClient = axios.create({
  withCredentials: true,
  baseURL: 'http://travelog-env-1.eba-edcjcgpw.us-east-1.elasticbeanstalk.com/8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://travelogfe.s3-website-us-east-1.amazonaws.com'
  },
});

export interface socialApiResponse {
  status: number;
  payload: any;
}

export default socialClient;