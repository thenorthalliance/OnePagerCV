import type { ProfileToRender } from "./types";
import PptxGen from "pptxgenjs";
import profileImg from './assets/profileImg.png';
import pinIcon from './assets/icons/pinIcon.svg';

export function OnePagerCvPpt(profile: ProfileToRender) {
    // console.log('OnePagerCvPpt', profile);
    let pptx = new PptxGen();

    let slide = pptx.addSlide();

    // First half of the slide
    // page header
    slide.addText("Noa Ignite konsulentprofil", {
        x: '1%',
        y: '2.5%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen"
    });

    // Image from remote URL
    slide.addImage({ 
        path: profile.profilePicture?.src|| profileImg,
        x: '1.7%',
        y: '5%',
        w: '11.5%',
        h: '20%',        
    });

    slide.addText( "Fornavn Etternavn", {
        x: '13%',
        y: '17%',
        fontSize: 20,
        color: "000000",
        fontFace: "TiemposFineLightItalic",
    });
    
    slide.addText( "Tittel", {
        x: '13%',
        y: '22.8%',
        fontSize: 15,
        color: "2A45EE",
        fontFace: "TiemposFineLight",
    });

    slide.addText( "Ekspertise innen", {
        x: '1%',
        y: '30%',
        fontSize: 7,
        color: "2A45EE",
        fontFace: "NoAAftenScreenBold",
    });

    SkillsChips(pptx, slide, profile);

    slide.addText( "Om Navn", {
        x: '1%',
        y: '45%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreenBold",
    });

    slide.addText( profile.description || "Legg til tekst", {
        x: '1%',
        y: '49%',
        fontSize: 10,
        color: "000000",
        fontFace: "NoAAftenScreen",
    });
    
    slide.addText( "f. ÅÅÅÅ", {
        x: '1%',
        y: '88.1%',
        h: '2%',
        w: '7%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen",
    });

    slide.addImage({
        path: pinIcon, 
        x: '9.1%',
        y: '87.8%',
        w: '1.3%',
        h: '2.5%',
    });
    slide.addText( "Bosted", {
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
        y: '10%',
        fontSize: 14,
        color: "000000",
        fontFace: "TiemposFineLight"
    });

    experiences(slide, profile);

    // the content in the light blue rectangle - qualifications
    slide.addText(profile.qualificationTitle ?? 'Utdanning, kurs og sertifiseringer', {
        x: '46%',
        y: '60%',
        fontSize: 14,
        color: "000000",
        fontFace: "TiemposFineLight"
    });

    qualifications(slide, profile);

    // page footer
    slide.addText("www.noaignite.com", {
        x: 1,
        y: '96%',
        fontSize: 7,
        color: "000000",
        fontFace: "NoAAftenScreen",
        align: "center",
    });

    //exporting the slide
    pptx.writeFile({ fileName: "Sample Presentation" }).then((fileName) => console.log(`writeFile: ${fileName}`));
}


function SkillsChips(pptx: PptxGen, slide: PptxGen.Slide, profile: ProfileToRender) {
    const skills = profile?.skills;
    let row = 0;
    let skillsLenght: number[] = [];
    let skillsXpoint = 0;

    const result = skills?.map((skill, index) => {
        console.log('skillsXpoint', skillsXpoint);
        // one skill
        let skillLength = getWidthOfChip(skill.length);
        // an array of skills
        skillsLenght.push(skillLength);
        // the x point of the skills
        
        slide.addShape(pptx.ShapeType.roundRect, {
            x: `${2 + skillsXpoint}%`,
            y: `${32 + row * 6}%`,
            w: `${skillLength}%`,
            h: '5%',
            rectRadius: 2,
            line: {color: '2A45EE', width: 0.5},
            // lineSize: 1,
        });
        slide.addText(skill || 'Skill', {
            x: `${2.2 + skillsXpoint}%`,
            y: `${33.4 + row * 6}%`,
            w: `${skillLength}%`,
            h: '2%',
            fontSize: 6,
            color: "2A45EE",
            fontFace: "NoAAftenScreen",
        });
        skillsXpoint += skillLength +0.5;

        if (skillsXpoint + skillLength > 39) {
            console.log('last on row', skillsXpoint + skillLength);
            row++;
            skillsXpoint = 0;
        }
        
    });
    console.log('skillsLenght', skillsLenght);

    return result;
}

function experiences(slide: PptxGen.Slide, profile: ProfileToRender) {
    const experiences = profile?.experiences;

    const result = experiences?.map((experience, index) => {
        
        slide.addText(experience.startDate || '12.66', {
            x: '46%',
            y: `${17 + index * 10}%`,
            w: '5%',
            fontSize: 7,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });
        
        slide.addText('-', {
            x: '48.9%',
            y: `${17 + index * 10}%`,
            w: '2%',
            fontSize: 7,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });

        slide.addText(experience.endDate || '12.77', {
            x: '49.5%',
            y: `${17 + index * 10}%`,
            w: '5%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });

        slide.addText(':', {
            x: '52.2%',
            y: `${17 + index * 10}%`,
            w: '5%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });
        
        slide.addText(experience.projectName || 'Prosjektnavn', {
            x: '53%',
            y: `${17 + index * 10}%`,
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold",
            // charSpacing: 1.05,
        });

        slide.addText(experience.description || 'Beskrivelse', {
            x: '46%',
            y: `${19 + index * 10}%`,
            w: '45%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreen"
        });
    });

    return result; 
}

function qualifications(slide: PptxGen.Slide, profile: ProfileToRender) {
    const qualifications = profile?.qualifications;
    console.log('qualifications', qualifications);

    const result = qualifications?.map((qualification, index) => {
        slide.addText(qualification.label || 'Tittel:', {
            x: '46%',
            y: `${65 + index * 10}%`,
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreenBold"
        });

        slide.addText(qualification.detail || 'Beskrivelse', {
            x: '50%', // if qualification.label is longer than 6 letters then the needs to be adjusted
            y: `${65 + index * 10}%`,
            w: '45%',
            fontSize: 8,
            color: "000000",
            fontFace: "NoAAftenScreen",
            charSpacing: 1.2,
        });
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