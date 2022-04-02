// images
const imagesNature = [
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_7fa35563b639e7ce500ed9325afe6f63.jpg",
        title: 'Безутешный лес'
    },
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_e3583ce58fccac820ec4da6b53732ac5.jpg",
        title: 'Стадия пробуждения'
    },
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_373e7f9ceca112e1f35ca2b38a25da91.jpg",
        title: 'Уэльс'
    },
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_d3d67c699da1158f0abdb15a03c0edab.jpg",
        title: 'Край Земли'
    },
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_f3f8a62baafd6d865d23c713c74cbca7.jpg",
        title: 'Вода для Богов'
    },
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_e55396a7ba0f55dc6fae2c53e4b6feaa.jpg",
        title: 'Исландия'
    },
    {
        url: "https://cameralabs.org/media/camera/avgust/26avgust/53_ab9bdbccb7f18114493f5f8589e3261f.jpg",
        title: 'Радуга в Альпах'
    },

]

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

    creatingImages();

    if (options.switchSlider == true) {
        switchSliderImages();
    } else {
        sliderSwitch.style.display = 'none';
    }

    if (options.arrowSlider == true) {
        arrowSliderImages();
    } else {
        sliderArrow.style.display = 'none';
    }


    if (options.randomImage == true) {
        buttonOnRandomImage()
    } else {
        ranBtmImages.style.display = 'none';
    }

    if (options.titleImage == true) {
        titleImagesSlider()
    }

    if (options.autoPlayLoop == true) {
        autoPlay()
    }
    if (options.dotsImage == true) {
        sliderDotsImages()
    }

    function creatingImages() {
        imagesNature.forEach((image, index) => {
            let newDivWithImage = `<div class='slider-images_item n${index} ${index === 0 ? 'active' : ''}' 
            style='background-image: url(${image.url});' data-index='${index}'> </div>`;
            sliderImages.innerHTML += newDivWithImage;
        })
    }

    function switchSliderImages() {
        sliderSwitch.querySelectorAll('.slider-switch_item').forEach((switchImage) => {
            switchImage.addEventListener('click', function () {
                let currentNumber = +sliderImages.querySelector('.active').dataset.index;
                let nextNumber;
                if (switchImage.classList.contains('left')) {
                    if (options.autoLoop == true) { nextNumber = currentNumber === 0 ? imagesNature.length - 1 : currentNumber - 1; }
                    else { nextNumber = currentNumber === 0 ? 0 : currentNumber - 1; }
                } else {
                    if (options.autoLoop == true) { nextNumber = currentNumber === imagesNature.length - 1 ? 0 : currentNumber + 1; }
                    else { nextNumber = currentNumber === imagesNature.length - 1 ? imagesNature.length - 1 : currentNumber + 1; }
                }
                slideMovement(nextNumber);
            })
        })
    }

    function arrowSliderImages() {
        sliderArrow.querySelectorAll('.slider-arrow_item').forEach((arrowImage) => {
            arrowImage.addEventListener('click', function () {
                let currentNumber = +sliderImages.querySelector('.active').dataset.index;
                let nextNumber;
                if (arrowImage.classList.contains('left')) {
                    if (options.autoLoop == true) { nextNumber = currentNumber === 0 ? imagesNature.length - 1 : currentNumber - 1; }
                    else { nextNumber = currentNumber === 0 ? 0 : currentNumber - 1; }
                } else {
                    if (options.autoLoop == true) { nextNumber = currentNumber === imagesNature.length - 1 ? 0 : currentNumber + 1; }
                    else { nextNumber = currentNumber === imagesNature.length - 1 ? imagesNature.length - 1 : currentNumber + 1; }
                }
                slideMovement(nextNumber);
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
                slideMovement(this.dataset.index)
            })
        })

    }

    function buttonOnRandomImage() {

        ranBtmImages.addEventListener('click', function () {
            let nextNumber = Math.ceil(Math.random() * imagesNature.length - 1)
            while (nextNumber == sliderImages.querySelector('.active').dataset.index) {
                nextNumber = Math.ceil(Math.random() * imagesNature.length - 1);
            }
            slideMovement(nextNumber)
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

    function autoPlay() {
        setInterval(() => {
            let currentNumber = +sliderImages.querySelector('.active').dataset.index;
            let nextNumber;
            nextNumber = currentNumber === imagesNature.length - 1 ? 0 : currentNumber + 1;
            slideMovement(nextNumber)
        }, options.timeAutoPlay)
    }
}

const options = {
    autoLoop: true,
    arrowSlider: true,
    switchSlider: true,
    randomImage: true,
    dotsImage: true,
    titleImage: true,
    autoPlayLoop: true,
    timeAutoPlay: 6000,
    content: function () {
        button = true;
        text = true;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    mySlider(options)
})
