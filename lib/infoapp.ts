interface InfoAppInterface {
    name: string;
    site: string;
    version: string;
    tagline: string;
    description: string;
    developer: string;
}

const infoAPP: InfoAppInterface = {
    name: "MyPlayApp",
    site: "https://myplayapp.vercel.app/",
    version: "1.0",
    tagline: "Organize o repertório do show em blocos, com tom, BPM e letra de cada música, e mande um link para a banda.",
    description: "Aplicativo interativo desenvolvido com Next.js 16, React 19, autenticacao via NextAuth v5, banco de dados Neon (PostgreSQL serverless), e estilizada com Tailwind CSS v4.",
    developer: "https://autoric.com.br",
}

export default infoAPP;