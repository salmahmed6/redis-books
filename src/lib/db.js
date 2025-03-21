import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

//listen for any errors
client.on('error', err => console.log('Redis Client Error', err));


if(!client.isOpen){
    client.connect()
}

export { client }
//await client.connect();
// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

