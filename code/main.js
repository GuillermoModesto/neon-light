const building_appear = 2;
const time_eddie_multiplier = 0.25;
const amount_eddie_increase = 1;
let eddies = 0;

window.onload = function()
{
    let eddies_tag = document.getElementById("eddies");
    document.getElementById("transmute").addEventListener("click", function()
    {
        eddies = update_eddies(eddies_tag, this);
        console.log(eddies)
        
    });
}

// Generate 1 eddie
function update_eddies(eddies_tag, transmute_button)
{
    transmute_button.disabled = true;
    let time = eddies * time_eddie_multiplier * 1000;
    setTimeout(function() {
        eddies += amount_eddie_increase;
        eddies_tag.innerText = eddies;
        transmute_button.disabled = false;
    }, time);
    return eddies;
}

function create_buildings_container()
{
    let select = document.createElement("select");
    select.setAttribute("name", "edificios");
    select.setAttribute("id", "edificios");
    let option = document.createElement("option");
    option.setAttribute("value", "container");
    option.appendChild(document.createTextNode("Container"));
    select.append(option);
    document.forms[0].appendChild(select);
}