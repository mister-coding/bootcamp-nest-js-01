import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    const createUser = await prisma.user.create({
        data:{
            name:faker.internet.userName(),
            email:faker.internet.email(),
            password:faker.internet.password(),
            phone:"1234"
        }
    })
    console.log(`Create user : ${createUser.name}`);
}

main().catch((e)=>{
    console.error(e);
    process.exit(1)
}).finally(async()=>{
    await prisma.$disconnect()
})