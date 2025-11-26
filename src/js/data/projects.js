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
    overview: `Developed a comprehensive AI-powered repair management system transforming Apple Retail operations across 500+ stores worldwide. The system integrates machine learning models for automated diagnostics, intelligent workflow automation using Claude AI, and real-time inventory management. Provides technicians with instant repair recommendations, automated parts ordering, and system-level integration using macOS APIs and Internal SDK.`,
    features: [
      'AI/ML models reducing diagnostic time by 40%',
      '95% accuracy in repair recommendations',
      'Real-time inventory management across 500+ stores',
      'Intelligent workflow automation with Claude AI',
      'XPC services for secure inter-process communication',
      'Unified Logging system for diagnostics and debugging',
      'Low-level process behavior monitoring and instrumentation',
      'Advanced multithreading with Grand Central Dispatch',
      'File system event monitoring with FSEvents',
      'Automated parts ordering and tracking',
      'Comprehensive repair history and analytics',
      'Integration with existing Apple retail systems using Internal SDK'
    ],
    impact: [
      'Reduced customer wait time by 30%',
      'Improved repair success rate by 25%',
      'Saved $2M annually in operational costs',
      'Increased technician productivity by 35%',
      'Reduced parts inventory waste by 20%'
    ],
    techStack: {
      languages: ['Swift', 'Objective-C', 'Python'],
      frameworks: ['SwiftUI', 'AppKit', 'Combine', 'Core ML'],
      systemAPIs: ['Grand Central Dispatch', 'XPC Services', 'FSEvents', 'FileManager (low-level)', 'OSLog/Unified Logging', 'Unix APIs (POSIX, pthreads, signals)'],
      apis: ['Claude API', 'REST APIs', 'GraphQL', 'Internal SDK'],
      architecture: ['MVVM', 'Clean Architecture', 'Microservices'],
      infrastructure: ['Launchd agents & daemons', 'macOS sandbox & entitlements', 'System Extensions'],
      tools: ['Xcode', 'Internal SDK', 'Git', 'CI/CD', 'Analytics']
    },
    myRole: [
      'Led technical architecture and design decisions',
      'Implemented AI/ML integration with Core ML',
      'Designed and built SwiftUI/AppKit hybrid user interface',
      'Developed XPC services for secure system-level operations',
      'Implemented low-level instrumentation for process, memory, and CPU tracing',
      'Integrated Unified Logging (OSLog) for comprehensive system diagnostics',
      'Built async scheduling system using Grand Central Dispatch and multithreading',
      'Configured macOS sandbox, entitlements, and security policies',
      'Developed launchd agents and daemons for background services',
      'Utilized Internal SDK for deep system integration',
      'Integrated Claude API for intelligent automation',
      'Implemented file system monitoring with FSEvents and low-level FileManager APIs',
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
    overview: `Built a comprehensive customer success platform serving 1000+ daily users with 99.9% uptime, consolidating customer data from 5+ backend systems into a single, intuitive interface. The system features real-time analytics dashboard, automated workflow management, and intelligent reporting capabilities, significantly improving customer relationship management and support ticket handling across Apple's customer success teams.`,
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
    overview: `Developed a native iOS/macOS travel management application streamlining corporate travel booking and expense tracking for Apple employees. The app integrates with 3 major travel APIs (flights, hotels, car rentals), provides offline access to itineraries, and seamlessly syncs with Apple's expense management system. Features intelligent search and booking workflows, earning a 4.6/5 user rating and saving $1.5M annually.`,
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
    overview: `Built a universal SwiftUI expense management application for iOS and macOS, transforming manual expense entry with intelligent OCR receipt scanning using Vision framework, CloudKit-based synchronization, and ML-powered automated categorization. The app enables faster expense capture, seamless cross-device sync between iPhone, iPad, and Mac, and supports multiple export formats including PDF, Excel, and QuickBooks.`,
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
  },

  {
    id: 'disclosed',
    title: 'Disclosed',
    subtitle: 'Classified macOS Security Application',
    shortDescription: 'Military-grade security application using proprietary Apple frameworks with 100% audit compliance.',
    year: 2023,
    featured: true,
    stats: {
      compliance: '100%',
      security: 'Military-grade',
      audits: 'All passed',
      encryption: 'Proprietary'
    },
    categories: {
      platform: ['macOS'],
      type: ['Enterprise', 'Security', 'Internal Tools'],
      tech: ['Swift', 'Proprietary Frameworks', 'Encryption'],
      role: ['Lead Developer', 'Security']
    },
    overview: `Developed a high-security macOS application designed for classified enterprise operations. The application meets military-grade security standards, achieves full audit compliance, and leverages system-level macOS APIs and proprietary frameworks to deliver reliable and secure functionality.`,
    features: [
      'System-Level Services: Built XPC services for secure inter-process communication and background security operations using Launchd agents and daemons',
      'Low-Level Instrumentation: Implemented process, memory, and CPU monitoring using POSIX APIs, pthreads, and signals',
      'File & Event Monitoring: Secured critical operations via FSEvents and file-system-level monitoring',
      'Security & Encryption: Applied military-grade encryption, secure storage, and data transmission using CryptoKit',
      'Logging & Auditing: Integrated Unified Logging (OSLog) for comprehensive event tracking, diagnostics, and audit compliance',
      'Concurrency & Performance: Designed async and multithreaded operations with Grand Central Dispatch for performance and responsiveness',
      'macOS Security Controls: Enforced sandboxing, entitlements, and strict security policies for system-level reliability'
    ],
    impact: [
      'Achieved 100% compliance with security audits',
      'Zero security incidents since deployment',
      'Delivered a robust, system-level security tool that established new internal standards for secure macOS development'
    ],
    techStack: {
      languages: ['Swift', 'Objective-C'],
      frameworks: ['AppKit', 'Proprietary Apple Frameworks', 'Security Framework', 'CryptoKit'],
      systemAPIs: ['Grand Central Dispatch', 'XPC Services', 'FSEvents', 'FileManager (low-level)', 'OSLog/Unified Logging', 'Unix APIs (POSIX, pthreads, signals)'],
      architecture: ['Clean Architecture', 'Security-First Design'],
      infrastructure: ['Launchd agents & daemons', 'macOS sandbox & entitlements', 'System Extensions'],
      tools: ['Xcode', 'Internal SDK', 'Security Audit Tools', 'Penetration Testing']
    },
    myRole: [
      'Led architecture, development, and implementation of system-level macOS features',
      'Designed security-first architecture and secure coding standards',
      'Developed background services, low-level monitoring, and secure inter-process communication',
      'Implemented file system monitoring, encryption, and auditing mechanisms',
      'Collaborated with security teams to validate compliance and reliability'
    ],
    timeline: {
      duration: '12 months',
      start: '2022-06',
      end: '2023-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'macOS', 'Security', 'Enterprise', 'Encryption', 'Compliance']
  },

  {
    id: 'kickstart',
    title: 'Kickstart',
    subtitle: 'macOS Device Setup Automation',
    shortDescription: 'Automated device setup tool reducing new employee onboarding from 4 hours to 30 minutes.',
    year: 2022,
    featured: true,
    stats: {
      timeSaved: '4 hours → 30 min',
      tickets: '40% reduction',
      automation: '95%',
      employees: '10,000+'
    },
    categories: {
      platform: ['macOS'],
      type: ['Enterprise', 'DevOps', 'Automation'],
      tech: ['Swift', 'Bash', 'AppleScript'],
      role: ['Lead Developer', 'DevOps']
    },
    overview: `Developed an automated macOS device setup tool that revolutionized new employee onboarding at Apple, reducing setup time from 4 hours to 30 minutes. The application automatically configures system settings, installs required applications, sets up security protocols, and integrates with corporate systems with minimal user intervention. Achieved 95% automation rate and cut IT support tickets by 40%, serving 10,000+ employees.`,
    features: [
      'Automated system configuration and setup',
      'One-click application installation',
      'Security protocol automation',
      'Corporate system integration',
      'Real-time progress tracking',
      'Error handling and recovery',
      'Custom configuration profiles',
      'Compliance verification'
    ],
    impact: [
      'Reduced setup time from 4 hours to 30 minutes',
      'Cut IT support tickets by 40%',
      'Improved setup consistency by 95%',
      'Saved IT department thousands of hours annually',
      'Enhanced new employee experience'
    ],
    techStack: {
      languages: ['Swift', 'Bash', 'AppleScript'],
      frameworks: ['AppKit', 'Foundation', 'Security Framework'],
      architecture: ['Automation Workflow', 'Error Recovery'],
      tools: ['Xcode', 'Git', 'MDM Integration']
    },
    myRole: [
      'Designed and built entire automation system',
      'Implemented automated configuration workflows',
      'Created error handling and recovery mechanisms',
      'Integrated with MDM and corporate systems',
      'Reduced manual intervention to near zero',
      'Established automation best practices'
    ],
    timeline: {
      duration: '6 months',
      start: '2021-12',
      end: '2022-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'macOS', 'Automation', 'DevOps', 'Enterprise', 'Bash']
  },

  {
    id: 'devices',
    title: 'Devices',
    subtitle: 'macOS Employee Device Management',
    shortDescription: 'Native device management app providing real-time system information, reducing IT helpdesk requests by 35%.',
    year: 2022,
    featured: false,
    stats: {
      users: '100,000+',
      helpdesk: '35% reduction',
      info: 'Real-time',
      support: '24/7 access'
    },
    categories: {
      platform: ['macOS'],
      type: ['Enterprise', 'System Tools', 'IT Management'],
      tech: ['Swift', 'AppKit', 'System APIs'],
      role: ['Developer']
    },
    overview: `Built a native macOS utility application providing instant access to comprehensive device information for IT support. The app displays real-time system stats, hardware details, serial numbers, OS versions, and network information in an intuitive interface, empowering Apple employees to self-serve for common IT support needs and reducing helpdesk dependency.`,
    features: [
      'Real-time device information display',
      'Hardware specifications and serial numbers',
      'OS version and update status',
      'Network configuration details',
      'One-click copy for support tickets',
      'Storage and memory usage analytics',
      'System health monitoring'
    ],
    impact: [
      'Reduced IT helpdesk requests by 35%',
      'Empowered 100,000+ employees with self-service',
      'Saved IT support team hours weekly',
      'Improved support ticket accuracy'
    ],
    techStack: {
      languages: ['Swift'],
      frameworks: ['AppKit', 'Foundation', 'IOKit'],
      architecture: ['MVVM'],
      tools: ['Xcode', 'Git']
    },
    myRole: [
      'Developed native macOS application',
      'Implemented system information APIs',
      'Designed intuitive user interface',
      'Built copy-to-clipboard functionality',
      'Optimized for performance and reliability'
    ],
    timeline: {
      duration: '4 months',
      start: '2022-02',
      end: '2022-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'macOS', 'System Tools', 'Enterprise', 'AppKit']
  },

  {
    id: 'global-security',
    title: 'Global Security',
    subtitle: 'iOS Security Management System',
    shortDescription: 'Enterprise security app with QR code scanning reducing request processing time by 60%.',
    year: 2019,
    featured: false,
    stats: {
      processing: '60% faster',
      security: 'Badge access',
      qr: 'QR scanning',
      users: '20,000+'
    },
    categories: {
      platform: ['iOS'],
      type: ['Enterprise', 'Security', 'Internal Tools'],
      tech: ['Swift', 'UIKit', 'Vision', 'QR Codes'],
      role: ['iOS Developer']
    },
    overview: `Developed an iOS security management application streamlining badge access requests, security incident reporting, and security-related workflows for Apple employees. The app features QR code scanning for quick badge access requests, real-time status tracking, and automated approval workflows integrated with Apple's security systems, significantly reducing request processing time and improving security management efficiency.`,
    features: [
      'QR code scanning for badge requests',
      'Security incident reporting',
      'Real-time request status tracking',
      'Automated approval workflows',
      'Push notifications for updates',
      'Integration with corporate security systems',
      'Visitor management functionality'
    ],
    impact: [
      'Reduced request processing time by 60%',
      'Improved security response time by 45%',
      'Streamlined visitor check-in process',
      'Enhanced security incident tracking'
    ],
    techStack: {
      languages: ['Swift'],
      frameworks: ['UIKit', 'Vision', 'AVFoundation'],
      apis: ['Internal Security APIs'],
      architecture: ['MVVM', 'Coordinator Pattern'],
      tools: ['Xcode', 'Git', 'TestFlight']
    },
    myRole: [
      'Developed iOS security management application',
      'Implemented QR code scanning functionality',
      'Built security incident reporting system',
      'Integrated with corporate security systems',
      'Designed intuitive user workflows'
    ],
    timeline: {
      duration: '10 months',
      start: '2018-08',
      end: '2019-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'iOS', 'Security', 'QR Codes', 'Enterprise', 'Vision']
  },

  {
    id: 'purchase-requisition',
    title: 'Purchase Requisition POC',
    subtitle: 'iPad Procurement System',
    shortDescription: 'Proof of concept iPad app for streamlined purchase requisition workflows.',
    year: 2018,
    featured: false,
    stats: {
      platform: 'iPad',
      workflow: 'Streamlined',
      poc: 'Successful',
      approval: 'Automated'
    },
    categories: {
      platform: ['iOS'],
      type: ['Enterprise', 'Procurement', 'POC'],
      tech: ['Swift', 'UIKit', 'REST APIs'],
      role: ['iOS Developer']
    },
    overview: `Created a proof-of-concept iPad application demonstrating streamlined purchase requisition workflows for Apple's procurement team. The app featured intuitive forms, automated approval routing, and real-time status tracking, proving the viability of mobile-first procurement and modernizing the paper-based desktop-only workflow that slowed down approvals for on-the-go managers.`,
    features: [
      'iPad-optimized purchase requisition forms',
      'Automated approval routing',
      'Real-time status tracking',
      'Digital signature support',
      'Budget validation integration',
      'Vendor catalog integration',
      'Receipt attachment functionality'
    ],
    impact: [
      'Demonstrated feasibility of mobile procurement',
      'Reduced approval time in POC by 50%',
      'Validated user experience approach',
      'Informed future procurement system design'
    ],
    techStack: {
      languages: ['Swift'],
      frameworks: ['UIKit', 'Foundation'],
      apis: ['Internal Procurement APIs'],
      architecture: ['MVC', 'REST Integration'],
      tools: ['Xcode', 'Git']
    },
    myRole: [
      'Developed iPad POC application',
      'Designed procurement workflows',
      'Implemented approval routing logic',
      'Created demo for stakeholder validation',
      'Gathered feedback for production roadmap'
    ],
    timeline: {
      duration: '3 months',
      start: '2018-03',
      end: '2018-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Swift', 'iOS', 'iPad', 'Enterprise', 'Procurement', 'POC']
  },

  {
    id: 'software-depot',
    title: 'Software Depot',
    subtitle: 'macOS Package Management System',
    shortDescription: 'Enterprise software distribution system using ISTSU protocol for centralized package management.',
    year: 2012,
    featured: false,
    stats: {
      protocol: 'ISTSU',
      packages: '1,000+',
      deployment: 'Centralized',
      success: '99% rate'
    },
    categories: {
      platform: ['macOS'],
      type: ['Enterprise', 'DevOps', 'System Tools'],
      tech: ['Objective-C', 'ISTSU Protocol'],
      role: ['Software Engineer']
    },
    overview: `Contributed to Software Depot, a centralized macOS package management system for distributing and managing software packages across thousands of macOS devices at Apple. Debugged critical ISTSU protocol issues and improved package deployment reliability, addressing error-prone manual distribution challenges and enhancing enterprise-scale software management.`,
    features: [
      'ISTSU protocol implementation',
      'Centralized package distribution',
      'Automated deployment workflows',
      'Version management and rollback',
      'Package dependency resolution',
      'Deployment status tracking',
      'Error recovery mechanisms'
    ],
    impact: [
      'Improved package deployment reliability',
      'Reduced deployment errors by 70%',
      'Streamlined software distribution at scale',
      'Enabled centralized version control'
    ],
    techStack: {
      languages: ['Objective-C', 'C'],
      frameworks: ['Foundation', 'System Configuration'],
      protocols: ['ISTSU Protocol'],
      architecture: ['Client-Server'],
      tools: ['Xcode', 'Git', 'Debugging Tools']
    },
    myRole: [
      'Debugged ISTSU protocol implementation',
      'Fixed critical package deployment issues',
      'Improved error handling and recovery',
      'Enhanced deployment reliability',
      'Collaborated with infrastructure team'
    ],
    timeline: {
      duration: '8 months',
      start: '2011-10',
      end: '2012-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Objective-C', 'macOS', 'DevOps', 'Enterprise', 'Protocols']
  },

  {
    id: 'istcore',
    title: 'ISTCore Framework',
    subtitle: 'Modular iOS/macOS Framework',
    shortDescription: 'Reusable modular framework providing core functionality for enterprise applications.',
    year: 2011,
    featured: false,
    stats: {
      modules: '20+',
      apps: '10+ using',
      reusability: '80%',
      platform: 'iOS + macOS'
    },
    categories: {
      platform: ['iOS', 'macOS'],
      type: ['Framework', 'Library', 'Enterprise'],
      tech: ['Objective-C', 'Foundation'],
      role: ['Framework Developer']
    },
    overview: `Contributed to the development of ISTCore Framework, a comprehensive modular framework providing reusable components for Apple's enterprise applications. The framework offers standardized implementations for common functionality including networking, data persistence, authentication, and logging, significantly reducing development time, improving code quality, and eliminating code duplication across multiple internal applications.`,
    features: [
      'Modular architecture with 20+ components',
      'Networking and API integration utilities',
      'Data persistence and caching',
      'Authentication and authorization helpers',
      'Logging and analytics integration',
      'Error handling utilities',
      'Common UI components',
      'Configuration management'
    ],
    impact: [
      'Reduced development time by 30% for new apps',
      'Improved code consistency across 10+ applications',
      'Decreased maintenance overhead by 40%',
      'Enabled faster feature development'
    ],
    techStack: {
      languages: ['Objective-C'],
      frameworks: ['Foundation', 'UIKit', 'AppKit', 'Core Data'],
      architecture: ['Modular Design', 'Protocol-Oriented'],
      tools: ['Xcode', 'Git', 'Documentation Tools']
    },
    myRole: [
      'Contributed to framework design and architecture',
      'Implemented core networking modules',
      'Built data persistence utilities',
      'Created documentation and examples',
      'Provided developer support and training'
    ],
    timeline: {
      duration: '12 months',
      start: '2010-08',
      end: '2011-08'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Objective-C', 'Framework', 'iOS', 'macOS', 'Enterprise', 'Modular']
  },

  {
    id: 'enclosure-framework',
    title: 'Enclosure Framework',
    subtitle: 'Hardware Integration API',
    shortDescription: 'Framework API for seamless hardware device integration across Apple ecosystem.',
    year: 2011,
    featured: false,
    stats: {
      devices: '50+ supported',
      api: 'Unified',
      integration: 'Hardware',
      reliability: '99.5%'
    },
    categories: {
      platform: ['iOS', 'macOS'],
      type: ['Framework', 'Hardware', 'API'],
      tech: ['Objective-C', 'Hardware APIs'],
      role: ['Framework Developer']
    },
    overview: `Designed the Enclosure Framework API providing a unified interface for hardware device integration across iOS and macOS applications. The framework abstracts device-specific complexities and provides a consistent API for developers to integrate various hardware peripherals, addressing the challenge of using different APIs and approaches for each device type.`,
    features: [
      'Unified hardware integration API',
      'Support for 50+ device types',
      'Plug-and-play device detection',
      'Automatic driver configuration',
      'Event-driven communication',
      'Error handling and recovery',
      'Hot-swap support',
      'Comprehensive device monitoring'
    ],
    impact: [
      'Simplified hardware integration for developers',
      'Reduced integration time by 60%',
      'Improved device compatibility by 40%',
      'Standardized hardware communication protocols'
    ],
    techStack: {
      languages: ['Objective-C', 'C'],
      frameworks: ['IOKit', 'Foundation', 'Core Foundation'],
      architecture: ['Framework Design', 'Hardware Abstraction'],
      tools: ['Xcode', 'Hardware Testing Tools']
    },
    myRole: [
      'Designed Enclosure Framework API',
      'Implemented hardware abstraction layer',
      'Created device integration protocols',
      'Built testing and validation tools',
      'Documented API usage and best practices'
    ],
    timeline: {
      duration: '10 months',
      start: '2010-10',
      end: '2011-08'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Objective-C', 'Framework', 'Hardware', 'iOS', 'macOS', 'API']
  },

  {
    id: 'mobile-enclosures',
    title: 'Mobile Enclosures',
    subtitle: 'File Transfer System',
    shortDescription: 'Reliable file upload/download system achieving 99% transfer success rate.',
    year: 2011,
    featured: false,
    stats: {
      success: '99%',
      transfers: '500,000+',
      uptime: '99.8%',
      speed: 'Optimized'
    },
    categories: {
      platform: ['iOS'],
      type: ['Enterprise', 'File Management', 'Networking'],
      tech: ['Objective-C', 'Networking'],
      role: ['iOS Developer']
    },
    overview: `Built a robust file upload/download system for enterprise users transferring large files between mobile devices and servers. The system features intelligent chunking, automatic retry logic, resumable transfers, and graceful network interruption handling with real-time progress tracking, significantly improving success rates on unreliable network connections.`,
    features: [
      'Intelligent file chunking for large transfers',
      'Automatic retry and error recovery',
      'Resumable upload/download',
      'Real-time progress tracking',
      'Network interruption handling',
      'Bandwidth optimization',
      'Transfer queue management',
      'Background transfer support'
    ],
    impact: [
      'Achieved 99% transfer success rate',
      'Handled 500,000+ file transfers',
      'Reduced transfer failures by 85%',
      'Improved user productivity for remote workers'
    ],
    techStack: {
      languages: ['Objective-C'],
      frameworks: ['Foundation', 'UIKit', 'NSURLSession'],
      architecture: ['Queue Management', 'State Machine'],
      tools: ['Xcode', 'Charles Proxy', 'Network Testing']
    },
    myRole: [
      'Designed file transfer architecture',
      'Implemented chunking and retry logic',
      'Built resumable transfer system',
      'Optimized network performance',
      'Created comprehensive error handling'
    ],
    timeline: {
      duration: '6 months',
      start: '2010-12',
      end: '2011-06'
    },
    links: {},
    images: {
      thumbnail: null,
      screenshots: []
    },
    tags: ['Objective-C', 'iOS', 'Networking', 'File Transfer', 'Enterprise']
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
