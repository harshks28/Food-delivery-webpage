const foods = [
{id:1,name:"Butter Chicken",category:"Indian",price:289,rating:"4.9",desc:"Creamy tomato gravy with tender chicken.",tag:"Bestseller",img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80"},
{id:2,name:"Paneer Tikka",category:"Indian",price:229,rating:"4.8",desc:"Smoky grilled paneer with mint chutney.",tag:"Veg favourite",img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"},
{id:3,name:"Masala Dosa",category:"Indian",price:149,rating:"4.7",desc:"Crispy dosa with spiced potato filling.",tag:"South Indian",img:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"},
{id:4,name:"Veg Hakka Noodles",category:"Chinese",price:179,rating:"4.6",desc:"Wok-tossed noodles with crunchy vegetables.",tag:"Popular",img:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80"},
{id:5,name:"Schezwan Fried Rice",category:"Chinese",price:189,rating:"4.7",desc:"Fiery rice tossed with vegetables and sauces.",tag:"Spicy",img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80"},
{id:6,name:"Veg Momos",category:"Chinese",price:119,rating:"4.8",desc:"Steamed dumplings served with chilli dip.",tag:"Snack time",img:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80"},
{id:7,name:"Margherita Pizza",category:"Italian",price:249,rating:"4.8",desc:"Classic mozzarella, basil and tomato.",tag:"Classic",img:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"},
{id:8,name:"Creamy Alfredo Pasta",category:"Italian",price:239,rating:"4.7",desc:"Silky white sauce with herbs and parmesan.",tag:"Comfort food",img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"},
{id:9,name:"Classic Burger",category:"Fast Food",price:169,rating:"4.6",desc:"Crispy patty, fresh lettuce and house sauce.",tag:"Quick bite",img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
{id:10,name:"Loaded French Fries",category:"Fast Food",price:129,rating:"4.5",desc:"Golden fries with a cheesy topping.",tag:"Snack",img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
{id:11,name:"Chocolate Brownie",category:"Desserts",price:119,rating:"4.9",desc:"Rich chocolate brownie, soft in the centre.",tag:"Sweet treat",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"},
{id:12,name:"Fresh Fruit Bowl",category:"Desserts",price:139,rating:"4.6",desc:"Seasonal fruits served chilled and fresh.",tag:"Fresh",img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=700&q=80"},
{id:13,name:"Mango Smoothie",category:"Drinks",price:109,rating:"4.8",desc:"A chilled, creamy mango delight.",tag:"Refreshing",img:"https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80"},
{id:14,name:"Iced Coffee",category:"Drinks",price:99,rating:"4.7",desc:"Cold brewed coffee with a creamy finish.",tag:"Chilled",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
{id:15,name:"BBQ Buffet Platter",category:"Buffet",price:499,rating:"4.9",desc:"A sharing platter of smoky grilled favourites.",tag:"For sharing",img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"},
{id:16,name:"Asian Feast Buffet",category:"Buffet",price:449,rating:"4.8",desc:"A mix of Asian-style bites, rice and sides.",tag:"Chef's pick",img:"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80"}
];
const categories=["All","Indian","Chinese","Italian","Fast Food","Buffet","Desserts","Drinks"];
let activeCategory="All";
let cart=JSON.parse(localStorage.getItem("cravecart-cart")||"{}");
const money=n=>"₹"+n.toLocaleString("en-IN");
const grid=document.getElementById("foodGrid");
function renderCategories(){
 document.getElementById("categoryList").innerHTML=categories.map(c=>`<button class="category ${c===activeCategory?"active":""}" data-category="${c}">${({All:"🍽️",Indian:"🇮🇳",Chinese:"🥡",Italian:"🍕","Fast Food":"🍔",Buffet:"🍱",Desserts:"🍰",Drinks:"🥤"})[c]} ${c}</button>`).join("");
}
function renderFoods(){
 const query=document.getElementById("searchInput").value.toLowerCase();
 const filtered=foods.filter(f=>(activeCategory==="All"||f.category===activeCategory)&&(f.name.toLowerCase().includes(query)||f.category.toLowerCase().includes(query)||f.desc.toLowerCase().includes(query)));
 grid.innerHTML=filtered.length?filtered.map(f=>`<article class="food-card">
 <img src="${f.img}" alt="${f.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80'">
 <div class="food-info"><span class="tag">${f.tag}</span><div class="food-top"><h3>${f.name}</h3><span class="rating">★ ${f.rating}</span></div><p>${f.desc}</p><div class="food-bottom"><span class="price">${money(f.price)}</span><button class="add-btn" data-add="${f.id}">＋ Add</button></div></div></article>`).join(""):`<div class="empty">No dishes found. Try another search or category.</div>`;
}
function saveCart(){localStorage.setItem("cravecart-cart",JSON.stringify(cart));renderCart();updateCount();}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();showToast("Added to your cart ✨");}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];saveCart();}
function updateCount(){document.getElementById("cartCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0);}
function renderCart(){
 const entries=Object.entries(cart).filter(([id,q])=>q>0);
 const items=document.getElementById("cartItems");
 if(!entries.length){items.innerHTML='<div class="cart-empty"><div>🧺</div><strong>Your cart is waiting</strong><p>Add something delicious from the menu.</p></div>';}
 else{items.innerHTML=entries.map(([id,q])=>{const f=foods.find(x=>x.id===Number(id));return `<div class="cart-item"><img src="${f.img}" alt=""><div><h4>${f.name}</h4><small>${money(f.price)} each</small><div class="qty"><button data-qty="${id}" data-delta="-1">−</button><strong>${q}</strong><button data-qty="${id}" data-delta="1">+</button></div></div><div><strong>${money(f.price*q)}</strong><br><button class="remove" data-remove="${id}">Remove</button></div></div>`}).join("");}
 const subtotal=entries.reduce((sum,[id,q])=>sum+foods.find(f=>f.id===Number(id)).price*q,0);
 const delivery=subtotal===0||subtotal>=499?0:30;
 document.getElementById("subtotal").textContent=money(subtotal);
 document.getElementById("delivery").textContent=delivery===0?(subtotal===0?"₹0":"FREE"):money(delivery);
 document.getElementById("total").textContent=money(subtotal+delivery);
 document.getElementById("checkoutBtn").disabled=subtotal===0;
 document.getElementById("checkoutBtn").style.opacity=subtotal===0?".5":"1";
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("open");}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("open");}
let toastTimer;function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),1800);}
document.getElementById("categoryList").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;renderCategories();renderFoods();});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add));});
document.getElementById("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]");const r=e.target.closest("[data-remove]");if(q)changeQty(Number(q.dataset.qty),Number(q.dataset.delta));if(r){delete cart[r.dataset.remove];saveCart();}});
document.getElementById("searchInput").addEventListener("input",renderFoods);
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",()=>{if(!Object.keys(cart).length)return;alert("Demo checkout complete! This project does not process real payments.");cart={};saveCart();closeCart();showToast("Thanks for trying CraveCart!");});
renderCategories();renderFoods();renderCart();updateCount();

// Subtle entrance animations as sections and menu cards enter the viewport.
const revealTargets = document.querySelectorAll(".promise, #categories .section-head, #menu .section-head, .food-card");
revealTargets.forEach((el, index) => {
  el.classList.add("reveal");
  if (el.classList.contains("food-card")) el.style.transitionDelay = `${(index % 4) * 65}ms`;
});
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("visible"));
}
