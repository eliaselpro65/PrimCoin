import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  X, 
  Menu, 
  Search, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RefreshCcw, 
  Instagram, 
  Facebook, 
  Twitter,
  CreditCard,
  CheckCircle,
  Plus,
  Minus,
  Trash2,
  Filter
} from 'lucide-react';

// --- DATOS SIMULADOS (MOCK DATA) ---

const CATEGORIES = [
  { id: 'all', name: 'Todo' },
  { id: 'iphone', name: 'iPhone' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'pixel', name: 'Google Pixel' },
  { id: 'accessories', name: 'Accesorios' }
];

const PHONE_MODELS = {
  iphone: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 13'],
  samsung: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S23', 'Galaxy A54'],
  pixel: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a'],
  accessories: ['Talla Única']
};

const PRODUCTS = [
  {
    id: 1,
    name: "Nebula Marble Case",
    price: 24.99,
    category: 'iphone',
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800",
    description: "Diseño de mármol inspirado en el espacio profundo. Protección de doble capa con acabado brillante resistente a los arañazos.",
    colors: ['#2d3436', '#6c5ce7', '#a29bfe'],
    isNew: true
  },
  {
    id: 2,
    name: "Silicona Líquida Soft-Touch",
    price: 19.99,
    category: 'samsung',
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=800",
    description: "Suavidad incomparable. Interior de microfibra para proteger el cristal trasero de tu dispositivo.",
    colors: ['#ff7675', '#55efc4', '#ffeaa7', '#000000'],
    isNew: false
  },
  {
    id: 3,
    name: "Carbon Fiber Elite",
    price: 34.99,
    category: 'iphone',
    rating: 4.7,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1541876366-2b492b45055b?auto=format&fit=crop&q=80&w=800",
    description: "Fibra de carbono real. Ultra ligera, ultra resistente. Compatible con MagSafe.",
    colors: ['#000000', '#2d3436'],
    isNew: false
  },
  {
    id: 4,
    name: "Clear Impact Case",
    price: 15.99,
    category: 'pixel',
    rating: 4.5,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=800",
    description: "Muestra el diseño de tu Pixel. Tecnología anti-amarilleo garantizada por 12 meses.",
    colors: ['transparent'],
    isNew: true
  },
  {
    id: 5,
    name: "Leather Wallet Folio",
    price: 45.00,
    category: 'iphone',
    rating: 4.6,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=800",
    description: "Cuero genuino vegano. Espacio para 3 tarjetas y billetes. Elegancia clásica.",
    colors: ['#8d6e63', '#3e2723'],
    isNew: false
  },
  {
    id: 6,
    name: "Artistic Splash",
    price: 22.50,
    category: 'samsung',
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1533106958148-daaeeb8637f6?auto=format&fit=crop&q=80&w=800",
    description: "Cada funda tiene un patrón de inyección único. Nadie tendrá una igual a la tuya.",
    colors: ['#e17055', '#0984e3'],
    isNew: true
  },
  {
    id: 7,
    name: "Protector de Pantalla 9H",
    price: 12.99,
    category: 'accessories',
    rating: 4.9,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1620299691089-a2e61623548a?auto=format&fit=crop&q=80&w=800",
    description: "Vidrio templado japonés. Incluye kit de instalación fácil.",
    colors: ['transparent'],
    isNew: false
  },
  {
    id: 8,
    name: "Eco-Friendly Wheat",
    price: 29.99,
    category: 'iphone',
    rating: 4.7,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1598332766863-71a7bd879344?auto=format&fit=crop&q=80&w=800",
    description: "100% Compostable. Hecha de paja de trigo. Salva el planeta mientras proteges tu móvil.",
    colors: ['#dfe6e9', '#ffeaa7', '#55efc4'],
    isNew: true
  }
];

// --- COMPONENTES AUXILIARES ---

