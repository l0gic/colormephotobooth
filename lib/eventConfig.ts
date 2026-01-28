// Event Configuration for ColorMe Booth Multi-Event Landing Pages

export interface Slide {
  src: string;
  alt: string;
}

export interface EventColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  gradient: string;
  gradientHero: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
}

export interface EventHero {
  badgeText: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaText: string;
  socialProof: string;
  slides: Slide[];
}

export interface EventProblem {
  question: string;
  answer: string;
  highlightText: string;
  gradient: string;
}

export interface EventBenefit {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface PricingPackage {
  id: number;
  popular?: boolean;
  badge: string;
  badgeBg: string;
  badgePosition?: string;
  title: string;
  description: string;
  descriptionColor?: string;
  borderColor: string;
  features: Array<{
    icon: string;
    text: string;
    bold?: boolean;
  }>;
  buttonText: string;
  buttonClass: string;
  colorfulBorder: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  border: string;
  quote: string;
  featured?: boolean;
}

export interface EventConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colors: EventColors;
  hero: EventHero;
  problem: EventProblem;
  benefits: {
    title: string;
    subtitle: string;
    cards: EventBenefit[];
    checklist: string[];
  };
  pricing: {
    title: string;
    subtitle: string;
    packages: PricingPackage[];
  };
  testimonials: {
    featured: Testimonial;
    grid: Testimonial[];
  };
  metadata: {
    title: string;
    description: string;
  };
}

// Shared slide configurations
const kiddieSlides: Slide[] = [
  { src: '/imgs/dynamic_reveal/Adventure Awaits.png', alt: 'Adventure Awaits Theme' },
  { src: '/imgs/dynamic_reveal/Little Chef Theme.png', alt: 'Little Chef Theme' },
  { src: '/imgs/dynamic_reveal/openart-image_8_bIDdGU_1766747430643_raw.png', alt: 'Coloring Page Sample 1' },
  { src: '/imgs/dynamic_reveal/openart-image_GQ5x0o2X_1766744577548_raw.png', alt: 'Coloring Page Sample 2' },
  { src: '/imgs/dynamic_reveal/openart-image_MdSVvoeJ_752x1328_1766744882906.webp', alt: 'Coloring Page Sample 3' },
  { src: '/imgs/dynamic_reveal/Royal Treatment.png', alt: 'Royal Treatment Theme' },
];

const weddingSlides: Slide[] = [
  { src: '/imgs/dynamic_reveal/Adventure Awaits.png', alt: 'Elegant Wedding Theme' },
  { src: '/imgs/dynamic_reveal/Royal Treatment.png', alt: 'Royal Wedding Theme' },
  { src: '/imgs/dynamic_reveal/Little Chef Theme.png', alt: 'Romantic Couple Theme' },
  { src: '/imgs/dynamic_reveal/openart-image_8_bIDdGU_1766747430643_raw.png', alt: 'Bridal Portrait' },
  { src: '/imgs/dynamic_reveal/openart-image_GQ5x0o2X_1766744577548_raw.png', alt: 'Wedding Party' },
  { src: '/imgs/dynamic_reveal/openart-image_MdSVvoeJ_752x1328_1766744882906.webp', alt: 'Cake Theme' },
];

const debutSlides: Slide[] = [
  { src: '/imgs/dynamic_reveal/Royal Treatment.png', alt: 'Princess Debut Theme' },
  { src: '/imgs/dynamic_reveal/Adventure Awaits.png', alt: 'Dreamy Debut Theme' },
  { src: '/imgs/dynamic_reveal/Little Chef Theme.png', alt: 'Rose Garden Theme' },
  { src: '/imgs/dynamic_reveal/openart-image_8_bIDdGU_1766747430643_raw.png', alt: 'Debut Portrait' },
  { src: '/imgs/dynamic_reveal/openart-image_GQ5x0o2X_1766744577548_raw.png', alt: '18 Roses Theme' },
  { src: '/imgs/dynamic_reveal/openart-image_MdSVvoeJ_752x1328_1766744882906.webp', alt: 'Grand Entrance Theme' },
];

