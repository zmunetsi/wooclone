require('/config.js');

export function addtoCart(cartItem) {
    let woocartItems = [];
    if (localStorage.getItem('woocartItems')) {
        woocartItems = JSON.parse(localStorage.getItem('woocartItems'));
    }
    woocartItems.push(cartItem);
    localStorage.setItem('woocartItems', JSON.stringify(woocartItems));
    return woocartItems;
}

export function removeFromCart(cartId) {
    let woocartItems = [];   
    if (localStorage.getItem('woocartItems')) {
        woocartItems = JSON.parse(localStorage.getItem('woocartItems'));
    }
    for(var item in woocartItems) {
      if(woocartItems[item].id == cartId){
        woocartItems.splice( item, 1 )
      }
    }

    localStorage.setItem('woocartItems', JSON.stringify(woocartItems));
    console.log( woocartItems )
    return woocartItems;
}

export function getCartItems() {
    let woocartItems = [];
    if (localStorage.getItem('woocartItems')) {
        woocartItems = JSON.parse(localStorage.getItem('woocartItems'));
    }
    return woocartItems;
}