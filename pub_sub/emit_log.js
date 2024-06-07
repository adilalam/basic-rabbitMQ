const amqplib = require('amqplib');

const exchangeName = "logs";
let msg = process.argv.slice(2) || 'Subscribe, Like, & Comment';
console.log(msg);

const sendMsg = async () => {
  const connection = await amqplib.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'fanout', {durable: false});
  channel.publish(exchangeName, '', Buffer.from(msg));
  console.log('Sent: ', msg);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500)
}

sendMsg();