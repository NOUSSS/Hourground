import canvas from "./canvas.js";

const events = (await import("./events/newHours.js")).default;
const client = new events().getNow();
const wait = () => new Promise((res) => setTimeout(res, 500));

wait().then(() => {
  console.clear();

  const now = client.getString();

  canvas(now);

  client.on("newHours", async (newDate) => (newDate !== now ? canvas(newDate) : null));
});
