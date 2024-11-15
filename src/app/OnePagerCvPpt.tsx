import type { ExperienceToRender, ProfileToRender } from "./types";
import PptxGen from "pptxgenjs";
import profileImg from './assets/profileImg.png';
// import pinIcon from './assets/icons/pinIcon.svg';

export function OnePagerCvPpt(profile: ProfileToRender) {
    let pptx = new PptxGen();

    let slide = pptx.addSlide();

    // First half of the slide
    // page header
    slide.addText("Noa Ignite konsulentprofil", {
        x: '1%',
        y: '1.5%',
        w: '15%',
        h: '2%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen"
    });

    // Image from remote URL
    slide.addImage({ 
        path: profile.profilePicture?.src || profileImg,
        x: '1.7%',
        y: '5%',
        w: '11.5%',
        h: '20%',        
    });

    slide.addText( profile.name || "Fornavn Etternavn", {
        x: '13%',
        y: '14.5%',
        w: '30%',
        h: '6%',
        fontSize: 20,
        color: "000000",
        fontFace: "TiemposFineLightItalic",
        align: "left",
    });
    
    slide.addText( profile.jobTitle || "Tittel", {
        x: '13%',
        y: '20.8%',
        w: '30%',
        h: '4.5%',
        fontSize: 15,
        color: "2A45EE",
        fontFace: "TiemposFineLight",
        align: "left",
    });

    slide.addText( profile.skillsTitle ?? "Ekspertise innen", {
        x: '1%',
        y: '29%',
        h: '2%',
        w: '10%',
        fontSize: 7,
        color: "2A45EE",
        fontFace: "NoAAftenScreenBold",
    });

    SkillsChips(pptx, slide, profile);

    slide.addText( profile.descriptionTitle ?? "Om Navn", {
        x: '1%',
        y: '48%',
        w: '10%',
        h: '2%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreenBold",
    });

    slide.addText( profile.description || "Legg til tekst", {
        x: '1%',
        y: '50%',
        w: '43%',
        h: '35%',
        fontSize: 10,
        lineSpacing: 17,
        color: "000000",
        fontFace: "NoAAftenScreen",
        align: "left",
        valign: "top",
    });
    
    slide.addText(`f. ${profile.birthYear}` || "f. ÅÅÅÅ", {
        x: '1%',
        y: '88.1%',
        w: '7%',
        h: '2%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen",
    });

    slide.addImage({
        path: "public/pinIcon.svg", 
        x: '9.1%',
        y: '87.8%',
        w: '1.3%',
        h: '2.5%',
    });
    slide.addText( profile?.residence || "Bosted", {
        x: '10%',
        y: '88.1%',
        h: '2%',
        w: '10%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen",
    });


    // Second half of the slide
    // the light blue rectangle
    slide.addShape(pptx.ShapeType.roundRect, {
        x: '45%',
        y: '5%',
        w: '53%',
        h: '85%',
        rectRadius: 0.1,
        fill: { color: "DDE4FF" },
    });

    // the content in the light blue rectangle - experiences
    slide.addText(profile.experienceTitle ?? 'Utvalgt erfaring', {
        x: '46%',
        y: '9%',
        w: '45%',
        h: '5%',
        fontSize: 14,
        color: "000000",
        fontFace: "TiemposFineLight",
    });

    experiences(slide, profile);

    // the content in the light blue rectangle - qualifications
    slide.addText(profile.qualificationTitle ?? 'Utdanning, kurs og sertifiseringer', {
        x: '46%',
        y: '60%',
        w: '45%',
        h: '5%',
        fontSize: 14,
        color: "000000",
        fontFace: "TiemposFineLight",
    });

    qualifications(slide, profile);

    // page footer
    slide.addText("www.noaignite.com", {
        x: '0%',
        y: '96%',
        w: '100%',
        h: '2%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen",
        align: "center",
    });

    //exporting the slide
    pptx.writeFile({ fileName: `${fileName(profile)}_OnePagerCV` }).then((fileName) => console.log(`writeFile: ${fileName}`));
}

function fileName (profile: ProfileToRender): string {
    let {name} = profile;
    return name?.replace(/\s+/g, '') || 'NoaIgniteKonsulentprofil'; //regex to remove whitespaces
}

function SkillsChips(pptx: PptxGen, slide: PptxGen.Slide, profile: ProfileToRender) {
    const skills = profile?.skills;
    let row = 0;
    let skillsLenght: number[] = [];
    let skillsXpoint = 0;

    const result = skills?.map((skill) => {
        // one skill
        let skillLength = getWidthOfChip(skill.length);
        // an array of skills
        skillsLenght.push(skillLength);
        
        slide.addShape(pptx.ShapeType.roundRect, {
            x: `${2 + skillsXpoint}%`,
            y: `${32 + row * 6}%`,
            w: `${skillLength}%`,
            h: '5%',
            rectRadius: 2,
            line: {color: '2A45EE', width: 0.5},
        });
        slide.addText(skill || 'Ny ekspertise', {
            x: `${2.2 + skillsXpoint}%`,
            y: `${33.4 + row * 6}%`,
            w: `${skillLength}%`,
            h: '2%',
            fontSize: 6,
            color: "2A45EE",
            fontFace: "NoAAftenScreen",
        });
        skillsXpoint += skillLength +0.5;

        if (skillsXpoint + skillLength > 42) {
            row++;
            skillsXpoint = 0;
        }
        
    });
    
    return result;
}


