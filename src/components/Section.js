export default class Section {
  constructor({ renderer }, containerSelector) {
    this.#renderedItems = items ;
    this.#renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    
    this.#container = document.querySelector(containerSelector);
  }

  renderItems(id) {
    this.#renderedItems.forEach(item => this.#renderer(item, id))
  }

  addItem(element) {
    this.#container.append(element);
  }

  setItem(items) {  //items изначально пуст
		this._items = items;
	}
}