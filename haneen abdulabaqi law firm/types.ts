export interface NavLinkItem {
  label: string; // English label
  labelAr: string; // Arabic label
  path: string;
}

export interface PracticeArea {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  longDescriptionEn?: string;
  longDescriptionAr?: string;
  icon?: React.FC<{ className?: string }>; // Icon component is optional
  image?: string; // Image URL for the service
}

export interface TeamMember {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  bioEn?: string;
  bioAr?: string;
}

export interface StatItem {
  value: number;
  labelEn: string;
  labelAr: string;
  suffix?: string;
}
