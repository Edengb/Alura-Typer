
$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);



function fraseAleatoria() {
	$("#spinner").toggle();
	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	.fail(function() {
		$("#erro").toggle();
		setTimeout(function() {
			$("#erro").toggle();
		}, 3000);
	}).always(function() {
		$("#spinner").toggle();
	});
}

function trocaFraseAleatoria(data) {
	var frase = $(".frase");
	var numeroAleatorio = Math.round(Math.random() * data.length)
	frase.text(data[numeroAleatorio].texto);
	atualizaTamanhoFrase();
	atualizaTempo(data[numeroAleatorio].tempo);
}

function buscaFrase() {
	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();

	var dados = { "id": fraseId};

	$.get("http://localhost:3000/frases", dados, trocaFrase)
	.fail(function() {
		$("#erro").toggle();
		setTimeout(function() {
			$("#erro").toggle();
		}, 3000);
	}).always(function() {
		$("#spinner").toggle();
	});
	console.log("buscaFrase");
	console.log($.get("http://localhost:3000/frases", dados, trocaFrase));
}

function trocaFrase(data) {
	var frase = $(".frase");
	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempo(data.tempo);

}


function sincronizaPlacar() {
	var placar = [];
	var linha = $("tbody > tr");
	linha.each(function() {
		var usuario = $(this).find("td:nth-child(1)").text();
		var palavras = $(this).find("td:nth-child(2)").text();
		var score = {
			"usuario": usuario,
			"palavras": palavras
		}
		placar.push(score);
	});
	console.log(placar);
	var dados = {
		placar: placar
	}
	
	$.post("http://localhost:3000/placar", dados, function() {
		console.log("Finalizado!");
	});
}


function atuatilizaPlacar() {
	$.get("http://localhost:3000/placar", function(dados){
		$(dados).each(function() {
			var linha = novaLinha(this.usuario, this.palavras);
			linha.find(".botao-remover").click(removaLinha);
			$("tbody").append(linha);
		});
	});
}

