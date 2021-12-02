import express from "express";
import Consumer from "./services/Kafka/Consumer";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('chegou aqui')
app.get("/app", (req, res) => {
  res.send("Hello");
});

const consumer = new Consumer("ms-email");

consumer.consume({ topic: "newBets", fromBeginning: false });
consumer.consume({ topic: "callToBet", fromBeginning: false });
consumer.consume({ topic: "forgotPassword", fromBeginning: false });
consumer.consume({ topic: "newUser", fromBeginning: false });

const PORT = 3339 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`);
});
