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
        // const selectedValue = this.filter;

        const nodeTag = document.querySelectorAll(".tag button");
       // let tagArr = [...nodeTag]; /** convert node list to array */

        // let tagArray = this.nodeArrayToSplitArray(tagArr);

        tagConteneur.appendChild(tag);
        console.log(tag.getAttribute("aria-label"));
        // if (tagArr.length === 0) {

        // } else if (newTagArr.length > 0) {
        //     newTagArr = tagArr.slice(tagArr);
        //     console.log("t");
        //     for (var i = 1; i < tagArr.length; i++) {
        //         console.log(i)
        //     };
        // };

        tag.addEventListener("click", this.removeTag);


    }
    removeTag(e) {
        let element = e.target;
        element.remove(element);
        const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
        filtersAlgo(filtersDatas);
    }

    // nodeArrayToSplitArray(nodeTag) {
    //     console.log(nodeTag[0][18]);
    //     let newArrayTag = nodeTag;
    //     let newArray = [];
    //     for (let i = 0; i < newArray.length; i++) {
    //         newArray.push(newArrayTag.innerHtml)
    //     };
    //     return newArray;
    // }

}