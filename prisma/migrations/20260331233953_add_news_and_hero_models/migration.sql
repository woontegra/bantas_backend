-- CreateTable
CREATE TABLE "HeroImage" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT,
    "titleEn" TEXT,
    "titleAr" TEXT,
    "description" TEXT,
    "descriptionEn" TEXT,
    "descriptionAr" TEXT,
    "link" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HeroImage_position_key" ON "HeroImage"("position");

-- CreateIndex
CREATE INDEX "HeroImage_position_idx" ON "HeroImage"("position");
