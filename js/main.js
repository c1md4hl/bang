
let game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });
let ground, players, player_1, player_2, balls, ball, controls;

let speed_multiplicator = 30;
let ballSpeed = 300;

let center_padding = 10;


function preload() {
   game.load.image('p1', 'assets/img/p1.png', 30, 30);
   game.load.image('p2', 'assets/img/p2.png', 30, 30);
   game.load.image('ball', 'assets/img/ball.png', 30, 30);
}

function create() { 
   game.world.setBounds(0, 0, game.world.width, game.world.height);

   balls = game.add.group();
   balls.enableBody = true;
   balls.physicsBodyType = Phaser.Physics.ARCADE;   

   ball = balls.create(game.world.width / 2, game.world.height / 2, 'ball');
   ball.body.collideWorldBounds = true;
   ball.body.gravity.x = game.rnd.integerInRange(-50, 50)
   ball.body.bounce.set(1, 1);
   ball.anchor.set(0.5, 0.5);
   ball.enableBody = true;
   ball.physicsBodyType = Phaser.Physics.ARCADE;

   players = game.add.group();
   players.enableBody = true;
   players.physicsBodyType = Phaser.Physics.ARCADE;
   
   player_1 = players.create(15, game.world.height / 2, 'p1');
   player_1.body.collideWorldBounds = true;
   player_1.body.immovable = true;
   player_1.body.bounce.set(1, 1);
   

   player_2 = players.create(game.world.width - 15, game.world.height / 2, 'p2');
   player_2.body.collideWorldBounds = true;
   player_2.body.immovable = true;
   player_2.body.bounce.set(1, 1);


//   player_1 = game.add.sprite(15, game.world.height / 2, 'p1');
//   player_2 = game.add.sprite(game.world.width - 30, game.world.height / 2, 'p2');
   
   player_1.anchor.set(0.5, 0.5);
   player_2.anchor.set(0.5, 0.5);

   controls = { p1:{up:"",down:"",left:"",right:""},
                p2:{up:"",down:"",left:"",right:""}
              };
   // controls
   controls.p1.up    = game.input.keyboard.addKey(Phaser.Keyboard.W);
   controls.p1.down  = game.input.keyboard.addKey(Phaser.Keyboard.S);
   controls.p1.left  = game.input.keyboard.addKey(Phaser.Keyboard.A);
   controls.p1.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

   controls.p2.up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
   controls.p2.down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
   controls.p2.left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
   controls.p2.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

}


function update() {

   // controls
   //P1 - left

   if(controls.p1.up.isDown) {
      player_1.body.velocity.y = -10 * speed_multiplicator;
   } else if(controls.p1.down.isDown) {
      player_1.body.velocity.y = 10 * speed_multiplicator;
   } else {
     player_1.body.velocity.y = 0;
   }

   if(controls.p1.left.isDown) {
      player_1.body.velocity.x = -10 * speed_multiplicator;
   } else if(controls.p1.right.isDown && (player_1.x < game.world.width / 2 - player_1.width / 2)) {
      player_1.body.velocity.x = 10 * speed_multiplicator;
   } else {
     player_1.body.velocity.x = 0;
     if(player_1.x >= game.world.width / 2) {
        player_1.x = game.world.width / 2 - player_1.width / 2;
     }
   }


   //P2 - right

   if(controls.p2.up.isDown) {
      player_2.body.velocity.y = -10 * speed_multiplicator;
   } else if(controls.p2.down.isDown) {
      player_2.body.velocity.y = 10 * speed_multiplicator;
   } else {
     player_2.body.velocity.y = 0;
   }

   if(controls.p2.right.isDown) {
      player_2.body.velocity.x = 10 * speed_multiplicator;
   } else if(controls.p2.left.isDown && (player_2.x > game.world.width / 2 + player_2.width / 2)) {
      player_2.body.velocity.x = -10 * speed_multiplicator;
   } else {
     player_2.body.velocity.x = 0;
     if(player_2.x <= game.world.width / 2) {
        player_2.x = game.world.width / 2 + player_2.width / 2;
     }
   }


   processCollisions();

   //game.debug.bodyInfo(sprite, 32, 32);
   game.debug.body(ball);
   game.debug.body(player_1);
   game.debug.body(player_2);
}

function processCollisions() {
//   game.physics.arcade.collide(ball, player_1, collide, null, this);
//   game.physics.arcade.collide(ball, player_2, collide, null, this);
   game.physics.arcade.collide(balls, player_1);
   game.physics.arcade.collide(balls, player_2);
}

function collide(_ball, _player) {
   var diff = 0;
    if (_ball.x < _player.x) {
      diff = _player.x - _ball.x;
    } else if (_ball.x > _player.x) {
      diff = _ball.x - _player.x;
      _ball.body.velocity.x = (10*diff);
    } else {
      _ball.body.velocity.x = 2 + Math.random() * 8;
    } 
}
