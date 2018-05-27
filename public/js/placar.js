function inserePlacar(){
	var corpoTabela = $(".placar").find("tbody");
	var usuario = "Seu-nome";
		var numPalavras = $("#contador-palavras").text();
		var linha = novaLinha(usuario, numPalavras);
		corpoTabela.append(linha);
		$(".botao-remover").click(removaLinha);

		$(".placar").slideDown(500);
		scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $(":root, body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);




}
function novaLinha(usuario, palavras){
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(palavras);
	var colunaRemover = $("<td>");

	var link = $("<a>").attr("href", "#").addClass("botao-remover");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
	


	link.append(icone);
	colunaRemover.append(link);
	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);
	return linha;
}

function removaLinha(event) {
	event.preventDefault();
	var linha = $(this).parent().parent();
	linha.fadeOut(600);
	setTimeout(function(){
		linha.remove();
	}, 1000);

}


function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}
