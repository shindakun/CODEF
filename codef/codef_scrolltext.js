/* jshint strict: false */
/* global window */
/* exported scrollTextHorizontal, scrollTextVertical */
/*------------------------------------------------------------------------------
Copyright (c) 2011 Antoine Santo Aka NoNameNo

This File is part of the CODEF project.

More info : http://codef.santo.fr
Demo gallery http://www.wab.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
------------------------------------------------------------------------------*/

function Ltrobj(posx, posy, ltr) {
  this.posx = posx;
  this.posy = posy;
  this.ltr = ltr;
  return this;
}

function sortPosx(a, b) {
  const x = a.posx;
  const y = b.posx;
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function sortPosy(a, b) {
  const x = a.posy;
  const y = b.posy;
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function scrollTextHorizontal() {
  this.scroffset = 0;
  this.oldspeed = 0;
  this.speed = 1;
  this.letters = {};
  this.scrtxt = ' ';
  this.pausetimer = 0;
  this.pausedelay = 0;

  this.init = function init(dst, font, speed, sinparam, type) {
    this.speed = speed;
    this.dst = dst;
    this.font = font;
    this.fontw = this.font.tilew;
    this.fonth = this.font.tileh;
    this.fontstart = this.font.tilestart;
    this.wide = Math.ceil(this.dst.canvas.width / this.fontw) + 1;
    for (let i = 0; i <= this.wide; i += 1) {
      this.letters[i] = new Ltrobj(Math.ceil((this.wide * this.fontw) + (i * this.fontw)),
        0, this.scrtxt.charCodeAt(this.scroffset));
      this.scroffset += 1;
    }
    if (typeof (sinparam) !== 'undefined') {
      this.sinparam = sinparam;
    }
    if (typeof (type) === 'undefined') {
      this.type = 0;
    } else {
      this.type = type;
    }
  };

  this.draw = function draw(posy) {
    let prov = 0;
    let temp = [];
    let oldvalue = [];
    let i;
    const tmp = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    if (typeof (this.sinparam) !== 'undefined') {
      for (let j = 0; j < this.sinparam.length; j += 1) {
        oldvalue[j] = this.sinparam[j].myvalue;
      }
    }
    if (this.speed === 0) {
      this.pausetimer += 1;
      if (this.pausetimer === 60 * this.pausedelay) {
        this.speed = this.oldspeed;
      }
    }
    const speed = this.speed;
    for (i = 0; i <= this.wide; i += 1) {
      this.letters[i].posx -= speed;
      if (this.letters[i].posx <= -this.fontw) {
        if (this.scrtxt.charAt(this.scroffset) === '^') {
          if (this.scrtxt.charAt(this.scroffset + 1) === 'P') {
            this.pausedelay = this.scrtxt.charAt(this.scroffset + 2);
            this.pausetimer = 0;
            this.oldspeed = this.speed;
            this.speed = 0;
            this.scroffset += 3;
          } else if (this.scrtxt.charAt(this.scroffset + 1) === 'S') {
            this.speed = this.scrtxt.charAt(this.scroffset + 2);
            this.scroffset += 3;
          } else if (this.scrtxt.charAt(this.scroffset + 1) === 'C') {
            //
            // ADDON by Robert Annett
            //
            const end = this.scrtxt.indexOf(';', this.scroffset + 2);
            const functionName = this.scrtxt.substring(this.scroffset + 2, end);
            window[functionName]();
            this.scroffset += (end - this.scroffset) + 1;
          }
        } else {
          this.letters[i].posx = (this.wide * this.fontw) + (this.letters[i].posx + this.fontw);
          if (typeof (this.sinparam) !== 'undefined') {
            for (let j = 0; j < this.sinparam.length; j += 1) {
              oldvalue[j] += this.sinparam[j].inc;
            }
          }
          this.letters[i].ltr = this.scrtxt.charCodeAt(this.scroffset);
          this.scroffset += 1;
          if (this.scrtxt.length - 1 <= this.wide) {
            if (this.scroffset > this.wide) {
              this.scroffset = 0;
            }
          } else if (this.scroffset > this.scrtxt.length - 1) {
            this.scroffset = 0;
          }
        }
      }
    }
    if (typeof (this.sinparam) !== 'undefined') {
      for (let j = 0; j < this.sinparam.length; j += 1) {
        this.sinparam[j].myvalue = oldvalue[j];
      }
    }

    for (let j = 0; j <= this.wide; j += 1) {
      temp[j] = { indice: j, posx: this.letters[j].posx };
    }
    temp.sort(sortPosx);
    for (i = 0; i <= this.wide; i += 1) {
      if (typeof (this.sinparam) !== 'undefined') {
        prov = 0;
        for (let j = 0; j < this.sinparam.length; j += 1) {
          if (this.type === 0) {
            prov += Math.sin(this.sinparam[j].myvalue) * this.sinparam[j].amp;
          }
          if (this.type === 1) {
            prov += -Math.abs(Math.sin(this.sinparam[j].myvalue) * this.sinparam[j].amp);
          }
          if (this.type === 2) {
            prov += Math.abs(Math.sin(this.sinparam[j].myvalue) * this.sinparam[j].amp);
          }
        }
      }
      this.font.drawTile(this.dst, this.letters[temp[i].indice].ltr - this.fontstart,
        this.letters[temp[i].indice].posx, prov + posy);

      if (typeof (this.sinparam) !== 'undefined') {
        for (let j = 0; j < this.sinparam.length; j += 1) {
          this.sinparam[j].myvalue += this.sinparam[j].inc;
        }
      }
    }
    if (typeof (this.sinparam) !== 'undefined') {
      for (let j = 0; j < this.sinparam.length; j += 1) {
        this.sinparam[j].myvalue = oldvalue[j] + this.sinparam[j].offset;
      }
    }
    this.dst.contex.globalAlpha = tmp;
  };

  return this;
}

function scrollTextVertical() {
  this.scroffset = 0;
  this.oldspeed = 0;
  this.speed = 1;
  this.font = '';
  this.letters = {};
  this.scrtxt = ' ';
  this.pausetimer = 0;
  this.pausedelay = 0;

  this.init = function init(dst, font, speed, sinparam, type) {
    this.speed = speed;
    this.dst = dst;
    this.font = font;
    this.fontw = this.font.tilew;
    this.fonth = this.font.tileh;
    this.fontstart = this.font.tilestart;
    this.wide = Math.ceil(this.dst.canvas.height / this.fonth) + 1;
    for (let i = 0; i <= this.wide; i += 1) {
      this.letters[i] = new Ltrobj(0, Math.ceil((this.wide * this.fonth) + (i * this.fonth)),
        this.scrtxt.charCodeAt(this.scroffset));
      this.scroffset += 1;
    }
    if (typeof (sinparam) !== 'undefined') {
      this.sinparam = sinparam;
    }
    if (typeof (type) === 'undefined') {
      this.type = 0;
    } else {
      this.type = type;
    }
  };

  this.draw = function draw(posx) {
    let prov = 0;
    let temp = [];
    let oldvalue = [];
    const tmp = this.dst.contex.globalAlpha;
    this.dst.contex.globalAlpha = 1;
    if (typeof (this.sinparam) !== 'undefined') {
      for (let j = 0; j < this.sinparam.length; j += 1) {
        oldvalue[j] = this.sinparam[j].myvalue;
      }
    }
    if (this.speed === 0) {
      this.pausetimer += 1;
      if (this.pausetimer === 60 * this.pausedelay) {
        this.speed = this.oldspeed;
      }
    }
    const speed = this.speed;
    for (let i = 0; i <= this.wide; i += 1) {
      this.letters[i].posy -= speed;
      if (this.letters[i].posy <= -this.fonth) {
        if (this.scrtxt.charAt(this.scroffset) === '^') {
          if (this.scrtxt.charAt(this.scroffset + 1) === 'P') {
            this.pausedelay = this.scrtxt.charAt(this.scroffset + 2);
            this.pausetimer = 0;
            this.oldspeed = this.speed;
            this.speed = 0;
            this.scroffset += 3;
          } else if (this.scrtxt.charAt(this.scroffset + 1) === 'S') {
            this.speed = this.scrtxt.charAt(this.scroffset + 2);
            this.scroffset += 3;
          } else if (this.scrtxt.charAt(this.scroffset + 1) === 'C') {
            //
            // ADDON by Robert Annett
            //
            const end = this.scrtxt.indexOf(';', this.scroffset + 2);
            const functionName = this.scrtxt.substring(this.scroffset + 2, end);
            window[functionName]();
            this.scroffset += (end - this.scroffset) + 1;
          }
        } else {
          this.letters[i].posy = (this.wide * this.fonth) + (this.letters[i].posy + this.fonth);
          if (typeof (this.sinparam) !== 'undefined') {
            for (let j = 0; j < this.sinparam.length; j += 1) {
              oldvalue[j] += this.sinparam[j].inc;
            }
          }
          this.letters[i].ltr = this.scrtxt.charCodeAt(this.scroffset);
          this.scroffset += 1;
          if (this.scrtxt.length - 1 <= this.wide) {
            if (this.scroffset > this.wide) {
              this.scroffset = 0;
            }
          } else if (this.scroffset > this.scrtxt.length - 1) {
            this.scroffset = 0;
          }
        }
      }
    }
    if (typeof (this.sinparam) !== 'undefined') {
      for (let j = 0; j < this.sinparam.length; j += 1) {
        this.sinparam[j].myvalue = oldvalue[j];
      }
    }

    for (let j = 0; j <= this.wide; j += 1) {
      temp[j] = { indice: j, posy: this.letters[j].posy };
    }
    temp.sort(sortPosy);
    for (let i = 0; i <= this.wide; i += 1) {
      if (typeof (this.sinparam) !== 'undefined') {
        prov = 0;
        for (let j = 0; j < this.sinparam.length; j += 1) {
          if (this.type === 0) {
            prov += Math.sin(this.sinparam[j].myvalue) * this.sinparam[j].amp;
          }
          if (this.type === 1) {
            prov += -Math.abs(Math.sin(this.sinparam[j].myvalue) * this.sinparam[j].amp);
          }
          if (this.type === 2) {
            prov += Math.abs(Math.sin(this.sinparam[j].myvalue) * this.sinparam[j].amp);
          }
        }
      }
      this.font.drawTile(this.dst, this.letters[temp[i].indice].ltr - this.fontstart,
        prov + posx, this.letters[temp[i].indice].posy);

      if (typeof (this.sinparam) !== 'undefined') {
        for (let j = 0; j < this.sinparam.length; j += 1) {
          this.sinparam[j].myvalue += this.sinparam[j].inc;
        }
      }
    }
    if (typeof (this.sinparam) !== 'undefined') {
      for (let j = 0; j < this.sinparam.length; j += 1) {
        this.sinparam[j].myvalue = oldvalue[j] + this.sinparam[j].offset;
      }
    }
    this.dst.contex.globalAlpha = tmp;
  };
  return this;
}
