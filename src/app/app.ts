// HTML Elements.
const itemForm : HTMLFormElement | null = document.querySelector("#item-form");
const price: HTMLInputElement | null = document.querySelector("#price");
const description: HTMLInputElement | null = document.querySelector("#description");
const itemTable : HTMLTableElement | null = document.querySelector("#items-table");
const noItemsContainer: HTMLElement | null = document.querySelector(".no-items-container");
const itemsContainer: HTMLElement | null = document.querySelector(".items-container");
const priceItem : HTMLElement | null = document.querySelector(".total-price");
const resetElement : HTMLButtonElement | null = document.querySelector("#reset");


// interfaces
interface Product {
    id : number | void,
    price : string,
    description : string
}

// cart
let cart : Product[] = [];
const gen = generateId();

//Listeners
itemForm?.addEventListener("submit", (e)=> {
    e.preventDefault();
    if(price?.value !== null && description?.value !== null){
        const product : Product | undefined = insertIntoCar();
        if(product != undefined){
            createItem(product.id, product.price, product.description);
        }
        calculatePrice();
        clearform();
        noItemsContainer?.classList.add("disabled");
        itemsContainer?.classList.remove("disabled");

    }
});

resetElement?.addEventListener("click", ()=>{
    cart  = [];
    clearTable();
    calculatePrice();
    console.log(gen.next(true));

})


// methods
const createItem = (id: number | void  , price : string, description : string) : void  => {
   const string = `
    <tr >
        <td>
           ${description}
        </td>
        <td>
            USD$ ${price}
        </td>
        <td>
            <button id="deleteItemBtn" onclick = "deleteItem(${id})"><i class="fi fi-rr-trash"></i></button>
        </td>
    </tr>
    `
    if(itemTable != null){
        itemTable.innerHTML += string;
    }
}

const insertIntoCar = () : Product | undefined  => {
    if(price?.value!=null && description?.value != null){
        
        const product : Product = {
            id : gen.next().value,
            price : price.value,
            description : description.value,
        }

        cart.push(product);
        console.log(cart);

        return product;
    }
}

const calculatePrice = () : void => {
    const price = cart.reduce((acc,item) => { return acc += parseFloat(item.price)},0);
    showPrice(price);
}

const showPrice = (price : number) : void => {
    if(priceItem != null){
        priceItem.innerHTML = `USD $${price}`
    }
}

function* generateId(){
    let id : number = 1;
    let reset : boolean; 
	while(true){
		reset = yield id;
		if(reset){
			id = 0;
		}
		else {
			id++;
		}
    }
    }


const clearTable = () : void => {
   if(itemTable != null){
    itemTable.innerHTML = "";
   }
   itemsContainer?.classList.add("disabled");
   noItemsContainer?.classList.remove("disabled");
}

const clearform = () : void => {
    if(price?.value != null && description?.value != null){
        price.value = "";
        description.value = "";
    }
}

const deleteItem = (id : number) => {
    const index = cart.findIndex( (item)=> item.id === id);
    cart.splice(index,1);
    refreshTable();
    calculatePrice();
}

const refreshTable = () : void => {
    if(itemTable !== null){
        itemTable.innerHTML = "";
    }
    cart.forEach( (item) => {
        createItem(item.id, item.price, item.description);
    })
}
