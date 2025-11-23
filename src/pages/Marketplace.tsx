import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CATEGORIES = ['All', 'Books', 'Electronics', 'Furniture', 'Sports', 'Clothing', 'Other'];

const LISTINGS = [
  {
    id: 1,
    title: 'Data Structures and Algorithms Book',
    description: 'Comprehensive guide for competitive programming',
    price: 450,
    category: 'Books',
    condition: 'Like New',
    seller: 'Rahul Kumar',
    sellerHostel: 'Hostel A',
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400'],
    postedDate: '2025-11-20'
  },
  {
    id: 2,
    title: 'Study Table with Chair',
    description: 'Wooden table in excellent condition, includes chair',
    price: 2500,
    category: 'Furniture',
    condition: 'Good',
    seller: 'Priya Sharma',
    sellerHostel: 'Girls Hostel 1',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400'],
    postedDate: '2025-11-19'
  },
  {
    id: 3,
    title: 'Graphing Calculator TI-84',
    description: 'Perfect for engineering students',
    price: 1200,
    category: 'Electronics',
    condition: 'Like New',
    seller: 'Amit Patel',
    sellerHostel: 'Hostel B',
    images: ['https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400'],
    postedDate: '2025-11-18'
  },
  {
    id: 4,
    title: 'Harry Potter Book Set',
    description: 'Complete series, all 7 books',
    price: 1800,
    category: 'Books',
    condition: 'Good',
    seller: 'Sneha Singh',
    sellerHostel: 'Girls Hostel 2',
    images: ['https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400'],
    postedDate: '2025-11-17'
  },
  {
    id: 5,
    title: 'Badminton Racket - Yonex',
    description: 'Professional grade racket with cover',
    price: 800,
    category: 'Sports',
    condition: 'Like New',
    seller: 'Vikram Reddy',
    sellerHostel: 'Hostel C',
    images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400'],
    postedDate: '2025-11-16'
  },
  {
    id: 6,
    title: 'Laptop Stand - Adjustable',
    description: 'Aluminum stand for better ergonomics',
    price: 600,
    category: 'Electronics',
    condition: 'New',
    seller: 'Ananya Gupta',
    sellerHostel: 'Girls Hostel 1',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'],
    postedDate: '2025-11-15'
  },
  {
    id: 7,
    title: 'Winter Jacket - North Face',
    description: 'Size M, barely used',
    price: 1500,
    category: 'Clothing',
    condition: 'Like New',
    seller: 'Karan Malhotra',
    sellerHostel: 'Hostel D',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
    postedDate: '2025-11-14'
  },
  {
    id: 8,
    title: 'Mechanical Keyboard',
    description: 'RGB backlit, blue switches',
    price: 2200,
    category: 'Electronics',
    condition: 'Good',
    seller: 'Rohan Das',
    sellerHostel: 'Hostel E',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'],
    postedDate: '2025-11-13'
  },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const filteredListings = LISTINGS.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });

  return (
    <Layout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Student Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell items within campus</p>
          </div>
          <Link to="/marketplace/add">
            <Button>
              <Plus className="size-4 mr-2" />
              Sell Item
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="size-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden bg-muted">
                <ImageWithFallback
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2 text-lg">{listing.title}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {listing.condition}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {listing.description}
                </p>
                <div className="space-y-2">
                  <p className="text-2xl">₹{listing.price}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{listing.category}</Badge>
                    <span>•</span>
                    <span>{listing.sellerHostel}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/marketplace/${listing.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No items found</p>
              <Link to="/marketplace/add">
                <Button>
                  <Plus className="size-4 mr-2" />
                  Be the first to sell
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
