import { MyPrisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();    
    try {
        const res = await MyPrisma.enrollment.findMany({
            where: {
                eventId: body.eventid,
            },
            select: {
                status: true,
                attendee: {
                    select: {    
                        id: true,
                        Face: true,
                        fname: true,
                        lname: true,
                        email: true,
                        FaceRegistered: true,
                    },
                }
            }
    })
    return NextResponse.json({res}, { status: 200 });
    
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({}, { status: 500 });
        
    }
    }