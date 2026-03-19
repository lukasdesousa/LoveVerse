-- CreateTable
CREATE TABLE "love_message_theme" (
    "id" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "destinataryName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imagesUrl" TEXT[],
    "email" TEXT NOT NULL DEFAULT '',
    "spotifyLink" TEXT,
    "dateInit" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "love_message_theme_pkey" PRIMARY KEY ("id")
);
