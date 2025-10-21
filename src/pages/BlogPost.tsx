import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

// Blog articles data (all 100 articles)
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

// Generate full article content based on article data with SEO optimization
const generateArticleContent = (article: typeof blogArticles[0]) => {
  const scooterModels = ["Elk Velocity", "Elk Cruiser", "Elk ThunderBolt", "Elk Patriot", "Elk Jubilee X"];
  const randomModel = scooterModels[Math.floor(Math.random() * scooterModels.length)];
  
  // Create unique content based on article category and title
  const contentMap: Record<string, any> = {
    "Guides": {
      intro: `${article.excerpt} This comprehensive guide will help you navigate the world of electric scooters with expert insights from Elk Scooters' years of industry experience.`,
      section1: "Understanding the Basics",
      section1Text: `Before diving into ${article.title.toLowerCase()}, it's essential to understand the fundamentals. Electric scooters have evolved from simple commuter vehicles to powerful all-terrain machines capable of handling any surface. With models like the ${randomModel} offering up to 6000W of power, today's scooters are serious transportation alternatives.`,
      section2: "Key Features to Consider",
      section2Text: `When evaluating electric scooters, focus on motor power, battery capacity, build quality, and safety features. Our ${randomModel} exemplifies these priorities with its robust construction and advanced components.`,
    },
    "Maintenance": {
      intro: `${article.excerpt} Proper maintenance is crucial for extending your electric scooter's lifespan and ensuring optimal performance.`,
      section1: "Regular Maintenance Schedule",
      section1Text: `Maintaining your electric scooter doesn't have to be complicated. Whether you own a two-wheel model like the Elk Velocity or a three-wheel configuration like the Elk Patriot, regular care ensures years of reliable service. Check tire pressure weekly, inspect brakes monthly, and clean your scooter after off-road adventures.`,
      section2: "Common Maintenance Tasks",
      section2Text: `Essential maintenance includes battery care, brake adjustments, tire inspections, and electrical system checks. The ${randomModel} is designed for easy maintenance with accessible components and durable construction.`,
    },
    "Safety": {
      intro: `${article.excerpt} Safety should always be your top priority when riding electric scooters, especially at higher speeds.`,
      section1: "Essential Safety Equipment",
      section1Text: `Riding an electric scooter safely requires proper protective gear. Always wear a DOT-approved helmet, gloves, and protective clothing. At speeds up to 45 MPH on models like the ${randomModel}, safety equipment can make a critical difference in an accident.`,
      section2: "Safe Riding Practices",
      section2Text: `Beyond equipment, safe riding involves awareness, proper technique, and understanding your scooter's capabilities. Practice in safe areas before tackling challenging terrain or high-traffic roads.`,
    },
    "Reviews": {
      intro: `${article.excerpt} In this detailed review, we'll examine the best options available and help you make an informed decision.`,
      section1: "Top Performers",
      section1Text: `The electric scooter market offers incredible variety, from budget-friendly options to premium all-terrain beasts. Models like the ${randomModel} represent the pinnacle of performance, combining power, range, and durability in one package. With ratings consistently above 4.8 stars, Elk Scooters delivers proven quality.`,
      section2: "What Sets Them Apart",
      section2Text: `Premium electric scooters distinguish themselves through superior components, advanced features, and exceptional build quality. Look for models with dual disc brakes, high-capacity batteries (60V 20Ah+), and robust suspension systems.`,
    },
    "Comparisons": {
      intro: `${article.excerpt} This detailed comparison will help you understand the key differences and make the right choice for your needs.`,
      section1: "Side-by-Side Analysis",
      section1Text: `Comparing electric scooters requires examining multiple factors: performance, price, features, and intended use. The ${randomModel} offers an excellent balance of these elements, but your specific needs may vary based on terrain, distance, and budget.`,
      section2: "Making Your Decision",
      section2Text: `Consider your primary use case, budget constraints, and must-have features. Two-wheel models offer agility and speed, while three-wheel configurations provide enhanced stability and power.`,
    },
    "Legal": {
      intro: `${article.excerpt} Understanding the legal landscape is essential for responsible electric scooter ownership.`,
      section1: "Regulations and Requirements",
      section1Text: `Electric scooter laws vary significantly by location. Some areas classify them as bicycles, while others require registration or licensing. Before purchasing a high-performance model like the ${randomModel}, research your local regulations regarding speed limits, where you can ride, and age requirements.`,
      section2: "Staying Compliant",
      section2Text: `Compliance involves understanding local laws, maintaining proper equipment (lights, reflectors), and riding responsibly. Most jurisdictions require working brakes, lights for night riding, and adherence to traffic laws.`,
    },
    "Accessories": {
      intro: `${article.excerpt} The right accessories can transform your riding experience and enhance safety, comfort, and functionality.`,
      section1: "Must-Have Accessories",
      section1Text: `Essential accessories include quality locks, phone mounts, additional lighting, and storage solutions. For models like the ${randomModel}, consider upgrading to premium grips, adding fenders for wet conditions, and investing in a quality helmet.`,
      section2: "Performance Upgrades",
      section2Text: `Beyond basics, performance accessories can enhance your scooter's capabilities. Extra batteries extend range, upgraded suspension improves comfort, and better tires optimize traction for your riding conditions.`,
    },
    "Performance": {
      intro: `${article.excerpt} Maximizing your electric scooter's performance requires understanding its capabilities and optimization techniques.`,
      section1: "Performance Factors",
      section1Text: `Electric scooter performance depends on motor power, battery capacity, weight, and aerodynamics. The ${randomModel} achieves impressive performance through optimized components and engineering. Proper tire pressure, regular maintenance, and riding technique all impact real-world performance.`,
      section2: "Optimization Tips",
      section2Text: `Maximize performance by maintaining proper tire pressure, keeping your scooter clean, ensuring battery health, and using appropriate riding modes for conditions. Avoid overloading and extreme temperatures.`,
    },
    "Technology": {
      intro: `${article.excerpt} Modern electric scooters incorporate cutting-edge technology for enhanced performance, safety, and user experience.`,
      section1: "Advanced Features",
      section1Text: `Today's electric scooters feature smart displays, Bluetooth connectivity, regenerative braking, and sophisticated battery management systems. Models like the ${randomModel} showcase how technology enhances the riding experience with real-time data, customizable settings, and integrated safety features.`,
      section2: "Future Innovations",
      section2Text: `The electric scooter industry continues evolving with improvements in battery technology, motor efficiency, and smart features. Expect longer ranges, faster charging, and more integrated connectivity in future models.`,
    },
    "Tips": {
      intro: `${article.excerpt} These practical tips will help you get the most from your electric scooter experience.`,
      section1: "Expert Tips",
      section1Text: `Experienced riders know that small adjustments make big differences. Whether you're riding a ${randomModel} or another model, proper stance, smooth acceleration, and anticipating terrain changes improve comfort and efficiency. Learn your scooter's characteristics and adapt your technique accordingly.`,
      section2: "Pro Techniques",
      section2Text: `Advanced techniques include weight shifting for better control, using regenerative braking effectively, and optimizing battery usage through riding mode selection. Practice makes perfect.`,
    },
    "Modifications": {
      intro: `${article.excerpt} Customizing your electric scooter can enhance performance, aesthetics, and functionality.`,
      section1: "Popular Modifications",
      section1Text: `Common modifications include upgraded batteries, enhanced lighting, custom grips, and performance tires. While the ${randomModel} comes well-equipped, personalization allows you to tailor it to your specific needs. Always ensure modifications don't compromise safety or void warranties.`,
      section2: "Safety Considerations",
      section2Text: `When modifying your scooter, prioritize safety and legality. Avoid modifications that exceed manufacturer specifications or local regulations. Consult professionals for electrical or structural changes.`,
    },
    "Technical": {
      intro: `${article.excerpt} Understanding the technical aspects of electric scooters helps you make informed decisions and maintain your vehicle properly.`,
      section1: "Technical Specifications",
      section1Text: `Electric scooters involve complex systems: motors, controllers, batteries, and electronics working together. The ${randomModel} uses advanced components engineered for reliability and performance. Understanding voltage, amperage, wattage, and capacity helps you evaluate specifications meaningfully.`,
      section2: "System Integration",
      section2Text: `Modern scooters integrate multiple systems for optimal performance. Battery management systems protect cells, controllers regulate power delivery, and displays provide real-time feedback. Quality integration ensures reliability and longevity.`,
    },
    "Environment": {
      intro: `${article.excerpt} Electric scooters offer environmental benefits compared to traditional transportation, but understanding their full impact is important.`,
      section1: "Environmental Impact",
      section1Text: `Electric scooters produce zero direct emissions and offer significant environmental advantages over gas-powered vehicles. Models like the ${randomModel} provide eco-friendly transportation without sacrificing performance. Battery production and electricity sources affect overall environmental impact.`,
      section2: "Sustainable Practices",
      section2Text: `Maximize environmental benefits through proper battery care, responsible disposal, regular maintenance, and choosing renewable energy for charging when possible. Electric scooters represent a step toward sustainable urban mobility.`,
    },
  };

  const categoryContent = contentMap[article.category] || contentMap["Guides"];

  return {
    ...article,
    content: [
      {
        type: "paragraph",
        text: categoryContent.intro
      },
      {
        type: "heading",
        text: "Introduction"
      },
      {
        type: "paragraph",
        text: `Electric scooters have revolutionized personal transportation, offering an eco-friendly and efficient way to navigate urban environments and off-road terrain. Whether you're a seasoned rider or just starting out, understanding ${article.title.toLowerCase()} is crucial for making informed decisions. At Elk Scooters, we've engineered our lineup with power outputs ranging from 2000W to 6000W, ensuring there's a perfect model for every rider's needs.`
      },
      {
        type: "heading",
        text: categoryContent.section1
      },
      {
        type: "paragraph",
        text: categoryContent.section1Text
      },
      {
        type: "heading",
        text: categoryContent.section2
      },
      {
        type: "paragraph",
        text: categoryContent.section2Text
      },
      {
        type: "list",
        items: [
          `Battery capacity and range - Look for 60V systems with 20Ah+ capacity for extended rides`,
          `Motor power and torque - 3000W to 6000W motors provide serious performance`,
          `Build quality and durability - All-terrain fat tires and reinforced frames handle any surface`,
          `Safety features - Dual disc brakes, bright LED lights, and regenerative braking`,
          `Comfort features - Advanced suspension systems for smooth rides on rough terrain`,
          `Smart features - LCD displays, Bluetooth connectivity, and customizable riding modes`
        ]
      },
      {
        type: "heading",
        text: "Expert Recommendations from Elk Scooters"
      },
      {
        type: "paragraph",
        text: `Based on extensive testing and feedback from thousands of riders, we recommend prioritizing quality and reliability over price alone. A well-built electric scooter provides years of dependable service and superior value. Our ${randomModel} exemplifies this philosophy, combining premium components with competitive pricing and backed by our comprehensive 1-year warranty.`
      },
      {
        type: "paragraph",
        text: "At Elk Scooters, we've engineered our complete lineup to excel in performance, safety, and durability. Our all-terrain models handle any surface, from city streets to mountain trails, with power outputs up to 6000W and ranges up to 30 miles. Every model includes off-road fat tires, advanced suspension systems, and comprehensive safety features including dual disc brakes and bright LED lighting for day and night riding."
      },
      {
        type: "heading",
        text: "Real-World Performance"
      },
      {
        type: "paragraph",
        text: `Specifications tell part of the story, but real-world performance is what matters. Our customers consistently report that Elk Scooters exceed range expectations, maintain power on steep inclines, and handle rough terrain with confidence. Whether you choose a two-wheel model like the Elk Velocity or Elk ThunderBolt, or a three-wheel configuration like the Elk Patriot or Elk Jubilee X, you're getting proven performance backed by our warranty and support.`
      },
      {
        type: "heading",
        text: "Safety and Responsibility"
      },
      {
        type: "paragraph",
        text: "Safety is paramount when riding electric scooters, especially at higher speeds and on challenging terrain. Always wear appropriate protective gear including a DOT-approved helmet, gloves, and protective clothing. Familiarize yourself with local electric scooter laws and regulations. Our scooters come equipped with multiple safety features, but responsible riding practices are equally important for your safety and others."
      },
      {
        type: "heading",
        text: "Conclusion"
      },
      {
        type: "paragraph",
        text: `Understanding ${article.title.toLowerCase()} is essential for any electric scooter enthusiast. By following the guidelines and recommendations in this article, you'll be well-equipped to make the best choices for your riding needs and get maximum enjoyment from your scooter. Elk Scooters offers a complete range of all-terrain electric scooters designed to exceed your expectations, whether you're commuting, exploring trails, or seeking adventure. Visit our showroom or browse our complete lineup to find your perfect ride today.`
      }
    ]
  };
};

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = blogArticles.find(a => a.id === Number(id));
  
  if (!article) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate("/blog")} className="bg-amber-500 hover:bg-amber-600 text-black">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const fullArticle = generateArticleContent(article);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <article className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate("/blog")}
            className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 mb-4">
            {article.category}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-zinc-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} read</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <p className="text-xl text-zinc-300 leading-relaxed">
            {article.excerpt}
          </p>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {fullArticle.content.map((block, idx) => {
            if (block.type === "heading") {
              return (
                <h2 key={idx} className="text-3xl font-bold mt-12 mb-6 text-amber-500">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "paragraph") {
              return (
                <p key={idx} className="text-zinc-300 leading-relaxed mb-6 text-lg">
                  {block.text}
                </p>
              );
            }
            if (block.type === "list" && block.items) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-3 mb-6 text-zinc-300">
                  {block.items.map((item, i) => (
                    <li key={i} className="text-lg">{item}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </motion.div>

        {/* Related Articles CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-br from-zinc-900 to-black border border-amber-500/30 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Explore More Articles</h3>
          <p className="text-zinc-400 mb-6">
            Discover more expert guides and reviews on electric scooters
          </p>
          <Button
            onClick={() => navigate("/blog")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold"
          >
            View All Articles
          </Button>
        </motion.div>
      </article>
    </div>
  );
}