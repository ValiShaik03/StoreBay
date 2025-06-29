import { Product } from '../types';

// Local storage key for products
const PRODUCTS_KEY = 'storebay_products';

// Demo products data
const demoProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.',
    price: 299.99,
    image_url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviews_count: 127,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration. Track your health goals with precision.',
    price: 249.99,
    image_url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 18,
    rating: 4.6,
    reviews_count: 89,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Minimalist Desk Setup',
    description: 'Clean and modern desk setup perfect for productivity. Includes wireless charging pad and cable management system.',
    price: 189.99,
    image_url: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home & Office',
    stock: 12,
    rating: 4.7,
    reviews_count: 56,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Professional Camera',
    description: 'High-resolution digital camera with advanced features for photography enthusiasts and professionals.',
    price: 899.99,
    image_url: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 8,
    rating: 4.9,
    reviews_count: 203,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Luxury Leather Bag',
    description: 'Premium leather messenger bag with multiple compartments. Perfect for business professionals and students.',
    price: 149.99,
    image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fashion',
    stock: 22,
    rating: 4.5,
    reviews_count: 74,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Modern Plant Collection',
    description: 'Curated collection of low-maintenance indoor plants perfect for home and office decoration.',
    price: 79.99,
    image_url: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home & Garden',
    stock: 35,
    rating: 4.4,
    reviews_count: 92,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and professional typing.',
    price: 159.99,
    image_url: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 15,
    rating: 4.7,
    reviews_count: 145,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Artisan Coffee Beans',
    description: 'Premium single-origin coffee beans roasted to perfection. Rich flavor profile with notes of chocolate and caramel.',
    price: 24.99,
    image_url: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Food & Beverage',
    stock: 50,
    rating: 4.6,
    reviews_count: 89,
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    title: 'Wireless Bluetooth Speaker',
    description: 'Portable waterproof speaker with 360-degree sound and 24-hour battery life. Perfect for outdoor adventures.',
    price: 89.99,
    image_url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 30,
    rating: 4.5,
    reviews_count: 156,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    title: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair with lumbar support and adjustable height. Designed for all-day comfort and productivity.',
    price: 349.99,
    image_url: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home & Office',
    stock: 14,
    rating: 4.8,
    reviews_count: 98,
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    title: 'Vintage Sunglasses',
    description: 'Classic aviator sunglasses with UV protection and polarized lenses. Timeless style meets modern technology.',
    price: 129.99,
    image_url: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fashion',
    stock: 40,
    rating: 4.3,
    reviews_count: 67,
    created_at: new Date().toISOString()
  },
  {
    id: '12',
    title: 'Smart Home Security Camera',
    description: 'WiFi-enabled security camera with night vision, motion detection, and smartphone alerts. Keep your home safe.',
    price: 199.99,
    image_url: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 20,
    rating: 4.6,
    reviews_count: 134,
    created_at: new Date().toISOString()
  },
  {
    id: '13',
    title: 'Organic Skincare Set',
    description: 'Complete skincare routine with natural ingredients. Includes cleanser, toner, serum, and moisturizer.',
    price: 89.99,
    image_url: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Beauty & Health',
    stock: 28,
    rating: 4.7,
    reviews_count: 112,
    created_at: new Date().toISOString()
  },
  {
    id: '14',
    title: 'Yoga Mat & Accessories',
    description: 'Premium non-slip yoga mat with carrying strap, blocks, and resistance bands. Perfect for home workouts.',
    price: 69.99,
    image_url: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports & Fitness',
    stock: 45,
    rating: 4.4,
    reviews_count: 89,
    created_at: new Date().toISOString()
  },
  {
    id: '15',
    title: 'Ceramic Dinnerware Set',
    description: 'Elegant 16-piece ceramic dinnerware set. Microwave and dishwasher safe. Perfect for everyday dining.',
    price: 119.99,
    image_url: 'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home & Kitchen',
    stock: 18,
    rating: 4.6,
    reviews_count: 76,
    created_at: new Date().toISOString()
  },
  {
    id: '16',
    title: 'Electric Scooter',
    description: 'Foldable electric scooter with 25-mile range and LED lights. Eco-friendly urban transportation solution.',
    price: 599.99,
    image_url: 'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Transportation',
    stock: 8,
    rating: 4.5,
    reviews_count: 43,
    created_at: new Date().toISOString()
  },
  {
    id: '17',
    title: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    image_url: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 60,
    rating: 4.2,
    reviews_count: 201,
    created_at: new Date().toISOString()
  },
  {
    id: '18',
    title: 'Designer Backpack',
    description: 'Stylish and functional backpack with laptop compartment and water-resistant material. Perfect for travel.',
    price: 179.99,
    image_url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Fashion',
    stock: 25,
    rating: 4.7,
    reviews_count: 88,
    created_at: new Date().toISOString()
  },
  {
    id: '19',
    title: 'Smart LED Light Bulbs',
    description: 'Color-changing smart bulbs controlled via smartphone app. Energy-efficient with millions of color options.',
    price: 49.99,
    image_url: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home & Garden',
    stock: 55,
    rating: 4.4,
    reviews_count: 167,
    created_at: new Date().toISOString()
  },
  {
    id: '20',
    title: 'Protein Powder',
    description: 'Premium whey protein powder with 25g protein per serving. Available in chocolate and vanilla flavors.',
    price: 59.99,
    image_url: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports & Fitness',
    stock: 32,
    rating: 4.6,
    reviews_count: 145,
    created_at: new Date().toISOString()
  },
  {
    id: '21',
    title: 'Bamboo Cutting Board Set',
    description: 'Eco-friendly bamboo cutting boards in three sizes. Antimicrobial and knife-friendly surface.',
    price: 34.99,
    image_url: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home & Kitchen',
    stock: 42,
    rating: 4.5,
    reviews_count: 93,
    created_at: new Date().toISOString()
  },
  {
    id: '22',
    title: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons. 50-hour battery life.',
    price: 79.99,
    image_url: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 38,
    rating: 4.7,
    reviews_count: 156,
    created_at: new Date().toISOString()
  },
  {
    id: '23',
    title: 'Essential Oil Diffuser',
    description: 'Ultrasonic aromatherapy diffuser with color-changing LED lights. Includes starter set of essential oils.',
    price: 44.99,
    image_url: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Beauty & Health',
    stock: 29,
    rating: 4.3,
    reviews_count: 78,
    created_at: new Date().toISOString()
  },
  {
    id: '24',
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.',
    price: 29.99,
    image_url: 'https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports & Fitness',
    stock: 65,
    rating: 4.8,
    reviews_count: 234,
    created_at: new Date().toISOString()
  }
];

// Initialize products in localStorage - FORCE UPDATE
const initializeProducts = () => {
  // Always update with the latest products to ensure new products are shown
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(demoProducts));
};

// Database operations
export const database = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    initializeProducts();
    const products = localStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  },

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  // Add new product
  async addProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const products = await this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  },

  // Update product
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products[index];
  },

  // Delete product
  async deleteProduct(id: string): Promise<boolean> {
    const products = await this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    if (filteredProducts.length === products.length) return false;

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts));
    return true;
  },

  // Update stock
  async updateStock(id: string, quantity: number): Promise<boolean> {
    const product = await this.getProductById(id);
    if (!product || product.stock < quantity) return false;

    await this.updateProduct(id, { stock: product.stock - quantity });
    return true;
  }
};