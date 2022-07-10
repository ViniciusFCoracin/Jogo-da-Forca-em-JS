const erros = document.querySelector("#erros");
const canvas = document.querySelector("#enforcado");
const ctx = canvas.getContext("2d");
const espaços = document.querySelector("#espaços");
const input = document.querySelector("#letra");
const aviso = document.querySelector("#aviso");
let palavra;
let tamanho;
let letra;
let traços;
let jogando = true;
let erradas = [];
let tentativas = [];

const options = ["BRASIL", "GUIANA"]

function desenhoInicial() {
	palavra = tamanho = letra = traços = erradas = tentativas = undefined;
	ctx.beginPath();
	ctx.strokeStyle = "#773628";
	ctx.fillStyle = "#28120d"
	ctx.moveTo(0, 350);
	ctx.lineTo(15, 300);
	ctx.lineTo(15, 50);
	ctx.lineTo(35, 50);
	ctx.lineTo(35, 70);
	ctx.lineTo(250, 70);
	ctx.lineTo(250, 90);
	ctx.lineTo(35, 90);
	ctx.lineTo(35, 300);
	ctx.lineTo(50, 350);
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.strokeStyle = "black"
	ctx.moveTo(0, 350);
	ctx.lineTo(300, 350);
	ctx.stroke()

	ctx.beginPath();
	ctx.strokeStyle = "#6f5c41";
	ctx.moveTo(200, 70);
	ctx.lineTo(200, 120);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(203, 70);
	ctx.lineTo(203, 90);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(206, 70);
	ctx.lineTo(206, 90);
	ctx.stroke();

}

function cabeça() {
	ctx.beginPath();
	ctx.strokeStyle = "black"
	ctx.arc(200, 145, 25, 0, 360);
	ctx.stroke();
}

function corpo() {
	ctx.beginPath();
	ctx.moveTo(200, 170);
	ctx.lineTo(200, 250)
	ctx.stroke();
}

function leftArm() {
	ctx.beginPath();
	ctx.moveTo(200, 185);
	ctx.lineTo(180, 255)
	ctx.stroke();
}

function rightArm() {
	ctx.beginPath();
	ctx.moveTo(200, 185);
	ctx.lineTo(220, 255)
	ctx.stroke();
}

function leftLeg() {
	ctx.beginPath();
	ctx.moveTo(200, 250);
	ctx.lineTo(180, 325)
	ctx.stroke();
}

function rightLeg() {
	ctx.beginPath();
	ctx.moveTo(200, 250);
	ctx.lineTo(220, 325)
	ctx.stroke();
}

function olhos() {
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo(182, 153);
	ctx.lineTo(195, 140)
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(195, 153);
	ctx.lineTo(182, 140)
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(205, 153);
	ctx.lineTo(218, 140)
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(218, 153);
	ctx.lineTo(205, 140)
	ctx.stroke();
}
function carregarSingleplayer(){
	palavra = options[Math.floor(Math.random()*options.length)];
	tamanho = palavra.length;
	for (let i = 1; i <= tamanho; i++) {
		espaços.textContent += "_";
	}
	traços = espaços.textContent;
}

function carregarMultiplayer() {
	desenhoInicial();
	while (true) {
		palavra = prompt("Digite a palavra a ser descoberta: ");
		if (palavra === null || palavra === "" || palavra.trim() === "") {
			continue;
		}
		else {
			palavra = palavra.trim().toUpperCase();
			tamanho = palavra.length;
			break;
		}
	}
	for (let i = 1; i <= tamanho; i++) {
		espaços.textContent += "_";
	}
	traços = espaços.textContent;
}

function capturar() {
	letra = input.value;
	if (letra.length === 1 && letra.match(/[a-zç]/i)) {
		aviso.textContent = "";
		letra = letra.toUpperCase();
		testar();
	}
	else{
		aviso.textContent = "Digite uma letra válida!";
	}
	input.value = "";
}

function testar() {
	let pos = palavra.indexOf(letra);
	if (tentativas.indexOf(letra) !== -1) {
		aviso.textContent = "Você já digitou esta letra!";
	}
	else if (pos === -1) {
		tentativas.push(letra);
		erradas.push(letra);
		erros.textContent = `Erradas: ${erradas.join(", ")}`
		errou();
	}
	else {
		for (let i = 0; i < tamanho; i++) {
			if (palavra[i] === letra) {
				traços = traços.split("");
				traços[i] = letra;
				traços = traços.join("");
			}
		}
		espaços.textContent = traços;
		tentativas.push(letra);

		if (traços == palavra) {
			erros.textContent = `Parabéns, você ganhou! A palavra era ${palavra}. Atualize a página para jogar novamente.`
			jogando = false;
		}
	}
}

function errou() {
	switch (erradas.length) {
		case 1:
			cabeça();
			break;
		case 2:
			corpo();
			break;
		case 3:
			rightArm();
			break;
		case 4:
			leftArm();
			break;
		case 5:
			rightLeg();
			break;
		case 6:
			leftLeg();
			break;
		case 7:
			jogando = false;
			olhos();
			erros.textContent = `Você perdeu! A palavra era ${palavra}. Atualize a página para jogar outra vez.`
			break;
	}
}

window.addEventListener("load", desenhoInicial);
window.addEventListener("load", carregarSingleplayer);
document.getElementById("enviar").addEventListener("click", capturar);
document.getElementById("multiplayer").addEventListener("click", carregarMultiplayer);