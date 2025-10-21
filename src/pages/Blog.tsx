import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

// SEO-optimized blog articles
const blogArticles = [
  { id: 1, title: "Ultimate Guide to Electric Scooters in 2025", category: "Guides", date: "2025-01-15", readTime: "12 min", excerpt: "Everything you need to know about choosing the perfect electric scooter for your lifestyle and budget.", keywords: ["electric scooter guide", "best electric scooters 2025"] },
  { id: 2, title: "How to Maintain Your Electric Scooter Battery", category: "Maintenance", date: "2025-01-14", readTime: "8 min", excerpt: "Expert tips to extend your electric scooter battery life and maximize range.", keywords: ["electric scooter battery", "scooter maintenance"] },
  { id: 3, title: "Electric Scooter Safety Tips for Beginners", category: "Safety", date: "2025-01-13", readTime: "10 min", excerpt: "Essential safety guidelines every new electric scooter rider should know.", keywords: ["electric scooter safety", "scooter riding tips"] },
  { id: 4, title: "Best All-Terrain Electric Scooters for Off-Road Adventures", category: "Reviews", date: "2025-01-12", readTime: "15 min", excerpt: "Discover the top all-terrain electric scooters built to conquer any surface.", keywords: ["all-terrain electric scooter", "off-road scooter"] },
  { id: 5, title: "Electric Scooter vs Electric Bike: Which is Right for You?", category: "Comparisons", date: "2025-01-11", readTime: "11 min", excerpt: "Compare the pros and cons of electric scooters and e-bikes to make the best choice.", keywords: ["electric scooter vs bike", "e-scooter comparison"] },
  { id: 6, title: "How to Choose the Right Electric Scooter Motor Power", category: "Guides", date: "2025-01-10", readTime: "9 min", excerpt: "Understanding motor wattage and how it affects your riding experience.", keywords: ["electric scooter motor", "scooter power"] },
  { id: 7, title: "Top 10 Electric Scooter Accessories You Need", category: "Accessories", date: "2025-01-09", readTime: "7 min", excerpt: "Must-have accessories to enhance your electric scooter experience.", keywords: ["electric scooter accessories", "scooter upgrades"] },
  { id: 8, title: "Electric Scooter Laws and Regulations by State", category: "Legal", date: "2025-01-08", readTime: "13 min", excerpt: "Complete guide to electric scooter laws across the United States.", keywords: ["electric scooter laws", "scooter regulations"] },
  { id: 9, title: "How to Winterize Your Electric Scooter", category: "Maintenance", date: "2025-01-07", readTime: "8 min", excerpt: "Protect your electric scooter during cold weather months.", keywords: ["winter electric scooter", "cold weather scooter"] },
  { id: 10, title: "Best Electric Scooters for Commuting to Work", category: "Reviews", date: "2025-01-06", readTime: "12 min", excerpt: "Top electric scooters perfect for daily commutes and urban travel.", keywords: ["commuter electric scooter", "best scooter for work"] },
  { id: 11, title: "Electric Scooter Range: How Far Can You Really Go?", category: "Guides", date: "2025-01-05", readTime: "10 min", excerpt: "Understanding range specifications and real-world performance.", keywords: ["electric scooter range", "scooter battery life"] },
  { id: 12, title: "How to Fix Common Electric Scooter Problems", category: "Maintenance", date: "2025-01-04", readTime: "14 min", excerpt: "DIY troubleshooting guide for the most common electric scooter issues.", keywords: ["electric scooter repair", "scooter troubleshooting"] },
  { id: 13, title: "Three-Wheel vs Two-Wheel Electric Scooters", category: "Comparisons", date: "2025-01-03", readTime: "9 min", excerpt: "Comparing stability, performance, and use cases for different wheel configurations.", keywords: ["three wheel scooter", "two wheel scooter"] },
  { id: 14, title: "Electric Scooter Weight Capacity Guide", category: "Guides", date: "2025-01-02", readTime: "7 min", excerpt: "How to choose an electric scooter that supports your weight safely.", keywords: ["electric scooter weight limit", "heavy duty scooter"] },
  { id: 15, title: "Best Electric Scooters Under $2000", category: "Reviews", date: "2025-01-01", readTime: "11 min", excerpt: "Top-rated electric scooters that deliver premium features without breaking the bank.", keywords: ["affordable electric scooter", "budget scooter"] },
  { id: 16, title: "How to Ride an Electric Scooter in the Rain", category: "Safety", date: "2024-12-31", readTime: "8 min", excerpt: "Safety tips and best practices for wet weather riding.", keywords: ["electric scooter rain", "waterproof scooter"] },
  { id: 17, title: "Electric Scooter Tire Guide: Solid vs Pneumatic", category: "Guides", date: "2024-12-30", readTime: "10 min", excerpt: "Understanding tire types and choosing the best option for your needs.", keywords: ["electric scooter tires", "pneumatic tires"] },
  { id: 18, title: "How to Increase Your Electric Scooter Speed Safely", category: "Performance", date: "2024-12-29", readTime: "9 min", excerpt: "Legal and safe methods to boost your electric scooter's performance.", keywords: ["electric scooter speed", "faster scooter"] },
  { id: 19, title: "Electric Scooter Brake Systems Explained", category: "Guides", date: "2024-12-28", readTime: "11 min", excerpt: "Understanding disc brakes, drum brakes, and regenerative braking.", keywords: ["electric scooter brakes", "scooter brake types"] },
  { id: 20, title: "Best Electric Scooters for Heavy Adults", category: "Reviews", date: "2024-12-27", readTime: "12 min", excerpt: "High-capacity electric scooters built for larger riders.", keywords: ["heavy duty electric scooter", "scooter for adults"] },
  { id: 21, title: "How to Store Your Electric Scooter Properly", category: "Maintenance", date: "2024-12-26", readTime: "7 min", excerpt: "Best practices for long-term electric scooter storage.", keywords: ["electric scooter storage", "scooter care"] },
  { id: 22, title: "Electric Scooter Suspension Systems: Complete Guide", category: "Guides", date: "2024-12-25", readTime: "10 min", excerpt: "How suspension affects ride comfort and performance.", keywords: ["electric scooter suspension", "smooth ride scooter"] },
  { id: 23, title: "Top Electric Scooters with Dual Motors", category: "Reviews", date: "2024-12-24", readTime: "13 min", excerpt: "Powerful dual-motor electric scooters for maximum performance.", keywords: ["dual motor scooter", "powerful electric scooter"] },
  { id: 24, title: "Electric Scooter Charging Guide: Best Practices", category: "Maintenance", date: "2024-12-23", readTime: "8 min", excerpt: "How to charge your electric scooter correctly for optimal battery health.", keywords: ["electric scooter charging", "battery charging tips"] },
  { id: 25, title: "How to Upgrade Your Electric Scooter", category: "Modifications", date: "2024-12-22", readTime: "12 min", excerpt: "Popular upgrades and modifications to enhance your ride.", keywords: ["electric scooter upgrades", "scooter modifications"] },
  { id: 26, title: "Electric Scooter Insurance: Do You Need It?", category: "Legal", date: "2024-12-21", readTime: "9 min", excerpt: "Understanding insurance options and requirements for electric scooters.", keywords: ["electric scooter insurance", "scooter coverage"] },
  { id: 27, title: "Best Electric Scooters for Climbing Hills", category: "Reviews", date: "2024-12-20", readTime: "11 min", excerpt: "High-torque electric scooters that conquer steep inclines.", keywords: ["hill climbing scooter", "powerful motor scooter"] },
  { id: 28, title: "Electric Scooter Night Riding Safety Guide", category: "Safety", date: "2024-12-19", readTime: "8 min", excerpt: "Essential tips for safe nighttime electric scooter riding.", keywords: ["night riding scooter", "scooter lights"] },
  { id: 29, title: "How to Clean Your Electric Scooter", category: "Maintenance", date: "2024-12-18", readTime: "7 min", excerpt: "Step-by-step guide to properly cleaning and maintaining your scooter.", keywords: ["clean electric scooter", "scooter maintenance"] },
  { id: 30, title: "Electric Scooter Helmet Guide: Choosing the Right Protection", category: "Safety", date: "2024-12-17", readTime: "10 min", excerpt: "How to select the perfect helmet for electric scooter riding.", keywords: ["electric scooter helmet", "scooter safety gear"] },
  { id: 31, title: "Best Long-Range Electric Scooters", category: "Reviews", date: "2024-12-16", readTime: "12 min", excerpt: "Electric scooters with the longest battery range for extended rides.", keywords: ["long range electric scooter", "extended battery scooter"] },
  { id: 32, title: "Electric Scooter vs Gas Scooter: Cost Comparison", category: "Comparisons", date: "2024-12-15", readTime: "9 min", excerpt: "Analyzing the true cost of ownership between electric and gas scooters.", keywords: ["electric vs gas scooter", "scooter cost comparison"] },
  { id: 33, title: "How to Test Ride an Electric Scooter Before Buying", category: "Guides", date: "2024-12-14", readTime: "8 min", excerpt: "What to look for when test riding an electric scooter.", keywords: ["test ride electric scooter", "buying guide"] },
  { id: 34, title: "Electric Scooter Portability: Folding vs Non-Folding", category: "Guides", date: "2024-12-13", readTime: "7 min", excerpt: "Comparing portable and fixed-frame electric scooters.", keywords: ["folding electric scooter", "portable scooter"] },
  { id: 35, title: "Best Electric Scooters for Seniors", category: "Reviews", date: "2024-12-12", readTime: "11 min", excerpt: "Safe, stable electric scooters perfect for older riders.", keywords: ["electric scooter for seniors", "mobility scooter"] },
  { id: 36, title: "Electric Scooter Display Features Explained", category: "Guides", date: "2024-12-11", readTime: "8 min", excerpt: "Understanding LCD displays and smart features on modern scooters.", keywords: ["electric scooter display", "smart scooter features"] },
  { id: 37, title: "How to Ride an Electric Scooter Uphill", category: "Tips", date: "2024-12-10", readTime: "7 min", excerpt: "Techniques for efficient hill climbing on your electric scooter.", keywords: ["electric scooter uphill", "climbing techniques"] },
  { id: 38, title: "Electric Scooter Warranty Guide: What's Covered?", category: "Legal", date: "2024-12-09", readTime: "9 min", excerpt: "Understanding warranty coverage and protection plans.", keywords: ["electric scooter warranty", "scooter protection"] },
  { id: 39, title: "Best Electric Scooters with Seats", category: "Reviews", date: "2024-12-08", readTime: "10 min", excerpt: "Comfortable seated electric scooters for longer rides.", keywords: ["electric scooter with seat", "seated scooter"] },
  { id: 40, title: "Electric Scooter Controller Guide", category: "Technical", date: "2024-12-07", readTime: "11 min", excerpt: "How controllers work and affect your scooter's performance.", keywords: ["electric scooter controller", "scooter electronics"] },
  { id: 41, title: "How to Prevent Electric Scooter Theft", category: "Safety", date: "2024-12-06", readTime: "8 min", excerpt: "Security tips and best locks for protecting your investment.", keywords: ["electric scooter theft", "scooter security"] },
  { id: 42, title: "Electric Scooter for Delivery Work: Best Options", category: "Reviews", date: "2024-12-05", readTime: "12 min", excerpt: "Durable electric scooters perfect for food delivery and gig work.", keywords: ["delivery electric scooter", "work scooter"] },
  { id: 43, title: "Understanding Electric Scooter IP Ratings", category: "Technical", date: "2024-12-04", readTime: "7 min", excerpt: "What water and dust resistance ratings mean for your scooter.", keywords: ["electric scooter waterproof", "IP rating"] },
  { id: 44, title: "Best Electric Scooters for College Students", category: "Reviews", date: "2024-12-03", readTime: "10 min", excerpt: "Affordable, portable scooters perfect for campus life.", keywords: ["college electric scooter", "student scooter"] },
  { id: 45, title: "Electric Scooter Regenerative Braking Explained", category: "Technical", date: "2024-12-02", readTime: "9 min", excerpt: "How regenerative braking works and extends battery life.", keywords: ["regenerative braking", "electric scooter technology"] },
  { id: 46, title: "How to Replace Electric Scooter Tires", category: "Maintenance", date: "2024-12-01", readTime: "11 min", excerpt: "Step-by-step guide to changing your electric scooter tires.", keywords: ["replace scooter tire", "tire change guide"] },
  { id: 47, title: "Electric Scooter Riding in Different Weather Conditions", category: "Safety", date: "2024-11-30", readTime: "10 min", excerpt: "Adapting your riding style for various weather scenarios.", keywords: ["electric scooter weather", "all-weather riding"] },
  { id: 48, title: "Best Budget Electric Scooters Under $1000", category: "Reviews", date: "2024-11-29", readTime: "11 min", excerpt: "Quality electric scooters that won't break the bank.", keywords: ["cheap electric scooter", "budget scooter under 1000"] },
  { id: 49, title: "Electric Scooter Bluetooth Features and Apps", category: "Technology", date: "2024-11-28", readTime: "8 min", excerpt: "How smartphone connectivity enhances your riding experience.", keywords: ["smart electric scooter", "bluetooth scooter"] },
  { id: 50, title: "How to Extend Your Electric Scooter's Lifespan", category: "Maintenance", date: "2024-11-27", readTime: "9 min", excerpt: "Maintenance tips to keep your scooter running for years.", keywords: ["electric scooter lifespan", "long-lasting scooter"] },
  { id: 51, title: "Electric Scooter Commuting: Complete Guide", category: "Guides", date: "2024-11-26", readTime: "12 min", excerpt: "Everything you need to know about commuting by electric scooter.", keywords: ["electric scooter commute", "urban transportation"] },
  { id: 52, title: "Best High-Speed Electric Scooters", category: "Reviews", date: "2024-11-25", readTime: "13 min", excerpt: "Fastest electric scooters for thrill-seekers.", keywords: ["fast electric scooter", "high speed scooter"] },
  { id: 53, title: "Electric Scooter Footboard Size Guide", category: "Guides", date: "2024-11-24", readTime: "7 min", excerpt: "How deck size affects comfort and stability.", keywords: ["electric scooter deck", "footboard size"] },
  { id: 54, title: "How to Troubleshoot Electric Scooter Motor Issues", category: "Maintenance", date: "2024-11-23", readTime: "10 min", excerpt: "Diagnosing and fixing common motor problems.", keywords: ["electric scooter motor problems", "motor repair"] },
  { id: 55, title: "Electric Scooter for Mountain Trails", category: "Reviews", date: "2024-11-22", readTime: "11 min", excerpt: "Rugged scooters built for extreme off-road adventures.", keywords: ["mountain electric scooter", "trail scooter"] },
  { id: 56, title: "Understanding Electric Scooter Voltage Systems", category: "Technical", date: "2024-11-21", readTime: "9 min", excerpt: "How voltage affects power, speed, and performance.", keywords: ["electric scooter voltage", "battery voltage"] },
  { id: 57, title: "Best Electric Scooters with Suspension", category: "Reviews", date: "2024-11-20", readTime: "12 min", excerpt: "Smooth-riding scooters with advanced suspension systems.", keywords: ["electric scooter suspension", "comfortable ride"] },
  { id: 58, title: "Electric Scooter Parking and Storage Solutions", category: "Tips", date: "2024-11-19", readTime: "7 min", excerpt: "Where and how to park your electric scooter safely.", keywords: ["electric scooter parking", "scooter storage"] },
  { id: 59, title: "How to Choose Electric Scooter Lights", category: "Accessories", date: "2024-11-18", readTime: "8 min", excerpt: "Selecting the best lighting for visibility and safety.", keywords: ["electric scooter lights", "scooter visibility"] },
  { id: 60, title: "Electric Scooter Riding Posture and Technique", category: "Tips", date: "2024-11-17", readTime: "9 min", excerpt: "Proper form for comfortable and safe riding.", keywords: ["electric scooter posture", "riding technique"] },
  { id: 61, title: "Best Electric Scooters for Beach Riding", category: "Reviews", date: "2024-11-16", readTime: "10 min", excerpt: "Sand-ready scooters perfect for coastal adventures.", keywords: ["beach electric scooter", "sand riding"] },
  { id: 62, title: "Electric Scooter Firmware Updates Guide", category: "Technology", date: "2024-11-15", readTime: "8 min", excerpt: "How to update your scooter's software for better performance.", keywords: ["electric scooter firmware", "software update"] },
  { id: 63, title: "How to Sell Your Used Electric Scooter", category: "Guides", date: "2024-11-14", readTime: "9 min", excerpt: "Tips for getting the best price when selling your scooter.", keywords: ["sell electric scooter", "used scooter value"] },
  { id: 64, title: "Electric Scooter Group Riding Etiquette", category: "Safety", date: "2024-11-13", readTime: "7 min", excerpt: "Rules and best practices for riding with others.", keywords: ["group scooter riding", "riding etiquette"] },
  { id: 65, title: "Best Electric Scooters with Large Wheels", category: "Reviews", date: "2024-11-12", readTime: "11 min", excerpt: "Big-wheeled scooters for superior stability and comfort.", keywords: ["large wheel scooter", "big tire scooter"] },
  { id: 66, title: "Electric Scooter Carbon Footprint Analysis", category: "Environment", date: "2024-11-11", readTime: "10 min", excerpt: "Environmental impact of electric scooters vs other transport.", keywords: ["electric scooter environment", "eco-friendly transport"] },
  { id: 67, title: "How to Customize Your Electric Scooter", category: "Modifications", date: "2024-11-10", readTime: "12 min", excerpt: "Personalization ideas and custom modifications.", keywords: ["customize electric scooter", "scooter mods"] },
  { id: 68, title: "Electric Scooter Rental vs Ownership", category: "Comparisons", date: "2024-11-09", readTime: "9 min", excerpt: "When it makes sense to rent vs buy an electric scooter.", keywords: ["rent vs buy scooter", "scooter ownership"] },
  { id: 69, title: "Best Electric Scooters for Tall Riders", category: "Reviews", date: "2024-11-08", readTime: "10 min", excerpt: "Scooters with adjustable handlebars for taller people.", keywords: ["electric scooter tall riders", "adjustable scooter"] },
  { id: 70, title: "Electric Scooter Handlebar Types Explained", category: "Guides", date: "2024-11-07", readTime: "7 min", excerpt: "Comparing different handlebar styles and ergonomics.", keywords: ["electric scooter handlebars", "handlebar types"] },
  { id: 71, title: "How to Ride an Electric Scooter in Traffic", category: "Safety", date: "2024-11-06", readTime: "11 min", excerpt: "Urban riding strategies for navigating busy streets.", keywords: ["electric scooter traffic", "urban riding safety"] },
  { id: 72, title: "Best Electric Scooters with Turn Signals", category: "Reviews", date: "2024-11-05", readTime: "9 min", excerpt: "Safety-focused scooters with integrated turn indicators.", keywords: ["electric scooter turn signals", "safety features"] },
  { id: 73, title: "Electric Scooter Battery Replacement Guide", category: "Maintenance", date: "2024-11-04", readTime: "10 min", excerpt: "When and how to replace your scooter's battery pack.", keywords: ["replace scooter battery", "battery replacement"] },
  { id: 74, title: "Understanding Electric Scooter Amp Hours", category: "Technical", date: "2024-11-03", readTime: "8 min", excerpt: "How Ah ratings affect range and performance.", keywords: ["electric scooter amp hours", "battery capacity"] },
  { id: 75, title: "Best Electric Scooters for Snow", category: "Reviews", date: "2024-11-02", readTime: "11 min", excerpt: "Winter-ready scooters that handle cold and snow.", keywords: ["electric scooter snow", "winter scooter"] },
  { id: 76, title: "Electric Scooter Kickstand Types and Uses", category: "Guides", date: "2024-11-01", readTime: "6 min", excerpt: "Choosing the right kickstand for your needs.", keywords: ["electric scooter kickstand", "scooter stand"] },
  { id: 77, title: "How to Improve Electric Scooter Acceleration", category: "Performance", date: "2024-10-31", readTime: "9 min", excerpt: "Tips for better throttle response and acceleration.", keywords: ["electric scooter acceleration", "faster takeoff"] },
  { id: 78, title: "Electric Scooter Fender Guide", category: "Accessories", date: "2024-10-30", readTime: "7 min", excerpt: "Why fenders matter and how to choose the right ones.", keywords: ["electric scooter fenders", "mudguards"] },
  { id: 79, title: "Best Electric Scooters Under 50 Pounds", category: "Reviews", date: "2024-10-29", readTime: "10 min", excerpt: "Lightweight scooters that are easy to carry.", keywords: ["lightweight electric scooter", "portable scooter"] },
  { id: 80, title: "Electric Scooter Cruise Control Features", category: "Technology", date: "2024-10-28", readTime: "8 min", excerpt: "How cruise control works and improves long rides.", keywords: ["electric scooter cruise control", "comfort features"] },
  { id: 81, title: "How to Pack an Electric Scooter for Travel", category: "Tips", date: "2024-10-27", readTime: "9 min", excerpt: "Traveling with your scooter by car, plane, or train.", keywords: ["travel with electric scooter", "scooter transport"] },
  { id: 82, title: "Electric Scooter Grip Tape Installation", category: "Maintenance", date: "2024-10-26", readTime: "7 min", excerpt: "Adding grip tape for better traction and control.", keywords: ["electric scooter grip tape", "deck grip"] },
  { id: 83, title: "Best Electric Scooters for Rough Terrain", category: "Reviews", date: "2024-10-25", readTime: "12 min", excerpt: "Tough scooters built to handle the roughest surfaces.", keywords: ["rough terrain scooter", "rugged electric scooter"] },
  { id: 84, title: "Electric Scooter Shock Absorber Maintenance", category: "Maintenance", date: "2024-10-24", readTime: "8 min", excerpt: "Caring for your suspension system.", keywords: ["electric scooter shocks", "suspension maintenance"] },
  { id: 85, title: "How to Choose Electric Scooter Mirrors", category: "Accessories", date: "2024-10-23", readTime: "6 min", excerpt: "Selecting and installing rearview mirrors.", keywords: ["electric scooter mirrors", "safety accessories"] },
  { id: 86, title: "Electric Scooter Throttle Types Explained", category: "Technical", date: "2024-10-22", readTime: "8 min", excerpt: "Thumb throttle vs trigger throttle comparison.", keywords: ["electric scooter throttle", "throttle types"] },
  { id: 87, title: "Best Electric Scooters with Phone Holders", category: "Reviews", date: "2024-10-21", readTime: "9 min", excerpt: "Scooters with integrated smartphone mounts.", keywords: ["electric scooter phone holder", "smartphone mount"] },
  { id: 88, title: "Electric Scooter Riding in Wind", category: "Safety", date: "2024-10-20", readTime: "7 min", excerpt: "Techniques for safe riding in windy conditions.", keywords: ["electric scooter wind", "windy riding tips"] },
  { id: 89, title: "How to Diagnose Electric Scooter Electrical Issues", category: "Maintenance", date: "2024-10-19", readTime: "11 min", excerpt: "Troubleshooting electrical problems and wiring.", keywords: ["electric scooter electrical", "wiring problems"] },
  { id: 90, title: "Best Electric Scooters with USB Charging", category: "Reviews", date: "2024-10-18", readTime: "8 min", excerpt: "Scooters that can charge your devices on the go.", keywords: ["electric scooter USB", "phone charging"] },
  { id: 91, title: "Electric Scooter Stem Maintenance Guide", category: "Maintenance", date: "2024-10-17", readTime: "7 min", excerpt: "Preventing and fixing stem wobble and issues.", keywords: ["electric scooter stem", "handlebar maintenance"] },
  { id: 92, title: "How to Ride an Electric Scooter Downhill Safely", category: "Safety", date: "2024-10-16", readTime: "9 min", excerpt: "Braking techniques and safety tips for descents.", keywords: ["electric scooter downhill", "descent safety"] },
  { id: 93, title: "Best Electric Scooters for Short Commutes", category: "Reviews", date: "2024-10-15", readTime: "10 min", excerpt: "Perfect scooters for quick trips under 5 miles.", keywords: ["short commute scooter", "city scooter"] },
  { id: 94, title: "Electric Scooter Horn and Bell Guide", category: "Accessories", date: "2024-10-14", readTime: "6 min", excerpt: "Choosing audible warning devices for safety.", keywords: ["electric scooter horn", "scooter bell"] },
  { id: 95, title: "How to Improve Electric Scooter Braking", category: "Performance", date: "2024-10-13", readTime: "10 min", excerpt: "Upgrading and maintaining your brake system.", keywords: ["electric scooter braking", "brake upgrade"] },
  { id: 96, title: "Electric Scooter Riding Gear Essentials", category: "Safety", date: "2024-10-12", readTime: "11 min", excerpt: "Complete guide to protective equipment and clothing.", keywords: ["electric scooter gear", "riding equipment"] },
  { id: 97, title: "Best Electric Scooters with Removable Batteries", category: "Reviews", date: "2024-10-11", readTime: "9 min", excerpt: "Scooters with swappable battery packs for extended range.", keywords: ["removable battery scooter", "swappable battery"] },
  { id: 98, title: "Electric Scooter Bearing Maintenance", category: "Maintenance", date: "2024-10-10", readTime: "8 min", excerpt: "Cleaning and replacing wheel bearings.", keywords: ["electric scooter bearings", "wheel maintenance"] },
  { id: 99, title: "How to Choose an Electric Scooter for Your Needs", category: "Guides", date: "2024-10-09", readTime: "15 min", excerpt: "Comprehensive buying guide covering all factors.", keywords: ["choose electric scooter", "buying guide"] },
  { id: 100, title: "Electric Scooter Future Trends and Innovations", category: "Technology", date: "2024-10-08", readTime: "12 min", excerpt: "What's next for electric scooter technology.", keywords: ["electric scooter future", "scooter innovation"] },
];

export default function Blog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", "Guides", "Reviews", "Maintenance", "Safety", "Comparisons", "Technical", "Legal", "Accessories", "Performance", "Tips", "Technology", "Modifications", "Environment"];

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ELK SCOOTERS <span className="text-amber-500">BLOG</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Expert guides, reviews, and tips for electric scooter enthusiasts
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category || (!selectedCategory && category === "All") ? "default" : "outline"}
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
              className={
                selectedCategory === category || (!selectedCategory && category === "All")
                  ? "bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  : "border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 h-full group cursor-pointer">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                      {article.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-zinc-400 text-lg">No articles found matching your search.</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-gradient-to-br from-zinc-900 to-black border border-amber-500/30 rounded-2xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            READY TO RIDE?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Explore our premium electric scooters and find your perfect ride.
          </p>
          <Button
            onClick={() => navigate("/scooters")}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-8 py-6 rounded-full"
          >
            Shop All Scooters
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}