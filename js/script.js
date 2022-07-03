const btnMinus = document.querySelector('.control-minus');
const btnPlus = document.querySelector('.control-plus'); 
const cartWrap = document.querySelector('.cart-wrap');

//  КНОПКА ПЛЮС
window.addEventListener('click', clickBtnPlus);
function clickBtnPlus(event){
    if(event.target.dataset.action === 'plus'){
        const wrapBtn = event.target.closest('.cart-item__details-control');
        const price = wrapBtn.querySelector('.control-info');
        price.innerHTML++
    }
}

//  КОПКА МИНУС
window.addEventListener('click', clickBtnMinus);
function clickBtnMinus(event){
    if(event.target.dataset.action === 'minus'){
        const wrapBtn = event.target.closest('.cart-item__details-control');
        const price = wrapBtn.querySelector('.control-info');
        if(price.innerHTML > 0){
            price.innerHTML--
        }

        if(event.target.closest('.cart-wrap') && parseInt(price.innerHTML) === 0){
            event.target.closest('.cart-item').remove()
        }
    }
}

// КНОПКА ДОБАВИТЬ
window.addEventListener('click', function(event){
    if(event.target.hasAttribute('data-cart')){
       const cart = event.target.closest('.card');

       const cartInfo ={
        id: cart.dataset.id,
        imgSrc: cart.querySelector('.img-block').getAttribute('src'),
        title: cart.querySelector('.card-title').innerText,
        itemsInCart: cart.querySelector('.control-info').innerText,
        weight: cart.querySelector('.price__weight').innerText,
        price: cart.querySelector('.price__currency').innerText,
        counter: cart.querySelector('.control-info').innerText
    };

    const cartsInwrap = cartWrap.querySelector(`[data-id="${cartInfo.id}"]`)
    if(cartsInwrap){
        const couneterElement = cartsInwrap.querySelector('[data-couneter]');
        couneterElement.innerText = parseInt(couneterElement.innerText) + parseInt(cartInfo.counter)
    }else{
        
        const cartHtml = `<div class="cart-item" data-id=${cartInfo.id}>
        <div class="cart-item__img">
            <img class="card-img img-block" src="${cartInfo.imgSrc}" alt="california">
        </div>
        <div class="cart-item__desc">
            <div class="cart-item__title lead mb-1">${cartInfo.title}</div>
            <div class="cart-item__weight mb-1">6 / ${cartInfo.weight}</div>
            <div class="cart-item__details">
                <div class="cart-item__details-control">
                    <div data-action="minus" class="control-minus">-</div>
                    <div data-couneter class="control-info">${cartInfo.counter}</div>
                    <div data-action="plus" class="control-plus">+</div>
                </div>
                <div class="cart-item__details-price h5">
                ${cartInfo.price}
                </div>
            </div>
        </div>
      </div>`
    
      cartWrap.insertAdjacentHTML('beforeend',cartHtml )
        }

        cart.querySelector('[data-couneter]').innerText = 1;
    }
    cartStatus()
    formStatus()
    cartCalcAndDelivery()
})

function cartStatus(){
    const cartWrap = document.querySelector('.cart-wrap');
    const cartAlert = document.querySelector('.alert');
    if(cartWrap.children.length > 0){
        cartAlert.classList.add('dispN')
    }
    else{
        cartAlert.classList.remove('dispN')
    }
}

function formStatus(){
    const cartWrap = document.querySelector('.cart-wrap');
    const formIn = document.querySelector('.form-Bue')
    if(cartWrap.children.length > 0){
        formIn.classList.remove('dispN')
    }
    else{
        formIn.classList.add('dispN')
    }
}

function cartCalcAndDelivery(){
   const cartsItem = document.querySelectorAll('.cart-item');
   let totalPrice = document.querySelector('.total-prise');
   const delivery = document.querySelector('.delivery');
   const deliveryWrap =document.querySelector('[data-cart-delivery]');
   const smallText = document.querySelector('.small');
   let finishSum = 0;
   cartsItem.forEach(function(item){
       const count = item.querySelector('[data-couneter]').innerText;
      const prise = item.querySelector('.cart-item__details-price').innerText
      const total = parseInt(count) * parseInt(prise);
      finishSum = total + finishSum;
   })
   totalPrice.innerHTML = `${finishSum}₽`;

   if(finishSum > 0){
    deliveryWrap.classList.remove('dispN');
   }else{
    deliveryWrap.classList.add('dispN');
   }


   if(finishSum >= 600){
    delivery.classList.add('total-free');
    delivery.innerText = 'бесплатно';
    smallText.classList.add('dispN');

   }else{
    delivery.classList.remove('total-free');
    delivery.innerText = '250₽';
    smallText.classList.remove('dispN');
   }
}

var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)