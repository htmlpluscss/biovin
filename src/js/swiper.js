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
			  review = swipe.classList.contains('swiper-container--review'),
			  productGalleryPreview = swipe.classList.contains('swiper-container--gallery-preview');

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

		if (review) {

			toggleSwipe = () => {

				toggleSwipe = false;

				swipe.parentNode.appendChild(swipeControls);

				new Swiper(swipe, {
					loop: true,
					slidesPerView : 3,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
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
						slideChange : () => {

							if(mySwipe) {

								title.textContent = swipe.swiper.slides[swipe.swiper.activeIndex].querySelector('.main-swiper__title').textContent;

							}

						}
					}
				});

			}

		}

		if (productGalleryPreview) {

			toggleSwipe = () => {

				let initialSlide = 0,
					slidesPerView = 5,
					spaceBetween = 20;

				swipe.parentNode.appendChild(swipeControls);

				Array.from(items, (el,index) => {

					if(el.classList.contains('is-current')) {

						initialSlide = index;

					}

				});

				toggleSwipe = false;
				swipe.parentNode.classList.add('swiper-container-style');

				if(swipe.classList.contains('is-style-use')){

					slidesPerView = 3;
					spaceBetween = 0;

				}

				const box = swipe.closest('.swiper-gallery-preview'),
					  big = box.querySelectorAll('.swiper-gallery-preview__big-item');

				mySwipe = new Swiper(swipe, {
					loop: true,
					slideActiveClass: 'is-current',
					direction: 'vertical',
					slidesPerView : slidesPerView,
					spaceBetween: spaceBetween,
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
					},
					breakpoints: {
						320: {
							slidesPerView: 3,
							spaceBetween: 8
						},
						768: {
							slidesPerView: slidesPerView,
							spaceBetween: spaceBetween
						}
					}
				});

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