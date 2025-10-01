// Image path constants for easy management
export const IMAGES = {
  hero: {
    background: '/images/hero/hero-background.jpg', // Replace with your hero background
    // Add more hero images as needed
  },

  // Image paths for Founder Section
  founders: {
    founder1: './images/founders/santiago800x800.jpg',
    founder2: './images/founders/elliot800x800.jpg',
    founder3: './images/founders/justin800x800.jpg',

    // Add more founder images as needed
  },

  // Image paths for app screenshot for app overview section
  appPreviewTemp: { // Placeholder values (kept for reference)
    screen1: '/images/appPreview/temp/IMG_4023.PNG',
    screen2: '/images/appPreview/temp/IMG_4024.PNG',
    screen3: '/images/appPreview/temp/IMG_4025.PNG',
    screen4: '/images/appPreview/temp/IMG_4026.PNG',
    screen5: '/images/appPreview/temp/IMG_4028.PNG',
    screen6: '/images/appPreview/temp/IMG_4029.PNG',
    screen7: '/images/appPreview/temp/IMG_4030.PNG',
    screen8: '/images/appPreview/temp/IMG_4031.PNG',
    screen9: '/images/appPreview/temp/IMG_4032.PNG',
    screen10: '/images/appPreview/temp/IMG_4033.PNG',
  },

  // Image paths for app screenshot for app overview section
  appPreviewFinal: { // Final Image Values to use in Production (8 images)
    screen1: '/images/appPreview/final/login_page.png',
    screen2: '/images/appPreview/final/map_w_events.png',
    screen3: '/images/appPreview/final/map_w_signup.png',
    screen4: '/images/appPreview/final/player_profile.png',
    screen5: '/images/appPreview/final/groupchat_w_event.png',
    screen6: '/images/appPreview/final/creating_event.png',
    screen7: '/images/appPreview/final/tournament.png',
    screen8: '/images/appPreview/final/event_types.png',
  },


  testimonials: {
    user1: '/images/testimonials/user1.jpg', // Replace with actual user avatars
    user2: '/images/testimonials/user2.jpg',
    user3: '/images/testimonials/user3.jpg',
    user4: '/images/testimonials/user4.jpg',
    user5: '/images/testimonials/user5.jpg',
    // Add more testimonial images as needed
  },
  // Add more image categories as needed
} as const;

// Fallback images (you can replace these with your own defaults)
export const FALLBACK_IMAGES = {
  hero: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  mission: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  defaultAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
} as const;
