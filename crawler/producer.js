const kafka = require("kafka-node");
const config = require('@config');

// 카프카 클러스터에 접속하지 못할 경우, 별도 캐시에 담아두는 로직이 필요할 수도
// 카프카 클러스터를 관리하는 별도 클래스가 필요할지도 (토픽 관리, 파티션 관리 등)
// 파티셔닝 관리 정책 필요

class KafkaProducer {
    constructor() {
        this.client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost });
        this.producer = new kafka.Producer(this.client);
    }

    init() {
        this.producer.on("ready", function () {
            console.log("kafka producer is running successfully.");
        });
        
        this.producer.on("error", function (err) {
            console.log(err);
        });        
    }

    // topic 존재 여부 체크 필요함
    sendMessage(payloads, callback) {
        this.producer.send(payloads, callback);
    }

    async createTopic(topic) {
        if (topic != 'string') {
            throw new Error('invalid parameter.')
        }
        return new Promise((resolve, reject) => {
            this.producer.createTopics([topic], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = KafkaProducer;