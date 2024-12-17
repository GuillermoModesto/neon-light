
// Estado del juego
let eddie = 0;
let subroutines = 0;
let daemons = 0;
let data = 0;
let netrunners = 0;
let implants = 0;
let engrams = 0;

let transmuteTimeout = 0;

let buildingCost = {
    netrunnerDen: 2,    // Coste en eddies
    dataFarm: { eddie: 6, subroutines: 6 },
    blackMarket: { eddie: 8, subroutines: 9, daemons: 5 },
    chromeClinic: { subroutines: 8, daemons: 9 }
};

// Iniciar el juego
window.onload = function() {
    document.getElementById('transmuteBtn').addEventListener('click', () => {
        startTransmute();
    });
    
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
    
    // Actualizar la UI inicial
    updateUI();    
}

// Funciones de actualización de UI
function updateUI() {
    document.getElementById('eddie').textContent = eddie;
    document.getElementById('subroutines').textContent = subroutines;
    document.getElementById('daemons').textContent = daemons;
    document.getElementById('data').textContent = data;
    document.getElementById('netrunners').textContent = netrunners;
    document.getElementById('implants').textContent = implants;
    document.getElementById('engrams').textContent = engrams;
}

// Función Transmute
function startTransmute() {
    let btn = document.getElementById('transmuteBtn');
    btn.disabled = true;
    transmuteTimeout = 0.25 * eddie * 1000;  // Tiempo de espera según el número de eddies
    setTimeout(() => {
        eddie++;  // Crear un eddie
        updateUI();
        checkBuildingsButton();
        btn.disabled = false;
    }, transmuteTimeout);
}

// Comprobar si el botón de edificios debe habilitarse
function checkBuildingsButton() {
    let buildingsBtn = document.getElementById('buildingsBtn');
    if (eddie >= 2 && buildingsBtn.disabled) {  // El botón de edificios se habilita si el jugador tiene al menos 2 eddies
        buildingsBtn.disabled = false;
    }
}

// Función para gestionar la construcción de edificios
function buildBuilding(building) {
    if (building === 'netrunnerDen' && eddie >= buildingCost.netrunnerDen) {
        eddie -= buildingCost.netrunnerDen;
        document.getElementById('buildingsPanel').style.display = 'block';
        document.getElementById('cabinBtn').disabled = false;
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