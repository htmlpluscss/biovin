( forms => {

	Array.from(forms, form => {

	// формы с несколькоми шагами

		const btnBack = form.querySelectorAll('.modal-step__btn-prev'),
			  fieldset = form.querySelectorAll('.modal-step__fieldset');

		if(btnBack.length) {

			Array.from(btnBack, btn => {

				btn.addEventListener('click', () => {

					const current = btn.closest('.modal-step__fieldset'),
					      prev = current.previousElementSibling;

					Array.from(fieldset, el => el.classList.toggle('hide',  prev !== el));
					current.disabled = true;

				});

			});

		}

	// отправка

		form.addEventListener('submit', event => {

			event.preventDefault();

			if(form.classList.contains('modal-step')) {

				const current = form.querySelector('.modal-step__fieldset:not(.hide)'),
					  next = current.nextElementSibling;

				if(next && next.classList.contains('modal-step__fieldset')) {

					next.disabled = false;
					next.classList.remove('hide');
					current.classList.add('hide');

					return true;

				}

			}

			const btn = form.querySelector('.form__submit');

			form.classList.add('is-loading');
			btn.disabled = true;

			fetch(form.getAttribute('action'), {
				method: 'POST',
				body: new FormData(form)
			})
			.then(response => response.json())
			.then(result => {

				console.log(result);

				form.classList.remove('is-loading');
				btn.disabled = false;

				if(result.msg) {

					form.reset();

					modal.ok(result.msg);

				}

			});

		});

	// изменение

		form.addEventListener('change', event => {

			const target = event.target;

			if(target.type === "checkbox" && target.required === true){

			//	target.classList.toggle('is-error', target.checked === false);

				form.querySelector('.form__submit').disabled = target.checked === false;

			}

		});

	});

})(document.querySelectorAll('.form'));