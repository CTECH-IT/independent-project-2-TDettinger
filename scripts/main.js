
const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_DESC_SELECTOR = '[data-image-role="desc"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-deatil';
const TINY_EFFECT_CLASS = 'is-tiny';
const TEXT = ['Unicef provides over 600 million meals to those in need each year! Making sure mouths are fed is the first step to giving hope to those in need.',
 'Giving children the ability to be happy and curious is crutial to helping them develop. Unicef sends thousands of staff and voluneeters to play with and cheer up the children.',
  'Unicef provides those in poverty with the tools they need to work their way out. School supplies are crutial to the education of the youth and Unicef is proud to help.',
   'Unicef trained staff help children learn where they otherwise would not be able to. Education is key to creating a better future and enabling the potential of these humans.',
    'Respect is huge at Unicef. Everyone is born human and where you come from is not your choice, so everyone is treated with dignity and respect. Unicef is proud to uplift those who are struggling in life.'];

function setDetails(imageUrl, titleText, titleDescription) {
    'use strict'
    let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR)
    detailImage.setAttribute('src' , imageUrl);

    let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
    
    let detailDesc = document.querySelector(DETAIL_DESC_SELECTOR);
    detailDesc.textContent = titleDescription;
 }

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url')
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), textFromThumb(thumbnail));
}

function textFromThumb(thumbnail) {
    'use strict';
    let index = parseInt(thumbnail.getAttribute('link-index'));
    return TEXT[index];
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    let thumbnailArray = [].slice.call(thumbnails);  //convert nodelist to array
    return thumbnailArray
}

function initializeEvents() {
    'use strict';
    let thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    let frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY_CODE) {
            hideDetails();
        }
    });
}

initializeEvents();