export default class Section {
  #renderedItems;
  #renderer;
  #container;
  constructor({ renderer }, containerSelector) {
    // this.#renderedItems = items ;
    this.#renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    
    this.#container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.#renderedItems.forEach(item => this.#renderer(item, this._id))
  }

  addItemPrepend(element) {
    this.#container.prepend(element);
  }
  addItemAppend(element) {
    this.#container.append(element);
  }

  setItem(items, id) {  //items изначально пуст
		this.#renderedItems = items;
    this._id = id;
	}
}