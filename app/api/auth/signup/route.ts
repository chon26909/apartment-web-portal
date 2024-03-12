import { PrismaClient } from '@prisma/client';
import bcrypt, { hash } from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        return Response.json({
            message: 'created successfully',
            data: {
                ...newUser
            }
        });
    } catch (error) {
        return Response.json(
            {
                message: 'create failed'
            },
            { status: 500 }
        );
    }
}
