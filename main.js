import { updateCard, generateUser, buttonEnabled } from "./apis.js";

async function generateUserLocal() {
    const person = await generateUser();
    if (person){
        updateCard(card, person);
    }else{
        alert("No se ha podido generar un usuario");
        buttonEnabled();
    }
}

const card = document.createElement("div");
card.classList.add("card");

//Primera recarga de información
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementsByClassName("container")[0];
    container.appendChild(card);

    updateCard(card);

    const generateUserButton = document.createElement("button");
    generateUserButton.classList.add("generate-user-button");
    generateUserButton.addEventListener("click", generateUserLocal);
    container.appendChild(generateUserButton);
    buttonEnabled();
});