console.log('Started');


const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

const topbar = header.querySelector('#topbar');
const menuList = topbar.querySelectorAll('.menu-list-item');
const menuPanelContainer = header.querySelector('#menu-panel-container');
const menuPanels = menuPanelContainer.querySelectorAll('.menu-panel');


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

	document.getElementById('menu-panel-container').style.width = `${document.querySelector('.menu-bar').scrollWidth}px`;

	menuPanels.forEach((menuPanel, i) => {
		const width = document.querySelector(`#menu-list-item-${i}`).scrollWidth
		menuPanel.style.minWidth = `${width}px`;
	});


	// Menu selection
	let isAMenuSelected = false;
	menuList.forEach((menuListItem, i) => {

		menuListItem.addEventListener('click', () => {
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

	
});