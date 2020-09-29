// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App
{
  constructor()
  {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.Menu_show = this.Menu_show.bind(this);
    this.Main_show = this.Main_show.bind(this);
    this.Result_show = this.Result_show.bind(this);
    this.reMain = this.reMain.bind(this);

    document.addEventListener('menu_show', this.Menu_show);
    document.addEventListener('main_show', this.Main_show);
    document.addEventListener('result_show', this.Result_show);
    document.addEventListener('remain', this.reMain);
  }

  Menu_show()
  {
    this.flashcards.hide();
    this.results.hide();
    this.flashcards.reset();
    this.menu.show();
  }

  Main_show(event)
  {
    this.menu.hide();
    this.results.hide();
    this.flashcards.show(event);
  }

  Result_show(event)
  {
    this.menu.hide();
    this.flashcards.hide();
    this.results.show(event);
  }

  reMain(event)
  {
    this.menu.hide();
    this.results.hide();
    this.flashcards.reset();
    this.flashcards.show(event);
  }
}
