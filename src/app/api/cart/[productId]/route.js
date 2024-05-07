import { Cart } from "@/models/cart"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const { productId } = params;

    try {
        // Fetch all products where belongs field matches the given productId
        const products = await Cart.find({ belongs: productId });

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({
            message: 'Failed to fetch products',
            success: false
        });
    }
}

export async function PUT(request,{params}){
    const { productId } = params
    const {p_quantity} =await request.json()

    try {
        const product = await Product.findById(productId)

        product.p_quantity=p_quantity

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
        await Cart.deleteOne({
            id:productId
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


