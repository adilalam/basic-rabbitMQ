require('dotenv').config();
const amqp = require('amqplib');

const exchangeName = "logs";

const recieveMsg = async () => {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });
    console.log(`Waiting for messages in queue: ${q.queue}`);
    channel.bindQueue(q.queue, exchangeName, '');
    channel.consume(q.queue, msg => {
        if (msg.content) console.log("THe message is: ", msg.content.toString());
    }, { noAck: true })
}

recieveMsg();