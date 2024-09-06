// fetch details for dashboard such as current streak, longest streak, lvl,  

import { NextRequest } from "next/server";

export default async function GET(request: NextRequest) {
    return new Response("Hello, Next.js!");
}