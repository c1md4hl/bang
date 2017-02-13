var loadState = {

    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading', {font:'30px Courier', fill:'#ffffff'});
        game.load.image('p1', 'assets/img/p1.png', 30, 30);
        game.load.image('p2', 'assets/img/p2.png', 30, 30);
        game.load.image('ball', 'assets/img/ball.png', 30, 30);
        game.load.image('bar', 'assets/img/bar.png', 20, 480);
        game.load.image('star', 'assets/img/star.png', 64, 64);
    },

    create: function() {
        // game.state.start('menu');
        game.state.start('play');
    }
}
