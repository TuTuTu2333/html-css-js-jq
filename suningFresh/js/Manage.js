class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.renderUI();
    }
    renderUI() {
        this.root = document.createElement("div");
        this.root.className = "box";

        let list = this.data.map((item, index) => {
            return `
              <li class="item">
                 <div class="item-box">
                   <img src="${item.src}" alt=""/>
                   <div class="price">${item.price}</div>
                   <div class="title">${item.title}</div>
                   <div class="dis">${item.disCount}</div>
                   <div class="shopName">${item.shopName}</div>
                 </div>
              </li>
            `
        }).join("");
        let html = `<ul class="box-list">${list}</ul>`
        this.root.innerHTML = html;
        document.body.appendChild(this.root);
    }
}