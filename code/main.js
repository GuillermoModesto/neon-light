// Recursos del juego
const resource = { eddie: 0, subroutines: 0, daemons: 0, data: 0, netrunners: 0, implants: 0, engrams: 0 };

const savedResource = localStorage.getItem('resource');
if (savedResource) {
    // If data exists, parse and load it into the resource object
    Object.assign(resource, JSON.parse(savedResource));
}

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

/*
window.addEventListener("beforeunload", function() {
    // Clear localStorage when the page is about to unload
    localStorage.clear();
});
*/

// Funciones de actualización de UI
function updateUI() {
    document.getElementById('eddie').textContent = resource.eddie;
    if (document.getElementById('subroutines') !== null)
        document.getElementById('subroutines').textContent = resource.subroutines;
    if (document.getElementById('daemons') !== null)
        document.getElementById('daemons').textContent = resource.daemons;
    if (document.getElementById('data') !== null)
        document.getElementById('data').textContent = resource.data;
    if (document.getElementById('netrunners') !== null)
        document.getElementById('netrunners').textContent = resource.netrunners;
    if (document.getElementById('implants') !== null)
        document.getElementById('implants').textContent = resource.implants;
    if (document.getElementById('engrams') !== null)
        document.getElementById('engrams').textContent = resource.engrams;
}

// Función Transmute
function startTransmute() {
    let btn = document.getElementById('transmuteBtn');
    btn.disabled = true;
    let transmuteTimeout = 250 * resource.eddie;  // Tiempo de espera según el número de eddies
    setTimeout(() => {
        resource.eddie++;  // Crear un eddie
        updateUI();
        checkBuildingsButton();
        btn.disabled = false;
        localStorage.setItem('resource', JSON.stringify(resource));
        console.log(resource)
    }, transmuteTimeout);
}
/*
function createCanvas(width, height, id, padre) {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    padre.appendChild(canvas);
    return canvas;
}
*/
// Comprobar si el botón de edificios debe habilitarse
function checkBuildingsButton() {
    if (resource.eddie >= 2 && !enableBuilding) {  // El botón de edificios se habilita si el jugador tiene al menos 2 eddies
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
        resource.eddie -= buildingCost.netrunnerDen.eddie;
        document.getElementById('netrunner_den_Btn').disabled = false;
        updateUI();
    }
    
    // Condición para habilitar más botones de edificios
    if (building === 'dataFarm' && eddie >= buildingCost.dataFarm.eddie && subroutines >= buildingCost.dataFarm.subroutines) {
        resource.eddie -= buildingCost.dataFarm.eddie;
        subroutines -= buildingCost.dataFarm.subroutines;
        netrunners += 5;  // Generar netrunners
        updateUI();
    }
}