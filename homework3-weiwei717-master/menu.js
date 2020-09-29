class Menu
{
  constructor(containerElement, title)
  {
    this.containerElement = containerElement.querySelector('#choices');
    this.title = title;
    this.index = -1;

    this.Main_show = this.Main_show.bind(this);

    this.div_elem = document.createElement('div');
    this.div_elem.textContent = this.title;
    this.div_elem.addEventListener('click', this.Main_show);
    this.containerElement.append(this.div_elem);
  }

  Main_show()
  {
    this.index = FLASHCARD_DECKS.map(function(item) {
      return item.title;
    }).indexOf(this.title);

    document.dispatchEvent(new CustomEvent('main_show', {
      detail: {
        index: this.index
      }}));
  }
}
