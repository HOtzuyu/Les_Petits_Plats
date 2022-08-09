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

        this.DOMfilter.addEventListener("click", (e) => {
            e.stopPropagation();            
            if(filter.querySelector("input").placeholder != `Recherchez un ${placeholder}`){
                filter.querySelector("input").placeholder = `Recherchez un ${placeholder}`;
            }else{
                filter.querySelector("input").placeholder = `${placeholder}`;
            };            
            filter.classList.toggle("flex-grow-1");
            filter.querySelector("ul").classList.toggle("hide");
            filter.querySelector("ul").classList.toggle("active");
            filter.querySelector(".chevron").classList.toggle("active");
            filter.classList.toggle("active");
            console.log(filter);   
        });
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