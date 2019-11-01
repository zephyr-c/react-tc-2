// var tradingCardData = [
//   {
//     name: 'Balloonicorn',
//     skill: 'video games',
//     imgUrl: '/static/img/balloonicorn.jpg'
//   },

//   {
//     name: 'Float',
//     skill: 'baking pretzels',
//     imgUrl: '/static/img/float.jpg'
//   },

//   {
//     name: 'Llambda',
//     skill: 'knitting scarves',
//     imgUrl: '/static/img/llambda.jpg'
//   }
// ];

class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p>Name: {this.props.name}</p>
        <img src={this.props.imgUrl} id="cardimg" />
        <div id="skill"><p>Skill: {this.props.skill} </p></div>
      </div>
    );
  }
}

class TradingCardForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      skill: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  addNewCard() {
    const data = {
      name: this.state.name,
      skill: this.state.skill
    };
    $.post('/add-card', data, this.updateCards);
  }

  updateCards() {
    // $.get('/cards.json', this.props.handleNewCardAdded);
    alert('Add a card?!?')
  }

  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }

  handleSkillChange(evt) {
    this.setState({ skill: evt.target.value });
  }

  render() {
    return (
      <form>
        <label for="name">Name:</label>
        <input 
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <label for="skill">Skill:</label>
        <input
          id="skill"
          type="text"
          value={this.state.skill}
          onChange={this.handleSkillChange}
        />
        <button onClick={this.addNewCard}>Add</button>
      </form>
    );
  }
}


class TradingCardContainer extends React.Component {
  constructor() {
    super();

    this.state = { cards: [] }; //initial value empty array
    this.updateCards = this.updateCards.bind(this);
  }

  getCardData() {
    $.get('/cards.json', this.updateCards);
  }

  updateCards(response) {
    const cards = response.cards;
    console.log(cards)
    this.setState({ cards: cards });
  }

  componentDidMount() {
    this.getCardData();
  }

  render() {
    const tradingCards = [];

    for (const currentCard of this.state.cards) {
      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }

    return (
      <div>
        <TradingCardForm handleNewCardAdded={this.updateCards} />
        <div>{tradingCards}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('container')
);
