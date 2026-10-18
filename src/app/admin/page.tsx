"use client";
import { useEffect, useState } from "react";
import "./admin.css";
type Product = { id:number; name:string; category:string; price:string; description:string; image:string; active:boolean };
const initial:Product[] = [
{id:1,name:"Racing Suit - Professional",category:"Racing Suits",price:"249.00",description:"Motorsport-style suit for teams and custom branding enquiries.",image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",active:true},
{id:2,name:"Racing Gloves - Premium",category:"Gloves",price:"79.00",description:"Racing-inspired gloves with grip-focused construction.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",active:true},
{id:3,name:"Racing Shoes - Pro Series",category:"Shoes",price:"129.00",description:"Lightweight motorsport footwear for racing collections.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",active:true},
{id:4,name:"Full Face Helmet - Carbon Look",category:"Helmets",price:"199.00",description:"Sport-style helmet listing; verify safety certification before sale.",image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80",active:true},
{id:5,name:"Racing Cap - Velora",category:"Caps",price:"29.00",description:"Team cap with a motorsport-inspired look.",image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80",active:true},
{id:6,name:"Racing Trousers - Performance",category:"Trousers",price:"99.00",description:"Team trousers for uniform and bulk-order enquiries.",image:"https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=700&q=80",active:true}];
const blank:Product={id:0,name:"",category:"Racing Suits",price:"",description:"",image:"",active:true};
export default function AdminPage(){
const [products,setProducts]=useState<Product[]>(initial); const [form,setForm]=useState<Product>(blank); const [editing,setEditing]=useState(false); const [notice,setNotice]=useState("Demo mode: changes are saved in this browser only.");
useEffect(()=>{try{const s=localStorage.getItem("velora-demo-products");if(s)setProducts(JSON.parse(s));}catch{}},[]);
function save(next:Product[]){setProducts(next);try{localStorage.setItem("velora-demo-products",JSON.stringify(next));setNotice("Saved in this browser only. Shared database is not connected.");}catch{setNotice("Could not save locally.");}}
function submit(e:React.FormEvent){e.preventDefault();save(editing?products.map(p=>p.id===form.id?form:p):[...products,{...form,id:Date.now()}]);setForm(blank);setEditing(false);}
return <main className="admin-shell"><header className="admin-top"><a className="admin-brand" href="/"><span>V</span> VELORA <small>RACING EXPORTS</small></a><a href="/">← View storefront</a></header>
<section className="admin-hero"><div><p className="eyebrow">STORE CONTROL / DEMO</p><h1>Admin <em>Dashboard</em></h1><p>Manage your starter catalogue and sample prices.</p></div><div className="admin-warning">DEMO ONLY — no secure login or shared database is connected.</div></section>
<div className="admin-notice">{notice}</div><section className="admin-stats"><div><span>Products</span><strong>{products.length}</strong></div><div><span>Visible listings</span><strong>{products.filter(p=>p.active).length}</strong></div><div><span>Contact number</span><strong>0301111111</strong></div></section>
<section className="admin-columns"><form className="admin-form" onSubmit={submit}><p className="eyebrow">{editing?"EDIT LISTING":"NEW LISTING"}</p><h2>{editing?"Update product":"Add a product"}</h2>
<label>Product name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
<label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{["Racing Suits","Gloves","Shoes","Helmets","Caps","Trousers","Shirts","Accessories"].map(c=><option key={c}>{c}</option>)}</select></label>
<label>Price (USD)<input required type="number" min="0" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></label>
<label>Image URL<input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="https://..."/></label>
<label>Product details<textarea rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
<label className="admin-check"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})}/> Visible in demo list</label>
<button className="admin-save">{editing?"Save changes":"Add product"} →</button>{editing&&<button type="button" className="admin-cancel" onClick={()=>{setForm(blank);setEditing(false)}}>Cancel</button>}</form>
<div className="admin-list"><div className="admin-list-head"><h2>Product listings</h2><button type="button" onClick={()=>{setForm(blank);setEditing(false)}}>+ New product</button></div>
{products.map(p=><article className="admin-product" key={p.id}><div className="admin-product-img">{p.image?<img src={p.image} alt={p.name}/>:<span>VR</span>}</div><div className="admin-product-copy"><strong>{p.name}</strong><span>{p.category} · USD {Number(p.price||0).toFixed(2)}</span><p>{p.description}</p><small className={p.active?"active":"inactive"}>{p.active?"VISIBLE":"HIDDEN"}</small></div><div className="admin-product-actions"><button type="button" onClick={()=>{setForm(p);setEditing(true);window.scrollTo({top:0,behavior:"smooth"})}}>Edit</button><button type="button" onClick={()=>save(products.map(x=>x.id===p.id?{...x,active:!x.active}:x))}>{p.active?"Hide":"Show"}</button><button type="button" onClick={()=>{if(confirm("Delete this demo listing?"))save(products.filter(x=>x.id!==p.id))}}>Delete</button></div></article>)}</div></section>
<footer className="admin-footer">Contact: <a href="https://wa.me/923011111111" target="_blank" rel="noreferrer">WhatsApp +92 301 1111111</a>. Sample listings and prices should be verified before orders.</footer></main>}
