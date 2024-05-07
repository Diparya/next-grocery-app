import { connectDb } from "@/helper/db"
import { Cart } from "@/models/cart"
import { NextResponse } from "next/server"

connectDb()

export async function GET(request){
    let carts = []
    try {
        carts = await Cart.find()
    } catch (error) {
        return NextResponse.json({
            message:'failed to get',
            status:false
        })
    }

    return NextResponse.json(carts)
}

export async function POST(request){
    const {id,p_name,p_unit,p_rate,p_quantity,belongs} =await request.json()

    const cart = new Cart({
        id,
        p_name,
        p_unit,
        p_rate,
        p_quantity,
        belongs
    })

    try {
        const createdCart = await cart.save()

        const response = NextResponse.json(cart,{
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