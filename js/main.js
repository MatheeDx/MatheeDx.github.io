document.addEventListener('DOMContentLoaded', ()=>{
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
            elemTranslate(sun, deltaX, deltaY, 5, 0);
        }
    });
})