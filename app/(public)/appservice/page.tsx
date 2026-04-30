import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Termos de Serviço",
    description:
        "Termos de Serviço - Leia os termos e condições para uso da nossa plataforma.",
};

export default function TermsOfServicePage() {
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
                        Termos de Serviço
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Última atualização: {new Date().toLocaleDateString("pt-BR")}
                    </p>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                    {/* 1. Aceitação dos Termos */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            1. Aceitação dos Termos
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Ao acessar ou utilizar nossa plataforma, você confirma que leu,
                            compreendeu e concorda em estar vinculado a estes Termos de
                            Serviço. Caso não concorde com qualquer parte destes termos,
                            você não deve utilizar nossos serviços.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Estes termos aplicam-se a todos os visitantes, usuários e demais
                            pessoas que acessam ou utilizam nossos serviços. Recomendamos a
                            leitura atenta de todas as cláusulas antes de prosseguir com o
                            uso da plataforma.
                        </p>
                    </section>

                    {/* 2. Definições */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            2. Definições
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Para os fins destes Termos de Serviço, considera-se:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                <strong>Plataforma:</strong> o site, aplicativo e todos os
                                serviços oferecidos por nós;
                            </li>
                            <li>
                                <strong>Usuário:</strong> toda pessoa física ou jurídica que
                                acessa ou utiliza a plataforma;
                            </li>
                            <li>
                                <strong>Serviço:</strong> as funcionalidades e recursos
                                disponibilizados através da plataforma;
                            </li>
                            <li>
                                <strong>Conteúdo:</strong> textos, imagens, vídeos, dados e
                                demais materiais disponíveis na plataforma;
                            </li>
                            <li>
                                <strong>Conta:</strong> o registro individual do usuário para
                                acesso a funcionalidades restritas da plataforma.
                            </li>
                        </ul>
                    </section>

                    {/* 3. Cadastro e Conta */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            3. Cadastro e Conta
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Para acessar determinadas funcionalidades da plataforma, pode ser
                            necessário criar uma conta. Ao se registrar, você declara que as
                            informações fornecidas são verdadeiras, precisas e completas, e se
                            compromete a mantê-las atualizadas.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Você é o único responsável pela confidencialidade de suas
                            credenciais de acesso (login e senha) e por todas as atividades
                            realizadas em sua conta. Caso suspeite de uso não autorizado,
                            deverá nos notificar imediatamente.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Reservamo-nos o direito de recusar ou cancelar o registro de
                            qualquer usuário, a nosso exclusivo critério, sem obrigação de
                            fornecer justificativa.
                        </p>
                    </section>

                    {/* 4. Uso Permitido */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            4. Uso Permitido
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Ao utilizar nossa plataforma, você concorda em:
                        </p>
                        <ul className="mt-3 list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>
                                Utilizar os serviços apenas para fins legais e de acordo com
                                estes Termos;
                            </li>
                            <li>
                                Não violar quaisquer leis, regulamentos ou direitos de
                                terceiros;
                            </li>
                            <li>
                                Não interferir ou interromper a operação da plataforma ou
                                servidores;
                            </li>
                            <li>
                                Não tentar acessar áreas restritas ou dados de outros usuários
                                sem autorização;
                            </li>
                            <li>
                                Não enviar ou disseminar vírus, malware ou qualquer outro código
                                malicioso;
                            </li>
                            <li>
                                Não realizar atividades que possam sobrecarregar ou danificar
                                nossa infraestrutura;
                            </li>
                            <li>
                                Não utilizar a plataforma para enviar spam ou comunicações não
                                solicitadas.
                            </li>
                        </ul>
                    </section>

                    {/* 5. Propriedade Intelectual */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            5. Propriedade Intelectual
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Todo o conteúdo disponibilizado na plataforma, incluindo, mas não
                            se limitando a, textos, gráficos, logotipos, ícones, imagens,
                            software e códigos, é de nossa propriedade ou licenciado para nós,
                            e está protegido pelas leis de propriedade intelectual aplicáveis.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Nenhuma parte da plataforma pode ser reproduzida, distribuída,
                            modificada, exibida publicamente ou utilizada sem nossa
                            autorização prévia por escrito, exceto quando expressamente
                            permitido nestes Termos.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            O conteúdo enviado ou publicado por usuários na plataforma
                            permanece de propriedade do usuário, que nos concede uma licença
                            não exclusiva, gratuita e mundial para uso, armazenamento e
                            exibição exclusivamente para os fins de operação e melhoria dos
                            serviços.
                        </p>
                    </section>

                    {/* 6. Limitação de Responsabilidade */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            6. Limitação de Responsabilidade
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Nossa plataforma é fornecida &quot;no estado em que se encontra&quot; e
                            &quot;conforme disponível&quot;, sem garantias de qualquer tipo, expressas
                            ou implícitas. Não garantimos que o serviço será ininterrupto,
                            livre de erros ou totalmente seguro.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Em nenhuma circunstância seremos responsáveis por danos diretos,
                            indiretos, incidentais, especiais, consequenciais ou punitivos
                            decorrentes do uso ou da impossibilidade de uso da plataforma,
                            mesmo que tenhamos sido informados da possibilidade de tais danos.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Esta limitação de responsabilidade aplica-se na máxima extensão
                            permitida pela legislação aplicável. Nada nestes Termos exclui ou
                            limita nossa responsabilidade por danos que não possam ser
                            legalmente excluídos ou limitados.
                        </p>
                    </section>

                    {/* 7. Suspensão e Cancelamento */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            7. Suspensão e Cancelamento
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Podemos suspender ou encerrar seu acesso à plataforma a qualquer
                            momento, sem aviso prévio, em caso de violação destes Termos de
                            Serviço, de conduta inadequada ou por qualquer outra razão, a
                            nosso exclusivo critério.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Você pode cancelar sua conta a qualquer momento, seguindo as
                            instruções disponíveis na plataforma ou entrando em contato
                            conosco. O cancelamento não o isenta de obrigações assumidas
                            anteriormente à data de encerramento.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Disposições que, por sua natureza, devam permanecer vigentes após
                            o término (como propriedade intelectual, limitação de
                            responsabilidade e lei aplicável) continuarão em pleno vigor.
                        </p>
                    </section>

                    {/* 8. Links para Terceiros */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            8. Links para Terceiros
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Nossa plataforma pode conter links para sites ou serviços
                            operados por terceiros. Não endossamos, controlamos ou assumimos
                            responsabilidade pelo conteúdo, políticas ou práticas de
                            privacidade de quaisquer sites de terceiros.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Recomendamos que você leia os termos de serviço e políticas de
                            privacidade de qualquer site de terceiros que visitar.
                        </p>
                    </section>

                    {/* 9. Alterações nos Termos */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            9. Alterações nos Termos
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Reservamo-nos o direito de modificar estes Termos de Serviço a
                            qualquer momento. Alterações significativas serão comunicadas
                            através de aviso na plataforma ou por e-mail, com antecedência
                            razoável.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            O uso continuado da plataforma após a publicação de alterações
                            constitui sua aceitação dos novos termos. Caso não concorde com
                            as alterações, você deve interromper o uso dos serviços e
                            cancelar sua conta.
                        </p>
                    </section>

                    {/* 10. Lei Aplicável */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            10. Lei Aplicável e Foro
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Estes Termos de Serviço serão regidos e interpretados de acordo
                            com as leis da República Federativa do Brasil, independentemente
                            de seus conflitos de disposições legais.
                        </p>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                            Fica eleito o foro da comarca da cidade indicada no preâmbulo
                            como o competente para dirimir quaisquer controvérsias
                            decorrentes destes Termos, com renúncia expressa a qualquer outro
                            foro, por mais privilegiado que seja.
                        </p>
                    </section>

                    {/* 11. Contato */}
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">
                            11. Contato
                        </h2>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                            Caso tenha dúvidas sobre estes Termos de Serviço, entre em
                            contato conosco através dos canais abaixo:
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