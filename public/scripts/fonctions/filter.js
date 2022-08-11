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
        const dropDowns = document.querySelectorAll(".dropdown");
        const placeholder = input.placeholder;
        const filter = this.DOMfilter;

        dropDowns.forEach(dropDown => {
            dropDown.addEventListener('click', () => { 
              const activeElements = Array.from(document.querySelectorAll('.list-group.active'));
              activeElements.forEach(activeElement => {
                activeElement.classList.remove('active');
                activeElement.parentElement.classList.add('hide');
              });
              dropDown.parentElement.classList.add('active');
              dropDown.classList.remove('hide');
            });
          });


        // this.DOMfilter.addEventListener("click", (e) => {
        //     e.stopPropagation();
        //         if (filter.querySelector("input").placeholder != `Recherchez un ${placeholder}`) {
        //             filter.querySelector("input").placeholder = `Recherchez un ${placeholder}`;
        //             filter.classList.add("flex-grow-1");
        //             filter.querySelector("ul").classList.remove("hide");
        //             filter.querySelector("ul").classList.add("active");
        //             filter.querySelector(".chevron").classList.add("active");
        //             //filter.classList.add("active");
        //             console.log(filter.classList);
        //         } else {
        //             filter.querySelector("input").placeholder = `${placeholder}`;
        //             filter.classList.remove("flex-grow-1");
        //             filter.querySelector("ul").classList.add("hide");
        //             filter.querySelector("ul").classList.remove("active");
        //             filter.querySelector(".chevron").classList.remove("active");
        //             //filter.classList.remove("active");
        //             console.log(filter.classList);
        //         };
            

        // });
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
                //looking for a match
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
        const listContainer = this.DOMfilter.querySelector("ul");
        listContainer.innerHTML = "";
        filters.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element;
            listContainer.appendChild(li);
            li.addEventListener("click", () => {
                new Tag(li.innerText, this.elemColor, this.DOMfilter.id);
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
        const tagConteneur = document.querySelector(".tag");
        tagConteneur.appendChild(tag);
        tag.addEventListener("click", this.removeTag)
    }
    removeTag(e) {
        let element = e.target;
        console.log(element);
        element.parentNode.removeChild(element);
    }
}