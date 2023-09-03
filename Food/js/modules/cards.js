import { getData } from "../services/services";

function cards() {

		class MenuItem {
			constructor(img, alt, subtitle, descr, total, ...classes){
				this.img = img;
				this.alt = alt;
				this.subtitle = subtitle;
				this.descr = descr;
				this.total = total;
				this.parent = document.querySelector('.menu__field .container');
				this.classes = classes;
				this.transfer = 80;
				this.transferToRUB();
			}
	
			transferToRUB(){
				this.total = this.total * this.transfer;
			}
	
			render(){
				const menuItem = document.createElement('div');
				if(this.classes.length === 0){
					this.element = 'menu__item';
					menuItem.classList.add(this.element);
				} else {
					this.classes.forEach(className => menuItem.classList.add(className));
				}
	
				menuItem.innerHTML = `				
					<img src=${this.img} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.subtitle}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.total}</span> руб/день</div>
					</div>				
				`;
	
				this.parent.append(menuItem);
			}
		}
	
		getData('http://localhost:3000/menu')
			.then(data => {
				data.forEach(({img, altimg, title, descr, price}) => {
					new MenuItem(img, altimg, title, descr, price).render();
				});
			});
}

export default cards;