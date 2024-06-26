import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
    const body = await request.json();
    const {name, email, password} = body;
    if(!name || !email || !password) {
        return NextResponse.json({message: "Please provide name, email and password"}, {status: 400});
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(existingUser) {
        return NextResponse.json({message: "User already exists"}, {status: 400});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });
    return NextResponse.json({user}, {status: 200});
}