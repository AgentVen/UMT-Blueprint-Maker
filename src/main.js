console.log("Started")


window.addEventListener('DOMContentLoaded', () => {
	const menuItems = document.querySelectorAll('.menu-list-item');

	menuItems.forEach((element) => {
		const button = element.querySelector('.menu-button');

		button.addEventListener('click', () => {
			if (!button.classList.contains('selected')) {
				button.classList.add('selected');
			} else {
				button.classList.remove('selected');
			}
		});
	});
	
});