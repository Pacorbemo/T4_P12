import { updateCard, generateUser, buttonEnabled } from "./apis.js";

async function generateUserLocal() {
    const person = await generateUser();
    if (person){
        updateCard(card, person);
    }else{
        alert("No se ha podido generar un usuario");
        const button = document.getElementsByClassName("generate-user-button")[0];
        buttonEnabled();
    }
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
    container.appendChild(generateUserButton);
    generateUserButton.addEventListener("click", generateUserLocal);
    buttonEnabled();
});