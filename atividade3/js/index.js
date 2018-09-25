var contadorVitoria = document.getElementById("vitoria");
 contadorDerrota = document.getElementById("derrota");
 contadorEmpate = document.getElementById("empate");
 pedra = document.getElementById("pedra");
 papel = document.getElementById("papel");
 tesoura = document.getElementById("tesoura");
 reiniciar = document.getElementById("reset");
 escolha = null;
 vitoria = 0;
 derrota = 0;
 empate = 0;
 flagEm = 0;
 flagV = 0;
 flagD = 0;
 respostaimg = document.getElementById("resposta");
 resultadogif = document.getElementById("resultado"); 
 random2 = 0;

reiniciar.onclick = function(){

 contadorVitoria.value = 0;
 contadorDerrota.value = 0;
 contadorEmpate.value = 0;
 vitoria = 0;
 derrota = 0;
 empate = 0;
 resultadogif.src = "fundo.png";
 respostaimg.src = "inicio.png";
}


pedra.onclick = function(){
escolha = 1;

comparar('1');
}

papel.onclick = function(){
escolha = 2;

comparar('2');

}
tesoura.onclick = function(){
escolha = 3;

comparar('3');
   


}
function setValueDerrota(value) {
    document.getElementById('derrota').value = value;
  }
  function setValueVitoria(value) {
    document.getElementById('vitoria').value = value;
  }
  function setValueEmpate(value) {
    document.getElementById('empate').value = value;
  }
  
  
var comparar = function(op){
    
    var computador = [1,2,3]
    var random2 = random;
    var random = computador[Math.floor(Math.random()*computador.length)];
    if (random == escolha){
        empate++;
        var novaimg = '0'+random+'.png';
        respostaimg.src = novaimg;
        resultadogif.src = "loading.gif";
        flagEm = 1;
    }  
    else if (random == 1 && escolha != 2){
        derrota++;
        var novaimg = '0'+random+'.png';
        respostaimg.src = novaimg;
        resultadogif.src = "loading.gif";
        flagD = 1;
    }
    else if (random == 2 && escolha != 3){
        derrota++;
        var novaimg = '0'+random+'.png';
        respostaimg.src = novaimg;
        resultadogif.src = "loading.gif";
        flagD = 1;
    }
    else if (random == 3 && escolha != 1){
        derrota++;
        var novaimg = '0'+random+'.png';
        respostaimg.src = novaimg;
        resultadogif.src = "loading.gif";
        flagD = 1;

    }  
     else {
        vitoria++;
        var novaimg = '0'+random+'.png';
        respostaimg.src = novaimg;
        resultadogif.src = "loading.gif";
        flagV = 1;
    }  
    setTimeout(function(op){ 
        if(flagEm == 1)
        {
            resultadogif.src = "fundo.png";
            alert("Empate!");
            setValueEmpate(empate);
            flagEm = 0;
        }
        else if(flagV == 1){
            resultadogif.src = "fundo.png";
            alert("Você ganhou!");
            setValueVitoria(vitoria);
            flagV = 0;
        }
        else if(flagD == 1){
            resultadogif.src = "fundo.png";
            alert("Você perdeu!");
            setValueDerrota(derrota);
            flagD = 0;
        }
    
    }, 3000);
    
}





 
