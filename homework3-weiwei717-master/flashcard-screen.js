// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen
{
  constructor(containerElement)
  {
    this.containerElement = containerElement;
    this.index = 0;
    this.total = 0;
    this.cards = [];
    this.This_Card = null;
    this.count_Right = 0;
    this.count_Wrong = 0;


    this.draw = this.draw.bind(this);
    this.dragging = this.dragging.bind(this);
    this.dragged = this.dragged.bind(this);

    document.addEventListener('dragging', this.dragging);
    document.addEventListener('dragged', this.dragged);
  }

  show(event)
  {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const rightContainer = this.containerElement.querySelector('.status .correct');
    const wrongContainer = this.containerElement.querySelector('.status .incorrect');
    rightContainer.textContent =  this.count_Right;
    wrongContainer.textContent =  this.count_Wrong;
    this.index = event.detail.index;
    if(this.total === 0)
    {
      const deck = FLASHCARD_DECKS[this.index].words;
      const word = Object.keys(deck);
      this.total = word.length;
      for(let i=this.total-1; i>=0; i--)
      {
        const card = new Flashcard(flashcardContainer,  word[i], deck[word[i]]);
        this.cards.push(card);
      }
    }
    this.draw();
  }
  hide()
  {
    this.containerElement.classList.add('inactive');
  }
  draw()
  {
    if(this.totalCards !== 0)
    {
      this.This_Card = this.cards.pop();
      this.This_Card.show();
      this.total--;
    }
  }
  dragging(event)
  {
    const rightContainer = this.containerElement.querySelector('.status .correct');
    const wrongContainer = this.containerElement.querySelector('.status .incorrect');
    rightContainer.textContent =  this.count_Right + event.detail.right;
    wrongContainer.textContent =  this.count_Wrong + event.detail.wrong;
  }
  dragged(event)
  {
    this.count_Right = this.count_Right + event.detail.right;
    this.count_Wrong = this.count_Wrong + event.detail.wrong;
    this.This_Card.hide();
    if(event.detail.wrong === 1)
    {
      this.cards.splice(0,0,this.This_Card);
    }

    if(this.total === 0)
    {
      document.dispatchEvent(new CustomEvent('result_show', {
        detail: {
          right: this.count_Right,
          wrong: this.count_Wrong,
          index: this.index
        }}));
      this.total = this.count_Wrong;
      this.count_Wrong = 0;
    }
    else
    {
      this.draw();
    }
  }
  reset()
  {
    for(let i=0; i<this.totalCards; i++)
    {
      this.cards.pop();
    }
    this.index = 0;
    this.total = 0;
    this.count_Right = 0;
    this.count_Wrong = 0;
  }
}
