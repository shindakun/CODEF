/* jshint strict: false */
/* global FX */
/* exported FX */
/*------------------------------------------------------------------------------
Copyright (c) 2011 Antoine Santo Aka NoNameNo

This File is part of the CODEF project.

More info : http://codef.santo.fr
Demo gallery http://www.wab.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
------------------------------------------------------------------------------*/

function FX(src, dst, params) {
  this.src = src;
  this.dst = dst;
  this.params = params;

  this.siny = function siny(posx, posy) {
    const oldvalue = [];
    const tmp = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    for (let j = 0; j < this.params.length; j += 1) {
      oldvalue[j] = this.params[j].value;
    }

    for (let i = 0; i < this.src.canvas.width; i += 1) {
      let prov = 0;
      for (let j = 0; j < this.params.length; j += 1) {
        prov += Math.sin(this.params[j].value) * this.params[j].amp;
      }

      this.src.drawPart(this.dst, i + posx, prov + posy, i, 0, 1, this.src.canvas.height);

      for (let j = 0; j < this.params.length; j += 1) {
        this.params[j].value += this.params[j].inc;
      }
    }

    for (let j = 0; j < this.params.length; j += 1) {
      this.params[j].value = oldvalue[j] + this.params[j].offset;
    }

    this.dst.contex.globalAlpha = tmp;
  };

  this.zoomy = function zoomy(posx, posy, max) {
    const oldvalue = [];
    const tmp = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    for (let j = 0; j < this.params.length; j += 1) {
      oldvalue[j] = this.params[j].value;
    }

    for (let i = 0; i < this.src.canvas.width; i += 1) {
      let prov = 0;
      for (let j = 0; j < this.params.length; j += 1) {
        // prov += max + this.params[j].amp + Math.sin(this.params[j].value) * this.params[j].amp;
        prov += Math.sin(this.params[j].value) * this.params[j].amp;
      }

      this.src.drawPart(this.dst, i + posx, posy, i, 0, 1, this.src.canvas.height, 1, 0, 1, prov);

      for (let j = 0; j < this.params.length; j += 1) {
        this.params[j].value += this.params[j].inc;
      }
    }

    for (let j = 0; j < this.params.length; j += 1) {
      this.params[j].value = oldvalue[j] + this.params[j].offset;
    }

    this.dst.contex.globalAlpha = tmp;
  };

  this.sinx = function sinx(posx, posy) {
    const oldvalue = [];
    const tmp = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    for (let j = 0; j < this.params.length; j += 1) {
      oldvalue[j] = this.params[j].value;
    }

    for (let i = 0; i < this.src.canvas.height; i += 1) {
      let prov = 0;
      for (let j = 0; j < this.params.length; j += 1) {
        prov += Math.sin(this.params[j].value) * this.params[j].amp;
      }

      this.src.drawPart(this.dst, prov + posx, i + posy, 0, i, this.src.canvas.width, 1);

      for (let j = 0; j < this.params.length; j += 1) {
        this.params[j].value += this.params[j].inc;
      }
    }

    for (let j = 0; j < this.params.length; j += 1) {
      this.params[j].value = oldvalue[j] + this.params[j].offset;
    }

    this.dst.contex.globalAlpha = tmp;
  };

  this.zoomx = function zoomx(posx, posy, max) {
    const oldvalue = [];
    const tmp = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    for (let j = 0; j < this.params.length; j += 1) {
      oldvalue[j] = this.params[j].value;
    }

    for (let i = 0; i < this.src.canvas.height; i += 1) {
      let prov = 0;
      for (let j = 0; j < this.params.length; j += 1) {
        // prov += max + this.params[j].amp + Math.sin(this.params[j].value) * this.params[j].amp;
        prov += Math.sin(this.params[j].value) * this.params[j].amp;
      }

      this.src.drawPart(this.dst, posx, i + posy, 0, i, this.src.canvas.width, 1, 1, 0, prov, 1);

      for (let j = 0; j < this.params.length; j += 1) {
        this.params[j].value += this.params[j].inc;
      }
    }

    for (let j = 0; j < this.params.length; j += 1) {
      this.params[j].value = oldvalue[j] + this.params[j].offset;
    }

    this.dst.contex.globalAlpha = tmp;
  };
}
