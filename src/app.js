// src/app.js

// 1. Catálogo de Productos Premium
const PRODUCTS = [
  {
    id: 'pan-saborizado',
    name: 'Pan Saborizado de Queso o Salame',
    category: 'pan',
    price: 3200,
    description: 'Deliciosos pancitos saborizados artesanales, elaborados con queso premium o salame seleccionado de la región. Suaves, tiernos y súper sabrosos.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIRNiWkLeBlH0Lmxbw-IZHcswmWmJj5YXJuyeukRzCgdAbNZ4BSGbFsazvGRQ5gd37zwBp9fIo2QJHr7hAXFRoqq1MoiaeI72bxiibF9od3SqJEuos4eFnYcxndgLAzdln_uNxztwuaZIG1RLWOmStGgg-WultdECXbM58WzroLIptoJcVH9xIl2Nar-XjyFlOTXRzHgZgDcVhwYCkWX7gBcTolLp2caX7MyE3OiccWLIed3ZYoGzivsxsi31sL2zNvp9n4vV93M',
    alt: 'Pancitos saborizados redondos y dorados, rellenos con queso fundido y trozos de salame artesanal.'
  },
  {
    id: 'pan-minon',
    name: 'Pan Miñón Tradicional x 1kg',
    category: 'pan',
    price: 2000,
    description: 'Clásicos miñones de panadería tradicional, con una corteza fina y crocante y una miga súper esponjosa. Ideales para el día a día.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIRNiWkLeBlH0Lmxbw-IZHcswmWmJj5YXJuyeukRzCgdAbNZ4BSGbFsazvGRQ5gd37zwBp9fIo2QJHr7hAXFRoqq1MoiaeI72bxiibF9od3SqJEuos4eFnYcxndgLAzdln_uNxztwuaZIG1RLWOmStGgg-WultdECXbM58WzroLIptoJcVH9xIl2Nar-XjyFlOTXRzHgZgDcVhwYCkWX7gBcTolLp2caX7MyE3OiccWLIed3ZYoGzivsxsi31sL2zNvp9n4vV93M',
    alt: 'Una canasta llena de pancitos miñón tradicionales crujientes y tiernos.'
  },
  {
    id: 'pan-casero',
    name: 'Pan Casero de Campo x Unidad',
    category: 'pan',
    price: 1800,
    description: 'Pan de campo tradicional horneado a la piedra. Elaborado con un toque de grasa de pella seleccionada para lograr ese sabor único y rústico.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIRNiWkLeBlH0Lmxbw-IZHcswmWmJj5YXJuyeukRzCgdAbNZ4BSGbFsazvGRQ5gd37zwBp9fIo2QJHr7hAXFRoqq1MoiaeI72bxiibF9od3SqJEuos4eFnYcxndgLAzdln_uNxztwuaZIG1RLWOmStGgg-WultdECXbM58WzroLIptoJcVH9xIl2Nar-XjyFlOTXRzHgZgDcVhwYCkWX7gBcTolLp2caX7MyE3OiccWLIed3ZYoGzivsxsi31sL2zNvp9n4vV93M',
    alt: 'Hogaza de pan casero de campo redondo con corteza rústica y dorada sobre tabla de madera.'
  },
  {
    id: 'medialunas-comunes',
    name: 'Medialunas Comunes',
    category: 'facturas',
    price: 800,
    description: 'Las medialunas tradicionales de panadería, súper livianas y esponjosas, con el toque justo de nuestro almíbar cítrico brillante. (Precio por unidad)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU28ZD9ewpwew5KtyRjTEoWbHuSqvhGZK2qlY5h3tiBiqOfB9lTG1Yveix_UB5JzKydslv8nRzePAETR6QCDcyP5vRm65Ji6cEaxFV_H3FFxFlABVjaOd2P8g2yRyrdWW-mksXsyNd2VTLajmP4AnYiB5hEP9blBV53xNdPeSdJMzYYKBiXoU3eCk-oq4jefN7mbn45rrGhDsZz1Ip5OAw8uAFPA6F9kIof7Atot2vG1fqZ9kyRqeX1kX2P4d88Deb-4GZ8McjLUw',
    alt: 'Medialunas comunes hojaldradas y brillantes, recién horneadas y dispuestas en plato de cerámica blanca.'
  },
  {
    id: 'factura-pastelera',
    name: 'Factura con Crema Pastelera y Membrillo',
    category: 'facturas',
    price: 1000,
    description: 'Masa dulce tradicional rellena con crema pastelera suave y dulce de membrillo casero. (Precio por unidad)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU28ZD9ewpwew5KtyRjTEoWbHuSqvhGZK2qlY5h3tiBiqOfB9lTG1Yveix_UB5JzKydslv8nRzePAETR6QCDcyP5vRm65Ji6cEaxFV_H3FFxFlABVjaOd2P8g2yRyrdWW-mksXsyNd2VTLajmP4AnYiB5hEP9blBV53xNdPeSdJMzYYKBiXoU3eCk-oq4jefN7mbn45rrGhDsZz1Ip5OAw8uAFPA6F9kIof7Atot2vG1fqZ9kyRqeX1kX2P4d88Deb-4GZ8McjLUw',
    alt: 'Facturas rellenas con dulce de membrillo brillante y crema pastelera suave.'
  },
  {
    id: 'vigilantes-almibar',
    name: 'Vigilantes Tradicionales con Azúcar',
    category: 'facturas',
    price: 950,
    description: 'Factura alargada de hojaldre crocante espolvoreada con azúcar granulada y almíbar templado. (Precio por unidad)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU28ZD9ewpwew5KtyRjTEoWbHuSqvhGZK2qlY5h3tiBiqOfB9lTG1Yveix_UB5JzKydslv8nRzePAETR6QCDcyP5vRm65Ji6cEaxFV_H3FFxFlABVjaOd2P8g2yRyrdWW-mksXsyNd2VTLajmP4AnYiB5hEP9blBV53xNdPeSdJMzYYKBiXoU3eCk-oq4jefN7mbn45rrGhDsZz1Ip5OAw8uAFPA6F9kIof7Atot2vG1fqZ9kyRqeX1kX2P4d88Deb-4GZ8McjLUw',
    alt: 'Vigilantes de hojaldre dulce cubiertos con azúcar en una cesta.'
  },
  {
    id: 'torta-comun',
    name: 'Torta Común Clásica',
    category: 'tortas',
    price: 14000,
    description: 'Bizcochuelo súper esponjoso y húmedo de vainilla o chocolate, con doble relleno de dulce de leche clásico y cobertura suave de merengue italiano o crema decorativa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTyflqBmhhc_0svnaKczpb2NlWVDho4r5QXDVKmc2ZzyBaBw8rsXD9SGvxwPvz7MAczsAb8lEaUsk7434Xb2AtTnti1FTWkMI6JGTkerH2rts6cDlxmWRQvmBK_FWIQyDvYOWFFDzlPfgB6jxQkw0Wds5H1uEzRso2AuuOKHv49IZFIEDPD-K9xc4e24rJHTMDjLE6bDl_6ginkZECwALnWAllKAnCjvYE8mlI-X5q1CDHGmEHEfRre6mKNWLKVJKVG9SeU2R2wv8',
    alt: 'Torta clásica de cumpleaños con merengue decorado y dulce de leche.'
  },
  {
    id: 'torta-especial',
    name: 'Torta Especial Decorada (Relleno de Fruta o Diseño)',
    category: 'tortas',
    price: 22000,
    description: 'Creación premium a tu medida. Con rellenos premium (frutas frescas de estación, crema chantilly, mousse) o decoraciones personalizadas y diseños temáticos a elección.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTyflqBmhhc_0svnaKczpb2NlWVDho4r5QXDVKmc2ZzyBaBw8rsXD9SGvxwPvz7MAczsAb8lEaUsk7434Xb2AtTnti1FTWkMI6JGTkerH2rts6cDlxmWRQvmBK_FWIQyDvYOWFFDzlPfgB6jxQkw0Wds5H1uEzRso2AuuOKHv49IZFIEDPD-K9xc4e24rJHTMDjLE6bDl_6ginkZECwALnWAllKAnCjvYE8mlI-X5q1CDHGmEHEfRre6mKNWLKVJKVG9SeU2R2wv8',
    alt: 'Torta especial decorada de manera sofisticada con detalles de crema premium y frutas frescas de estación.'
  },
  {
    id: 'tiramisu',
    name: 'Tiramisú Tradicional Italiano',
    category: 'tortas',
    price: 17500,
    description: 'Exquisito postre clásico elaborado con vainillas caseras humedecidas en auténtico café espresso y licor de café, crema sedosa de queso mascarpone y cacao amargo espolvoreado.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTyflqBmhhc_0svnaKczpb2NlWVDho4r5QXDVKmc2ZzyBaBw8rsXD9SGvxwPvz7MAczsAb8lEaUsk7434Xb2AtTnti1FTWkMI6JGTkerH2rts6cDlxmWRQvmBK_FWIQyDvYOWFFDzlPfgB6jxQkw0Wds5H1uEzRso2AuuOKHv49IZFIEDPD-K9xc4e24rJHTMDjLE6bDl_6ginkZECwALnWAllKAnCjvYE8mlI-X5q1CDHGmEHEfRre6mKNWLKVJKVG9SeU2R2wv8',
    alt: 'Cremosa porción de tiramisú tradicional italiano espolvoreado con abundante cacao amargo.'
  },
  {
    id: 'lemon-pie',
    name: 'Lemon Pie de Crema Suave',
    category: 'tortas',
    price: 16000,
    description: 'Masa quebrada crocante, crema suave de limón natural y abundante merengue italiano perfectamente flambeado.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTyflqBmhhc_0svnaKczpb2NlWVDho4r5QXDVKmc2ZzyBaBw8rsXD9SGvxwPvz7MAczsAb8lEaUsk7434Xb2AtTnti1FTWkMI6JGTkerH2rts6cDlxmWRQvmBK_FWIQyDvYOWFFDzlPfgB6jxQkw0Wds5H1uEzRso2AuuOKHv49IZFIEDPD-K9xc4e24rJHTMDjLE6bDl_6ginkZECwALnWAllKAnCjvYE8mlI-X5q1CDHGmEHEfRre6mKNWLKVJKVG9SeU2R2wv8',
    alt: 'Lemon pie redondo clásico con picos de merengue dorado.'
  },
  {
    id: 'masas-finas',
    name: 'Masas Finas de Confitería x 1kg',
    category: 'confiteria',
    price: 15000,
    description: 'Selección de masas finas y secas tradicionales elaboradas a mano: bocaditos de dulce de leche y chocolate, alfajorcitos de nuez, ojitos de membrillo y mini tartitas de coco.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZoY2YFXM5SUYF68IysKWGbvMwJqGbtr1r1Iom2YaBDCgHbN4kjzF2VA47yMocc_A8CCKyDwaqOntl_lGpMSVdCjfybgG8VZjEUk8mSHmNJM8oA9ff4m2IfJeeKrJ74M6U4TiE4NSmb3MVjK89V91M-1r6LpLBoqBKm02k8pXkNr8Z_wQdPiCYWzNBXRWh8qp407fLGYLeT9LxGFUY_npyGoxPktKhyYDuO9JDtFZiaxsIE3x3vPeaQDwZhhZQemPDha-Wvf1_gao',
    alt: 'Elegante bandeja de masas finas tradicionales dispuestas simétricamente, decoradas con frutos secos, chocolate y dulce de leche.'
  },
  {
    id: 'tartas-frutales',
    name: 'Tarta Frutal de Estación x Unidad',
    category: 'confiteria',
    price: 11000,
    description: 'Base de masa quebrada crocante, rellena con crema pastelera suave de vainilla natural, decorada con una selección brillante y colorida de frutas de estación frescas (kiwi, durazno, arándanos y frutillas).',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZoY2YFXM5SUYF68IysKWGbvMwJqGbtr1r1Iom2YaBDCgHbN4kjzF2VA47yMocc_A8CCKyDwaqOntl_lGpMSVdCjfybgG8VZjEUk8mSHmNJM8oA9ff4m2IfJeeKrJ74M6U4TiE4NSmb3MVjK89V91M-1r6LpLBoqBKm02k8pXkNr8Z_wQdPiCYWzNBXRWh8qp407fLGYLeT9LxGFUY_npyGoxPktKhyYDuO9JDtFZiaxsIE3x3vPeaQDwZhhZQemPDha-Wvf1_gao',
    alt: 'Fina tarta frutal redonda decorada con láminas de durazno, rodajas de kiwi brillante, frutillas y gel de brillo.'
  },
  {
    id: 'alfajores-maicena',
    name: 'Alfajores de Maicena Tradicionales (x6)',
    category: 'confiteria',
    price: 6000,
    description: 'Suaves tapas de fécula de maíz que se deshacen en la boca, con abundante relleno de dulce de leche y coco rallado.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZoY2YFXM5SUYF68IysKWGbvMwJqGbtr1r1Iom2YaBDCgHbN4kjzF2VA47yMocc_A8CCKyDwaqOntl_lGpMSVdCjfybgG8VZjEUk8mSHmNJM8oA9ff4m2IfJeeKrJ74M6U4TiE4NSmb3MVjK89V91M-1r6LpLBoqBKm02k8pXkNr8Z_wQdPiCYWzNBXRWh8qp407fLGYLeT9LxGFUY_npyGoxPktKhyYDuO9JDtFZiaxsIE3x3vPeaQDwZhhZQemPDha-Wvf1_gao',
    alt: 'Alfajores de maicena caseros con dulce de leche desbordando y coco rallado.'
  }
];

