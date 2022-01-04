const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particleArray = [];

// Mouse
const mouse = {
  x: null,
  y: null,
  radius: 250,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("S", 0, 30);
const data = ctx.getImageData(0, 0, 100, 100);

// Particle
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let delX = mouse.x - this.x;
    let delY = mouse.y - this.y;
    let distance = Math.sqrt(delX * delX + delY * delY);
    let forceDirectionX = delX / distance;
    let forceDirectionY = delY / distance;
    let maxDistance = mouse.radius;

    /* force is a multiplier which slows partices 
    down as they get furthur away from the mouse.
    Value of force is between from 0 to 1 */
    let force = (maxDistance - distance) / maxDistance;

    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      this.size = 3;
    }
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < 500; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}

init();
animate();
console.log(particleArray);
