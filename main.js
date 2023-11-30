import { updateCard, generateUser } from "./apis.js";

const container = document.getElementsByClassName("container")[0];
const card = document.createElement("div");
card.classList.add("card");
container.appendChild(card);

function updateCardLocal() {
    updateCard(card, img, properties);
};

async function generateUserLocal() {
    const data = await generateUser(img);
    img = data.img;
    properties = data.properties;
    updateCardLocal();
}

let img = document.createElement("img");
img.src = "user_nt_found.jpg";

let properties = {
    Name: "name surname",
    Mail: "mail",
    Phone: "phone",
    Location: "city",
    "Current Time": "time",
};

updateCardLocal();

const generateUserButton = document.createElement("button");
generateUserButton.textContent = "GENERATE USER";
generateUserButton.addEventListener("click", generateUserLocal);
container.appendChild(generateUserButton);

