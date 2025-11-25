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

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartList = document.getElementById("cart-items");
    const cartEmpty = document.getElementById("cart-empty");

    // Додаємо кнопку до кожного елемента
    document.querySelectorAll(".grid-item").forEach(item => {
        const addBtn = document.createElement("button");
        addBtn.textContent = "Додати у кошик";
        addBtn.style.display = "block";
        addBtn.style.marginTop = "5px";
        item.appendChild(addBtn);

        addBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // !!! важливо, щоб не спрацював клік на .grid-item
        const title = item.querySelector("p:first-of-type").textContent;
        if (!cartItems.includes(title)) {
            cartItems.push(title);
            updateCart();
        }
    });
    });

    function updateCart() {
        cartList.innerHTML = "";
        if (cartItems.length === 0) {
            cartEmpty.style.display = "block";
        } else {
            cartEmpty.style.display = "none";
            cartItems.forEach(title => {
                const li = document.createElement("li");
                li.textContent = title;
                cartList.appendChild(li);
            });
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const itemsPerPage = 4; // кількість елементів на сторінці
    const grid = document.querySelector(".grid");
    const gridItems = Array.from(grid.children);
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const totalPages = Math.ceil(gridItems.length / itemsPerPage);

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        gridItems.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? "block" : "none";
        });

        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === currentPage) btn.disabled = true;
            btn.addEventListener("click", () => showPage(i));
            pagination.appendChild(btn);
        }
    }

    showPage(1); // показуємо першу сторінку
});