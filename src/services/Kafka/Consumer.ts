import { Kafka, Consumer as KafkaConsumer } from "kafkajs";

interface IConsume {
  topic: string;
  fromBeginning: boolean;
}

export default class Consumer {
  private consumer: KafkaConsumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      brokers: ["kafka:9092"],
    });

    this.consumer = kafka.consumer({ groupId });
  }

  public async consume({ topic, fromBeginning }: IConsume) {

    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning });

    console.log("Kafka rodando...");

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value?.toString(),
        });
      },
    });
  }
}
