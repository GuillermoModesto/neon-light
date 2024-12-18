const resources = { eddie: 0 }

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
        console.log(document.getElementById(name).innerText)
    }
}