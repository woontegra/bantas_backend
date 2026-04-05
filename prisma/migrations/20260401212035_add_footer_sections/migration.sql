/*
  Warnings:

  - You are about to drop the column `category` on the `FooterLink` table. All the data in the column will be lost.
  - You are about to drop the column `href` on the `FooterLink` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `FooterLink` table. All the data in the column will be lost.
  - You are about to drop the column `labelAr` on the `FooterLink` table. All the data in the column will be lost.
  - You are about to drop the column `labelEn` on the `FooterLink` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `FooterLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `FooterLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `FooterLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FooterLink" DROP COLUMN "category",
DROP COLUMN "href",
DROP COLUMN "label",
DROP COLUMN "labelAr",
DROP COLUMN "labelEn",
ADD COLUMN     "sectionId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "titleAr" TEXT,
ADD COLUMN     "titleEn" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FooterSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleAr" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FooterSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FooterSection_order_idx" ON "FooterSection"("order");

-- CreateIndex
CREATE INDEX "FooterLink_sectionId_order_idx" ON "FooterLink"("sectionId", "order");

-- AddForeignKey
ALTER TABLE "FooterLink" ADD CONSTRAINT "FooterLink_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "FooterSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
