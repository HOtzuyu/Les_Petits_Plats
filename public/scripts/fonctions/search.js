/**
 * listen input search
 */
class Searchbar {
    constructor() {
        this.input = document.querySelector("#searchinput");
        this.listenInput()
    }
    listenInput() {
        this.input.addEventListener("input", searchBarAlgo);
    }
}