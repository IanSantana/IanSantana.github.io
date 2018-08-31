const palavras = [
    "Palheiro",
      "Zoologico",
      "Jarro",
      "Bola",
      "Gato",
      "Caixa",
      "Meteorologia",
      "Armazem",
      "Carro",
      "Caverna",
      "Mordomo",
      "Dinheiro",
      "Morcego",
      "Homem",
      "Limousine",
      "Terminal",
      "Alpaca",
      "Tigre",
      "Banco",
      "Cadeira",
      "Cabelo",
      "Ovo",
      "Sol",
      "Cadeira",
      "Cabelo",
      "Sombra",
      "Casaco",
      "Cruz",
      "Bandeira",
      "Portal",
      "Lixeira",
      "Cortina",
      "Janela",
      "Farol",
      "Shopping",
      "Aeroporto",
      "Sopa",
      "Sinagoga",
      "Drogaria",
      "Caneca",
      "Centrifuga",
      "Lapis",
      "Cavalo",
      "Ferradura",
      "Gincana",
      "Papelaria",
      "Bicicleta",
      "Giroscopio",
      "Champagne",
      "Prancheta",
      "Candelabro",
      "Luminaria",
      "Javali",
      "Faca",
      "Fogueira",
      "Fada",
      "Coador",
      "Carvalho",
      "Chocolate",
      "Sombrero",
      "Caranguejo",
      "Antilope",
      "Salgueira",
      "Escudo",
      "Edificio",
      "Monumento",
      "Ovelha",
      "Celular",
      "Filtro",
      "Nebulizador",
      "Carimbo",
      "Adesivo",
      "Placa",
      "Cachorro",
      "Bagageiro",
      "Vigueira",
      "Prato",
      "Charuto",
      "Violão",
      "Moto",
      "Macaco",
      "Banana",
      "Lamparina",
      "Peixe",
      "Circo",
      "Molho",
      "Churrasqueira",
      "Roda",
      "Tijolo",
      "Trampolim",
      "Acrobata",
      "Chave",
      "Muralha",
      "Hidrante",
      "Cama",
      "Turbina",
      "Espada",
      "Frigideira",
      "Sala",
      "Abrigo",
      "Montanha",
      "Fornalha",
      "Martelo",
      "Vasilha",
      "Retrato",
      "Gargantilha",
      "Pontelho",
      "Zoologico",
      "Palheiro",
  ];


const palavraTela = document.querySelector("#container__input--jogo");
const vidasTela = document.querySelector(".container__vidas");
const tentativasTela = document.querySelector(".container__listatentativas");
var completou = 0;


// número aleatorio 
const aleatorio = (min = 0, max = palavras.length - 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// declara classe e função construtora do jogo
class Jogo {
  constructor(palavra, vidas) {
    this.palavra = palavra.toLowerCase().split("");
    this.vidas = vidas;
    this.tentativas = palavra.replace(/[A-Z]/gi, "-").split("");
    this.falhou = [];
  }

  // cria a palavra na tela
  criarPalavra() {
    palavraTela.value = this.tentativas.join("").toUpperCase();
    vidasTela.textContent = `Vidas : ${this.vidas}`;


 tentativasTela.innerHTML = "";
    this.falhou.forEach((element, index) => {
      const letraErrada = document.createElement("li");
      letraErrada.textContent = element.toUpperCase();
      letraErrada.setAttribute("id", index);
      const lastInserted = document.getElementById(`${index - 1}`);
      tentativasTela.insertBefore(letraErrada, lastInserted);
    });
 
}
  // ver se a letra já foi digitada e tentativas
  checarLetra(character) {
    if (this.vidas && completou !== this.palavra.length) {
      const achouLetraPalavra = this.palavra.find(element => element === character);
      const achouLetraTentativa = this.tentativas.find(element => element === character);
      const jaTentou = this.falhou.includes(character);

      // roda o vetor da palavra / adiciona letra ao tentativas
      this.palavra.forEach((element, index) => {
        if (character === element && !achouLetraTentativa) {
          this.tentativas[index] = character;
          completou++;
        }
      });

      if (!achouLetraPalavra && !jaTentou) {
        this.vidas--;

        if (!jaTentou) {
          this.falhou.push(character);
        }
      }
      this.criarPalavra();
      return true;
    }
    return false;
  }
}

function resetJogo() {
  if (completou === jogo.palavra.length || jogo.vidas === 0) {
    if (completou === jogo.palavra.length) {
      alert("você ganhou, pressione qualquer tecla para jogar novamente.");
    } else if (jogo.vidas === 0) {
      alert("você perdeu, pressione qualquer tecla para jogar novamente.");
    }

    palavraTela.value = jogo.palavra.join("").toUpperCase();

    setTimeout(() => {
      
      jogo = new Jogo(palavras[aleatorio()], 5);
      completou = 0;
      jogo.criarPalavra();
    }, 1500);
  }
}

// Inicia o jogo com palavra aleatória
var jogo = new Jogo(palavras[aleatorio()], 5);
jogo.criarPalavra();


document.addEventListener("keyup", e => {
  e.keyCode >= 65 && e.keyCode <= 90 ? jogo.checarLetra(e.key) : null;
  resetJogo();
});