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
var map;
var tileset;
var terreno;
var ARCas;

cena1.preload = function () {
  //carregamento de todos os sons do game
  this.load.audio("ambient", "../sounds/ambient.mp3");
  //this.load.audio("lose", "../sounds/explode1.mp3");

  //carregamento dos mapas
  this.load.image("tiles", "../assets/mapPeck.png");
  this.load.tilemapTiledJSON("map", "../assets/map.json");

  //carregamento do personagem
  this.load.spritesheet("player", "../assets/ghostface.png", {
    frameWidth: 17.5,
    frameHeight: 18,
  });
};

cena1.create = function () {
  //musicas
  //lose = this.sound.add("lose");
  ambient = this.sound.add("ambient");
  //musica ambient tocada em looping
  ambient.play();
  ambient.setLoop(true);

  // Mapa
  map = this.make.tilemap({ key: "map" });

  // Tileset
  tileset = map.addTilesetImage("terreno", "tiles");

  // Camadas
  terreno = map.createStaticLayer("terreno", tileset, 0, 0);
  ARCas = map.createStaticLayer("ARCas", tileset, 0, 0);

  // Colisão
  ARCas.setCollisionByProperty({ collides: true });
};

cena1.update = function () {};

export { cena1 };
