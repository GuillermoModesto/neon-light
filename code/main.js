// Estado del juego
let eddie = 0;
let subroutines = 0;
let daemons = 0;
let data = 0;
let netrunners = 0;
let implants = 0;
let engrams = 0;

let enableBuilding = false;

const buildingCost = {
    container: 2,
    netrunnerDen: { eddie: 6, subroutines: 6 },
    dataFarm: { eddie: 8, subroutines: 9, daemons: 5 },
    blackMarket: { subroutines: 8, daemons: 9 },
    chromeClinic: { eddie: 8, subroutines: 10, data: 5 },
    soulKiller: { eddie: 5, subroutines: 8, implant: 3 },
    construct: { eddie: 8, daemons: 7, subroutines: 10, implant: 5, engram: 10 }
};

// Iniciar el juego
window.onload = function() {

    document.getElementById('transmuteBtn').addEventListener('click', startTransmute);

    document.getElementById('resourcesBtn').addEventListener('click', () => {
        window.location.href = "./resources.html";
        // window.location.replace("./resources.html");
    });
    
    /*
    document.getElementById('buildingsBtn').addEventListener('click', () => {
        document.getElementById('buildingsPanel').style.display = 'block';
    });
    
    document.getElementById('warehouseBtn').addEventListener('click', () => {
        buildBuilding('netrunnerDen');
        updateUI();
    });
    
    document.getElementById('cabinBtn').addEventListener('click', () => {
        buildBuilding('dataFarm');
        updateUI();
    });
    
    document.getElementById('farmBtn').addEventListener('click', () => {
        // Lógica para construir el Black Market
    });
    
    document.getElementById('marketBtn').addEventListener('click', () => {
        // Lógica para construir el Chrome Clinic
    });
    */
    
    // Actualizar la UI inicial
    updateUI();    
}

// Funciones de actualización de UI
function updateUI() {
    document.getElementById('eddie').textContent = eddie;
    if (document.getElementById('subroutines') !== null)
        document.getElementById('subroutines').textContent = subroutines;
    if (document.getElementById('daemons') !== null)
        document.getElementById('daemons').textContent = daemons;
    if (document.getElementById('data') !== null)
        document.getElementById('data').textContent = data;
    if (document.getElementById('netrunners') !== null)
        document.getElementById('netrunners').textContent = netrunners;
    if (document.getElementById('implants') !== null)
        document.getElementById('implants').textContent = implants;
    if (document.getElementById('engrams') !== null)
        document.getElementById('engrams').textContent = engrams;
}

// Función Transmute
function startTransmute() {
    let btn = document.getElementById('transmuteBtn');
    btn.disabled = true;
    let transmuteTimeout = 0.25 * eddie * 1000;  // Tiempo de espera según el número de eddies
    setTimeout(() => {
        eddie++;  // Crear un eddie
        updateUI();
        checkBuildingsButton();
        btn.disabled = false;
    }, transmuteTimeout);
}

// Comprobar si el botón de edificios debe habilitarse
function checkBuildingsButton() {
    if (eddie >= 2 && !enableBuilding) {  // El botón de edificios se habilita si el jugador tiene al menos 2 eddies
        let buildingsBtn = document.createElement("button");
        buildingsBtn.setAttribute("id", "buildingsBtn");
        buildingsBtn.setAttribute("class", "button");
        buildingsBtn.appendChild(document.createTextNode("Buildings"));
        document.getElementById("mainPanel").appendChild(buildingsBtn);
        buildingsBtn.addEventListener("click", () => {
            window.location.href = "./buildings.html";
            // window.location.replace("./buildings.html");
        });
        enableBuilding = true;
    }
}

// Función para gestionar la construcción de edificios
function buildBuilding(building) {
    if (building === 'netrunnerDen' && eddie >= buildingCost.netrunnerDen.eddie) {
        eddie -= buildingCost.netrunnerDen.eddie;
        document.getElementById('netrunner_den_Btn').disabled = false;
        updateUI();
    }
    
    // Condición para habilitar más botones de edificios
    if (building === 'dataFarm' && eddie >= buildingCost.dataFarm.eddie && subroutines >= buildingCost.dataFarm.subroutines) {
        eddie -= buildingCost.dataFarm.eddie;
        subroutines -= buildingCost.dataFarm.subroutines;
        netrunners += 5;  // Generar netrunners
        updateUI();
    }
}