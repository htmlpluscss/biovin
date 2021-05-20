( swiperContainer => {

	if(!swiperContainer.length) {

		return;

	}

	Array.from(swiperContainer, swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeControls = document.createElement('div'),
			  swipeNav = document.createElement('div'),
			  swipeBtns = document.createElement('div'),
			  swipeNext = document.createElement('button'),
			  swipePrev = document.createElement('button'),
			  scrollbar = swipe.parentNode.querySelector('.swiper-scrollbar'),
			  items = swipe.querySelectorAll('.swiper-slide'),
			  count = items.length,
			  main = swipe.classList.contains('swiper-container--main'),
			  cards = swipe.classList.contains('swiper-container--cards'),
			  product = swipe.classList.contains('swiper-container--product');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M9 11l4.6-4.6A.99.99 0 1115 7.8l-3.9 3.9 3.9 3.9a.99.99 0 01-1.4 1.4L9 12.41A1 1 0 019 11z"/></svg>';
		swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M15 11a1 1 0 010 1.4L10.4 17A.99.99 0 019 15.6l3.9-3.9L9 7.8a.99.99 0 011.4-1.4L15 11z"/></svg>';

		swipeBtns.appendChild(swipePrev);
		swipeBtns.appendChild(swipeNext);
		swipeControls.appendChild(swipeBtns);
		swipeControls.appendChild(swipeNav);

		resetSwipe = () => {

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

			swipeNav.classList.add('hide');
			swipeBtns.classList.add('hide');
			swipeControls.classList.add('hide');

			swipe.parentNode.classList.remove('swiper-container-style');

		}

		if (cards) {

			toggleSwipe = () => {

				toggleSwipe = false;

				if( window.innerWidth < 768 && count == 1 ) {

					return;

				}

				else if( window.innerWidth < 1250 && count < 3 ) {

					return;

				}

				else if ( window.innerWidth >= 1250 && count <= 3 ) {

					return;

				}

				swipe.parentNode.appendChild(swipeControls);

				swipe.parentNode.classList.add('swiper-container-style');

				new Swiper(swipe, {
					loop: true,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						el: swipeNav,
						bulletClass: 'button',
						bulletActiveClass: 'is-active'
					},
					breakpoints: {
						320: {
							slidesPerView: 1
						},
						768: {
							slidesPerView: 2
						},
						1250: {
							slidesPerView: 3
						}
					}
				});

			}

		}

		if (main) {

			toggleSwipe = () => {

				toggleSwipe = false;

				const title = document.head.querySelector('title');

				mySwipe = new Swiper(swipe, {
					loop: true,
					simulateTouch: false,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					on: {
						progress : () => {

							swipe.classList.add('is-blur');

						},
						slideChange : () => {

							if(mySwipe) {

								title.textContent = swipe.swiper.slides[swipe.swiper.activeIndex].querySelector('.main-swiper__title').textContent;

							}

						}
					}
				});

			}

		}

		if (product) {

			toggleSwipe = () => {

				resetSwipe();

				swipe.parentNode.classList.add('swiper-container-style');
				swipeControls.classList.remove('hide');

				if(window.innerWidth < 768) {

					swipe.appendChild(swipeControls);

					swipeNav.classList.remove('hide');

					mySwipe = new Swiper(swipe, {
						loop: true,
						pagination: {
							el: swipeNav,
							bulletClass: 'button',
							bulletActiveClass: 'is-active'
						}
					});

				}
				else {

					swipe.parentNode.appendChild(swipeControls);

					swipeBtns.classList.remove('hide');

					let initialSlide = 0;

					Array.from(items, (el,index) => {

						if(el.classList.contains('is-current')) {

							initialSlide = index;

						}

					});

					const box = swipe.closest('.product-gallery'),
						  big = box.querySelectorAll('.product-gallery__big-item');

					mySwipe = new Swiper(swipe, {
						loop: true,
						direction: 'vertical',
						slidesPerView: 4,
						spaceBetween: 32,
						slideActiveClass: 'is-current',
						slideToClickedSlide: true,
						initialSlide: initialSlide,
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						on: {
							slideChange : () => {

								Array.from(big, (img,index) => img.classList.toggle('hide', swipe.swiper.realIndex !== index));

							}
						}
					});

				}

			}

		}

		PubSub.subscribe('windowWidthResize', () => {

			if (window.Swiper && toggleSwipe) {

				toggleSwipe();

			}

		});

		PubSub.subscribe('swiperJsLoad', () => {

			swipe.appendChild(swipeControls);

			// eager
			Array.from(swipe.querySelectorAll('[loading="lazy"]'), img => img.setAttribute('loading','eager'));

			// hide
			Array.from(items, el => el.classList.remove('hide'));

			toggleSwipe();

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper.min.js';

	script.onload = () => PubSub.publish('swiperJsLoad');

	setTimeout( () => document.head.appendChild(script), Cookies.get('fastLoadScript') ? 0 : 10000);

})(document.querySelectorAll('.swiper-container'));