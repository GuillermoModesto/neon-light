window.onload = function() {
    let eddies_tag = document.getElementById("eddies");
    let transmute_button = document.getElementById("transmute");
    transmute_button.addEventListener("click", function() {
        generate_eddie(eddies_tag, transmute_button);
    });
}

function generate_eddie(eddies_tag, transmute_button) {
    transmute_button.disabled = true;
    let _eddies = Number(eddies_tag.innerText);
    let time = _eddies * 0.25 * 1000;
    setTimeout(function() {
        _eddies += 1;
        eddies_tag.innerText = _eddies;
        transmute_button.disabled = false;
    }, time);
}