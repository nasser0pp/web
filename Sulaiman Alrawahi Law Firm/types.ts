export interface NavLinkItem {
  label: string;
  labelAr?: string; // Added for Arabic
  path: string;
}

export interface PracticeArea {
  id: string;
  nameEn: string; // Changed from name
  nameAr: string;
  descriptionEn: string; // Changed from description
  descriptionAr: string;
  longDescriptionEn?: string; // Changed from longDescription
  longDescriptionAr?: string;
  icon?: React.FC<{ className?: string }>;
  image?: string;
}

export interface TeamMember {
  id: string;
  nameEn: string; // Changed from name
  nameAr: string;
  titleEn: string; // Changed from title
  titleAr: string;
  imageUrl: string;
  bioEn?: string; // Changed from bio
  bioAr?: string;
}

export interface StatItem {
  value: number; // Changed to number for animation
  labelEn: string; // Changed from label
  labelAr: string;
  suffix?: string; // Optional suffix like "+", "%"
}