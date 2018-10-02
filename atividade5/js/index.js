var tela = document.getElementById('tela');
contexto = tela.getContext('2d');
tamanho = 10; 
largura = 350;
altura = 350;
pontuacao = 0;
cobra = null;
tamanho = 10;
comida = null;


var jogocobra = (function () { 
   var corpo = function(x, y) {
        
        contexto.fillStyle = 'green';
        contexto.fillRect(x*tamanho, y*tamanho, tamanho, tamanho);
        contexto.strokeStyle = 'darkgreen';
        contexto.strokeRect(x*tamanho, y*tamanho, tamanho, tamanho);
  }

  var maça = function(x, y) {
        contexto.fillStyle = 'yellow';
        contexto.fillRect(x*tamanho, y*tamanho, tamanho, tamanho);
        contexto.fillStyle = 'red';
        contexto.fillRect(x*tamanho+1, y*tamanho+1, tamanho-2, tamanho-2);
  }

  var textopontuacao = function() {
    var pontuacao_text = "pontuacao: " + pontuacao;
    contexto.fillStyle = 'blue';
    contexto.fillText(pontuacao_text, 145, altura-5);
  }

  var desenharCobra = function() {
      var length = 4;
      cobra = [];
      for (var i = length-1; i>=0; i--) {
          cobra.push({x:i, y:0});
      }  
  }
    
  var pintar = function(){
      contexto.fillStyle = 'black';
      contexto.fillRect(0, 0, largura, altura);
      contexto.strokeStyle = 'black';
      contexto.strokeRect(0, 0, largura, altura);
        
      botao.setAttribute('disabled', true);
      
      var cobraX = cobra[0].x;
      var cobraY = cobra[0].y;

      if (direction == 'right') { 
        cobraX++; }
      else if (direction == 'left') { 
        cobraX--; }
      else if (direction == 'up') { 
        cobraY--; 
      } else if(direction == 'down') { 
        cobraY++; }

      if (cobraX == -1 || cobraX == largura/tamanho || cobraY == -1 || cobraY == altura/tamanho || checarColisao(cobraX, cobraY, cobra)) {
          
          botao.removeAttribute('disabled', true);
          
          alert("Fim de jogo! Sua pontuação foi:  "+pontuacao);
          pontuacao = 0;
          contexto.clearRect(0,0,largura,altura);
          gameloop = clearInterval(gameloop);
          return;          
        }
        
        if(cobraX == comida.x && cobraY == comida.y) {
          var rabo = {x: cobraX, y: cobraY}; 
          pontuacao ++;
          
          criarComida(); 
        } else {
          var rabo = cobra.pop();
          rabo.x = cobraX; 
          rabo.y = cobraY;
        }
        
        cobra.unshift(rabo);

        for(var i = 0; i < cobra.length; i++) {
          corpo(cobra[i].x, cobra[i].y);
        } 
        
        maça(comida.x, comida.y); 
        textopontuacao();
  }

  var criarComida = function() {
      comida = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>cobra.length; i++) {
        var cobraX = cobra[i].x;
        var cobraY = cobra[i].y;
      
        if (comida.x===cobraX && comida.y === cobraY || comida.y === cobraY && comida.x===cobraX) {
          comida.x = Math.floor((Math.random() * 30) + 1);
          comida.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  var checarColisao = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var comecar = function(){
    
      direction = 'down';
      desenharCobra();
      criarComida();
      gameloop = setInterval(pintar, 80);
  }


    return {
      comecar : comecar
    };

    
}());

(function (window, document, jogocobra, undefined) {

var botao = document.getElementById('botao');
botao.addEventListener("click", function(){ jogocobra.comecar();});

  document.onkeydown = function(event) {

        keyCode = window.event.keyCode; 
        keyCode = event.keyCode;

        switch(keyCode) {
        
        case 37: 
          if (direction != 'right') {
            direction = 'left';
          }
          console.log('left'); 
          break;

        case 39:
          if (direction != 'left') {
          direction = 'right';
          console.log('right');
          }
          break;

        case 38:
          if (direction != 'down') {
          direction = 'up';
          console.log('up');
          }
          break;

        case 40:
          if (direction != 'up') {
          direction = 'down';
          console.log('down');
          }
          break;
          }
      }




})(window, document, jogocobra);



