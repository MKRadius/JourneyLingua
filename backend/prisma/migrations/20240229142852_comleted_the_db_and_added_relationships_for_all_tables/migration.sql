/*
  Warnings:

  - You are about to drop the column `word` on the `ImageToTextEx` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `ImageToTextEx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `ImageToTextEx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordEng` to the `ImageToTextEx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordFin` to the `ImageToTextEx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `MakeASentenceEx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `MakeASentenceEx` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageToTextEx" DROP COLUMN "word",
ADD COLUMN     "exerciseId" INTEGER NOT NULL,
ADD COLUMN     "languageId" INTEGER NOT NULL,
ADD COLUMN     "wordEng" VARCHAR(50) NOT NULL,
ADD COLUMN     "wordFin" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "MakeASentenceEx" ADD COLUMN     "exerciseId" INTEGER NOT NULL,
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Learn" (
    "userId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Learn_pkey" PRIMARY KEY ("userId","languageId")
);

-- CreateTable
CREATE TABLE "Language" (
    "languageId" SERIAL NOT NULL,
    "languageName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("languageId")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "exerciseId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("exerciseId","languageId")
);

-- AddForeignKey
ALTER TABLE "Learn" ADD CONSTRAINT "Learn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learn" ADD CONSTRAINT "Learn_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("languageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("languageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MakeASentenceEx" ADD CONSTRAINT "MakeASentenceEx_exerciseId_languageId_fkey" FOREIGN KEY ("exerciseId", "languageId") REFERENCES "Exercise"("exerciseId", "languageId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToTextEx" ADD CONSTRAINT "ImageToTextEx_exerciseId_languageId_fkey" FOREIGN KEY ("exerciseId", "languageId") REFERENCES "Exercise"("exerciseId", "languageId") ON DELETE RESTRICT ON UPDATE CASCADE;
