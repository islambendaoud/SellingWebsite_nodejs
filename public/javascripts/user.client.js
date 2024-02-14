let user ; 

let username = document.getElementById("userwelcome") ; 
let sum = document.getElementById("sum")
const setup = () => {
  getUser();
  getItems() ; 
  document.getElementById('add').addEventListener('click', add);
  document.getElementById('logout').addEventListener('click', logout);
}
window.addEventListener('DOMContentLoaded', setup);
const getItems = async () => {
  const requestOptions = {
    method :'GET',
  };
  const response = await fetch('/user/listed', requestOptions);
  const response2 = await fetch('/user/me', requestOptions);
  items = await response.json(); 
  owned = await response2.json() ; 
  if (response.ok && response2.ok) {
    for (var key in items ){
      const node = document.createElement("li");
      const textnode = document.createTextNode(items[key].name + " : " + items[key].price);
      node.appendChild(textnode);
      node.setAttribute("id", items[key]._id)  ; 
      const buy = document.createElement("button") ; 
      const buytext = document.createTextNode("buy") ; 
      buy.setAttribute("id", items[key]._id) ; 
      buy.setAttribute("onClick" , "buy(this.id)")
      buy.appendChild(buytext) ; 
      node.appendChild(buy) ; 
      document.getElementById("listed").appendChild(node);


    }
    for (var o in owned.bought){
      const node = document.createElement("li");
      const textnode = document.createTextNode(owned.bought[o].name + " : " + owned.bought[o].price);
      node.appendChild(textnode);
      node.setAttribute("id", [o]._id)  ; 
      document.getElementById("bought").appendChild(node);
  }

  }
}

const buy = async(itemid) => {
  const requestOptions = {
    method :'GET',
  };
  const response = await fetch('/user/listed', requestOptions);
  items = await response.json(); 
  const response2 = await fetch('/user/me', requestOptions);
  user = await response2.json();
  if (response.ok && response2.ok) {
    item = items.filter( element => element._id ==itemid) ; 
    const node = document.createElement("li");
    const textnode = document.createTextNode(item[0].name + " : " + item[0].price);
    node.appendChild(textnode);
    node.setAttribute("id", item[0]._id)  ; 
    document.getElementById("bought").appendChild(node);
    var element = document.getElementById(itemid);
    element.parentNode.removeChild(element);
    console.log(item[0]) ; 
    update(item[0]) ;

  }
}
const getUser = async () => {
  const requestOptions = {
                           method :'GET',
                         };
  const response = await fetch('/user/me', requestOptions);
  user = await response.json();
  if (response.ok) {
    let money = user.money ; 
    username.innerHTML="Welcome " +  user.name ; 
    sum.innerHTML = "Credit : " + money ; 
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}

const add = async () => {
  let itemp = parseInt(document.getElementById('itemprice').value) ; 
  let itemn = document.getElementById('itemname').value ;  
  const userData = {name : itemn , price : itemp  , creator : user._id};
  console.log(user.login) ; 
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'POST',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch('/user/listed', requestOptions);
  if (response.ok) {
    const updatedUser = await response.json();
    console.log(`listed updated : ${JSON.stringify(updatedUser)}`);
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}
const update =  async (item) => {
  const requestfetch = {
    method :'GET',
  };
  console.log(item) ;  
  const user = await fetch('/user/me', requestfetch);
  let list = user.bought || [] 
  list.push(item)
  const userData = {bought : list };
  const body = JSON.stringify(userData);
  const requestOptions = {
                         method :'PUT',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch('/user/me', requestOptions);
  if (response.ok) {
    const updatedUser = await response.json();
    console.log(`user updated : ${JSON.stringify(updatedUser)}`);
  }
  else {
    const error = await response.json();
    handleError(error);
  }
}

const logout = async () => {
  const requestOptions = {
                         method :'GET',
                       };
  const response = await fetch(`/access/logout`, requestOptions);
  if (response.ok) {
    window.location.href= '/';
  }
}

const handleError = error => {
  if (error.redirectTo)
    window.location.href= error.redirectTo;
  else
    console.log(`erreur : ${error.message}`);
}
