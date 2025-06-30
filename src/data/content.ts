import { Clock, ShieldCheck, Brain, Zap, Users, Heart, Home, Activity, ScanFace, LineChart, Droplets, Target, Droplet, TestTube, Camera, CheckCircle } from 'lucide-react';
import type { BenefitData, TestimonialData, StepData } from '../types/common';

// Hero Section Content
export const HERO_CONTENT = {
  brand: {
    name: "OwnBioScan",
    tagline: "Health Checkups. Anywhere. Anytime."
  },
  title: {
    main: "Health Checkups.",
    highlight: "Anywhere.",
    accent: "Anytime."
  },
  subtitle: "Turn your smartphone into a personal health lab. Test, analyze, and monitor your health with AI-powered diagnostics at home.",
  cta: {
    primary: { text: "Try the Demo", href: "/demo" },
    secondary: { text: "Learn More", href: "#how-it-works" }
  },
  heroImage: {
    src: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg",
    alt: "Smartphone scanning a test strip"
  }
};

// Benefits Section Content
export const BENEFITS_CONTENT = {
  title: "Why Choose OwnBioScan?",
  description: "Our app transforms how you monitor your health, giving you lab-quality results from the comfort of home.",
  benefits: [
    {
      icon: Zap,
      bgColor: "blue",
      title: "Fast Results",
      description: "Get health insights in minutes, not days. No waiting for lab results."
    },
    {
      icon: ShieldCheck,
      bgColor: "red", 
      title: "Privacy First",
      description: "Your health data stays on your device. We prioritize your privacy and security."
    },
    {
      icon: Clock,
      bgColor: "green",
      title: "Convenient Testing",
      description: "Test anytime, anywhere without appointments or clinic visits."
    },
    {
      icon: Brain,
      bgColor: "purple",
      title: "AI Health Insights", 
      description: "Our advanced AI analyzes results and provides personalized health recommendations."
    }
  ] as BenefitData[]
};

// How It Works Section Content
export const HOW_IT_WORKS_CONTENT = {
  title: "How It Works",
  description: "Three simple steps to transform your health monitoring experience",
  steps: [
    {
      icon: ScanFace,
      title: "Scan",
      description: "Use your smartphone camera to scan the test strip after applying a small sample."
    },
    {
      icon: LineChart,
      title: "Analyze", 
      description: "Our AI instantly processes the image and analyzes the results with clinical accuracy."
    },
    {
      icon: CheckCircle,
      title: "Get Results",
      description: "Receive immediate health insights, trend data, and personalized recommendations."
    }
  ] as StepData[]
};

// Target Users Content
export const TARGET_USERS_CONTENT = {
  title: "Who Benefits From BioScan?",
  description: "Our solution is designed for everyone who values their health and time.",
  userGroups: [
    {
      icon: Users,
      bgColor: "blue",
      title: "Families",
      description: "Perfect for busy parents"
    },
    {
      icon: Heart,
      bgColor: "red", 
      title: "Seniors",
      description: "Easy to use for all ages"
    },
    {
      icon: Home,
      bgColor: "green",
      title: "Rural Areas", 
      description: "Healthcare access anywhere"
    },
    {
      icon: Activity,
      bgColor: "purple",
      title: "Health-Conscious",
      description: "Track your wellness journey"
    }
  ] as BenefitData[]
};

