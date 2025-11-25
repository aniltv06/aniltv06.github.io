/**
 * Projects Data
 * Comprehensive project information for portfolio showcase
 */

export const projects = [
  {
    id: 'genius',
    title: 'Genius & RepairCentral',
    subtitle: 'AI-Powered Repair Management System',
    shortDescription: 'Transformative AI-powered system serving 500+ Apple Retail stores worldwide with 40% faster diagnostics.',
    year: 2023,
    featured: true,
    stats: {
      users: '10,000+',
      stores: '500+',
      accuracy: '95%',
      impact: '40% faster diagnostics'
    },
    categories: {
      platform: ['iOS', 'macOS'],
      type: ['Enterprise', 'Internal Tools', 'AI/ML'],
      tech: ['Swift', 'SwiftUI', 'Core ML', 'Claude API', 'REST APIs'],
      role: ['Lead Developer', 'Architecture']
    },
    problem: `Apple Retail stores faced significant challenges with diagnostic efficiency and repair workflows. Technicians spent excessive time diagnosing issues, leading to longer customer wait times and reduced throughput. Manual processes resulted in inconsistent repair recommendations and inventory management inefficiencies.`,
    solution: `Developed a comprehensive AI-powered repair management system that integrates machine learning models for automated diagnostics, intelligent workflow automation using Claude AI, and real-time inventory management. The system provides technicians with instant repair recommendations and automated parts ordering.`,
    features: [
      'AI/ML models reducing diagnostic time by 40%',
      '95% accuracy in repair recommendations',
      'Real-time inventory management across 500+ stores',
      'Intelligent workflow automation with Claude AI',
      'Automated parts ordering and tracking',
      'Comprehensive repair history and analytics',
      'Integration with existing Apple retail systems'
    ],
    impact: [
      'Reduced customer wait time by 30%',
      'Improved repair success rate by 25%',
      'Saved $2M annually in operational costs',
      'Increased technician productivity by 35%',
      'Reduced parts inventory waste by 20%'
    ],
    techStack: {
      languages: ['Swift', 'Python'],
      frameworks: ['SwiftUI', 'Combine', 'Core ML'],
      apis: ['Claude API', 'REST APIs', 'GraphQL'],
      architecture: ['MVVM', 'Clean Architecture', 'Microservices'],
      tools: ['Xcode', 'Git', 'CI/CD', 'Analytics']
    },
    myRole: [
      'Led technical architecture and design decisions',
      'Implemented AI/ML integration with Core ML',
      'Designed and built SwiftUI-based user interface',
      'Integrated Claude API for intelligent automation',
      'Established CI/CD pipeline and deployment strategy',
      'Mentored team of 4 junior developers'
    ],
    timeline: {
      duration: '18 months',
      start: '2022-01',
      end: '2023-06'
    },
    links: {
      // Internal project - no public links
    },
    images: {
      thumbnail: null, // Could add later
      screenshots: []
    },
    tags: ['Swift', 'AI/ML', 'Enterprise', 'SwiftUI', 'Core ML', 'Claude AI', 'iOS', 'macOS']
  },

  {
    id: 'customer-success',
    title: 'Customer Success Platform',
    subtitle: 'Enterprise Customer Management System',
    shortDescription: 'Comprehensive platform managing 1000+ daily users with 99.9% uptime and real-time analytics.',
    year: 2022,
    featured: true,
    stats: {
      users: '1,000+ daily',
      uptime: '99.9%',
      integrations: '5+ systems',
      rating: '4.8/5'
    },
    categories: {
      platform: ['iOS', 'macOS'],
      type: ['Enterprise', 'Customer Management', 'Analytics'],
      tech: ['Swift', 'SwiftUI', 'Combine', 'REST APIs'],
      role: ['Senior Developer', 'Architecture']
    },
    problem: `Apple's customer success teams needed a unified platform to manage customer relationships, track support tickets, and analyze customer health metrics. Existing solutions were fragmented across multiple systems, leading to inefficiencies and poor visibility into customer status.`,
    solution: `Built a comprehensive customer success platform that consolidates customer data from 5+ backend systems into a single, intuitive interface. Implemented real-time analytics dashboard, automated workflow management, and intelligent reporting capabilities.`,
    features: [
      'Real-time customer analytics dashboard',
      'Automated workflow management',
      'Integration with 5+ backend systems',
      'Advanced reporting and insights',
      'Customer health scoring and predictions',
      'Automated ticket routing and escalation',
      'Comprehensive activity timeline'
    ],
    impact: [
      'Reduced support response time by 45%',
      'Increased customer satisfaction score by 18%',
      'Improved team productivity by 30%',
      'Reduced manual data entry by 60%'
    ],
    techStack: {
      languages: ['Swift'],
      frameworks: ['SwiftUI', 'Combine', 'Foundation'],
      apis: ['REST APIs', 'WebSocket', 'GraphQL'],
      architecture: ['MVVM', 'Repository Pattern', 'Clean Architecture'],
      tools: ['Xcode', 'Git', 'Postman', 'Charles Proxy']
    },
    myRole: [
      'Designed system architecture and data models',
      'Implemented real-time analytics dashboard',
      'Built integration layer for 5+ backend systems',
      'Created reusable SwiftUI component library',
      'Optimized performance for 1000+ concurrent users',
      'Led code reviews and established best practices'
    ],
    timeline: {
      duration: '12 months',
      start: '2021-06',
      end: '2022-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'Enterprise', 'SwiftUI', 'Analytics', 'iOS', 'macOS', 'Real-time']
  },

  {
    id: 'appletravel',
    title: 'Apple Travel',
    subtitle: 'Enterprise Travel Management',
    shortDescription: 'Comprehensive travel management app with 4.6 star rating and seamless booking experience.',
    year: 2021,
    featured: true,
    stats: {
      rating: '4.6/5',
      apis: '3 integrated',
      bookings: '50,000+',
      savings: '$1.5M annually'
    },
    categories: {
      platform: ['iOS', 'macOS'],
      type: ['Enterprise', 'Travel', 'E-commerce'],
      tech: ['Swift', 'UIKit', 'Core Data', 'REST APIs'],
      role: ['Lead iOS Developer']
    },
    problem: `Apple employees needed a streamlined way to book corporate travel, manage itineraries, and track expenses. Existing third-party solutions didn't integrate well with Apple's internal systems and lacked offline capabilities crucial for travelers.`,
    solution: `Developed a native iOS/macOS travel management app that integrates with 3 major travel APIs (flights, hotels, car rentals), provides offline access to itineraries, and seamlessly syncs with Apple's expense management system. Implemented intelligent search and booking workflows.`,
    features: [
      'Integration with 3 third-party travel APIs',
      'Real-time flight and hotel booking',
      'Expense tracking and automatic reporting',
      'Offline support for travel itineraries',
      'Push notifications for travel updates',
      'Corporate policy compliance checks',
      'Multi-currency support and conversion'
    ],
    impact: [
      'Reduced travel booking time by 50%',
      'Saved $1.5M annually in travel costs',
      'Increased policy compliance by 35%',
      'Reduced expense submission errors by 70%'
    ],
    techStack: {
      languages: ['Swift', 'Objective-C'],
      frameworks: ['UIKit', 'Core Data', 'MapKit', 'PassKit'],
      apis: ['Amadeus API', 'Booking.com API', 'Uber API'],
      architecture: ['MVVM', 'Coordinator Pattern'],
      tools: ['Xcode', 'Git', 'Fastlane', 'Firebase']
    },
    myRole: [
      'Led iOS development from conception to launch',
      'Architected offline-first data synchronization',
      'Integrated 3 third-party travel APIs',
      'Implemented booking and payment workflows',
      'Built expense tracking integration',
      'Optimized app performance for low-connectivity scenarios'
    ],
    timeline: {
      duration: '14 months',
      start: '2020-04',
      end: '2021-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'Travel', 'iOS', 'macOS', 'APIs', 'Offline-first', 'Enterprise']
  },

  {
    id: 'expenses',
    title: 'Expenses (iOS & macOS)',
    subtitle: 'Cross-Platform Expense Management',
    shortDescription: 'Universal app with OCR receipt scanning, CloudKit sync, and automated categorization.',
    year: 2020,
    featured: true,
    stats: {
      platforms: '2 (iOS + macOS)',
      timeSaved: '70% faster entry',
      users: '5,000+',
      receipts: '100,000+ scanned'
    },
    categories: {
      platform: ['iOS', 'macOS'],
      type: ['Finance', 'Productivity', 'Universal App'],
      tech: ['Swift', 'SwiftUI', 'CloudKit', 'Vision'],
      role: ['Solo Developer', 'Full Stack']
    },
    problem: `Manual expense entry is time-consuming and error-prone. Employees needed a faster way to capture receipts, categorize expenses, and generate reports for reimbursement. Cross-device sync was essential for users switching between iPhone, iPad, and Mac.`,
    solution: `Built a universal SwiftUI app for iOS and macOS with intelligent OCR receipt scanning using Vision framework, CloudKit-based synchronization, and ML-powered automated categorization. Implemented export functionality for multiple formats including PDF, Excel, and QuickBooks.`,
    features: [
      'OCR receipt scanning reducing entry time by 70%',
      'CloudKit sync across iOS and macOS devices',
      'Automated expense categorization using ML',
      'Export to multiple formats (PDF, Excel, QuickBooks)',
      'Smart receipt organization and search',
      'Tax-deductible expense tracking',
      'Multi-currency support with real-time conversion',
      'Custom categories and tags'
    ],
    impact: [
      'Reduced expense entry time by 70%',
      'Increased expense submission accuracy by 85%',
      'Saved employees 2+ hours per week',
      'Reduced paper receipt storage by 95%'
    ],
    techStack: {
      languages: ['Swift'],
      frameworks: ['SwiftUI', 'CloudKit', 'Vision', 'Core ML', 'PDFKit'],
      apis: ['Currency Exchange API', 'QuickBooks API'],
      architecture: ['MVVM', 'Clean Architecture', 'Repository Pattern'],
      tools: ['Xcode', 'Git', 'TestFlight', 'Analytics']
    },
    myRole: [
      'Solo developer - designed and built entire app',
      'Implemented OCR using Vision framework',
      'Built ML model for automated categorization',
      'Designed universal SwiftUI interface for iOS/macOS',
      'Implemented CloudKit synchronization',
      'Created PDF and Excel export functionality',
      'Launched on internal App Store'
    ],
    timeline: {
      duration: '8 months',
      start: '2019-10',
      end: '2020-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'SwiftUI', 'iOS', 'macOS', 'OCR', 'CloudKit', 'Vision', 'ML', 'Universal App']
  }
];

/**
 * Get all unique categories across all projects
 */
export function getAllCategories() {
  const categories = {
    platform: new Set(),
    type: new Set(),
    tech: new Set(),
    role: new Set()
  };

  projects.forEach(project => {
    project.categories.platform.forEach(p => categories.platform.add(p));
    project.categories.type.forEach(t => categories.type.add(t));
    project.categories.tech.forEach(t => categories.tech.add(t));
    project.categories.role.forEach(r => categories.role.add(r));
  });

  return {
    platform: Array.from(categories.platform).sort(),
    type: Array.from(categories.type).sort(),
    tech: Array.from(categories.tech).sort(),
    role: Array.from(categories.role).sort()
  };
}

/**
 * Get all unique tags across all projects
 */
export function getAllTags() {
  const tags = new Set();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get featured projects
 */
export function getFeaturedProjects() {
  return projects.filter(project => project.featured);
}

/**
 * Get project by ID
 */
export function getProjectById(id) {
  return projects.find(project => project.id === id);
}

/**
 * Filter projects by criteria
 */
export function filterProjects(criteria) {
  return projects.filter(project => {
    // Filter by platform
    if (criteria.platform && !project.categories.platform.includes(criteria.platform)) {
      return false;
    }

    // Filter by type
    if (criteria.type && !project.categories.type.includes(criteria.type)) {
      return false;
    }

    // Filter by tech
    if (criteria.tech && !project.categories.tech.includes(criteria.tech)) {
      return false;
    }

    // Filter by year
    if (criteria.year && project.year !== criteria.year) {
      return false;
    }

    // Filter by search query
    if (criteria.search) {
      const searchLower = criteria.search.toLowerCase();
      const searchableText = [
        project.title,
        project.subtitle,
        project.shortDescription,
        ...project.tags
      ].join(' ').toLowerCase();

      if (!searchableText.includes(searchLower)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort projects by criteria
 */
export function sortProjects(projectsArray, sortBy = 'year-desc') {
  const sorted = [...projectsArray];

  switch (sortBy) {
  case 'year-desc':
    return sorted.sort((a, b) => b.year - a.year);
  case 'year-asc':
    return sorted.sort((a, b) => a.year - b.year);
  case 'title-asc':
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  case 'title-desc':
    return sorted.sort((a, b) => b.title.localeCompare(a.title));
  default:
    return sorted;
  }
}

/**
 * Get project statistics
 */
export function getProjectStats() {
  return {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    platforms: getAllCategories().platform.length,
    technologies: getAllTags().length,
    years: [...new Set(projects.map(p => p.year))].sort()
  };
}
