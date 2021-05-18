// btn toggle

	document.querySelector('.btn-menu-toggle').addEventListener('click', event => document.body.classList.toggle('menu-show'));

// sub

( sub => {

	Array.from(sub, link => {

		link.addEventListener('click', event => {

			event.preventDefault();

			link.closest('.menu__item--sub').classList.toggle('is-open');

		});

	});

})(document.querySelectorAll('.menu__item--sub > .menu__link'));

// bg menu

( header => {

	if(!header) {

		return;

	}

	const bg = document.createElement('div'),
		  menu = header.querySelector('.header__menu');

	bg.className = 'header__bg-menu';

	header.appendChild(bg);

	if(menu) {

		const parentMenu = menu.querySelectorAll('.menu__item--sub');

		let sub = null,
			delta = null,
			hover = false;

		const draw = () => {

			window.requestAnimationFrame( () => {

				const h = sub.clientHeight;

				if(hover === false && h === 0) {

					bg.style.height = 0;

				}
				else {

					bg.style.height = (h - delta) + 'px';
					draw();

				}

			});

		}

		Array.from(parentMenu, el => {

			el.addEventListener('mouseenter', () => {

				sub = el.querySelector('.menu__sub');
				hover = true;
				delta = menu.offsetTop;
				draw();

			});

			el.addEventListener('mouseleave', () => hover = false);

		});

	}

})(document.querySelector('.header'));