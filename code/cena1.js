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
var physics;
var time;
var cameras;
var socket;
var map;
var tileset;
var terreno;
var ARCas;
var personagem_com_faca;
var jogador;
var frame;
var midias;
var ice_servers = {
  iceServers: [
    {
      urls: "stun:ifsc.cloud",
    },
    {
      urls: "turns:ifsc.cloud",
      username: "etorresini",
      credential: "matrix",
    },
  ],
};
var localConnection;
var remoteConnection;
const audio = document.querySelector("audio");
var midias;
var online;
var sala;
var botao1;
var botao2;
var botao3;
var botao4;
var botao5;

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

  this.load.image("sala1", "./assets/sala1.png");
  this.load.image("sala2", "./assets/sala2.png");
  this.load.image("sala3", "./assets/sala3.png");
  this.load.image("sala4", "./assets/sala4.png");
  this.load.image("sala5", "./assets/sala5.png");

  this.load.image("baixo", "./assets/baixo.png");
  this.load.image("direita", "./assets/direita.png");
  this.load.image("esquerda", "./assets/esquerda.png");
  this.load.image("direita", "./assets/direita.png");

  // Tela cheia
  this.load.spritesheet("fullscreen", "./assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  // D-pad
  this.load.spritesheet("esquerda", "assets/esquerda.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("direita", "assets/direita.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("cima", "assets/cima.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("baixo", "assets/baixo.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  //Imagem de espera para entrar na sala
  this.load.image("waiting", "./assets/waiting.jpg");
};

cena1.create = function () {
  // Preparando o cenário...
  online = false;
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
  terreno = map.createLayer("terreno", tileset, 0, 0);
  ARCas = map.createLayer("ARCas", tileset, 0, 0);

  //spawn
  player1 = this.physics.add.sprite(850, 50, "player1");
  player2 = this.physics.add.sprite(50, 530, "player2");

  // Detecção de colisão e disparo de evento: ARCas
  ARCas.setCollisionByProperty({ collides: true });

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
  vida_mocinha = 3;
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

  // Mostra há quanto tempo estão jogando (a vida dos jogadores)
  lifeText = this.add.text(20, 24, life, {
    fontSize: "32px",
    fill: "#cccccc",
  });
  lifeText.setScrollFactor(0);
  // Cena (960x960) maior que a tela (800x600)
  //this.cameras.main.setZoom(3);
  this.cameras.main.setBounds(0, 0, 960, 960);
  this.physics.world.setBounds(0, 0, 960, 960);

  // Câmera seguindo o personagem 1
  //this.cameras.main.startFollow(player1);

  // Botão de ativar/desativar tela cheia
  var button = this.add
    .image(530, 280, "fullscreen", 0)
    .setScale(0.5)
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

  // Conectar no servidor via WebSocket
  socket = io("https://rocky-anchorage-08006.herokuapp.com");
  //socket = io();

  // Disparar evento quando jogador entrar na partida
  var physics = this.physics;
  var cameras = this.cameras;
  var time = this.time;
  var waiting = this.add.image(400, 300, "waiting", 0);

  botao1 = this.add.image(100, 600, "sala1").setInteractive();
  botao2 = this.add.image(250, 600, "sala2").setInteractive();
  botao3 = this.add.image(400, 600, "sala3").setInteractive();
  botao4 = this.add.image(550, 600, "sala4").setInteractive();
  botao5 = this.add.image(700, 600, "sala5").setInteractive();
  function desaparecerbotaosala() {
    botao1.setVisible(false);
    botao2.setVisible(false);
    botao3.setVisible(false);
    botao3.setVisible(false);
    botao4.setVisible(false);
    botao5.setVisible(false);
  }
  botao1.on("pointerdown", function () {
    sala = 1;
    socket.emit("entrar-na-sala", sala);
    cameras.main.setZoom(3);
    waiting.setVisible(false);
    desaparecerbotaosala();
  });
  botao2.on("pointerdown", function () {
    sala = 2;
    socket.emit("entrar-na-sala", sala);
    cameras.main.setZoom(3);
    waiting.setVisible(false);
    desaparecerbotaosala();
  });
  botao3.on("pointerdown", function () {
    sala = 3;
    socket.emit("entrar-na-sala", sala);
    cameras.main.setZoom(3);
    waiting.setVisible(false);
    desaparecerbotaosala();
  });
  botao4.on("pointerdown", function () {
    sala = 4;
    socket.emit("entrar-na-sala", sala);
    cameras.main.setZoom(3);
    waiting.setVisible(false);
    desaparecerbotaosala();
  });
  botao5.on("pointerdown", function () {
    sala = 5;
    socket.emit("entrar-na-sala", sala);
    cameras.main.setZoom(3);
    waiting.setVisible(false);
    desaparecerbotaosala();
  });

  socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", sala, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", sala, remoteConnection.localDescription);
      });
  });

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);
      // Detecção de colisão: terreno
      terreno.setCollisionByProperty({ collides: true });
      physics.add.collider(player1, terreno, null, null, this);
      physics.add.collider(player2, terreno, null, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      physics.add.collider(player1, ARCas, null, null, this);

      // Câmera seguindo o personagem 1
      cameras.main.startFollow(player1);

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo === socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Detecção de colisão: terreno
      physics.add.collider(player2, terreno, null, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      physics.add.collider(player2, ARCas, null, null, this);

      // Câmera seguindo o personagem 2
      cameras.main.startFollow(player2);

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate && socket.emit("candidate", sala, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit("offer", sala, localConnection.localDescription);
            });
        })
        .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    if (jogadores.primeiro && jogadores.segundo) {
      online = true;
    }
    console.log(jogadores);
  });

  socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", sala, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", sala, remoteConnection.localDescription);
      });
  });

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Desenhar o outro jogador
  socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x;
      player1.y = y;
    }
  });

  socket.on("inventario", (inventario) => {
    if (inventario.faca) {
      personagem_com_faca = true;
    }
  });
};

