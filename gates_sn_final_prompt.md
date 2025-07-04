
# 🛠️ Gates.sn — Product Showcase Site with WhatsApp Ordering (React + Vite + Tailwind)

**🧠 Objective:**  
Create a bilingual (English + French), mobile-friendly e-commerce showcase site for **Gates.sn**, where all products are manually added and customers place orders via **WhatsApp**.

---

## 🚀 IMPORTANT

> **Do not reinitialize** React, Tailwind, or Vite.  
The project already includes a working template with everything set up.  

**Your job is to use that base template and build the website using components and structure described below.**  
**All code must match the structure and styling system already in place.**

---

## 📁 Folder Structure (Already Provided in Template)

```
/
├── public/                      # Static assets (product images etc.)
├── src/
│   ├── assets/                  # Icons, fonts, etc.
│   ├── components/              # Reusable components (HeroSlider, Footer, etc.)
│   ├── data/                    # Static product data (products.js)
│   ├── App.jsx                  # Root layout
│   ├── main.jsx                 # Vite entry point
│   └── index.css                # Tailwind and global styles
 for the rest read the template
```

---

## 🌍 Website Features & Goals

### 🛒 1. Product Showcase (Manual Only)
- Products are grouped by category (`Watches`, `Sneakers`, etc.).
- All product info is stored **in `src/data/products.js`**.
- All product **images are added manually to `/public/products/<category>`**.

```js
{
  category: "Watches",
  items: [
    {
      name: "Omega Speedmaster",
      description: {
        en: "Legendary chronograph with manual-wind calibre 1861.",
        fr: "Chronographe légendaire avec calibre manuel 1861.",
      },
      price: "CFA 12000",
      image: "/products/watches/omega-speedmaster.jpg",
    },
  ],
}
```

### 💬 2. WhatsApp Ordering
- Each product card includes a **WhatsApp CTA**:
```jsx
const phone = "221778561029";
const waLink = `https://wa.me/${phone}?text=Hi! I’d like to order: ${encodeURIComponent(name)} 🔥`;
```

### 🌐 3. Bilingual Content
- All text must support **English + French** (via a simple switch).
- Use a `lang` state (`en` | `fr`) via React Context or Prop Drilling.
- Components must render both versions of product info and section titles.

---

## 🧱 Components To Build

| Component        | Purpose                                                                 |
|------------------|-------------------------------------------------------------------------|
| `HeroSlider`     | Full-width auto-rotating banners (with overlay text and CTA)            |
| `ProductSection` | Reusable section to display cards for a specific product category       |
| `AboutSection`   | Brand story (text + image), supports both languages                     |
| `Testimonials`   | User reviews with names and ratings                                     |
| `Navigation`     | Sticky topbar with language toggle, smooth-scroll anchor links          |
| `Footer`         | Contact info, WhatsApp link, social icons, bilingual links              |
| `Logo`           | Distinctive layered text logo with hover scale and shadow animation     |

---

## 🎨 Tailwind Design System

Tailwind is already configured with custom theme colors:

```js
colors: {
  "primary-red": "#CD291E",
  "highlight-yellow": "#FDB912",
  "light-bg": "#FFF9EE",
  "dark-text": "#231F20",
  "deep-green": "#316131",
}
```

You must use **Tailwind utility classes**.  
Refer to the updated Tailwind v3.4+ documentation:  
👉 https://tailwindcss.com/docs/layout

### Transition Utility Example
```css
.transition-default {
  @apply transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)];
}
```

---

## 📷 Product Image Usage

- Place images in: `/public/products/<category>/image.jpg`
- Use them like this:
```jsx
<img
  src="/products/watches/omega-speedmaster.jpg"
  alt={name}
  className="rounded-xl hover:scale-110 transition-default"
/>
```

---

## 🌐 WhatsApp CTA Button Example

```jsx
<a
  href={`https://wa.me/221778561029?text=Hi! I’d like to order: ${encodeURIComponent(name)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
>
  Order on WhatsApp
</a>
```

---

## 🧠 Developer Rules

1. ✅ Do **not** install React, Vite, or Tailwind — use the template.
2. 🧱 Place all new UI in `/src/components/`
3. 🗃️ Product data only goes in `/src/data/products.js` — no database or API.
4. 🌐 Support both **English & French** across every section.
5. 📲 Every product card must include a **WhatsApp order** button.
6. 💡 Add **clear comments** for future manual edits.
7. 📱 Prioritize **mobile-first** responsive layout (use Tailwind’s responsive utilities).
8. 🖼 Optimize for performance (don’t load heavy images in Hero unless needed).

---
