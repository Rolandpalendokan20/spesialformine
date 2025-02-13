let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('touchmove', (e) => {
      if (!this.rotating) {
        const touch = e.touches[0];
        this.touchX = touch.clientX;
        this.touchY = touch.clientY;

        this.velX = this.touchX - this.prevTouchX;
        this.velY = this.touchY - this.prevTouchY;
      }

      const dirX = this.touchX - this.touchStartX;
      const dirY = this.touchY - this.touchStartY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;

      // Check for two-finger touch for rotation
      if (e.touches.length === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

document.addEventListener("DOMContentLoaded", function () {
  const lyrics = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ];

  const delay = 41; 
  const lyricsElement = document.getElementById("lyrics");

  async function displayLyrics() {
    for (const line of lyrics) {
      for (const char of line) {
        const charElement = document.createElement("span"); 
        charElement.textContent = char;
        charElement.style.animation = "glow 2s ease-in-out"; 
        charElement.style.fontSize = "30px";
        lyricsElement.appendChild(charElement); 

        await new Promise((resolve) => setTimeout(resolve, delay));

        charElement.style.animation = "";
      }

      lyricsElement.appendChild(document.createElement("br")); 

      await new Promise((resolve) => setTimeout(resolve, delay * 25));

      lyricsElement.textContent = "";

      await new Promise((resolve) => setTimeout(resolve, delay * 35));
    }

    setTimeout(function () {
      window.location.href = "yournexthtmlfile.html"; 
    }, 700);
  }
  
  displayLyrics();
});