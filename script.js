// Point this at your running TAQREEB backend (see the eventhub-backend project).
const API_BASE = "http://localhost:4000/api";

// Used only if the backend can't be reached, so the site still works offline.
const FALLBACK_VENDORS=[
{name:"Royal Pearl Banquet",cat:"Venue",price:450000,rating:4.8,distance:"3.1 km",icon:"🏛️",deal:"Free event setup",area:"DHA",capacity:600},
{name:"ABC Event Decorators",cat:"Decoration",price:120000,rating:4.8,distance:"4.2 km",icon:"🌸",deal:"15% OFF",area:"Korangi",capacity:null},
{name:"Karachi Grand Catering",cat:"Catering",price:250000,rating:4.7,distance:"6.5 km",icon:"🍽️",deal:"Dessert table free",area:"Gulshan-e-Iqbal",capacity:null},
{name:"Moments Studio",cat:"Photography",price:150000,rating:4.9,distance:"5.1 km",icon:"📸",deal:"Drone included",area:"Clifton",capacity:null},
{name:"Royal Bridal & Beauty",cat:"Makeup",price:65000,rating:4.8,distance:"2.7 km",icon:"💄",deal:"10% OFF",area:"North Nazimabad",capacity:null},
{name:"Luxury Event Transport",cat:"Transport",price:55000,rating:4.6,distance:"7.4 km",icon:"🚘",deal:"Free airport transfer",area:"Saddar",capacity:null},
{name:"Sound & Stage Pro",cat:"Entertainment",price:90000,rating:4.7,distance:"8.1 km",icon:"🎤",deal:"Sound upgrade free",area:"Malir",capacity:null},
{name:"Creative Invitations",cat:"Invitations",price:18000,rating:4.6,distance:"5.7 km",icon:"💌",deal:"Digital invite free",area:"PECHS",capacity:null},
{name:"Party Rentals Karachi",cat:"Rentals",price:45000,rating:4.5,distance:"9.2 km",icon:"🪑",deal:"10% OFF",area:"Bahadurabad",capacity:null},
{name:"Sweet Moments Cakes",cat:"Cakes",price:12000,rating:4.9,distance:"3.8 km",icon:"🍰",deal:"Free delivery",area:"Gulistan-e-Johar",capacity:null},
{name:"Perfect Event Planners",cat:"Planning",price:75000,rating:4.8,distance:"4.9 km",icon:"📋",deal:"Free consultation",area:"DHA",capacity:null},
{name:"GiftCraft Favors",cat:"Gifts",price:25000,rating:4.7,distance:"6.2 km",icon:"🎁",deal:"Buy 100 get 10 free",area:"Korangi",capacity:null},
{name:"The Pioneer Banquet",cat:"Venue",price:50000,rating:4.6,distance:"5.4 km",icon:"🏛️",deal:"Verified venue",area:"Korangi",capacity:600},
{name:"Al Mustafa Banquet",cat:"Venue",price:80000,rating:4.7,distance:"6.0 km",icon:"🏛️",deal:"Verified venue",area:"Korangi",capacity:700},
{name:"Zamzam Marquee A",cat:"Venue",price:150000,rating:4.8,distance:"7.2 km",icon:"⛺",deal:"Verified venue",area:"Shahrah-e-Faisal",capacity:600},
{name:"Clock Towers Banquet",cat:"Venue",price:130000,rating:4.7,distance:"4.6 km",icon:"🏛️",deal:"Verified venue",area:"Korangi",capacity:1000},
{name:"The Heavens Banquet",cat:"Venue",price:130000,rating:4.6,distance:"5.9 km",icon:"🏛️",deal:"Verified venue",area:"Gulistan-e-Johar",capacity:450},
{name:"Rotana Banquet",cat:"Venue",price:70000,rating:4.5,distance:"3.9 km",icon:"🏛️",deal:"Verified venue",area:"Gulistan-e-Johar",capacity:500},
{name:"Nomi Ansari Bridals",cat:"Clothing",price:180000,rating:4.9,distance:"4.0 km",icon:"👗",deal:"Free dupatta styling",area:"DHA",capacity:null},
{name:"Sana Safinaz Studio",cat:"Clothing",price:95000,rating:4.8,distance:"3.3 km",icon:"👗",deal:"10% OFF on 3-piece",area:"Clifton",capacity:null},
{name:"Khaadi Groom Collection",cat:"Clothing",price:45000,rating:4.6,distance:"5.8 km",icon:"🤵",deal:"Free alterations",area:"Bahadurabad",capacity:null},
{name:"Elan Wedding Couture",cat:"Clothing",price:220000,rating:4.9,distance:"6.4 km",icon:"👗",deal:"Complimentary trial",area:"North Nazimabad",capacity:null},
{name:"Rent-a-Sherwani Karachi",cat:"Clothing",price:15000,rating:4.5,distance:"7.1 km",icon:"🤵",deal:"3-day rental, 15% OFF",area:"Saddar",capacity:null}
];

