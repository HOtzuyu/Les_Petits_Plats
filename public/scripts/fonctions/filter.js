/**
 * window filters
 */
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
    filterEvent() {
        const input = this.DOMfilter.querySelector("input");
        const placeholder = input.placeholder;
        const filter = this.DOMfilter;
        let open = false;
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
                const placeholderMin = placeholder.toLowerCase();
                filter.classList.add("flex-grow-1", "active");
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
            filter.classList.remove("flex-grow-1", "active");
            filter.querySelector("ul").classList.add("hide");
            filter.querySelector("ul").classList.remove("active");
            input.placeholder = placeholder;
            dropDownIcon.classList.remove("active");
            othersFilters.forEach(element => {
                element.style.pointerEvents = "unset";
            });
            open = false;
        }
    }
}

/**
 * list of elements
 */
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
                if (!!findIt) {
                    newTabFilters.push(element);
                }
            });
            this.displayFiltersList(newTabFilters);
        } else {
            this.displayFiltersList(this.filters);
        }
    }
    displayFiltersList(filters) {
        const listContainer = this.DOMfilter.querySelector("ul");
        listContainer.innerHTML = "";
        filters.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element;
            listContainer.appendChild(li);
            li.addEventListener("click", () => {
                new Tag(li.innerText, this.elemColor, this.DOMfilter.id);
                const filtersDatas = Array.from(document.querySelectorAll(".tag button"));
                filtersAlgo(filtersDatas);
            })
        });
    }
}

/**
 * toggle display tag 
 */
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