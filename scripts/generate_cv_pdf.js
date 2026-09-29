import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Standard US Letter dimensions (612 x 792 pt)
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const black = rgb(0.1, 0.1, 0.1);
  const darkGray = rgb(0.25, 0.25, 0.25);
  const lightGray = rgb(0.7, 0.7, 0.7);
  const linkBlue = rgb(0.12, 0.45, 0.75);

  function wrapText(text, maxWidth, font, size) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawSectionHeader(page, title, y) {
    page.drawText(title, {
      x: margin,
      y,
      size: 11,
      font: fontBold,
      color: black,
    });
    const lineY = y - 3;
    page.drawLine({
      start: { x: margin, y: lineY },
      end: { x: pageWidth - margin, y: lineY },
      thickness: 0.8,
      color: black,
    });
    return lineY - 14;
  }

  function drawBulletItem(page, text, y, indent = 12) {
    const bullet = '•';
    page.drawText(bullet, {
      x: margin + 2,
      y,
      size: 9,
      font: fontRegular,
      color: black,
    });

    const lines = wrapText(text, contentWidth - indent - 4, fontRegular, 9.2);
    for (let i = 0; i < lines.length; i++) {
      page.drawText(lines[i], {
        x: margin + indent,
        y: y - i * 11.5,
        size: 9.2,
        font: fontRegular,
        color: darkGray,
      });
    }
    return y - lines.length * 11.5 - 2;
  }

  // ===================== PAGE 1 =====================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin - 5;

  // Title / Name
  const name = 'YASSINE BEL HADJ ALI';
  const nameWidth = fontBold.widthOfTextAtSize(name, 19);
  page1.drawText(name, {
    x: (pageWidth - nameWidth) / 2,
    y,
    size: 19,
    font: fontBold,
    color: black,
  });

  y -= 17;
  const subtitle = 'Electrical & Automation Engineering Student | Embedded Systems, IoT & AI';
  const subWidth = fontRegular.widthOfTextAtSize(subtitle, 10);
  page1.drawText(subtitle, {
    x: (pageWidth - subWidth) / 2,
    y,
    size: 10,
    font: fontRegular,
    color: darkGray,
  });

  y -= 14;
  const contactText1 = 'Tunis, Tunisia  ·  +216 58 891 602  ·  ';
  const contactEmail = 'yassinebelhadjali12@gmail.com';
  const w1 = fontRegular.widthOfTextAtSize(contactText1, 9.5);
  const w2 = fontRegular.widthOfTextAtSize(contactEmail, 9.5);
  const totalContactW = w1 + w2;
  const startContactX = (pageWidth - totalContactW) / 2;

  page1.drawText(contactText1, {
    x: startContactX,
    y,
    size: 9.5,
    font: fontRegular,
    color: darkGray,
  });
  page1.drawText(contactEmail, {
    x: startContactX + w1,
    y,
    size: 9.5,
    font: fontRegular,
    color: linkBlue,
  });

  // Section: PROFESSIONAL SUMMARY
  y -= 20;
  y = drawSectionHeader(page1, 'PROFESSIONAL SUMMARY', y);

  const summary =
    'First-year Electrical and Automation Engineering student at École Nationale d\'Ingénieurs de Gabès (ENIG) with hands-on experience in embedded systems, IoT architecture, automation, and applied AI. Proficient in C/C++, Python, ESP32 microcontrollers, MQTT messaging, FastAPI backend integration, and AI-assisted workflow automation. Proven track record in developing functional engineering prototypes, managing operations, and leading student initiatives.';

  const sumLines = wrapText(summary, contentWidth, fontRegular, 9.2);
  for (const line of sumLines) {
    page1.drawText(line, {
      x: margin,
      y,
      size: 9.2,
      font: fontRegular,
      color: darkGray,
    });
    y -= 12;
  }

  // Section: TECHNICAL SKILLS
  y -= 7;
  y = drawSectionHeader(page1, 'TECHNICAL SKILLS', y);

  const skillCategories = [
    { label: 'Programming Languages:', text: 'Python, C, C++' },
    { label: 'Embedded Systems & IoT:', text: 'ESP32, Arduino, Microcontroller Architecture, Sensors, MQTT, Mosquitto' },
    { label: 'Automation & Web Backend:', text: 'FastAPI, REST APIs, Web Development, Dashboards, Git, GitHub' },
    { label: 'AI & Workflow Automation:', text: 'Generative AI, AI-assisted Development, Power Automate, Zapier, Claude Code' },
    { label: 'Engineering & Systems:', text: 'Electrical Systems, Electronics, Automation & Control, Industrial Systems, Robotics' },
    { label: 'Methodologies & Tools:', text: 'System Simulation, Hardware Prototyping, Anomaly Detection, Technical Documentation' },
  ];

  for (const cat of skillCategories) {
    page1.drawText('•', { x: margin + 2, y, size: 9, font: fontRegular, color: black });
    page1.drawText(cat.label, { x: margin + 12, y, size: 9.2, font: fontBold, color: black });
    const labelW = fontBold.widthOfTextAtSize(cat.label + ' ', 9.2);
    page1.drawText(cat.text, { x: margin + 12 + labelW, y, size: 9.2, font: fontRegular, color: darkGray });
    y -= 13;
  }

  // Section: ENGINEERING & AI PROJECTS
  y -= 4;
  y = drawSectionHeader(page1, 'ENGINEERING & AI PROJECTS', y);

  // EnerGuard
  page1.drawText('EnerGuard – Intelligent Industrial Energy Monitoring System', {
    x: margin,
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  const date1 = '2026';
  page1.drawText(date1, {
    x: pageWidth - margin - fontBold.widthOfTextAtSize(date1, 9.8),
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y -= 12;

  page1.drawText('IoT, Embedded Systems, FastAPI, MQTT', {
    x: margin,
    y,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });
  const enig1 = 'ENIG';
  page1.drawText(enig1, {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize(enig1, 9),
    y,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;

  const enerGuardBullets = [
    'Architected an ESP32-based IoT hardware solution to monitor industrial machinery electrical metrics, analyzing power, energy consumption, and power-factor efficiency.',
    'Developed an end-to-end data pipeline routing real-time sensor data via MQTT/Mosquitto protocols to a FastAPI backend and interactive web dashboard.',
    'Implemented machine-level energy analytics and anomaly detection mechanisms to optimize industrial energy usage.',
  ];
  for (const b of enerGuardBullets) {
    y = drawBulletItem(page1, b, y);
  }

  // FloodGuard AI
  y -= 2;
  page1.drawText('FloodGuard AI – Flood-Impact Simulation & Evacuation Support', {
    x: margin,
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  page1.drawText('2026', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2026', 9.8),
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y -= 12;

  page1.drawText('AI, Python, GIS, Route Optimization', {
    x: margin,
    y,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });
  page1.drawText('ENIG', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('ENIG', 9),
    y,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;

  const floodBullets = [
    'Built a decision-support prototype combining flood scenario modeling, road network GIS data, and real-time route recalculation.',
    'Integrated an AI copilot agent to deliver evidence-grounded emergency evacuation explanations and automated tool orchestration.',
    'Processed real-world spatial datasets and open weather APIs while maintaining strict separation between deterministic routing and simulated hazard models.',
  ];
  for (const b of floodBullets) {
    y = drawBulletItem(page1, b, y);
  }

  // Section: WORK EXPERIENCE
  y -= 4;
  y = drawSectionHeader(page1, 'WORK EXPERIENCE', y);

  // IntellDev
  page1.drawText('Founder', { x: margin, y, size: 9.8, font: fontBold, color: black });
  page1.drawText('2026 – Present', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2026 – Present', 9.8),
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y -= 12;
  page1.drawText('IntellDev', { x: margin, y, size: 9, font: fontOblique, color: darkGray });
  page1.drawText('Tunisia', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Tunisia', 9),
    y,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;
  const intellBullets = [
    'Founded and managed a digital solutions initiative specializing in web development, UI/UX design, and digital marketing workflows.',
    'Oversaw technical delivery and client requirements execution across full-stack development projects.',
  ];
  for (const b of intellBullets) {
    y = drawBulletItem(page1, b, y);
  }

  // Engineering Intern - Sotualco
  y -= 2;
  page1.drawText('Engineering Intern', { x: margin, y, size: 9.8, font: fontBold, color: black });
  page1.drawText('2026', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2026', 9.8),
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y -= 12;
  page1.drawText('Sotualco', { x: margin, y, size: 9, font: fontOblique, color: darkGray });
  page1.drawText('Tunisia', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Tunisia', 9),
    y,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;
  const sotualcoBullets = [
    'Analyzed automated production lines, control systems, power distribution units, and heavy electrical machinery.',
    'Investigated the practical integration between electrical, mechanical, and industrial automation components.',
  ];
  for (const b of sotualcoBullets) {
    y = drawBulletItem(page1, b, y);
  }

  // Industrial Observer - Chimie Couleur
  y -= 2;
  page1.drawText('Industrial Observer', { x: margin, y, size: 9.8, font: fontBold, color: black });
  page1.drawText('2026', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2026', 9.8),
    y,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y -= 12;
  page1.drawText('Chimie Couleur', { x: margin, y, size: 9, font: fontOblique, color: darkGray });
  page1.drawText('Tunisia', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Tunisia', 9),
    y,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y -= 11;
  const chimieBullets = [
    'Evaluated automated manufacturing processes, material flow, and supply chain logistics within an industrial plant.',
    'Assessed industrial safety standards, workplace access equipment, and machinery operational procedures.',
  ];
  for (const b of chimieBullets) {
    y = drawBulletItem(page1, b, y);
  }

  // ===================== PAGE 2 =====================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - margin - 15;

  // Customer Service Advisor - Concentrix
  page2.drawText('Customer Service Advisor', { x: margin, y: y2, size: 9.8, font: fontBold, color: black });
  page2.drawText('Aug 2024 – Jan 2025', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('Aug 2024 – Jan 2025', 9.8),
    y: y2,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y2 -= 12;
  page2.drawText('Concentrix (Petro-Canada Account)', { x: margin, y: y2, size: 9, font: fontOblique, color: darkGray });
  page2.drawText('Tunisia', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Tunisia', 9),
    y: y2,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y2 -= 12;
  const concentrixBullets = [
    'Resolved complex customer requests and service queries following strict operational and quality standards.',
    'Utilized SugarCRM, Microsoft Power BI, and Office Suite to maintain accurate data reporting and performance metrics.',
  ];
  for (const b of concentrixBullets) {
    y2 = drawBulletItem(page2, b, y2);
  }

  // Section: EDUCATION
  y2 -= 14;
  y2 = drawSectionHeader(page2, 'EDUCATION', y2);

  // ENIG
  page2.drawText('National Engineering Diploma in Electrical & Automation Engineering', {
    x: margin,
    y: y2,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  page2.drawText('2025 – Present', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2025 – Present', 9.8),
    y: y2,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y2 -= 12;
  page2.drawText('École Nationale d\'Ingénieurs de Gabès (ENIG)', {
    x: margin,
    y: y2,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });
  page2.drawText('Expected Graduation: June 2029', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Expected Graduation: June 2029', 9),
    y: y2,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y2 -= 12;
  y2 = drawBulletItem(
    page2,
    'Core Coursework: Electrical Systems, Electronics, Automation & Control, Industrial Systems, Signal Processing, Numerical Methods, Embedded Programming.',
    y2
  );

  // IPEIG
  y2 -= 6;
  page2.drawText('Preparatory Engineering Cycle – Mathematics & Physics (MP)', {
    x: margin,
    y: y2,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  page2.drawText('2023 – 2025', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2023 – 2025', 9.8),
    y: y2,
    size: 9.8,
    font: fontBold,
    color: black,
  });
  y2 -= 12;
  page2.drawText('Institut Préparatoire aux Études d’Ingénieurs de Gabès (IPEIG)', {
    x: margin,
    y: y2,
    size: 9,
    font: fontOblique,
    color: darkGray,
  });
  page2.drawText('Gabès, Tunisia', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('Gabès, Tunisia', 9),
    y: y2,
    size: 9,
    font: fontRegular,
    color: darkGray,
  });
  y2 -= 14;

  // Section: CERTIFICATIONS & LEADERSHIP
  y2 -= 8;
  y2 = drawSectionHeader(page2, 'CERTIFICATIONS & LEADERSHIP', y2);

  const certLeadership = [
    {
      bold: 'Certification – Generative AI & Workflow Automation (GoMyCode, 2026):',
      rest: 'Applied Generative AI, Power Automate, Zapier, and Claude Code for automated software development workflows.',
    },
    {
      bold: 'Founder & Coordinator – Casa della Musica, ENIG:',
      rest: 'Created and coordinated a university music club, organizing campus events and supporting student performances.',
    },
    {
      bold: 'Head of Internal Affairs – Interact Tunis Paradise:',
      rest: 'Managed internal operations for youth-led community service, social impact, and charity projects.',
    },
    {
      bold: 'Active Member – ENIG Robotics Club:',
      rest: 'Participated in technical robotics initiatives and technical workshops.',
    },
  ];

  for (const item of certLeadership) {
    const fullText = `${item.bold} ${item.rest}`;
    page2.drawText('•', { x: margin + 2, y: y2, size: 9, font: fontRegular, color: black });
    
    // Draw bold prefix and regular rest
    const lines = wrapText(fullText, contentWidth - 16, fontRegular, 9.2);
    for (let i = 0; i < lines.length; i++) {
      page2.drawText(lines[i], {
        x: margin + 12,
        y: y2 - i * 12,
        size: 9.2,
        font: fontRegular,
        color: darkGray,
      });
    }
    y2 -= lines.length * 12 + 4;
  }

  // Section: LANGUAGES
  y2 -= 8;
  y2 = drawSectionHeader(page2, 'LANGUAGES', y2);

  page2.drawText('•', { x: margin + 2, y: y2, size: 9, font: fontRegular, color: black });
  
  const langSpans = [
    { text: 'Arabic: ', bold: true },
    { text: 'Native  ·  ', bold: false },
    { text: 'English: ', bold: true },
    { text: 'Professional Working Proficiency (B2)  ·  ', bold: false },
    { text: 'French: ', bold: true },
    { text: 'Professional Working Proficiency (B2)', bold: false },
  ];

  let curX = margin + 12;
  for (const span of langSpans) {
    const f = span.bold ? fontBold : fontRegular;
    page2.drawText(span.text, {
      x: curX,
      y: y2,
      size: 9.2,
      font: f,
      color: span.bold ? black : darkGray,
    });
    curX += f.widthOfTextAtSize(span.text, 9.2);
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('public/Yassine_Bel_Hadj_Ali_CV.pdf', pdfBytes);
  if (fs.existsSync('dist')) {
    fs.writeFileSync('dist/Yassine_Bel_Hadj_Ali_CV.pdf', pdfBytes);
  }
  console.log('Successfully generated public/Yassine_Bel_Hadj_Ali_CV.pdf with size:', pdfBytes.length);
}

generateCV().catch((err) => {
  console.error('Error generating CV PDF:', err);
  process.exit(1);
});
