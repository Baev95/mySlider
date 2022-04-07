import imagesNature from './images.js';
import options from './parameters.js';


let titleH3 = document.querySelector('.super-h3');
titleH3.innerHTML += `${imagesNature.length} красивейших мест на планете`;

function mySlider(options) {

    if (!imagesNature && !imagesNature.length) return;

    options = options || {
        autoLoop: true,
        arrowSlider: false,
        switchSlider: true,
        randomImage: false,
        dotsImage: true,
        titleImage: true,
    };

    const sliderImages = document.querySelector('.slider-images');
    const sliderArrow = document.querySelector('.slider-arrow');
    const sliderSwitch = document.querySelector('.slider-switch');
    const sliderDots = document.querySelector('.slider-dots');
    const ranBtmImages = document.querySelector('.randomImage');
    let nIntervalValue = null;
    creatingImages();

    if (options.switchSlider) {
        clickOnSwith(sliderSwitch, '.slider-switch_item');
    } else {
        sliderSwitch.style.display = 'none';
    }

    if (options.arrowSlider) {
        clickOnSwith(sliderArrow, '.slider-arrow_item');;
    } else {
        sliderArrow.style.display = 'none';
    }


    if (options.randomImage) {
        buttonOnRandomImage()
    } else {
        ranBtmImages.style.display = 'none';
    }

    if (options.titleImage) {
        titleImagesSlider()
    }

    if (options.autoPlayLoop) {
        onAutoPlay()
    }

    if (options.dotsImage) {
        sliderDotsImages()
    }

    function creatingImages() {
        imagesNature.forEach((image, index) => {
            let newDivWithImage = `<div class='slider-images_item n${index} ${index === 0 ? 'active' : ''}' 
            style='background-image: url(${image.url});' data-index='${index}'> </div>`;
            sliderImages.innerHTML += newDivWithImage;
        })
    }

    function clickOnSwith(item, classParametr) {
        item.querySelectorAll(classParametr).forEach((value) => {
            value.addEventListener('click', function () {
                offAutoPlay()
                let currentNumber = +sliderImages.querySelector('.active').dataset.index;
                let nextNumber;
                if (value.classList.contains('left')) {
                    if (options.autoLoop) { nextNumber = currentNumber === 0 ? imagesNature.length - 1 : currentNumber - 1; }
                    else { nextNumber = currentNumber === 0 ? 0 : currentNumber - 1; }
                } else {
                    if (options.autoLoop) { nextNumber = currentNumber === imagesNature.length - 1 ? 0 : currentNumber + 1; }
                    else { nextNumber = currentNumber === imagesNature.length - 1 ? imagesNature.length - 1 : currentNumber + 1; }
                }
                slideMovement(nextNumber);
                onAutoPlay()
            })
        })
    }

    function sliderDotsImages() {
        imagesNature.forEach((image, index) => {
            let newDivDots = `<div class='slider-dots_item n${index} ${index === 0 ? 'active' : ''}' 
        data-index='${index}'> </div>`;
            sliderDots.innerHTML += newDivDots;
        })
        sliderDots.querySelectorAll('.slider-dots_item').forEach((dot) => {
            dot.addEventListener('click', function () {
                offAutoPlay();
                slideMovement(this.dataset.index);
                onAutoPlay();
            })
        })

    }

    function buttonOnRandomImage() {
        ranBtmImages.addEventListener('click', function () {
            offAutoPlay();
            let nextNumber = Math.ceil(Math.random() * imagesNature.length - 1)
            while (nextNumber == sliderImages.querySelector('.active').dataset.index) {
                nextNumber = Math.ceil(Math.random() * imagesNature.length - 1);
            }
            slideMovement(nextNumber)
            onAutoPlay();
        })
    }

    function titleImagesSlider() {
        let newTitle = `<div class='slider-images_title'>${imagesNature[0].title}</div>`
        sliderImages.innerHTML += cropTitle(newTitle, 55);
    }

    function changeTitle(num) {
        if (!imagesNature[num].title) return;
        let sliderTitle = sliderImages.querySelector('.slider-images_title');
        sliderTitle.innerText = cropTitle(imagesNature[num].title, 55)
    }

    function cropTitle(title, size) {
        if (title.length <= size) {
            return title
        } else {
            return title.slice(0, size) + '...'
        }
    }

    function slideMovement(nextNumber) {
        sliderImages.querySelector('.active').classList.remove('active');
        sliderImages.querySelector(`.n${nextNumber}`).classList.add('active');
        if (options.dotsImage == true) {
            sliderDots.querySelector('.active').classList.remove('active');
            sliderDots.querySelector(`.n${nextNumber}`).classList.add('active');
        }
        changeTitle(nextNumber)
    }

    function offAutoPlay() {
        clearInterval(nIntervalValue);
        nIntervalValue = null;
    }

    function onAutoPlay() {
        if (!nIntervalValue) {
            nIntervalValue = setInterval(autoPlay, options.timeAutoPlay);
        }
    }

    function autoPlay() {
        let currentNumber = +sliderImages.querySelector('.active').dataset.index;
        let nextNumber;
        nextNumber = currentNumber === imagesNature.length - 1 ? 0 : currentNumber + 1;
        slideMovement(nextNumber)
    };
}



document.addEventListener('DOMContentLoaded', function () {
    mySlider(options)
})
