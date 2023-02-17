import { Product } from "../models/Product";
import { CartProduct } from '../models/CartProduct'

/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/

//CODE SMELLS: dubbeldefinerade parametrar. FÖRENKLA sorteringsfunktionerna, mkt kodduplicering, stavfel descending + skapa models - Product.
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DESCENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let copiedList: Product[] = [...products];

  switch (sort) {
    case Sort.PRICE_ASCENDING:
      return sortByPriceAscending(copiedList);
    case Sort.PRICE_DESCENDING:
      return sortByPriceDescending(copiedList);
    case Sort.NAME_ALPHABETIC:
      return sortByNameAscending(copiedList);
    case Sort.NAME_ALPHABETIC_REVERSE:
      return sortByNameDescending(copiedList);
    default:
      return copiedList;
  }
}

function sortByPriceAscending(products: Product[]): Product[] {
  return products.sort((a, b) => a.price - b.price);
}

function sortByPriceDescending(products: Product[]): Product[] {
  return products.sort((a, b) => b.price - a.price);
}

function sortByNameAscending(products: Product[]): Product[] {
  return products.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByNameDescending(products: Product[]): Product[] {
  return products.sort((a, b) => b.name.localeCompare(a.name));
}


/*
  2. Refaktorera funktionen createProductHtml :)
  */

  //CODESMELLS: 
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {
  let quantity = 0;

  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }


  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;

  for (let i = 0; i < productList.length; i++) {

    //create element for dogProduct
    //create element for dogImg


    let dogproduct: HTMLDivElement = document.createElement("div");

    let dogImgContainer: HTMLDivElement = document.createElement("div");
    dogproduct.appendChild(dogImgContainer);


    function createDogImage() {
      let dogImg: HTMLImageElement = document.createElement("img");

      dogImg.src = productList[i].picture;
      dogImg.alt = productList[i].pictureAlt;

      dogImgContainer.className = "dogimgcontainer";
      dogImgContainer.appendChild(dogImg);

      dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
    });

    dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
    });
    }

    

    


    //create cart Symbol container
    function createCartSymbolContainer(){
      let cartSymbolContainer: HTMLDivElement = document.createElement("div");
      cartSymbolContainer.className = "cartSymbolContainer";
      dogImgContainer.appendChild(cartSymbolContainer);
    }

    //create cart symbol
    function createCartSymbol() {
      let cartSymbol: HTMLElement = document.createElement("i");
      cartSymbol.className = "bi bi-bag-plus";

      return cartSymbol;
      cartSymbolContainer.appendChild(cartSymbol);
    };

    //create element for name
    function createName() {
      let name: HTMLHeadingElement = document.createElement("h5");
      name.innerHTML = productList[i].name;
      dogproduct.appendChild(name);
    }

    //create element for price
    function createPrice() {
      let price: HTMLHeadingElement = document.createElement("p");
      price.innerHTML = "$" + productList[i].price;
      dogproduct.appendChild(price);
    }

    //create element for info
    function createInfo() {
      let info: HTMLHeadingElement = document.createElement("p");
      info.innerHTML = productList[i].info;
      dogproduct.appendChild(info);
    }




    productList[i].productSpec = false;





    dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
    });




    cartSymbol.addEventListener("click", () => {
      let cart = new Cart();
      cart.addToCart(i);
    });





    if (productList[i].category === "sassy") {
      let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat1.appendChild(dogproduct);
    }
    if (productList[i].category === "kriminella") {
      let cat2: HTMLElement = document.getElementById(
        "kriminella"
      ) as HTMLElement;
      dogproduct.className = "dogproduct";
      cat2.appendChild(dogproduct);
    }
    if (productList[i].category == "singlar") {
      let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat3.appendChild(dogproduct);
    }
    if (productList[i].category === "puppy") {
      let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat4.appendChild(dogproduct);
    }
    if (productList[i].category === "oldies") {
      let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      dogproduct.className = "dogproduct";
      cat5.appendChild(dogproduct);
    }
  }
  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

/*
  3. Refaktorera funktionen getfromstorage
  */

  //CODE SMELLS: lägger CartProduct i models. 


function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}

