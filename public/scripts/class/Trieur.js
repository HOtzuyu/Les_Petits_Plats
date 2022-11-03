/**
 * window filters
 */
class Trieur {
    constructor(filters, DOMfilter, elemColor) {
        this.filters = filters;
        this.DOMfilter = DOMfilter;
        this.elemColor = elemColor;
        this.createFiltersList(this.filters);
        this.filterEvent();

    }
    createFiltersList(filters) {
        new TagList(this.DOMfilter, filters, this.elemColor);
    }
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