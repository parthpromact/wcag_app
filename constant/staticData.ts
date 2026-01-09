interface AccessibilityFeature {
  icon: string;
  label: string;
  description?: string;
}

interface Itinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

interface Experience {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  category: string;
  accessibilityFeatures: AccessibilityFeature[];
  groupSize: string;
  difficulty: string;
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Itinerary[];
  meetingPoint: string;
  cancellationPolicy: string;
  languages: string[];
}

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  alt: string;
  rating: number;
  reviewCount: number;
  accessibilityRating: number;
  priceRange: string;
  duration: string;
  description: string;
  accessibilityFeatures: AccessibilityFeature[];
  featured: boolean;
}

export const destinationsStaticData: Destination[]  = [
    {
      id: 'paris-france',
      name: 'Paris',
      country: 'France',
      image: "/explore/ex-paris.jpg",
      alt: 'Eiffel Tower illuminated at sunset with Seine River in foreground',
      rating: 4.8,
      reviewCount: 2847,
      accessibilityRating: 4.6,
      priceRange: '$$$',
      duration: '5-7 days',
      description: 'Experience the City of Light with fully accessible museums, wheelchair-friendly metro stations, and adapted Seine River cruises. Discover art, culture, and romance with comprehensive mobility support.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Guides' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: true
    },
    {
      id: 'tokyo-japan',
      name: 'Tokyo',
      country: 'Japan',
      image: "/explore/ex-tokyo.jpg",
      alt: 'Tokyo skyline at night with illuminated skyscrapers and Mount Fuji in distance',
      rating: 4.9,
      reviewCount: 3156,
      accessibilityRating: 4.8,
      priceRange: '$$$$',
      duration: '7-10 days',
      description: 'Explore ultra-modern Tokyo with world-class accessibility infrastructure. Barrier-free temples, adapted transportation, and sensory-friendly attractions make this a premier accessible destination.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Support' },
        { icon: 'BoltIcon', label: 'Cognitive Support' }
      ],
      featured: true
    },
    {
      id: 'barcelona-spain',
      name: 'Barcelona',
      country: 'Spain',
      image: "/explore/ex-barcelona.jpg",
      alt: 'Sagrada Familia basilica with intricate Gothic architecture against blue sky',
      rating: 5.0,
      reviewCount: 2234,
      accessibilityRating: 4.5,
      priceRange: '$$',
      duration: '4-6 days',
      description: 'Discover Gaudí\'s masterpieces with accessible entrances, adapted beach facilities, and inclusive cultural experiences. Mediterranean charm meets modern accessibility standards.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'volume-2', label: 'Audio Tours' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    },
    {
      id: 'new-york-usa',
      name: 'New York City',
      country: 'United States',
      image: "/explore/ex-newyork.jpg",
      alt: 'Manhattan skyline with Empire State Building at dusk reflecting in water',
      rating: 4.6,
      reviewCount: 4521,
      accessibilityRating: 4.4,
      priceRange: '$$$$',
      duration: '5-8 days',
      description: 'Experience the city that never sleeps with ADA-compliant attractions, accessible Broadway shows, and comprehensive mobility services. Urban accessibility at its finest.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Support' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    },
    {
      id: 'sydney-australia',
      name: 'Sydney',
      country: 'Australia',
      image: "/explore/ex-sydney.jpg",
      alt: 'Sydney Opera House with harbor bridge in background during golden hour',
      rating: 4.8,
      reviewCount: 1987,
      accessibilityRating: 4.7,
      priceRange: '$$$',
      duration: '6-9 days',
      description: 'Explore iconic landmarks with exceptional accessibility standards. Adapted harbor cruises, beach wheelchairs, and inclusive wildlife experiences await.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'HeartIcon', label: 'Service Animals' },
        { icon: 'BoltIcon', label: 'Mobility Support' }
      ],
      featured: true
    },
    {
      id: 'rome-italy',
      name: 'Rome',
      country: 'Italy',
      image: "/explore/ex-rome.jpg",
      alt: 'Ancient Roman Colosseum amphitheater with tourists walking around perimeter',
      rating: 4.5,
      reviewCount: 3421,
      accessibilityRating: 4.2,
      priceRange: '$$',
      duration: '4-6 days',
      description: 'Journey through ancient history with adapted archaeological sites, accessible Vatican tours, and mobility-friendly trattorias. Eternal City, accessible for all.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'volume-2', label: 'Audio Guides' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    },
    {
      id: 'dubai-uae',
      name: 'Dubai',
      country: 'United Arab Emirates',
      image: "/explore/ex-dubai.jpg",
      alt: 'Burj Khalifa skyscraper towering over Dubai cityscape at twilight',
      rating: 4.7,
      reviewCount: 2156,
      accessibilityRating: 4.6,
      priceRange: '$$$$',
      duration: '5-7 days',
      description: 'Experience luxury and innovation with state-of-the-art accessibility. Adapted desert safaris, accessible malls, and inclusive cultural experiences in a futuristic setting.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Support' },
        { icon: 'BoltIcon', label: 'Cognitive Support' }
      ],
      featured: false
    },
    {
      id: 'amsterdam-netherlands',
      name: 'Amsterdam',
      country: 'Netherlands',
      image: "/explore/ex-amsterdam.jpg",
      alt: 'Traditional Dutch canal houses along Amsterdam waterway with bicycles parked on bridge',
      rating: 5.0,
      reviewCount: 1876,
      accessibilityRating: 4.5,
      priceRange: '$$',
      duration: '3-5 days',
      description: 'Navigate charming canals with accessible boat tours, flat terrain perfect for mobility devices, and inclusive museums. Progressive accessibility in a historic setting.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    },
    {
      id: 'singapore',
      name: 'Singapore',
      country: 'Singapore',
      image: "/explore/ex-singapore.jpg",
      alt: 'Marina Bay Sands hotel with futuristic architecture reflected in waterfront at night',
      rating: 4.9,
      reviewCount: 2543,
      accessibilityRating: 4.9,
      priceRange: '$$$',
      duration: '4-6 days',
      description: 'Discover Asia\'s most accessible city with barrier-free attractions, adapted gardens, and comprehensive support services. Modern infrastructure meets tropical paradise.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Support' },
        { icon: 'BoltIcon', label: 'Cognitive Support' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: true
    },
    {
      id: 'london-uk',
      name: 'London',
      country: 'United Kingdom',
      image: "/explore/ex-london.jpg",
      alt: 'Big Ben clock tower and Houses of Parliament along Thames River at sunset',
      rating: 4.7,
      reviewCount: 3987,
      accessibilityRating: 4.5,
      priceRange: '$$$',
      duration: '5-7 days',
      description: 'Explore royal heritage with accessible palaces, adapted theater experiences, and inclusive museums. Historic charm with modern accessibility standards.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Tours' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    },
    {
      id: 'reykjavik-iceland',
      name: 'Reykjavik',
      country: 'Iceland',
      image: "/explore/ex-reykjavik.jpg",
      alt: 'Colorful houses in Reykjavik with snow-capped mountains in background',
      rating: 3.6,
      reviewCount: 1234,
      accessibilityRating: 4.6,
      priceRange: '$$$$',
      duration: '5-8 days',
      description: 'Experience natural wonders with adapted geothermal spas, accessible Northern Lights tours, and inclusive glacier experiences. Nature\'s beauty for everyone.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'BoltIcon', label: 'Mobility Support' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    },
    {
      id: 'vancouver-canada',
      name: 'Vancouver',
      country: 'Canada',
      image: "/explore/ex-vancouver.jpg",
      alt: 'Vancouver skyline with mountains and harbor featuring modern glass buildings',
      rating: 4.7,
      reviewCount: 1654,
      accessibilityRating: 4.7,
      priceRange: '$$',
      duration: '4-6 days',
      description: 'Discover coastal beauty with accessible parks, adapted outdoor activities, and inclusive cultural venues. Mountain meets ocean with universal design.',
      accessibilityFeatures: [
        { icon: 'CheckCircleIcon', label: 'Wheelchair Access' },
        { icon: 'EyeIcon', label: 'Visual Aids' },
        { icon: 'volume-2', label: 'Audio Support' },
        { icon: 'HeartIcon', label: 'Service Animals' }
      ],
      featured: false
    }
  ];


export const experienceStaticData = {
    experiences: [
        {
            id: "1",
            title: "Accessible Grand Canyon Sunset Tour",
            location: "Grand Canyon, Arizona",
            duration: "6 hours",
            price: 189,
            image: "/experience/exp-grand-canyon.jpg",
            alt: "Panoramic view of Grand Canyon at sunset with orange and red rock formations under golden sky",
            rating: 4.9,
            reviewCount: 342,
            category: "Nature & Wildlife",
            accessibilityFeatures: [
                {
                    icon: "CheckCircleIcon",
                    label: "Wheelchair Accessible",
                    description:
                        "Fully accessible pathways and viewing platforms with smooth surfaces",
                },
                {
                    icon: "volume-2",
                    label: "Audio Descriptions",
                    description:
                        "Professional audio guide with detailed landscape descriptions",
                },
                {
                    icon: "Users",
                    label: "Mobility Support",
                    description: "Trained staff available to assist with mobility needs",
                },
                {
                    icon: "ClockIcon",
                    label: "Flexible Pacing",
                    description:
                        "Tour pace adjusted to group needs with frequent rest stops",
                },
            ],
            groupSize: "Max 12",
            difficulty: "Easy",
            description:
                "Experience the breathtaking beauty of the Grand Canyon at sunset with our fully accessible tour. Designed for travelers of all abilities, this tour features wheelchair-accessible viewing platforms, audio descriptions, and mobility support staff.",
            highlights: [
                "Sunset viewing from accessible platforms with unobstructed views",
                "Professional audio descriptions of landscape features",
                "Geological and cultural history narration",
                "Accessible restroom facilities at all stops",
                "Complimentary refreshments and snacks",
            ],
            included: [
                "Round-trip accessible transportation",
                "Professional guide with accessibility training",
                "Audio description devices",
                "Refreshments and bottled water",
                "National Park entrance fees",
                "Mobility assistance equipment if needed",
            ],
            notIncluded: [
                "Personal expenses",
                "Gratuities (optional)",
                "Hotel pickup outside designated areas",
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Grand Canyon Sunset Experience",
                    description:
                        "Full afternoon and evening exploring accessible viewpoints",
                    activities: [
                        "Pickup from accessible meeting point",
                        "Scenic drive with narration",
                        "First viewpoint stop with audio descriptions",
                        "Accessible trail walk (optional)",
                        "Sunset viewing from main platform",
                        "Return journey with stargazing opportunity",
                    ],
                },
            ],
            meetingPoint: "Grand Canyon Visitor Center - Accessible Parking Area",
            cancellationPolicy:
                "Free cancellation up to 48 hours before the experience starts. Full refund for weather-related cancellations.",
            languages: ["English", "Spanish", "ASL interpretation available"],
        },
        {
            id: "2",
            title: "Inclusive City Food & Culture Tour",
            location: "San Francisco, California",
            duration: "4 hours",
            price: 125,
            image: "/experience/exp-san-francisco.jpg",
            alt: "Colorful Victorian houses in San Francisco with city skyline in background under clear blue sky",
            rating: 4.8,
            reviewCount: 287,
            category: "Food & Culture",
            accessibilityFeatures: [
                {
                    icon: "CheckCircleIcon",
                    label: "Wheelchair Accessible",
                    description:
                        "Flat routes with curb cuts and accessible restaurant entries",
                },
                {
                    icon: "eye-off",
                    label: "Sensory Friendly",
                    description:
                        "Tactile and taste-focused experiences with detailed verbal descriptions",
                },
                {
                    icon: "Languages",
                    label: "Sign Language",
                    description: "ASL interpreter available upon request",
                },
                {
                    icon: "ClockIcon",
                    label: "Flexible Schedule",
                    description: "Adjustable timing with rest breaks as needed",
                },
            ],
            groupSize: "Max 8",
            difficulty: "Easy",
            description:
                "Discover San Francisco's diverse culinary scene on this inclusive walking tour designed for all abilities. Experience authentic flavors from multiple neighborhoods while learning about the city's rich cultural history.",
            highlights: [
                "Taste authentic dishes from 5 different cuisines",
                "Visit accessible historic neighborhoods",
                "Learn about cultural heritage and food traditions",
                "Sensory-focused tasting experiences",
                "Small group for personalized attention",
            ],
            included: [
                "Professional guide with accessibility training",
                "Food tastings at 5 locations",
                "Bottled water",
                "Accessibility equipment if needed",
                "Digital recipe cards",
            ],
            notIncluded: [
                "Additional food or drinks",
                "Transportation to meeting point",
                "Gratuities",
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Culinary Journey Through San Francisco",
                    description: "Explore diverse neighborhoods and authentic cuisines",
                    activities: [
                        "Meet at accessible Ferry Building location",
                        "Italian cuisine tasting in North Beach",
                        "Chinatown dim sum experience",
                        "Mission District Mexican street food",
                        "Japanese tea ceremony demonstration",
                        "Artisan chocolate tasting to conclude",
                    ],
                },
            ],
            meetingPoint: "Ferry Building Marketplace - Accessible Entrance",
            cancellationPolicy: "Free cancellation up to 24 hours before start time.",
            languages: ["English", "Spanish", "ASL available"],
        },
        {
            id: "3",
            title: "Adaptive Kayaking Adventure",
            location: "Lake Tahoe, Nevada",
            duration: "3 hours",
            price: 95,
            image: "/experience/exp-lake-tahoe.jpg",
            alt: "Crystal clear turquoise lake water with kayak in background and snow-capped mountains in background",
            rating: 4.9,
            reviewCount: 198,
            category: "Adventure",
            accessibilityFeatures: [
                {
                    icon: "CheckCircleIcon",
                    label: "Adaptive Equipment",
                    description:
                        "Specialized kayaks with stability modifications and transfer assistance",
                },
                {
                    icon: "users",
                    label: "Trained Guides",
                    description: "Certified adaptive recreation specialists",
                },
                {
                    icon: "ShieldCheckIcon",
                    label: "Safety First",
                    description: "Comprehensive safety briefing and flotation devices",
                },
                {
                    icon: "HeartIcon",
                    label: "All Abilities",
                    description:
                        "Suitable for various physical abilities with personalized support",
                },
            ],
            groupSize: "Max 6",
            difficulty: "Moderate",
            description:
                "Experience the pristine waters of Lake Tahoe with our adaptive kayaking program. Using specialized equipment and trained guides, this adventure is accessible to paddlers of all abilities.",
            highlights: [
                "Adaptive kayak equipment for various abilities",
                "Certified adaptive recreation guides",
                "Stunning Lake Tahoe scenery",
                "Wildlife viewing opportunities",
                "Personalized instruction and support",
            ],
            included: [
                "Adaptive kayak and equipment",
                "Safety gear and flotation devices",
                "Professional adaptive guide",
                "Transfer assistance if needed",
                "Waterproof storage for belongings",
                "Photos of your adventure",
            ],
            notIncluded: [
                "Swimwear and towels",
                "Sunscreen",
                "Transportation to launch site",
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Lake Tahoe Kayaking Experience",
                    description: "Accessible water adventure with stunning views",
                    activities: [
                        "Meet at accessible beach location",
                        "Equipment fitting and safety briefing",
                        "Transfer assistance to kayak",
                        "Guided paddle along scenic shoreline",
                        "Wildlife observation stop",
                        "Return and debrief",
                    ],
                },
            ],
            meetingPoint: "Sand Harbor Beach - Accessible Parking and Beach Access",
            cancellationPolicy:
                "Free cancellation up to 48 hours before. Weather-dependent with full refund if cancelled by operator.",
            languages: ["English"],
        },
        {
            id: "4",
            title: "Sensory Garden & Aromatherapy",
            location: "Portland, Oregon",
            duration: "2.5 hours",
            price: 75,
            image: "/experience/exp-sensory-garden.jpg",
            alt: "Lush botanical garden with colorful flowers, herbs, and winding accessible pathways under dappled sunlight",
            rating: 4.7,
            reviewCount: 156,
            category: "Wellness",
            accessibilityFeatures: [
                {
                    icon: "CheckCircleIcon",
                    label: "Wheelchair Accessible",
                    description:
                        "Smooth pathways throughout garden with accessible raised beds",
                },
                {
                    icon: "eye-off",
                    label: "Sensory Focus",
                    description:
                        "Touch, smell, and sound-based experiences with detailed descriptions",
                },
                {
                    icon: "SunIcon",
                    label: "Covered Areas",
                    description: "Shaded seating areas and weather protection",
                },
                {
                    icon: "HandRaisedIcon",
                    label: "Hands-On",
                    description: "Interactive plant touching and aromatherapy activities",
                },
            ],
            groupSize: "Max 10",
            difficulty: "Easy",
            description:
                "Immerse yourself in a multi-sensory garden experience designed for all abilities. This workshop combines accessible garden exploration with hands-on aromatherapy activities.",
            highlights: [
                "Explore accessible sensory garden paths",
                "Touch and smell diverse plant species",
                "Create custom aromatherapy blend",
                "Learn about therapeutic plant properties",
                "Relaxing garden meditation session",
            ],
            included: [
                "Garden admission",
                "Aromatherapy workshop materials",
                "Custom essential oil blend to take home",
                "Herbal tea tasting",
                "Printed sensory garden guide",
            ],
            notIncluded: ["Additional essential oils for purchase", "Transportation"],
            itinerary: [
                {
                    day: 1,
                    title: "Sensory Garden Experience",
                    description: "Therapeutic garden exploration and aromatherapy",
                    activities: [
                        "Welcome and garden orientation",
                        "Guided sensory garden walk",
                        "Herb touching and identification",
                        "Aromatherapy workshop session",
                        "Create personal essential oil blend",
                        "Garden meditation and tea tasting",
                    ],
                },
            ],
            meetingPoint: "Portland Botanical Gardens - Visitor Center",
            cancellationPolicy: "Free cancellation up to 24 hours before start time.",
            languages: ["English"],
        },
        {
            id: "5",
            title: "Accessible Wine Country Tour",
            location: "Napa Valley, California",
            duration: "8 hours",
            price: 245,
            image: "/experience/exp-napa-valley.jpg",
            alt: "Rolling vineyard hills with neat rows of grapevines under golden afternoon sun with mountains in distance",
            rating: 4.9,
            reviewCount: 421,
            category: "Food & Culture",
            accessibilityFeatures: [
                {
                    icon: "CheckCircleIcon",
                    label: "Wheelchair Accessible",
                    description: "Accessible transportation and winery facilities",
                },
                {
                    icon: "users",
                    label: "Personal Assistance",
                    description: "Staff available for mobility and sensory support",
                },
                {
                    icon: "eye-off",
                    label: "Sensory Tasting",
                    description:
                        "Detailed verbal descriptions of wines and food pairings",
                },
                {
                    icon: "Building",
                    label: "Accessible Venues",
                    description: "All wineries certified for accessibility",
                },
            ],
            groupSize: "Max 10",
            difficulty: "Easy",
            description:
                "Experience Napa Valley's world-class wines with our fully accessible tour. Visit three carefully selected wineries with accessible facilities, enjoy gourmet lunch, and learn about winemaking from expert guides.",
            highlights: [
                "Visit 3 accessible premium wineries",
                "Guided wine tastings with detailed descriptions",
                "Gourmet lunch with wine pairings",
                "Scenic vineyard views",
                "Expert sommelier guidance",
            ],
            included: [
                "Accessible luxury transportation",
                "Wine tastings at 3 wineries",
                "Gourmet lunch with wine pairings",
                "Professional guide and sommelier",
                "Bottled water throughout day",
                "Personal assistance if needed",
            ],
            notIncluded: [
                "Wine purchases",
                "Gratuities",
                "Hotel pickup outside Napa area",
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Napa Valley Wine Experience",
                    description: "Full-day accessible wine country exploration",
                    activities: [
                        "Pickup from accessible meeting point",
                        "First winery visit and tasting",
                        "Scenic drive through vineyards",
                        "Second winery with cellar tour",
                        "Gourmet lunch with wine pairings",
                        "Third winery and final tasting",
                        "Return journey",
                    ],
                },
            ],
            meetingPoint: "Napa Valley Welcome Center - Accessible Parking",
            cancellationPolicy: "Free cancellation up to 72 hours before start time.",
            languages: ["English", "Spanish"],
        },
        {
            id: "6",
            title: "Inclusive Museum & Art Tour",
            location: "New York City, New York",
            duration: "5 hours",
            price: 145,
            image: "/experience/exp-museum-art.jpg",
            alt: "Modern art museum interior with white walls, colorful abstract paintings, and wide accessible corridors",
            rating: 4.8,
            reviewCount: 312,
            category: "Culture & History",
            accessibilityFeatures: [
                {
                    icon: "CheckCircleIcon",
                    label: "Wheelchair Accessible",
                    description: "Elevator access and wide corridors throughout museums",
                },
                {
                    icon: "eye-off",
                    label: "Touch Tours",
                    description: "Tactile reproductions and detailed verbal descriptions",
                },
                {
                    icon: "volume-2",
                    label: "Audio Guides",
                    description: "Descriptive audio guides with artwork details",
                },
                {
                    icon: "LanguageIcon",
                    label: "Sign Language",
                    description: "ASL interpreter available upon request",
                },
            ],
            groupSize: "Max 8",
            difficulty: "Easy",
            description:
                "Explore world-class art museums with our inclusive tour designed for all abilities. Experience masterpieces through multiple senses with touch tours, audio descriptions, and expert guidance.",
            highlights: [
                "Visit 2 world-renowned museums",
                "Touch tour of tactile reproductions",
                "Audio descriptions of artworks",
                "Expert art historian guide",
                "Sensory-friendly viewing experiences",
            ],
            included: [
                "Museum admission tickets",
                "Professional art guide",
                "Audio description devices",
                "Touch tour materials",
                "Accessible transportation between museums",
                "Light refreshments",
            ],
            notIncluded: [
                "Lunch",
                "Museum shop purchases",
                "Transportation to first museum",
            ],
            itinerary: [
                {
                    day: 1,
                    title: "Art Museum Experience",
                    description: "Accessible exploration of world-class art collections",
                    activities: [
                        "Meet at first museum entrance",
                        "Touch tour of sculpture gallery",
                        "Guided viewing of impressionist collection",
                        "Break with refreshments",
                        "Transfer to second museum",
                        "Modern art exploration with audio descriptions",
                        "Closing discussion and Q&A",
                    ],
                },
            ],
            meetingPoint: "Metropolitan Museum of Art - Accessible Entrance",
            cancellationPolicy: "Free cancellation up to 24 hours before start time.",
            languages: ["English", "Spanish", "ASL available"],
        },
    ] as Experience[],
    categories: [
        { id: "all", label: "All Experiences", count: 6 },
        { id: "nature", label: "Nature & Wildlife", count: 1 },
        { id: "food", label: "Food & Culture", count: 2 },
        { id: "adventure", label: "Adventure", count: 1 },
        { id: "wellness", label: "Wellness", count: 1 },
        { id: "culture", label: "Culture & History", count: 1 },
    ] as FilterOption[],
    accessibilityFeatures: [
        { id: "wheelchair", label: "Wheelchair Accessible", count: 6 },
        { id: "audio", label: "Audio Descriptions", count: 3 },
        { id: "sensory", label: "Sensory Friendly", count: 4 },
        { id: "mobility", label: "Mobility Support", count: 5 },
        { id: "sign", label: "Sign Language", count: 3 },
        { id: "adaptive", label: "Adaptive Equipment", count: 2 },
    ] as FilterOption[],
    priceRanges: [
        { id: "all", label: "All Prices", count: 6 },
        { id: "budget", label: "Under $100", count: 2 },
        { id: "moderate", label: "$100 - $200", count: 3 },
        { id: "premium", label: "Over $200", count: 1 },
    ] as FilterOption[],
    durations: [
        { id: "all", label: "Any Duration", count: 6 },
        { id: "short", label: "Under 3 hours", count: 1 },
        { id: "half", label: "3-5 hours", count: 3 },
        { id: "full", label: "6+ hours", count: 2 },
    ] as FilterOption[],
    difficulties: [
        { id: "all", label: "All Levels", count: 6 },
        { id: "easy", label: "Easy", count: 5 },
        { id: "moderate", label: "Moderate", count: 1 },
    ] as FilterOption[],
    sortOptions: [
        { value: "popular", label: "Most Popular" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Highest Rated" },
        { value: "duration", label: "Duration" },
    ] as any[],
};