let currentVendors=[]; // last-rendered list, used by book/view/whatsapp to look up a vendor's id

function qs(params){
  const clean=Object.fromEntries(Object.entries(params).filter(([,v])=>v!==undefined&&v!==null&&v!==""));
  return new URLSearchParams(clean).toString();
}
function localMatch(price,budget){
  if(!budget) return 90;
  return Math.max(60,Math.min(99,Math.round(100-Math.abs(price-budget)/budget*60)));
}

// GET /api/vendors — falls back to the offline list if the API isn't reachable.
async function loadVendors(params={}){
  try{
    const res=await fetch(`${API_BASE}/vendors?${qs(params)}`);
    if(!res.ok) throw new Error("API error "+res.status);
    const data=await res.json();
    render(data.vendors.map(v=>({id:v.id,name:v.name,cat:v.category,price:v.price,rating:v.rating,distance:v.distance,icon:v.icon,deal:v.deal,area:v.area,capacity:v.capacity,match:v.match})));
  }catch(err){
    console.warn("TAQREEB API unreachable, showing offline demo data:",err.message);
    let list=FALLBACK_VENDORS.map(v=>({...v,match:localMatch(v.price,params.budget)}));
    if(params.category) list=list.filter(v=>v.cat===params.category);
    if(params.area) list=list.filter(v=>v.area===params.area);
    if(params.guests) list=list.filter(v=>!v.capacity||v.capacity>=Number(params.guests));
    render(list.sort((a,b)=>b.match-a.match));
  }
}

function render(list){
  currentVendors=list;
  document.getElementById("vendorGrid").innerHTML=list.map(v=>`
<div class="vendor">
<div class="vendor-img">${v.icon||"🎉"}</div>
<div class="vendor-body">
<div class="vendor-top"><span class="verified">✓ Verified</span><span class="rating">★ ${v.rating}</span></div>
<h3>${v.name}</h3><p class="muted">${v.cat} · 📍 ${v.area||''} · ${v.distance||''}</p>
${v.capacity?`<p class="capacity">👥 Up to ${v.capacity} guests</p>`:''}
<div class="price">Starting From PKR ${v.price.toLocaleString()}</div>
<div class="deal">🔥 ${v.deal}</div>
<p><strong>💰 ${v.match}% Budget Match</strong></p>
<div class="progress"><span style="width:${v.match}%"></span></div>
<div class="vendor-actions"><button class="btn btn-light" onclick="viewVendor('${v.name}')">View</button><button class="btn btn-primary" onclick="book('${v.name}')">Book</button><button class="btn btn-whatsapp" onclick="bookWhatsApp('${v.name}')">WhatsApp</button></div>
</div></div>`).join("");
}

function selectEvent(eventName){
  document.getElementById("eventType").value=eventName;
  document.querySelector(".hero").scrollIntoView({behavior:"smooth"});
  findVendors();
}
function filterCategory(cat){loadVendors({category:cat});document.getElementById("vendors").scrollIntoView({behavior:"smooth"});}
function filterArea(area){loadVendors({area});document.getElementById("vendors").scrollIntoView({behavior:"smooth"});}
function setFlex(el){document.querySelectorAll(".flex-chips .chip").forEach(c=>c.classList.remove("active"));el.classList.add("active");}
function showAll(){loadVendors();}
function findVendors(){
  const budget=Number(document.getElementById("budget").value)||undefined;
  const guests=document.getElementById("guestCount").value;
  loadVendors({budget,guests});
  document.getElementById("vendors").scrollIntoView({behavior:"smooth"});
}

