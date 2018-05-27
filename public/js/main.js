
$("#botao-placar").click(mostraPlacar);

var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();
var btnRestart = $("#botao-reiniciar");
btnRestart.attr("disabled", false);
campo.attr("disabled", false);
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaMarcadores();
    inicializaCronometro();
    btnRestart.click(reiniciaJogo);
    atuatilizaPlacar();
});


function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    var numPalavras  = frase.split(/\W+/).length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
     $("#numero-palavras").text(numPalavras);
}

function atualizaTempo(tempo) {
	$("#tempo-digitacao").text(tempo);
	$("#tempo-frase").text(tempo);
	tempoInicial = tempo;
}

function inicializaMarcadores() {
	campo.on("input", function() {
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);
		if(digitado == comparavel) {
		    campo.addClass("borda-verde");
		    campo.removeClass("borda-vermelha");
		} else {
		    campo.addClass("borda-vermelha");
		    campo.removeClass("borda-verde");
		}
	});
}

function inicializaContadores() {
    
   
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        var qtdCaracteres = 0;


        conteudo.split(" ").forEach(function(a,b){
        	qtdCaracteres += conteudo.split(" ")[b].length;
        });

        $("#contador-caracteres").text(qtdCaracteres);


    });

}

function inicializaCronometro() {
    campo.one("focus", function() {
    	var tempoRestante = $("#tempo-digitacao").text();
		btnRestart.attr("disabled", true);
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                
                clearInterval(cronometroID);
                
                finalizaJogo();
                
            }
        }, 1000);
    });
}

function finalizaJogo() {
	campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    btnRestart.attr("disabled", false);
   	inserePlacar();
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    campo.toggleClass("campo-desativado");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
}