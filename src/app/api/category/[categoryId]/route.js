import { Category } from "@/models/category"
import { NextResponse } from "next/server"

export async function GET(request,{params}){
    const { categoryId } = params
    
    try {
        const category = await Category.findById(categoryId)

        return NextResponse.json({
            category,
            success:true
        })

    } catch (error) {
        return NextResponse.json({
            message:'not finding',
            success:false
        })
    }
}


export async function PUT(request,{params}){
    const { categoryId } = params
    const {c_name} =await request.json()

    try {
        const category = await Category.findById(categoryId)

        category.c_name=c_name

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


export async function DELETE(request, { params }) {
    const { categoryId } = params;

    try {
        const category = await Category.findById(categoryId);

        if (category) {
            category.is_delete = true; // Set is_delete to true
            await category.save(); // Save the updated category
        }

        return NextResponse.json({
            message: 'deleted',
            success: true
        });

    } catch (error) {
        return NextResponse.json({
            message: 'failed to delete',
            success: false
        });
    }
}


// export async function DELETE(request,{params}){
//     const { categoryId } = params
    
//     try {
//         await Category.deleteOne({
//             _id:categoryId
//         })

//         return NextResponse.json({
//             message:'deleted',
//             success:true
//         })

//     } catch (error) {
//         return NextResponse.json({
//             message:'deleted',
//             success:false
//         })
//     }
// }