const corporateSlides: Slide[] = [
  { src: '/imgs/dynamic_reveal/Adventure Awaits.png', alt: 'Corporate Team Theme' },
  { src: '/imgs/dynamic_reveal/Royal Treatment.png', alt: 'Premium Brand Theme' },
  { src: '/imgs/dynamic_reveal/Little Chef Theme.png', alt: 'Team Building Theme' },
  { src: '/imgs/dynamic_reveal/openart-image_8_bIDdGU_1766747430643_raw.png', alt: 'Office Event' },
  { src: '/imgs/dynamic_reveal/openart-image_GQ5x0o2X_1766744577548_raw.png', alt: 'Product Launch' },
  { src: '/imgs/dynamic_reveal/openart-image_MdSVvoeJ_752x1328_1766744882906.webp', alt: 'Brand Activation' },
];

// Event Configurations
export const events: Record<string, EventConfig> = {
  'kiddie-party': {
    id: 'kiddie-party',
    name: 'Kiddie Parties',
    tagline: 'Manila\'s First Roamer Coloring Booth',
    description: 'Transform birthday moments into custom coloring pages',
    colors: {
      primary: '#6366f1',
      secondary: '#a855f7',
      accent: '#ec4899',
      background: '#F8F9FF',
      gradient: 'from-indigo-600 via-purple-500 to-pink-500',
      gradientHero: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 25%, #ddd6fe 50%, #dbeafe 75%, #d1fae5 100%)',
      badgeBg: 'bg-indigo-600/90',
      badgeText: 'text-white',
      iconBg: 'from-indigo-100 to-indigo-200',
      iconColor: 'text-indigo-700',
    },
    hero: {
      badgeText: 'Manila\'s First Roamer Coloring Booth',
      title: 'Turn Every Guest Into a ',
      titleHighlight: 'Masterpiece!',
      description: 'We transform your child\'s favorite party moments into custom-made coloring pages-on the spot. A premium, low-stimulation activity that doubles as the ultimate personalized party favor.',
      ctaText: 'Check Availability',
      socialProof: '"Only 4 slots left for Q3 2026"',
      slides: kiddieSlides,
    },
    problem: {
      question: 'Are you tired of plastic loot bags that end up in the trash?',
      answer: 'Premium parties deserve premium engagement. Most photo booths are just a "flash and a print." We provide a',
      highlightText: '15-minute creative experience',
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    },
    benefits: {
      title: 'Why Metro Manila\'s Elite Hosts Choose Us',
      subtitle: 'Most booths are forgotten by the time the car arrives. Our "Color Me" pages end up on refrigerators, in frames, and in memory boxes for years.',
      cards: [
        { icon: 'Heart', iconBg: 'bg-pink-100', iconColor: 'text-pink-600', title: 'Main Character Energy', description: 'Every child becomes the hero of their own coloring book.' },
        { icon: 'Gift', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', title: 'Two-in-One', description: 'Entertainment during the party + the loot bag giveaway.' },
        { icon: 'Coffee', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', title: 'Low-Stimulation', description: 'Gives parents a 15-minute break while kids focus quietly.' },
        { icon: 'Instagram', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', title: 'Reel Ready', description: 'Process videos of kids coloring are perfect for social media.' },
      ],
      checklist: [
        'Reduces host planning stress',
        'Works for toddlers, titas, and yayas',
        'Premium Roamer tech (No bulky lines)',
      ],
    },
    pricing: {
      title: 'Choose Your Investment',
      subtitle: 'Perfectly scaled for premium birthday celebrations.',
      packages: [
        {
          id: 1,
          badge: 'Starter Package',
          badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          title: 'The Sketch Pass',
          description: 'Ideal for interactive party activities.',
          borderColor: 'border-gray-200 hover:border-indigo-400',
          features: [
            { icon: 'Clock', text: '3 Hours of Service' },
            { icon: 'User', text: '2 Pro Roamer Operators' },
            { icon: 'Printer', text: 'Unlimited Line-Art Prints' },
            { icon: 'Palette', text: 'Communal Coloring Station (Crayons Provided)' },
            { icon: 'Clock', text: '₱2,000/hour extension (optional)' },
          ],
          buttonText: 'Inquire for Price',
          buttonClass: 'border-2 border-indigo-600 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
          colorfulBorder: false,
        },
        {
          id: 2,
          popular: true,
          badge: 'Most Popular',
          badgeBg: 'bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white',
          badgePosition: 'top',
          title: 'The Masterpiece Bundle',
          description: 'The ultimate all-in-one gift & entertainment.',
          descriptionColor: 'text-indigo-600',
          borderColor: '',
          features: [
            { icon: 'Clock', text: '3 Hours of Service' },
            { icon: 'Users', text: '2 Pro Roamer Operators' },
            { icon: 'Gift', text: 'Premium 8-Color Crayon Sets for every guest', bold: true },
            { icon: 'Layout', text: 'Custom Branded Borders & Event Logo' },
            { icon: 'Cloud', text: 'Digital Gallery + TikTok/Reel Edit of Highlights' },
            { icon: 'Clock', text: '₱2,000/hour extension (optional)' },
          ],
          buttonText: 'Book the Experience',
          buttonClass: 'bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-200',
          colorfulBorder: true,
        },
      ],
    },
    testimonials: {
      featured: {
        name: 'Joyce C.',
        role: 'Premium Event Client, BGC Mom',
        initials: 'JC',
        gradient: 'from-pink-400 to-purple-500',
        border: 'border-indigo-50',
        quote: '"Finally, a booth that isn\'t just a flash and a print. My daughter spent an hour coloring her portrait, and we\'ve already framed it in her room! Best party favor ever."',
        featured: true,
      },
      grid: [
        {
          name: 'Marga R.',
          role: '7th Birthday Mom, Makati',
          initials: 'MR',
          gradient: 'from-indigo-400 to-blue-500',
          border: 'border-indigo-50',
          quote: '"The kids were occupied for 35 minutes straight. The parents couldn\'t believe it! Even the lolo and lola joined in. This was the highlight of Sophia\'s 7th birthday in Makati."',
        },
        {
          name: 'Donna L.',
          role: 'Special Needs Parent, QC',
          initials: 'DL',
          gradient: 'from-green-400 to-emerald-500',
          border: 'border-pink-50',
          quote: '"My son has sensory processing disorder, and loud parties overwhelm him. The coloring booth gave him a calm, happy space. He was smiling the whole time. Thank you for being so patient!"',
        },
        {
          name: 'Aisha T.',
          role: 'Twin Baptism, Alabang',
          initials: 'AT',
          gradient: 'from-orange-400 to-red-500',
          border: 'border-purple-50',
          quote: '"I was planning to give separate loot bags worth P150 each. The crayon sets and coloring pages replaced ALL of that. Sulit na sulit! Guests kept saying it was the most unique favor they\'ve received."',
        },
      ],
    },
    metadata: {
      title: 'Color Me Booth | Premium Photo Booth for Kids Parties in Manila',
      description: 'Manila\'s first roamer coloring booth for kids birthday parties. Transform party moments into custom coloring pages. The ultimate party favor experience.',
    },
  },

  weddings: {
    id: 'weddings',
    name: 'Weddings',
    tagline: 'Elegant Entertainment for Your Special Day',
    description: 'Sophisticated guest engagement with memorable keepsakes',
    colors: {
      primary: '#D4AF37',
      secondary: '#FFF8E7',
      accent: '#B8860B',
      background: '#FFFDFA',
      gradient: 'from-amber-600 via-yellow-500 to-amber-400',
      gradientHero: 'linear-gradient(135deg, #FFF8E7 0%, #FEF3C7 25%, #FDE68A 50%, #FCD34D 75%, #FBBF24 100%)',
      badgeBg: 'bg-amber-700/90',
      badgeText: 'text-white',
      iconBg: 'from-amber-100 to-amber-200',
      iconColor: 'text-amber-800',
    },
    hero: {
      badgeText: 'Elegant Wedding Entertainment',
      title: 'Create Timeless Memories on Your ',
      titleHighlight: 'Special Day',
      description: 'Elevate your wedding reception with sophisticated guest entertainment. We transform candid moments into elegant line-art keepsakes that your guests will treasure forever.',
      ctaText: 'Request Wedding Quote',
      socialProof: '"Booked for 12 weddings this season"',
      slides: weddingSlides,
    },
    problem: {
      question: 'Looking for wedding entertainment that guests will actually remember?',
      answer: 'Most photo booths are forgotten before the cake is cut. We offer an',
      highlightText: 'elegant interactive experience',
      gradient: 'from-amber-600 via-yellow-500 to-amber-400',
    },
    benefits: {
      title: 'Why discerning couples choose Color Me Booth',
      subtitle: 'Give your guests an activity that\'s both sophisticated and engaging. Create lasting memories beyond the dance floor.',
      cards: [
        { icon: 'Heart', iconBg: 'bg-amber-100', iconColor: 'text-amber-700', title: 'Elegant Keepsakes', description: 'Guests take home beautiful line-art portraits from your special day.' },
        { icon: 'Gift', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-700', title: 'Unique Guest Favors', description: 'Replace traditional favors with personalized wedding memories.' },
        { icon: 'Coffee', iconBg: 'bg-orange-100', iconColor: 'text-orange-700', title: 'Ice Breaker', description: 'Gets guests interacting and creating together during reception.' },
        { icon: 'Instagram', iconBg: 'bg-rose-100', iconColor: 'text-rose-700', title: 'Shareable Moments', description: 'Perfect for social media - guests love sharing their colored portraits.' },
      ],
      checklist: [
        'Elegant complement to any wedding theme',
        'Works for all ages - from kids to grandparents',
        'Professional, discreet service',
      ],
    },
    pricing: {
      title: 'Wedding Packages',
      subtitle: 'Designed for your perfect day.',
      packages: [
        {
          id: 1,
          badge: 'Ceremony Package',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          title: 'Reception Essentials',
          description: 'Perfect for intimate wedding receptions.',
          borderColor: 'border-gray-200 hover:border-amber-400',
          features: [
            { icon: 'Clock', text: '4 Hours of Service' },
            { icon: 'User', text: '2 Pro Roamer Operators' },
            { icon: 'Printer', text: 'Unlimited Elegant Line-Art Prints' },
            { icon: 'Palette', text: 'Premium Coloring Station Setup' },
            { icon: 'Clock', text: '₱2,500/hour extension' },
          ],
          buttonText: 'Inquire for Price',
          buttonClass: 'border-2 border-amber-700 text-amber-700 group-hover:bg-amber-700 group-hover:text-white',
          colorfulBorder: false,
        },
        {
          id: 2,
          popular: true,
          badge: 'Most Popular',
          badgeBg: 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 text-white',
          badgePosition: 'top',
          title: 'Grand Wedding Bundle',
          description: 'The complete wedding entertainment experience.',
          descriptionColor: 'text-amber-700',
          borderColor: '',
          features: [
            { icon: 'Clock', text: '5 Hours of Service' },
            { icon: 'Users', text: '3 Pro Roamer Operators' },
            { icon: 'Gift', text: 'Premium Gold-Crayon Sets for every guest', bold: true },
            { icon: 'Layout', text: 'Custom Wedding Monogram & Date on Prints' },
            { icon: 'Cloud', text: 'Digital Gallery + Wedding Reel Edit' },
            { icon: 'Heart', text: 'Bride & Groom专属 Portrait Session' },
          ],
          buttonText: 'Book Your Date',
          buttonClass: 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 text-white shadow-lg shadow-amber-200',
          colorfulBorder: true,
        },
      ],
    },
    testimonials: {
      featured: {
        name: 'Danielle & Mark',
        role: 'Wedding, BGC',
        initials: 'DM',
        gradient: 'from-amber-400 to-yellow-500',
        border: 'border-amber-50',
        quote: '"Our guests are STILL talking about the coloring booth! Even our lolo and lola who never participate in anything joined in. Best wedding entertainment decision we made!"',
        featured: true,
      },
      grid: [
        {
          name: 'Isabella R.',
          role: 'Bride, Tagaytay',
          initials: 'IR',
          gradient: 'from-rose-400 to-pink-500',
          border: 'border-rose-50',
          quote: '"Elegant, unique, and absolutely charming. My maid-of-honor said it was the best wedding activity she\'s ever experienced. The coloring pages are now framed in our home."',
        },
        {
          name: 'James & Sarah',
          role: 'Wedding, Makati',
          initials: 'JS',
          gradient: 'from-amber-400 to-orange-500',
          border: 'border-amber-50',
          quote: '"We wanted something different from the typical photo booth. This was perfect - sophisticated, interactive, and created genuine memories. Worth every peso!"',
        },
        {
          name: 'Catherine L.',
          role: 'Wedding Coordinator',
          initials: 'CL',
          gradient: 'from-yellow-400 to-amber-500',
          border: 'border-yellow-50',
          quote: '"As a coordinator, I\'ve seen it all. Color Me Booth is now my top recommendation for couples who want elegant, memorable guest entertainment."',
        },
      ],
    },
    metadata: {
      title: 'Color Me Booth | Elegant Wedding Entertainment Manila',
      description: 'Unique wedding entertainment and guest favors. Transform wedding moments into elegant keepsake coloring pages. Perfect for Philippine weddings.',
    },
  },

  debuts: {
    id: 'debuts',
    name: 'Debuts',
    tagline: 'Make Your Debut Unforgettable',
    description: 'Creative guest engagement for your milestone celebration',
    colors: {
      primary: '#B76E79',
      secondary: '#F5DEB3',
      accent: '#C17F88',
      background: '#FFF5F7',
      gradient: 'from-rose-400 via-pink-400 to-rose-300',
      gradientHero: 'linear-gradient(135deg, #FFF5F7 0%, #FCE7F3 25%, #FBCFE8 50%, #F9A8D4 75%, #F472B6 100%)',
      badgeBg: 'bg-rose-600/90',
      badgeText: 'text-white',
      iconBg: 'from-rose-100 to-rose-200',
      iconColor: 'text-rose-700',
    },
    hero: {
      badgeText: 'The Perfect Debut Activity',
      title: 'Make Your Grand Entrance Truly ',
      titleHighlight: 'Unforgettable',
      description: 'Celebrate your 18th birthday with a unique experience that brings all your friends and family together. Create beautiful memories that last far beyond the roses.',
      ctaText: 'Plan Your Debut',
      socialProof: '"Only 6 debut slots available for 2026"',
      slides: debutSlides,
    },
    problem: {
      question: 'Want a debut that stands out from all the rest?',
      answer: 'Skip the generic photo booth. Give your guests an',
      highlightText: 'interactive creative experience',
      gradient: 'from-rose-400 via-pink-400 to-rose-300',
    },
    benefits: {
      title: 'Why debutantes love Color Me Booth',
      subtitle: 'Your debut deserves more than cookie-cutter entertainment. Create moments that reflect your unique style and personality.',
      cards: [
        { icon: 'Heart', iconBg: 'bg-rose-100', iconColor: 'text-rose-700', title: '18 Roses Theme', description: 'Perfect complement to your 18 roses tradition.' },
        { icon: 'Gift', iconBg: 'bg-pink-100', iconColor: 'text-pink-700', title: 'Treasured Keepsakes', description: 'Guests take home personalized debut souvenirs.' },
        { icon: 'Coffee', iconBg: 'bg-fuchsia-100', iconColor: 'text-fuchsia-700', title: 'Bonding Moment', description: 'Brings friends and family together creatively.' },
        { icon: 'Instagram', iconBg: 'bg-purple-100', iconColor: 'text-purple-700', title: 'Instagram Perfect', description: 'Your debut hashtag will be filled with colored portraits.' },
      ],
      checklist: [
        'Perfect for 18 treasures and roses',
        'Elegant addition to any debut theme',
        'Creates lasting bonds between guests',
      ],
    },
    pricing: {
      title: 'Debut Packages',
      subtitle: 'Celebrate your milestone in style.',
      packages: [
        {
          id: 1,
          badge: 'Starter Package',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
          title: 'Rose Garden Package',
          description: 'Perfect for intimate debut celebrations.',
          borderColor: 'border-gray-200 hover:border-rose-400',
          features: [
            { icon: 'Clock', text: '4 Hours of Service' },
            { icon: 'User', text: '2 Pro Roamer Operators' },
            { icon: 'Printer', text: 'Unlimited Line-Art Prints' },
            { icon: 'Palette', text: 'Communal Coloring Station' },
            { icon: 'Clock', text: '₱2,500/hour extension' },
          ],
          buttonText: 'Inquire for Price',
          buttonClass: 'border-2 border-rose-600 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
          colorfulBorder: false,
        },
        {
          id: 2,
          popular: true,
          badge: 'Debutante\'s Choice',
          badgeBg: 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 text-white',
          badgePosition: 'top',
          title: 'Grand Debut Bundle',
          description: 'The ultimate debut experience package.',
          descriptionColor: 'text-rose-700',
          borderColor: '',
          features: [
            { icon: 'Clock', text: '5 Hours of Service' },
            { icon: 'Users', text: '3 Pro Roamer Operators' },
            { icon: 'Gift', text: 'Rose Gold Crayon Sets for every guest', bold: true },
            { icon: 'Layout', text: 'Custom Debut Theme & Name on Prints' },
            { icon: 'Cloud', text: 'Digital Gallery + Debut Highlight Reel' },
            { icon: 'Heart', text: 'Special Portrait for 18 Roses/18 Treasures' },
          ],
          buttonText: 'Book Your Debut',
          buttonClass: 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 text-white shadow-lg shadow-rose-200',
          colorfulBorder: true,
        },
      ],
    },
    testimonials: {
      featured: {
        name: 'Sofia M.',
        role: 'Debutante, Alabang',
        initials: 'SM',
        gradient: 'from-rose-400 to-pink-500',
        border: 'border-rose-50',
        quote: '"My debut was perfect because of Color Me Booth! All my friends and relatives colored their portraits. It\'s now my most cherished memory from my 18th birthday."',
        featured: true,
      },
      grid: [
        {
          name: 'Alexandra R.',
          role: 'Debutante, QC',
          initials: 'AR',
          gradient: 'from-fuchsia-400 to-pink-500',
          border: 'border-fuchsia-50',
          quote: '"Even my titos who never join anything were coloring! My grandma has her portrait framed in her sala. Best debut decision ever!"',
        },
        {
          name: 'Gabbie L.',
          role: 'Debutante, Makati',
          initials: 'GL',
          gradient: 'from-rose-400 to-rose-500',
          border: 'border-rose-50',
          quote: '"I wanted something unique for my debut. This exceeded all expectations. The rose gold crayon sets were such a elegant touch!"',
        },
        {
          name: 'Marga T.',
          role: 'Debut Mom',
          initials: 'MT',
          gradient: 'from-pink-400 to-rose-500',
          border: 'border-pink-50',
          quote: '"As a mom planning her daughter\'s debut, this was the best investment. All the guests are still talking about it months later!"',
        },
      ],
    },
    metadata: {
      title: 'Color Me Booth | Unique Debut Entertainment Manila',
      description: 'Make your debut unforgettable with creative guest entertainment. Transform debut moments into beautiful keepsake coloring pages. Perfect for 18th birthdays.',
    },
  },

  'corporate-event': {
    id: 'corporate-event',
    name: 'Corporate Events',
    tagline: 'Innovative Team Engagement & Brand Activation',
    description: 'Professional keepsakes with premium branding options',
    colors: {
      primary: '#1E40AF',
      secondary: '#3B82F6',
      accent: '#60A5FA',
      background: '#F0F4FF',
      gradient: 'from-blue-700 via-blue-600 to-blue-500',
      gradientHero: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 25%, #BFDBFE 50%, #93C5FD 75%, #60A5FA 100%)',
      badgeBg: 'bg-blue-800/90',
      badgeText: 'text-white',
      iconBg: 'from-blue-100 to-blue-200',
      iconColor: 'text-blue-800',
    },
    hero: {
      badgeText: 'Corporate Event Innovation',
      title: 'Elevate Your Corporate Events with ',
      titleHighlight: 'Creative Engagement',
      description: 'Transform company gatherings into memorable experiences. Professional team building, brand activation, and premium keepsakes that showcase your corporate identity.',
      ctaText: 'Request Corporate Quote',
      socialProof: '"Trusted by 50+ companies in PH"',
      slides: corporateSlides,
    },
    problem: {
      question: 'Need memorable corporate event activities that build teams and boost brand visibility?',
      answer: 'Most corporate activities are forgettable. We provide',
      highlightText: 'engaging brand experiences',
      gradient: 'from-blue-700 via-blue-600 to-blue-500',
    },
    benefits: {
      title: 'Why leading companies choose Color Me Booth',
      subtitle: 'From team building to product launches, create professional experiences that employees and clients actually enjoy.',
      cards: [
        { icon: 'Heart', iconBg: 'bg-blue-100', iconColor: 'text-blue-700', title: 'Team Building', description: 'Foster collaboration and creativity in a fun, professional way.' },
        { icon: 'Gift', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-700', title: 'Brand Activation', description: 'Your logo on every print - maximum brand visibility.' },
        { icon: 'Coffee', iconBg: 'bg-sky-100', iconColor: 'text-sky-700', title: 'Professional Keepsakes', description: 'High-quality souvenirs employees actually keep.' },
        { icon: 'Instagram', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-700', title: 'Social Content', description: 'Perfect for company social media and internal communications.' },
      ],
      checklist: [
        'Full customization with company branding',
        'Scalable for events of any size',
        'Professional, reliable service',
      ],
    },
    pricing: {
      title: 'Corporate Packages',
      subtitle: 'Tailored solutions for your business needs.',
      packages: [
        {
          id: 1,
          badge: 'Team Package',
          badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
          title: 'Team Building Essentials',
          description: 'Perfect for company team building events.',
          borderColor: 'border-gray-200 hover:border-blue-400',
          features: [
            { icon: 'Clock', text: '4 Hours of Service' },
            { icon: 'User', text: '2 Pro Roamer Operators' },
            { icon: 'Printer', text: 'Unlimited Branded Prints' },
            { icon: 'Palette', text: 'Professional Coloring Station Setup' },
            { icon: 'Clock', text: '₱3,000/hour extension' },
          ],
          buttonText: 'Get Corporate Quote',
          buttonClass: 'border-2 border-blue-700 text-blue-700 group-hover:bg-blue-700 group-hover:text-white',
          colorfulBorder: false,
        },
        {
          id: 2,
          popular: true,
          badge: 'Most Popular',
          badgeBg: 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white',
          badgePosition: 'top',
          title: 'Premium Brand Bundle',
          description: 'Complete brand activation experience.',
          descriptionColor: 'text-blue-700',
          borderColor: '',
          features: [
            { icon: 'Clock', text: '6 Hours of Service' },
            { icon: 'Users', text: '3 Pro Roamer Operators' },
            { icon: 'Gift', text: 'Premium Corporate Crayon Sets', bold: true },
            { icon: 'Layout', text: 'Full Brand Customization (Logo, Colors)' },
            { icon: 'Cloud', text: 'Digital Gallery + Corporate Event Edit' },
            { icon: 'Building', text: 'Priority Scheduling & Dedicated Coordinator' },
          ],
          buttonText: 'Book Corporate Event',
          buttonClass: 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200',
          colorfulBorder: true,
        },
      ],
    },
    testimonials: {
      featured: {
        name: 'Roberto S.',
        role: 'HR Director, BPO Company',
        initials: 'RS',
        gradient: 'from-blue-400 to-indigo-500',
        border: 'border-blue-50',
        quote: '"Best team building activity we\'ve ever done! Employees from different departments bonded while coloring. The branded crayon sets are still on everyone\'s desks."',
        featured: true,
      },
      grid: [
        {
          name: 'Maria L.',
          role: 'Marketing Manager, Tech Startup',
          initials: 'ML',
          gradient: 'from-sky-400 to-blue-500',
          border: 'border-sky-50',
          quote: '"For our product launch, this was perfect! Our logo was on every print, and attendees loved the interactive element. Brand visibility was amazing."',
        },
        {
          name: 'Antonio R.',
          role: 'Events Coordinator, Multinational',
          initials: 'AR',
          gradient: 'from-indigo-400 to-blue-500',
          border: 'border-indigo-50',
          quote: '"Professional, reliable, and genuinely engaging. Our CEO even participated! Highly recommend for any corporate event looking for something different."',
        },
        {
          name: 'Elena D.',
          role: 'HR Manager, Retail Chain',
          initials: 'ED',
          gradient: 'from-blue-400 to-cyan-500',
          border: 'border-blue-50',
          quote: '"We\'ve used Color Me Booth for 3 company events now. Consistent quality, professional service, and employees always look forward to it."',
        },
      ],
    },
    metadata: {
      title: 'Color Me Booth | Corporate Event Entertainment & Brand Activation Manila',
      description: 'Professional corporate event entertainment with full branding options. Team building, brand activation, and premium corporate giveaways in the Philippines.',
    },
  },
};

// Helper function to get event config
export function getEventConfig(eventId: string): EventConfig | undefined {
  return events[eventId];
}

// Helper function to get all events
export function getAllEvents(): EventConfig[] {
  return Object.values(events);
}

// Helper function to get event colors
export function getEventColors(eventId: string): EventColors | undefined {
  return events[eventId]?.colors;
}

// Type for event IDs
export type EventId = keyof typeof events;
