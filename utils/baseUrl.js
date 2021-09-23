const baseURL=process.env.NODE_ENV=="production" ? 
'https://onlineeshop.now.sh' 
: 'http://localhost:3000';

export default baseURL;