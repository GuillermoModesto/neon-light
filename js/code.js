const resources = { eddie: 0 }
const begin = performance.now();
let start = performance.now();

window.onload = function() {
    document.getElementById("eddie-img").addEventListener("click", function() {
        resources.eddie++;
        updateUI();
    });
}

function updateUI() {
    let resourcesObj = Object.entries(resources);
    for (const [name, value] of resourcesObj) {
        if (document.getElementById(name) !== null)
            document.getElementById(name).innerText = value;
    }
}

function getGameTime() {
    const end = performance.now();
    return end - begin;
}

function getElapsedTime() {
    const end = performance.now();
    const elapsedTime = end - start;
    start = end;
    return elapsedTime;
}