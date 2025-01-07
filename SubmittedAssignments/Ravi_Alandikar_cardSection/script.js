class CardComponent extends HTMLElement {
  static observedAttributes = ['config', 'data'];

  defaultConfig = {
    cardContainerClass: 'card my-3 card-spacing',
    cardBodyClass: 'card-body',
    imageClass: 'card-img-top',
    titleClass: 'card-title',
    subTitleClass: 'card-subtitle my-3 text-muted',
    textClass: 'card-text',
    buttonClass: 'custom-button',
    linkClass: 'card-link',
  };

  defaultData = {
    title: 'Default Title',
    subTitle: 'Default Subtitle',
    description: 'Default description text.',
    image: 'https://via.placeholder.com/150',
    button: 'Click Me!',
    link: 'https://www.google.com, Google it',
    showImage: true,
    showTitle: true,
    showSubTitle: true,
    showDescription: true,
    showButton: true,
    showLink: true,
  };

  data = {};
  config = {};

  constructor() {
    super();
    this.data = { ...this.defaultData };
    this.config = { ...this.defaultConfig };
  }

  connectedCallback() {
    this.updateData();
    this.renderComponent();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    try {
      if (name === 'config') this.config = { ...this.config, ...JSON.parse(newValue) };
      if (name === 'data') this.data = { ...this.data, ...JSON.parse(newValue) };
    } catch (error) {
      console.error(`Error parsing attribute "${name}":`, error);
    }
    this.renderComponent();
  }

  updateData() {
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        this.data = { ...this.defaultData, ...JSON.parse(dataAttr) };
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  }

  renderComponent() {
    this.innerHTML = '';
    this.className = this.config.cardContainerClass;

    if (this.data.showImage && this.data.image) {
      const img = this.createElement('img', this.config.imageClass);
      img.src = this.data.image;
      img.alt = this.data.title || 'Card image';
      this.appendChild(img);
    }

    const cardBody = this.createElement('div', this.config.cardBodyClass);

    if (this.data.showTitle) cardBody.appendChild(this.createElement('h5', this.config.titleClass, this.data.title));
    if (this.data.showSubTitle) cardBody.appendChild(this.createElement('h6', this.config.subTitleClass, this.data.subTitle));
    if (this.data.showDescription) cardBody.appendChild(this.createElement('p', this.config.textClass, this.data.description));
    if (this.data.showButton) {
      const button = this.createElement('button', this.config.buttonClass, this.data.button);
      button.addEventListener('click', () => alert(`Button clicked for: ${this.data.title}`));
      cardBody.appendChild(button);
    }

    if (this.data.showLink && this.data.link) {
      const [url, linkText] = this.data.link.split(',').map((str) => str.trim());
      const link = this.createElement('a', this.config.linkClass, linkText);
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      cardBody.appendChild(link);
    }

    this.appendChild(cardBody);
  }

  createElement(tag, className, content = '') {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = content;
    return element;
  }
}

customElements.define('card-component', CardComponent);

const cardData = [
  {
    title: 'Card One',
    subTitle: 'Subtitle One',
    description: 'Description for card one.',
    image: 'https://via.placeholder.com/150',
    button: 'Learn More',
    link: 'https://example.com, ',
  },
  {
    title: 'Card Two',
    subTitle: 'Subtitle Two',
    description: 'Description for card two.',
    image: 'https://via.placeholder.com/150',
    button: 'Learn More',
    link: 'https://example.com, ',
  },
  {
    title: 'Card Three',
    subTitle: 'Subtitle Three',
    description: 'Description for card three.',
    image: 'https://via.placeholder.com/150',
    button: 'Learn More',
    link: 'https://example.com, ',
  },
  {
    title: 'Card Four',
    subTitle: 'Subtitle Four',
    description: 'Description for card Four.',
    image: 'https://via.placeholder.com/150',
    button: 'Learn More',
    link: 'https://example.com, ',
  },
  {
    title: 'Card Five',
    subTitle: 'Subtitle Five',
    description: 'Description for card Five.',
    image: 'https://via.placeholder.com/150',
    button: 'Learn More',
    link: 'https://example.com, ',
  },
  {
    title: 'Card Six',
    subTitle: 'Subtitle Six',
    description: 'Description for card Six.',
    image: 'https://via.placeholder.com/150',
    button: 'Learn More',
    link: 'https://example.com, ',
  },
];

function renderCards(data) {
  const cardSection = document.getElementById('card-section');
  const noResults = document.getElementById('no-results');
  cardSection.innerHTML = '';
  noResults.style.display = data.length ? 'none' : 'block';

  data.forEach((card) => {
    const cardElement = document.createElement('card-component');
    cardElement.setAttribute('data', JSON.stringify(card));
    cardSection.appendChild(cardElement);
  });
}

renderCards(cardData);

// Search functionality
document.getElementById('search-bar').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  const filteredCards = cardData.filter(
    (card) =>
      card.title.toLowerCase().includes(query) ||
      card.subTitle.toLowerCase().includes(query)
  );
  renderCards(filteredCards);
});
