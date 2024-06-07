require('dotenv').config();
const amqp = require('amqplib');

const queue_name = "hello-again";

const receveMsg = async () => {
    const connection = await amqp.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue_name, { durable: false });

    channel.prefetch(1);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue_name);

    channel.consume(queue_name, function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(() => {
            console.log("Done task");
            channel.ack(msg)
        }, 100);
    }, {
        noAck: false
    });
}

receveMsg();