// Testimonials Content
export const TESTIMONIALS_CONTENT = {
  title: "What Our Users Say",
  description: "Real people, real results, real health improvements",
  testimonials: [
    {
      name: "Sarah Johnson",
      title: "Diabetes Patient",
      content: "OwnBioScan has changed how I monitor my health. Regular testing helps me stay on top of my diabetes without constant doctor visits.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    },
    {
      name: "Robert Chen", 
      title: "Rural Community Resident",
      content: "As someone living in a rural area, having access to reliable testing without driving 2 hours to a clinic is absolutely life-changing.",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    },
    {
      name: "Eleanor Rivera",
      title: "Retired Teacher", 
      content: "The app is incredibly easy to use, even for someone like me who isn't tech-savvy. The health insights are clear and actionable.",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    }
  ] as TestimonialData[]
};

// Audience Section Content
export const AUDIENCE_CONTENT = {
  title: "Healthcare For Everyone",
  description: "We believe that everyone deserves access to quality healthcare regardless of their location or circumstances. Own BioScan bridges the gap between professional medical testing and everyday life.",
  benefits: [
    "Save time and money on doctor visits",
    "Monitor chronic conditions from home", 
    "Get early warnings for health changes",
    "Share results securely with your doctor"
  ],
  image: {
    src: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg",
    alt: "Family using health app together"
  }
};

// CTA Banner Content
export const CTA_CONTENT = {
  title: "Start Your At-Home Checkup Today",
  description: "Join thousands of users who are taking control of their health with OwnBioScan.",
  cta: {
    primary: { text: "Try the Demo", href: "#" },
    secondary: { text: "Learn More", href: "#" }
  },
  disclaimer: "No credit card required. Start with a free demo."
};

// Demo Home Content
export const DEMO_HOME_CONTENT = {
  title: {
    main: "At-Home",
    highlight: "Cholesterol",
    suffix: "Testing"
  },
  subtitle: "Monitor your cholesterol levels easily from home with our AI-powered analysis technology",
  keyPoints: [
    { icon: Clock, title: "Results in 3 minutes" },
    { icon: Brain, title: "AI-powered analysis" },
    { icon: ShieldCheck, title: "Data stored locally" }
  ],
  warning: {
    title: "Medical Disclaimer",
    content: "This test is indicative and does not replace professional medical diagnosis. Always consult your doctor for a complete evaluation of your cardiovascular health."
  },
  cta: {
    primary: { text: "Start Test", href: "/guide" },
    secondary: { text: "View History", href: "/history" }
  },
  howItWorks: {
    title: "How it works",
    description: "A simple 4-step process to get your results",
    steps: [
      {
        stepNumber: 1,
        icon: Droplet,
        title: "Sample",
        description: "Collect a drop of blood with the provided lancet"
      },
      {
        stepNumber: 2,
        icon: TestTube,
        title: "Test Strip", 
        description: "Place the sample on the test strip"
      },
      {
        stepNumber: 3,
        icon: Camera,
        title: "Scan",
        description: "Scan the strip with your camera"
      },
      {
        stepNumber: 4,
        icon: CheckCircle,
        title: "Results",
        description: "Get instant results with recommendations"
      }
    ] as StepData[]
  }
};

// Test Guide Content
export const TEST_GUIDE_CONTENT = {
  title: {
    main: "Follow these",
    highlight: "5 simple steps"
  },
  subtitle: "Don't worry, the process is quick and painless. Millions of people perform this type of test daily.",
  badge: "Safe and approved procedure",
  steps: [
    {
      stepNumber: 1,
      icon: Droplets,
      title: "Wash your hands",
      description: "Clean your hands thoroughly with soap and warm water. Dry them completely with a clean towel to avoid contaminating the sample."
    },
    {
      stepNumber: 2,
      icon: Zap,
      title: "Prepare the lancet",
      description: "Remove the lancet from its sterile packaging. Check that it's not damaged. Hold it firmly between your fingers, ready for use."
    },
    {
      stepNumber: 3,
      icon: Target,
      title: "Prick your fingertip",
      description: "Choose the side of your middle or ring finger. Press the lancet firmly against the skin and trigger quickly. A small drop of blood should appear."
    },
    {
      stepNumber: 4,
      icon: Droplet,
      title: "Place the drop on the strip",
      description: "Gently place the blood drop on the test area of the strip. Make sure the area is completely covered without overflowing onto the sides."
    },
    {
      stepNumber: 5,
      icon: Clock,
      title: "Wait 60 seconds",
      description: "Let the chemical reaction occur for exactly 60 seconds. Don't move the strip and keep it flat on a stable surface."
    }
  ] as StepData[],
  tips: {
    title: "Important Tips",
    items: [
      "Make sure you have a compatible cholesterol test strip",
      "The sample must be fresh (analyzed within 30 seconds)",
      "Good lighting is recommended for optimal capture"
    ]
  }
};

// Camera Capture Content
export const CAMERA_CAPTURE_CONTENT = {
  title: {
    main: "Capture your",
    highlight: "Test Strip"
  },
  subtitle: "Position the strip in the frame and make sure it's well lit",
  instructions: {
    frame: "Place the strip in the frame",
    lighting: "Make sure it's well lit"
  },
  errors: {
    title: "Camera Access Error",
    permissionDenied: "Camera access denied. Please allow access in your browser settings.",
    notFound: "No camera detected on this device.",
    generic: "Unable to access camera. Check your settings.",
    unknown: "Unknown error accessing camera."
  },
  states: {
    loading: "Initializing camera...",
    captured: "Image Captured",
    fallback: "Camera problems?"
  },
  actions: {
    retake: "Retake Photo",
    analyze: "Analyze this Image",
    upload: "Choose Image",
    authorize: "Allow Access"
  },
  tips: {
    title: "Tips for Optimal Capture",
    items: [
      "Make sure the strip is completely within the frame",
      "Avoid reflections and shadows on the strip", 
      "Hold the device steady to avoid blur",
      "Wait for colors to develop fully (60 seconds)"
    ]
  }
};

// Footer Content
export const FOOTER_CONTENT = {
  brand: {
    name: "OwnBioScan",
    description: "Revolutionizing healthcare with at-home diagnostics powered by AI technology."
  },
  links: {
    quickLinks: {
      title: "Quick Links",
      items: [
        { text: "Home", href: "#" },
        { text: "Benefits", href: "#benefits" },
        { text: "How It Works", href: "#how-it-works" },
        { text: "Testimonials", href: "#testimonials" }
      ]
    },
    resources: {
      title: "Resources", 
      items: [
        { text: "FAQ", href: "#" },
        { text: "Support", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Downloads", href: "#" }
      ]
    }
  },
  contact: {
    title: "Contact",
    email: "support@ownbioscan.com",
    phone: "+1 (800) 555-0123"
  },
  legal: {
    copyright: `© ${new Date().getFullYear()} OwnBioScan. All rights reserved.`,
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "Cookie Policy", href: "#" }
    ]
  },
  social: [
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Youtube", href: "#" }
  ]
};