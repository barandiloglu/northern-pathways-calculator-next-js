/*
  Warnings:

  - You are about to drop the `_BlogPostToBlogTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey (with conditional check)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = '_BlogPostToBlogTag_A_fkey') THEN
ALTER TABLE "_BlogPostToBlogTag" DROP CONSTRAINT "_BlogPostToBlogTag_A_fkey";
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = '_BlogPostToBlogTag_B_fkey') THEN
ALTER TABLE "_BlogPostToBlogTag" DROP CONSTRAINT "_BlogPostToBlogTag_B_fkey";
  END IF;
END $$;

-- AlterTable - Add tags column as TEXT array
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Migrate existing tag relationships to tags array (if tables exist)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '_BlogPostToBlogTag') 
     AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'blog_tags') THEN
    UPDATE "blog_posts" 
    SET "tags" = (
      SELECT COALESCE(ARRAY_AGG(bt."name"), ARRAY[]::TEXT[])
      FROM "_BlogPostToBlogTag" bpbt
      JOIN "blog_tags" bt ON bpbt."B" = bt."id"
      WHERE bpbt."A" = "blog_posts"."id"
    )
    WHERE EXISTS (
      SELECT 1 FROM "_BlogPostToBlogTag" bpbt
      WHERE bpbt."A" = "blog_posts"."id"
    );
  END IF;
END $$;

-- DropTable
DROP TABLE IF EXISTS "_BlogPostToBlogTag";
DROP TABLE IF EXISTS "blog_tags";
