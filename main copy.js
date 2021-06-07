const addProductModalToggler = document.getElementById(
  'addProductModalToggler'
);
const closeModalIcon = document.getElementById('closeModalIcon');
const addNewProductModal = document.getElementById('addNewProductModal');
const newProductForm = document.getElementById('newProductForm');
const addProductBtn = document.getElementById('addProductBtn');

const hideNewProductModal = () => {
  addNewProductModal.classList.add('hide-me');
};
const showNewProductModal = () => {
  addNewProductModal.classList.remove('hide-me');
};
const resetNewProductForm = () => {
  newProductForm.reset();
};

//Show Add New Product Modal on click
addProductModalToggler.addEventListener('click', (e) => {
  e.preventDefault();
  showNewProductModal();
});

//Close Modal and reset form on click
closeModalIcon.addEventListener('click', () => {
  hideNewProductModal();
  resetNewProductForm();
});

//Function to create and add elements to DOM
const createElementWrapper = (el) => {
  return document.createElement(el);
};
const createDivWrapper = () => {
  return createElementWrapper('div');
};

const appendElementWrapper = (parent, el) => {
  return parent.appendChild(el);
};

//Click handler for form button
addProductBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fetchNewProdDetails();
});

function fetchNewProdDetails() {
  const newProdName = document.getElementById('newProdName').value.trim();
  const newProdAvailability = document.getElementById(
    'newProdAvailability'
  ).value;
  const newProdRating = document.getElementById('newProdRating').value;
  const newProdSalePrice = document
    .getElementById('newProdSalePrice')
    .value.trim();
  const formattedProdSalePrice = parseFloat(newProdSalePrice).toFixed(2);
  const newProdImageLink = document
    .getElementById('newProdImageLink')
    .value.trim();

  if (
    newProdName === '' ||
    newProdAvailability === 'default' ||
    newProdRating === 'default' ||
    newProdSalePrice === '' ||
    newProdImageLink == ''
  ) {
    alert('One or more input field has not been populated. Kindly regularize');
  } else if (isNaN(formattedProdSalePrice)) {
    alert('Enter numeric amount only');
  } else {
    createNewProductList(
      newProdName,
      newProdAvailability,
      formattedProdSalePrice,
      newProdImageLink,
      newProdRating
    );
    resetNewProductForm();
    hideNewProductModal();
  }
}

function createNewProductList(
  newProdName,
  newProdAvailability,
  newProdSalePrice,
  newProdImageLink,
  newProdRating
) {
  const productList = document.getElementById('productList');

  //Create parent list wrapper
  let newItemWrapper = createElementWrapper('li');
  newItemWrapper.setAttribute('class', 'item-wrapper');

  //TOP SECTION
  //Create top section wrapper
  let topSection = createDivWrapper();
  topSection.setAttribute('class', 'top-section');

  //Create top section content
  let prodImage = createElementWrapper('img');
  prodImage.setAttribute('src', newProdImageLink);
  prodImage.setAttribute('alt', newProdName);
  prodImage.setAttribute('class', 'prod-img');

  //Append to top section
  appendElementWrapper(topSection, prodImage);

  //MIDDLE SECTION
  //Create mid section wrapper
  let midSection = createDivWrapper();
  midSection.setAttribute('class', 'mid-section');

  //Create mid section content
  let midDivOne = createDivWrapper();
  let prodNameWrapper = createDivWrapper();
  prodNameWrapper.setAttribute('class', 'prod-name');
  let prodNameTag = createElementWrapper('h3');
  prodNameTag.setAttribute('title', newProdName);
  prodNameTag.textContent = newProdName;
  appendElementWrapper(prodNameWrapper, prodNameTag);
  appendElementWrapper(midDivOne, prodNameWrapper);

  let prodRatingsWrapper = createDivWrapper();
  prodRatingsWrapper.setAttribute('class', 'prod-rating');

  ratingSetter(newProdRating, prodRatingsWrapper);
  appendElementWrapper(midDivOne, prodRatingsWrapper);
  appendElementWrapper(midSection, midDivOne);

  let midDivTwo = createDivWrapper();
  let prodAvailaibilityWrapper = createDivWrapper();
  prodAvailaibilityWrapper.setAttribute('class', 'prod-availbility');
  if (newProdAvailability === 'in stock') {
    prodAvailaibilityWrapper.classList.add('in-stock');
  } else if (newProdAvailability === 'out of stock') {
    prodAvailaibilityWrapper.classList.add('out-of-stock');
  }
  let prodAvailaibilityTag = createElementWrapper('p');
  prodAvailaibilityTag.textContent = newProdAvailability;
  appendElementWrapper(prodAvailaibilityWrapper, prodAvailaibilityTag);
  appendElementWrapper(midDivTwo, prodAvailaibilityWrapper);

  let prodPriceWrapper = createDivWrapper();
  prodPriceWrapper.setAttribute('class', 'prod-price');
  let prodPriceTag = createElementWrapper('p');
  prodPriceTag.textContent = `$${newProdSalePrice}`;
  appendElementWrapper(prodPriceWrapper, prodPriceTag);
  appendElementWrapper(midDivTwo, prodPriceWrapper);

  //Append to mid section
  appendElementWrapper(midSection, midDivOne);
  appendElementWrapper(midSection, midDivTwo);

  //BOTTOM SECTION
  //Create bottom section wrapper
  let bottomSection = createDivWrapper();
  bottomSection.setAttribute('class', 'bottom-section');

  //Create bottom section content
  /*html*/
  bottomSection.innerHTML = `
  <a href="#">Add to Wishlist</a>
  <a href="#">Add to cart</a>
  `;

  appendElementWrapper(newItemWrapper, topSection);
  appendElementWrapper(newItemWrapper, midSection);
  appendElementWrapper(newItemWrapper, bottomSection);
  productList.insertAdjacentElement('afterbegin', newItemWrapper);
}

function ratingSetter(newProdRating, prodRatingsWrapper) {
  let fullStar = createElementWrapper('span');
  fullStar.setAttribute('class', 'fas fa-star');
  let emptyStar = createElementWrapper('span');
  emptyStar.setAttribute('class', 'far fa-star');

  const noOfStars = parseInt(newProdRating);
  for (let i = 1; i <= noOfStars; i++) {
    appendElementWrapper(prodRatingsWrapper, fullStar.cloneNode(true));
  }
  for (let i = 1; i <= 5 - noOfStars; i++) {
    appendElementWrapper(prodRatingsWrapper, emptyStar.cloneNode(true));
  }
  return prodRatingsWrapper;
}
