const CONVENIENCE_FEES = 99;
let bagItems;                                          //list of bag_items_id's (from local storage)
let bagItemObjects;                                    //insight details of each bag_items_id's (from local storage)
onLoad();

function onLoad() 
{
  let bagItemsString = localStorage.getItem("bagItems");
  bagItems = bagItemsString ? JSON.parse(bagItemsString) : [];
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
  displayBagIcon();
}

function loadBagItemObjects() 
{
  bagItemObjects = bagItems.map(itemId => {
    for(let i=0; i<items_list.length; i++)                                        //list of all the items in our website
    {
      if(itemId == items_list[i].id)
        return items_list[i];
    }
  });
}

function displayBagItems() 
{
  let displayitems = '';
  bagItemObjects.forEach(bagItem => {
    displayitems += generateItemHTML(bagItem);
  });
  document.querySelector('.bag-items-container').innerHTML = displayitems;
}

function generateItemHTML(bagitem) 
{
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="${bagitem.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${bagitem.company}</div>
      <div class="item-name">${bagitem.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${bagitem.current_price}</span>
        <span class="original-price">Rs ${bagitem.original_price}</span>
        <span class="discount-percentage">(${bagitem.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${bagitem.return_period} days</span> return available
      </div>
      <div class="delivery-details"> Delivery by:
        <span class="delivery-details-days">${bagitem.delivery_date}</span>
      </div>
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${bagitem.id})">☓ </div>
  </div>`;
}

function displayBagSummary() 
{
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });
  let totalAmount = totalMRP - totalDiscount + CONVENIENCE_FEES;
  
  document.querySelector('.bag-summary').innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs.${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-Rs.${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">Rs.99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs.${totalAmount}</span>
    </div>
  </div>
  <button class="btn-place-order"> PLACE ORDER </button> `;
}

function displayBagIcon()
{
   let bag_item_count = document.querySelector(".bag_item_count");
   if(bagItems.length > 0)
   {
     bag_item_count.innerHTML = bagItems.length;
     bag_item_count.style.visibility = "visible";
   }
   else
   bag_item_count.style.visibility = "hidden";
}

function removeFromBag(bagitemid) 
{
  bagItems = bagItems.filter(itemId => itemId != bagitemid);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
  displayBagIcon();
}