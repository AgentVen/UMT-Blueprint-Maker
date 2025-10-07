console.log("Started")


const menuItems = document.querySelectorAll('.menu-list-item');


function menuSelected(index) {
	let isAMenuSelected = false;

	menuItems.forEach((element, i) => {
		const isSelected = element.classList.contains('selected');

		if (!isSelected && i === index) {
			element.classList.add('selected');
			isAMenuSelected = true;
		} else {
			element.classList.remove('selected');
		}
	});
	
	return isAMenuSelected;
}

function getSelectedMenu() {
	
	menuItems.forEach((element) => {
		if (element.classList.contains('selected')) {
			return element;
		}
	});

	return null;
}


window.addEventListener('DOMContentLoaded', () => {

	// Menu list selection logic

	let isAMenuSelected = false;
	menuItems.forEach((element, i) => {

		element.addEventListener('click', () => {
			isAMenuSelected = menuSelected(i);
		});

		// [TODO][FIXME]
		element.addEventListener('mouseenter', () => {
			const theSelectedMenu = getSelectedMenu();

			if (theSelectedMenu !== null && theSelectedMenu !== this) {
				isAMenuSelected = menuSelected(i);
			}
		});
	});
	
	// Deselect all if we didn't click on a menu
	document.addEventListener('click', () => {
		if (!isAMenuSelected) {
			menuSelected(-1);
		} else {
			isAMenuSelected = false;
		}
	});
	
});