function getWidthOfChip(skillLength: number): number {
    if (skillLength <= 2) return skillLength * 1.7;  // UX - 2
    if (skillLength === 3) return skillLength * 1.25; // Vue - 3
    if (skillLength === 4) return skillLength * 1.05; // Java - 4
    if (skillLength === 5) return skillLength * 0.85;  // Agile/React - 5

    // For skill lengths above 5, use a decreasing multiplier
    if (skillLength <= 8) return skillLength * 0.75;   // Kotlin/Node.js/Redesign - 6-8
    if (skillLength <= 10) return skillLength * 0.65;  // UI Design/HighCharts - 9-10
    if (skillLength <= 12) return skillLength * 0.585; // Prototyping/User Testing - 11-12
    if (skillLength <= 15) return skillLength * 0.55;  // Ny ekspertise/Grafisk design/Design Thinking - 13-15
    if (skillLength <= 20) return skillLength * 0.53;  // Behovskartlegging/Frontend Development - 17-20
    if (skillLength <= 30) return skillLength * 0.505; // Visuell kommunikasjon/Responsive Web Development - 21-30

    // For skill lengths greater than 30, return a fixed value
    return 0.5;  // Skill length > 30
}

function experiences(slide: PptxGen.Slide, profile: ProfileToRender) {
    const experiences = profile?.experiences;
    let ypoint = [];

    const result = experiences?.map((experience, index) => {
        ypoint = getDescriptionYpoint(experiences, index);

        slide.addText(experience.startDate || '01.01', {
            x: '46%',
            y: `${ypoint[0]}%`, // Last number decides the distance between the experiences
            w: '5%',
            h: '2%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });
        
        slide.addText('-', {
            x: '48.9%',
            y: `${ypoint[0]}%`, // Last number decides the distance between the experiences
            w: '2%',
            h: '2%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });

        slide.addText(experience.endDate || '01.01', {
            x: '49.5%',
            y: `${ypoint[0]}%`, // Last number decides the distance between the experiences
            w: '5%',
            h: '2%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });
        
        slide.addText(':', {
            x: '52.2%',
            y: `${ypoint[0]}%`, // Last number decides the distance between the experiences
            w: '5%',
            h: '2%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });
        
        slide.addText(experience.projectName || 'Prosjektnavn, Kunde', {
            x: '53%',
            y: `${ypoint[0]}%`, // Last number decides the distance between the experiences
            w: '40%',
            h: '2%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold",
            // charSpacing: 1.05,
        });

        slide.addText(experience.description || 'Legg til tekst', {
            x: '46%',
            y: `${ypoint[1]}%`, // Last number decides the distance between the experiences
            w: '50%',
            h: '10%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreen",
            align: "left",
            valign: "top",
        });
    });

    return result; 
}

function getDescriptionYpoint(experiences: ExperienceToRender[], index: number): number[] {
    let result = [];
    let experiencesLength = experiences.length; 
    let descriptionLength = experiences[index].description.length;
    
    // 10 - length: 100-290
    // 14 - length: 290-360
    if (experiencesLength === 1) return [17, 19];
    if (experiencesLength === 2) { // TODO: needs to be adjusted
        console.log('descriptionLength 2 elements:',index, descriptionLength);
        if (descriptionLength <= 290) return [17 + index * 12, 19 + index * 12];
        if (descriptionLength > 290 && descriptionLength <= 360) return [17 + index * 14, 19 + index * 14];
        if (descriptionLength > 360) return [17 + index * 15, 19 + index * 15];
    }
    if (experiencesLength === 3) { //most common
        if (descriptionLength > 120 && descriptionLength <= 250) return [17 + index * 12, 19 + index * 12];
        if (descriptionLength > 250 && descriptionLength <= 360) return [17 + index * 14, 19 + index * 14];
        if (descriptionLength > 360) return [17 + index * 15, 19 + index * 15];
    }
    result = [17 + index * 14, 19 + index * 14];

    return result;

}

function qualifications(slide: PptxGen.Slide, profile: ProfileToRender) {
    const qualifications = profile?.qualifications;

    const result = qualifications?.map((qualification, index) => {
        //  In sanity; choose between "Kurs", "Utdanning" and "Sertifisering"
        slide.addText(qualification.label || 'Kurs:', {
            x: '46%',
            y: `${67 + index * 4}%`,
            w: '9%',
            h: '3%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });

        // TODO: max word/charachters
        slide.addText(qualification.detail || 'Beskrivelse, sted og/eller år', {
            x: `${getDetailXpoint(qualification.label)}%`, // if qualification.label is longer than 6 letters then the needs to be adjusted
            y: `${67 + index * 4}%`,
            w: '45%',
            h: '3%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreen",
            charSpacing: 0.9,
            align: "left",
        });
    });

    return result;
}


function getDetailXpoint(label: string): number {
    if (label === "Kurs") return 49;
    if (label === "Utdanning") return 52;
    if (label === "Sertifisering") return 53;
    return 52.5;
}

