class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        cardContainerClass: "card my-3",
        cardBodyClass: "card-body d-flex flex-column align-items-center", // Flexbox for center alignment
        imageClass: "card-img-top custom-image-class",
        titleClass: "card-title",
        subTitleClass: "card-subtitle my-3 text-left", // Left-aligned subtitle
        textClass: "card-text",
        buttonClass: "btn btn-outline-primary", // Removed default bg color
        linkClass: "card-link"
    };

    defaultData = {
        title: "Sample Card Title",
        subTitle: "Sample Card Sub Title",
        description: "This is a sample description for the card component.",
        image: "https://via.placeholder.com/150",
        button: "Click here!",
        link: "https://www.google.com, Google it",
        showImage: true,
        showTitle: true,
        showSubTitle: true,
        showDescription: true,
        showButton: true,
        showLink: true
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
            if (name === "config" && typeof newValue === "string") {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === "data" && typeof newValue === "string") {
                this.data = Object.assign(this.data, JSON.parse(newValue));
            }
        } catch (e) {
            console.log(e);
        }

        this.renderComponent();
    }

    updateData() {
        const updatedData = JSON.parse(this.getAttribute("data"));
        this.data = updatedData || this.defaultData;
    }

    renderComponent() {
        this.innerHTML = "";
        this.className = this.config.cardContainerClass;

        // create element
        const heading = this.createElement("h1", this.config)
        const wrapperElmWidth =
            getComputedStyle(this).width !== "auto"
                ? getComputedStyle(this).width.trim()
                : "300px";
        this.style.width = `${parseInt(wrapperElmWidth)}px`;
        this.style.display = "inline-block";

        if (this.data.showImage && this.data.image) {
            const img = this.createElement("img", this.config.imageClass);
            img.src = this.data.image;
            this.appendChild(img);
        }

        const cardBody = this.createElement("div", this.config.cardBodyClass);

        if (this.data.showTitle) {
            const title = this.createElement(
                "h5",
                this.config.titleClass,
                this.data.title
            );
            cardBody.appendChild(title);
        }

        if (this.data.showSubTitle && this.data.subTitle) {
            const subTitle = this.createElement(
                "h6",
                this.config.subTitleClass,
                this.data.subTitle
            );
            cardBody.appendChild(subTitle);
        }

        if (this.data.showDescription) {
            const description = this.createElement(
                "p",
                this.config.textClass,
                this.data.description
            );

            // Add spacing below the paragraph
            description.style.marginBottom = "1.5rem";
            cardBody.appendChild(description);
        }

        if (this.data.showButton && this.data.button) {
            const button = this.createElement(
                "button",
                this.config.buttonClass,
                this.data.button
            );


            // Style button with no background by default
            button.style.border = "1px solid #3498db";
            button.style.color = "#3498db";
            button.style.background = "none";
            button.style.padding = "0.5rem 1rem";
            button.style.borderRadius = "5px";
            button.style.transition =
                "background 0.3s ease, color 0.3s ease, transform 0.3s ease";

            // Add hover effects
            button.addEventListener("mouseenter", () => {
                button.style.background =
                    "linear-gradient(90deg, #3498db, #8e44ad)";
                button.style.color = "white";
                button.style.transform = "scale(1.1)";
            });
            button.addEventListener("mouseleave", () => {
                button.style.background = "none"; // Reset background
                button.style.color = "#3498db"; // Reset text color
                button.style.transform = "scale(1)"; // Reset size
            });

            // Add click event
            button.addEventListener("click", () => {
                alert(`Button clicked! Title: ${this.data.title}`);
                console.log(`Button clicked on card with title: ${this.data.title}`);
            });

            cardBody.appendChild(button);
        }

        if (this.data.showLink && this.data.link) {
            const linkContent = this.data.link;
            const linkContSeparated = linkContent.split(",");

            if (linkContSeparated.length === 2) {
                const url = linkContSeparated[0].trim();
                const linkText = linkContSeparated[1].trim();

                const link = this.createElement(
                    "a",
                    this.config.linkClass,
                    linkText
                );
                link.href = url;
                link.target = "_blank";
                link.style.display = "block";
                link.style.margin = "0.7rem 0";
                cardBody.appendChild(link);
            } else {
                console.error("Link data is not formatted correctly.");
            }
        }

        this.appendChild(cardBody);
    }

    createElement(tag, className, content) {
        const elm = document.createElement(tag);
        elm.className = className;
        if (content) {
            elm.innerHTML = content;
        }
        return elm;
    }
}

 

customElements.define("card-component", CardComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({
    component: "card-component",
    componentClass: CardComponent
});
