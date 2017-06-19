/* jshint strict: false */
/* exported snowfall */
/*------------------------------------------------------------------------------
shin_snowfall.js
Copyright (c) 2017 Steve Layton
------------------------------------------------------------------------------*/

function snowfall(dst, params) {
  this.dst = dst;
  this.snow = [];
  let angle = 0;

  const flakes = params.flakes;
  const color = params.color;

  for (let i = 0; i < flakes; i += 1) {
    this.snow.push({
      x: Math.random() * this.dst.canvas.width,
      y: Math.random() * this.dst.canvas.height,
      r: (Math.random() * 4) + 1, // radis
      d: Math.random() * flakes, // density
    });
  }

  this.draw = function draw() {
    const tmp = this.dst.contex.fillStyle;
    const tmp2 = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    this.dst.contex.beginPath();
    for (let i = 0; i < this.snow.length; i += 1) {
      let f = this.snow[i];
      this.dst.plot(f.x, f.y, f.r, color);
    }
    this.dst.contex.fillStyle = tmp;
    this.dst.contex.globalAlpha = tmp2;
    this.update();
  };

  this.update = function update() {
    angle += 0.1;
    for (let i = 0; i < this.snow.length; i += 1) {
      let f = this.snow[i];
      f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
      f.x += Math.sin(angle) * 2;

      if (f.x > this.dst.canvas.width + 5 || f.x < -5 || f.y > this.dst.canvas.height) {
        console.log(f.x, f.y);
        if (i % 3 > 0) {
          this.snow[i] = {
            x: Math.random() * this.dst.canvas.width,
            y: -10,
            r: f.r,
            d: f.d,
          };
        } else if (Math.sin(angle) > 0) {
          this.snow[i] = {
            x: -5,
            y: Math.random() * this.dst.canvas.height,
            r: f.r,
            d: f.d,
          };
        } else {
          this.snow[i] = {
            x: this.dst.canvas.width + 5,
            y: Math.random() * this.dst.canvas.height,
            r: f.r,
            d: f.d,
          };
        }
      }
    }
  };
}
