/**
 * One-off script to generate a bcrypt hash of a plain-text password.
 *
 * Usage:
 *   npx ts-node --project tsconfig.scripts.json scripts/hash-password.ts <your-password>
 *
 * Copy the output into ADMIN_PASSWORD_HASH in your .env.local file.
 */
import bcrypt from "bcryptjs";

async function main() {
  const plain = process.argv[2];

  if (!plain) {
    console.error(
      "Usage: npx ts-node --project tsconfig.scripts.json scripts/hash-password.ts <password>",
    );
    process.exit(1);
  }

  const hash = await bcrypt.hash(plain, 12);
  console.log("\n✅ Bcrypt hash (copy into ADMIN_PASSWORD_HASH):\n");
  console.log(hash);
  console.log();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
