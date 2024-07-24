-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "processName" TEXT NOT NULL,
    "sourceInput" TEXT NOT NULL,
    "sourceOutput" TEXT NOT NULL,
    "waterTransfer" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Process_userId_idx" ON "Process"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Process_userId_processName_key" ON "Process"("userId", "processName");

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
