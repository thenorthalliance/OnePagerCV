
import { ProfileToRender } from "./types";

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "2-digit",
  })
  .replace(/\//g, "."); //replace / with .
};

// Clear default text on focus if it's still set
export const clearDefaultText = (elementRef: HTMLElement | null, defaultValue: string) => {
  if (elementRef && elementRef.innerText === defaultValue) {
    elementRef.innerText = ''; // Clear the default text
  }
};

export const requiredFields = ( profile: ProfileToRender) => {
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

