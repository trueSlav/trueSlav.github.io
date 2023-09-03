function tabs(tabsContentSelector, tabsParentSelector, tabsSelector, activeClass) {
	
	const tabsContent = document.querySelectorAll(tabsContentSelector),
				tabsParent = document.querySelector(tabsParentSelector),
				tabs = tabsParent.querySelectorAll(tabsSelector);

	function hideContent(){
		tabsContent.forEach(element => {
			element.classList.remove('show', 'fade');
			element.classList.add('hide');
		});

		tabs.forEach(element => {
			element.classList.remove(activeClass);
		});
	}

	function showContent(i = 0){
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
		tabs[i].classList.add(activeClass);
	}

	hideContent();
	showContent();

	tabsParent.addEventListener('click', e => {
		const target = e.target;
		if(target && target.classList.contains(tabsSelector.slice(1))){
			tabs.forEach((element, i) => {
				if(target == element){
					hideContent();
					showContent(i);
				}
			});
		}
	});
}

export default tabs;