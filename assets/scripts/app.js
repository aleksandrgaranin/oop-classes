
class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

// console.log(new Product())

class ShoppingCart{
    items = [];

    render() {
        const cartEl = document.createElement('section')
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = "cart";
        return cartEl;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        console.log('Adding product to cart...')
        console.log(this.product)
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item'
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartButton = prodEl.querySelector("button");
        addCartButton.addEventListener("click", this.addToCart.bind(this)); //othewise it will be 'udefined'
        return prodEl;
    }
}

class ProductList {
    products = [
        new Product(
            'A pillow',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.yimg.com%2Faah%2Fyhst-72531153481428%2Fpillowtex-reg-luxury-down-and-feather-pillow-40.gif&f=1&nofb=1',
            'A super soft pillow',
            19.99),
        new Product(
            'A Carpet',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjabrocarpetone.com%2Fwp-content%2Fuploads%2F2016%2F05%2FIMG_9206-800x533.jpg&f=1&nofb=1',
            'A super soft Carpet',
            89.99
        )

    ];

    constructor() { }

    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod)
            const prodEl = productItem.render()
            prodList.append(prodEl)
        }
        return prodList;
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app');

        const cart = new ShoppingCart();
        const cartEl = cart.render()
        const productList = new ProductList();
        const prodListEl = productList.render()

        renderHook.append(cartEl)
        renderHook.append(prodListEl)
    }
}

const shop = new Shop()
shop.render()
