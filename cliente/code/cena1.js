// Criar a cena 0
const cena1 = new Phaser.Scene("Cena 1");

var player1;
var player2;
var timer;
var life = 0;
var lifeText;
var timerText;
var timedEvent;
var pointer;
var touchX;
var touchY;
var cursors;
var right;
var left;
var up;
var down;
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
  this.load.spritesheet("player1", "../assets/ghostface.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  // Tela cheia
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64,
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
  player1 = this.physics.add.sprite(400, 300, "player1");

  // Colisão
  ARCas.setCollisionByProperty({ collides: true });

  // Personagens colidem com os limites da cena
  player1.setCollideWorldBounds(true);

  // Detecção de colisão: terreno
  terreno.setCollisionByProperty({ collides: true });
  this.physics.add.collider(player1, terreno, this);

  // Detecção de colisão e disparo de evento: ARCas
  ARCas.setCollisionByProperty({ collides: true });
  this.physics.add.collider(player1, ARCas, this);
  // Animação do jogador 1: a esquerda
  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Animação do jogador 1: a direita
  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 5,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Animação do jogador 1: para cima
  this.anims.create({
    key: "up1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 6,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 1: ficar parado
  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 1,
      end: 4,
    }),
    frameRate: 5,
    repeat: -1,
  });
  // Direcionais do teclado
  cursors = this.input.keyboard.createCursorKeys();
  up = this.input.keyboard.addKey("W");
  down = this.input.keyboard.addKey("S");
  left = this.input.keyboard.addKey("A");
  right = this.input.keyboard.addKey("D");

  // Mostra há quanto tempo estão jogando (a vida dos jogadores)
  lifeText = this.add.text(20, 24, life, {
    fontSize: "32px",
    fill: "#cccccc",
  });
  lifeText.setScrollFactor(0);
  // Cena (960x960) maior que a tela (800x600)
  this.cameras.main.setBounds(0, 0, 960, 960);
  this.physics.world.setBounds(0, 0, 960, 960);

  // Câmera seguindo o personagem 1
  this.cameras.main.startFollow(player1);

  // Botão de ativar/desativar tela cheia
  var button = this.add
    .image(800 - 16, 16, "fullscreen", 0)
    .setOrigin(1, 0)
    .setInteractive()
    .setScrollFactor(0);

  // Ao clicar no botão de tela cheia
  button.on(
    "pointerup",
    function () {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // Tecla "F" também ativa/desativa tela cheia
  var FKey = this.input.keyboard.addKey("F");
  FKey.on(
    "down",
    function () {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );
};

cena1.update = function (time, delta) {
  // Controle do personagem 1: WASD
  if (left.isDown) {
    player1.body.setVelocityX(-100);
    player1.anims.play("left1", true);
  } else if (right.isDown) {
    player1.body.setVelocityX(100);
    player1.anims.play("right1", true);
  } else {
    player1.body.setVelocity(0);
    player1.anims.play("stopped1", true);
  }
  if (up.isDown) {
    player1.body.setVelocityY(-100);
    player1.anims.play("up1", true);
  } else if (down.isDown) {
    player1.body.setVelocityY(100);
  } else {
    player1.body.setVelocityY(0);
  }
};



export { cena1 };
