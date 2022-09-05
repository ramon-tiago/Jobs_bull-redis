import "dotenv/config";
import express from "express";
import BullBoard from "bull-board";
const Queue = require("bull");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");

import { Usercontroller } from "./app/controllers/Usercontroller";
import Queues from "./app/lib/Queue";
const newQueues = Queues.queues.map((q) => q.bull);

const someQueue = new Queue("someQueueName", {
  redis: { port: 6379, host: "127.0.0.1" },
}); // if you have a special connection to redis.
const someOtherQueue = new Queue("someOtherQueueName");
const myQueue = new Queue("My Queue");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(someQueue), new BullAdapter(someOtherQueue), new BullAdapter(myQueue)],
  serverAdapter: serverAdapter,
});

const app = express();

app.use(express.json());
app.use("/admin/queues", serverAdapter.getRouter());
app.post("/user", Usercontroller.store);

// app.use("/admin/queues", router);

const port = 3210;
app.listen(port, () => console.log(`Server is running in port ${port}`));
