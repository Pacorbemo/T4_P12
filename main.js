import { updateCard, generateUser } from "./apis.js";

async function generateUserLocal() {
    const persona = await generateUser();
    updateCard(card, persona);
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
    updateCard(card);

    const generateUserButton = document.createElement("button");
    generateUserButton.textContent = "GENERATE USER";
    generateUserButton.addEventListener("click", generateUserLocal);
    container.appendChild(generateUserButton);
});

