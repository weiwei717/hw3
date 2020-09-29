// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen
{
  constructor(containerElement)
  {
    this.containerElement = containerElement;
    this.index = 0;

    this.toMain = this.toMain.bind(this);
    this.reMain = this.reMain.bind(this);

    const to_menu = containerElement.querySelector('.menu-buttons .to-menu');
    to_menu.addEventListener('click', this.toMenu);

  }

  show(event)
  {
    this.containerElement.classList.remove('inactive');
    const percent = this.containerElement.querySelector('.percent');
    const correct = this.containerElement.querySelector('.correct');
    const incorrect = this.containerElement.querySelector('.incorrect');
    const conti = this.containerElement.querySelector('.menu-buttons .continue');

    const result = Math.round(event.detail.right/(event.detail.right + event.detail.wrong)*100);
    percent.textContent = result;
    correct.textContent = event.detail.right;
    incorrect.textContent = event.detail.wrong;
    if(event.detail.wrong != 0)
    {
      conti.textContent = 'Continue';
      conti.removeEventListener('click', this.reMain);
      conti.addEventListener('click', this.toMain);
    }
    else
    {
      conti.textContent = 'Start over?';
      conti.removeEventListener('click', this.toMain);
      conti.addEventListener('click', this.reMain);
    }

  }

  hide()
  {
    this.containerElement.classList.add('inactive');
  }
  toMenu()
  {
    document.dispatchEvent(new CustomEvent('menu_show'));
  }

  toMain()
  {
    document.dispatchEvent(new CustomEvent('main_show', {
      detail: {
        index: this.index
      }}));
  }

  reMain()
  {
    document.dispatchEvent(new CustomEvent('remain', {
      detail: {
        index: this.index
      }}));
  }
}
