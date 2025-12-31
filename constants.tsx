
import React from 'react';
import { Youtube, Instagram, Monitor, Gamepad2, Video, Heart, Mail, Phone, Film, Zap, BookOpen, Star, Clapperboard } from 'lucide-react';
import { Channel, Social } from './types';

export const NAV_BIO = "Rakshit Sharma here. I like to embrace my creative side a lot and especially through social media. I have created content over social issues and short films. I also do vlogs, lifestyle content, personal stuff, commentary, acts, skits and all of the hobby stuff where stage speaking and personal representation is involved. In school too, I do skits, speeches etc. Overall my hobbies are of stage speaking, commenting on social issues and content creation.";

export const EXPANDED_ABOUT_BIO = `Rakshit Sharma is not just a content creator; he is a digital architect of experiences, blending the boundaries between reality and virtual storytelling. His journey is a testament to the power of multifaceted creativity in the modern age. Through his primary hub, Rakshit Sharma Vlogs, he invites a global audience into his world, offering more than just "content"—he offers a perspective. These vlogs are a tapestry of high-energy travel chronicles, intimate lifestyle diaries, and candid personal reflections that humanize the creator-viewer relationship.

His technical prowess finds a home at Rakshit Techs, where he dissects the latest in gadgets, software, and emerging technology. It's not just about specs; it's about how tech integrates into our lives, explained with the clarity of an enthusiast and the critical eye of a professional. For the gaming community, TheGameTech690 serves as an adrenaline-fueled sanctuary. Here, Rakshit explores the narrative depth of modern titles, provides high-octane gameplay, and builds a culture centered around the shared joy of interactive entertainment.

But the screen is only one of his stages. Rakshit's roots in performance run deep, manifesting in his passion for stage speaking, skits, and public representation. Whether he's addressing complex social issues through thought-provoking short films or engaging his school community with powerful speeches, his voice is a tool for change. He leverages his platform to spark conversations on social justice and community welfare, proving that digital influence can have tangible real-world impact. His work in commentary and acts further showcases his versatility, proving that whether it's a 60-second viral short or a meticulously crafted cinematic piece, Rakshit Sharma's signature is one of authenticity, energy, and relentless creative evolution.`;

export const CONTACT = {
  phone: "+91 91032 97528",
  email: "rakshitsharma72692@gmail.com"
};

export const PLAYLISTS = [
  {
    title: "Vlogs",
    url: "https://youtube.com/playlist?list=PLEQUWuCoSuHoGivFKiPhhsQ4pQWJHMucZ&si=Jc_AZlsbCgOsPygb",
    icon: "Video"
  },
  {
    title: "Short Films",
    url: "https://youtube.com/playlist?list=PLrB7EijVAhQ08Vjz2ze6Yl06FytKgidDN&si=ZWY5TZe6kijrAduj",
    icon: "Film"
  },
  {
    title: "Vlog Diaries",
    url: "https://youtube.com/playlist?list=PLEQUWuCoSuHru8XzgLaJa6KR-IPVnNkSl&si=_mMWknPlkCBVjV8u",
    icon: "BookOpen"
  },
  {
    title: "Shorts",
    url: "https://youtube.com/playlist?list=PLEQUWuCoSuHpBqeqCgM19Rt3s0Ntrk5NJ&si=Rq5YUcBsykWG1zXJ",
    icon: "Clapperboard"
  },
  {
    title: "Viral Videos",
    url: "https://youtube.com/playlist?list=PLEQUWuCoSuHqGhu1lNvWm-dBRFyZE1z0x&si=Wm-dBRFyZE1z0x&si=WmLNS-NeGZ-7WEsP",
    icon: "Zap"
  },
  {
    title: "Lifestyle",
    url: "https://youtube.com/playlist?list=PLEQUWuCoSuHqTSmaec3x30NWAsTtl1orc&si=O94s1aR-bQvB321A",
    icon: "Star"
  }
];

export const CHANNELS: Channel[] = [
  {
    title: "Vlogs",
    description: "Daily life, travel adventures, and behind-the-scenes stories.",
    url: "https://www.youtube.com/@RakshitSharmaVlogs168/featured",
    icon: "Video",
    accent: "from-pink-500 to-rose-500"
  },
  {
    title: "Tech & Short Films",
    description: "Deep dives into gadgets, software, and cinematic storytelling.",
    url: "https://www.youtube.com/@RakshitTechs",
    icon: "Monitor",
    accent: "from-blue-500 to-cyan-500"
  },
  {
    title: "Gaming",
    description: "High-octane gameplay, reviews, and gaming culture.",
    url: "https://www.youtube.com/@TheGameTech690",
    icon: "Gamepad2",
    accent: "from-purple-500 to-indigo-500"
  },
  {
    title: "Content Partner",
    description: "Professional content collaborations and shared visions.",
    url: "https://www.youtube.com/@sonali0511",
    icon: "Heart",
    accent: "from-orange-400 to-pink-400"
  }
];

export const SOCIALS: Social[] = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/rakshit_2810",
    icon: "Instagram"
  },
  {
    platform: "Main YouTube",
    url: "https://www.youtube.com/@RakshitSharmaVlogs168",
    icon: "Youtube"
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Video: <Video className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Youtube: <Youtube className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  Film: <Film className="w-5 h-5" />,
  Mail: <Mail className="w-4 h-4" />,
  Phone: <Phone className="w-4 h-4" />,
  Zap: <Zap className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Clapperboard: <Clapperboard className="w-5 h-5" />
};
