import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Find product by id or _id field
    const product = mockProducts.find(p => p.id === id || p._id === id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const product = mockProducts.find(p => p.id === id || p._id === id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const updateData = await request.json();
    
    // For mock data, we'll just return the updated product
    // In a real implementation, this would update the database
    const updatedProduct = {
      ...product,
      ...updateData,
      price: updateData.price ? parseFloat(updateData.price) : product.price,
      stock: updateData.stock !== undefined ? parseInt(updateData.stock) : product.stock,
      featured: updateData.featured !== undefined ? Boolean(updateData.featured) : product.featured,
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const productIndex = mockProducts.findIndex(p => p.id === id || p._id === id);
    
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // For mock data, we'll just return success
    // In a real implementation, this would delete from the database
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
