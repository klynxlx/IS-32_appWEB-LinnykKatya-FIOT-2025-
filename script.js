document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalYearGenre = document.getElementById("modal-year-genre");
    const modalDescription = document.getElementById("modal-description");
    const closeBtn = document.querySelector(".close");

    const descriptions = {
        "Гаррі Поттер і філософський камінь": "Пригоди юного чарівника Гаррі Поттера в школі магії.",
        "Оппенгеймер": "Історія створення атомної бомби та моральні дилеми науковців.",
        "Джон Вік 4": "Найнебезпечніший кілер повертається, щоб помститися.",
        "Початок": "Сон як зброя: проникнення у свідомість для викрадення таємниць.",
        "Інтерстеллар": "Мандрівка крізь космос та час заради порятунку людства.",
        "Тілоохоронець кілера": "Комедійна історія про несподівану дружбу між охоронцем і злочинцем.",
        "Гра престолів": "Боротьба за владу та виживання у вигаданому королівстві Вестерос.",
        "Чорнобиль": "Реконструкція трагедії Чорнобильської катастрофи 1986 року.",
        "Ходячі мерці": "Сюжет про виживання у світі, населений зомбі.",
        "Темні матерії": "Дівчина мандрує паралельними світами, відкриваючи загадки всесвіту.",
        "Єллоустоун": "Конфлікти та інтриги в родині власників величезного ранчо.",
        "Портрет вбивці": "Детективна історія про серійного вбивцю та його мисливця."
    };

    // Делегування подій
    document.body.addEventListener("click", (event) => {
        const gridItem = event.target.closest(".grid-item");
        if (!gridItem) return; // якщо клік не на .grid-item — виходимо

        const title = gridItem.querySelector("p:first-of-type")?.textContent;
        const yearGenre = gridItem.querySelector("p:last-of-type")?.textContent;

        if (!title || !yearGenre) return; // перевірка на наявність елементів

        modalTitle.textContent = title;
        modalYearGenre.textContent = yearGenre;
        modalDescription.textContent = descriptions[title] || "Опис відсутній.";

        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (event) => {
        if (event.target === modal) modal.style.display = "none";
    });
});

let cart = [];

function updateCart() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.title} — ${item.price} грн
            <button class="remove" data-index="${index}">✖</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("cart-total-price").textContent = total;

    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// --- ДОДАВАННЯ У КОШИК ---
document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const parent = btn.parentElement;

        const film = {
            title: parent.dataset.title,
            year: parent.dataset.year,
            price: Number(parent.dataset.price),
            description: parent.dataset.desc
        };

        cart.push(film);
        updateCart();
    });
});


// --- ВІДКРИТТЯ / ЗАКРИТТЯ КОШИКА ---
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("cart-overlay");

document.getElementById("open-cart").onclick = () => {
    cartPanel.classList.add("open");
    overlay.classList.add("show");
};

document.getElementById("close-cart").onclick =
overlay.onclick = () => {
    cartPanel.classList.remove("open");
    overlay.classList.remove("show");
};


let itemsPerPage = 5;       //  кількість елементів на сторінку
let currentPage = 1;

// --- ОНОВЛЕННЯ КОШИКА З ПАГІНАЦІЄЮ ---
function updateCart() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";

    let total = 0;
    cart.forEach(item => total += item.price);

    // --- ПАГІНАЦІЯ ---
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = cart.slice(start, end);

    // --- ВИВОДИМО ТІЛЬКИ ЕЛЕМЕНТИ ПОТОЧНОЇ СТОРІНКИ ---
    itemsToShow.forEach((item, index) => {
        const globalIndex = start + index;
        const li = document.createElement("li");

        li.innerHTML = `
            ${item.title} — ${item.price} грн
            <button class="remove" data-index="${globalIndex}">✖</button>
        `;

        list.appendChild(li);
    });

    // --- ОНОВЛЕННЯ ТЕКСТУ ---
    document.getElementById("cart-count").textContent = cart.length;
    document.getElementById("cart-total-price").textContent = total;

    // --- ПАГІНАЦІЯ КНОПКИ ---
    renderPagination();

    // --- РЕМУВЕР ---
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
            cart.splice(btn.dataset.index, 1);

            if (currentPage > totalPages()) currentPage = totalPages();

            updateCart();
        });
    });
}

// --- ПІДРАХУНОК КІЛЬКОСТІ СТОРІНОК ---
function totalPages() {
    return Math.ceil(cart.length / itemsPerPage);
}

// --- РЕНДЕР КНОПОК ПАГІНАЦІЇ ---
function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const pages = totalPages();

    if (pages <= 1) return;

    // Кнопка Попередня
    if (currentPage > 1) {
        const prev = document.createElement("button");
        prev.textContent = "←";
        prev.onclick = () => {
            currentPage--;
            updateCart();
        };
        pagination.appendChild(prev);
    }

    // Номери сторінок
    for (let i = 1; i <= pages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");

        btn.onclick = () => {
            currentPage = i;
            updateCart();
        };
        pagination.appendChild(btn);
    }

    // Кнопка Наступна
    if (currentPage < pages) {
        const next = document.createElement("button");
        next.textContent = "→";
        next.onclick = () => {
            currentPage++;
            updateCart();
        };
        pagination.appendChild(next);
    }
}
