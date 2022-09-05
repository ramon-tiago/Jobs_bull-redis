import Queue from "bull";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

// { RegistrationMail : { key: '', handle: () => {} } }

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((q) => q.name === name);
    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach((q) => {
      q.bull.process(q.handle);

      q.bull.on("failed", (job, err) => {
        // Sentry.captureException(err);
        console.log("job failed", q.key, job.data);
        console.log(err);
      });
    });
  },
};
