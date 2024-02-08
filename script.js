const items = [{
        title: "Жакет джинсовый клубника",
        description: "Жакет джинсовый для девочки из 100% хлопка.",
        tags: ["girl"],
        price: 76.75,
        img: "./img/1.jpeg",
        rating: 4.4,
    },
    {
        title: "Платье Фланель коричневая клетка",
        description: "Платье из фланели А-силуэта",
        tags: ["girl"],
        price: 102.74,
        img: "./img/2.jpeg",
        rating: 3.1,
    },
    {
        title: "Платье Крапинка фруктовый лед",
        description: "Легкое и воздушное платье, идеально для жарких летних дней",
        tags: ["girl"],
        price: 35.19,
        img: "./img/3.jpeg",
        rating: 5.0,
    },
    {
        title: "Рубашка Stanford клетка красная",
        description: "Рубашка в клетку - самый главный тренд этого года!",
        tags: ["girl", "boy"],
        price: 91.01,
        img: "./img/4.jpeg",
        rating: 4.7,
    },
    {
        title: "Пижама Морфей клетка абрикос",
        description: "Пижама Морфей - это находка для любителей стильных, удобных и практичных домашних образов.",
        tags: ["girl", "boy"],
        price: 116.25,
        img: "./img/5.jpeg",
        rating: 4.9,
    },
    {
        title: "Пижама Морфей клетка зеленый чай",
        description: "Пижама Морфей - это находка для любителей стильных, удобных и практичных домашних образов.",
        tags: ["girl", "boy"],
        price: 116.25,
        img: "./img/6.jpeg",
        rating: 4.9,
    },
    {
        title: "Куртка Кокон деми жемчуг",
        description: "Куртка Кокон со световозвращающим рисунком и температурным режимом от +10С до -5С",
        tags: ["girl"],
        price: 190.55,
        img: "./img/7.jpeg",
        rating: 4.9,
    },
    {
        title: "Жилет Cargo серо-бежевый",
        description: "Жилет в серо-бежевом цвете, с воротником стойкой и накладными карманами.",
        tags: ["girl", "boy"],
        price: 95.99,
        img: "./img/8.jpeg",
        rating: 4.4,
    },
    {
        title: "Рубашка с воротником-стойкой белая",
        description: "Стильная альтернатива классической белой рубашке.",
        tags: ["boy"],
        price: 56.52,
        img: "./img/9.jpeg",
        rating: 4.8,
    },
    {
        title: "Лонгслив Тельняшка беж",
        description: "Стильный лонгслив из футера.",
        tags: ["girl", "boy"],
        price: 42.30,
        img: "./img/10.jpeg",
        rating: 3.2,
    },
    {
        title: "Водолазка Комфорт пудра меланж",
        description: "Водолазка с высоким воротником с подворотом.",
        tags: ["girl", "boy"],
        price: 46.57,
        img: "./img/11.jpeg",
        rating: 3.7,
    },
    {
        title: "Брюки Cargo солома",
        description: "Стильные брюки Cargo подойдут как мальчику так и девочке.",
        tags: ["girl", "boy"],
        price: 94.21,
        img: "./img/12.jpeg",
        rating: 4.1,
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} бел.руб`;

    const tagsHolder = item.querySelector(".tags");
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }
    return item;
}

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});