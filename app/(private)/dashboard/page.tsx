import { fetchDataLists } from "@/query/lists/data";
import { CurrentUser } from "@/lib/utils";
import { List } from "@/query/lists/definitions";
import MsgPage from "@/components/layout/msgPage";
import CardList from "@/components/list/CardList";
import Header from "./Header";

export default async function Dashboard() {
    const user = await CurrentUser();
    const lists = await fetchDataLists(user.id!);

    return (
        <div className="p-3 sm:p-6">
            <MsgPage />
            <Header count={lists.length} />

            {/* Lista de Repertórios */}
            {lists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {lists.map(async (list: List) => {
                        return (
                            <CardList key={list.id} list={list} />
                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-white/30">
                    <span className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎵</span>
                    <p className="text-base sm:text-lg font-medium">Nenhum repertório ainda</p>
                    <p className="text-xs sm:text-sm mt-1 sm:mt-2">Clique em Novo Repertório para começar</p>
                </div>
            )}
        </div>
    );
}