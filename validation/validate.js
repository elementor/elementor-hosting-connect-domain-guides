import fs from "fs";
import path from "path";
import { providerSchema } from "./providerSchema.js";
import { guideSchema } from "./guideSchema.js";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validateProviderSchemaInManifest(providerKey, manifest) {
  if (!manifest[providerKey]) {
    return ["Provider not found in manifest"];
  }

  try {
    providerSchema.parse(manifest[providerKey]);
  } catch (e) {
    return ["Errors in the provider schema in the manifest:", ...e.errors];
  }

  return [];
}

function validateGuideSchema(guideDir) {
  // Look for guide.json in language-specific directories
  const languageDirs = fs
    .readdirSync(guideDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => dirent.name !== "assets") // Exclude assets directory
    .map((dirent) => dirent.name);

  if (languageDirs.length === 0) {
    return ["No language directories found"];
  }

  const errors = [];

  for (const lang of languageDirs) {
    const guideFile = path.join(guideDir, lang, "guide.json");
    if (fs.existsSync(guideFile)) {
      const guide = JSON.parse(fs.readFileSync(guideFile, "utf-8"));
      try {
        guideSchema.parse(guide);
      } catch (e) {
        errors.push(`Errors in ${lang}/guide.json:`, ...e.errors);
      }
    } else {
      errors.push(`${lang}/guide.json not found`);
    }
  }

  return errors;
}

function validateProvider(srcPath, providerKey, manifest) {
  const errors = [
    ...validateProviderSchemaInManifest(providerKey, manifest),
    ...validateGuideSchema(path.join(srcPath, providerKey)),
  ];

  if (errors.length > 0) {
    console.log(` ##[group] ❌ Provider: ${providerKey}`);
    errors.forEach((error) => console.log(error));
    console.log("-----------------------------------------------");
    console.log("##[endgroup]");
    return false;
  }

  console.log(`##[group] ✅ Provider: ${providerKey}`);
  console.log("##[endgroup]");
  return true;
}

function checkExtraProvidersInManifest(providerKeys, manifest) {
  const extraProviders = Object.keys(manifest).filter(
    (provider) => !providerKeys.includes(provider),
  );
  if (extraProviders.length > 0) {
    console.log("##[group] ❌ Extra providers in providers.json");
    console.log("extra: ");
    extraProviders.forEach((provider) => console.log("\t" + provider));
    console.log("##[endgroup]");
    return false;
  }
  return true;
}

function validateAll() {
  const srcPath = path.join(__dirname, "../src");
  const providersFile = path.join(srcPath, "providers.json");
  const providers = JSON.parse(fs.readFileSync(providersFile, "utf-8"));
  const srcDir = fs.readdirSync(srcPath);
  const providersKeys = srcDir.filter((dir) => dir !== "providers.json");

  const validations = [
    ...providersKeys.map((providerKey) =>
      validateProvider(srcPath, providerKey, providers),
    ),
    checkExtraProvidersInManifest(providersKeys, providers),
  ];

  const isValid = validations.every((result) => result);

  if (isValid) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

validateAll();
