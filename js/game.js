//let game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });
let game = new Phaser.Game(640, 480, Phaser.AUTO, '');
let ground, players, balls, ball, ball_state, ball_text, controls;
let player_1, p1_stars, p1_bar, p1_points = 0, p1_bar_removed = false;
let player_2, p2_stars, p2_bar, p2_points = 0, p2_bar_removed = false;

let speed_multiplicator = 30;
let ballSpeed = 300;

let center_padding = 10;

const PLAYER_WIDTH = 30;
const STAR_WIDTH   = 64;
const BAR_WIDTH    = 20;

//game.state.add('boot', bootState);
game.state.add('load', loadState);
//game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('load');