cena1.update = function () {
  // Partida só inicia quando os dois jogadores estão online
  if (online) {
    if (jogador === 1) {
      // Controle do personagem 1: WASD
      if (vida_assassino > 0) {
        if (cursors.left.isDown) {
          player1.body.setVelocityX(-100);
          player1.anims.play("left1", true);
        } else if (cursors.right.isDown) {
          player1.body.setVelocityX(100);
          player1.anims.play("right1", true);
        } else {
          player1.body.setVelocity(0);
          player1.anims.play("stopped1", true);
        }
        if (cursors.up.isDown) {
          player1.body.setVelocityY(-100);
          player1.anims.play("up1", true);
        } else if (cursors.down.isDown) {
          player1.body.setVelocityY(100);
        } else {
          player1.body.setVelocityY(0);
        }
      }
      if (vida_assassino <= 0) {
        player1.body.setVelocity(0);
        player1.anims.play("killed1", true);
      }
      try {
        frame = player1.anims.getFrameName();
      } catch (e) {
        frame = 0;
      }
      socket.emit("estadoDoJogador", sala, {
        frame: frame,
        x: player1.body.x + 16,
        y: player1.body.y + 16,
      });

      if (vida_mocinha <= 0) {
        ambient.stop();
        socket.close();
        this.scene.start(cena3);
      }

      if (vida_assassino <= 0) {
        player2.setFrame(6);
        ambient.stop();
        socket.close();
        this.scene.start(cena2);
      }
    } else if (jogador === 2) {
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

      try {
        frame = player2.anims.getFrameName();
      } catch (e) {
        frame = 0;
      }
      socket.emit("estadoDoJogador", sala, {
        frame: frame,
        x: player2.body.x + 16,
        y: player2.body.y + 16,
      });

      if (vida_mocinha <= 0) {
        ambient.stop();
        socket.close();
        this.scene.start(cena2);
      }

      if (vida_assassino <= 0) {
        ambient.stop();
        socket.close();
        this.scene.start(cena3);
      }
    }
  }
};

function collectFaca(player2, faca) {
  //faca some quando coletada
  faca.disableBody(true, true);

  inventory += 1;
  personagem_com_faca = true;
  console.log("Personagem com faca? %s", personagem_com_faca);
  socket.emit("inventario", sala, { faca: true });
}

function acerta_player1(player2, player1) {
  if (personagem_com_faca) {
    vida_mocinha === 10000;
    vida_assassino--;
    console.log("Vida do assassino: %s", vida_assassino);
  } else {
    vida_mocinha--;
    console.log("Vida da mocinha: %s", vida_mocinha);
  }
}

export { cena1 };
