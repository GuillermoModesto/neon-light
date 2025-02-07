const resource = { 

    eddie: 10,
    subroutines: 100,
    daemons: 100,
    netrunners: 100,
    implants: 100,
    engrams: 100,
    data: 100,
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
    data_farm: { 

        cost: { eddies: 8, subroutines: 9, daemons: 5, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
        built: false
    },
    black_market: { 

        cost: { eddies: 0, subroutines: 8, daemons: 9, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
        built: false
    },
    chrome_clinic: { 

        cost: { eddies: 8, subroutines: 0, daemons: 10, netrunners: 0, implants: 0, engrams: 0, data: 5, rare_materials: 0 },
        built: false
    },
    soul_killer: { 

        cost: { eddies: 5, subroutines: 8, daemons: 0, netrunners: 0, implants: 3, engrams: 0, data: 0, rare_materials: 0 },
        built: false
    },
    construct: { 

        cost: { eddies: 10, subroutines: 9, daemons: 7, netrunners: 0, implants: 3, engrams: 10, data: 0, rare_materials: 0 },
        built: false
    }
};
const black_market = {
    rare_materials: { eddies: 3, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
    subroutines: { eddies: 1, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
    daemons: { eddies: 1, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 }
};
const CC = {

    eddie: get_eddieCC(),
    work: get_workCC(),
    data: 20000
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
    CC.eddie = get_eddieCC();
    setTimeout(function () {

        resource.eddie++;

        // check and enable building button if possible
        if (document.getElementById("building_btn") == null && resource.eddie >= 2) {

            // create building panel
            let building_panel = document.createElement("div");
            building_panel.setAttribute("class", "cyber_panel--hidden");
            building_panel.setAttribute("id", "buildings_panel");
            document.getElementsByClassName("resources")[0].appendChild(building_panel);
    
            add_option_and_function_to_panel("warehouse");
            create_price_tag(document.getElementById("warehouse"));
            create_exit_panel_btn(document.getElementById("buildings_panel"));
    
            // create building button
            let building_btn = document.createElement("div");
            building_btn.appendChild(document.createTextNode("Buildings"));
            building_btn.setAttribute("id", "building_btn");
            building_btn.setAttribute("class", "cyber_btn");
            document.getElementById("buttons").appendChild(building_btn);
    
            building_btn.addEventListener("click", function () {
    
                let panel = document.getElementById("buildings_panel");
                document.getElementById("buildings_panel").setAttribute("class", "cyber_panel");
                building_btn.style.zIndex = -1;
                if (document.getElementById("work_btn") != null)
                    document.getElementById("work_btn").style.zIndex = -1;
                if (document.getElementById("building_btn") != null)
                    document.getElementById("building_btn").style.zIndex = -1;
                if (document.getElementById("black_market_btn") != null)
                    document.getElementById("black_market_btn").style.zIndex = -1;
                document.getElementById("overlay").style.zIndex = 0;
                for (const child of panel.children) {
    
                    total_enable(child);
                }
            });
        }

        updateUI();
        button.disabled = false;
        button.style.filter = "";
    }, CC.eddie);
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
        if (document.getElementById("work_btn") != null)
            document.getElementById("work_btn").style.zIndex = 3;
        if (document.getElementById("building_btn") != null)
            document.getElementById("building_btn").style.zIndex = 3;
        if (document.getElementById("black_market_btn") != null)
            document.getElementById("black_market_btn").style.zIndex = 3;
        document.getElementById("overlay").style.zIndex = -1;
        for (const child of panel.children) {

            if (child.getAttribute("id") != "exit_building")
                total_disable(child);
        }
    });
}

function create_price_tag(element) {

    let price_tag = document.createElement("div");
    price_tag.setAttribute("class", "price_tag_button");

    let cost_text = "";
    let element_cost = building[element.getAttribute("id")]["cost"];
    for (const resource in element_cost) {
        if (element_cost[resource] != 0) {
            cost_text = `${cost_text}\n${resource}:${element_cost[resource]}`;
        }
    }
    price_tag.appendChild(document.createTextNode(cost_text));
    element.appendChild(price_tag);
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

            switch (option) {

                case "warehouse":

                    // check and enable resources panel if possible
                    if (document.getElementById("resource_list").hidden && building.warehouse.built) {

                        document.getElementById("resource_list").hidden = false;
                    }
                    
                    // check and enable work button if possible
                    if (document.getElementById("work_btn") == null) {

                        let work_container = document.createElement("div");
                        work_container.setAttribute("class", "work_container");
                        work_container.setAttribute("id", "work_container");
                        let work_btn = document.createElement("div");
                        work_btn.setAttribute("class", "cyber_btn");
                        work_btn.setAttribute("id", "work_btn");
                        work_btn.style.zIndex = -1;
                        work_btn.appendChild(document.createTextNode("work"));
                        document.getElementById("buttons").appendChild(work_container);
                        work_container.appendChild(work_btn);
                        work_btn.addEventListener("click", work_event);
                    }

                    add_option_and_function_to_panel("netrunner_den");
                    create_price_tag(document.getElementById("netrunner_den"));
                    add_option_and_function_to_panel("data_farm");
                    create_price_tag(document.getElementById("data_farm"));
                    add_option_and_function_to_panel("black_market");
                    create_price_tag(document.getElementById("black_market"));
                    break;
                case "netrunner_den":
                    resource.netrunners += 5;
                    building.netrunner_den.cost.eddies += 5;
                    building.netrunner_den.cost.subroutines += 5;
                    building.netrunner_den.amount++;

                    //update price tag
                    let price_tag = document.getElementById("netrunner_den").childNodes[1];

                    let cost_text = "";
                    let element_cost = building["netrunner_den"]["cost"];
                    for (const resource in element_cost) {
                        if (element_cost[resource] != 0) {
                            cost_text = `${cost_text}\n${resource}:${element_cost[resource]}`;
                        }
                    }
                    price_tag.innerText = cost_text;
                    break;
                case "data_farm":
                    setInterval(function() {

                        resource.data++;
                        updateUI();
                    }, CC.data);
                    add_option_and_function_to_panel("chrome_clinic");
                    create_price_tag(document.getElementById("chrome_clinic"));
                    break;
                case "chrome_clinic":
                    add_option_and_function_to_panel("soul_killer");
                    create_price_tag(document.getElementById("soul_killer"));

                    // Sublimate button
                    if (document.getElementById("sublimate_btn") == null) {

                        let sublimate_btn = document.createElement("div");
                        sublimate_btn.setAttribute("class", "cyber_btn");
                        sublimate_btn.setAttribute("id", "sublimate_btn");
                        sublimate_btn.style.zIndex = 1;
                        sublimate_btn.appendChild(document.createTextNode("Sublimate"));
                        document.getElementById("buttons").appendChild(sublimate_btn);

                        sublimate_btn.addEventListener('click', function() {

                            if (resource.data >= 2) {
                                resource.data -= 2;
                                resource.engrams++;
                                updateUI();
                            }
                        });
                    }
                    break;
                case "black_market":
                    // black market panel
                    let black_market_panel = document.createElement("div");
                    black_market_panel.setAttribute("class", "cyber_panel--hidden");
                    black_market_panel.setAttribute("id", "black_market_panel");
                    document.getElementsByClassName("resources")[0].appendChild(black_market_panel);
                    create_exit_panel_btn(black_market_panel);

                    // black market elements and costs
                    for (const material in black_market) {
                        // element
                        let tag = document.createElement("div");
                        tag.appendChild(document.createTextNode(material));
                        tag.setAttribute("class", "panel_option");
                        tag.setAttribute("id", material);
                        black_market_panel.appendChild(tag);
                        // price tag
                        let price_tag = document.createElement("div");
                        price_tag.setAttribute("class", "price_tag_button");
                        price_tag.appendChild(document.createTextNode(`eddies:${black_market[material]["eddies"]}`));
                        tag.appendChild(price_tag);
                        // functionality
                        tag.addEventListener('click', function() {

                            if (resource.eddie >= black_market[material]["eddies"]) {
                                resource.eddie -= black_market[material]["eddies"];
                                resource[material]++;
                            }
                            updateUI();
                        });
                    }

                    // check and enable black market button if possible
                    if (document.getElementById("black_market_btn") == null) {

                        let black_market_btn = document.createElement("div");
                        black_market_btn.setAttribute("class", "cyber_btn");
                        black_market_btn.setAttribute("id", "black_market_btn");
                        black_market_btn.style.zIndex = 1;
                        black_market_btn.appendChild(document.createTextNode("black_market"));
                        document.getElementById("buttons").appendChild(black_market_btn);
                
                        black_market_btn.addEventListener("click", function() {
                            
                            let panel = document.getElementById("black_market_panel");
                            document.getElementById("black_market_panel").setAttribute("class", "cyber_panel");
                            black_market_btn.style.zIndex = 1;
                            if (document.getElementById("work_btn") != null)
                                document.getElementById("work_btn").style.zIndex = 1;
                            if (document.getElementById("building_btn") != null)
                                document.getElementById("building_btn").style.zIndex = 1;
                            if (document.getElementById("black_market_btn") != null)
                                document.getElementById("black_market_btn").style.zIndex = 1;
                            document.getElementById("overlay").style.zIndex = 0;
                            for (const child of panel.children) {
                
                                total_enable(child);
                            }
                        });
                    }
                    break;
                case "soul_killer":
                    // transcend button
                    if (document.getElementById("transcend_btn") == null) {

                        let transcend_btn = document.createElement("div");
                        transcend_btn.setAttribute("class", "cyber_btn");
                        transcend_btn.setAttribute("id", "transcend_btn");
                        transcend_btn.style.zIndex = 1;
                        transcend_btn.appendChild(document.createTextNode("_transcend_"));
                        document.getElementById("buttons").appendChild(transcend_btn);

                        transcend_btn.addEventListener('click', function() {

                            alert("cagaste wei");
                        });
                    }
                    break;
            }
            updateUI();
        }
    });
}

