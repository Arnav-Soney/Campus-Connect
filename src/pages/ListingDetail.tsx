import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, MessageCircle, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

// Mock data - in a real app, this would come from an API
const LISTING = {
  id: 1,
  title: 'Data Structures and Algorithms Book',
  description: 'Comprehensive guide for competitive programming. Perfect for CSE students. Includes solved examples and practice problems. Used for one semester only, in excellent condition with no markings or highlights.',
  price: 450,
  category: 'Books',
  condition: 'Like New',
  seller: {
    name: 'Rahul Kumar',
    hostel: 'Hostel A',
    room: '204',
    phone: '+91 98765 43210',
    email: 'rahul.kumar@university.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  },
  images: [
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
    'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600'
  ],
  postedDate: '2025-11-20'
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [message, setMessage] = useState('');
  const [showContact, setShowContact] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success('Message sent to seller!');
    setMessage('');
  };

  const handleContactSeller = () => {
    setShowContact(true);
    toast.success('Contact information revealed!');
  };

  return (
    <Layout>
      <div className="p-4 lg:p-8 pb-20 lg:pb-8">
        <Button variant="ghost" onClick={() => navigate('/marketplace')} className="mb-6">
          <ArrowLeft className="size-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-4">
                  <ImageWithFallback
                    src={LISTING.images[selectedImage]}
                    alt={LISTING.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {LISTING.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${LISTING.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{LISTING.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{LISTING.condition}</Badge>
                      <Badge variant="outline">{LISTING.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl">₹{LISTING.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{LISTING.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Posted on {new Date(LISTING.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Seller Info and Contact */}
          <div className="space-y-6">
            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage src={LISTING.seller.avatar} />
                    <AvatarFallback>{LISTING.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{LISTING.seller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {LISTING.seller.hostel}, Room {LISTING.seller.room}
                    </p>
                  </div>
                </div>

                {!showContact ? (
                  <Button className="w-full" onClick={handleContactSeller}>
                    Show Contact Details
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <Phone className="size-4 text-muted-foreground" />
                      <span className="text-sm">{LISTING.seller.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <Mail className="size-4 text-muted-foreground" />
                      <span className="text-sm">{LISTING.seller.email}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Message Seller */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="size-5" />
                  Message Seller
                </CardTitle>
                <CardDescription>Send a message to inquire about this item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Hi, I'm interested in this item..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button className="w-full" onClick={handleSendMessage}>
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-sm">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Meet in a public place on campus</li>
                  <li>• Inspect the item before paying</li>
                  <li>• Don't share sensitive information</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Similar Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <div className="aspect-square overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&${i}`}
                    alt="Similar item"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-sm">Book Title {i}</CardTitle>
                  <p className="text-lg">₹{350 + i * 50}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
