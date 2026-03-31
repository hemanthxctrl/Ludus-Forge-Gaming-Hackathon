const fs = require('fs');
let text = fs.readFileSync('N-block-mind-descent.html', 'utf8');

// Replace font globally
text = text.replace(/Courier New/g, 'Share Tech Mono');

// Add stylesheet if not present
if (!text.includes('fonts.googleapis.com')) {
    text = text.replace('<title>', '<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">\n    <title>');
}

// Increase Locker size
text = text.replace(/g\.fillRect\(60 \+ i \* 140, 88, 60, 55\);/g, 'g.fillRect(60 + i * 140, 88, 80, 88);');
text = text.replace(/g\.strokeRect\(60 \+ i \* 140, 88, 60, 55\);/g, 'g.strokeRect(60 + i * 140, 88, 80, 88);');

// Change CSS layout for container
text = text.replace(/width: 800px;\s*height: 600px;/g, 'width: 1200px;\n            height: 900px;');

// Change Phaser Config to use FIT scale so the game resizes internally to fit the 1200x900 container
text = text.replace(/width: 800,\s*height: 600,\s*parent: 'game-container',/g, 'scale: { mode: Phaser.Scale.FIT, parent: \'game-container\', width: 800, height: 600 },');

// Increase Teacher size
text = text.replace(/fillRect\(this\.teacherX \- 10, this\.teacherY \- 16, 20, 30\);/g, 'fillRect(this.teacherX - 16, this.teacherY - 32, 32, 48);');
text = text.replace(/fillCircle\(this\.teacherX, this\.teacherY \- 22, 11\);/g, 'fillCircle(this.teacherX, this.teacherY - 40, 15);');

fs.writeFileSync('N-block-mind-descent.html', text);
console.log('Done!');
