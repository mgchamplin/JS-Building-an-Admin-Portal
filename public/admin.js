let gBooks = null;

async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    gBooks = await response.json()
    console.log(gBooks)

    gBooks.forEach(renderBookAdmin)
}

function renderBookAdmin(book) {
    let bookContainer = document.querySelector('.book-container')
    console.log(bookContainer)
    
    bookContainer.innerHTML += `
        <div class="col-sm-3">
            <div class="card" style="width: 100%;">
                ${book.imageURL ? `
                    <img class="card-img-top" src="${book.imageURL}" />
                `
                : ``}
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Available: ${book.quantity}</h6>
                    <p class="card-text">${book.description}</p>
                </div>
                <input id="book${book.id}" type="text" value="${book.quantity}"/>
                <button onclick="changeBookQuantity(${book.id}, getBookInput(${book.id}).value)">Submit</button>
            </div>
        </div>
    `
}

function getBookInput(id) {
    let bookInput = document.getElementById(`book${id}`)
    return document.getElementById(`book${id}`)
}

async function changeBookQuantity(id, quantity) {
    let response = await fetch("http://localhost:3001/updateBook", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "quantity": quantity
        }),
    })

    let bookInput = document.getElementById(`book${id}`)
    bookInput.quantity = quantity;

    /* Update the on-screen quantity
    */
    const availableQuantityDisplayed = document.querySelectorAll("h6");
    availableQuantityDisplayed[id-1].textContent = "Available: " + quantity;
    console.log(availableQuantityDisplayed)
}

main()

