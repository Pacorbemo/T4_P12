import {Persona} from "./Persona.js";
async function getTime(location){
    location = location.split(" ")[0];
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

export async function generateUser() { 
    const response = await fetch("https://randomuser.me/api/?inc=name,email,phone,picture,location");
    const results = (await response.json()).results[0];
    
    const persona = new Persona(results.name.first, results.name.last, results.email);
    persona.img = results.picture.thumbnail;
    persona.phone = results.phone;
    persona.city = results.location.city;
    persona.country = results.location.country;
    
    return persona;
}

export async function updateCard(card, persona = null) {
    
    let time;
    const img = document.createElement("img");
    if(persona){
        img.src = persona.img;
        time = await getTime(persona.city);
    }else{
        img.src = "user_nt_found.jpg";
    }
    card.innerHTML = "";
    card.appendChild(img);



    let properties = {};
    persona?
        properties = {
            Name: `${persona.name} ${persona.surname}`,
            Mail: persona.email,
            Phone: persona.phone,
            Location: `${persona.city}, ${persona.country}`,
            "Current Time": `${time.hour}:${time.minute}:${time.second}`,
        } : properties = {
            Name: "name surname",
            Mail: "mail",
            Phone: "phone",
            Location: "city",
            "Current Time": "time",
        };

    for (let prop in properties) {
        const span = document.createElement("span");
        const strong = document.createElement("strong");
        strong.textContent = prop;
        span.appendChild(strong);
        span.appendChild(document.createTextNode(`: ${properties[prop]}`));
        card.appendChild(span);
    }
}