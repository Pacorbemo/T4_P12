export class Person {
    name;
    surname;
    email;
    img;
    phone;
    city;
    country;
    constructor(name, surname, email){
        this.name = name;
        this.surname = surname
        this.email = email;
    }

    set name(name){
        this.name = name
    }
    set surname(surname){
        this.surname = surname
    }
    set email(email){
        this.email = email
    }
    set img(img){
        this.img = img
    }
    set phone(phone){
        this.phone = phone
    }
    set city(city){
        this.city = city
    }
    set country(country){
        this.country = country
    }
    
    get name(){
        return this.name;
    }
    get surname(){
        return this.surname;
    }
    get email(){
        return this.email;
    }
    get img(){
        return this.img;
    }
    get phone(){
        return this.phone;
    }
    get city(){
        return this.city;
    }
    get country(){
        return this.country;
    }

    static createPerson(results){
        const person = new Person(results.name.first, results.name.last, results.email);
        person.img = results.picture.thumbnail;
        person.phone = results.phone;
        person.city = results.location.city;
        person.country = results.location.country;

        return person;
    }
}