/*
  Warnings:

  - Added the required column `firsname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firsname" VARCHAR(50) NOT NULL,
ADD COLUMN     "lastname" VARCHAR(50) NOT NULL;
