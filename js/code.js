const resource = { 
    eddie: 0,
    subroutines: 0,
    daemons: 0,
    netrunners: 0,
    implants: 0,
    engrams: 0,
    data: 0,
    rare_materials: 0
};
const building = {
    warehouse: { 
        cost: { eddies: 2, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 }, 
        built: false 
    },
    netrunner_den: { 
        cost: { eddies: 6, subroutines: 6, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
        built: false,
        amount: 0 
    },
};

/* for getElapsedTime */
let start = performance.now();

/* for update */
let stamp = performance.now();
let total_time = 0;

window.onload = function () {
    let eddie_img = document.getElementById("eddie-img");
    eddie_img.addEventListener("click", function () {
        generate_eddie(eddie_img);
    });
    update();
}

function generate_eddie(button) {
    button.disabled = true;
    visual_disable(button);
    let eddie_timer = 250 * resource.eddie;
    setTimeout(function () {
        resource.eddie++;
        check_building_btn();
        updateUI();
        button.disabled = false;
        button.style.filter = "";
    }, eddie_timer);
}

function check_building_btn() {
    if (document.getElementById("building_btn") == null && resource.eddie >= 2) {
        create_building_panel();
        add_option_and_function_to_panel("warehouse");
        create_exit_panel_btn(document.getElementById("buildings_panel"));
        create_building_btn();
    }
}

function check_enable_resources_panel() {
    if (document.getElementById("resource_list").hidden && building.warehouse.built) {
        document.getElementById("resource_list").hidden = false;
    }
}

function create_building_panel() {
    let building_panel = document.createElement("div");
    building_panel.setAttribute("class", "cyber_panel--hidden");
    building_panel.setAttribute("id", "buildings_panel");
    document.getElementsByClassName("resources")[0].appendChild(building_panel);
}

function create_exit_panel_btn(panel) {
    let exit_building = document.createElement("button");
    exit_building.setAttribute("class", "exit_button");
    exit_building.setAttribute("id", "exit_building");
    exit_building.appendChild(document.createTextNode("X"));
    panel.appendChild(exit_building);

    exit_building.addEventListener("click", function () {
        panel.setAttribute("class", "cyber_panel--hidden cyber_panel--hidden--animation");
        document.getElementById("building_btn").style.zIndex = 3;
        document.getElementById("work_btn").style.zIndex = 3;
        document.getElementById("overlay").style.zIndex = -1;
        for (const child of panel.children) {
            total_disable(child);
        }
    });
}

function add_option_and_function_to_panel(option) {
    let panel_option = document.createElement("div");
    panel_option.setAttribute("id", option);
    panel_option.setAttribute("class", "panel_option");
    panel_option.appendChild(document.createTextNode(option));
    document.getElementById("buildings_panel").appendChild(panel_option);

    panel_option.addEventListener("click", function() {
        let selectedBuilding = building[option];
        if (enough_resources(selectedBuilding) && !selectedBuilding.built) {
            substract_resources(selectedBuilding);
            if (option !== "netrunner_den") {
                selectedBuilding.built = true;
                visual_disable(panel_option);
            }
            updateUI();

            switch (option) {
                case "warehouse":
                    check_enable_resources_panel();
                    check_enable_work_btn();
                    add_option_and_function_to_panel("netrunner_den");
                    break;
                case "netrunner_den":
                    resource.netrunners += 5;
                    building.netrunner_den.cost.eddies += 5;
                    building.netrunner_den.cost.subroutines += 5;
                    building.netrunner_den.amount++;
                    updateUI();
            }
        }
    });
}

function check_enable_work_btn() {
    if (document.getElementById("work_btn") == null) {
        let work_btn = document.createElement("div");
        work_btn.setAttribute("class", "cyber_btn");
        work_btn.setAttribute("id", "work_btn");
        work_btn.appendChild(document.createTextNode("work"));
        document.getElementsByClassName("game-area")[0].appendChild(work_btn);

        work_btn.addEventListener("click", work_event);
    }
}

function work_event() {
    resource.subroutines += random(0, (resource.netrunners + 2));
    resource.daemons += random(0, (resource.netrunners + 2));
    updateUI();
    visual_disable(work_btn);
    let work_timer = (45 - resource.netrunners) * 1000;
    if (work_timer < 0)
        work_timer = 0;
    work_btn.removeEventListener("click", work_event);
    setTimeout(function() {
        work_btn.style.filter = "";
        work_btn.addEventListener("click", work_event);
    }, work_timer);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function enough_resources(selectedBuilding) {
    return (resource.eddie >= selectedBuilding.cost.eddies
        && resource.subroutines >= selectedBuilding.cost.subroutines
        && resource.daemons >= selectedBuilding.cost.daemons
        && resource.netrunners >= selectedBuilding.cost.netrunners
        && resource.implants >= selectedBuilding.cost.implants
        && resource.engrams >= selectedBuilding.cost.engrams
        && resource.data >= selectedBuilding.cost.data
        && resource.rare_materials >= selectedBuilding.cost.rare_materials);
}

function substract_resources(selectedBuilding) {
    resource.eddie -= selectedBuilding.cost.eddies;
    resource.subroutines -= selectedBuilding.cost.subroutines;
    resource.daemons -= selectedBuilding.cost.daemons;
    resource.netrunners -= selectedBuilding.cost.netrunners;
    resource.implants -= selectedBuilding.cost.implants;
    resource.engrams -= selectedBuilding.cost.engrams;
    resource.data -= selectedBuilding.cost.data;
    resource.rare_materials -= selectedBuilding.cost.rare_materials;
}

function create_building_btn() {
    let building_btn = document.createElement("div");
    building_btn.appendChild(document.createTextNode("Buildings"));
    building_btn.setAttribute("id", "building_btn");
    building_btn.setAttribute("class", "cyber_btn");
    document.getElementsByClassName("game-area")[0].appendChild(building_btn);

    building_btn.addEventListener("click", function () {
        let panel = document.getElementById("buildings_panel");
        document.getElementById("buildings_panel").setAttribute("class", "cyber_panel");
        building_btn.style.zIndex = 1;
        if (document.getElementById("work_btn") != null)
            document.getElementById("work_btn").style.zIndex = 1;
        document.getElementById("overlay").style.zIndex = 0;
        for (const child of panel.children) {
            total_enable(child);
        }
    });
}

function total_enable(element) {
    element.hidden = false;
    element.disabled = false;
    element.style.display = "";
}

function total_disable(element) {
    element.hidden = true;
    element.disabled = true;
    element.style.display = "none";
}

function visual_disable(button) {
    button.style.filter = "invert(41%) sepia(36%) saturate(19%) hue-rotate(314deg) brightness(95%) contrast(98%)";
}

/* Update all resource HTML tags. All IDs should match variable name to work on loop */
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