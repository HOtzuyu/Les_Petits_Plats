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
        const selectedValue = this.filter;
        const nodeTag = document.querySelectorAll(".tag button");
        let tagArr = [...nodeTag]; /** convert node list to array */

        if (tagArr.length === 0) {
            tagConteneur.appendChild(tag);
        } else if (tagArr.length > 0) {
            let tagArray = this.nodeArrayToSplitArray(tagArr);
            if (!tagArray.includes(selectedValue)) {
                tagConteneur.appendChild(tag);
            }
        };
        tag.addEventListener("click", this.removeTag);

    }
    removeTag(e) {
        let element = e.target;
        element.remove(element);
    }

    /**
     * 
     * @param {node list} nodeTag 
     * @returns an array with the aria-label string
     */
    nodeArrayToSplitArray(nodeTag) {
        let newArray = [];

        for (let i = 0; i < nodeTag.length; i++) {
            newArray.push(nodeTag[i].getAttribute('aria-label'))
        };
        return newArray;
    }

}