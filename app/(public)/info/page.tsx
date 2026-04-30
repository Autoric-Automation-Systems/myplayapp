import MsgPage from "@/components/layout/msgPage";
import { Suspense } from "react";
export default async function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2b1205] to-[#1a0a02] text-white">
            <Suspense fallback={<div>Loading...</div>}>
                <MsgPage />
            </Suspense>
        </div>
    );
}