let trazos = [];
let cantidadTrazos = 20;
let previousMouseX;
let previousMouseY;
let isMousePressed = false;
let escala = 0.1; // tamaño de los trazos
const cantidad_copos = 30; // Reducir la cantidad de copos visibles
let copos = [];
const radioCentro = 200; // Radio del área central vacía

function preload() {
  for (let i = 0; i < cantidadTrazos; i++) {
    let nombre = "data/pince" + nf(i + 1, 2) + ".png";
    trazos[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(251, 215, 166);
  imageMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  previousMouseX = mouseX;
  previousMouseY = mouseY;
  
  for (let i = 0; i < cantidad_copos; i++) {
    copos.push(new Copo());
  }
}

function draw() {
  for (const copo of copos) {
    copo.dibujar();
  }
  
  if (isMousePressed || dist(mouseX, mouseY, previousMouseX, previousMouseY) > 10) {
    let cual = int(random(trazos.length));
    let x = random(width);
    let y = random(height / 1.3, height);

    let hue, saturation, brightness;
    
    if (mouseX !== previousMouseX) {
      hue = map(mouseY, 0, height, 255, 360); // De rojo a amarillo
      saturation = random(50, 100);
      brightness = random(50, 100);
    } else if (mouseY !== previousMouseY) {
      hue = map(mouseX, 0, width, 270, 320); // De violeta a rosa
      saturation = random(50, 100);
      brightness = random(50, 100);
    }

    let alpha = 100;

    tint(hue, saturation, brightness, alpha);
    let ancho = trazos[cual].width * escala;
    let alto = trazos[cual].height * escala;
    image(trazos[cual], x, y, ancho, alto);
  }
  
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function mousePressed() {
  isMousePressed = true;
}

function mouseReleased() {
  isMousePressed = false;
}

class Copo {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.dy = random(0.5, 2); // Reducir la velocidad de los copos para un movimiento más suave
    this.trazoIndex = int(random(trazos.length));
    this.escala = random(0.05, 0.1); // Reducir el tamaño de los copos
  }
  
  dibujar() {
    let ancho = trazos[this.trazoIndex].width * this.escala;
    let alto = trazos[this.trazoIndex].height * this.escala;
    
    this.y += this.dy;
    this.x += random(-100, 100); // Aumentar la variación horizontal significativamente

    image(trazos[this.trazoIndex], this.x, this.y, ancho, alto);
    
    // Verificar si el copo ha llegado al último cuarto de la pantalla
    if (this.y > height * 0.75) {
      this.dy = 0; // Detener el movimiento vertical
    }
    
    // Reiniciar el copo si sale completamente de la pantalla
    if (this.y > height) {
      this.reset();
    }
  }
}

