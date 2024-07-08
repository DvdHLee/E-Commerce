let bookArray;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books');

  booksWrapper.classList.add('books__loading');

  if (!bookArray) {
    bookArray = getBooks();
  };

  booksWrapper.classList.remove('books__loading');

  if (filter === "LOW_TO_HIGH") {
    bookArray.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    bookArray.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    bookArray.sort((a, b) => b.rating - a.rating);
  }

  //Builds html properly but doesn't update for some reason
  // console.log(bookArray)

  // bookArray.forEach((element) => {
  //   let inHTML =
  //     `<li class="book__container">
  //     <img src="${element.url}" alt="crack the coding interview img" class="book">
  //     <h2 class="book__title">${element.title}</h2>
  //     <ul class="book__stars">`;

  //   for (let i = 1; i <= element.rating; i++) {
  //     inHTML += `<i class="fas fa-star"></i>`;
  //   }

  //   if (!Number.isInteger(element.rating)) {
  //     inHTML += `<i class="fas fa-star-half-alt"></i>`;
  //   }

  //   if (element.salePrice) {
  //     inHTML +=
  //       `</ul>
  //       <p class="book__price"><span class="discount">$${element.originalPrice.toFixed(2)}</span> $${element.salePrice.toFixed(2)}</p>
  //       </li>`;
  //   } else {
  //     inHTML +=
  //       `</ul>
  //       <p class="book__price">$${element.originalPrice.toFixed(2)}</p>
  //       </li>`;
  //   }
  //   booksWrapper.innerHTML += inHTML;
  // })
  const booksHtml = bookArray
    .map((element) => {
      return `<li class="book__container">
      <img src="${element.url}" alt="crack the coding interview img" class="book">
      <h2 class="book__title">${element.title}</h2><ul class="book__stars">
      ${ratingsHTML(element.rating)}
      ${priceHTML(element.originalPrice, element.salePrice)}`
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `</ul>
      <p class="book__price">$${originalPrice.toFixed(2)}</p>
      </li>`
  }
  return `</ul>
    <p class="book__price"><span class="discount">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}</p>
    </li>`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

setTimeout(() => {
  renderBooks();
})




// FAKE DATA
function getBooks() {
  return [
    {
      id: 1,
      title: "Crack the Coding Interview",
      url: "assets/crack the coding interview.png",
      originalPrice: 49.95,
      salePrice: 14.95,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Atomic Habits",
      url: "assets/atomic habits.jpg",
      originalPrice: 39,
      salePrice: null,
      rating: 5,
    },
    {
      id: 3,
      title: "Deep Work",
      url: "assets/deep work.jpeg",
      originalPrice: 29,
      salePrice: 12,
      rating: 5,
    },
    {
      id: 4,
      title: "The 10X Rule",
      url: "assets/book-1.jpeg",
      originalPrice: 44,
      salePrice: 19,
      rating: 4.5,
    },
    {
      id: 5,
      title: "Be Obsessed Or Be Average",
      url: "assets/book-2.jpeg",
      originalPrice: 32,
      salePrice: 17,
      rating: 4,
    },
    {
      id: 6,
      title: "Rich Dad Poor Dad",
      url: "assets/book-3.jpeg",
      originalPrice: 70,
      salePrice: 12.5,
      rating: 5,
    },
    {
      id: 7,
      title: "Cashflow Quadrant",
      url: "assets/book-4.jpeg",
      originalPrice: 11,
      salePrice: 10,
      rating: 4,
    },
    {
      id: 8,
      title: "48 Laws of Power",
      url: "assets/book-5.jpeg",
      originalPrice: 38,
      salePrice: 17.95,
      rating: 4.5,
    },
    {
      id: 9,
      title: "The 5 Second Rule",
      url: "assets/book-6.jpeg",
      originalPrice: 35,
      salePrice: null,
      rating: 4,
    },
    {
      id: 10,
      title: "Your Next Five Moves",
      url: "assets/book-7.jpg",
      originalPrice: 40,
      salePrice: null,
      rating: 4,
    },
    {
      id: 11,
      title: "Mastery",
      url: "assets/book-8.jpeg",
      originalPrice: 30,
      salePrice: null,
      rating: 4.5,
    },
  ];
}
