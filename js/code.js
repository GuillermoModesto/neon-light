const resource = { eddie: 0 };
const building = {
    warehouse: { cost: 2, built: false }
};

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
    button.style.filter = "invert(41%) sepia(36%) saturate(19%) hue-rotate(314deg) brightness(95%) contrast(98%)";
    let eddie_timer = 250 * resource.eddie;
    setTimeout(function() {
        resource.eddie++;
        check_building_btn();
        updateUI();
        button.disabled = false;
        button.style.filter = "";
    }, eddie_timer);
}

function check_building_btn() {
    if (document.getElementById("building_btn") == null && resource.eddie >= 2) {
        let building_btn = document.createElement("div");
        building_btn.appendChild(document.createTextNode("Buildings"));
        building_btn.setAttribute("id", "building_btn");
        document.getElementsByClassName("game-area")[0].appendChild(building_btn);
    }
}

/* Update all editable HTML tags. All IDs should match variable name to work on loop */
function updateUI() {
    let resourcesObj = Object.entries(resource);
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