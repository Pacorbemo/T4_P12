export class Time{
    hour;
    minute;
    second;
    constructor(location){
        this.hour = location.hour;
        this.minute = location.minute;
        this.second = location.second;
    }

    getHourTime(){
        return `${this.hour}:${this.minute}:${this.second}`
    }

}