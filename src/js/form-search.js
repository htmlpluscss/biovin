( form => {

	if(!form) {

		return;

	}

	window.addEventListener("click", () => {

		if (event.target.closest('.form-search')) {

			document.body.classList.add('form-search-show');

			setTimeout( () => form.querySelector('.form-search__input').focus(), 1 );

		}
		else {

			document.body.classList.remove('form-search-show');

		}

	});

})(document.querySelector('.form-search'));