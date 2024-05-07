import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET(request,{params}){
    const { productId } = params
    
    try {
        const product = await Product.findById(productId)

        return NextResponse.json({
            product,
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
    const { productId } = params
    const {p_name,p_unit,p_rate,p_quantity,belongs} =await request.json()

    try {
        const product = await Product.findById(productId)

        product.p_name=p_name
        product.p_unit=p_unit
        product.p_rate=p_rate
        product.p_quantity=p_quantity
        product.belongs=belongs

        const updatedProduct = await product.save()

        return NextResponse.json({
            updatedProduct,
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
    const { productId } = params
    
    try {
        await Product.deleteOne({
            _id:productId
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