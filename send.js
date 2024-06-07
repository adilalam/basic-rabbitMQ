require('dotenv').config();
const amqp = require('amqplib');

const queue_name = "hello-again";
const msg = "can you delete this id of 5";

const sendMsg = async () => {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue_name, {durable: false});
    channel.sendToQueue(queue_name, Buffer.from(msg), {persistent: true});
    console.log(" [x] Sent %s", msg);
    setTimeout(() => {
       connection.close(); 
       process.exit(0);
    }, 500);
}

sendMsg();