import {Person} from "./Person.js";
import {Time} from "./Time.js";

export async function generateUser(fallos = 0) {
    buttonEnabled(false);
    try{
        const response = await fetch("https://randomuser.me/api/?inc=name,email,phone,picture,location");
        const results = (await response.json()).results[0];
        
        //Si la ciudad tiene caracteres como "ñ" o los del alfabeto chino y ruso, la Api podría dar un error al buscar la hora 
        //Para ahorrar generar otro usuario al fallar la api del tiempo, generamos otro usuario que sepas que no dara error
        if(!/^[A-Za-z]+$/.test(results.location.city)){
            return generateUser();
        }
        
        return Person.createPerson(results);
    }catch{
        if(fallos < 5){
            return generateUser(fallos + 1);
        }else{
            return null;
        }
    }
}
 
async function getTime(location){
    const url = `https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=${location}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":"c4467b972cmshe6399c5a65fe868p1b7c00jsnf82a3a37fdbc",
            "X-RapidAPI-Host": "world-time-by-api-ninjas.p.rapidapi.com",
        },
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
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
    
    if(document.getElementsByClassName("generate-user-button")[0]){
        buttonEnabled();
    }
}

export function buttonEnabled(enabled = true){
    const button = document.getElementsByClassName("generate-user-button")[0];
    button.disabled = !enabled;

    enabled?
        button.innerHTML = "GENERATE USER":
        button.innerHTML = "LOADING USER..."
}