const config = require('@config');

const kafka = require("kafka-node"),
    Producer = kafka.Producer,
    client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost }),
    producer = new Producer(client);

producer.on("ready", function () {
    console.log("kafka producer is running successfully.");
});

producer.on("error", function (err) {
    console.log(err);
});

function sendMessage(payloads, callback) {
    producer.send(payloads, callback);
}

// let payloads = [
//     { topic: "cat", messages: `I have ${count} cats`, partition: 0 }
// ];

// producer.send(payloads, function (err, data) {
//     console.log(data);
//     count += 1;
// });

module.exports = {
    sendMessage
};