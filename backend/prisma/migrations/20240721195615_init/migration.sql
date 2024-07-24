-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "industry" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT 'http://res.cloudinary.com/testuse/image/upload/v1721244441/gspvbkhy7uuugtcudnxb.jpg',
    "address" TEXT NOT NULL,
    "phoneNum" VARCHAR(20) NOT NULL,
    "websiteURL" TEXT NOT NULL,
    "gstNumber" VARCHAR(15),
    "certification" TEXT NOT NULL,
    "registrationNum" VARCHAR(10),
    "taxNum" VARCHAR(20),
    "sourceOfWater" TEXT NOT NULL,
    "employeName" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "contactNum" VARCHAR(20),
    "empolyeEmail" TEXT NOT NULL,
    "credit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterTrack" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL DEFAULT '',
    "waterReceived" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "waterUsed" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
