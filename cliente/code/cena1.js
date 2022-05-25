// Importar a próxima cena
import { cena2 } from "./cena2.js";
import { cena3 } from "./cena3.js";


// Criar a cena 0
const cena1 = new Phaser.Scene("Cena 1");

var player1;
var player2;
var player3;
var pause;
var vida_mocinha;
var vida_assassino;
var inventoryText2;
var inventory2;
var inventory;
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
var killed;
var wall;
var walk;
var ambient;
var walk2;
var lose;
var button;
var faca;
var self;
var physics;
var time;
var cameras;
var socket;
var map;
var tileset;
var terreno;
var ARCas;
var personagem_com_faca;

cena1.preload = function () {
  //carregamento de todos os sons do game
  this.load.audio("ambient", "./sounds/ambient.mp3");
  //this.load.audio("lose", "./sounds/explode1.mp3");

  //carregamento dos mapas
  this.load.image("tiles", "./assets/mapPeck.png");
  this.load.tilemapTiledJSON("map", "./assets/map.json");

  //carregamento vilão
  this.load.spritesheet("player1", "./assets/ghostface.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  //carregamento mocinha
  this.load.spritesheet("player2", "./assets/mocinha.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.spritesheet("faca", "./assets/faca.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  // Tela cheia
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
};

cena1.create = function () {
  personagem_com_faca = false;

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
 
  //spawn
  player1 = this.physics.add.sprite(850, 50, "player1");
  player2 = this.physics.add.sprite(50, 530, "player2");
 
  personagem_com_faca = false;

  // Personagens colidem com os limites da cena
  player1.setCollideWorldBounds(true);
  player2.setCollideWorldBounds(true);

  // Detecção de colisão: terreno
  terreno.setCollisionByProperty({ collides: true });
  this.physics.add.collider(player1, terreno, null, null, this);
  this.physics.add.collider(player2, terreno, null, null, this);

  // Detecção de colisão e disparo de evento: ARCas
  ARCas.setCollisionByProperty({ collides: true });

  this.physics.add.collider(player1, ARCas, null, null, this);
  this.physics.add.collider(player2, ARCas, null, null, this);

  //spawn faca
  faca = this.physics.add.sprite(250, 220, "faca");

  //Coletar faca
  this.physics.add.overlap(player2, faca, collectFaca, null, this);

  // Animação do jogador 1: a esquerda
  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 5,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Animação do jogador 2(sem faca): a esquerda
  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 23,
      end: 25,
    }),
    frameRate: 10,
    repeat: -1,
  });

  //Animação do jogador 2(com faca): a esquerda
  this.anims.create({
    key: "left2-com-faca",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 8,
      end: 10,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 1: a direita
  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 4,
      end: 4,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Animação do jogador 2(sem faca): a direita
  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 20,
      end: 22,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2(com faca): a direita
  this.anims.create({
    key: "right2-com-faca",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 5,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 1: para cima
  this.anims.create({
    key: "up1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 3,
      end: 3,
    }),
    frameRate: 5,
    repeat: -1,
  });
  // Animação do jogador 2(sem faca): para cima
  this.anims.create({
    key: "up2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 26,
      end: 29,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2(com faca): para cima
  this.anims.create({
    key: "up2-com-faca",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 11,
      end: 14,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2(sem faca): para baixo
  this.anims.create({
    key: "down2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 15,
      end: 19,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2(com faca): para baixo
  this.anims.create({
    key: "down2-com-faca",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 4,
    }),
    frameRate: 10,
    repeat: -1,
  });

  //Definir vida vilão
  vida_mocinha = 1;
  vida_assassino = 3;
  this.physics.add.collider(player2, player1, acerta_player1, null, this);

  // Animação do jogador 1: ficar parado
  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });
  // Animação do jogador 1: ficar parado
  this.anims.create({
    key: "killed1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 6,
      end: 6,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // Animação do jogador 2(sem faca): ficar parado
  this.anims.create({
    key: "stopped2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 15,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2(sem faca): ficar parado
  this.anims.create({
    key: "stopped2-com-faca",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
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
  this.cameras.main.setZoom(3);
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

cena1.update = function () {
  if (vida_mocinha === 0) {
    ambient.stop();
    this.scene.start(cena2);
  }

  if (vida_assassino === 0) {
    player2.setFrame(6);
    ambient.stop();
    this.scene.start(cena3)

  }

  // Controle do personagem 1: WASD
  if (vida_assassino > 0) {
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
  }
  if (vida_assassino === 0) {
    player1.body.setVelocity(0);
    player1.anims.play("killed1", true)
}

// Controle do personagem 2: direcionais
  if (cursors.left.isDown) {
    player2.body.setVelocityX(-100);
  } else if (cursors.right.isDown) {
    player2.body.setVelocityX(100);
  } else {
    player2.body.setVelocity(0);
  }

  if (cursors.up.isDown) {
    player2.body.setVelocityY(-100);
  } else if (cursors.down.isDown) {
    player2.body.setVelocityY(100);
  } else {
    player2.body.setVelocityY(0);
  }

  if (cursors.left.isDown) {
    if (personagem_com_faca) {
      player2.anims.play("left2-com-faca", true);
    } else {
      player2.anims.play("left2", true);
    }
  } else if (cursors.right.isDown) {
    if (personagem_com_faca) {
      player2.anims.play("right2-com-faca", true);
    } else {
      player2.anims.play("right2", true);
    }
  } else if (cursors.up.isDown) {
    if (personagem_com_faca) {
      player2.anims.play("up2-com-faca", true);
    } else {
      player2.anims.play("up2", true);
    }
  } else if (cursors.down.isDown) {
    if (personagem_com_faca) {
      player2.anims.play("down2-com-faca", true);
    } else {
      player2.anims.play("down2", true);
    }
  } else {
    if (personagem_com_faca) {
      player2.anims.play("stopped2-com-faca", true);
    } else {
      player2.anims.play("stopped2", true);
    }
  }
};

function collectFaca(player2, faca) {
  //faca some quando coletada
  faca.disableBody(true, true);

  inventory += 1;
  personagem_com_faca = true;
}

function acerta_player1(player2, player1) {
  if (personagem_com_faca) {
    vida_assassino--;
    console.log(vida_assassino);
  } else {
    vida_mocinha--;
    console.log(vida_mocinha);
  }
}

export { cena1 };
