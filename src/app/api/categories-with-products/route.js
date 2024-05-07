import { connectDb } from "@/helper/db"
import { Category } from "@/models/category";

import { NextResponse } from "next/server"

connectDb()

export async function GET(request){
    try {
        const categoriesWithProducts = await Category.aggregate([
            {
              $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'belongs',
                as: 'products'
              }
            }
          ]);

          return NextResponse.json(categoriesWithProducts)
    } catch (error) {
        return NextResponse.json({
            message:'failed to get',
            status:false
        })
    }

    
}