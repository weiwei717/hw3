// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard
{
  constructor(containerElement, frontText, backText)
  {
    this.containerElement = containerElement;
    this.originX = null;
    this.originY = null;
    this.right = 0;
    this.wrong = 0;

    this._flipCard = this._flipCard.bind(this);
    this._start = this._start.bind(this);
    this._move = this._move.bind(this);
    this._end = this._end.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._start);
    this.flashcardElement.addEventListener('pointermove', this._move);
    this.flashcardElement.addEventListener('pointerup', this._end);
    this.flashcardElement.addEventListener('pointercancel', this._end);
  }

  _createFlashcardDOM(frontText, backText)
  {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  show()
  {
    this.containerElement.append(this.flashcardElement);
  }

  hide()
  {
    this.containerElement.removeChild(this.flashcardElement);
  }

  _flipCard(event)
  {
    this.flashcardElement.classList.toggle('show-word');
  }
  _start(event)
  {
    event.currentTarget.setPointerCapture(event.pointerId);
    this.originX = event.clientX;
    this.originY = event.clientY;
  }
  _move(event)
  {
    if(this.originX || this.originY)
    {
      const body = document.querySelector('body');
      event.preventDefault();
      const deltaX = event.clientX - this.originX;
      const deltaY = event.clientY - this.originY;
      event.currentTarget.style.transition = '';
      event.currentTarget.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) rotate(' + deltaX*0.2 + 'deg)';
      if(deltaX >= 150)
      {
        body.classList.add('color_change');
        this.right = 1;
        this.wrong = 0;
      }
      else if(deltaX <=-150)
      {
        body.classList.add('color_change');
        this.right = 0;
        this.wrong = 1;
      }
      else
      {
        body.classList.remove('color_change');
        this.right = 0;
        this.wrong = 0;
      }
      document.dispatchEvent(new CustomEvent('dragging', {
        detail: {
          right: this.right,
          wrong: this.wrong
        }}));
    }
  }
  _end(event)
  {
    const body = document.querySelector('body');
    const currentX = event.clientX;
    const deltaX = currentX - this.originX;
    if(deltaX >= 150 || deltaX <=-150)
    {
      this.flashcardElement.classList.add('show-word');
      document.dispatchEvent(new CustomEvent('dragged', {
        detail: {
          right: this.right,
          wrong: this.wrong,
        }
      }));
    }
    event.currentTarget.style.transition = '0.6s';
    event.currentTarget.style.transform = '';
    body.classList.remove('color_change');
    this.originX = null;
    this.originY = null;
  }

}
