import { useParams, useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import {
  ArrowLeft,
  Zap,
  Battery,
  Gauge,
  Star,
  Shield,
  Truck,
  Headphones,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scooters = useQuery(api.scooters.getAllScooters);
  const [selectedImage, setSelectedImage] = useState(0);
  const [batteryModalOpen, setBatteryModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  
  const scooter = scooters?.find((s) => s.id === id);

  // Get current variant info
  const currentVariant = (scooter as any)?.variants?.[selectedVariant];
  const displayPrice = currentVariant?.price ?? scooter?.price;
  const displayOriginalPrice = currentVariant?.originalPrice ?? scooter?.originalPrice;

  const getShopifyCheckoutUrl = (productId: string, variantId?: string, withBattery?: boolean) => {
    const baseUrl = "https://elkscooters.myshopify.com/cart/";
    
    // Map product IDs to Shopify variant IDs
    const shopifyVariants: Record<string, string> = {
      "elk-velocity-one": "40627314524220",
      "elk-velocity-two": "40627314786364",
      "elk-cruiser": "40658101305404",
      "elk-thunderbolt": "40658101338172",
      "elk-jubilee-x": "40658101370940",
      "elk-patriot": "40658101403708",
      "elk-rover": "40658101436476",
      "elk-jubilee": "40658101469244",
    };

    // Handle elk-velocity with variants
    let productKey = productId;
    if (productId === "elk-velocity" && variantId) {
      productKey = variantId === "40627314524220" ? "elk-velocity-one" : "elk-velocity-two";
    }

    const productVariantId = shopifyVariants[productKey];
    if (!productVariantId) return null;

    let cartItems = `${productVariantId}:1`;
    
    // Add battery if requested (2-wheel or 3-wheel battery)
    if (withBattery) {
      const batteryVariantId = productId === "elk-jubilee-x" || productId === "elk-patriot" || productId === "elk-jubilee"
        ? "40658101502012" // 3-wheel battery
        : "40658101534780"; // 2-wheel battery
      cartItems += `,${batteryVariantId}:1`;
    }

    return `${baseUrl}${cartItems}?discount=fall`;
  };

  const handleBuyNow = () => {
    if (!scooter?.inStock || !id) return;
    
    const variantId = currentVariant?.variantId;
    
    // Check if this scooter has battery upsell option
    if (["elk-cruiser", "elk-thunderbolt", "elk-velocity", "elk-jubilee-x"].includes(id)) {
      setBatteryModalOpen(true);
    } else {
      const checkoutUrl = getShopifyCheckoutUrl(id, variantId, false);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("Checkout not configured for this product yet");
      }
    }
  };

  const handleBatteryChoice = (withBattery: boolean) => {
    setBatteryModalOpen(false);
    const variantId = currentVariant?.variantId;
    const checkoutUrl = getShopifyCheckoutUrl(id!, variantId, withBattery);
    
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      toast.error("Checkout not configured for this product yet");
    }
  };

  // Product-specific data
  const productData: Record<string, any> = {
    "elk-cruiser": {
      additionalImages: [
        "https://harmless-tapir-303.convex.cloud/api/storage/4087e4e6-fffb-4077-85e6-1fdbe270faf9",
        "https://harmless-tapir-303.convex.cloud/api/storage/fe47400a-3aaf-4f43-bb02-1d87ab9cb9d3",
        "https://harmless-tapir-303.convex.cloud/api/storage/0a14ed25-e5e1-4000-88db-68b9af4d51fd",
        "https://harmless-tapir-303.convex.cloud/api/storage/ccf64c1f-ba02-4289-83d9-54d15fdf0eb7",
        "https://harmless-tapir-303.convex.cloud/api/storage/e55e007e-09d2-4c5e-ab11-fe2755da73bf",
      ],
      seeInAction: [
        {
          title: "Engineered Braking Power",
          description: "Premium hydraulic disc brakes with reinforced calipers deliver instant stopping power in any condition",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/583d0fcd-d44e-4529-9248-4b472eb41ea3",
        },
        {
          title: "Precision Engineered Suspension",
          description: "Advanced dual-spring suspension system absorbs impacts and delivers cloud-like comfort on any terrain",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/8a827630-10ff-4b6f-8f9d-8bf27b8d709e",
        },
      ],
      customerPhotos: [
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/ec62f0aa-0684-4992-89c2-51fd0fb9f3ef",
          name: "Ryan S.",
          location: "Rocky Mountains, CO",
          caption: "Conquered steep trails with ease - this thing is a beast!",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/14ff4e7e-11b1-4406-be1e-aa385132d705",
          name: "David K.",
          location: "Albany, NY",
          caption: "Perfect for family rides with the kids - they love it!",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/a5616c60-abc6-44de-81c7-1cd7e7d37f4e",
          name: "Mike T.",
          location: "Nashville, TN",
          caption: "Perfect for cruising around the park - smooth and reliable",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/6ade2d48-0901-4239-a99a-61e49723070d",
          name: "Sarah L.",
          location: "San Diego, CA",
          caption: "Perfect for my daily commute and weekend adventures",
        },
      ],
    },
    "elk-thunderbolt": {
      additionalImages: [
        "https://harmless-tapir-303.convex.cloud/api/storage/c8f61d9e-3dad-4ee9-8ced-7b99e8521cbc",
        "https://harmless-tapir-303.convex.cloud/api/storage/a3ccdbb2-10fc-4f54-8ab7-74296104bbfa",
        "https://harmless-tapir-303.convex.cloud/api/storage/b572b363-253c-4de4-aef7-09202e1db986",
        "https://harmless-tapir-303.convex.cloud/api/storage/9648f585-7a15-41c0-a980-075080ac708e",
        "https://harmless-tapir-303.convex.cloud/api/storage/46012c9e-a8e7-41db-abe2-8f2ef79faa44",
      ],
      seeInAction: [
        {
          title: "Smart LCD Display",
          description: "Advanced digital dashboard with real-time speed, battery, and performance metrics at your fingertips",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/6263d793-5ad5-4f1e-952a-3a2f0d82a877",
        },
        {
          title: "Premium LED Lighting System",
          description: "Military-grade LED headlights and turn signals ensure maximum visibility and safety in all conditions",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/5b4f6cca-08b9-48a2-8a77-55a06980967d",
        },
      ],
      customerPhotos: [
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/3bfa51b9-8982-4265-b90f-4ea6153ca3c1",
          name: "Jake M.",
          location: "Outer Banks, NC",
          caption: "Tackling rugged paths with confidence - impressive off-road capability",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/3ad77acd-8c18-47a9-99f3-eb077d55f431",
          name: "Tyler B.",
          location: "Miami Beach, FL",
          caption: "The speed and power are unreal - worth every penny!",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/e6cc55a7-273c-4f0b-8d2e-526798604222",
          name: "Chris P.",
          location: "Lake Tahoe, CA",
          caption: "Neighbors keep asking about it - turns heads everywhere",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/c195f4dc-4087-4ffd-8a5c-70ce30d0f897",
          name: "Brandon K.",
          location: "Sedona, AZ",
          caption: "Love the power and range on this beast",
        },
      ],
    },
    "elk-jubilee-x": {
      additionalImages: [
        "https://harmless-tapir-303.convex.cloud/api/storage/90c56e58-647e-430d-980a-a15415c694db",
        "https://harmless-tapir-303.convex.cloud/api/storage/de8ed53d-307a-47fe-a66c-8d13bbda55e9",
        "https://harmless-tapir-303.convex.cloud/api/storage/06fc59f1-0bd1-4bb6-802c-3822e2604883",
        "https://harmless-tapir-303.convex.cloud/api/storage/0fe30846-b2a0-4259-9f3e-e1db40ecca5d",
      ],
      seeInAction: [
        {
          title: "Off-Road Domination",
          description: "Aggressive tread pattern and reinforced sidewalls conquer mud, gravel, and rocky trails with unstoppable grip",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/53aee9ee-039e-4f67-8caa-a0ee024560e3",
        },
        {
          title: "Adventure-Ready Storage & Suspension",
          description: "Premium rear storage compartment paired with heavy-duty suspension system—engineered for long-distance comfort and cargo capacity",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/de921bb1-d43e-4458-938d-383e4d0ebb46",
        },
      ],
      customerPhotos: [
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/d5b2690f-83a7-439c-a265-d40a3b7604a3",
          name: "Alex M.",
          location: "Colorado Springs, CO",
          caption: "Three wheels make all the difference on rough terrain",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/565f9767-0bcf-4f13-b967-f74afed4b773",
          name: "Jordan K.",
          location: "Moab, UT",
          caption: "Surprisingly nimble for a 3-wheeler - love the stability",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/286cca25-8626-4abd-90a5-84dc89226359",
          name: "Marcus T.",
          location: "Sedona, AZ",
          caption: "Perfect for beach rides and trail adventures",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/298eec0e-9225-4838-aeb9-aef74ce6b7ce",
          name: "Riley P.",
          location: "Denver, CO",
          caption: "Storage capacity is a game changer for longer trips",
        },
      ],
    },
    "elk-velocity": {
      additionalImages: [
        "https://harmless-tapir-303.convex.cloud/api/storage/27cb123f-acb4-4a46-8c38-0cf7e7a196d9",
        "https://harmless-tapir-303.convex.cloud/api/storage/ca5b82bc-e911-4446-bbcf-9afe1c1fd04b",
        "https://harmless-tapir-303.convex.cloud/api/storage/14c91a5d-b051-4143-8aa4-d1592df83066",
        "https://harmless-tapir-303.convex.cloud/api/storage/56298b00-a507-4ba5-8379-15ac3d09c581",
        "https://harmless-tapir-303.convex.cloud/api/storage/7bcd4788-9b6f-46cc-a104-18265ad1ab53",
        "https://harmless-tapir-303.convex.cloud/api/storage/2baf66d0-d0d1-410b-90d3-1288268c010a",
        "https://harmless-tapir-303.convex.cloud/api/storage/cb3d1178-20ed-4409-832b-6bd8dd1a47aa",
        "https://harmless-tapir-303.convex.cloud/api/storage/7cbe921d-e45a-40af-872d-62a0f38cd618",
        "https://harmless-tapir-303.convex.cloud/api/storage/85d786cf-895b-420a-8c1b-80d5d366cadf",
        "https://harmless-tapir-303.convex.cloud/api/storage/7f28887e-7925-4c04-9668-4d5e75f8423e",
        "https://harmless-tapir-303.convex.cloud/api/storage/d1937022-9a87-4b95-8b1d-cfbbcae60ef3",
        "https://harmless-tapir-303.convex.cloud/api/storage/285bb984-265e-4987-a5ad-c2c3ddea0768",
        "https://harmless-tapir-303.convex.cloud/api/storage/db9fc24b-8e73-4e2e-8a9a-2256e51d8cd4",
      ],
      seeInAction: [
        {
          title: "Built for Real Roads",
          description: "From smooth pavement to rugged terrain, the Velocity handles every surface with confidence and style",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/8e3ede28-03af-4160-b182-629979244ff5",
        },
        {
          title: "Adventure-Ready Design",
          description: "Premium fat tires and robust construction make every journey smooth, whether you're commuting or exploring",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/177320c9-0a25-457c-90d1-f8f644ff2289",
        },
        {
          title: "Unstoppable Performance",
          description: "3000W of pure power meets precision engineering for an unmatched riding experience on any terrain",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/b0ef24d2-3aa5-45a9-872a-2d786d70638e",
        },
        {
          title: "Sleek & Powerful",
          description: "Aggressive stance with premium red brake calipers—engineered to turn heads while delivering raw performance",
          image: "https://harmless-tapir-303.convex.cloud/api/storage/f602e569-156d-497e-bc6d-5606f9a1711d",
        },
      ],
      customerPhotos: [
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/6a6c83b8-cbc6-4bcd-b4a4-9eb24af5ad14",
          name: "Alex M.",
          location: "Trail Ridge",
          caption: "Great for weekend adventures - solid build quality",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/d2a43309-44bc-4144-ae55-d964dc7db192",
          name: "Jordan K.",
          location: "Mountain View",
          caption: "Fast acceleration and responsive braking - feels safe",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/05c820a7-8486-4181-8ce8-b8dddbe7db2f",
          name: "Sam R.",
          location: "Malibu, CA",
          caption: "Beach cruising has never been this smooth",
        },
        {
          image: "https://harmless-tapir-303.convex.cloud/api/storage/c86f6504-3fa6-439f-907f-b4d4ffd5bf2e",
          name: "Taylor B.",
          location: "Austin, TX",
          caption: "Incredible performance and style combined",
        },
      ],
    },
  };

  const currentProductData = productData[id || ""] || { additionalImages: [], seeInAction: [], customerPhotos: [] };
  const relatedScooters = scooters?.filter((s) => s.id !== id && s.inStock).slice(0, 3);

  if (!scooters) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!scooter) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Scooter Not Found</h1>
          <Button onClick={() => navigate("/scooters")} className="bg-amber-500 hover:bg-amber-600 text-black">
            Back to All Scooters
          </Button>
        </div>
      </div>
    );
  }

  const images = currentProductData.additionalImages.length > 0 
    ? currentProductData.additionalImages 
    : [scooter.image];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <Button
          variant="ghost"
          onClick={() => navigate("/scooters")}
          className="mb-8 text-amber-500 hover:text-amber-400"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 rounded-2xl p-8 border border-zinc-800 mb-4">
              <img
                src={images[selectedImage]}
                alt={scooter.name}
                className="w-full h-auto object-contain rounded-xl"
              />
              {!scooter.inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                  <Badge variant="destructive" className="text-2xl px-6 py-3">
                    SOLD OUT
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="relative">
                <div className="grid grid-cols-4 gap-3">
                  {images.slice(thumbnailStartIndex, thumbnailStartIndex + 4).map((img: string, idx: number) => {
                    const actualIndex = thumbnailStartIndex + idx;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => setSelectedImage(actualIndex)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === actualIndex ? "border-amber-500" : "border-zinc-800 hover:border-zinc-600"
                        }`}
                      >
                        <img src={img} alt={`View ${actualIndex + 1}`} className="w-full h-20 object-cover" />
                      </button>
                    );
                  })}
                </div>
                
                {/* Navigation Arrows */}
                {images.length > 4 && (
                  <div className="flex justify-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - 4))}
                      disabled={thumbnailStartIndex === 0}
                      className="border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/50"
                    >
                      ← Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setThumbnailStartIndex(Math.min(images.length - 4, thumbnailStartIndex + 4))}
                      disabled={thumbnailStartIndex + 4 >= images.length}
                      className="border-zinc-800 text-zinc-400 hover:text-amber-500 hover:border-amber-500/50"
                    >
                      Next →
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {scooter.badges.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-amber-500/20 text-amber-500 border-amber-500/30"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{scooter.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(scooter.rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-zinc-400">
                {scooter.rating} ({scooter.reviews} reviews)
              </span>
            </div>

            {/* Variant Selector for Elk Velocity */}
            {(scooter as any).variants && (scooter as any).variants.length > 0 && (
              <div className="mb-6">
                <label className="text-sm text-zinc-400 mb-2 block">Select Configuration</label>
                <div className="grid grid-cols-2 gap-3">
                  {(scooter as any).variants.map((variant: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedVariant === idx
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
                      }`}
                    >
                      <div className="text-lg font-bold mb-1">{variant.name}</div>
                      <div className="text-amber-500 font-semibold">${variant.price.toFixed(2)}</div>
                      {variant.originalPrice && (
                        <div className="text-xs text-zinc-500 line-through">
                          ${variant.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              {displayOriginalPrice && (
                <span className="text-2xl text-zinc-500 line-through mr-4">
                  ${displayOriginalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-5xl font-bold text-amber-500">
                ${displayPrice.toFixed(2)}
              </span>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Zap className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Power</div>
                <div className="text-xl font-bold">{scooter.power}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Gauge className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Max Speed</div>
                <div className="text-xl font-bold">{scooter.maxSpeed}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Battery className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Max Range</div>
                <div className="text-xl font-bold">{scooter.range}</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <Star className="h-6 w-6 text-amber-500 mb-2" />
                <div className="text-sm text-zinc-400">Wheels</div>
                <div className="text-xl font-bold">{scooter.wheels}</div>
              </div>
            </div>

            <Button
              size="lg"
              disabled={!scooter.inStock}
              onClick={handleBuyNow}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-6 rounded-full mb-4"
            >
              {scooter.inStock ? "Buy Now" : "Out of Stock"}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-800">
              <div className="text-center">
                <Truck className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-400">Free Shipping</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-400">1-Year Warranty</div>
              </div>
              <div className="text-center">
                <Headphones className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-xs text-zinc-400">US Support</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* See It In Action Section */}
        {currentProductData.seeInAction.length > 0 && (
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              SEE IT IN <span className="text-amber-500">ACTION</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentProductData.seeInAction.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Customer Photos Section */}
        {currentProductData.customerPhotos.length > 0 && (
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              REAL RIDERS, REAL <span className="text-amber-500">ADVENTURES</span>
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentProductData.customerPhotos.map((photo: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[9/16]">
                    <img
                      src={photo.image}
                      alt={`${photo.name}'s photo`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-sm font-bold mb-1">{photo.name}</p>
                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                        <MapPin className="h-3 w-3" />
                        {photo.location}
                      </div>
                      <p className="text-xs italic">"{photo.caption}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedScooters && relatedScooters.length > 0 && (
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              YOU MIGHT ALSO <span className="text-amber-500">LIKE</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedScooters.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 group">
                    <div className="p-6">
                      <div className="relative mb-6">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
                        {related.name}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-amber-500">
                          ${related.price.toFixed(2)}
                        </span>
                      </div>
                  <Button
                    onClick={() => navigate(`/scooter/${related.id}`)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  >
                    View Details
                  </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Battery Upsell Modal */}
      <AlertDialog open={batteryModalOpen} onOpenChange={setBatteryModalOpen}>
        <AlertDialogContent className="bg-zinc-900 border-amber-500/30 max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl md:text-3xl text-white mb-2">
              🔋 Double Your Adventure Range!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-300 text-base space-y-3">
              <div className="flex items-center justify-center my-4 w-full">
                <img 
                  src={scooter?.wheels === 3 
                    ? "https://harmless-tapir-303.convex.cloud/api/storage/775163ad-3508-47a0-a108-2ee23fc0d821"
                    : "https://harmless-tapir-303.convex.cloud/api/storage/8c7e9a11-2b64-4d4c-9ade-d9d95216ed50"
                  }
                  alt="Extra Battery"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain rounded-xl bg-zinc-800/50 p-3 md:p-4 max-w-full"
                />
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 md:p-4">
                <p className="text-white font-bold text-lg md:text-xl mb-2">
                  Add an Extra Battery for Just <span className="text-amber-500">$450</span>
                </p>
                <ul className="space-y-2 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0">✓</span>
                    <span>Double your range - ride up to {scooter?.range ? parseInt(scooter.range) * 2 : 60} miles on a single charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0">✓</span>
                    <span>Never worry about running out of power on long trips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0">✓</span>
                    <span>Hot-swappable design - swap batteries in seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold flex-shrink-0">✓</span>
                    <span>Same premium quality as your scooter's main battery</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 italic text-center">
                Most riders who buy an extra battery say it's their best accessory purchase!
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 flex-col sm:flex-row">
            <AlertDialogCancel 
              onClick={() => handleBatteryChoice(false)}
              className="bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-700 text-sm md:text-base px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto"
            >
              No Thanks, Just the Scooter
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleBatteryChoice(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-sm md:text-base px-6 md:px-8 py-2 md:py-3 w-full sm:w-auto"
            >
              Yes! Add Battery (+$450)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-black border-t border-amber-500/20 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://harmless-tapir-303.convex.cloud/api/storage/c80a657d-9749-4299-bbe9-63f2324be9a2" 
                alt="Elk Scooters Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-zinc-400 text-sm">
              Electrifying the path less traveled.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button onClick={() => navigate("/scooters?wheels=2")} className="hover:text-amber-500 transition-colors text-left">
                  Two Wheels
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/scooters?wheels=3")} className="hover:text-amber-500 transition-colors text-left">
                  Three Wheels
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/scooters")} className="hover:text-amber-500 transition-colors text-left">
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/warranty")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Warranty
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/shipping")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Shipping
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/blog")}
                  className="hover:text-amber-500 transition-colors text-left"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2025 Elk Scooters. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/privacy")} className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate("/terms")} className="hover:text-amber-500 transition-colors">
              Terms
            </button>
            <button onClick={() => navigate("/cookies")} className="hover:text-amber-500 transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}