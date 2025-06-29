import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Package, Shield, Truck, Check } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const product = products.find(p => p.id === id);

  // Check if product is already in cart
  const cartItem = cart.items.find(item => item.product.id === id);
  const isInCart = !!cartItem;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (product.stock === 0 || isAdding) return;

    setIsAdding(true);
    
    try {
      addToCart(product, quantity);
      setJustAdded(true);
      
      // Reset the "just added" state after 2 seconds
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-blue-600 transition-colors">
          Products
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900 mb-6">
              ${product.price}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 mb-6">
              <Package className="h-5 w-5 text-green-600" />
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
              {isInCart && (
                <span className="text-blue-600 font-medium">
                  ({cartItem?.quantity} in cart)
                </span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all font-medium ${
                  justAdded
                    ? 'bg-green-600 text-white'
                    : product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isAdding
                    ? 'bg-blue-400 text-white cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : isAdding ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>

              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">2-year warranty included</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700">Easy returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};