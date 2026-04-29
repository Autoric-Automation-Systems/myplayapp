import { fetchDataList } from "@/query/lists/data";
import { checkIsPublic } from "@/query/lists/data";
import MsgPage from "@/components/layout/msgPage";
import { redirect } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const isPublic = await checkIsPublic(id);
    if (!isPublic) {
        redirect(
            `/info?title=Informação Importante&message=Este repertório é privado! Solicite ao administrador para ver este repertório&type=info`
        );
        return null;
    }

    const list = await fetchDataList(id);
    if (!list) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2b1205] to-[#1a0a02] text-white">
            <MsgPage />
            <h1>View</h1>
            <span>{list.title}</span>
        </div>
    );
}