import { Product } from "../models/Product";
import { CartProduct } from '../models/CartProduct'

/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/

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
  return products.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
}

function sortByNameDescending(products: Product[]): Product[] {
  return products.sort((a, b) => b.name.localeCompare(a.name, 'sv'));
}


/*
  2. Refaktorera funktionen createProductHtml :)
  */

class Cart {
  addToCart(i: number) {}
};

export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {

  updateCart();

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");

    let showDogImageElements = createDogImageElements(i);
    dogproduct.appendChild(showDogImageElements);

    createNameElement(i, dogproduct);

    createPriceElement(i, dogproduct);

    createInfoElement(i, dogproduct);

    categories(i, dogproduct);

}

    function createDogImageElements(i: number) {
      let dogImageContainer: HTMLDivElement = document.createElement("div");
      dogImageContainer.className = "dogimgcontainer";

      let dogImg: HTMLImageElement = document.createElement("img");
      dogImg.src = productList[i].picture;
      dogImg.alt = productList[i].pictureAlt;

      dogImg.addEventListener("mouseover", () => {
      cartSymbolContainer.classList.add("hover");
      dogImg.classList.add("hover");
      });

      dogImg.addEventListener("mouseout", () => {
      dogImg.classList.remove("hover");
      cartSymbolContainer.classList.remove("hover");
      });

      dogImageContainer.appendChild(dogImg);

      let cartSymbolContainer: HTMLDivElement = createCartSymbolContainer(dogImageContainer);
    
      let cartSymbol: HTMLElement = createCartSymbol(cartSymbolContainer);

      cartSymbol.addEventListener("click", () => {
        let cart = new Cart();
        cart.addToCart(i);
      });

      productList[i].productSpec = false;

      dogImg.addEventListener("click", () => {
      productList[i].productSpec = !productList[i].productSpec;
      window.location.href = "product-spec.html#backArrow";
      let listastext = JSON.stringify(productList);
      localStorage.setItem("savedList", listastext);
      });

      return dogImageContainer;

      }
      
  }

  setLocalStorage();


function createCartSymbol(cartSymbolContainer: HTMLDivElement) {
  let cartSymbol: HTMLElement = document.createElement("i");
  cartSymbol.className = "bi bi-bag-plus";
  cartSymbolContainer.appendChild(cartSymbol);
  return cartSymbol;
}

function createCartSymbolContainer(dogImageContainer: HTMLDivElement) {
  let cartSymbolContainer: HTMLDivElement = document.createElement("div");
  cartSymbolContainer.className = "cartSymbolContainer";
  dogImageContainer.appendChild(cartSymbolContainer);
  return cartSymbolContainer;
}

function createInfoElement(i: number, dogproduct: HTMLDivElement) {
  let info: HTMLHeadingElement = document.createElement("p");
  info.innerHTML = productList[i].info;
  dogproduct.appendChild(info);
}

function createPriceElement(i: number, dogproduct: HTMLDivElement) {
  let price: HTMLHeadingElement = document.createElement("p");
  price.innerHTML = "$" + productList[i].price;
  dogproduct.appendChild(price);
}

function createNameElement(i: number, dogproduct: HTMLDivElement) {
  let name: HTMLHeadingElement = document.createElement("h5");
  name.innerHTML = productList[i].name;
  dogproduct.appendChild(name);
}

function setLocalStorage() {
  let listastext = JSON.stringify(productList);
  localStorage.setItem("savedList", listastext);
  sessionStorage.clear();
}

function updateCart() {
  let quantity = 0;
  for (let i = 0; i < cartList.length; i++) {
    quantity += cartList[i].quantity;
  }

  let floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
}

function categories(i: number, dogproduct: HTMLDivElement) {
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


/*
  3. Refaktorera funktionen getfromstorage
  */

function getfromstorage() {

  let fromStorage: string = localStorage.getItem("cartArray") || "";
  let cartProducts: CartProduct[] = JSON.parse(fromStorage);

  let amountcontainer = document.getElementById("amount-checkout-container2") as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById("title-container") as HTMLTableRowElement;
  titlecontainer.innerHTML = `<strong>products:</strong>`;

  let productQuantity = document.getElementById("product-quantity") as HTMLTableRowElement;

  let qttext: HTMLTableCellElement = document.createElement("th");
  productQuantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkOutTotal = document.getElementById("title-total") as HTMLTableCellElement;

  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkOutTotal.appendChild(totaltext);
  totaltext.innerHTML = "total:";




  for (let i: number = 0; i < cartProducts.length; i++) {

    createProductElement(i);

    createAmountElement(i);

    let amountTotal: HTMLTableCellElement = createAmountTotalElement();


    createMinusBtn(amountTotal);

    createPlusBtn(amountTotal);

  }

  function createAmountTotalElement() {
    let amountTotal: HTMLTableCellElement = document.createElement("th");
    productQuantity.appendChild(amountTotal);
    amountTotal.className = "amount-total";
    return amountTotal;
  }

  function createAmountElement(i: number) {
    let amountTable: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountTable);
    amountTable.innerHTML = "x" + cartProducts[i].amount;
    amountTable.className = "amount-table";
  }

  function createProductElement(i: number) {
    let productTable: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productTable);
    productTable.innerHTML = cartProducts[i].name;
    productTable.className = "product-table";
  }

  function cartTotal() {
    let totalSum: number = 0;

    for (let i = 0; i < cartProducts.length; i++) {
      totalSum += cartProducts[i].price *= cartProducts[i].amount;
    }

    let totalPrice: HTMLTableCellElement = document.createElement("th");
    checkOutTotal.appendChild(totalPrice);
    totalPrice.innerHTML = totalSum + "$";
    totalPrice.id = "totalincenter";
  }

  function createPlusBtn(amountTotal: HTMLTableCellElement) {
    let iconPlus: HTMLSpanElement = document.createElement("i");
    iconPlus.className = "fas fa-plus";

    let amountPlusBtn: HTMLButtonElement = document.createElement("button");
    amountPlusBtn.className = "plusbtn";
    amountTotal.appendChild(amountPlusBtn);
    amountPlusBtn.appendChild(iconPlus);
  }

  function createMinusBtn(amountTotal: HTMLTableCellElement) {
    let iconMinus: HTMLSpanElement = document.createElement("i");
    iconMinus.className = "fas fa-minus";

    let amountMinusBtn: HTMLButtonElement = document.createElement("button");
    amountMinusBtn.className = "minusbtn";
    amountTotal.appendChild(amountMinusBtn);
    amountMinusBtn.appendChild(iconMinus);
  }

  cartTotal();
}
getfromstorage();
