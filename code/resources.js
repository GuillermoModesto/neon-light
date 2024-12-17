let resource = {};

window.onload = function() {
    const savedResource = localStorage.getItem('resource');
    if (savedResource) {
        // If data exists, parse and load it into the resource object
        Object.assign(resource, JSON.parse(savedResource));
    }
    updateValues();
    document.getElementById("back_btn").addEventListener("click", function() {
        window.location.href = "./index.html";
    });
}

function updateValues() {
    document.getElementById("eddie").innerText = resource.eddie;
    document.getElementById("subroutines").innerText = resource.subroutines;
    document.getElementById("daemons").innerText = resource.daemons;
    document.getElementById("data").innerText = resource.data;
    document.getElementById("netrunners").innerText = resource.netrunners;
    document.getElementById("implants").innerText = resource.implants;
    document.getElementById("engrams").innerText = resource.engrams;
}