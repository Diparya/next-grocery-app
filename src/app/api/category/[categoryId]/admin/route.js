import { Category } from "@/models/category"
import { NextResponse } from "next/server"

export async function PUT(request,{params}){
    const { categoryId } = params

    try {
        const category = await Category.findById(categoryId)

        category.is_approved=true

        const updatedCategory = await category.save()

        return NextResponse.json({
            updatedCategory,
            success:true
        })

    } catch (error) {
        return NextResponse.json({
            message:'failed to update',
            success:false
        })
    }
}

export async function DELETE(request,{params}){
    const { categoryId } = params
    
    try {
        await Category.deleteOne({
            _id:categoryId
        })

        return NextResponse.json({
            message:'deleted',
            success:true
        })

    } catch (error) {
        return NextResponse.json({
            message:'deleted',
            success:false
        })
    }
}