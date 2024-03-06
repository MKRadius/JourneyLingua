-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100) NOT NULL,
    "streak" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MakeASentenceEx" (
    "sentenceId" SERIAL NOT NULL,
    "sentence" VARCHAR(150) NOT NULL,

    CONSTRAINT "MakeASentenceEx_pkey" PRIMARY KEY ("sentenceId")
);

-- CreateTable
CREATE TABLE "ImageToTextEx" (
    "wordId" SERIAL NOT NULL,
    "word" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "subCategory" VARCHAR(50) NOT NULL,
    "imageLink" VARCHAR(100) NOT NULL,

    CONSTRAINT "ImageToTextEx_pkey" PRIMARY KEY ("wordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
