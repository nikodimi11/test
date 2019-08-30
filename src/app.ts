import RPCInterface from '../libs/rpcInterface';
import { config } from '../config/config';
import express from 'express';

const rpcInterface = new RPCInterface(`http://127.0.0.1:${config.rpcPort}/`, config.rpcUser, config.rpcPWD);

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Simple Vitae Test Node.js Server!');
});
app.get('/getinfo', async (req, res) => {
  const info = await rpcInterface.getInfo()
  console.log(info);
  res.send(info);
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});