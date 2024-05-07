import { NextResponse } from "next/server"

export const getResponseMessage = (message,statuscode,successStatus) => {
    return NextResponse.json({
        message:message,
        success:successStatus
    },
    {
        status:statuscode,
    })
}