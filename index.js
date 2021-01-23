const title = document.querySelector(".watNu__title");
const picto = document.querySelector(".watNu__image");
const pic = document.createElement("img");
picto.appendChild(pic);
const description =document.querySelector(".watNu__description");
const displayRemaining = document.querySelector(".reward__timeleft");
const displayNeeded = document.querySelector(".reward__timeneeded")
const klaar = document.getElementById("klaar");
let index = 0;
const schoolTodoList = [
    {title:"Medicijnen innemen.",duur:1 , description:"Ik pak een pilletje uit het vakje en neem het in.", picture:"./assets/medicijndoos.png"}, 
    {title:"Ontbijt klaarmaken en eten.",duur:25 , description:"Ik pak een boterham of cracker. Daar doe ik beleg op en dan eet ik hem op.", picture:"./assets/ontbijt.png"},
    {title:"Eten klaarmaken voor school.",duur:10, description:"Ik maak brood klaar voor school en ik pak wat fruit. Dat doe ik in de broodtrommel.", picture:"./assets/broodmaaltijd.png" },
    {title:"Tas inpakken.",duur:5, description:"Ik doe alles in mijn tas. Ik let er ook op dat ik mijn huiswerk meeneem.", picture:"./assets/tasinpakken.png"},
    {title:"Haren kammen.",duur:10, description:"Ik pak de borstel en eventueel anti-klit spray. Ik ga dan mijn haren borstelen", picture:"./assets/borstelhaar.png"},
    {title:"Met de katten knuffelen.", duur:0, description:"Ik zoek een kat uit en ga deze op een vriendelijke manier knuffelen.", picture:"./assets/katlopen.png"}]
const weekendTodoList = [
    {title:"Medicijnen innemen.",duur:1,description:"Ik pak een pilletje uit het vakje en neem het in.",picture:"./assets/medicijndoos.png"},
    {title:"Aankleden.",duur:15,description:"Trek kleren aan , ook sokken",picture:".assets/aankleden.png"},
    {title:"Haren kammen.",duur:10,description:"Ik pak de borstel en eventueel anti-klit spray. Ik ga dan mijn haren borstelen",picture:"./assets/borstelhaar.png"},
    {title:"Met de katten knuffelen.",duur:1,description:"Ik zoek een kat uit en ga deze op een vriendelijke manier knuffelen.",picture:"./assets/katlopen.png"},
]
let todoList = schoolTodoList;
const increase = () => index<todoList.length-1 ? (index=index + 1 ,updateDOM()) : alert("Je bent klaar");
klaar.addEventListener("click", increase);

const updateDOM = () => {
    title.innerHTML = todoList[index].title;
    pic.src = todoList[index].picture;
    description.innerHTML = todoList[index].description;
    calcneededTime();
    calcRemaining();
}


const calcneededTime = () => {
    let neededTime = 0;
    for (i=index; i< todoList.length-1; i++) {
        neededTime+= todoList[i].duur;
        
    }
    displayNeeded.innerHTML = `Je hebt nog ${neededTime} minuten nodig om alles te doen.`
    return(neededTime);
}


// calculate the time till leave
const calcRemaining = () =>{
    let current = new Date();
    let dayOfWeek = current.getDay();//sunday=0
    let departTime = 7.5 ;// schoolday taxi at 7.30am
    let departMessage = "De TAXI staat er!!";
    if (dayOfWeek==2 || dayOfWeek==4){ // no school, then online school at 8.30am
        departTime = 8.5;
        departMessage = "Je moet nu les gaan volgen op je laptop."
    }
    else if(dayOfWeek==6||dayOfWeek==0){ // in the weekend, be ready at 11.00am
        departTime = 11;
        departMessage = "Het is dan wel weekend, maar je moet nu wel aangekleed zijn."
    }
    let hours = current.getHours();
    let minutes = current.getMinutes();
    let actTime = hours*60 + minutes ;
    let remainTime = departTime*60 - actTime;
    if (remainTime > 0) {
        displayRemaining.innerHTML= `Je hebt nog ${remainTime} minuten.`;
    }
    else if (remainTime == 0) {
        displayRemaining.innerHTML =`${departMessage}`;
    }
    else displayRemaining.innerHTML =`${departMessage} Je bent ${-remainTime} minuten te laat!`;

}

updateDOM();
setInterval(calcRemaining,60000);
setInterval(calcneededTime,60000);