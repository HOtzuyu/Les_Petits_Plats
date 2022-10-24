class CreateTag {
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
    }
    createTag () {
        const button = document.createElement("button");
        button.setAttribute("data-filtertype", `${this.filterType}`);
        button.setAttribute("type","button");
        button.setAttribute("aria-label","Close");
        button.innerHTML = `${this.filter}`;
        button.classList.add(`${this.elemColor}`, "tag_space", "boutton-x");
        return button
    }
}