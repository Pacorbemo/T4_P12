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
        const person = new Person(results.name.first, results.name.last, results.email)
        person.img = results.picture.thumbnail;
        person.phone = results.phone;
        person.city = results.location.city;
        person.country = results.location.country;
        return person;
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
        if(response.ok){
            return await response.json();;
        }else{
            return null;
        }
    } catch {
        return null;
    }
}

export async function updateCard(card, person = null) {

    let properties;
    const img = document.createElement("img");

    if(person){
        img.src = person.img;

        let time = await getTime(person.city);
        if(time) time = new Time(time)

        properties = {
            Name: `${person.name} ${person.surname}`,
            Mail: person.email,
            Phone: person.phone,
            Location: `${person.city}, ${person.country}`,
            "Current Time": time?time.getHourTime():"Error"
        };

    }else{
        img.src = "user_nt_found.jpg";

        properties = {
            Name: "name surname",
            Mail: "mail",
            Phone: "phone",
            Location: "city",
            "Current Time": "time",
        };
    }

    card.innerHTML = "";
    card.appendChild(img);

    const span = document.createElement("span");
    const strong = document.createElement("strong");
    for (const prop in properties) {
        //Clono los elementos para no tener que crearlos cada vez y ahorrar tiempo
        const spanTemp = span.cloneNode();
        const strongTemp = strong.cloneNode();
        
        strongTemp.textContent = prop;
        spanTemp.appendChild(strongTemp);
        spanTemp.appendChild(document.createTextNode(`: ${properties[prop]}`));
        card.appendChild(spanTemp);
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