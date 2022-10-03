import { EventEmitter } from "node:events";
import { writeFileSync } from "node:fs";
import date from "../cache/date/date.json" assert { type: "json" };

class newHours extends EventEmitter {
  constructor() {
    super();

    this.saveData = () =>
      writeFileSync("./src/cache/date/date.json", JSON.stringify(date, null, 4));
  }

  getString() {
    const date = new Date();
    const string = `${date.getHours()}:${
      date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()
    }`;

    return string;
  }

  getNow() {
    if (!date.date) {
      date.date = this.getString();
      this.saveData();
    }

    setInterval(() => {
      const now = this.getString();
      if (now !== date.date) {
        date.date = now;
        this.saveData();
        this.emit("newHours", now);
      }
    }, 1000);
    return this;
  }
}

export default newHours;
