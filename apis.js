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

export async function generateUser(img) {
    const response = await fetch("https://randomuser.me/api/?inc=name,email,phone,picture,location");
    const results = (await response.json()).results[0];

    let time = await getTime(results.location.city);
    img.src = results.picture.thumbnail;
    return {
        properties : {
        Name: `${results.name.first} ${results.name.last}`,
        Mail: results.email,
        Phone: results.phone,
        Location: `${results.location.city}, ${results.location.country}`,
        "Current Time": `${time.hour}:${time.minute}:${time.second}`,
        },
        img: img
    };
}

export function updateCard(card, img, properties) {
    card.innerHTML = "";
    card.appendChild(img);
    for (let prop in properties) {
        const span = document.createElement("span");
        const strong = document.createElement("strong");
        strong.textContent = prop;
        span.appendChild(strong);
        span.appendChild(document.createTextNode(`: ${properties[prop]}`));
        card.appendChild(span);
    }
}