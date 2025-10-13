console.log('Started');


const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

const elTopbar = header.querySelector('#topbar');
const elMenuSelector = elTopbar.querySelector('#menu-selector');
const menuSelections = elMenuSelector.querySelectorAll('.menu-selection');
const elMenuPanelContainer = header.querySelector('#menu-panel-container');
const menuPanels = elMenuPanelContainer.querySelectorAll('.menu-panel');



// Adjust scales and positions of menu panels
{
	// Adjust the min-width of the #menu-panel-container to that of the #menu-selector's width.
	elMenuPanelContainer.style.minWidth = `${elMenuSelector.scrollWidth}px`;

	// Adjust the left position of the #menu-panel-container so that its left edge lines up with #menu-selector's left edge
	{
		const elTopbarInnoLogo = elTopbar.querySelector('#innovation-inc-logo');
		const topbarInnoLogoComputedStyleMap = elTopbarInnoLogo.computedStyleMap();
		const marginLeft = topbarInnoLogoComputedStyleMap.get('margin-left');
		const marginRight = topbarInnoLogoComputedStyleMap.get('margin-right');
		elMenuPanelContainer.style.left = `calc(${elTopbarInnoLogo.scrollWidth}px + ${marginLeft.value}${marginLeft.unit} + ${marginRight.value}${marginRight.unit})`;
	}

	
	let leftOffset = 0
	menuPanels.forEach((menuPanel, i) => {

		// Adjust the min-widths of each .menu-panel to match the width of their 
		// corresponding .menu-selection.
		// 
		// Then add the width to an offset that will be used to apply a margin-left
		// to subsequent .menu-panels, so that their left edge is aligned with their
		// corresponding .menu-selection's left edge.
		// (this is not done for #menu-panel-0 as #menu-panel-container should be 
		// aligned with left edge of the #menu-selector)

		const width = menuSelections.item(i).scrollWidth;
		menuPanel.style.minWidth = `${width}px`;
		
		if (leftOffset > 0) {
			menuPanel.style.marginLeft = `${leftOffset}px`
		}

		leftOffset += width


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
			/*if (lastItem.classList.contains('menu-panel-section')) {
				lastItem.lastElementChild.style.paddingBottom = '0';
			}*/
		}

		// If last child is a .menu-panel-section then set bottom border to 0
		if (lastItem && lastItem.classList.contains('menu-panel-section')) {
			lastItem.style.borderBottom = '0';
		}
	});
}


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

function getSelectedMenu() {
	menuList.forEach((menuListItem) => {
		if (menuListItem.classList.contains('selected')) {
			return menuListItem, i;
		}
	});

	return null, -1;
}

// Menu selection logic
{
	let wasAMenuElementClicked = false;

	// Setup event listeners for each menu-list-item
	menuSelections.forEach((menuSelection, i) => {
		menuSelection.addEventListener('click', () => {
			wasAMenuElementClicked = setSelectedMenu(i);
		});
	});

	// Setup event listeners for each button in the menu list panel.
	menuPanels.forEach((menuPanel, i) => {
		const menuPanelItems = menuPanel.querySelectorAll('.menu-panel-item');

		menuPanelItems.forEach((menuPanelItem, ii) => {
			menuPanelItem.addEventListener('click', () => {
				console.log(`${menuPanelItem.id} clicked`); //TODO))

				wasAMenuElementClicked = true;
			});
		});
	});

	// Event listener for entire document
	// 
	// If no kind of menu element was intracted with on this click,
	// then deselect any selected menu. Otherwise, reset 
	// wasAMenuElementBeenClicked back to false for the next click.
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