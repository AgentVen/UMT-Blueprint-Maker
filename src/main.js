console.log('Started');


const topbar = document.querySelector('#topbar');
const menuList = topbar.querySelectorAll('.menu-list-item');


function menuSelected(index) {
	let isAMenuSelected = false;

	menuList.forEach((menuListItem, i) => {
		const isSelected = menuListItem.classList.contains('selected');

		if (!isSelected && i === index) {
			menuListItem.classList.add('selected');
			isAMenuSelected = true;
		} else {
			menuListItem.classList.remove('selected');
		}
	});
	
	return isAMenuSelected;
}

function getSelectedMenu() {
	
	menuList.forEach((menuListItem) => {
		if (menuListItem.classList.contains('selected')) {
			return menuListItem;
		}
	});

	return null;
}


window.addEventListener('DOMContentLoaded', () => {

	// Menu selection
	let isAMenuSelected = false;
	menuList.forEach((menuListItem, i) => {
		const button = menuListItem.querySelector('.menu-button');

		button.addEventListener('click', () => {
			isAMenuSelected = menuSelected(i);
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

	// [FIXME]
	menuList.forEach((menuListItem) => {
		const dropdown = menuListItem.querySelector('.menu-dropdown');
		const isOpened = dropdown.classList.contains('opened');

		if (menuListItem.classList.contains('selected') && !isOpened) {
			dropdown.classList.add('opened');
		} else if (isOpened) {
			dropdown.classList.remove('opened');
		}
	});
});