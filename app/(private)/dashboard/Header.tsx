
import AddList from "@/components/list/Buttons";

export default async function Header({ count }: { count: number }) {
    return (
        <div className="flex items-center justify-between mb-4 sm:mb-8">
            <div>
                <h1 className="text-lg sm:text-2xl font-bold text-orange-400">Meus Repertórios</h1>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5 sm:mt-1">
                    {count} repertório{count !== 1 ? "s" : ""}
                </p>
            </div>
            <AddList />
        </div>

    )
}