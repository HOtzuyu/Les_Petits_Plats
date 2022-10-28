class CreateTag {
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
    }
    createTag() {
        const button = document.createElement("button");
        button.setAttribute("data-filtertype", `${this.filterType}`);
        button.setAttribute("type", "button");
        button.innerHTML = `
            ${this.filter}
            <img src="/public/assets/pictos/close.svg" alt="icon fermer">
        `
        button.classList.add(`${this.elemColor}`, "tag_space");
        return button
    }
}