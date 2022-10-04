class Filter {
    constructor(filters, DOMfilter, elemColor) {
        this.filters = filters;
        this.DOMfilter = DOMfilter;
        this.elemColor = elemColor;
        this.createFiltersList(this.filters);
        this.filterEvent();

    }
    createFiltersList(filters) {
        new List(this.DOMfilter, filters, this.elemColor);
    }
    // filterEvent() {
    //         const input = this.DOMfilter.querySelector("input");
    //         const placeholder = input.placeholder;
    //         const dropDowns = document.querySelectorAll(".dropdown");

    //        // console.log(placeholder);

    //         dropDowns.forEach(dropDown => {
    //             dropDown.addEventListener('click', (e) => {
    //                 const activeElements = Array.from(document.querySelectorAll('.dropdown.active'));
    //                 e.stopPropagation();
    //                 activeElements.forEach(activeElement => {
    //                     activeElement.classList.remove('active');
    //                     activeElement.classList.remove("flex-grow-1");
    //                     activeElement.querySelector(".chevron").classList.remove("active");
    //                     activeElement.querySelector("ul").classList.add("hide");
    //                     activeElement.querySelector("ul").classList.remove("active");
    //                     activeElement.querySelector("input").placeholder = placeholder;

    //                     //console.log(placeholder);
    //                 });
    //                 dropDown.classList.add("flex-grow-1");
    //                 dropDown.classList.add('active');
    //                 dropDown.querySelector(".chevron").classList.add("active");
    //                 dropDown.querySelector("ul").classList.remove("hide");
    //                 dropDown.querySelector("ul").classList.add("active");
    //                 if (dropDown.classList.contains("active")) {
    //                     let result = "recherchez un " + e.target.value;

    //                     //console.log(e);

    //                     //console.log("if " + dropDown.querySelector('input'));
    //                     dropDown.querySelector("input").placeholder = result;
    //                     dropDown.addEventListener('click', () => {
    //                         dropDown.classList.remove("flex-grow-1");
    //                         dropDown.querySelector(".chevron").classList.remove("active");
    //                         dropDown.querySelector("input").placeholder = placeholder;
    //                         dropDown.querySelector("ul").classList.add("hide");
    //                         dropDown.querySelector("ul").classList.remove("active");
    //                     })
    //                     //console.log("if " + placeholder);
    //                 }                
    //                 // console.log(placeholder);
    //                 // console.log(this.DOMfilter);

    //             });

    //         });
    //     }
    filterEvent() {
        let open = false;
        const input = this.DOMfilter.querySelector("input");
        const placeholder = input.placeholder;
        const filter = this.DOMfilter;
        let othersFilters = Array.from(document.querySelectorAll(".filters__element"));
        othersFilters = othersFilters.filter((elem) => {
            return elem !== filter
        });
        
        const dropDownIcon = this.DOMfilter.querySelector(".chevron");

        this.DOMfilter.addEventListener("click", (e) => {
            e.stopPropagation();
            othersFilters.forEach(element => {
                element.style.pointerEvents = "none";
            });
            // Open sort list
            if (open == false) {
                //console.log(filter);
                filter.classList.add("flex-grow-1");
                filter.classList.add("active");

                const placeholderMin = placeholder.toLowerCase();
                filter.querySelector("ul").classList.remove("hide");
                filter.querySelector("ul").classList.add("active");

                input.placeholder = `Rechercher un ${placeholderMin}`;
                input.style.cursor = "text";
                input.focus();
                dropDownIcon.classList.add("active");
                open = true;
                document.addEventListener("click", function toggle(e) {
                    if (!filter.contains(e.target)) {
                        remove();
                    }
                    this.removeEventListener("click", toggle);
                });
            }
            // Close sort list
            else if (open == true && dropDownIcon.contains(e.target)) {
                remove();
            }
        });

        function remove() {
            filter.querySelector("ul").classList.add("hide");
            filter.querySelector("ul").classList.remove("active");

            filter.classList.remove("flex-grow-1");
            filter.classList.remove("active");

            input.placeholder = placeholder;
            dropDownIcon.classList.remove("active");
            othersFilters.forEach(element => {
                element.style.pointerEvents = "unset";
            });
            open = false;
        }
    }
}

class List {
    constructor(DOMfilter, filters, elemColor) {
        this.DOMfilter = DOMfilter;
        this.filters = filters;
        this.elemColor = elemColor;
        this.displayFiltersList(this.filters);
        const input = this.DOMfilter.querySelector("input");
        input.oninput = this.manageSearchList.bind(this);

    }
    manageSearchList(e) {
        if (e.target.value.length > 2) {
            const inputData = e.target.value.toLowerCase();
            const newTabFilters = []
            this.filters.forEach(element => {
                const findIt = element.toLowerCase().includes(inputData);
                if (findIt == true) {
                    newTabFilters.push(element);
                }
            });
            this.displayFiltersList(newTabFilters);
        } else {
            this.displayFiltersList(this.filters);
        }
    }
    displayFiltersList(filters) {
        //import {filtersAlgo} from "../algo/filterAlgo";
        //const algo = require("../algo/filterAlgo");
        //console.log(this.DOMfilter.querySelector("ul"));
        const listContainer = this.DOMfilter.querySelector("ul");
        listContainer.innerHTML = "";
        filters.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element;
            listContainer.appendChild(li);
            li.addEventListener("click", () => {
                new Tag(li.innerText, this.elemColor, this.DOMfilter.id);
                //console.log(Tag);
                filtersAlgo(); /** Appel de la fonction de algo.js */
            })
        });
    }
}

class Tag {
    constructor(filter, elemColor, filterType) {
        this.filter = filter;
        this.elemColor = elemColor;
        this.filterType = filterType;
        this.addTag();
    }
    addTag() {
        
        let tag = new CreateTag(this.filter, this.elemColor, this.filterType);
        tag = tag.createTag();
        const tagConteneur = document.querySelector(".tag");console.log(tag);
        tagConteneur.appendChild(tag);
        tag.addEventListener("click", this.removeTag);
        // console.log(this.elemColor);
        // console.log(tag);
    }
    removeTag(e) {
        let element = e.target;
        element.parentNode.removeChild(element);
    }
}