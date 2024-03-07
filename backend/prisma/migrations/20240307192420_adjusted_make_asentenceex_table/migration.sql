/*
  Warnings:

  - You are about to drop the column `sentence` on the `MakeASentenceEx` table. All the data in the column will be lost.
  - Added the required column `sentenceEng` to the `MakeASentenceEx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentenceFin` to the `MakeASentenceEx` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MakeASentenceEx" DROP COLUMN "sentence",
ADD COLUMN     "sentenceEng" VARCHAR(150) NOT NULL,
ADD COLUMN     "sentenceFin" VARCHAR(150) NOT NULL;
