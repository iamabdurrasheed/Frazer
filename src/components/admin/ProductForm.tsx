import React, { useState } from 'react';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: Partial<Product>) => Promise<void>;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    image: product?.image || '',
    offer: product?.offer || '',
    category: product?.category || '',
    featured: product?.featured || false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
        ? parseFloat(value) || 0 
        : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required');
      setLoading(false);
      return;
    }

    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      setLoading(false);
      return;
    }

    if (formData.stock < 0) {
      setError('Stock cannot be negative');
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Product Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Enter product title"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
          <Input
            label="Stock Quantity"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            min="0"
            placeholder="0"
          />
        </div>

        <Input
          label="Image URL"
          type="url"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="https://example.com/image.jpg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Offer (Optional)"
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleInputChange}
            placeholder="e.g., 20% OFF"
          />
          <Input
            label="Category (Optional)"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Electronics"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
            Featured Product
          </label>
        </div>

        <div className="flex space-x-4 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            isLoading={loading}
            className="flex-1"
          >
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
