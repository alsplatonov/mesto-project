export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.#renderedItems = items ;
    this.#renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    
    this.#container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.#renderedItems.forEach(item => this.#renderer(item))
  }

  addItem(element) {
    this.#container.append(element);
  }
}