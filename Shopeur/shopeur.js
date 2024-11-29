let bagItems;
onLoadPage();
function onLoadPage()
{
  let bagItemsString = localStorage.getItem("bagItems");
  bagItems = bagItemsString ? JSON.parse(bagItemsString) : [];
  displayBagIcon();
}
function addToBag(item)
{
    bagItems.push(item);
    localStorage.setItem("bagItems",JSON.stringify(bagItems));
    displayBagIcon();
    
}
function displayBagIcon()
{
   let bag_item_count = document.querySelector(".bag_item_count");
   if(bagItems.length > 0)
   {
     bag_item_count.innerHTML = bagItems.length;
     bag_item_count.style.visibility = "visible";
   }
}