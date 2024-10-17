// Define the main CV/Profile structure
export interface Profile {
  firstName: string;
  lastName: string;
  profilePicture: { src: string; alt: string }; // Define a custom type for Image
  birthYear: number;
  placeOfResidence: string;
  title: string;
  skills: string[];
  bio: SelectableText[];
  experiences: Experience[];
  qualifications: LabelWithDetail[];
}

export interface ProfileToRender {
  firstName: string;
  lastName: string;
  profilePicture: { src: string; alt: string };
  birthYear: number;
  placeOfResidence: string;
  title: string;
  skills: string[];
  bio: string;
  experiences: ExperienceToRender[];
  qualifications: LabelWithDetail[];
}

interface Experience {
  projectName: string;
  startDate?: Date;
  endDate?: Date;
  description: SelectableText[];
}

interface ExperienceToRender {
  projectName: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
}

interface SelectableText {
  isSelected: boolean;
  richText: string;
}

interface LabelWithDetail {
  label: string;
  detail: string;
}
