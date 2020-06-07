class Slider {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.index = 0;
    }
    init() {
        this.renderUI();
        this.evenClickHandler();
    }
    renderUI() {
        let list = this.data.map((item, index) => {
            return `
             <li class="slider-list-item">
                <img src="${item.src}"/>
                <div class="title">${item.title}</div>
                <div class="desc">${item.desc}</div>
                <div class="price">￥${item.price}
                   <del>${item.oldPrice}</del>
                </div>
             </li>
          `
        }).join("");

        let html = `
           <div class="left">
             <img src="./img/01.png" alt="">
           </div>
           <div class="right">
            <div class="slider">
               <div class="swiper-controls">
                <span class="prev">&lt;</span>
                <span class="next">&gt;</span>
               </div>
               <ul class="slider-list">${list}</ul>
             </div>
           </div>
        `
        this.root = $(`<div class='box'>${html}<div>`);
        $("body").append(this.root);
    }
    evenClickHandler() {
        $(".next").click(() => {
            this.index++;
            if (this.index >= 20) {
                this.index = 19;
                return;
            }
            $("ul").animate({
                "left": -(this.index) * 250 * 4
            }, 1000);

        });
        $(".prev").click(() => {
            this.index--;
            if (this.index <= -1) {
                this.index = 0;
                return;
            }
            $("ul").animate({
                "left": -(this.index) * 250 * 4
            }, 1000);

        });
    }
}