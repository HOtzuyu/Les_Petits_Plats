/**
 * toggle display tag 
 */
 class AddTag {
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
        this.addTag();
    }
    addTag() {
        let tag = new CreateTag(this.filter, this.elemColor, this.filterType);
        tag = tag.createTag();
        const tagConteneur = document.querySelector(".tag");
        tagConteneur.appendChild(tag);
        tag.addEventListener("click", this.removeTag);
    }
    removeTag(e) {
        let element = e.target;
        element.remove(element);
        const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
        filtersAlgo(filtersDatas);
    }
}