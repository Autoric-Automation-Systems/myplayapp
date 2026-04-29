
export default function LandPage() {
    return (
        <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#2b1205] to-[#1a0a02] text-white overflow-hidden">
            <div className="relative z-10 text-center p-4">
                <div className="flex flex-col items-center mb-8">
                    <a
                        href="/login"
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Entrar
                    </a>
                </div>
            </div>
            <img
                src="/hero.png"
                alt="Hero"
                className="absolute bottom-0 left-0 right-0 w-full h-auto object-cover opacity-90"
            />
        </div>
    );
}