// 2. Estado Global (Carrito)
let cart = [];

// Inicializar el Carrito desde LocalStorage
function initCart() {
  const savedCart = localStorage.getItem('sandrita_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
  updateCartUI();
}

// Guardar el Carrito en LocalStorage
function saveCart() {
  localStorage.setItem('sandrita_cart', JSON.stringify(cart));
  updateCartUI();
}

// Añadir Producto al Carrito
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  saveCart();
  
  // Efecto visual de agregado
  showNotification(`¡Agregado al carrito: ${product.name}!`);
}

// Cambiar Cantidad de Producto
function updateQuantity(productId, newQty) {
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  if (newQty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = newQty;
  }
  saveCart();
}

// Eliminar un Producto del Carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// Vaciar Carrito
function clearCart() {
  cart = [];
  saveCart();
}

// Formatear Moneda a Peso Argentino (ARS)
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(amount);
}

// Mostrar Notificación Flotante
function showNotification(message) {
  const container = document.getElementById('notificationContainer') || createNotificationContainer();
  const notification = document.createElement('div');
  notification.className = 'bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed px-6 py-3 rounded-full font-label-md text-label-md shadow-lg flex items-center gap-3 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto';
  notification.innerHTML = `
    <span class="material-symbols-outlined text-sm text-secondary-fixed">check_circle</span>
    <span>${message}</span>
  `;
  
  container.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.classList.remove('translate-y-4', 'opacity-0');
    notification.classList.add('translate-y-0', 'opacity-100');
  }, 10);
  
  // Salida automática
  setTimeout(() => {
    notification.classList.remove('translate-y-0', 'opacity-100');
    notification.classList.add('-translate-y-4', 'opacity-0');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function createNotificationContainer() {
  const container = document.createElement('div');
  container.id = 'notificationContainer';
  container.className = 'fixed bottom-24 right-6 md:right-12 z-[150] flex flex-col gap-3 pointer-events-none';
  document.body.appendChild(container);
  return container;
}

// Actualizar UI del Carrito (Contador y Drawer)
function updateCartUI() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Actualizar los contadores en los iconos del carrito (Navbar y flotante)
  const cartBadges = document.querySelectorAll('.cart-badge');
  cartBadges.forEach(badge => {
    badge.textContent = totalItems;
    if (totalItems > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });

  // Actualizar contenido del cajón del carrito
  const cartDrawerItems = document.getElementById('cartDrawerItems');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartMainContent = document.getElementById('cartMainContent');
  const cartTotalPrice = document.getElementById('cartTotalPrice');

  if (totalItems === 0) {
    cartEmptyState.classList.remove('hidden');
    cartMainContent.classList.add('hidden');
  } else {
    cartEmptyState.classList.add('hidden');
    cartMainContent.classList.remove('hidden');

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      html += `
        <div class="flex items-center gap-4 py-4 border-b border-outline/10 dark:border-white/10">
          <img class="w-16 h-16 object-cover rounded-md" src="${item.image}" alt="${item.name}">
          <div class="flex-1 min-w-0">
            <h4 class="font-label-md text-label-md text-primary dark:text-primary-fixed truncate">${item.name}</h4>
            <p class="text-sm text-on-surface-variant dark:text-tertiary-fixed-dim/80 mt-1">${formatCurrency(item.price)} c/u</p>
            <div class="flex items-center gap-2 mt-2">
              <button class="qty-btn-minus w-6 h-6 rounded-full border border-outline/30 flex items-center justify-center text-sm font-bold text-on-surface-variant dark:text-white" data-id="${item.id}">-</button>
              <span class="text-sm font-semibold px-2">${item.quantity}</span>
              <button class="qty-btn-plus w-6 h-6 rounded-full border border-outline/30 flex items-center justify-center text-sm font-bold text-on-surface-variant dark:text-white" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="text-right">
            <p class="font-label-md text-label-md text-primary dark:text-primary-fixed font-semibold">${formatCurrency(itemTotal)}</p>
            <button class="btn-remove-item text-xs text-error mt-2 flex items-center gap-1 ml-auto" data-id="${item.id}">
              <span class="material-symbols-outlined text-sm">delete</span> Eliminar
            </button>
          </div>
        </div>
      `;
    });

    cartDrawerItems.innerHTML = html;
    cartTotalPrice.textContent = formatCurrency(subtotal);

    // Eventos de botones dentro del carrito
    document.querySelectorAll('.qty-btn-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) updateQuantity(id, item.quantity - 1);
      });
    });

    document.querySelectorAll('.qty-btn-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) updateQuantity(id, item.quantity + 1);
      });
    });

    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }
}

