import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    description:
        "Política de privacidade - Saiba como coletamos, usamos e protegemos suas informações pessoais.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                        &larr; Voltar ao início
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Política de Privacidade
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Última atualização: {new Date().toLocaleDateString("pt-BR")}
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                    {/* 1. Introdução */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            1. Introdução
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Esta Política de Privacidade descreve como coletamos, usamos,
                            armazenamos e protegemos as informações pessoais dos usuários que
                            acessam e utilizam nossa plataforma. Ao utilizar nossos serviços,
                            você concorda com as práticas descritas neste documento.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Estamos comprometidos em proteger a sua privacidade e garantir a
                            segurança dos seus dados pessoais em conformidade com a Lei Geral
                            de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e demais
                            legislações aplicáveis.
                        </p>
                    </section>

                    {/* 2. Informações que Coletamos */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            2. Informações que Coletamos
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Podemos coletar as seguintes categorias de informações:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Informações de Cadastro:</strong> nome, endereço de
                                e-mail, e outros dados fornecidos no momento do registro ou
                                preenchimento de formulários.
                            </li>
                            <li>
                                <strong>Informações de Uso:</strong> dados sobre como você
                                interage com nossa plataforma, incluindo páginas visitadas,
                                tempo de permanência e funcionalidades utilizadas.
                            </li>
                            <li>
                                <strong>Informações do Dispositivo:</strong> endereço IP, tipo
                                de navegador, sistema operacional e outras informações técnicas
                                do dispositivo utilizado para acessar nossos serviços.
                            </li>
                            <li>
                                <strong>Cookies e Tecnologias Semelhantes:</strong> utilizamos
                                cookies e tecnologias de rastreamento para melhorar sua
                                experiência e analisar o uso da plataforma. Você pode
                                gerenciar suas preferências de cookies nas configurações do
                                seu navegador.
                            </li>
                        </ul>
                    </section>

                    {/* 3. Como Utilizamos suas Informações */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            3. Como Utilizamos suas Informações
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            As informações coletadas são utilizadas para as seguintes
                            finalidades:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                Fornecer, operar e manter nossos serviços e funcionalidades;
                            </li>
                            <li>
                                Personalizar sua experiência e oferecer conteúdo relevante;
                            </li>
                            <li>
                                Comunicar-nos com você, incluindo o envio de notificações sobre
                                alterações em nossos serviços;
                            </li>
                            <li>
                                Melhorar, testar e atualizar nossa plataforma com base na
                                análise de uso;
                            </li>
                            <li>
                                Cumprir obrigações legais e regulatórias aplicáveis;
                            </li>
                            <li>
                                Prevenir fraudes, abusos e garantir a segurança da plataforma.
                            </li>
                        </ul>
                    </section>

                    {/* 4. Compartilhamento de Dados */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            4. Compartilhamento de Dados
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Não vendemos, alugamos ou compartilhamos suas informações pessoais
                            com terceiros para fins de marketing sem o seu consentimento
                            explícito. Podemos compartilhar dados nas seguintes situações:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Prestadores de Serviço:</strong> com empresas que nos
                                auxiliam na operação da plataforma, como serviços de
                                hospedagem, analytics e processamento de pagamentos, desde que
                                estas estejam vinculadas contractualmente a obrigações de
                                confidencialidade;
                            </li>
                            <li>
                                <strong>Obrigação Legal:</strong> quando exigido por lei,
                                ordem judicial ou autoridade regulatória competente;
                            </li>
                            <li>
                                <strong>Consentimento:</strong> mediante sua autorização
                                prévia e explícita para finalidades específicas.
                            </li>
                        </ul>
                    </section>

                    {/* 5. Armazenamento e Segurança */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            5. Armazenamento e Segurança
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Adotamos medidas de segurança técnicas e organizacionais
                            adequadas para proteger suas informações pessoais contra acesso
                            não autorizado, alteração, divulgação ou destruição. Entre essas
                            medidas, incluem-se:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Criptografia de dados em trânsito e em repouso;</li>
                            <li>
                                Controles de acesso rigorosos e autenticação segura;
                            </li>
                            <li>
                                Monitoramento contínuo de segurança e testes de
                                vulnerabilidade;
                            </li>
                            <li>
                                Treinamento periódico de nossa equipe sobre práticas de
                                segurança e proteção de dados.
                            </li>
                        </ul>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Seus dados serão armazenados pelo período necessário para cumprir
                            as finalidades descritas nesta política, salvo quando a legislação
                            exigir prazo superior.
                        </p>
                    </section>

                    {/* 6. Seus Direitos (LGPD) */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            6. Seus Direitos (LGPD)
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Em conformidade com a LGPD, você possui os seguintes direitos em
                            relação aos seus dados pessoais:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Confirmação e Acesso:</strong> saber se tratamos seus
                                dados e obter acesso a eles;
                            </li>
                            <li>
                                <strong>Correção:</strong> solicitar a correção de dados
                                incompletos, inexatos ou desatualizados;
                            </li>
                            <li>
                                <strong>Anonimização, Bloqueio ou Eliminação:</strong> solicitar
                                a anonimização, bloqueio ou eliminação de dados
                                desnecessários ou tratados em desconformidade com a lei;
                            </li>
                            <li>
                                <strong>Portabilidade:</strong> solicitar a portabilidade dos
                                dados a outro fornecedor de serviço;
                            </li>
                            <li>
                                <strong>Eliminação:</strong> solicitar a eliminação dos dados
                                tratados com seu consentimento;
                            </li>
                            <li>
                                <strong>Informação:</strong> ser informado sobre a possibilidade
                                de não fornecer consentimento e as consequências da negativa;
                            </li>
                            <li>
                                <strong>Revogação do Consentimento:</strong> revogar seu
                                consentimento a qualquer momento.
                            </li>
                        </ul>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Para exercer qualquer um desses direitos, entre em contato
                            conosco através dos canais indicados no final desta política.
                            Responderemos à sua solicitação no prazo legal estabelecido.
                        </p>
                    </section>

                    {/* 7. Cookies */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            7. Cookies
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Utilizamos cookies e tecnologias semelhantes para melhorar a
                            funcionalidade da plataforma e analisar padrões de uso. Cookies
                            são pequenos arquivos de texto armazenados no seu dispositivo.
                            Você pode configurar seu navegador para recusar todos os cookies
                            ou indicar quando um cookie está sendo enviado.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Os cookies que utilizamos podem ser classificados como:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Essenciais:</strong> necessários para o funcionamento
                                básico da plataforma;
                            </li>
                            <li>
                                <strong>Analíticos:</strong> ajudam a entender como os
                                usuários interagem com a plataforma;
                            </li>
                            <li>
                                <strong>Funcionais:</strong> permitem lembrar suas
                                preferências e personalizar sua experiência.
                            </li>
                        </ul>
                    </section>

                    {/* 8. Links para Sites de Terceiros */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            8. Links para Sites de Terceiros
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Nossa plataforma pode conter links para sites ou serviços de
                            terceiros. Não nos responsabilizamos pelas práticas de
                            privacidade desses sites. Recomendamos que você leia as
                            políticas de privacidade de cada site que visitar.
                        </p>
                    </section>

                    {/* 9. Alterações nesta Política */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            9. Alterações nesta Política
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente
                            para refletir mudanças em nossas práticas ou em requisitos legais.
                            Notificaremos os usuários sobre alterações significativas através
                            de aviso em nossa plataforma ou por e-mail. Recomendamos que
                            você revise esta política regularmente.
                        </p>
                    </section>

                    {/* 10. Contato */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            10. Contato e Encarregado (DPO)
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Caso tenha dúvidas, comentários ou solicitações relacionadas a
                            esta Política de Privacidade ou ao tratamento de seus dados
                            pessoais, entre em contato conosco através dos canais abaixo:
                        </p>
                        <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
                            <dl className="space-y-3 text-muted-foreground">
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                    <dt className="font-medium text-foreground min-w-28">
                                        E-mail:
                                    </dt>
                                    <dd>
                                        <a
                                            href="mailto:contato@exemplo.com.br"
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        >
                                            autoricbr@gmail.com
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            Esta política foi elaborada em conformidade com a Lei Geral de
                            Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e o
                            Regulamento Geral sobre a Proteção de Dados (GDPR), quando
                            aplicável.
                        </p>
                    </section>
                </div>
            </main>

            <footer className="border-t border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} - Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}