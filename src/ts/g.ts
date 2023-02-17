/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getTotalLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump);
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
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

function totalWeeklyTemperature(measuredTemperatures: Temp[]) { 
  let sumOfTemps = 0;

  for (let i = 0; i < measuredTemperatures.length; i++) {
    if (measuredTemperatures[i].city === CITY_NAME) {
      if (measuredTemperatures[i].measuredDate.getTime() > Date.now() - ONE_WEEK_IN_MS) {
        sumOfTemps += measuredTemperatures[i].temperature;
      }
    }
  }
  return sumOfTemps;
}

function averageWeeklyTemperature(sumOfTemps: number, DAYS_IN_WEEK: number) {
  return sumOfTemps / DAYS_IN_WEEK; 
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

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

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

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

class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string,

  ) {}
  
  validateUserAge(user: User): number {
    const unix_start_year = 1970;

    let ageDiff = Date.now() - user.birthday.getTime();
    let ageDate = new Date(ageDiff);
    let userAge = Math.abs(ageDate.getUTCFullYear() - unix_start_year);

    return userAge;
  }
};

const MINIMUN_AGE = 20;
const ERROR_MSG = "Du är under 20 år";

function createUser(user: User) {
  const userAge = user.validateUserAge(user);
  if (userAge > MINIMUN_AGE) {
    // Logic for creating a user
  } else {
      return ERROR_MSG;
    }
}
