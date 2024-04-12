document.addEventListener('DOMContentLoaded', ()=>{
    //это красивый фон хедера
    let header = document.getElementById('header-bg');
    let ferz = document.getElementById('ferz');
    let korol = document.getElementById('korol');
    let city = document.getElementById('city');
    let kon = document.getElementById('kon');
    let peshka = document.getElementById('peshka');
    
    function elemTranslate(elem, x, y, xMod, yMod){
        elem.style.transform = "translate(" + x*xMod + "px, " + y*yMod + "px)";
    };

    header.addEventListener('mousemove', (event) => {
        
        let headerH = header.offsetHeight;
        let headerW = header.offsetWidth;
        let deltaY =  event.clientY / headerH;
        let deltaX =  event.clientX / headerW;

        if(isFinite(deltaY) && isFinite(deltaX)){
            //1 layer
            elemTranslate(kon, deltaX, deltaY, 15, 15);
            elemTranslate(peshka, deltaX, deltaY, 15, 7);

            //2 layer
            elemTranslate(city, deltaX, deltaY, 10, 0);

            //3 layer
            elemTranslate(ferz, deltaX, deltaY, 8, 3);
            elemTranslate(korol, deltaX, deltaY, 8, 7);
            
            //4 layer   
            elemTranslate(sun, deltaX, deltaY, 1, 0);
        }
    });

    let line1string1 = document.getElementById('string1');
    let line1string1X = line1string1.offsetLeft;
    let line1string2 = document.getElementById('string2');
    let line1string2X = line1string2.offsetLeft;
    let line2string1 = document.getElementById('string3');
    let line2string1X = line1string1.offsetLeft;
    let line2string2 = document.getElementById('string4');
    let line2string2X = line1string2.offsetLeft;
    
    
    //Бегущая строка
    function lineStep(elem, x) {  
        if(x <= -line1string1.offsetWidth){
            x = line1string1.offsetWidth;
        } else {
            x -= 2;
        }
        elem.style.transform = 'translateX(' + (x - elem.offsetLeft) + 'px)';
        window.requestAnimationFrame(() => lineStep(elem, x));
    }
    window.requestAnimationFrame(() => lineStep(line1string1, line1string1X));
    window.requestAnimationFrame(() => lineStep(line1string2, line1string2X));
    window.requestAnimationFrame(() => lineStep(line2string1, line2string1X));
    window.requestAnimationFrame(() => lineStep(line2string2, line2string2X));
})

//Это галерея членов
class membersGal {
    constructor(id) {
        this.viewport = document.getElementById(id);
        this.slider = this.viewport.children[0];
        this.length = this.slider.childElementCount;
        this.membersList = [];
        this.width = this.slider.offsetWidth + parseFloat(window.getComputedStyle(this.slider).gap);
        this.counter = document.getElementById('Gal__counter');
        this.counter.innerHTML = 1;
        document.getElementById('Gal__lenght').innerText = this.length;

        this.step = this.slider.children[0].offsetWidth + parseFloat(window.getComputedStyle(this.slider).gap);
        
        //DOM
        this.slider.style.paddingRight = window.getComputedStyle(this.slider).gap;

        this.sliders = [
            [this.viewport.insertBefore(this.slider.cloneNode(1), this.viewport.firstChild), -this.width, 0],
            [this.slider, 0, this.width],
            [this.viewport.appendChild(this.slider.cloneNode(1)), this.width, this.width * 2]
        ];

        this.sliders.forEach(el => {
            el[0].style.transform = 'translateX(' + (el[1] - el[2]) + 'px)';
        })

        for (let child of this.slider.children) {
            this.membersList.push(child);
        }

        this.sliders.forEach(el => {
            el[0].classList.add('gal__list__active');
        })

        this.autoSlider = setInterval(() => this.nextSlide(), 4000);
    }

    nextSlide() {
        this.sliders.forEach(el => {
            el[1] -= this.step;
            this.controller(el);
            this.mover(el);
            setTimeout(() => el[0].classList.add('gal__list__active'), 700)
        })
    }

    prevSlide() {
        this.sliders.forEach(el => {
            el[1] += this.step;
            this.controller(el);
            this.mover(el);
            setTimeout(() => el[0].classList.add('gal__list__active'), 700)
        })
    }
    controller(el) {
            if (el[1] <= -this.width * 2){
                el[1] = this.width;
                el[0].classList.remove('gal__list__active');
            }
            else if (el[1] >= this.width * 2){
                el[1] = -this.width;
                el[0].classList.remove('gal__list__active');
            }
    }
    mover(el) {
        el[0].style.transform = 'translateX(' + (el[1] - el[2]) + 'px)';
    }
}