let addBtn = $('[data-role="addButton"]');
let inputName = $('[data-role="inputName"]');
let container = $('[data-role="parent"]');
let elem = $('<div data-role="mainDiv">');

function cityName() {
    return inputName.val()
}
let arrayOfObjectsCitiesNames = [];

addBtn.click(function () {
    let pCity = $('<p data-role="pName">');
    $(pCity).text(cityName());
    let renameBtn = $('<button>').text('Rename');
    let saveBtn = $('<button>').text('Save to localstorage');
    let deleteBtn = $('<button>').text('Delete');
    elem.append(pCity, renameBtn, saveBtn, deleteBtn);
    resetFileds();

    renameBtn.click(function () {
        let updateBtn = $('<button>').text("Update");
        let renameInput = $('<input data-role="renameInput">');
        $(this).parent().append(renameInput, updateBtn);

        updateBtn.click(function () {
            pCity.text(renameInput.val());
            $(this).siblings('[data-role="renameInput"]').remove();
            updateInLocalstorage();
            updateBtn.remove();
        });

    });

    deleteBtn.click(function () {
        saveBtn.remove();
        renameBtn.remove();
        deleteBtn.remove();
        pCity.remove();
    });

    saveBtn.click(function () {
        arrayOfObjectsCitiesNames.push({
            "city": pCity.text()
        });
        saveToLocalStorage();
    });


});

function saveToLocalStorage() {
    localStorage.setItem('city', JSON.stringify(arrayOfObjectsCitiesNames));
    JSON.parse(localStorage.getItem('city'));
}

function resetFileds() {
    $('[data-role="inputName"]').val("");
}
container.append(elem);

function showListOfCities() {
    let list = $('<div data-role="list">');
    let showBtn = $('<button>').text('Show my storage');
    list.append(showBtn);
    showBtn.click(function () {
        let pOfCities = $('<p data-role="pCities">');
        pOfCities.text(localStorage.getItem('city'));
        list.append(pOfCities)
    });
    container.append(list);
}

showListOfCities();