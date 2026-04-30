import Image from "next/image";
export default function LandPage() {
    return (
        <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#2b1205] to-[#1a0a02] text-white overflow-hidden">
            <div className="relative z-30 text-center ml-50 md:ml-0">
                <a
                    href="/login"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Entrar
                </a>
            </div>
            {/* Desktop */}
            <Image
                width={1920}
                height={1080}
                src="/hero.png"
                alt="Hero"
                priority
                className="hidden md:block absolute bottom-0 left-0 right-0 w-full h-full object-contain opacity-90 pointer-events-none"
            />
            {/* Mobile */}
            <Image
                width={480}
                height={800}
                src="/hero_mobile.png"
                alt="Hero"
                priority
                className="block md:hidden absolute inset-0 mx-auto w-auto h-full max-h-dvh object-contain opacity-90 pointer-events-none"
            />
        </div>
    );
}