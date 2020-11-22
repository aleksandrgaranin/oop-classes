
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

class ElementAttribute {
   constructor(attrName, attrValue) {
       this.attrName = attrName;
       this.attrValue = attrValue;
   }
}

class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render() {}

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if(attributes && attributes.length>0) {
            for(const attr of attributes) {
                rootElement.setAttribute(attr.attrName, attr.attrValue);
            }
        }
        document.getElementById(this.hookId).append(rootElement)
        return rootElement;
    }
}

class ShoppingCart extends Component{
    items = [];
    set cartItems(value) {
        this.items = value
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;

        console.log(this.items);
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => {
            return prevValue + curItem.price
        }, 0);
        return sum;
    }
    
    constructor(renderHookId){
        super(renderHookId);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        // const cartEl = document.createElement('section')
        const cartEl = this.createRootElement('section', 'cart')
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        // cartEl.className = "cart";
        this.totalOutput = cartEl.querySelector('h2')
        // return cartEl;
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render()
    }

    addToCart() {
        App.addProductToCart(this.product)      
    }

    render() {        
        const prodEl = this.createRootElement('li', 'product-item');
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
    }
}

class ProductList extends Component{
    products = [];

    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();
    }

    fetchProducts() {
        this.products = [
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
        this.renderProducts();   
    }

    renderProducts() {
        for (const prod of this.products) {
            new ProductItem(prod, 'prod-list')      
        }
    }

    render() {
        const prodList = this.createRootElement('ul', 'product-list',
         [new ElementAttribute('id', 'prod-list')]);
        if (this.products && this.products.length > 0) {
            this.renderProducts();
        }
    }
}

class Shop extends Component {
    constructor() {
        super(); // or just call render()
    }

    render() {
        this.cart = new ShoppingCart('app');
        new ProductList('app');
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();        
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();