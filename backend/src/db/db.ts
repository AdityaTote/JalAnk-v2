import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const connectDB = async () =>{
    await prisma.$connect();
}

const User = prisma.user;
const Profile = prisma.profile;
const WaterTrack = prisma.waterTrack;
const Transac = prisma.process;

export  {
    prisma,
    User,
    Profile,
    WaterTrack,
    Transac,
    connectDB,
}