// POST /api/bookings
async function book(name){
  const v=currentVendors.find(x=>x.name===name);
  const phone=prompt(`Enter your phone number to request a booking with ${name}:`);
  if(!phone) return;
  try{
    const res=await fetch(`${API_BASE}/bookings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
      vendorId:v?.id,customerName:"Website Visitor",customerPhone:phone,
      eventType:document.getElementById("eventType")?.value,eventDate:document.getElementById("date")?.value,
      guestCount:document.getElementById("guestCount")?.value,budget:document.getElementById("budget")?.value
    })});
    const data=await res.json();
    if(!res.ok) throw new Error(data.error||"Booking failed");
    alert(data.message||`Booking request sent to ${name}!`);
  }catch(err){
    alert(`Couldn't reach the TAQREEB server (${err.message}). Start the backend to send this booking live — for now it hasn't been recorded.`);
  }
}
function bookWhatsApp(name){
  const v=currentVendors.find(x=>x.name===name);
  fetch(`${API_BASE}/bookings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
    vendorId:v?.id,customerName:"WhatsApp Visitor",customerPhone:"via-whatsapp",
    eventType:document.getElementById("eventType")?.value,eventDate:document.getElementById("date")?.value,
    guestCount:document.getElementById("guestCount")?.value,budget:document.getElementById("budget")?.value,
    message:"Contacted via WhatsApp button"
  })}).catch(()=>{}); // best-effort log; don't block the WhatsApp link either way
  window.open("https://wa.me/923000000000?text="+encodeURIComponent(`Hi! I'd like to check availability and pricing for ${name}.`),"_blank");
}

// GET /api/vendors/:id
async function viewVendor(name){
  const v=currentVendors.find(x=>x.name===name);
  if(!v?.id){ alert(`${name}\n\nConnect this to the TAQREEB API to show the full profile (packages, portfolio, reviews, availability).`); return; }
  try{
    const res=await fetch(`${API_BASE}/vendors/${v.id}`);
    const data=await res.json();
    if(!res.ok) throw new Error(data.error||"Vendor not found");
    const reviewLines=(data.reviews||[]).slice(0,3).map(r=>`★${r.rating} ${r.author_name}: ${r.comment||""}`).join("\n") || "No reviews yet.";
    alert(`${data.name}\n${data.category} · ${data.area||""}\nStarting from PKR ${data.price.toLocaleString()}\n${data.description||""}\n\nReviews:\n${reviewLines}`);
  }catch(err){
    alert(`Couldn't load ${name} from the server (${err.message}).`);
  }
}

// POST /api/auth/register + POST /api/vendors
async function submitVendorRegistration(){
  const businessName=document.getElementById("regBusiness").value.trim();
  const ownerName=document.getElementById("regOwner").value.trim();
  const category=document.getElementById("regCategory").value;
  const phone=document.getElementById("regPhone").value.trim();
  const email=document.getElementById("regEmail").value.trim();
  const password=document.getElementById("regPassword").value;
  if(!businessName||!ownerName||category==="Select Category"||!phone||!email||!password){
    alert("Please fill in every field, including a category, email and password.");
    return;
  }
  try{
    const reg=await fetch(`${API_BASE}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"vendor",name:ownerName,email,phone,password})});
    const regData=await reg.json();
    if(!reg.ok) throw new Error(regData.error||"Registration failed");
    const listing=await fetch(`${API_BASE}/vendors`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+regData.token},body:JSON.stringify({name:businessName,category,price:50000,phone})});
    const listingData=await listing.json();
    if(!listing.ok) throw new Error(listingData.error||"Listing creation failed");
    alert(`${businessName} is registered! Your listing is pending review before it goes live on TAQREEB.`);
    closeModal('vendorModal');
  }catch(err){
    alert(`Couldn't reach the TAQREEB server (${err.message}). Make sure the backend is running, then try again.`);
  }
}

function openModal(id){document.getElementById(id).classList.add("active")}
function closeModal(id){document.getElementById(id).classList.remove("active")}

// POST /api/budget/plan
async function calculateBudget(){
  const b=Number(document.getElementById("budgetInput").value)||2000000;
  try{
    const res=await fetch(`${API_BASE}/budget/plan`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({totalBudget:b})});
    const data=await res.json();
    if(!res.ok) throw new Error(data.error||"Budget plan failed");
    document.getElementById("budgetResult").innerHTML=data.breakdown.map(r=>`<div class="budget-row"><span>${r.category}</span><strong>PKR ${r.amount.toLocaleString()}</strong></div>`).join("");
  }catch(err){
    const rows=[["Food & Catering",.30],["Venue",.25],["Decoration",.15],["Photography",.10],["Dress & Beauty",.12],["Transport & Other",.08]];
    document.getElementById("budgetResult").innerHTML=rows.map(r=>`<div class="budget-row"><span>${r[0]}</span><strong>PKR ${Math.round(b*r[1]).toLocaleString()}</strong></div>`).join("")
      +`<p class="muted" style="font-size:12px;margin-top:10px">Offline estimate — start the TAQREEB backend for the live planner.</p>`;
  }
}

const cal=document.getElementById("calendar");
["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d=>cal.innerHTML+=`<div class="day"><strong>${d}</strong></div>`);
for(let i=1;i<=31;i++){let c=i%7===0||i%11===0?"booked":i%5===0?"pending":"available";cal.innerHTML+=`<div class="day ${c}">${i}</div>`}

loadVendors();