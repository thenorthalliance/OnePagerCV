// Define the main CV/Profile structure
/* export interface Profile {
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
} */

// Initialy only for redering, but can now be editable. Renaming might be needed.
export interface ProfileToRender {
  name?: string;
  profilePicture?: { src: string; alt: string };
  birthYear?: number;
  residence?: string;
  jobTitle?: string;
  skillsTitle?: string;
  skills?: string[];
  descriptionTitle?: string;
  description?: string;
  experienceTitle?: string;
  experiences?: ExperienceToRender[];
  qualificationTitle?: string;
  qualifications?: LabelWithDetail[];
}

export interface ProfileCMS extends ProfileToRender {
  _id: any;
  _type: string;
}

interface ExperienceToRender {
  projectName: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

interface LabelWithDetail {
  label: string;
  detail: string;
}
