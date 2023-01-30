export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items ;
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.append(element);
  }
}