const resources = { eddie: 0 }

/* Usado en getElapsedTime */
let start = performance.now();

/* Usado en update */
let stamp = performance.now();
let total_time = 0;

window.onload = function() {
    let eddie_img = document.getElementById("eddie-img");
    eddie_img.addEventListener("click", function() {
        generate_eddie(eddie_img);
    });
    update();
}

function generate_eddie(button) {
    button.disabled = true;
    let eddie_timer = 250 * resources.eddie;
    setTimeout(function() {
        resources.eddie++;
        updateUI();
        button.disabled = false;
    }, eddie_timer);
}

/* Update all editable HTML tags. All IDs should match variable name to work on loop */
function updateUI() {
    let resourcesObj = Object.entries(resources);
    for (const [name, value] of resourcesObj) {
        if (document.getElementById(name) !== null)
            document.getElementById(name).innerText = value;
    }
}

/* Gets time elapsed since last call to this function */
function getElapsedTime() {
    const end = performance.now();
    const elapsedTime = end - start;
    start = end;
    return elapsedTime;
}

/* Recursive function to maintain a total time elapsed variable constantly updated */
function update() {
    let now = performance.now();
    const dt = now - stamp;
    total_time += dt;
    stamp = now;
    requestAnimationFrame(update);
}