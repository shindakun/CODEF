/* jshint strict: false */
/* exported snowfall */
/*------------------------------------------------------------------------------
shin_rainfall.js
Copyright (c) 2017 Steve Layton
------------------------------------------------------------------------------*/

function rainfall(dst, params) {
  this.dst = dst;

  let init = [];
  const maxParts = 500;

  for (let i = 0; i < maxParts; i += 1) {
    init.push({
      x: Math.random() * this.dst.canvas.width,
      y: Math.random() * this.dst.canvas.height,
      l: Math.random() * 1,
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10,
    });
  }

  let particles = [];
  for (let i = 0; i < maxParts; i += 1) {
    particles[i] = init[i];
  }

  this.draw = function draw() {
    this.dst.contex.strokeStyle = 'rgba(174,194,224,0.5)';
    this.dst.contex.lineWidth = 1;
    this.dst.contex.lineCap = 'round';

    for (let i = 0; i < particles.length; i += 1) {
      let p = particles[i];
      this.dst.contex.beginPath();
      this.dst.contex.moveTo(p.x, p.y);
      this.dst.contex.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
      this.dst.contex.stroke();
      this.dst.contex.closePath();
    }
    this.update();
  };

  this.update = function update() {
    for (let i = 0; i < particles.length; i += 1) {
      let p = particles[i];
      p.x += p.xs;
      p.y += p.ys;
      if (p.x > this.dst.canvas.width || p.y > this.dst.canvas.height) {
        p.x = Math.random() * this.dst.canvas.width;
        p.y = -20;
      }
    }
  };
}
