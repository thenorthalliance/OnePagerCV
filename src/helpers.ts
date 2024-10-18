import { Profile, ProfileToRender } from "./types";

export const transformProfileToRender = (profile: Profile): ProfileToRender => {
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
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "2-digit",
  })
  .replace(/\//g, "."); //replace / with .
};
