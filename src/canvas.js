import { copyFileSync } from "fs";
const { writeFileSync } = await import("fs");
const { createCanvas, loadImage } = (await import("canvas")).default;
const wallpaper = await import("wallpaper");

export default async (oldW, newDate) => {
  const [width, height] = [4000, 2500];

  const image = createCanvas(width, height);
  const ctx = image.getContext("2d");

  copyFileSync(oldW, "Background.png");

  setTimeout(() => {
    loadImage("Background.png").then(async (img) => {
      ctx.drawImage(img, 0, 0, 4000, 2500);

      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "black";

      ctx.font = "160px Bauhaus";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgb(66, 135, 245)";
      ctx.fillText(newDate, 900, 500);

      writeFileSync("./src/cache/now.png", image.toBuffer("image/png"));
      await wallpaper.setWallpaper("./src/cache/now.png").then(() => {
        console.log(`Fond d'écran changé en ${newDate}`);
      });
    });
  }, 500);
};