const Notification = ({ message, type, onClose }) => (
  <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 flex items-center gap-2 ${
    type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
  }`}>
    {type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
    <span className="font-medium">{message}</span>
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-black border-2 border-black hover:bg-gray-50",
    outline: "bg-transparent text-gray-600 border border-gray-300 hover:border-black hover:text-black",
    ghost: "bg-gray-100 text-gray-800 hover:bg-gray-200"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- COMPONENTE PRINCIPAL APP ---

export default function PrimCoinStore() {
  const [view, setView] = useState('home'); // home, product, cart, checkout, success
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efecto para cerrar notificaciones
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Funciones del Carrito
  const addToCart = (product, model, color) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.model === model && item.color === color
    );

    if (existingItem) {
      setCart(cart.map(item => 
        item === existingItem ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, model, color }]);
    }
    
    setNotification({ type: 'success', message: '¡Producto añadido al carrito!' });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    const newQuantity = newCart[index].quantity + delta;
    if (newQuantity > 0) {
      newCart[index].quantity = newQuantity;
      setCart(newCart);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Navegación
  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  // --- SUB-VISTAS ---

  const HeroSection = () => (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900 text-white">
      <img 
        src="https://images.unsplash.com/photo-1556656793-02715d8dd660?auto=format&fit=crop&q=80&w=2000" 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start z-10">
        <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-4 animate-bounce">
          NUEVA COLECCIÓN 2024
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Protege tu Estilo.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Sin Compromisos.
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-xl">
          Fundas premium diseñadas para resistir caídas de hasta 3 metros sin sacrificar la estética de tu dispositivo.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => {
            const element = document.getElementById('products-grid');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Ver Colección <ArrowRight size={20} />
          </Button>
          <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
            Nuestra Historia
          </Button>
        </div>
      </div>
    </div>
  );

  const ProductGrid = () => {
    const filteredProducts = PRODUCTS.filter(p => 
      (activeCategory === 'all' || p.category === activeCategory) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <section id="products-grid" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros Productos</h2>
            
            {/* Filtros */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id 
                      ? 'bg-black text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                onClick={() => navigateToProduct(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      NUEVO
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" className="scale-90 group-hover:scale-100">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <span className="font-bold text-lg">${product.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium text-gray-900">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const ProductView = () => {
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);

    // Determinar modelos disponibles
    const availableModels = PHONE_MODELS[selectedProduct.category] || PHONE_MODELS.accessories;

    const handleAdd = () => {
      if (!selectedModel) {
        setNotification({ type: 'error', message: 'Por favor selecciona tu modelo de móvil' });
        return;
      }
      addToCart(selectedProduct, selectedModel, selectedColor);
    };

    return (
      <div className="pt-24 pb-20 container mx-auto px-4">
        <Button variant="ghost" onClick={navigateToHome} className="mb-8">
          ← Volver a la tienda
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:ring-2 ring-black">
                  <img 
                    src={selectedProduct.image} 
                    alt="Thumbnail" 
                    className="w-full h-full object-cover opacity-70 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Detalles del Producto */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              {selectedProduct.isNew && (
                <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  En Stock
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${selectedProduct.price}</span>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} />
                ))}
                <span className="text-gray-500 text-sm ml-2">{selectedProduct.reviews} reseñas</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {selectedProduct.description} Diseñada meticulosamente para un ajuste perfecto, esta funda combina protección de grado militar con un perfil delgado y elegante.
            </p>

            {/* Selector de Color */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-gray-900">Color: <span className="text-gray-500 font-normal">Seleccionado</span></h3>
              <div className="flex gap-3">
                {selectedProduct.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                      selectedColor === color ? 'border-black ring-2 ring-offset-2 ring-black' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Selector de Modelo */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-gray-900">Modelo:</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableModels.map(model => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                      selectedModel === model 
                        ? 'border-black bg-black text-white shadow-md' 
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-4">
              <Button onClick={handleAdd} className="w-full justify-center text-lg h-14">
                Añadir al Carrito - ${(selectedProduct.price).toFixed(2)}
              </Button>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-2"><Truck size={16} /> Envío Gratis {'>'}$50</div>
                <div className="flex items-center gap-2"><ShieldCheck size={16} /> Garantía 2 Años</div>
                <div className="flex items-center gap-2"><RefreshCcw size={16} /> Devolución 30 días</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartDrawer = () => (
    <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Carrito <span className="bg-black text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
              <ShoppingBag size={64} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-sm mb-6">Parece que aún no has elegido tu estilo.</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline">
                Seguir Comprando
              </Button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${item.model}-${index}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                    <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{item.model} • <span className="inline-block w-3 h-3 rounded-full border border-gray-300 align-middle" style={{backgroundColor: item.color}}></span></p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200">
                      <button onClick={() => updateQuantity(index, -1)} className="p-1 hover:bg-gray-100 rounded-l-lg"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, 1)} className="p-1 hover:bg-gray-100 rounded-r-lg"><Plus size={14} /></button>
                    </div>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Envío</span>
              <span className="text-green-600 font-medium">{cartTotal > 50 ? 'GRATIS' : '$5.00'}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${(cartTotal > 50 ? cartTotal : cartTotal + 5).toFixed(2)}</span>
            </div>
            <Button 
              onClick={() => { setIsCartOpen(false); setView('checkout'); }}
              className="w-full justify-center"
            >
              Finalizar Compra
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const CheckoutView = () => {
    const total = cartTotal > 50 ? cartTotal : cartTotal + 5;
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      // Simulación de proceso de pago
      setTimeout(() => {
        setLoading(false);
        setCart([]);
        setView('success');
      }, 2000);
    };

    return (
      <div className="pt-24 pb-20 container mx-auto px-4 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulario */}
          <div>
            <Button variant="ghost" onClick={() => setIsCartOpen(true)} className="mb-6 px-0 hover:bg-transparent">
              ← Volver al carrito
            </Button>
            <h2 className="text-3xl font-bold mb-8">Pago Seguro</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</div>
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <input required type="email" placeholder="Email" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  <div className="flex gap-4">
                    <input required type="text" placeholder="Nombre" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                    <input required type="text" placeholder="Apellidos" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  </div>
                </div>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</div>
                  Dirección de Envío
                </h3>
                <div className="space-y-4">
                  <input required type="text" placeholder="Dirección" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  <input type="text" placeholder="Apartamento, local, etc. (opcional)" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Ciudad" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                    <input required type="text" placeholder="Código Postal" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  </div>
                </div>
              </section>

              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">3</div>
                  Método de Pago
                </h3>
                <div className="p-4 border border-blue-500 bg-blue-50 rounded-lg flex items-center gap-4 cursor-pointer mb-4">
                  <CreditCard className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Tarjeta de Crédito / Débito</p>
                    <p className="text-xs text-blue-700">Transacción segura encriptada con SSL</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <input required type="text" placeholder="Número de Tarjeta" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="MM / AA" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                    <input required type="text" placeholder="CVC" className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-black outline-none transition-colors" />
                  </div>
                </div>
              </section>

              <Button type="submit" className="w-full justify-center text-lg h-14" disabled={loading}>
                {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Resumen de Orden */}
          <div className="lg:pl-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6">Resumen del Pedido</h3>
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-0 right-0 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-lg font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.model}</p>
                    </div>
                    <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>{cartTotal > 50 ? 'Gratis' : '$5.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos (Est.)</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por tu compra!</h2>
        <p className="text-gray-600 mb-8">
          Tu pedido #PRIM{Math.floor(Math.random() * 10000)} ha sido confirmado. Te hemos enviado un email con los detalles de seguimiento.
        </p>
        <Button onClick={navigateToHome} className="w-full justify-center">
          Volver a la tienda
        </Button>
      </div>
    </div>
  );

  const Navbar = () => (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${view === 'home' ? 'bg-white/80 backdrop-blur-md border-b border-gray-100' : 'bg-white border-b border-gray-200'}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-600">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div onClick={navigateToHome} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-1">
          PRIMCOIN<span className="w-2 h-2 rounded-full bg-blue-500 mt-3"></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <button onClick={navigateToHome} className="hover:text-gray-600 transition-colors">Inicio</button>
          <button onClick={() => {navigateToHome(); setTimeout(() => document.getElementById('products-grid')?.scrollIntoView(), 100)}} className="hover:text-gray-600 transition-colors">Fundas</button>
          <button className="hover:text-gray-600 transition-colors">Accesorios</button>
          <button className="hover:text-gray-600 transition-colors text-red-500">Ofertas</button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative bg-gray-100 rounded-full px-4 py-2 text-gray-500 focus-within:ring-2 ring-black/10 transition-all">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-24 focus:w-40 transition-all text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group">
            <ShoppingBag size={24} className="group-hover:text-black text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-lg animate-fade-in-down">
          <button onClick={() => {navigateToHome(); setIsMobileMenuOpen(false)}} className="text-left font-medium p-2 hover:bg-gray-50 rounded">Inicio</button>
          <button onClick={() => {navigateToHome(); setIsMobileMenuOpen(false)}} className="text-left font-medium p-2 hover:bg-gray-50 rounded">Catálogo</button>
          <button className="text-left font-medium p-2 hover:bg-gray-50 rounded">Contacto</button>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h4 className="text-2xl font-black mb-6">PRIMCOIN.</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Redefiniendo la protección móvil desde 2024. Creamos accesorios que complementan tu estilo de vida digital con materiales premium y diseño sostenible.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Tienda</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Novedades</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Personalización</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Outlet</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Soporte</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Estado del Pedido</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Únete a nosotros</h4>
          <p className="text-sm text-gray-400 mb-4">Suscríbete para recibir ofertas exclusivas.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Tu email" className="bg-gray-900 border border-gray-800 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-white transition-colors" />
            <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:bg-gray-200 transition-colors">OK</button>
          </div>
          <div className="flex gap-4 mt-6">
            <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-900 text-center text-gray-500 text-xs">
        © 2025 PrimCoin. Todos los derechos reservados. Diseñado con React & Tailwind.
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">
      {view !== 'success' && <Navbar />}
      
      <main>
        {view === 'home' && (
          <>
            <HeroSection />
            <div className="py-12 bg-white">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <ShieldCheck size={40} className="mb-4 text-black" />
                  <h3 className="font-bold text-lg mb-2">Protección Militar</h3>
                  <p className="text-sm text-gray-600">Certificación anti-caídas de hasta 3 metros en todas nuestras fundas Tough.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <Truck size={40} className="mb-4 text-black" />
                  <h3 className="font-bold text-lg mb-2">Envío Rápido 24/48h</h3>
                  <p className="text-sm text-gray-600">Envíos gratis en pedidos superiores a $50 a toda la península.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <RefreshCcw size={40} className="mb-4 text-black" />
                  <h3 className="font-bold text-lg mb-2">Garantía de Satisfacción</h3>
                  <p className="text-sm text-gray-600">¿No te gusta? Tienes 30 días para devolverlo sin preguntas.</p>
                </div>
              </div>
            </div>
            <ProductGrid />
            {/* Sección Promocional */}
            <div className="py-20 bg-black text-white text-center px-4">
              <h2 className="text-4xl font-bold mb-4">¿Diseñas tu propia funda?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Próximamente: nuestra herramienta de personalización te permitirá subir tus fotos y crear algo único.</p>
              <Button variant="secondary">Notificarme cuando esté listo</Button>
            </div>
          </>
        )}

        {view === 'product' && selectedProduct && <ProductView />}
        {view === 'checkout' && <CheckoutView />}
        {view === 'success' && <SuccessView />}
      </main>

      {view !== 'success' && view !== 'checkout' && <Footer />}
      
      <CartDrawer />
      
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
}