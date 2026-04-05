-- CreateTable
CREATE TABLE "HeroContent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleAr" TEXT,
    "subtitle" TEXT,
    "subtitleEn" TEXT,
    "subtitleAr" TEXT,
    "description" TEXT,
    "descriptionEn" TEXT,
    "descriptionAr" TEXT,
    "ctaText" TEXT,
    "ctaTextEn" TEXT,
    "ctaTextAr" TEXT,
    "ctaLink" TEXT,
    "features" TEXT,
    "featuresEn" TEXT,
    "featuresAr" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSlider" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleAr" TEXT,
    "subtitle" TEXT,
    "subtitleEn" TEXT,
    "subtitleAr" TEXT,
    "ctaText" TEXT,
    "ctaTextEn" TEXT,
    "ctaTextAr" TEXT,
    "ctaLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HeroSlider_order_idx" ON "HeroSlider"("order");
