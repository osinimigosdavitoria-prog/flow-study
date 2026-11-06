let tempo = 25 * 60;
let intervalo = null;
let modo = "foco";

const timer = document.getElementById("timer");
const status = document.getElementById("status");
const titulo = document.getElementById("modo");

function atualizarTimer() {
    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;

    timer.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");
}

function iniciar() {
    if (intervalo !== null) return;

    status.textContent = "Hora de manter o foco! 📚";

    intervalo = setInterval(function() {
        tempo--;
        atualizarTimer();

        if (tempo <= 0) {
            clearInterval(intervalo);
            intervalo = null;

            if (modo === "foco") {
                modo = "pausa";
                titulo.textContent = "Hora de descansar!";
                status.textContent = "Você merece uma pausa! 💗";
                alert("Foco concluído! Hora de descansar.");
            } else {
                modo = "foco";
                titulo.textContent = "Hora de focar!";
                status.textContent = "Pausa concluída! Vamos estudar?";
                alert("Descanso concluído! Vamos voltar?");
            }

            carregarTempo();
        }
    }, 1000);
}

function pausar() {
    clearInterval(intervalo);
    intervalo = null;
    status.textContent = "Cronômetro pausado.";
}

function carregarTempo() {
    let minutos;

    if (modo === "foco") {
        minutos = Number(document.getElementById("tempoFoco").value);
    } else {
        minutos = Number(document.getElementById("tempoPausa").value);
    }

    if (!Number.isInteger(minutos) || minutos < 1 || minutos > 180) {
        alert("Escolha um tempo entre 1 e 180 minutos.");
        return;
    }

    tempo = minutos * 60;
    atualizarTimer();
}

function reiniciar() {
    pausar();
    carregarTempo();
}

document.getElementById("iniciar").onclick = iniciar;
document.getElementById("pausar").onclick = pausar;
document.getElementById("reiniciar").onclick = reiniciar;

document.getElementById("tempoFoco").onchange = function() {
    if (modo === "foco" && intervalo === null) carregarTempo();
};

document.getElementById("tempoPausa").onchange = function() {
    if (modo === "pausa" && intervalo === null) carregarTempo();
};

atualizarTimer();