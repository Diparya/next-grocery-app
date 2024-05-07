import { connectDb } from "@/helper/db"
import { Category } from "@/models/category"
import { NextResponse } from "next/server"

connectDb()

export async function GET(request){
    let categories = []
    try {
        categories = await Category.find()
    } catch (error) {
        return NextResponse.json({
            message:'failed to get',
            status:false
        })
    }

    return NextResponse.json(categories)
}

export async function POST(request){
    const {c_name,is_approved,is_delete} =await request.json()

    const category = new Category({
        c_name,
        is_approved,
        is_delete
    })

    try {
        const createdCategory = await category.save()

        const response = NextResponse.json(category,{
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