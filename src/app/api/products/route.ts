import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured');

    // Filter products based on query parameters
    let filteredProducts = [...mockProducts];

    if (search) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured);
    }

    // Apply pagination
    const skip = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    const totalCount = filteredProducts.length;
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      price,
      image,
      offer,
      stock,
      category,
      featured = false,
    } = await request.json();

    if (!title || !description || !price || stock === undefined) {
      return NextResponse.json(
        { success: false, error: 'Title, description, price, and stock are required' },
        { status: 400 }
      );
    }

    // For mock data, we'll just return a success response
    // In a real implementation, this would save to the database
    const newProduct = {
      _id: Date.now().toString(),
      id: Date.now().toString(),
      title,
      description,
      price: parseFloat(price),
      image: image || '',
      offer: offer || '',
      stock: parseInt(stock),
      category: category || '',
      featured: Boolean(featured),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
