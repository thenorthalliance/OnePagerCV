
/* export const transformProfileToRender = (profile: Profile): ProfileToRender => {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    profilePicture: profile.profilePicture,
    birthYear: profile.birthYear,
    placeOfResidence: profile.placeOfResidence,
    title: profile.title,
    skills: profile.skills,
    bio: profile.bio.find((text) => text.isSelected)?.richText || "",
    experiences: profile.experiences.map((experience) => ({
      projectName: experience.projectName,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description:
        experience.description.find((text) => text.isSelected)?.richText || "",
    })),
    qualifications: profile.qualifications,
  };
}; */

import { ProfileToRender } from "./types";

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "2-digit",
  })
  .replace(/\//g, "."); //replace / with .
};


export const requiredFields = ( profile: ProfileToRender) => {
    // const profile = inject<ProfileToRender>('profile');
    let warnings:string[] = [];
    
    if (!profile?.name) {
      warnings.push("Navn");
    }
    if (!profile?.jobTitle) {
      warnings.push("Jobbtittel");
    }
    if (!profile?.skills) {
      warnings.push("Ekspertiser");
    }
    if (!profile?.description) {
      warnings.push("Beskrivelse");
    }
    if (!profile?.birthYear) {
      warnings.push("Fødselsår");
    }
    if (!profile?.residence) {
      warnings.push("Bosted");
    }
    if (!profile?.experiences) {
      warnings.push("Erfaringer");
    }
    if (!profile?.qualifications) {
      warnings.push("Kvalifikasjoner");
    }
    
    return warnings;
};

