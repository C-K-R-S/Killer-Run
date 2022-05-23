import { cena1 } from "./cena1.js";

// Criar a cena 3
var cena3 = new Phaser.Scene("cena 3");

cena3.preload = function () {
  // Imagem de fundo
    this.load.image("win", "./assets/cena3.png");
    this.load.image("voltar", "./assets/voltar.png");
};
cena3.create = function () {
  // Botão com a imagem de fundo
  var button = this.add.image(400, 400, "win", 0).setInteractive();
  var button = this.add.image(385, 700, "voltar").setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena1);
    },
    this
  );
};

cena3.update = function () {};


  // Exportar a cena

export { cena3 };
    
