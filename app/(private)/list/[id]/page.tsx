import { fetchDataList } from "@/query/lists/data";
import Header from "@/components/list/Header";
import MsgPage from "@/components/layout/msgPage";
import Blocks from "@/components/block/Blocks";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const list = await fetchDataList(id);

    return (
        <div className="p-3 sm:p-6">
            <MsgPage />
            <Header list={list} />
            <Blocks id={id} />
        </div>
    );
}