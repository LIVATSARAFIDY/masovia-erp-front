import ky from 'ky';
export const api = ky.create(
    {
        
        // prefixUrl: 'https://invoice-generator-server-kybx.onrender.com/api/',
        prefixUrl: 'http://localhost:3001/api/',
        retry: {
            limit: 2,
            statusCodes: [408, 500, 502, 503, 504],
        },
        hooks:{
            beforeRequest:[
                request => {
                    const token = localStorage.getItem('token');
                    if (token) {
                        request.headers.set('Authorization', `Bearer ${token}`);
                    }
                }
            ],
            afterResponse: [
                async (_req, _opt, res) => {
                    if(res.status === 401) {
                        console.error('Unauthorized access - redirecting to login');
                        // redirect to login for exemple
                    }
                }
            ]
        }
    }
)