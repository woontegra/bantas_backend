-- CreateTable
CREATE TABLE "GalleryFeatured" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'management_board',
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT,
    "titleAr" TEXT,
    "description" TEXT,
    "descriptionEn" TEXT,
    "descriptionAr" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryFeatured_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryFeatured_type_idx" ON "GalleryFeatured"("type");
