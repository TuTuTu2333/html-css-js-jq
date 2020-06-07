class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.index = 0;
        this.sliderConWidth = 1200;
        this.len = this.data[0].length;
        this.timer = null;
    }
    init() {
        this.render();
        this.autoplay();
        this.eventMouseHandler();
        this.eventClickHandler();
        this.eventClickWithSliderNav();
    }
    render() {
        this.sliderBg = null;

        let imgUl = this.data[0].map(ele => {
            return `
                <li class="slider-bg-list"><img src="${ele}"/></li>
             `
        }).join("");
        let nav_list = this.data[0].map((ele, index) => {
            return `<li class="slider-nav-list"></li>`
        }).join("")
        let htmlA = `<div class="slider">
                       <ul class="slider-bg">${imgUl}</ul>
                       <div class="slider-click">
                          <div class="prev">&lt;</div>
                          <div class="next">&gt;</div>
                       </div>
                       <ul class="slider-nav">${nav_list}</ul>
                     </div>`;
        let memu = this.data[1].map((item, index) => ` <li class="memu-list">${item}</li> `).join("");
        let htmlB = `<div class="memuBox">
                       <ul class="memu-nav">${memu}<ul>
                     </div>  
        `
        let content = this.data[2].map((item, index) => {
            let ulList = item.map(ele => {
                let list = ele.map(e => {
                    return `
                    <li>
                      <div class="list-content">
                        <img src="${e.img}"/>
                        <p>${e.text}</p>
                      </div>  
                    </li>
                    `
                }).join("");

                return `<ul class="nav-content">${list}</ul>`
            }).join("");
            return `<div class="nav-list">${ulList}</div>`
        }).join("");

        let htmlC = `<div class="nav-box">${content}</div>`;

        this.root = $(`<div class="con">${htmlA+htmlB+htmlC}</div>`)
        $("body").append(this.root);
    }

    autoplay() {
        this.timer = setInterval(() => {
            this.next();
            this.root.find(".slider-nav-list").eq(this.index).addClass("nav-active").siblings().removeClass("nav-active");
        }, 2000);

    }

    //鼠标滑动事件
    eventMouseHandler() {
        this.root.mouseenter(() => clearInterval(this.timer));
        this.root.mouseleave(() => this.autoplay());

        let self = this;
        this.root.find(".memu-nav").on("mouseenter", ".memu-list", function () {
            $(this).addClass("li-active").siblings().removeClass("li-active");
            let index = $(this).index();
            self.root.find(".nav-list").eq(index).show().siblings().hide();
        });

        $(document).click(() => {
            this.root.find(".memu-list").removeClass("li-active");
            this.root.find(".nav-list").hide();
        });

        this.root.find(".memu-list").click(function (e) {
            e.stopPropagation(); //阻止事件冒泡
        })
        this.root.find(".nav-list").click(function (e) {
            e.stopPropagation();
        })

        this.root.find(".list-content").on("mouseenter", "p", function () {
            $(this).addClass("nav-list-active").parent(".list-content").parent().siblings().children().children("p").removeClass("nav-list-active");

            $(this).parent(".list-content").parent().parent().siblings().children().children().children("p").removeClass("nav-list-active");
        })

    }

    //鼠标点击事件
    eventClickHandler() {
        let self = this;
        this.root.find(".slider-click", ).on("click", function () {
            if ($(this).children("prev")) {
                self.prev();
            } else if ($(this).children("next")) {
                self.next();
            }
        });
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        $(".slider-bg").css("left", -this.index * this.sliderConWidth);
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        $(".slider-bg").css("left", -this.index * this.sliderConWidth);
    }

    eventClickWithSliderNav() {
        let self = this;
        this.root.find(".slider-nav").on("click", ".slider-nav-list", function () {
            $(this).addClass("nav-active").siblings().removeClass("nav-active");

            self.index = $(this).index();
            $(".slider-bg").css("left", -self.index * self.sliderConWidth);
        })
    }

}