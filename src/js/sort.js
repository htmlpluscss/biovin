( form => {

	if(!form) {

		return;

	}

	form.addEventListener('change', () => {

		form.classList.add('is-loading');

		fetch(form.getAttribute('action'), {
			method: 'POST',
			body: new FormData(form)
		})
		.then(response => response.html())
		.then(result => {

			console.log(result);

			form.classList.remove('is-loading');

		});

	});

	window.addEventListener("click", event => {

		form.classList.toggle('sort--open', event.target.closest('.sort__btn') && form.classList.contains('sort--open') === false);

	});

})(document.querySelector('.sort'));