class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
    }
    init() {
        this.renderUI();
        this.eventMouseHandler();
    }
    renderUI() {
        this.root = document.createElement("div");
        this.root.className = "box";

        let li = this.data.map((item, index) => {
            return `
              <li class="list">
                <img src="${item.src}" alt=""/>
                <div class="price">${item.price}</div>
                <div class="name">${item.name}</div>
                <div class="hotWord">${item.hotWord}</div>
                <div class="shopName">${item.shopName}</div>
                <div class="activity">${item.activity}</div>
                <div class="collect">${item.collect}</div>
              </li>
            `
        }).join("");

        let html = `<ul class="conten">${li}</ul>`
        this.root.innerHTML = html;
        document.body.appendChild(this.root);
    }
    eventMouseHandler() {
        let list = this.root.querySelector(".conten");
        console.log(list);

        console.log(Array.from(list.children));

        Array.from(list.children).forEach((item, index) => {
            item.onmouseenter = () => {
                item.style.border = "1px solid red";
            }
            item.onmouseleave = () => {
                item.style.border = "1px solid #eee";
            }
        })

    }
}