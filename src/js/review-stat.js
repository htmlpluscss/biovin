( stat => {

	if(!stat) {

		return;

	}

	if ('IntersectionObserver' in window) {

		const callback = (entries, observer) => {

			Array.from(entries, entry => {

				if(entry.isIntersecting) {

					const target = entry.target;

					observer.unobserve(target);

					let total = 0;

					Array.from(stat.querySelectorAll('.review-stat__details-value'), value => total += parseInt(value.textContent));

					Array.from(stat.querySelectorAll('.review-stat__details-row'), row => {

						const bar = document.createElement('span'),
							  text = row.querySelector('.review-stat__details-value'),
							  value = parseInt(parseInt(text.textContent) / total * 100);

						bar.className = 'review-stat__details-progress';
						row.appendChild(bar);

						setTimeout( () => bar.style.width = value + '%', 1000);

					});

				}

			});

		};

		const observer = new IntersectionObserver(callback);

		observer.observe(stat);

	}

})(document.querySelector('.review-stat__details'));