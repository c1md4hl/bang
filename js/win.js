var winState = {

    preload: function() {
        let winText = ' wins!';
        if(p1_points > p2_points) {
            winText = 'P1' + winText;
        } else {
            winText = 'P2' + winText;
        }
        let winLabel = game.add.text(80, 150, winText, {font:'30px Courier', fill:'#ffffff'});
        let continueLabel = game.add.text(80, 250, 'Press C to start over.', {font:'20px Courier', fill:'#ffffff'});
        let continueKey;
    },

    create: function() {
        // game.state.start('menu');

       // game.state.start('play');
       continueKey = game.input.keyboard.addKey(Phaser.Keyboard.C)
    },

    update: function() {
      if(continueKey.isDown) {
          p1_points = p2_points = 0;
          game.state.start('play');
      }
    }
}
