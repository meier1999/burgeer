const product = {
    crazy: {
        name: "crazy",
        price: 31000,
        amount: 0,
        img: "images/burger_1.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    light: {
        name: "light",
        price: 26000,
        amount: 0,
        img: "images/burger_2.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "cheeseburger",
        price: 29000,
        amount: 0,
        img: "images/burger_3.png",
        get Summ() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dburger",
        price: 24000,
        amount: 0,
        img: "images/burger_4.png",
        get Summ() {
            return this.price * this.amount
        }
    },
}

const cardImg = document.querySelectorAll('.card__img'),
    heaferImg = document.querySelector('.header__img'),
    btns = document.querySelectorAll('.card__shop'),
    shop = document.querySelector('.shop'),
    basket = document.querySelector('.basket'),
    basketClose = document.querySelector('.basket__close'),
    shopItem = document.querySelector('.shop__item'),
    basketBox = document.querySelector('.basket__box'),
    baskeTotal = document.querySelector('.basket__total');


cardImg.forEach(img => {
    img.addEventListener(`mouseover`, function () {
        let atribute = img.getAttribute(`src`)
        return heaferImg.setAttribute(`src`, atribute)
    })
})

btns.forEach(btn => {
    btn.addEventListener('click', function () {
        const parent = btn.closest(".card"),
            parentId = parent.getAttribute('id')
        product[parentId].amount++
        basketInfo()
    })
})
function basketInfo() {
    const productArr = []
    for (const key in product) {
        const pk = product[key]
        const productCard = document.querySelector(`#${key}`),
            span = productCard.querySelector('.card__item');
        if (pk.amount) {
            span.classList.add('active')
            span.innerHTML = pk.amount
            productArr.push(pk)
        } else {
            span.classList.remove('active')
            shopItem.classList.remove(`active`)
        }
    }
    if (productArr.length) {
        shopItem.classList.add(`active`)
        shopItem.textContent = productArr.length
    }
    basketBox.innerHTML = ""
    for (let i = 0; i < productArr.length; i++) {
        basketBox.innerHTML += basketProduct(productArr[i])
    }
    baskeTotal.innerHTML = totalSumm()
}
window.addEventListener(`click`, (e) => {
    const btn = e.target
    if (btn.classList.contains(`basket__sym`)) {
        const parent = btn.closest(`.basket__btns`),
            parentId = parent.getAttribute('id').split('_')[0]
        if (btn.textContent == '+') {
            product[parentId].amount++

        }
        else if (btn.textContent == '-') {
            product[parentId].amount--
        }
        basketInfo()
    }
})
function basketProduct(obj) {
    return `<div class="basket__card">
                  <img src="${obj.img}" alt="" class="basket__img">
                  <div class="basket__info">
                      <h3 class="baket__title">${obj.name}</h3>
                      <p class="baket__price">${obj.Summ}</p>
                  </div>
                  <div class="basket__btns" id='${obj.name}_card'>
                      <span class="basket__sym">-</span>
                      <p class="basket__amount">${obj.amount}</p>
                      <span class="basket__sym">+</span>
                  </div>
            </div>`
}
shop.addEventListener(`click`, () => {
    basket.classList.add(`active`)
})
basketClose.addEventListener(`click`, () => {
    basket.classList.remove(`active`)
})
function totalSumm() {
    let total = 0
    for (const k in product) {
        total += product[k].Summ
    }
    return total
}
