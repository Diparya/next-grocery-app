import { connectDb } from "@/helper/db"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

connectDb()

export async function GET(request){
    let products = []
    try {
        products = await Product.find()
    } catch (error) {
        return NextResponse.json({
            message:'failed to get',
            status:false
        })
    }

    return NextResponse.json(products)
}

export async function POST(request){
    const {p_name,p_unit,p_rate,p_quantity,image_url,belongs} =await request.json()

    const product = new Product({
        p_name,
        p_unit,
        p_rate,
        p_quantity,
        image_url,
        belongs
    })

    try {
        const createdProduct = await product.save()

        const response = NextResponse.json(createdProduct,{
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