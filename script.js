const relationshipStartDate = "2026-06-13";

const maximumFlowers = 40;

const loveMessages = [
    "You make even ordinary days feel special.",
    "No amount of distance could make me love you less.",
    "I cannot wait until missing you turns into holding you.",
    "You make my life softer, happier, and more beautiful.",
    "I love the way you make me feel completely understood.",
    "Every day with you gives me another reason to be grateful.",
    "You are worth every mile between us.",
    "Even from far away, you make me feel close to home.",
    "I hope you always remember how deeply loved you are.",
    "My favorite part of every day is hearing from you.",
    "I would choose you in every lifetime.",
    "You have made my world more beautiful just by being in it.",
    "I cannot wait to create more memories with you.",
    "The distance is temporary. What we have is not.",
    "You are the first person I want to tell everything to.",
    "I love every version of you, even the sleepy one.",
    "Somehow, you still give me butterflies from miles away.",
    "Thank you for being patient, loving, and completely yourself.",
    "You are my favorite notification.",
    "I am always proud to call you mine.",
    "There is no place I would rather be than beside you.",
    "Loving you is one of the easiest things I have ever done.",
    "You make the future feel exciting.",
    "You are the person I want in all of my favorite memories.",
    "I miss you, but I love knowing you are worth missing.",
    "One day, we will look back and be proud we made it through the distance.",
    "Every flower in this garden is another reason I love you.",
    "Your smile is still one of my favorite sights.",
    "No matter where we are, my heart always finds you.",
    "I love the life we are slowly building together.",
    "You are beautiful in ways you do not always notice.",
    "I wish I could hug you every time you opened this.",
    "Thank you for making love feel safe.",
    "You deserve every beautiful thing in this world.",
    "I love you more than yesterday and less than tomorrow.",
    "You make the distance feel survivable.",
    "My heart feels calmer whenever I hear your voice.",
    "I hope this flower reminds you that I am thinking about you.",
    "This garden will keep growing, just like my love for you."
];

const flowerColors = [
    "#f49ac2",
    "#f7b2d0",
    "#c4a7e7",
    "#9eb8ff",
    "#ffd37d",
    "#ff9f9f",
    "#d6a5f2",
    "#f8c8dc"
];

const garden = document.querySelector("#garden");
const daysTogetherElement =
    document.querySelector("#days-together");
const flowerCountElement =
    document.querySelector("#flower-count");
const dailyMessageElement =
    document.querySelector("#daily-message");

const modal = document.querySelector("#note-modal");
const modalTitle = document.querySelector("#modal-title");
const modalMessage = document.querySelector("#modal-message");
const closeModalButton =
    document.querySelector("#close-modal");

function getDaysTogether() {
    const startDate = new Date(
        `${relationshipStartDate}T00:00:00`
    );

    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    const difference =
        today.getTime() - startDate.getTime();

    const totalDays =
        Math.floor(difference / millisecondsPerDay) + 1;

    return Math.max(totalDays, 1);
}

function getTodayKey() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function updateVisitHistory() {
    const todayKey = getTodayKey();

    const savedVisits = JSON.parse(
        localStorage.getItem("loveGardenVisits")
    ) || [];

    if (!savedVisits.includes(todayKey)) {
        savedVisits.push(todayKey);

        localStorage.setItem(
            "loveGardenVisits",
            JSON.stringify(savedVisits)
        );

        dailyMessageElement.textContent =
            "A new flower grew today because you came back.";
    } else {
        dailyMessageElement.textContent =
            "Today's flower is already blooming for you.";
    }

    return savedVisits;
}

function createPetals(flowerHead) {
    for (let index = 0; index < 8; index++) {
        const petal =
            document.createElement("span");

        petal.className = "petal";

        flowerHead.appendChild(petal);
    }

    const flowerCenter =
        document.createElement("span");

    flowerCenter.className = "flower-center";

    flowerHead.appendChild(flowerCenter);
}

function getFlowerPosition(index, totalFlowers) {
    const columns =
        window.innerWidth < 700 ? 4 : 8;

    const row = Math.floor(index / columns);
    const column = index % columns;

    const columnWidth = 100 / columns;

    const left =
        column * columnWidth +
        columnWidth / 2;

    const rowHeight =
        window.innerWidth < 700 ? 125 : 105;

    const bottom = row * rowHeight;

    const offset =
        index % 2 === 0 ? -3 : 3;

    return {
        left: Math.min(
            Math.max(left + offset, 5),
            95
        ),
        bottom
    };
}

function openFlowerNote(index) {
    const messageIndex =
        index % loveMessages.length;

    modalTitle.textContent =
        `Flower ${index + 1}`;

    modalMessage.textContent =
        loveMessages[messageIndex];

    modal.classList.remove("hidden");
}

function closeFlowerNote() {
    modal.classList.add("hidden");
}

function createFlower(index, totalFlowers) {
    const flower =
        document.createElement("button");

    const flowerHead =
        document.createElement("span");

    const stem =
        document.createElement("span");

    const leftLeaf =
        document.createElement("span");

    const rightLeaf =
        document.createElement("span");

    flower.className = "flower-wrapper";
    flower.type = "button";

    flower.setAttribute(
        "aria-label",
        `Open love note from flower ${index + 1}`
    );

    flowerHead.className = "flower-head";
    stem.className = "stem";
    leftLeaf.className = "leaf leaf-left";
    rightLeaf.className = "leaf leaf-right";

    const color =
        flowerColors[index % flowerColors.length];

    flower.style.setProperty(
        "--petal-color",
        color
    );

    const position =
        getFlowerPosition(index, totalFlowers);

    flower.style.left =
        `calc(${position.left}% - 42px)`;

    flower.style.bottom =
        `${position.bottom}px`;

    flower.style.animationDelay =
        `${index * 0.08}s`;

    flowerHead.style.animationDelay =
        `${index * 0.17}s`;

    createPetals(flowerHead);

    flower.appendChild(stem);
    flower.appendChild(leftLeaf);
    flower.appendChild(rightLeaf);
    flower.appendChild(flowerHead);

    flower.addEventListener("click", () => {
        openFlowerNote(index);
    });

    garden.appendChild(flower);
}

function renderGarden(flowerCount) {
    garden.innerHTML = "";

    for (
        let index = 0;
        index < flowerCount;
        index++
    ) {
        createFlower(index, flowerCount);
    }

    const columns =
        window.innerWidth < 700 ? 4 : 8;

    const numberOfRows =
        Math.ceil(flowerCount / columns);

    const rowHeight =
        window.innerWidth < 700 ? 125 : 105;

    const gardenHeight =
        Math.max(
            520,
            numberOfRows * rowHeight + 240
        );

    garden.style.minHeight =
        `${gardenHeight}px`;
}

function initializeGarden() {
    const daysTogether = getDaysTogether();
    const visits = updateVisitHistory();

    /*
        Use visits.length if you want one flower for
        every day she actually opens the site.

        Use daysTogether if you want one flower for
        every day of the relationship.
    */
    const flowerCount = Math.min(
        visits.length,
        maximumFlowers
    );

    daysTogetherElement.textContent =
        daysTogether;

    flowerCountElement.textContent =
        flowerCount;

    renderGarden(flowerCount);
}

closeModalButton.addEventListener(
    "click",
    closeFlowerNote
);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeFlowerNote();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeFlowerNote();
    }
});

window.addEventListener("resize", () => {
    const flowerCount =
        Number(flowerCountElement.textContent);

    renderGarden(flowerCount);
});

initializeGarden();