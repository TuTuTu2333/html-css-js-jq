class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.index = 0;
    }
    init() {
        this.renderUI();
        this.eventMouseHanlder();
    }
    renderUI() {
        let types = this.data.types.map((item, i) => {
            return `
                <li class=${i==0?"active":""}>${item}</li>
              `
        }).join("")
        let data = this.data.data.map((item, i) => {
            let li = item.map((e, j) => {
                return `
                      <li class="list-item">
                          <img src="${e.src}"/>
                          <h3 class="title">${e.title}</h3>
                          <p class="desc">精选原生竹浆，健康环保</p>
                          <p class="price">${e.price}</p>
                      </li>
                    `
            }).join("")
            return `
                <ul class="list ${i==0?"current":""}">${li}</ul>
             `
        }).join("")
        let html = `
               <div class="box">
                 <div class="box-header">
                    <h2 class="title">${this.data.title}</h2>
                    <ul class="box-header-list">
                      ${types}
                    </ul>
                 </div>
                 <div class="box-content">
                  <div class="left">
                    <li><img src="${this.data.srcA}"/></li>
                    <li><img src="${this.data.srcB}"/></li>
                  </div>
                  <div class="right">
                     ${data}
                  </div>
                 </div>
               </div>
            `
        this.root = $(html);
        $("body").append(this.root);
    }
    eventMouseHanlder() {
        let self = this;
        this.root.find(".box-header-list").on("mouseenter", "li", function () {
            self.index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            self.root.find(".list").eq(self.index).addClass("current").siblings().removeClass("current");
        })
    }
}