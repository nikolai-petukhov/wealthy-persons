const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millonaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

// double eveyones money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });

    updateDOM();
}

// sort persons by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// show millonaires
function showMillonaires() {
    data = data.filter(data => data.money > 1000000);

    updateDOM();
}

//calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => acc += user.money, 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${fromatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);

}

// Add new object to data arr
function addData(object) {
    data.push(object);

    updateDOM();
}

function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${fromatMoney(item.money)}`;
        main.appendChild(element);  
    });
}

// fomat number as money
function fromatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillonaires);
calculateWealthBtn.addEventListener('click', calculateWealth);



