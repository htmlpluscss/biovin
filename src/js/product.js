( img => {

	if(img) {

		const big = img.querySelectorAll('.product-gallery__big-item');

		img.addEventListener('click', event => {

			if(event.target.closest('.product-gallery__link')) {

				event.preventDefault();

				if(!event.target.closest('.swiper-container-style')){

					const item = event.target.closest('.product-gallery__item');

					Array.from(img.querySelectorAll('.product-gallery__item'), (el,index) => {

						el.classList.toggle('is-current', item === el);
						big[index].classList.toggle('hide', item !== el);

					});

				}

			}

		});

	}

})(document.querySelector('.product-gallery'));

( product => {

	if (product && 'IntersectionObserver' in window) {

		const btn = product.querySelector('.product__shops');

		const callback = (entries, observer) => {

			Array.from(entries, entry => btn.classList.toggle('is-hide', entry.isIntersecting));

		};

		const observer = new IntersectionObserver(callback);

		observer.observe(document.querySelector('.footer'));

	}

})(document.querySelector('.product'));