import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET(request,{params}){
    const { categoryId } = params
    
    try {
        const product = await Product.find({belongs:categoryId})

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