function work_event() {

    updateUI();
    visual_disable(work_btn);
    let loading = document.createElement("div");
    loading.setAttribute("class", "cyber_text");
    loading.appendChild(document.createTextNode("working"));
    document.getElementById("work_container").appendChild(loading);
    CC.work = get_workCC();
    if (CC.work < 0)
        CC.work = 0;
    work_btn.removeEventListener("click", work_event);
    let i = 0;
    let timer = setInterval(function() {

        switch (i) {

            case 0:
                loading.innerText = "working";
                break;
            case 1:
                loading.innerText = "working.";
                break;
            case 2:
                loading.innerText = "working..";
                break;
            case 3:
                loading.innerText = "working...";
                break;
        }
        if (i < 3)
            i++;
        else
            i = 0;
    }, 333);
    setTimeout(function() {

        work_btn.style.filter = "";
        let subroutine_generated = random(0, (resource.netrunners + 2));
        let daemons_generated = random(0, (resource.netrunners + 2));
        resource.subroutines += subroutine_generated;
        resource.daemons += daemons_generated;
        work_btn.addEventListener("click", work_event);
        loading.setAttribute("class", "cyber_text--no_anim");
        loading.innerText = `generated:\n${subroutine_generated} subroutines\n${daemons_generated} daemons`;
        updateUI();
        clearInterval(timer);

        setTimeout(function() {

            loading.setAttribute("class", "cyber_text--fade_out");

            setTimeout(function() {

                document.getElementById("work_container").removeChild(loading);
            }, 1450);
        }, 3000);
    }, CC.work);
    
}

function get_eddieCC() {

    return 250 * resource.eddie;
}

function get_workCC() {

    return (45 - resource.netrunners) * 1000; //- ------------------------------------------------------------------------------------------------------------------------------
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