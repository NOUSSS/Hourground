import { getWallpaper } from "wallpaper";
import canvas from "./canvas.js";

const events = (await import("./events/newHours.js")).default;
const client = new events().getNow();
const wait = () => new Promise((res) => setTimeout(res, 500));

wait().then(async () => {
  console.clear();

  const now = client.getString();

  canvas("Background.png", now);

  client.on("newHours", async (newDate) =>
    newDate !== now ? canvas("Background.png", newDate) : null
  );
});
