import * as fs from "fs";
import * as path from "path";
import { format } from "prettier";

const schemaPath = path.join(process.cwd(), "drizzle", "schema.ts");

async function main() {
  try {
    let content = fs.readFileSync(schemaPath, "utf8");

    // Replace double quotes with single quotes
    content = content.replace(/\"\"/g, '"');

    // Format the code using prettier
    const formattedContent = await format(content, {
      parser: "typescript",
      semi: true,
      singleQuote: false,
      trailingComma: "all",
      printWidth: 100,
      tabWidth: 2,
    });

    fs.writeFileSync(schemaPath, formattedContent);
    console.log("Schema file fixed and formatted successfully!");
  } catch (error) {
    console.error("Error fixing schema:", error);
    process.exit(1);
  }
}

main();
