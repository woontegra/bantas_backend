/*
  Warnings:

  - Added the required column `companyName` to the `FooterInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `copyrightText` to the `FooterInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FooterInfo" ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyNameAr" TEXT,
ADD COLUMN     "companyNameEn" TEXT,
ADD COLUMN     "copyrightText" TEXT NOT NULL,
ADD COLUMN     "copyrightTextAr" TEXT,
ADD COLUMN     "copyrightTextEn" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- CreateTable
CREATE TABLE "FooterSocial" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FooterSocial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FooterSocial_order_idx" ON "FooterSocial"("order");
