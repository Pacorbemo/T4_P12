import { updateCard, generateUser } from "./apis.js";

function updateCardLocal() {
    updateCard(card, img, properties);
};
async function generateUserLocal() {
    const data = await generateUser(img);
    img = data.img;
    properties = data.properties;
    updateCardLocal();
}

const container = document.getElementsByClassName("container")[0];
const card = document.createElement("div");
card.classList.add("card");
container.appendChild(card);

let img = document.createElement("img");
img.src = "user_nt_found.jpg";

let properties = {
    Name: "name surname",
    Mail: "mail",
    Phone: "phone",
    Location: "city",
    "Current Time": "time",
};

//Primera recarga de información
document.addEventListener("DOMContentLoaded", () => {
    updateCardLocal();

    const generateUserButton = document.createElement("button");
    generateUserButton.textContent = "GENERATE USER";
    generateUserButton.addEventListener("click", generateUserLocal);
    container.appendChild(generateUserButton);
});

