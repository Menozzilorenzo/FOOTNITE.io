const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {}
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
const players = [];
let ballon = '';
let cursors = '';

function preload() {
  this.load.image('fond', 'assets/image/FootNite-proto600x600.png');
  this.load.image('ballon', 'assets/image/ballon45x45.png');
  this.load.image('blue', 'assets/image/playerBlue38x38.png');
  this.load.image('purple', 'assets/image/playerPurple38x38.png');
  this.load.image('red', 'assets/image/playerRed38x38.png');
  this.load.image('yellow', 'assets/image/playerYellow38x38.png');

}

function create() {
  this.add.image(300, 300, 'fond');
  ballon = this.physics.add.image(300, 300, 'ballon');
  players[0] = this.physics.add.image(450, 150, 'blue');
  players[1] = this.physics.add.image(450, 450, 'purple');
  players[2] = this.physics.add.image(150, 150, 'red');
  players[3] = this.physics.add.image(150, 450, 'yellow');

  // enable world collision for ballon and players
  for (const el of players) {
    el.body.collideWorldBounds = true;
  }
  ballon.body.collideWorldBounds = true;

  //setup cursors
  cursors = this.input.keyboard.createCursorKeys();

  //setup collision
  this.physics.add.collider(players, ballon);
  this.physics.add.collider(players, players);
}

function update() {
  //stop velocity when not pressing buttons
  let x = 0;
  let y = 0;
  players[1].setVelocity(x, y);

  //set velocity for each direction
  if (cursors.left.isDown) {
    players[1].setVelocity(x-=100, y);
  }
  else if (cursors.right.isDown) {
    players[1].setVelocity(x+=100, y);
  }
  if (cursors.up.isDown) {
    players[1].setVelocity(x, y-=100);
  }
  else if (cursors.down.isDown) {
    players[1].setVelocity(x, y+=100);
  }
}



///////////////
// SOCKET.IO //
///////////////

const socket = io();