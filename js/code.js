let aux_resource;
let aux_building;
let aux_log;
let saved_html = '';
let loaded_html = false;
let stamp = performance.now();
let total_time = 0;
//localStorage.removeItem('save_file');
if (localStorage.getItem('save_file') != null) {

    const save_info = JSON.parse(localStorage.getItem('save_file'));
    aux_resource = save_info['resource'];
    aux_building = save_info['building'];
    total_time = save_info['total_time'];
    aux_log = save_info['log'];
    saved_html = save_info['html'];
}
else {

    aux_resource = { 

        eddie: 0,
        subroutines: 100,
        daemons: 100,
        netrunners: 100,
        implants: 100,
        engrams: 100,
        data: 100,
        rare_materials: 100
    };
    aux_building = {
    
        enabled: false,

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
    aux_log = [];
}

const resource = JSON.parse(JSON.stringify(aux_resource));
const building = JSON.parse(JSON.stringify(aux_building));
const log = JSON.parse(JSON.stringify(aux_log));

const black_market = {

    rare_materials: { eddies: 3, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
    subroutines: { eddies: 1, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 },
    daemons: { eddies: 1, subroutines: 0, daemons: 0, netrunners: 0, implants: 0, engrams: 0, data: 0, rare_materials: 0 }
};
const CD = {

    eddie: get_eddieCD(),
    work: get_workCD(),
    data: 20000,
    verbose: 5000
};

/* for getElapsedTime */
let start = performance.now();

/* ------------------------------------------------------------ ENTRY POINT ------------------------------------------------------------ */
window.onload = function () {

    /*
    document.getElementById('test').addEventListener('click', function() {
        console.log(get_formated_time())
    });
    */

    verbose(` --- game started --- `);

    updateUI();
    update(); // start running total_time 'clock'

    total_disable(document.getElementById('log-box'));
    total_disable(document.getElementById('overlay'));
    document.getElementById('overlay').style.zIndex = -1;

    let eddie_img = document.getElementById("eddie-img");
    eddie_img.addEventListener("click", function () {

        generate_eddie(eddie_img);
    });

    // Horrible fix to a stupid problem
    if (building.data_farm.built) {
        setInterval(generate_datta, CD.data);
    }

    document.getElementById("log_btn").addEventListener("click", show_log); // open log screen over everything
    window.addEventListener("beforeunload", save_game); // save important info before closing window
    
    check_enable_buildings();

    // Restore saved HTML
    if (saved_html && !loaded_html) {

        document.getElementsByClassName("container")[0].innerHTML = saved_html;
        loaded_html = true;
        reattachEventListeners();
    }
}

/* ------------------------------------------------------------ GENERATE EDDIE ------------------------------------------------------------ */
function generate_eddie(button) {

    visual_disable(button);
    CD.eddie = get_eddieCD();
    setTimeout(function () {

        resource.eddie++;
        verbose("+1 eddie");

        // check and enable building button if possible
        check_enable_buildings();

        updateUI();
        visual_enable(button);
    }, CD.eddie);
}

/* ------------------------------------------------------------ ADD OPTION TO PANEL ------------------------------------------------------------ */
function add_option_and_function_to_panel(option) {

    // create and append new option
    let panel_option = document.createElement("div");
    panel_option.setAttribute("id", option);
    panel_option.setAttribute("class", "panel_option");
    panel_option.appendChild(document.createTextNode(option));
    document.getElementById("buildings_panel").appendChild(panel_option);

    panel_option.addEventListener("click", panel_option_func.bind(null, option, panel_option));
}

/* ------------------------------------------------------------ ADD EVENT HANDLER TO BUILDING PANEL OPTION ------------------------------------------------------------ */
function panel_option_func(option, panel_option) {

    let selectedBuilding = building[option];
    if (enough_resources(selectedBuilding) && !selectedBuilding.built) {
        substract_resources(selectedBuilding);

        if (option !== "netrunner_den") {

            selectedBuilding.built = true;
            visual_disable(panel_option);
        }

        /*
        This dreadful switch case is the result of a bad design decision that I made at the beginning of the project, then was too lazy to fix. Sorry.
        Its purpose is to enable the correct building panel option (such as warehouse, black_market...) and its functionality when the player has enough resources to build them.
        */
        switch (option) {

            case "warehouse":
                if (document.getElementById("resource_list").hidden && building.warehouse.built) {

                    document.getElementById("resource_list").hidden = false;
                }
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
                    verbose("work enabled");
                }
                verbose("warehouse building enabled");

                add_option_and_function_to_panel("netrunner_den");
                create_price_tag(document.getElementById("netrunner_den"));
                verbose("netrunner_den building enabled");

                add_option_and_function_to_panel("data_farm");
                create_price_tag(document.getElementById("data_farm"));
                verbose("data_farm building enabled");
                
                add_option_and_function_to_panel("black_market");
                create_price_tag(document.getElementById("black_market"));
                verbose("black_market building enabled");
                break;
            case "netrunner_den":
                resource.netrunners += 5;
                building.netrunner_den.cost.eddies += 5;
                building.netrunner_den.cost.subroutines += 5;
                building.netrunner_den.amount++;
                verbose("+5 netrunners");
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
                setInterval(generate_datta, CD.data);

                add_option_and_function_to_panel("chrome_clinic");
                create_price_tag(document.getElementById("chrome_clinic"));
                verbose("chrome_clinic building enabled");
                break;
            case "chrome_clinic":
                add_option_and_function_to_panel("soul_killer");
                create_price_tag(document.getElementById("soul_killer"));
                verbose("soul_killer building enabled");
                if (document.getElementById("sublimate_btn") == null) {

                    let sublimate_btn = document.createElement("div");
                    sublimate_btn.setAttribute("class", "cyber_btn");
                    sublimate_btn.setAttribute("id", "sublimate_btn");
                    sublimate_btn.style.zIndex = 1;
                    sublimate_btn.appendChild(document.createTextNode("Sublimate"));
                    document.getElementById("buttons").appendChild(sublimate_btn);
                    verbose("sublimate button enabled");
                    sublimate_btn.addEventListener('click', function() {
                        if (resource.data >= 2) {

                            resource.data -= 2;
                            resource.engrams++;
                            updateUI();
                            verbose("1 engram sublimated");
                        }
                        else {
                            verbose("failed to sublimate engram");
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
                        tag.setAttribute("id", `${material}_bm`);
                        black_market_panel.appendChild(tag);
                        verbose(`${material} material enabled`);
                        // price tag
                        let price_tag = document.createElement("div");
                        price_tag.setAttribute("class", "price_tag_button");
                        price_tag.appendChild(document.createTextNode(`eddies:${black_market[material]["eddies"]}`));
                        tag.appendChild(price_tag);
                        // functionality
                        tag.addEventListener('click', black_market_material_func.bind(null, material));
                    }

                    // check and enable black market button if possible
                    if (document.getElementById("black_market_btn") == null) {

                        let black_market_btn = document.createElement("div");
                        black_market_btn.setAttribute("class", "cyber_btn");
                        black_market_btn.setAttribute("id", "black_market_btn");
                        black_market_btn.style.zIndex = 1;
                        black_market_btn.appendChild(document.createTextNode("black_market"));
                        document.getElementById("buttons").appendChild(black_market_btn);
                
                        black_market_btn.addEventListener("click", black_market_btn_func);
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
                        verbose("TRANSCEND button enabled");

                        transcend_btn.addEventListener('click', function() {

                            alert(`Tiempo de juego -> ${get_formated_time()}`);
                        });
                    }
                    break;
            }
            updateUI();
        }
        else {
            verbose(`failed to build ${option}`);
        }
}

/* ------------------------------------------------------------ EXIT BUILDING BUTTON EVENT ------------------------------------------------------------ */
function exit_building_func(panel) {
    panel.setAttribute("class", "cyber_panel--hidden cyber_panel--hidden--animation");
    if (document.getElementById("building_btn") != null)
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
}

/* ------------------------------------------------------------ GENERATE DATA ------------------------------------------------------------ */
function generate_datta() {

    resource.data++;
    verbose("+1 data");
    updateUI();
}

/* ------------------------------------------------------------ BLACK MARKET BUTTON EVENT ------------------------------------------------------------ */
function black_market_btn_func() {

    let black_market_btn = document.getElementById("black_market_btn");
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
}

/* ------------------------------------------------------------ BLACK MARKET MATERIAL FUNCTION ------------------------------------------------------------ */
function black_market_material_func(material) {

    console.log(material)
    if (resource.eddie >= black_market[material]["eddies"]) {
        resource.eddie -= black_market[material]["eddies"];
        resource[material]++;
        verbose(`${material} bought`);
    }
    else {
        verbose(`failed to buy ${material}`);
    }
    updateUI();
}

/* ------------------------------------------------------------ WORK EVENT ------------------------------------------------------------ */
function work_event() {

    updateUI();
    visual_disable(work_btn);
    let loading = document.createElement("div");
    loading.setAttribute("class", "cyber_text");
    loading.appendChild(document.createTextNode("working"));
    document.getElementById("work_container").appendChild(loading);
    verbose("started working");
    CD.work = get_workCD();
    if (CD.work < 0)
        CD.work = 0;
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
        verbose("finished working");
        updateUI();
        clearInterval(timer);

        setTimeout(function() {

            loading.setAttribute("class", "cyber_text--fade_out");

            setTimeout(function() {

                document.getElementById("work_container").removeChild(loading);
            }, 800);
        }, 1500);
    }, CD.work);
    
}

/* ------------------------------------------------------------ SAVE GAME ------------------------------------------------------------ */
function save_game() {

    // remove verbose messages
    let verbose_box = document.getElementById("verbose_box");
    while (verbose_box.children.length > 0) {

        verbose_box.removeChild(verbose_box.children[0]);
    }
    
    if (document.getElementById("work_container")) {

        let work_container = document.getElementById("work_container");
        while (work_container.children.length > 1) {

            work_container.removeChild(verbose_box.children[1]);
        }
    }

    // generate and save inportant info
    const save_file = JSON.stringify({
        resource: resource,
        building: building,
        total_time: total_time,
        log: log,
        html: document.getElementsByClassName("container")[0].innerHTML
    }, null, 2);
    localStorage.setItem('save_file', save_file);
}

/* ------------------------------------------------------------ CHECK ENABLE BUILDINGS ------------------------------------------------------------ */
function check_enable_buildings() {

    if (document.getElementById("building_btn") == null && (resource.eddie >= 2 || building.enabled)) {

        building.enabled = true;
        // create building panel
        let building_panel = document.createElement("div");
        building_panel.setAttribute("class", "cyber_panel--hidden");
        building_panel.setAttribute("id", "buildings_panel");
        document.getElementsByClassName("resources")[0].appendChild(building_panel);
        verbose("buildings enabled");

        add_option_and_function_to_panel("warehouse");
        create_price_tag(document.getElementById("warehouse"));
        create_exit_panel_btn(document.getElementById("buildings_panel"));

        // create building button
        let building_btn = document.createElement("div");
        building_btn.appendChild(document.createTextNode("Buildings"));
        building_btn.setAttribute("id", "building_btn");
        building_btn.setAttribute("class", "cyber_btn");
        document.getElementById("buttons").appendChild(building_btn);

        // building button event
        building_btn.addEventListener("click", building_btn_event);
    }
}

/* ------------------------------------------------------------ BUILDING BUTTON EVENT ------------------------------------------------------------ */
function building_btn_event() {

    let building_panel = document.getElementById("buildings_panel");
    let building_btn = document.getElementById("building_btn");

    if (building_panel) {
        building_panel.setAttribute("class", "cyber_panel");
        building_btn.style.zIndex = -1;
        if (document.getElementById("work_btn") != null)
            document.getElementById("work_btn").style.zIndex = -1;
        if (document.getElementById("building_btn") != null)
            document.getElementById("building_btn").style.zIndex = -1;
        if (document.getElementById("black_market_btn") != null)
            document.getElementById("black_market_btn").style.zIndex = -1;
        document.getElementById("overlay").style.zIndex = 0;
        for (const child of building_panel.children) {
            total_enable(child);
        }
    } else {
        console.error("Building panel not found!");
    }
}

/* ------------------------------------------------------------ CREATE EXIT PANEL BUTTON ------------------------------------------------------------ */
function create_exit_panel_btn(panel) {

    let exit_building = document.createElement("button");
    exit_building.setAttribute("class", "exit_button");
    exit_building.appendChild(document.createTextNode("X"));
    panel.appendChild(exit_building);

    exit_building.addEventListener("click", exit_building_func.bind(null, panel));
}

/* ------------------------------------------------------------ CREATE PRICE TAG ------------------------------------------------------------ */
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

function get_eddieCD() {

    return 250 * resource.eddie;
}

function get_workCD() {

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
    element.style.zIndex = 3;
}

function total_disable(element) {

    element.hidden = true;
    element.disabled = true;
    element.style.display = "none";
    element.style.zIndex = -1;
}

function visual_disable(button) {

    button.disabled = true;
    button.style.filter = "invert(41%) sepia(36%) saturate(19%) hue-rotate(314deg) brightness(95%) contrast(98%)";
}

function visual_enable(button) {

    button.disabled = false;
    button.style.filter = "";
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

function get_formated_time() {

    let seg = Math.round(total_time / 1000);
    let min = 0;
    let h = 0;

    while (seg >= 60) {

        seg -= 60;
        min++;
        if (min >= 60) {

            min = 0;
            h++;
        }
    }

    // I know, dont tell me
    if (seg < 10)
        seg = `0${seg}`;

    if (min < 10)
        min = `0${min}`;

    if (h < 10)
        h = `0${h}`;
    
    return (`@${h}h:${min}m:${seg}s`);
}

function verbose(text) {

    let verbose = document.createElement("div");
    verbose.setAttribute("class", "verbose");
    verbose.appendChild(document.createTextNode(text));
    //log.push(`${log.length+1}: ${text} @(${Math.round(total_time) / 1000}s)`);
    log.push({

        order: log.length+1,
        text: text,
        time: `${get_formated_time()}`
    });
    document.getElementById("verbose_box").appendChild(verbose);
    setTimeout(function() {

        verbose.setAttribute("class", "verbose--fadeout");
        setTimeout(function() {

            document.getElementById("verbose_box").removeChild(verbose);
        }, 150);
    }, CD.verbose);
}

function show_log() {
        
    const overlay = document.getElementById('overlay');
    const logBox = document.getElementById('log-box');
    const logTable = document.getElementById('log-box-table');
    if (overlay.style.zIndex == -1) {

        // clear existing log entries
        while (logTable.children.length > 0) {

            logTable.removeChild(logTable.children[0]);
        }

        // add log entries
        log.forEach((entry) => {

            let logEntry = document.createElement('tr');
            for (const key in entry) {
                let td = document.createElement('td');
                td.innerText = entry[key];
                logEntry.appendChild(td);
            }
            logTable.appendChild(logEntry);
        });

        // show the overlay and log box
        total_enable(overlay);
        overlay.style.zIndex = 5;
        total_enable(logBox);
        logBox.style.zIndex = 10;
    }
    else {

        // hide the overlay and log box
        total_disable(overlay);
        total_disable(logBox);
    }
}



// function to reattach event listeners
function reattachEventListeners() {

    // generate eddie event listener
    if (document.getElementById("eddie-img")) {
        let eddie_img = document.getElementById("eddie-img");
        eddie_img.addEventListener("click", function () {
            generate_eddie(eddie_img);
        });
    }

    // show log event listener
    let log_btn = document.getElementById("log_btn");
    if (log_btn)
        log_btn.addEventListener("click", show_log);

    // add building option to panel event listener
    for (const key in building) {
        if (building[key]['saved']) {
            add_option_and_function_to_panel(key);
        }
    }

    // add event listener to building panel options
    if(document.getElementById('buildings_panel')) {
        for (const option of document.getElementById('buildings_panel').children) {
            if (option.className != "exit_button") {
                option.addEventListener("click", panel_option_func.bind(null, option.id, option));
            }
        }
    }
        
    // work event listener
    if (document.getElementById("work_btn"))
        document.getElementById("work_btn").addEventListener("click", work_event);

    // building button event listener
    if (document.getElementById("building_btn"))
        document.getElementById("building_btn").addEventListener("click", building_btn_event);

    // exit building button event listener
    if (document.getElementsByClassName("exit_button")) {
        let exit_buttons = document.getElementsByClassName("exit_button");
        for (const button of exit_buttons) {
            button.addEventListener("click", exit_building_func.bind(null, button.parentElement));
        }
    }

    // black market button event listener
    if (document.getElementById("black_market_btn"))
        document.getElementById("black_market_btn").addEventListener("click", black_market_btn_func);

    // black market materials
    if (document.getElementById('black_market_panel')) {
        for (const material in black_market) {

            document.getElementById(`${material}_bm`).addEventListener('click', black_market_material_func.bind(null, material));
        }
    }
}