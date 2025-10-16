console.log('Started');


const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

const elTopbar = header.querySelector('#topbar');
const elMenuSelector = elTopbar.querySelector('#menu-selector');
const menuSelections = elMenuSelector.querySelectorAll('.menu-selection');
const menuPanels = elMenuSelector.querySelectorAll('.menu-panel');


// Adjust scales and positions of menu panels
{
	menuPanels.forEach((menuPanel, i) => {

		// Adjust the min-widths of each .menu-panel to match the width of their corresponding .menu-selection
		const width = menuSelections.item(i).scrollWidth;
		menuPanel.style.minWidth = `${width}px`;


		// Adjust children padding
		// 
		// The first child should have its top padding set to 0, and the last child 
		// should have its bottom padding set to 0.
		const firstItem = menuPanel.firstElementChild;
		const lastItem = menuPanel.lastElementChild;

		if (firstItem) {
			if (firstItem.classList.contains('menu-panel-item')) {
				firstItem.style.marginTop = '0';
			} else if (firstItem.classList.contains('menu-panel-section')) {
				firstItem.style.paddingTop = '0';
				firstItem.firstElementChild.style.marginTop = '0';
			}

			lastItem.style.paddingBottom = '0';
		}

		// If last child is a .menu-panel-section then set bottom border to 0
		if (lastItem && lastItem.classList.contains('menu-panel-section')) {
			lastItem.style.borderBottom = '0';
		}
	});
}

/**
 * Sets the selected menu.
 * 
 * 0 repersents the first menu, while -1 repersent no menu.
 * 
 * No more than one menu can be selected at a time, selecting a menu will automaticly 
 * deselect any selected menu. Though -1 does not repersent a menu, it still repersents 
 * a selection, and thus will deselect any selected menus.
 * @param {number} index A integer from -1 to total number of menus minus 1.
 * @returns {boolean} Wheather or not a menu was actually selected.
*/
function setSelectedMenu(index) {
	let wasAMenuSelected = false;

	menuSelections.forEach((menuSelection, i) => {
		const menuPanel = menuPanels.item(i);
		const isSelected = menuSelection.classList.contains('selected');

		if (!isSelected && i === index) {
			menuSelection.classList.add('selected');
			if (menuPanel) { menuPanel.classList.add('opened'); }

			wasAMenuSelected = true;
		} else {
			menuSelection.classList.remove('selected');
			if (menuPanel) { menuPanel.classList.remove('opened'); }
		}
	});
	
	return wasAMenuSelected;
}

/*function getSelectedMenu() {
	menuList.forEach((menuListItem) => {
		if (menuListItem.classList.contains('selected')) {
			return menuListItem, i;
		}
	});

	return null, -1;
}*/

// Menu selection logic
{
	let wasAMenuElementClicked = false;

	// First, setup a "click" event listener for each .menu-selection
	menuSelections.forEach((menuSelection, i) => {
		menuSelection.addEventListener('click', () => {
			wasAMenuElementClicked = setSelectedMenu(i);
		});
	});

	// Second, setup "click" event listeners for each .menu-panel-item
	menuPanels.forEach((menuPanel, i) => {
		const menuPanelItems = menuPanel.querySelectorAll('.menu-panel-item');

		menuPanelItems.forEach((menuPanelItem, ii) => {
			menuPanelItem.addEventListener('click', () => {
				console.log(`${menuPanelItem.id} clicked`); //TODO))

				wasAMenuElementClicked = true;
			});
		});
	});

	// Last, Event listener for entire document
	// 
	// If no kind of menu element was intracted with on this click,
	// then deselect any selected menu. Otherwise, reset 
	// wasAMenuElementClicked back to false for the next click.
	document.addEventListener('click', () => {
		if (!wasAMenuElementClicked) {
			setSelectedMenu(-1);
		} else {
			wasAMenuElementClicked = false;
		}
	});
}


//window.addEventListener('DOMContentLoaded', () => {
//});