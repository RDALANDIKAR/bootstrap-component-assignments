class SectionComponent extends HTMLElement {
    constructor() {
      super();
  
      // Create a container for the section
      this.sectionContainer = document.createElement("div");
    }
  
    connectedCallback() {
      const data = JSON.parse(this.getAttribute("data")) || [];
      const config = JSON.parse(this.getAttribute("config")) || {};
  
      // Create a row container for the cards
      const row = document.createElement("div");
      row.className = config.rowClass || "row";
  
      // Iterate through each data item and create a card
      data.forEach((item) => {
        const col = document.createElement("div");
        col.className = config.colClass || "col-md-4";
  
        // Create the card
        const card = document.createElement("div");
        card.className = config.cardClass || "card shadow-sm";
  
        // Add image (if enabled)
        if (item.image) {
          const img = document.createElement("img");
          img.src = item.image;
          img.className = config.imageClass || "card-img-top";
          img.alt = item.title || "Card Image";
          card.appendChild(img);
        }
  
        // Create card body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
  
        // Add title (if enabled)
        if (item.title) {
          const title = document.createElement("h5");
          title.className = config.titleClass || "card-title";
          title.textContent = item.title;
          cardBody.appendChild(title);
        }
  
        // Add subtitle (if enabled)
        if (item.subTitle) {
          const subTitle = document.createElement("h6");
          subTitle.className = config.subTitleClass || "card-subtitle mb-2 text-muted";
          subTitle.textContent = item.subTitle;
          cardBody.appendChild(subTitle);
        }
  
        // Add description (if enabled)
        if (item.description) {
          const description = document.createElement("p");
          description.className = config.textClass || "card-text";
          description.textContent = item.description;
          cardBody.appendChild(description);
        }
  
        // Add button (if enabled)
        if (item.button) {
          const button = document.createElement("a");
          button.className = config.buttonClass || "btn btn-primary";
          button.href = item.link || "#";
          button.textContent = item.button;
          cardBody.appendChild(button);
        }
  
        // Append card body to card
        card.appendChild(cardBody);
  
        // Append card to column
        col.appendChild(card);
  
        // Append column to row
        row.appendChild(col);
      });
  
      // Append the row to the section container
      this.sectionContainer.appendChild(row);
  
      // Append the section container to the custom element
      this.appendChild(this.sectionContainer);
    }
  }
  
  // Define the custom element
  customElements.define("section-component", SectionComponent);
  