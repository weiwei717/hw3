// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen
{
  constructor(containerElement)
  {
    this.containerElement = containerElement;
    this.menus = [];
    this.menu_create();
  }

  show()
  {
    this.containerElement.classList.remove('inactive');
  }

  hide()
  {
    this.containerElement.classList.add('inactive');
  }
  menu_create() 
  {
    for(const source of FLASHCARD_DECKS)
    {
      const menu = new Menu(this.containerElement, source.title);
      this.menus.push(menu);
    }
  }
}
