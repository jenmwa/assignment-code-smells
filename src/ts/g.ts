/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

// function getLength(jumpings: number[]): number {
//   let totalNumber = 0;

//   totalNumber = jumpings.reduce(
//     (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
//   );

//   return totalNumber;
// }
//undvika  onödig tilldelning variabel, return direkt, FUNKTIONSNAMN - sammanfatta längd.
function getLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump);
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

// class Student {
//   constructor(
//     public name: string,
//     public handedInOnTime: boolean,
//     public passed: boolean
//   ) {}
// }

// function getStudentStatus(student: Student): string {
//   student.passed =
//     student.name == "Sebastian"
//       ? student.handedInOnTime
//         ? true
//         : false
//       : false;

//   if (student.passed) {
//     return "VG";
//   } else {
//     return "IG";
//   }
// }
// }

//magic number/string- sebastian, förenklad if-sats, refaktorerad kod. // 2 funktioner 1; handed in on time. 2; passed el ej
//OBS OM VI TAR ut sebastian - motivera varför.

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getSebastiansStudentStatus(student: Student): string {
  const student_name = 'Sebastian';
    if (student.name === student_name && student.handedInOnTime) {
      student.passed = true;
    } else {
      student.passed = false;
    }

  return student.passed ? "VG" : "IG";
}



/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

// class Temp {
//   constructor(public q: string, public where: Date, public v: number) {}
// }

// function averageWeeklyTemperature(heights: Temp[]) {
//   let r = 0;

//   for (let who = 0; who < heights.length; who++) {
//     if (heights[who].q === "Stockholm") {
//       if (heights[who].where.getTime() > Date.now() - 604800000) {
//         r += heights[who].v;
//       }
//     }
//   }

//   return r / 7;
// }

// variabelnamn q, where , v, r, who, heights är inte beskrivande variabelnamn, magic number(604800000)+ ('STOCKHOLM') + (7),  + onödig tilldelening variabel r= 0;
//senaste veckans medeltemperatur för stad X, rename function.
class Temp {
  constructor(
    public city: string,
    public measuredDate:Date, 
    public temperature: number
    ) {}
}

const ONE_WEEK_IN_MS = 604800000;
const CITY_NAME = "Stockholm";
const DAYS_IN_WEEK = 7;

//Tar ej med en vecka från nu-aspekten
// function averageWeeklyTemperatureInStockholm(measuredTemperatures: Temp[]) {
//   const days_in_week = 7;
//   const sumOfTemps = measuredTemperatures.reduce((accumulator, currentValue) => accumulator + currentValue.temperature, 0);
//   return sumOfTemps / days_in_week;
// }

function averageWeeklyTemperature(measuredTemperatures: Temp[]) { // averageWeeklyTemperature, and avregaeDAILYTemperature
  let sumOfTemps = 0;

  for (let i = 0; i < measuredTemperatures.length; i++) {
    if (measuredTemperatures[i].city === CITY_NAME) {
      if (measuredTemperatures[i].measuredDate.getTime() > Date.now() - ONE_WEEK_IN_MS) {
        sumOfTemps += measuredTemperatures[i].temperature;
      }
    }
  }
  return sumOfTemps / DAYS_IN_WEEK ;
}


/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

// function showProduct(
//   name: string,
//   price: number,
//   amount: number,
//   description: string,
//   image: string,
//   parent: HTMLElement
// ) {
//   let container = document.createElement("div");
//   let title = document.createElement("h4");
//   let pris = document.createElement("strong");
//   let imageTag = document.createElement("img");

//   title.innerHTML = name;
//   pris.innerHTML = price.toString();
//   imageTag.src = image;

//   container.appendChild(title);
//   container.appendChild(imageTag);
//   container.appendChild(pris);
//   parent.appendChild(container);
// }

// amount + description används ej. variabelnamn ej på engelska. flytta ur konstruktorn, span ist för strong, mer symantisk html
//INTERFACE eller klass?
class Product {
  constructor(
    public name: string,
    public price: number,
    public image: string,
    public parent: HTMLElement,
  ) {}
}

function showProduct(product: Product, parent: HTMLElement) {
  // const { name, price, image } = product;

  let container = document.createElement("div");
  let title = document.createElement("h4");
  let priceTag = document.createElement("span");
  let imageTag = document.createElement("img");

  title.innerHTML = product.name;
  priceTag.innerHTML = product.price.toString();
  imageTag.src = product.image;

  container.appendChild(title);
  container.appendChild(priceTag);
  container.appendChild(imageTag);
  parent.appendChild(container);
}

// const productHmtl= 
// `<div>
//   <h4>${showProduct.name}</h4>
//   <img src="${showProduct.image}"/>
//   <strong>${showProduct.price}</strong>
// </div>`;

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
// function presentStudents(students: Student[]) {
//   for (const student of students) {
//     if (student.handedInOnTime) {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = true;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#passedstudents");
//       listOfStudents?.appendChild(container);

//     } else {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = false;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#failedstudents");
//       listOfStudents?.appendChild(container);
//     }
//   }
// }
//dupliucerad kod. VAD SKER - vi skapar html, beroende på handedInOnTime - checkbox checked. därefter placerar i ul.
function createHTML(handedInOnTime: boolean): HTMLLIElement {
  let listItem = document.createElement("li");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = handedInOnTime;

  listItem.appendChild(checkbox);
  return listItem;
}

function presentStudents(students: Student[]) {
  for (const student of students) {
    let listItem = createHTML(student.handedInOnTime);
    let listOfStudents;
    if (student.handedInOnTime) {
      listOfStudents = document.querySelector("ul#passedstudents");
    } else {
      listOfStudents = document.querySelector("ul#failedstudents");
    }
    listOfStudents?.appendChild(listItem);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
// function concatenateStrings() {
//   let result = "";              
//   result += "Lorem";
//   result += "ipsum";
//   result += "dolor";
//   result += "sit";
//   result += "amet";

//   return result;
// }

//undvika repetativ kod, och få en mer lättläst kod.
function concatenateStrings() {
  const result = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
  return result.join(' ');
}
/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/


//funktionen gör både validate och create, , skapa klass, magic number.
// function createUser(
//   name: string,
//   birthday: Date,
//   email: string,
//   password: string
// ) {
//   // Validation

//   let ageDiff = Date.now() - birthday.getTime();
//   let ageDate = new Date(ageDiff);
//   let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

//   console.log(userAge);

//   if (!(userAge < 20)) {
//     // Logik för att skapa en användare
//   } else {
//     return "Du är under 20 år";
//   }
// }

//funktionen gör både calculate age, validate age och create user, skapa klass, magic number, ändra negerande villkor

class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}
  }

  const UNIX_START_YEAR = 1970;

  function calculateAge(user: User): number {
    const ageDiff = Date.now() - user.birthday.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - UNIX_START_YEAR);
  }
  
  function validateUser(user: User): boolean {
    const userAge = calculateAge(user);
    return userAge >= 20;
  }
  
  function createUser(user: User) {
    if (validateUser(user)) {
      // Logic for creating a user
    } else {
      return "Du är under 20 år";
    }
    
  }

  