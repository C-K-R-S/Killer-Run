// Criar a cena 0
const cena1 = new Phaser.Scene("Cena 1");

var player;
var player2;
var timer;
var timerText;
var timedEvent;
var pointer;
var touchX;
var touchY;
var direita;
var esquerda;
var cima;
var baixo;
var wall;
var walk;
var ambient;
var walk2;
var lose;
var button;
var FKey;
var jogador;
var self;
var physics;
var time;
var cameras;
var socket;

cena1.preload = function () {
  //carregamento de todos os sons do game
  this.load.audio("ambient", "../sounds/ambient.mp3");
  //this.load.audio("lose", "../sounds/explode1.mp3");
  //carregamento dos mapas
  this.load.tilemapTiledJSON("map", "../assets/map.json");
  this.load.image("tiles", "../assets/mapPeck.png");
  //carregamento do personagem
  this.load.spritesheet("player", "../assets/ghostface.png", {
    frameWidth: 17.5,
    frameHeight: 18,
  });
};
cena1.create = function () {};

cena1.update = function () {};

export { cena1 };
