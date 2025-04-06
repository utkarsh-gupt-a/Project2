



function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    const militaryHours = hours.toString().padStart(2, 0);

    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    
    const timeString1 = `${hours}:${minutes}:${seconds} ${meridiem}`;
    const timeString2 = `${militaryHours}:${minutes}:${seconds}`;

    document.getElementById("clock1").textContent = timeString1;
    document.getElementById("clock2").textContent = timeString2;

}

updateClock();
setInterval(updateClock, 1000);