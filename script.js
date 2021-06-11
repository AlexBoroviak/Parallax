"use strict" // 'use strict'

window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax__container');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');
        const human = document.querySelector('.images-parallax__human');

        // coefficients
        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        // animation speed
        const speed = 0.05;

        // vars
        let positionX = 0;
        let positionY = 0;
        let coordXpercent = 0;
        let coordYpercent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXpercent - positionX;
            const distY = coordYpercent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            // styles
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function (e) {
            // 
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            // center
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            // %
            coordXpercent = coordX / parallaxWidth * 100;
            coordYpercent = coordY / parallaxHeight * 100;
        });

        // scroll
        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i);
        }

        const callback = function (entries, observer) {
            const scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopPercent);
        };

        const observer = new IntersectionObserver (callback, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopPercent) {
            content.style.cssText = `transform: translate(0%,-${scrollTopPercent / 10}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 5}%);`;
            human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 3}%);`;
        }
    }
}