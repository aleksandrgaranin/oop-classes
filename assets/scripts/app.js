
const productList = {
    products: [
        {
            title: 'A pillow',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.yimg.com%2Faah%2Fyhst-72531153481428%2Fpillowtex-reg-luxury-down-and-feather-pillow-40.gif&f=1&nofb=1',
            price: 19.99,
            description: 'A super soft pillow'
        },
        {
            title: 'A Carpet',
            imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjabrocarpetone.com%2Fwp-content%2Fuploads%2F2016%2F05%2FIMG_9206-800x533.jpg&f=1&nofb=1',
            price: 89.99,
            description: 'A super soft Carpet'
        }
    ],
    render(){
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for(const prod of this.products){
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item'
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl)
        }
        renderHook.append(prodList)
    }
};

productList.render()