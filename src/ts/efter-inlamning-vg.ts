
/*
  2. Refaktorera funktionen createProductHtml :)
  */

  const CART_LIST = 'savedCartList';
  const PRODUCT_LIST = 'savedList'

  class Cart {
    addToCart(i: number) {}
  }
  export let cartList = JSON.parse(localStorage.getItem(CART_LIST) || "[]");
  export let productList = JSON.parse(localStorage.getItem(PRODUCT_LIST) || "[]");


  updateCart();

  function updateCart() {
    const quantity = cartList.reduce((accItem:number, currItem: number) => accItem + currItem);
    const floatingCart = document.getElementById(
      "floatingcartnumber"
    ) as HTMLElement;
    floatingCart.innerHTML = "" + quantity;
  }


  export function createProductHtml() {
    //dela upp i dogproduct och dogImg!
    for (let i = 0; i < productList.length; i++) {

      const dogproduct: HTMLDivElement = document.createElement("div");
      	dogproduct.className = 'dogproduct';

      const dogImgContainer: HTMLDivElement = createDogImg(i);
      const name: HTMLHeadingElement = createNameElement(i);
      const price: HTMLHeadingElement = createPriceElement(i);
      const info: HTMLHeadingElement = createInfoElement(i);

			dogproduct.appendChild(dogImgContainer);
      dogproduct.appendChild(name);
      dogproduct.appendChild(price);
      dogproduct.appendChild(info);

      createProductCategory(i, dogproduct);
    }

    setLocalStorage();

  }

function createDogImg(i:number) {
	const dogImgContainer: HTMLDivElement = document.createElement("div");
		dogImgContainer.className = "dogimgcontainer";

	const dogImg: HTMLImageElement = document.createElement("img");
  	dogImg.src = productList[i].picture;
    dogImg.alt = productList[i].pictureAlt;

	const cartSymbolContainer: HTMLDivElement = createCartSymbolContainer(i);

	dogImg.addEventListener("mouseover", () => {
		cartSymbolContainer.classList.add("hover");
		dogImg.classList.add("hover");
	});

	dogImg.addEventListener("mouseout", () => {
		dogImg.classList.remove("hover");
		cartSymbolContainer.classList.remove("hover");
	});

	dogImg.addEventListener("click", () => {
		productList[i].productSpec = !productList[i].productSpec;
		window.location.href = "product-spec.html#backArrow";
	});

	dogImgContainer.appendChild(dogImg);
  dogImgContainer.appendChild(cartSymbolContainer);

	return dogImgContainer;
}

function createCartSymbolContainer(i: number) {
  const cartSymbolContainer: HTMLDivElement = document.createElement("div");
  cartSymbolContainer.className = "cartSymbolContainer";
  const cartSymbol: HTMLElement = createCartSymbol();
  cartSymbolContainer.appendChild(cartSymbol);
  cartSymbol.addEventListener("click", () => {
    let cart = new Cart();
    cart.addToCart(i);
  });
  return cartSymbolContainer;
}

function createCartSymbol() {
  const cartSymbol: HTMLElement = document.createElement("i");
  cartSymbol.className = "bi bi-bag-plus";
  return cartSymbol;
}

function createNameElement(i: number) {
  const name: HTMLHeadingElement = document.createElement("h5");
  name.innerHTML = productList[i].name;
  return name;
}

function createInfoElement(i: number) {
  const info: HTMLHeadingElement = document.createElement("p");
  info.innerHTML = productList[i].info;
  return info;
}

function createPriceElement(i: number) {
  const price: HTMLHeadingElement = document.createElement("p");
  price.innerHTML = "$" + productList[i].price;
  return price;
}

function setLocalStorage() {
  let listastext = JSON.stringify(productList);
  localStorage.setItem(PRODUCT_LIST, listastext);
}

function createProductCategory(i: number, dogproduct: HTMLDivElement) {

  switch (productList[i].category) {
  case 'food':
    const categoryFood: HTMLElement = document.getElementById("food") as HTMLElement;
    dogproduct.className = "dogproduct";
    categoryFood.appendChild(dogproduct);
    break;
  
  case 'toys':
    const categoryToys: HTMLElement = document.getElementById("toys") as HTMLElement;
    dogproduct.className = "dogproduct";
    categoryToys.appendChild(dogproduct);
    break;

  case 'accessory':
    const categoryAccessory: HTMLElement = document.getElementById("accessory") as HTMLElement;
    dogproduct.className = "dogproduct";
    categoryAccessory.appendChild(dogproduct);
    break;

  case 'puppy':
    let categoryPuppy: HTMLElement = document.getElementById("puppy") as HTMLElement;
    dogproduct.className = "dogproduct";
    categoryPuppy.appendChild(dogproduct);
    break;

  case 'oldies':
    let categoryOldies: HTMLElement = document.getElementById("oldies") as HTMLElement;
    dogproduct.className = "dogproduct";
    categoryOldies.appendChild(dogproduct);
    break;

  default:
    const errorMsg = 'The category does not exist.';
    return errorMsg;
  }
}