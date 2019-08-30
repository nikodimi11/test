const axios = require('axios');

export default class RPCInterface
{
    url: string;
    authHeader: string;

    constructor(url, rpcUser, rpcPWD)
    {
        this.url = url;
        this.authHeader = 'Basic ' + Buffer.from(rpcUser + ':' + rpcPWD).toString('base64');
    }

    randomString = length => {
        let res = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            res += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return res;
    }

    call = (method, params) =>
    {
        return new Promise(resolve => {
            const nonce = 'X' + this.randomString(32);
            const data = '{ "jsonrpc" : "1.0", "id" : "' + nonce + '", "method" : "' + method + '", "params" : ' + JSON.stringify(params) + ' }';
            axios.post(this.url, data, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': this.authHeader
                }
            }).then(res => {
                resolve(res.data);
            })
        });
    }

    getInfo = async () => {
        const res = await this.call('getinfo', []);
        return res;
    }
}
