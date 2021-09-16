'use strict'
const catalog = {
    catalogBlock: null,
    basket: null,
    goods: [
        {
            id_product: 101,
            name: 'Шерсть Норвегия',
            count: 4,
            price: 360
        },
        {
            id_product: 102,
            name: 'Шерсть Россия',
            count: 5,
            price: 200
        },
        {
            id_product: 103,
            name: 'Шерсть Турция',
            count: 3,
            price: 180
        },
        {
            id_product: 104,
            name: 'Шерсть Китай',
            count: 8,
            price: 110
        },
        {
            id_product: 105,
            name: 'Шерсть Исландия',
            count: 3,
            price: 680
        },
    ],
    init(catalogBlockClass, basket) {
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.basket = basket;
        this.render();
        this.addEventHandlers();
    },
    render() {
        if (this.catalogLength() > 0) {
            this.renderCatalogList();
        } else {
            this.renderCatalogEmpty();
        }
    },
    catalogLength() {
        return this.goods.length;
    },
    renderCatalogList() {
        this.catalogBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },
    renderCatalogItem(item) {
        return `<div class="product">
                <h3>${item.name}</h3>
                <p>${item.price} руб.</p>
                <button class="product__add-to-cart" data-id_product="${item.id_product}">В корзину</button>
            </div>`;
    },
    renderCatalogEmpty() {
        this.catalogBlock.innerHTML = '';
        this.catalogBlock.textContent = 'Каталог пуст';
    },
    addEventHandlers() {
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event));
    },
    addToBasket(event) {
        if (!event.target.classList.contains('product__add-to-cart')) return;
        const id_product = +event.target.dataset.id_product;
        const productToAdd = this.goods.find((product) => product.id_product === id_product);
        this.basket.addToBasket(productToAdd);
    },
}

const basket = {
    basketBlock: null,
    basketButton: null,
    goods: [],

    init(basketBlockClass, basketButton, deleteButton) {
        this.basketBlock = document.querySelector(`#${basketBlockClass}`);
        this.basketButton = document.querySelector(`.${basketButton}`);

        this.addEventHandlers();
        this.render();
        //  this.talkingBasket();
    },
    addEventHandlers() {
        this.basketButton.addEventListener('click', this.clearBasket.bind(this));

    },
    clearBasket() {
        this.goods = [];
        this.render();
    },
    render() {
        if (this.BasketLength() > 0) {
            this.renderBasketList();
        } else {
            this.renderEmptyBasket();
        }
    },
    BasketLength() {
        return this.goods.length;
    },
    renderBasketList() {
        this.basketBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.basketBlock.insertAdjacentHTML('beforeend', this.renderBasketItem(item));
        });
    },
    renderBasketItem(item) {
        return `<div class = "basket">
                <h3>${item.name}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
                
            </div>`;
    },
    renderEmptyBasket() {
        this.basketBlock.innerHTML = '';
        this.basketBlock.textContent = 'Корзина пуста.';
    },
    addToBasket(product) {
        if (product) {
            const findInBasket = this.goods.find((item) => product.id_product === item.id_product);
            if (findInBasket) {
                findInBasket.quantity++;
            } else {
                this.goods.push({ ...product, quantity: 1 });
            }
            this.render();
        } else {
            alert('Ошибка добавления!');
        }
    },


}


catalog.init('catalog', basket);
basket.init('basket', 'clearBasket');
