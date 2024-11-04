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
  firstname?: string;
  lastname?: string;
  profilePicture?: { src: string; alt: string };
  birthYear?: number;
  placeOfResidence?: string;
  title?: string;
  skills?: string[];
  description?: string;
  experiencesTitle?: string;
  experiences?: ExperienceToRender[];
  qualificationsTitle?: string;
  qualifications?: LabelWithDetail[];
}


interface ExperienceToRender {
  projectName: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
}

interface LabelWithDetail {
  label: string;
  detail: string;
}
