console.log("Started")


const menuItems = document.querySelectorAll('.menu-list-item');


function menuSelected(index) {
	menuItems.forEach((element, i) => {
		const button = element.querySelector('.menu-button');

		const isSelected = button.classList.contains('selected');
		if (!isSelected && i === index) {
			button.classList.add('selected');
			selectionMade = index;
		} else {
			button.classList.remove('selected');
		}
	});
}


window.addEventListener('DOMContentLoaded', () => {

	menuItems.forEach((element, i) => {
		const button = element.querySelector('.menu-button');

		button.addEventListener('click', () => {
			menuSelected(i);
		});
	});
	
});