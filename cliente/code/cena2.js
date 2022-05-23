import { cena1 } from "./cena1.js";

// Criar a cena 2
var cena2 = new Phaser.Scene("Cena 2");

cena2.preload = function () {
  // Imagem de fundo
  this.load.image("lose", "./assets/cena2.png");
  this.load.image("voltar", "./assets/voltar.png");
};

cena2.create = function () {
  // Botão com a imagem de fundo
  var button = this.add.image(400, 400, "lose", 0).setInteractive();
  var button = this.add.image(385, 700, "voltar").setInteractive();

  button.on(
    "pointerdown",
    function () {
      this.scene.start(cena1);
    },
    this
  );
};

cena2.update = function () {};

// Exportar a cena
export { cena2 };
