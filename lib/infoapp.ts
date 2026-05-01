interface InfoAppInterface {
    name: string;
    site: string;
    version: string;
    description: string;
    developer: string;
}

const infoAPP: InfoAppInterface = {
    name: "MyPlayApp",
    site: "https://myplayapp.vercel.app/",
    version: "1.0",
    description: "Aplicativo interativo desenvolvido com Next.js 16, React 19, autenticacao via NextAuth v5, banco de dados Neon (PostgreSQL serverless), e estilizada com Tailwind CSS v4.",
    developer: "https://autoric.com.br",
}

export default infoAPP;