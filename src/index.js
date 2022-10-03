import canvas from "./canvas.js";

const events = (await import("./events/newHours.js")).default;
const client = new events().getNow();
const wait = () => new Promise((res) => setTimeout(res, 500));

wait().then(() => {
  console.clear();

  canvas(client.getString());

  client.on("newHours", async (newDate) => canvas(newDate));
});
