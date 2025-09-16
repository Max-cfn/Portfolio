import { promises as fs } from 'fs';
import path from 'path';

const BASE64_PLACEHOLDER = 'iVBORw0KGgoAAAANSUhEUgAAAlgAAAEYCAYAAABGy7Y2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGP0lEQVR4nO3dQQ2cMBRF0Rs+Z/AfpZgK4bYZgoQOWbdqtadBBCwJNy+7992fu8pdnvDgyAAAAAH4PqRz3EcBAAAAAAD4LvM+AQAAAAD8H5PvAwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADgP0++DwAAAADg/0cAAAD//wMAVOBnHgAAAABJRU5ErkJggg==';

async function main() {
  const buffer = Buffer.from(BASE64_PLACEHOLDER, 'base64');
  const target = path.join(process.cwd(), 'public', 'og-image.png');
  await fs.writeFile(target, buffer);
  console.info(`Image Open Graph générée dans ${target}`);
}

main().catch((error) => {
  console.error('Impossible de générer l\'image OG');
  console.error(error);
  process.exit(1);
});
