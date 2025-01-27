/**
 * creat tag
 */
class CreateTag {
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
    }

    createTag() {
        const button = document.createElement("button");
        this.setAttributes(button, {
            "data-filtertype": `${this.filterType}`,
            "type": "button",
            "aria-label": `${this.filter}`
        });
        button.innerHTML = `${this.filter}`;
        button.classList.add(`${this.elemColor}`, "tag_space", "boutton-x");
        return button
    }

    /**
     * Set tag attributes
     * @param {button type} el 
     * @param {attribute} attrs 
     */
    setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
}