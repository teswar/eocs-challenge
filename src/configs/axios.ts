// import { IConfig } from './iconfig'
import axios from 'axios';

export class AxiosConfig {

   public static configure(): void {
        // axios.defaults.baseURL = 'https://api.example.com';
        // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

} 