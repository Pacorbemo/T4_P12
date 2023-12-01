import {Person} from "./Person.js";
import {Time} from "./Time.js";

export async function generateUser() {
    const button = document.getElementsByClassName("generate-user-button")[0];
    button.disabled = true;
    button.innerHTML= "LOADING USER..."
    const response = await fetch("https://randomuser.me/api/?inc=name,email,phone,picture,location");
    const results = (await response.json()).results[0];
    
    return Person.createPerson(results);
}
 
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

export async function updateCard(card, person = null) {

    let time;
    const img = document.createElement("img");
    if(person){
        img.src = person.img;
        time = new Time(await getTime(person.city));
    }else{
        img.src = "user_nt_found.jpg";
    }
    card.innerHTML = "";
    card.appendChild(img);



    let properties = {};
    person?
        properties = {
            Name: `${person.name} ${person.surname}`,
            Mail: person.email,
            Phone: person.phone,
            Location: `${person.city}, ${person.country}`,
            "Current Time": time.getHourTime(),
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
    const button = document.getElementsByClassName("generate-user-button")[0];
    if(button){
        button.innerHTML= "GENERATE USER";
        button.disabled = false;
    }
}