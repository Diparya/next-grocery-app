import { connectDb } from "@/helper/db"
import { Demo } from "@/models/demo"
import { NextResponse } from "next/server"

connectDb()

export async function GET(request){
    let demos = []
    try {
        demos = await Demo.find()
    } catch (error) {
        return NextResponse.json({
            message:'failed to get',
            status:false
        })
    }

    return NextResponse.json(demos)
}

export async function POST(request){
    const {p_name,p_unit,p_rate,p_quantity,belongs} =await request.json()

    const demo = new Demo({
        p_name,p_unit,p_rate,p_quantity,belongs
    })

    try {
        const createdCategory = await demo.save()

        const response = NextResponse.json(demo,{
            status:201,
        })

        return response
    } catch (error) {
        return NextResponse.json({
            message:'failed to create',
            status:false
        })
    }

    
}