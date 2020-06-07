class Manager {
    constructor(data) {
        this.data = data;
        this.root = null;
        this.timer = null; //定时器
        this.index = 0; //定义当前图片的是第几张
        this.len = this.data.length; //图片的总张数
        this.sliderBoxItemWidth = 700; //图片盒子的宽度
        this.sliderBox = null;
        this.sliderNav = null;
    }
    init() {
        this.renderUI();
        this.setEleStyle();
        this.autoPlayer();
        this.eventMouseHandler();
        this.eventClickHandler();
        this.eventClickWithSliderNav();
    }

    //渲染页面
    renderUI() {
        this.root = document.createElement("div")
        this.root.className = "slider";

        //图片
        let imgBox = this.data.map((item, index) =>
            `<li class="slider-box-item">
              <img src="${item}"/>
            </li>`
        ).join("");
        let htmlA = `<ul class="slider-box">${imgBox}</ul>`;

        //按钮(上一张/下一张)
        let htmlB = `
           <div class="slider-control">
             <span class="prev">&lt</span>
             <span class="next">&gt</span>
           </div>
        `
        //小图标
        let nav = this.data.map((item, index) =>
            `<li data-index=${index} class="slider-nav-item ${index==0?"active":""}">${index+1}</li>`
        ).join("");
        let htmlC = `<ol class="slider-nav">${nav}</ol>`

        this.root.innerHTML = htmlA + htmlB + htmlC;
        document.body.appendChild(this.root);
        this.sliderBox = this.root.querySelector(".slider-box");
        this.sliderNav = this.root.querySelector(".slider-nav");
    }

    //获取随机背景颜色
    getRandomColor() {
        let r = parseInt(Math.random() * 256);
        let g = parseInt(Math.random() * 256);
        let b = parseInt(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }
    setEleStyle() {
        let lis = this.root.querySelectorAll(".slider-box-item");
        let arr = Array.from(lis);
        arr.forEach(ele =>
            ele.style.background = this.getRandomColor());
    }

    //图片自动播放
    autoPlayer() {
        //核心：定时器+设置ul标签的样式（left）ul标签移动
        // let ul = this.root.querySelector(".slider-box");
        this.timer = setInterval(() => this.next(), 1000)
    }

    //当鼠标移入时，停止定时器，离开时恢复定时器
    eventMouseHandler() {
        this.root.onmouseenter = () => clearInterval(this.timer);
        this.root.onmouseleave = () => this.autoPlayer();
    }

    //点击按钮实现上一步/下一步的功能
    eventClickHandler() {
        let sliderControl = this.root.querySelector(".slider-control");
        //事件委托
        sliderControl.onclick = (e) => {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.className == "prev") { //上一张
                this.prev();
            } else if (target.className == "next") { //下一张
                this.next();
            }
        }
    }
    prev() {
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchNavItem();
    }
    next() {
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchNavItem();
    }
    eventClickWithSliderNav() {
        // let sliderNav = this.root.querySelectorAll(".slider-nav-item");
        // let self = this;
        // sliderNav = Array.from(sliderNav);
        // sliderNav.forEach((item, i) => {
        //     item.onclick = function () {
        //         self.index = i;
        //         sliderNav.forEach((e) => {
        //             e.classList.remove("active");
        //         });
        //         this.classList.add("active");
        //         self.sliderBox.style.left = -self.index * self.sliderBoxItemWidth + "px";
        //     }
        // })

        //事件委托
        // this.sliderNav.onclick = (e) => {
        //     e = e || window.event;
        //     let target = e.target || e.srcElement;
        //     this.index = target.dataset.index;
        //     if (target.nodeName == "LI") {
        //         Array.from(this.sliderNav.children).forEach(item => item.classList.remove("active"))
        //         target.classList.add("active");
        //         this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        //     }
        // }

        Array.from(this.sliderNav.children).forEach((ele, index) => {
            ele.onclick = () => {
                this.index = index;
                this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
                this.switchNavItem();
            }
        })
    }
    switchNavItem() {
        Array.from(this.sliderNav.children).forEach(ele => {
            ele.classList.remove("active");
        })
        this.sliderNav.children[this.index].classList.add("active");
    }

}