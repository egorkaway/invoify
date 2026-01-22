const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a simple colored square as placeholder
const size = 1024;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Fill with purple color (Invoify brand color)
ctx.fillStyle = '#6200ee';
ctx.fillRect(0, 0, size, size);

// Add white text "I"
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 400px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('I', size/2, size/2);

const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./assets/icon.png', buffer);
fs.writeFileSync('./assets/splash.png', buffer);
fs.writeFileSync('./assets/adaptive-icon.png', buffer);
fs.writeFileSync('./assets/favicon.png', buffer);

console.log('Assets created');
