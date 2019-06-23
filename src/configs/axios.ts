import axios from 'axios';

export class AxiosConfig {
   public static configure(): void {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }
} 