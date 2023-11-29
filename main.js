const card = document.createElement("div");
card.classList.add("card");
const container = document.getElementsByClassName("container")[0];
container.appendChild(card);

const img = document.createElement("img");
img.src = "user_nt_found.jpg";

let arr = {
    Name: "name surname",
    Mail: "mail",
    Phone: "phone",
    Location: "city",
    "Current Time": "time",
};

async function getTime(location){
    const url = `https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=${location}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "c4467b972cmshe6399c5a65fe868p1b7c00jsnf82a3a37fdbc",
            "X-RapidAPI-Host": "world-time-by-api-ninjas.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

function updateCard() {
    card.innerHTML = "";
    card.appendChild(img);
    for (let prop in arr) {
        const span = document.createElement("span");
        const strong = document.createElement("strong");
        strong.textContent = prop;
        span.appendChild(strong);
        span.appendChild(document.createTextNode(`: ${arr[prop]}`));
        card.appendChild(span);
    }
}
updateCard();

const generateUserButton = document.createElement("button");
generateUserButton.textContent = "GENERATE USER";
generateUserButton.addEventListener("click", generateUser);
container.appendChild(generateUserButton);

async function generateUser() {
    const response = await fetch("https://randomuser.me/api/");
    const results = (await response.json()).results[0];

    let time = await getTime(results.location.city);
    arr = {
        Name: `${results.name.first} ${results.name.last}`,
        Mail: results.email,
        Phone: results.phone,
        Location: `${results.location.city}, ${results.location.country}`,
        "Current Time": `${time.hour}:${time.minute}:${time.second}`,
    };
    img.src = results.picture.thumbnail;

    updateCard();
}