// 3. Catálogo Dinámico & Filtrado
function renderCatalog(categoryFilter = 'todos') {
  const container = document.getElementById('catalogContainer');
  if (!container) return;

  const filtered = categoryFilter === 'todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === categoryFilter);

  let html = '';
  filtered.forEach(p => {
    html += `
      <div class="group cursor-pointer flex flex-col bg-surface-container-lowest dark:bg-inverse-surface border border-outline/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div class="overflow-hidden aspect-[4/3] relative">
          <img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${p.image}" alt="${p.alt}">
          <span class="absolute top-3 left-3 bg-secondary text-on-secondary px-3 py-1 text-xs rounded-full font-semibold uppercase tracking-wider">${p.category}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed mb-2">${p.name}</h3>
            <p class="text-sm text-on-surface-variant dark:text-tertiary-fixed-dim/70 mb-4 line-clamp-3">${p.description}</p>
          </div>
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-headline-sm font-bold text-primary dark:text-primary-fixed">${formatCurrency(p.price)}</span>
            </div>
            
            <!-- Selector de Cantidad e Incremento -->
            <div class="flex items-center gap-3">
              <div class="flex items-center border border-outline/30 rounded-full px-2 py-1 bg-surface dark:bg-primary-container/20">
                <button class="btn-qty-dec w-8 h-8 flex items-center justify-center text-lg font-semibold" data-target="qty-${p.id}">-</button>
                <input class="w-10 bg-transparent text-center border-0 p-0 focus:ring-0 text-sm font-semibold" id="qty-${p.id}" type="number" min="1" value="1" readonly>
                <button class="btn-qty-inc w-8 h-8 flex items-center justify-center text-lg font-semibold" data-target="qty-${p.id}">+</button>
              </div>
              <button class="btn-add-to-cart flex-1 bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed py-2 rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-2" data-id="${p.id}">
                <span class="material-symbols-outlined text-sm">shopping_cart</span>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Enlazar Eventos de Cantidad en Tarjetas
  container.querySelectorAll('.btn-qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-target');
      const input = document.getElementById(inputId);
      input.value = parseInt(input.value) + 1;
    });
  });

  container.querySelectorAll('.btn-qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.getAttribute('data-target');
      const input = document.getElementById(inputId);
      const val = parseInt(input.value);
      if (val > 1) input.value = val - 1;
    });
  });

  // Enlazar Evento Agregar al Carrito
  container.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const qtyInput = document.getElementById(`qty-${id}`);
      const qty = parseInt(qtyInput.value) || 1;
      addToCart(id, qty);
      
      // Reset cantidad en tarjeta
      qtyInput.value = 1;
    });
  });
}

// Configurar los Eventos de Pestañas del Catálogo
function initCatalogFilters() {
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-category');
      renderCatalog(filter);
    });
  });
}

// 4. Lógica de Modo Oscuro
function initDarkMode() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (currentTheme === 'dark' || (!currentTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    updateThemeUI(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeUI(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'value');
    updateThemeUI(isDark);
    showNotification(`Modo ${isDark ? 'Oscuro' : 'Claro'} activado`);
  });
}

function updateThemeUI(isDark) {
  const themeIcon = document.querySelector('#themeToggle span');
  const themeText = document.querySelector('#themeToggle .theme-text');
  
  if (isDark) {
    if (themeIcon) themeIcon.textContent = 'light_mode';
    if (themeText) themeText.textContent = 'Modo Claro';
  } else {
    if (themeIcon) themeIcon.textContent = 'dark_mode';
    if (themeText) themeText.textContent = 'Modo Oscuro';
  }
}

// 5. Drawer lateral del Carrito
function initCartDrawer() {
  const cartTrigger = document.getElementById('cartTrigger');
  const cartTriggerFloating = document.getElementById('cartTriggerFloating');
  const closeCart = document.getElementById('closeCart');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartDrawerContent = document.getElementById('cartDrawerContent');

  const toggleCartDrawer = (open) => {
    if (open) {
      cartDrawer.classList.remove('hidden');
      setTimeout(() => {
        cartDrawerContent.classList.remove('translate-x-full');
        cartDrawer.classList.remove('opacity-0');
        cartDrawer.classList.add('opacity-100');
      }, 10);
    } else {
      cartDrawerContent.classList.add('translate-x-full');
      cartDrawer.classList.remove('opacity-100');
      cartDrawer.classList.add('opacity-0');
      setTimeout(() => cartDrawer.classList.add('hidden'), 350);
    }
  };

  if (cartTrigger) cartTrigger.addEventListener('click', () => toggleCartDrawer(true));
  if (cartTriggerFloating) cartTriggerFloating.addEventListener('click', () => toggleCartDrawer(true));
  if (closeCart) closeCart.addEventListener('click', () => toggleCartDrawer(false));
  if (cartDrawer) {
    cartDrawer.addEventListener('click', (e) => {
      if (e.target === cartDrawer) toggleCartDrawer(false);
    });
  }
}

// 6. Formulario inteligente con Checkout al Backend
function initOrderCheckout() {
  const orderForm = document.getElementById('orderForm');
  if (!orderForm) return;

  // Llenar selector de productos dinámicamente
  const selectProduct = orderForm.querySelector('select:not(#orderTipoEntrega)');
  if (selectProduct) {
    let selectHtml = '<option value="carrito">Todo mi Carrito de Compras</option>';
    PRODUCTS.forEach(p => {
      selectHtml += `<option value="${p.id}">${p.name} - ${formatCurrency(p.price)}</option>`;
    });
    selectProduct.innerHTML = selectHtml;
  }

  // Mostrar/ocultar campo de dirección según modalidad de entrega
  const tipoEntregaSelect = document.getElementById('orderTipoEntrega');
  const direccionWrapper = document.getElementById('orderDireccionWrapper');
  if (tipoEntregaSelect && direccionWrapper) {
    tipoEntregaSelect.addEventListener('change', () => {
      if (tipoEntregaSelect.value === 'envio') {
        direccionWrapper.classList.remove('hidden');
      } else {
        direccionWrapper.classList.add('hidden');
      }
    });
  }

  // Contador de caracteres para comentarios
  const commentsTextarea = document.getElementById('orderComments');
  const charCountSpan = document.getElementById('charCount');
  if (commentsTextarea && charCountSpan) {
    commentsTextarea.addEventListener('input', () => {
      charCountSpan.textContent = commentsTextarea.value.length;
    });
  }

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('orderSubmitBtn');
    const submitText = document.getElementById('orderSubmitText');

    // Leer todos los campos del formulario
    const nombre   = orderForm.querySelector('input[type="text"]').value.trim();
    const telefono = orderForm.querySelector('input[type="tel"]').value.trim();
    const email    = document.getElementById('orderEmail')?.value.trim() || '';
    const interest = selectProduct ? selectProduct.value : 'carrito';
    const fecha_retiro     = orderForm.querySelector('input[type="date"]').value;
    const tipo_entrega     = tipoEntregaSelect ? tipoEntregaSelect.value : 'retiro';
    const direccion_envio  = document.getElementById('orderDireccion')?.value.trim() || '';
    const mensaje          = commentsTextarea ? commentsTextarea.value.trim() : '';

    // Validaciones básicas en el cliente
    if (!nombre || !telefono) {
      alert('Por favor, ingresá tu nombre completo y tu teléfono de contacto.');
      return;
    }
    if (!email) {
      alert('Por favor, ingresá tu email para recibir la confirmación del pedido.');
      return;
    }
    if (interest === 'carrito' && cart.length === 0) {
      alert('Tu carrito de compras está vacío. Agregá algunos productos antes de enviar.');
      return;
    }

    // Armar el texto del producto (carrito completo o producto individual)
    let productoTexto = '';
    if (interest === 'carrito') {
      productoTexto = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    } else {
      const prod = PRODUCTS.find(p => p.id === interest);
      productoTexto = prod ? prod.name : interest;
    }

    // Estado de carga en el botón
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Enviando...';

    try {
      // ── Llamar al backend serverless ──────────────────────────────────
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          producto: productoTexto,
          fecha_retiro: fecha_retiro || new Date().toISOString().split('T')[0],
          tipo_entrega,
          direccion_envio: tipo_entrega === 'envio' ? direccion_envio : null,
          mensaje,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // ── Pedido guardado correctamente ─────────────────────────────
        showNotification('✅ ¡Pedido enviado! Revisá tu email para la confirmación.');

        // Limpiar carrito y formulario
        if (interest === 'carrito') clearCart();
        orderForm.reset();
        if (commentsTextarea) commentsTextarea.value = '';
        if (charCountSpan) charCountSpan.textContent = '0';
        if (direccionWrapper) direccionWrapper.classList.add('hidden');

        // Abrir WhatsApp del local con el resumen del pedido
        if (data.whatsappUrl) {
          setTimeout(() => window.open(data.whatsappUrl, '_blank'), 800);
        }
      } else {
        // Error controlado devuelto por el backend
        alert(`Error al enviar el pedido: ${data.error || 'Intentá de nuevo.'}`);
      }

    } catch (err) {
      // Error de red u otro fallo inesperado
      console.error('[Formulario] Error al conectar con el backend:', err);
      alert('No se pudo conectar con el servidor. Verificá tu conexión e intentá de nuevo.');
    } finally {
      // Restaurar botón siempre
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Enviar Pedido';
    }
  });
}

// 7. Menú Móvil Desplegable (Navigation Drawer)
function initMobileDrawer() {
  const menuTrigger = document.getElementById('menuTrigger');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawer = document.getElementById('drawer');
  const drawerContent = drawer.querySelector('aside');

  const toggleDrawer = (open) => {
    if (open) {
      drawer.classList.remove('hidden');
      setTimeout(() => {
        drawerContent.classList.remove('-translate-x-full');
        drawer.classList.remove('opacity-0');
        drawer.classList.add('opacity-100');
      }, 10);
    } else {
      drawerContent.classList.add('-translate-x-full');
      drawer.classList.remove('opacity-100');
      drawer.classList.add('opacity-0');
      setTimeout(() => drawer.classList.add('hidden'), 300);
    }
  };

  if (menuTrigger) menuTrigger.addEventListener('click', () => toggleDrawer(true));
  if (closeDrawer) closeDrawer.addEventListener('click', () => toggleDrawer(false));
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) toggleDrawer(false);
    });
  }
}

// 8. Animaciones de scroll (Reveal on Scroll)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 9. Resaltado Dinámico de Navegación Activa al hacer Scroll
function initActiveNavigation() {
  window.addEventListener('scroll', () => {
    const sections = ['inicio', 'nosotros', 'productos', 'pedidos', 'contacto'];
    let current = 'inicio';
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element && window.scrollY >= (element.offsetTop - 120)) {
        current = section;
      }
    });

    document.querySelectorAll('header nav a').forEach(link => {
      link.classList.remove('text-secondary', 'font-semibold');
      link.classList.add('text-on-surface-variant');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('text-secondary', 'font-semibold');
        link.classList.remove('text-on-surface-variant');
      }
    });
  });
}

// 10. Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  renderCatalog('todos');
  initCatalogFilters();
  initCart();
  initCartDrawer();
  initOrderCheckout();
  initMobileDrawer();
  initScrollAnimations();
  initActiveNavigation();
});

