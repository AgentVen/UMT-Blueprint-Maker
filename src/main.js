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
		const menuPanel = menuPanelContainer.querySelector(`#menu-panel-${i}`);
		const isSelected = menuListItem.classList.contains('selected');

		if (!isSelected && i === index) {
			menuListItem.classList.add('selected');
			menuPanel.classList.add('opened');

			isAMenuSelected = true;
		} else {
			menuListItem.classList.remove('selected');
			menuPanel.classList.remove('opened');
		}
	});
	
	return isAMenuSelected;
}

function getSelectedMenu() {
	
	menuList.forEach((menuListItem) => {
		if (menuListItem.classList.contains('selected')) {
			return menuListItem, i;
		}
	});

	return null, -1;
}


window.addEventListener('DOMContentLoaded', () => {

	// Adjust scales and positions of menu panels

	document.getElementById('menu-panel-container').style.width = `${document.querySelector('.menu-bar').scrollWidth}px`;

	let leftOffset = 0
	menuPanels.forEach((menuPanel, i) => {
		const width = document.querySelector(`#menu-list-item-${i}`).scrollWidth;
		menuPanel.style.minWidth = `${width}px`;
		
		if (leftOffset > 0) {
			menuPanel.style.marginLeft = `${leftOffset}px`
		}

		leftOffset += width
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