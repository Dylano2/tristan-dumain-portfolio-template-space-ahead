import fs from "fs";
import path from "path";

// 1. Chemins des dossiers (à ajuster selon ton projet)
const IMAGE_DIR = "./src/assets/images/dessins";
const OUTPUT_DIR = "./src/content/dessins";

// 2. Extensions d'images acceptées
const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function generateMarkdownFromImages() {
  // Vérifie si le dossier d'images existe
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`Le dossier ${IMAGE_DIR} n'existe pas.`);
    return;
  }

  // Crée le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Lit tous les fichiers du dossier d'images
  const files = fs.readdirSync(IMAGE_DIR);

  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();

    if (SUPPORTED_EXTENSIONS.includes(ext)) {
      const fileNameWithoutExt = path.parse(file).name;

      const mdFileName = `${fileNameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;
      const mdFilePath = path.join(OUTPUT_DIR, mdFileName);

      if (!fs.existsSync(mdFilePath)) {
        const markdownContent = `---
title: "${fileNameWithoutExt.replace(/[_-]/g, " ")}"
description: "Dessin automatique de ${fileNameWithoutExt}"
pubDate: ${new Date().toISOString().split("T")[0]}
draft: false
url: "/dessins/${fileNameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, "-")}"
image:
  url: "../../assets/images/dessins/${file}"
  alt: "${fileNameWithoutExt.replace(/[_-]/g, " ")}"
---

Voici mon dessin **${fileNameWithoutExt}**. Vous pouvez ajouter une description textuelle ici si vous le souhaitez !
`;

        fs.writeFileSync(mdFilePath, markdownContent);
        console.log(`✅ Post généré : ${mdFileName}`);
      }
    }
  });
}

generateMarkdownFromImages();
