const instance = axios.create({
    baseURL: 'http://localhost:5173',
});

instance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.header.Authorization= `Bearer ${token}`;
        }
        return config;
    },
    (error)=> Promise.reject(error)
);
instance.interceptors.response.use(
    (response) => response,
    (error) =>{
        if(error.response?.status === 401){
             console.warn('Unauthorized: Redirecting to login...');
        }
         return Promise.reject(error);
    }
);

export default instance;