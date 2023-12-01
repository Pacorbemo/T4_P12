import { updateCard, generateUser } from "./apis.js";

async function generateUserLocal() {
    const person = await generateUser();
    updateCard(card, person);
}

const card = document.createElement("div");
card.classList.add("card");

//Primera recarga de información
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementsByClassName("container")[0];
    container.appendChild(card);

    let img = document.createElement("img");
    img.src = "user_nt_found.jpg";

    updateCard(card);

    const generateUserButton = document.createElement("button");
    generateUserButton.classList.add("generate-user-button");
    generateUserButton.textContent = "GENERATE USER";
    generateUserButton.addEventListener("click", generateUserLocal);
    container.appendChild(generateUserButton);
});