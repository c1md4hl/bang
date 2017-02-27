var playState = {

    create: function () {
       game.world.setBounds(0, 0, game.world.width, game.world.height);

       // open bounds on both sides
       game.physics.arcade.checkCollision.left  = false;
       game.physics.arcade.checkCollision.right = false;

       // add ball
       balls = game.add.group();
       balls.enableBody = true;
       balls.physicsBodyType = Phaser.Physics.ARCADE;

       ball = balls.create(game.world.width / 2, game.world.height / 2, 'ball');
       ball.body.collideWorldBounds = true;
       ball.body.gravity.x = game.rnd.integerInRange(-50, 50)
       ball.body.bounce.set(1, 1);
       ball.anchor.set(0.5, 0.5);
       ball.enableBody = true;
       //ball.physicsBodyType = Phaser.Physics.ARCADE;

       let style = { font: "18px Arial", fill: "#ff0000" };
       ball_text = game.add.text(0, 0, "0", style);
       ball_text.anchor.set(0.5);

       // add players
       players = game.add.group();
       players.enableBody = true;
       players.physicsBodyType = Phaser.Physics.ARCADE;

       player_1 = players.create(15 + STAR_WIDTH + BAR_WIDTH, game.world.height / 2, 'p1');
       player_1.body.collideWorldBounds = true;
       player_1.body.immovable = true;
       player_1.body.bounce.set(1, 1);
       player_1.anchor.set(0.5, 0.5);

       player_2 = players.create(game.world.width - 15 - STAR_WIDTH - BAR_WIDTH, game.world.height / 2, 'p2');
       player_2.body.collideWorldBounds = true;
       player_2.body.immovable = true;
       player_2.body.bounce.set(1, 1);
       player_2.anchor.set(0.5, 0.5);


       // add sidebars
       sidebars = game.add.group();
       sidebars.enableBody = true;
       sidebars.physicsBodyType = Phaser.Physics.ARCADE;

       p1_bar = sidebars.create(game.world.width - BAR_WIDTH, 0, 'bar');
       p1_bar.body.immovable = true;
       p1_bar.enableBody = true;
       p1_bar.physicsBodyType = Phaser.Physics.ARCADE;

       p2_bar = sidebars.create(0, 0, 'bar');
       p2_bar.body.immovable = true;
       p2_bar.enableBody = true;
       p2_bar.physicsBodyType = Phaser.Physics.ARCADE;


       // add stars
       p1_stars = game.add.group();
       p1_stars.enableBody = true;

       p2_stars = game.add.group();
       p2_stars.enableBody = true;

       let game_world_seventh = 0;
       let game_world_seventh_inc = game.world.height / 7
       for(let i = 0; i < 7; i++) {
          p1_stars.create(game.world.width - 64 - BAR_WIDTH, game_world_seventh, 'star');
          p2_stars.create(0 + BAR_WIDTH, game_world_seventh, 'star');
          game_world_seventh += game_world_seventh_inc;
       }

       // controls
       controls = { p1:{up:"",down:"",left:"",right:""},
                    p2:{up:"",down:"",left:"",right:""}
                  };
       controls.p1.up    = game.input.keyboard.addKey(Phaser.Keyboard.W);
       controls.p1.down  = game.input.keyboard.addKey(Phaser.Keyboard.S);
       controls.p1.left  = game.input.keyboard.addKey(Phaser.Keyboard.A);
       controls.p1.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

       controls.p2.up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
       controls.p2.down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
       controls.p2.left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
       controls.p2.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    },

    update: function() {

       //controls
       //P1 - left
       if(controls.p1.up.isDown) {
          player_1.body.velocity.y = -10 * speed_multiplicator;
       } else if(controls.p1.down.isDown) {
          player_1.body.velocity.y = 10 * speed_multiplicator;
       } else {
         player_1.body.velocity.y = 0;
       }

       if(controls.p1.left.isDown && (player_1.x > STAR_WIDTH + BAR_WIDTH + PLAYER_WIDTH / 2)) {
          player_1.body.velocity.x = -10 * speed_multiplicator;
       } else if(controls.p1.right.isDown && (player_1.x < game.world.width / 2 - PLAYER_WIDTH / 2)) {
          player_1.body.velocity.x = 10 * speed_multiplicator;
       } else {
         player_1.body.velocity.x = 0;
         if(player_1.x >= game.world.width / 2) {
            player_1.x = game.world.width / 2 - PLAYER_WIDTH / 2;
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

       if(controls.p2.right.isDown && (player_2.x < game.world.width - STAR_WIDTH - BAR_WIDTH - PLAYER_WIDTH)) {
          player_2.body.velocity.x = 10 * speed_multiplicator;
       } else if(controls.p2.left.isDown && (player_2.x > game.world.width / 2 + PLAYER_WIDTH / 2)) {
          player_2.body.velocity.x = -10 * speed_multiplicator;
       } else {
         player_2.body.velocity.x = 0;
         if(player_2.x <= game.world.width / 2) {
            player_2.x = game.world.width / 2 + PLAYER_WIDTH / 2;
         }
       }

       this.processCollisions();

       ball_text.x = Math.floor(ball.x);
       ball_text.y = Math.floor(ball.y);

       if(p1_bar_removed) {
          if(ball.x > game.world.width) {
            p1_points++;
            this.checkScore('p1');
          }
       }

       if(p2_bar_removed) {
          if(ball.x < 0) {
            p2_points++;
            this.checkScore('p2');
          }
       }


     //  game.debug.body(ball);
     //  game.debug.body(player_1);
     //  game.debug.body(player_2);
    },

    processCollisions: function() {
       game.physics.arcade.collide(balls, player_1, this.collidePlayer);
       game.physics.arcade.collide(balls, player_2, this.collidePlayer);

       game.physics.arcade.collide(balls, sidebars);

       game.physics.arcade.overlap(balls, p1_stars, this.overlapP1Stars);
       game.physics.arcade.overlap(balls, p2_stars, this.overlapP2Stars);
    },

    collidePlayer: function (_ball, _player) {
       let last_hit = '0';
       if(_ball.key === 'p1') {
          last_hit = '1';
          ball_state = 'p1';
       }

       if(_ball.key === 'p2') {
          last_hit = '2';
          ball_state = 'p2';
       }
       ball_text.setText(last_hit);
    },

    overlapP1Stars: function (_ball, _star) {
       if(ball_state === 'p1') {
          _star.kill();
          if(p1_stars.countLiving() === 0) {
             p1_bar.kill();
             p1_bar_removed = true;
          }
       }
    },

    overlapP2Stars: function(_ball, _star) {
       if(ball_state === 'p2') {
          _star.kill();
          if(p2_stars.countLiving() === 0) {
             p2_bar.kill();
             p2_bar_removed = true;
          }
       }
    },

   checkScore: function(_player) {
      console.log('P1: '+p1_points+' - P2: '+p2_points);
      if( (_player === 'p1' && p1_points >= WIN_POINTS && p1_points > (p2_points + 1)) || 
          (p2_points >= WIN_POINTS && p2_points > (p1_points + 1)) ) {
             game.state.start('win');         
      } else {
         game.state.start('play');      
      }
   }

}
