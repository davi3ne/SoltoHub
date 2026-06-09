/* ==========================================================================
   Solto Studio Marketing Hub — Application Logic
   Features: Local Storage DB, Wizard, Calendar, Post Editor, Direct AI API Fetch
   ========================================================================== */

// --- Default Demo Data (Preloaded for rich user experience) ---
const DEMO_POSTS = [
    {
        id: "demo-1",
        title: "Febre: quando procurar ajuda médica?",
        channel: "instagram-reels",
        pilar: "alert",
        status: "Agendado",
        date: "2026-06-08",
        time: "18:00",
        hookA: "Seu filho tá com febre e você não sabe se vai pro pronto-socorro ou fica em casa? Deixa eu te ajudar.",
        hookB: "Trate a criança, não o termômetro. Entenda por que o comportamento do seu filho vale mais que o número da febre.",
        caption: "Febre não é uma doença, é a resposta de defesa do corpo! 🌡️\n\nSe o seu filho estiver ativo, brincando e aceitando líquidos, mesmo com febre, você pode observar em casa.\n\n🚨 Mas atenção a esses Sinais de Alerta:\n- Bebê com menos de 3 meses de vida.\n- Criança extremamente apática ou prostrada.\n- Dificuldade para respirar ou costelas afundando.\n- Manchas vermelhas na pele que não somem ao pressionar.\n\nNesses casos, procure atendimento imediato!\n\n↳ Salve esse vídeo para consultar na próxima febre às 2h da manhã.\n\n[Nome do Profissional] | [Sua Profissão] | [CRM/Registro]",
        mediaDesc: "Vídeo de selfie gravado no consultório com um termômetro na mão, em tom acolhedor."
    },
    {
        id: "demo-2",
        title: "Catarro verde precisa de antibiótico?",
        channel: "tiktok",
        pilar: "myth",
        status: "Planejado",
        date: "2026-06-10",
        time: "19:00",
        hookA: "Nem toda criança com tosse e catarro verde precisa de antibiótico. Entenda o mito do catarro colorido.",
        hookB: "Seu filho começou a tossir catarro verde e você correu para pedir antibiótico? Cuidado com a automedicação.",
        caption: "A cor do catarro não define o tratamento! 🟢\n\nÉ comum o catarro começar claro, ficar amarelado e depois esverdeado. Isso é apenas a resposta de defesa natural do organismo (células inflamatórias agindo), não um sinal de que a infecção virou bacteriana.\n\n🚫 Antibiótico trata bactérias, não vírus. O uso desnecessário pode causar resistência bacteriana e efeitos colaterais.\n\nO mais importante é avaliar o estado geral da criança, tempo de sintomas e esforço respiratório.\n\n[Nome do Profissional] | [Sua Profissão] | [CRM/Registro]",
        mediaDesc: "Vídeo explicativo curto quebrando o mito com textos curtos aparecendo na tela."
    },
    {
        id: "demo-3",
        title: "Sinais de alerta na febre",
        channel: "instagram-carousel",
        pilar: "alert",
        status: "Rascunho",
        date: "2026-06-12",
        time: "12:00",
        hookA: "Guia Visual: Sinais que mostram quando a febre do seu filho exige um médico urgente.",
        hookB: "Salve essa lista para nunca entrar em pânico quando o termômetro subir.",
        caption: "Salve esse carrossel para consultar quando precisar! 🚨\n\nComo pais, a febre nos assusta, mas saber o que observar traz paz e segurança. Aqui está a lista dos sinais de perigo real:\n\n1️⃣ Dificuldade de respirar (costelas marcando na inspiração).\n2️⃣ Moleza extrema (mesmo após dar o antitérmico e a temperatura baixar).\n3️⃣ Recusa absoluta de líquidos (perigo de desidratação).\n4️⃣ Manchas vermelhas na pele.\n5️⃣ Bebês com menos de 3 meses de idade.\n\nSempre conte com orientação médica. Proteja a saúde do seu pequeno.\n\n[Nome do Profissional] | [Sua Profissão] | [CRM/Registro]",
        mediaDesc: "Carrossel com 5 slides em tons escuros e violetas, com ícones e textos grandes de fácil leitura."
    },
    {
        id: "demo-4",
        title: "Como fazer lavagem nasal do jeito certo",
        channel: "instagram-reels",
        pilar: "practice",
        status: "Publicado",
        date: "2026-06-03",
        time: "18:00",
        hookA: "Lavagem nasal não afoga o seu bebê se você fizer da forma correta. Veja o passo a passo seguro.",
        hookB: "Dicas de mãe: Como limpar o nariz entupido do seu filho sem choro e sem riscos.",
        caption: "O nariz entupido atrapalha a mamada, o sono e o humor dos pequenos. A lavagem nasal com soro fisiológico é a melhor solução! 💦\n\nPasso a passo:\n1. Deixe o soro em temperatura ambiente ou morno (evite soro gelado).\n2. Coloque a criança sentada ou levemente inclinada para a frente (nunca deitada de costas).\n3. Use seringa com fluxo contínuo e suave (sem pressão excessiva).\n4. Direcione a ponta para a lateral da narina, não para o centro.\n\n↳ Compartilhe com aquela mãe que tem medo de fazer lavagem nasal!\n\n[Nome do Profissional] | [Sua Profissão] | [CRM/Registro]",
        mediaDesc: "Vídeo prático demonstrando a lavagem em um boneco ou mostrando a seringa e a quantidade de soro."
    },
    {
        id: "demo-5",
        title: "O que é IVAS? Gripe constante?",
        channel: "instagram-reels",
        pilar: "explain",
        status: "Publicado",
        date: "2026-06-01",
        time: "18:00",
        hookA: "Seu filho vive resfriado? Entenda o que é IVAS e por que isso acontece tanto na infância.",
        hookB: "Crianças na creche vivem doentes. Devo me preocupar com o sistema imunológico?",
        caption: "Seu filho começou na escola e não para de ter coriza e tosse? 🏫\n\nIsso tem um nome: IVAS (Infecção das Vias Aéreas Superiores). É um termo médico para resfriados comuns, gripes e dores de garganta leves.\n\nNa infância, o sistema imunológico está conhecendo os vírus. É esperado que crianças em idade escolar ou creche tenham até 8 a 10 episódios de IVAS por ano!\n\nO importante é observar se a criança se recupera bem entre os episódios.\n\n[Nome do Profissional] | [Sua Profissão] | [CRM/Registro]",
        mediaDesc: "Gravação estilo selfie explicando com empatia, acalmando o coração das mães."
    },
    {
        id: "demo-6",
        title: "Tosse: quando ela preocupa?",
        channel: "tiktok",
        pilar: "alert",
        status: "Agendado",
        date: "2026-06-15",
        time: "18:00",
        hookA: "Tosse não é uma doença. É um reflexo de defesa. Mas quando ela acende o sinal de alerta?",
        hookB: "Seu filho está tossindo sem parar? Entenda os sinais que indicam que não é apenas um resfriado comum.",
        caption: "A tosse serve para limpar as vias respiratórias de secreção. Mas quando ela é preocupante? 🗣️\n\nPreste atenção se a tosse vier acompanhada de:\n- Chiado ou assobio no peito.\n- Respiração rápida ou costelas afundando.\n- Febre alta por mais de 3 dias.\n- Lábios ou unhas arroxeadas.\n- Crises de engasgo ou vômitos provocados pela tosse.\n\nNesses casos, a avaliação médica é necessária para diagnosticar a causa e indicar o tratamento adequado.\n\n[Nome do Profissional] | [Sua Profissão] | [CRM/Registro]",
        mediaDesc: "Vídeo curto destacando sons respiratórios e mostrando o esforço físico da respiração em ilustrações simples."
    }
];

// --- Default Strategy Topics (Organized by 5 Pillars) ---
const INITIAL_PAUTAS = [
    {
        id: "explain",
        name: "1. Sintomas Comuns Explicados",
        desc: "Ensinar o básico que os pais não sabem. Gera autoridade e alcance orgânico.",
        items: [
            {
                id: "pauta-ivas",
                title: "IVAS (Infecção das Vias Aéreas Superiores)",
                desc: "Gripes, resfriados, nariz escorrendo ou dor de garganta.",
                approaches: [
                    {
                        title: "Seu filho vive gripado? Entenda o que é IVAS",
                        gancho: "Seu filho vive gripado? Talvez você esteja vendo episódios repetidos de IVAS — e isso é muito comum na infância.",
                        mensagem: "IVAS (gripe e resfriado) é comum, mas precisa ser observada com atenção ao estado geral da criança e não apenas às secreções."
                    },
                    {
                        title: "IVAS não é sinônimo de antibiótico",
                        gancho: "Nem toda criança com tosse, catarro e febre precisa de antibiótico.",
                        mensagem: "Grande parte das IVAS é de origem viral. Antibióticos tratam infecções bacterianas e não combatem vírus; o uso incorreto gera resistência."
                    },
                    {
                        title: "Quando uma IVAS deixa de ser só um resfriado?",
                        gancho: "Resfriado em criança é comum, mas esses sinais mostram que pode ser hora de procurar atendimento.",
                        mensagem: "Fique de olho em sinais de alerta: esforço respiratório, recusa de líquidos, apatia persistente e febre por mais de 3 dias."
                    }
                ]
            },
            {
                id: "pauta-geca",
                title: "GECA (Gastroenterocolite Aguda)",
                desc: "Vômitos, diarreia, dor abdominal e febre na infância.",
                approaches: [
                    {
                        title: "GECA: o nome difícil para vômitos e diarreia",
                        gancho: "GECA é um nome complicado para uma situação que muitos pais conhecem: vômitos e diarreia.",
                        mensagem: "A GECA é muito comum em crianças e, na maioria das vezes, é viral. O mais importante é o controle de perdas de líquidos e repouso intestinal."
                    },
                    {
                        title: "O maior perigo da diarreia é a desidratação",
                        gancho: "Na diarreia, o maior perigo muitas vezes não é a diarreia: é a desidratação.",
                        mensagem: "Monitore os sinais de desidratação: boca seca, olhos fundos, ausência de lágrimas ao chorar e ficar mais de 6 horas sem fazer xixi."
                    },
                    {
                        title: "O que observar antes de levar a criança para avaliação",
                        gancho: "Seu filho está com vômitos e diarreia? Essas informações ajudam muito na avaliação.",
                        mensagem: "Anote a frequência de vômitos/evacuações, se aceita soro de reidratação e se mantém a urina normal."
                    }
                ]
            },
            {
                id: "pauta-bronquiolite",
                title: "Bronquiolite / BVA",
                desc: "Infecção viral nos bronquíolos, muito comum em bebês.",
                approaches: [
                    {
                        title: "Bronquiolite começa parecendo uma gripe",
                        gancho: "Bronquiolite pode começar parecendo uma gripe, mas em bebês pequenos merece atenção.",
                        mensagem: "O início da bronquiolite imita um resfriado com coriza e tosse leve, mas pode evoluir com cansaço após 1 a 2 dias."
                    },
                    {
                        title: "Na bronquiolite, olhe para a respiração",
                        gancho: "Na bronquiolite, o mais importante não é só a tosse: é a respiração do bebê.",
                        mensagem: "Fique alerta à respiração rápida, costelas afundando (tiragem), asa do nariz abrindo ao respirar e chiado alto."
                    },
                    {
                        title: "Bronquiolite não costuma ser doença de antibiótico",
                        gancho: "Bronquiolite não costuma ser uma doença de antibiótico.",
                        mensagem: "Como é de causa predominantemente viral (VSR), o tratamento é de suporte: lavagem nasal, hidratação e inalação sob recomendação médica."
                    }
                ]
            },
            {
                id: "pauta-febre",
                title: "Febre",
                desc: "Defesa natural do corpo contra infecções.",
                approaches: [
                    {
                        title: "Febre: quando procurar ajuda médica",
                        gancho: "Seu filho tá com febre e você não sabe se vai pro pronto-socorro ou fica em casa. Deixa eu te ajudar.",
                        mensagem: "Se a criança estiver ativa e aceitando líquidos após a temperatura baixar com antitérmico, pode ser acompanhada em casa. Trate o estado geral, não o termômetro."
                    },
                    {
                        title: "O erro de olhar só para o número",
                        gancho: "Na febre, não olhe só para o termômetro.",
                        mensagem: "Uma febre de 38,5°C com a criança ativa e sorridente preocupa menos que 37,9°C com prostração severa e recusa de água."
                    },
                    {
                        title: "Quando a febre exige avaliação",
                        gancho: "Febre em criança: esses sinais indicam que você deve procurar atendimento.",
                        mensagem: "Urgência se: bebê com menos de 3 meses, febre persistente por mais de 72h, manchas vermelhas na pele ou gemência respiratória."
                    },
                    {
                        title: "Febre alta causa convulsão?",
                        gancho: "Febre alta causa convulsão? Esse é um dos maiores medos dos pais — mas não é exatamente assim.",
                        mensagem: "A convulsão febril tem origem em predisposição genética e na rapidez de subida da temperatura, não apenas no número final de graus."
                    }
                ]
            },
            {
                id: "pauta-tosse",
                title: "Tosse",
                desc: "Mecanismo de proteção para limpar as vias aéreas.",
                approaches: [
                    {
                        title: "Tosse é sintoma, não diagnóstico",
                        gancho: "Tosse não é uma doença. Tosse é um sinal de que algo está acontecendo.",
                        mensagem: "A tosse serve para expelir secreções. Cortá-la sem entender a causa pode mascarar problemas ou piorar a congestão pulmonar."
                    },
                    {
                        title: "Nem toda tosse precisa de xarope",
                        gancho: "Antes de dar xarope para tosse, entenda isso.",
                        mensagem: "A maioria dos xaropes expectorantes ou inibidores não é indicada para crianças pequenas devido a riscos de efeitos adversos. Prefira a hidratação e lavagem nasal."
                    },
                    {
                        title: "Quando a tosse preocupa",
                        gancho: "Tosse em criança é comum, mas esses sinais mudam tudo.",
                        mensagem: "Procure o médico se a tosse vier acompanhada de cansaço respiratório, chiado, febre que ressurge ou se for tosse que impede a criança de dormir ou comer."
                    }
                ]
            },
            {
                id: "pauta-nariz",
                title: "Nariz Entupido",
                desc: "Congestão nasal que dificulta o sono e mamadas.",
                approaches: [
                    {
                        title: "Nariz entupido em criança não é frescura",
                        gancho: "Nariz entupido em criança pequena pode atrapalhar muito mais do que parece.",
                        mensagem: "Bebês têm vias aéreas muito estreitas e respiram preferencialmente pelo nariz. O entupimento prejudica a mamada e impede o sono reparador."
                    },
                    {
                        title: "Nariz entupido não significa antibiótico",
                        gancho: "Seu filho está com nariz entupido e catarro? Isso não significa automaticamente antibiótico.",
                        mensagem: "O catarro esverdeado ou amarelado no fim do resfriado é normal e faz parte da limpeza natural do corpo, sem indicar infecção bacteriana."
                    },
                    {
                        title: "Quando o nariz entupido precisa de avaliação",
                        gancho: "Nariz entupido é comum, mas esses sinais mostram que pode não ser só isso.",
                        mensagem: "Se a congestão impede a amamentação ou ingestão de líquidos, ou se persistir por mais de 10 dias com dor facial ou febre, procure atendimento."
                    }
                ]
            },
            {
                id: "pauta-anemia",
                title: "Anemia na Infância",
                desc: "Prevenção e cuidados com a deficiência de ferro.",
                approaches: [
                    {
                        title: "Anemia em criança nem sempre aparece de forma óbvia",
                        gancho: "Anemia em criança pode ser silenciosa no começo.",
                        mensagem: "Os sintomas incluem palidez sutil, cansaço fácil, menor apetite e irritabilidade. A prevenção começa com a nutrição adequada e exames de rotina."
                    },
                    {
                        title: "Toda anemia é falta de ferro?",
                        gancho: "Toda anemia é falta de ferro? Não necessariamente.",
                        mensagem: "Existem anemias hereditárias, por outras carências de vitaminas ou por inflamações. O diagnóstico preciso evita a suplementação incorreta."
                    },
                    {
                        title: "Ferro: quando usar e por que não usar por conta própria",
                        gancho: "Ferro não é vitamina para usar no chute.",
                        mensagem: "A suplementação profilática tem protocolo específico na infância, mas o excesso de ferro é tóxico. Só use sob orientação médica."
                    }
                ]
            },
            {
                id: "pauta-pele",
                title: "Pele do Recém-Nascido (RN)",
                desc: "Diferenciação de manchas comuns e brotoejas.",
                approaches: [
                    {
                        title: "A pele do recém-nascido muda muito",
                        gancho: "Nem toda manchinha na pele do recém-nascido é motivo para desespero.",
                        mensagem: "Brotoejas, milium e acne neonatal são reações normais de adaptação da pele do bebê ao ambiente e costumam desaparecer sozinhas."
                    },
                    {
                        title: "O erro de passar pomada sem saber o que é",
                        gancho: "Antes de passar pomada na pele do recém-nascido, cuidado.",
                        mensagem: "Automedicação na pele delicada do bebê pode causar dermatites de contato ou reações alérgicas graves. Água e sabão neutro costumam bastar."
                    },
                    {
                        title: "Quando uma mancha no bebê preocupa",
                        gancho: "Mancha na pele do bebê: quando é comum e quando merece avaliação?",
                        mensagem: "Preocupe-se se a lesão apresentar bolhas, pus, manchas roxas que não somem ao toque ou se vier associada a febre ou choro de dor."
                    }
                ]
            },
            {
                id: "pauta-respiracao",
                title: "Respiração do Bebê / Recém-Nascido",
                desc: "Como identificar o padrão respiratório normal do bebê.",
                approaches: [
                    {
                        title: "Recém-nascido respira diferente?",
                        gancho: "Recém-nascido respira diferente, mas nem tudo deve ser considerado normal.",
                        mensagem: "Bebês têm respiração periódica (com pausas curtas) e mais rápida que os adultos. Porém, ruídos frequentes e esforço merecem atenção."
                    },
                    {
                        title: "Como saber se o bebê está fazendo força para respirar",
                        gancho: "Costelas afundando, nariz abrindo e gemência: esses sinais na respiração do bebê merecem atenção.",
                        mensagem: "Tiragem intercostal (afundamento da pele entre as costelas), gemidos e batimento de asa do nariz indicam fadiga respiratória."
                    },
                    {
                        title: "Bebê que cansa para mamar pode estar respirando mal",
                        gancho: "Se o bebê está cansando para mamar, o problema pode não ser só fome.",
                        mensagem: "Se o bebê solta o peito toda hora para respirar, fica suado ou cansado ao mamar, ele pode estar com cansaço respiratório."
                    }
                ]
            },
            {
                id: "pauta-chiado",
                title: "Chiado no Peito (Sibilância)",
                desc: "O famoso 'peito chiando' na infância.",
                approaches: [
                    {
                        title: "Chiado no peito: o que os pais estão ouvindo?",
                        gancho: "Chiado no peito não é tudo igual.",
                        mensagem: "O chiado (sibilância) é um ruído causado pelo estreitamento dos brônquios. Pode indicar bronquiolite, bronquite ou asma, exigindo avaliação médica."
                    },
                    {
                        title: "Todo chiado é asma?",
                        gancho: "Seu filho chiou uma vez. Isso quer dizer que ele tem asma?",
                        mensagem: "Muitos bebês chiam exclusivamente durante episódios de resfriados virais (sibilância transitória) e nunca desenvolverão asma."
                    },
                    {
                        title: "Chiado no peito: quando é preocupante?",
                        gancho: "Doutora, meu filho está com chiado no peito. Isso é preocupante?",
                        mensagem: "Se houver chiado associado a esforço para respirar, lábios arroxeados ou cansaço grave, a ida ao pronto-socorro deve ser imediata."
                    }
                ]
            },
            {
                id: "pauta-otite",
                title: "Otite (Dor de Ouvido)",
                desc: "Infecção ou inflamação do ouvido na infância.",
                approaches: [
                    {
                        title: "Dor de ouvido em criança: pode ser otite?",
                        gancho: "Seu filho está com febre e mexendo na orelha? Pode ser dor de ouvido.",
                        mensagem: "A otite costuma surgir após gripes. Em bebês, o sinal pode ser choro intenso ao deitar e coceira constante na orelha."
                    },
                    {
                        title: "Nem toda otite precisa de antibiótico",
                        gancho: "Toda otite precisa de antibiótico? Não necessariamente.",
                        mensagem: "Muitas otites médias agudas em crianças maiores são virais ou se resolvem sozinhas. A decisão de usar antibiótico exige exame físico minucioso."
                    },
                    {
                        title: "Quando a dor de ouvido preocupa",
                        gancho: "Dor de ouvido em criança: esses sinais merecem avaliação.",
                        mensagem: "Sinais de gravidade: secreção purulenta ou sangue saindo pelo canal auditivo, febre persistente e inchaço ou vermelhidão atrás da orelha."
                    }
                ]
            },
            {
                id: "pauta-garganta",
                title: "Dor de Garganta / Amigdalite",
                desc: "Inflamação da garganta na infância.",
                approaches: [
                    {
                        title: "Dor de garganta: vírus ou bactéria?",
                        gancho: "Garganta inflamada nem sempre significa bactéria.",
                        mensagem: "Nas crianças menores de 3 anos, quase 100% das inflamações de garganta são virais. Placas brancas não significam automaticamente bactéria!"
					},
                    {
                        title: "Garganta inflamada sempre precisa de antibiótico?",
                        gancho: "Garganta inflamada não é sinônimo de antibiótico.",
                        mensagem: "A amigdalite estreptocócica (bacteriana) é mais comum após os 3 anos. O diagnóstico correto evita o uso desnecessário de benzetacil ou amoxicilina."
                    },
                    {
                        title: "Quando a dor de garganta exige avaliação",
                        gancho: "Dor de garganta em criança: quando não é para esperar passar?",
                        mensagem: "Leve ao médico se a criança estiver babando (dificuldade de engolir a própria saliva), recusando qualquer líquido ou com dificuldade para abrir a boca."
                    }
                ]
            }
        ]
    },
    {
        id: "alert",
        name: "2. Sinais de Alerta",
        desc: "Mostrar quando procurar atendimento. Alta utilidade e muito compartilhado.",
        items: [
            {
                id: "pauta-alerta-febre",
                title: "Febre: Quando se Preocupar",
                desc: "Identificação dos sinais críticos durante episódios febris.",
                approaches: [
                    {
                        title: "Sinais de gravidade na febre infantil",
                        gancho: "Febre em si não é doença, mas estes 3 sinais mostram que ela precisa de avaliação rápida.",
                        mensagem: "Fique atento: bebê < 3 meses com febre, febre que não cede após 72 horas ou prostração intensa mesmo após a febre baixar com remédio."
                    }
                ]
            },
            {
                id: "pauta-alerta-tosse",
                title: "Tosse: Quando Preocupar",
                desc: "Identificar quando a tosse se torna um sinal de perigo respiratório.",
                approaches: [
                    {
                        title: "Tosse com cansaço respiratório",
                        gancho: "O problema não é só tossir; é tossir com estes sinais de cansaço no peito.",
                        mensagem: "Se a tosse vier com respiração acelerada, costelas afundando ou lábios arroxeados, a avaliação médica é imediata."
                    }
                ]
            },
            {
                id: "pauta-alerta-desidratacao",
                title: "Diarreia: Sinais de Desidratação",
                desc: "Avaliar o nível de hidratação em quadros de GECA.",
                approaches: [
                    {
                        title: "Como reconhecer a desidratação",
                        gancho: "Na diarreia, o perigo é a desidratação. Você sabe identificar os sinais no seu filho?",
                        mensagem: "Observe se a criança está com a boca muito seca, chora sem ver lágrimas, está muito apática ou passa mais de 6 horas sem fazer xixi."
                    }
                ]
            }
        ]
    },
    {
        id: "myth",
        name: "3. Mitos e Desmistificação",
        desc: "Gerar engajamento e construir autoridade. Alto potencial de compartilhamento.",
        items: [
            {
                id: "pauta-mito-catarro",
                title: "Catarro Verde precisa de Antibiótico?",
                desc: "Desmistificar a coloração do muco nasal.",
                approaches: [
                    {
                        title: "A cor do catarro e a necessidade de antibiótico",
                        gancho: "Catarro verde não é sinônimo de bactéria nem de antibiótico.",
                        mensagem: "O catarro esverdeado é apenas a resposta de defesa (glóbulos brancos em ação). A imensa maioria dos resfriados é viral e não usa antibiótico."
                    }
                ]
            },
            {
                id: "pauta-mito-xarope",
                title: "Tosse precisa de Xarope?",
                desc: "Quebrando a cultura da prescrição automática de xaropes.",
                approaches: [
                    {
                        title: "Xaropes contra a tosse: mocinhos ou vilões?",
                        gancho: "Quer um xarope para cortar a tosse do seu filho? Talvez você esteja fazendo o oposto do ideal.",
                        mensagem: "Automedicar tosse com xaropes, especialmente em menores de 2 anos, é perigoso. Lavagem nasal e mel (para maiores de 1 ano) são alternativas muito melhores."
                    }
                ]
            },
            {
                id: "pauta-mito-lavagem",
                title: "Lavagem Nasal Afoga o Bebê?",
                desc: "Perguntas e receios sobre a higienização com soro.",
                approaches: [
                    {
                        title: "Desmistificando o medo da lavagem nasal",
                        gancho: "Tem medo de afogar seu filho fazendo lavagem nasal? Veja por que isso é um mito.",
                        mensagem: "A lavagem é segura se a criança estiver sentada ou inclinada para a frente e o fluxo for suave. O soro limpa o muco e evita complicações no ouvido."
                    }
                ]
            }
        ]
    },
    {
        id: "practice",
        name: "4. Orientações Práticas",
        desc: "Dar utilidade real. Conteúdo salvável que o pai guarda para usar depois.",
        items: [
            {
                id: "pauta-prat-medir-febre",
                title: "Como Medir e Observar a Febre",
                desc: "Passo a passo prático para manejo doméstico da febre.",
                approaches: [
                    {
                        title: "Manejo seguro da febre infantil",
                        gancho: "Seu filho está com febre? Siga esse roteiro prático antes de tomar qualquer decisão.",
                        mensagem: "Use o termômetro axilar, medique se houver desconforto, dê banhos mornos de imersão e ofereça muito líquido."
                    }
                ]
            },
            {
                id: "pauta-prat-lavagem-passo",
                title: "Passo a Passo da Lavagem Nasal",
                desc: "Tutorial detalhado para mães e pais.",
                approaches: [
                    {
                        title: "Técnica perfeita de lavagem nasal",
                        gancho: "Lavagem nasal sem drama: o guia definitivo e seguro para mães de bebês.",
                        mensagem: "Prepare a seringa com soro morno, incline a criança levemente e aplique de forma contínua mirando na parede lateral do nariz."
                    }
                ]
            }
        ]
    },
    {
        id: "conversion",
        name: "5. Método de Atendimento e Conversão",
        desc: "Mostrar como é sua consulta e gerar agendamento. Transforma seguidores em pacientes.",
        items: [
            {
                id: "pauta-conv-metodo",
                title: "Consulta Focada na Criança: Como Funciona?",
                desc: "Apresentar a proposta de valor do atendimento humanizado.",
                approaches: [
                    {
                        title: "Consulta infantil com escuta e explicação",
                        gancho: "Consulta infantil não deveria ser apenas medir, pesar e passar receita em 15 minutos.",
                        mensagem: "Minhas consultas são demoradas, explicativas e buscam tirar todas as dúvidas para dar segurança aos pais em casa."
                    }
                ]
            },
            {
                id: "pauta-conv-domiciliar",
                title: "Atendimento Domiciliar: Vantagens",
                desc: "Demonstrar o valor de receber a médica em casa.",
                approaches: [
                    {
                        title: "Quando a consulta em casa faz a diferença",
                        gancho: "Sair com bebê doente no trânsito ou esperar em pronto-socorro cheio? Há outra alternativa.",
                        mensagem: "O atendimento domiciliar garante o diagnóstico detalhado com a criança calma em seu próprio ambiente, livre de contaminações de pronto-socorro."
                    }
                ]
            }
        ]
    }
];

// --- App State Store ---
const DEFAULT_PROMPTS = {
    baseContext: `Você é um especialista em marketing médico ético. O cliente é {doctorName}.
Sua especialidade/foco é: {valueProp}.
Público Alvo: {target}.
Respeite a Resolução CFM nº 2.336/2023. Foco em educação em saúde, clareza, empatia e sem promessas absurdas ou jargões técnicos não explicados. Fale em português do Brasil e no tom conversacional, usando quebras de linha e emojis como marcadores.
IMPORTANTE: Escreva de forma puramente educativa, informativa e de bem-estar. Evite usar termos alarmistas ou linguagem que simule prescrição médica, diagnóstico clínico formal ou procedimentos de emergência hospitalar direta (como "prescrever remédios", "diagnóstico de doença", "sinais de perigo extremo", "corra para o pronto-socorro"), para garantir a conformidade ética e evitar acionamento de filtros de segurança de conteúdo de saúde das APIs de IA.
REGRAS CRÍTICAS PARA EVITAR FILTROS DE SEGURANÇA DA IA:
- NUNCA mencione nomes comerciais ou genéricos de medicamentos específicos (como paracetamol, dipirona, ibuprofeno, tylenol, novalgina, prednisona, amoxicilina, etc.) nem dosagens/fórmulas de cálculo de dose.
- Refira-se a medicamentos sempre de forma genérica, por exemplo: "o antitérmico de costume recomendado pelo médico da criança" ou "as orientações medicamentosas do seu pediatra de confiança".
- NUNCA diga para os pais darem remédios específicos em casa; foque em medidas de conforto físico (oferecer líquidos, roupas leves, banho morno, lavagem nasal com soro fisiológico).`,

    reelsStoriesChildScript: `Crie um roteiro de vídeo explicativo completo de 60 a 90 segundos voltado para pais de crianças de 0 a 12 anos sobre o tema: "{theme}".

Instruções para o roteiro:
- Linguagem simples, acolhedora e direta, evitando termos médicos complexos sem explicação.
- Tom empático que acalme os pais, mas mantendo a seriedade quando necessário.
- Foco em ensinar a observar o comportamento da criança (estado geral, nível de atividade, aceitação de líquidos) e não apenas o sintoma isolado.

Estruture o roteiro exatamente nas seguintes seções:
1. GANCHO (0-7s): Conecte instantaneamente com uma dor real dos pais (ex: "Seu filho de repente ficou assim..."). Sem introduções genéricas.
2. EXPLICAÇÃO RÁPIDA (7-25s): Explique de forma simples por que isso acontece no corpo da criança.
3. CUIDADOS GERAIS (25-60s): O que os pais podem fazer em casa de forma simples para trazer conforto à criança.
4. QUANDO OBSERVAR (60-80s): Sinais simples que merecem acompanhamento de perto e quando é bom conversar com o médico de confiança.
5. ENCERRAMENTO & CTA (80-90s): Frase acolhedora de encerramento e assinatura com "{doctorName}".

Adicione ao final 3 sugestões visuais de gravação (ex: ideias de gestos, objetos de apoio para segurar ou edição).`,

    reelsShortConversational: `Crie o roteiro completo de um vídeo curto (Instagram Reels, TikTok ou YouTube Shorts) de 60 a 90 segundos sobre o tema: "{theme}".

Siga estritamente esta estrutura em blocos separados por quebra de linha:
1. GANCHO (0–5s): Uma pergunta ou afirmação direta de dor que o pai/mãe identifica na hora. Sem "Olá pessoal" ou "Hoje vou falar sobre". Direto no problema.
2. CONTEXTO RÁPIDO (5–15s): Uma frase desmistificadora forte em linguagem simples.
3. CONSELHOS SIMPLES (15–50s): O coração do vídeo. Dicas de bem-estar explicadas em linguagem simples e o que observar em casa.
4. REGRA SIMPLES (50–70s): Uma frase resumida e memorável que os pais consigam repetir.
5. CTA + IDENTIFICAÇÃO (70–85s): Chamar para salvar o vídeo e assinar no final com "{doctorName}".

Adicione ao final do roteiro 3 dicas de gravação (ex: tom, postura, iluminação).`,

    singlePostCaption: `Crie a estrutura completa de um Post Único Estático (uma única imagem ou foto com legenda no feed) sobre o tema: "{theme}".

Estruture a resposta exatamente nas seguintes seções:
1. ARTE VISUAL (Criativo): Descreva a ideia da imagem/foto estática recomendada (cores, elementos, conceito visual) e o TÍTULO em destaque que deve ir escrito na arte (headline de alto impacto).
2. LEGENDA DO POST (Caption):
   - GANCHO INICIAL: Uma frase curta (1 linha) de alto impacto e que gere curiosidade imediata nos pais.
   - EXPLICAÇÃO: Uma breve explicação simples sobre o tema.
   - CUIDADOS E DICAS: De 3 a 5 pontos explicativos e práticos de bem-estar (use bullets com emojis adequados).
   - CHAMADA PARA AÇÃO (CTA): Convite a interagir, salvar ou compartilhar.
   - ASSINATURA OBRIGATÓRIA: "{doctorName}".`,

    postThreads: `Crie uma sequência de posts de valor (Thread de 5 a 7 posts de até 500 caracteres cada) sobre o tema: "{theme}".

Siga a estrutura:
Post 1: Gancho forte com problema/verdade desconfortável.
Posts 2 a 5: Dicas, processos ou listas scannables (use números 1️⃣, 2️⃣, 3️⃣). Frases muito curtas.
Post final: Resumo rápido (TLDR), pergunta engajadora e assinatura "{doctorName}".`,

    carouselOutline: `Esboce a estrutura de um post carrossel visual sobre o tema: "{theme}".
Descreva o conteúdo textual de cada slide (de 5 a 7 slides):
Slide 1: Capa (Título chamativo de alta curiosidade).
Slides 2 a 5: Conteúdo prático/educativo (1 dica ou sinal de alerta por slide, bem curto).
Slide 6: Resumo da lição.
Slide 7: Chamada para Ação (CTA) visual (ex: "Salvar para ler depois" ou "Compartilhar com outra mãe").
Inclua a legenda recomendada para acompanhar o post nas redes sociais.`
};

let state = {
    posts: [],
    pautas: [],
    settings: {
        geminiKey: "",
        openaiKey: "",
        supabaseUrl: "",
        supabaseKey: "",
        supabaseBucket: "media",
        prompts: null
    },
    wizard: {
        doctorName: "",
        serviceType: "",
        location: "",
        valueProp: "",
        diferenciais: "",
        pricing: "",
        proof: "",
        targetAudience: "",
        pains: "",
        objections: ""
    },
    aiGenerationsCount: 0
};

// --- Media Upload Helper Variables & Functions ---
let currentUploadedMedia = null;

function showUploadZoneState() {
    const mediaZone = document.getElementById("media-upload-zone");
    const mediaProgress = document.getElementById("media-upload-progress");
    const mediaPreviewContainer = document.getElementById("post-media-preview-container");
    const mediaPreviewBox = document.getElementById("media-preview-box");
    const mediaInput = document.getElementById("post-media-file");

    if (mediaZone) mediaZone.style.display = "flex";
    if (mediaProgress) mediaProgress.style.display = "none";
    if (mediaPreviewContainer) mediaPreviewContainer.style.display = "none";
    if (mediaPreviewBox) mediaPreviewBox.innerHTML = "";
    if (mediaInput) mediaInput.value = "";

    // Re-enable save button
    const saveBtn = document.getElementById("btn-save-post");
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.opacity = "";
        saveBtn.style.cursor = "";
        saveBtn.textContent = "Salvar Post";
    }
}

function showProgressState(text = "Processando...") {
    const mediaZone = document.getElementById("media-upload-zone");
    const mediaProgress = document.getElementById("media-upload-progress");
    const mediaPreviewContainer = document.getElementById("post-media-preview-container");
    const mediaProgressFill = document.getElementById("media-upload-progress-fill");
    const mediaProgressText = document.getElementById("media-upload-progress-text");

    if (mediaZone) mediaZone.style.display = "none";
    if (mediaProgress) mediaProgress.style.display = "flex";
    if (mediaPreviewContainer) mediaPreviewContainer.style.display = "none";
    if (mediaProgressFill) mediaProgressFill.style.width = "0%";
    if (mediaProgressText) mediaProgressText.textContent = text;

    // Disable save button during upload
    const saveBtn = document.getElementById("btn-save-post");
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.style.opacity = "0.6";
        saveBtn.style.cursor = "not-allowed";
        saveBtn.textContent = "Carregando mídia...";
    }
}

function showPreviewState(url, filename, type) {
    const mediaZone = document.getElementById("media-upload-zone");
    const mediaProgress = document.getElementById("media-upload-progress");
    const mediaPreviewContainer = document.getElementById("post-media-preview-container");
    const mediaPreviewBox = document.getElementById("media-preview-box");
    const mediaPreviewFilename = document.getElementById("media-preview-filename");
    const downloadMediaBtn = document.getElementById("btn-download-media");
    const warningBox = document.getElementById("local-media-warning");

    if (mediaZone) mediaZone.style.display = "none";
    if (mediaProgress) mediaProgress.style.display = "none";
    if (mediaPreviewContainer) mediaPreviewContainer.style.display = "flex";
    
    if (mediaPreviewFilename) mediaPreviewFilename.textContent = filename;
    if (downloadMediaBtn) downloadMediaBtn.href = url;
    
    if (mediaPreviewBox) {
        mediaPreviewBox.innerHTML = "";
        if (type === "video") {
            const video = document.createElement("video");
            video.src = url;
            video.controls = true;
            mediaPreviewBox.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = url;
            mediaPreviewBox.appendChild(img);
        }
    }

    if (warningBox) {
        if (url && (url.startsWith("media/") || url.startsWith("blob:"))) {
            warningBox.style.display = "flex";
        } else {
            warningBox.style.display = "none";
        }
    }

    // Re-enable save button
    const saveBtn = document.getElementById("btn-save-post");
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.opacity = "";
        saveBtn.style.cursor = "";
        saveBtn.textContent = "Salvar Post";
    }
}

function uploadFileToSupabase(file, config, onProgress, onSuccess, onError) {
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    // Salva em uma subpasta correspondente ao projectId no bucket
    const url = `${config.supabaseUrl}/storage/v1/object/${config.supabaseBucket}/${projectId}/${filename}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    
    const token = localStorage.getItem('hub_session_token');
    xhr.setRequestHeader('Authorization', `Bearer ${token || config.supabaseKey}`);
    xhr.setRequestHeader('apikey', config.supabaseKey);
    xhr.setRequestHeader('Content-Type', file.type);
    
    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            onProgress(percentComplete);
        }
    };
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const publicUrl = `${config.supabaseUrl}/storage/v1/object/public/${config.supabaseBucket}/${projectId}/${filename}`;
            onSuccess({
                publicUrl,
                filename,
                type: file.type.startsWith('video/') ? 'video' : 'image'
            });
        } else {
            let errorMsg = 'Erro no servidor Supabase';
            try {
                const res = JSON.parse(xhr.responseText);
                errorMsg = res.message || errorMsg;
            } catch(e) {}
            onError(new Error(errorMsg));
        }
    };
    
    xhr.onerror = function() {
        onError(new Error('Erro de conexão ao enviar arquivo.'));
    };
    
    xhr.send(file);
}

function handleMediaSelect(file) {
    const mediaProgressFill = document.getElementById("media-upload-progress-fill");
    const mediaProgressText = document.getElementById("media-upload-progress-text");
    const downloadMediaBtn = document.getElementById("btn-download-media");

    if (isSupabaseMode) {
        showProgressState("Iniciando upload para Supabase...");
        
        const config = {
            supabaseUrl: window.SUPABASE_CONFIG.supabaseUrl,
            supabaseKey: window.SUPABASE_CONFIG.supabaseKey,
            supabaseBucket: window.SUPABASE_CONFIG.supabaseBucket || "media"
        };

        uploadFileToSupabase(
            file,
            config,
            (percent) => {
                if (mediaProgressFill) mediaProgressFill.style.width = `${percent}%`;
                if (mediaProgressText) mediaProgressText.textContent = `Enviando para o servidor: ${percent}%`;
            },
            (result) => {
                currentUploadedMedia = {
                    url: result.publicUrl,
                    filename: result.filename,
                    type: result.type
                };
                showPreviewState(result.publicUrl, result.filename, result.type);
                showToast("Upload concluído com sucesso!");
            },
            (error) => {
                showUploadZoneState();
                showToast(`Erro no upload: ${error.message}`);
                console.error("Supabase Upload Error", error);
            }
        );
    } else if (isLocalServer) {
        // Local Node.js server — upload to /api/projects/:projectId/upload
        showProgressState("Enviando arquivo para o servidor local...");
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/api/projects/${projectId}/upload`, true);
        
        const token = localStorage.getItem('hub_session_token');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                if (mediaProgressFill) mediaProgressFill.style.width = `${percent}%`;
                if (mediaProgressText) mediaProgressText.textContent = `Enviando para o servidor: ${percent}%`;
            }
        };
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const result = JSON.parse(xhr.responseText);
                    currentUploadedMedia = {
                        url: result.url,
                        filename: result.filename,
                        type: result.type
                    };
                    showPreviewState(result.url, result.filename, result.type);
                    showToast("Upload para o servidor concluído com sucesso!");
                } catch(e) {
                    showUploadZoneState();
                    showToast("Erro ao processar resposta do servidor.");
                }
            } else {
                showUploadZoneState();
                showToast("Erro no upload do servidor.");
            }
        };
        
        xhr.onerror = function() {
            showUploadZoneState();
            showToast("Erro de rede ao conectar com o servidor.");
        };
        
        const formData = new FormData();
        formData.append('file', file);
        xhr.send(formData);
        
    } else {
        // Fallback for file:// protocol (local Storage settings check)
        const hasSupabase = state.settings && state.settings.supabaseUrl && state.settings.supabaseKey;
        
        if (hasSupabase) {
            showProgressState("Iniciando upload para Supabase...");
            
            const config = {
                supabaseUrl: state.settings.supabaseUrl,
                supabaseKey: state.settings.supabaseKey,
                supabaseBucket: state.settings.supabaseBucket || "media"
            };

            uploadFileToSupabase(
                file,
                config,
                (percent) => {
                    if (mediaProgressFill) mediaProgressFill.style.width = `${percent}%`;
                    if (mediaProgressText) mediaProgressText.textContent = `Enviando para o servidor: ${percent}%`;
                },
                (result) => {
                    currentUploadedMedia = {
                        url: result.publicUrl,
                        filename: result.filename,
                        type: result.type
                    };
                    showPreviewState(result.publicUrl, result.filename, result.type);
                    showToast("Upload concluído com sucesso!");
                },
                (error) => {
                    showUploadZoneState();
                    showToast(`Erro no upload: ${error.message}`);
                    console.error("Supabase Upload Error", error);
                }
            );
        } else {
            const type = file.type.startsWith("video/") ? "video" : "image";
            const relativeUrl = `media/${file.name}`;
            
            const tempUrl = URL.createObjectURL(file);
            
            currentUploadedMedia = {
                url: relativeUrl,
                filename: file.name,
                type: type
            };
            
            showPreviewState(tempUrl, file.name, type);
            if (downloadMediaBtn) downloadMediaBtn.href = relativeUrl;
            
            showToast(`Modo Local: Salve "${file.name}" na pasta "media/" do seu Google Drive.`);
        }
    }
}

// --- Mobile Sidebar Setup ---
function setupMobileSidebar() {
    const toggleBtn = document.getElementById("btn-toggle-sidebar");
    const closeBtn = document.getElementById("btn-close-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const sidebar = document.querySelector(".sidebar");

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });
    }

    if (closeBtn && sidebar && overlay) {
        closeBtn.addEventListener("click", closeMobileSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeMobileSidebar);
    }
}

function closeMobileSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
}

// --- Theme Toggle (Light/Dark Mode) ---
function setupThemeToggle() {
    const savedTheme = localStorage.getItem("solto_hub_theme") || "dark";
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById("btn-toggle-theme");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("solto_hub_theme", newTheme);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const toggleBtn = document.getElementById("btn-toggle-theme");
    if (toggleBtn) {
        const icon = toggleBtn.querySelector("i");
        if (icon) {
            if (theme === "light") {
                icon.className = "fa-solid fa-moon";
                toggleBtn.title = "Alternar para tema escuro";
            } else {
                icon.className = "fa-solid fa-sun";
                toggleBtn.title = "Alternar para tema claro";
            }
        }
    }
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // AUTH & PROJECT ROUTING GUARD
    // ==========================================
    const sessionToken = localStorage.getItem('hub_session_token');
    const userStr = localStorage.getItem('hub_user');

    if (!sessionToken || !userStr) {
        window.location.href = 'login.html';
        return;
    }

    const loggedUser = JSON.parse(userStr);
    const urlParams = new URLSearchParams(window.location.search);
    let urlProjectId = urlParams.get('project');

    if (!urlProjectId) {
        if (loggedUser.role === 'admin') {
            window.location.href = 'admin.html';
            return;
        } else {
            const firstProj = loggedUser.projects && loggedUser.projects[0];
            if (firstProj) {
                window.location.href = `index.html?project=${firstProj}`;
                return;
            } else {
                alert('Você não tem acesso a nenhum projeto.');
                localStorage.clear();
                window.location.href = 'login.html';
                return;
            }
        }
    } else {
        if (loggedUser.role !== 'admin' && (!loggedUser.projects || !loggedUser.projects.includes(urlProjectId))) {
            const firstProj = loggedUser.projects && loggedUser.projects[0];
            if (firstProj) {
                window.location.href = `index.html?project=${firstProj}`;
            } else {
                window.location.href = 'login.html';
            }
            return;
        }
    }

    // Configura botões de rodapé baseados na role
    const btnBackAdmin = document.getElementById('btn-back-admin');
    if (btnBackAdmin && loggedUser.role === 'admin') {
        btnBackAdmin.style.display = 'flex';
    }

    // Define a função de logout do Hub no escopo global
    window.logoutHub = async function() {
        try {
            if (!isSupabaseMode) {
                await fetch('/api/logout', { method: 'POST' });
            }
            localStorage.removeItem('hub_session_token');
            localStorage.removeItem('hub_user');
            localStorage.removeItem('hub_supabase_mode');
            window.location.href = 'login.html';
        } catch (e) {
            console.error("Erro ao fazer logout:", e);
            window.location.href = 'login.html';
        }
    };

    loadStateFromLocalStorage();
    setupNavigation();
    setupMobileSidebar();
    setupThemeToggle();
    setupWizard();
    setupCalendar();
    setupContentManager();
    setupRoteirosManager();
    setupSettings();
    setupClientSettings();
    setupAIModule();
    setupPautas(); // Setup our new Pautas Library module
    updateDashboardStats();
    
    // Set current date on badge
    const badge = document.getElementById("current-date-badge");
    if (badge) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        badge.textContent = new Date().toLocaleDateString('pt-BR', options);
    }

    // Redirect to wizard when clicking "Editar Plano" button on dashboard
    const editPlanDashBtn = document.getElementById("btn-edit-plan-dash");
    if (editPlanDashBtn) {
        editPlanDashBtn.addEventListener("click", () => {
            const wizardTab = document.querySelector('.nav-item[data-tab="wizard"]');
            if (wizardTab) {
                wizardTab.click();
            }
        });
    }
});

// --- LocalStorage & Server/Cloud Shared Database Functions ---
//
// Three execution contexts:
//   isLocalServer  → running via node server.js on localhost (http://localhost or 127.0.0.1)
//   isCloudMode    → running on Netlify/cloud (https://)
//   file mode      → opened directly as file:// (Google Drive local)
//
const _host = window.location.hostname;
const _proto = window.location.protocol;
const isLocalServer = _proto === 'http:' && (_host === 'localhost' || _host === '127.0.0.1');
const isCloudMode   = _proto === 'https:';
const isServerMode  = isLocalServer;

// Determina se o modo Supabase está ativado (via login bem-sucedido ou config global)
const isSupabaseMode = localStorage.getItem('hub_supabase_mode') === 'true' &&
                       window.SUPABASE_CONFIG && 
                       window.SUPABASE_CONFIG.supabaseUrl && 
                       window.SUPABASE_CONFIG.supabaseKey;

const urlParams = new URLSearchParams(window.location.search);
let projectId = urlParams.get('project');

if (!projectId) {
    try {
        const loggedUser = JSON.parse(localStorage.getItem('hub_user') || '{}');
        if (loggedUser && loggedUser.projects && loggedUser.projects.length > 0) {
            projectId = loggedUser.projects[0];
        }
    } catch (e) {
        console.error("Erro ao obter projeto do usuário logado:", e);
    }
}
if (!projectId) {
    projectId = 'celine-lopes'; // Fallback inicial
}

let initialLoadAbortController = new AbortController();

// ── Supabase state helpers (multi-tenant) ─────────────────────────
function _sbHeaders() {
    const key = window.SUPABASE_CONFIG.supabaseKey;
    const token = localStorage.getItem('hub_session_token');
    return {
        'apikey': key,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}
function _sbStateUrl() {
    return `${window.SUPABASE_CONFIG.supabaseUrl}/rest/v1/app_state?id=eq.${projectId}&select=data`;
}
function _sbStateUpsertUrl() {
    return `${window.SUPABASE_CONFIG.supabaseUrl}/rest/v1/app_state`;
}

async function loadStateFromSupabase() {
    try {
        const res = await fetch(_sbStateUrl(), { headers: _sbHeaders() });
        if (!res.ok) throw new Error('Supabase load failed: ' + res.status);
        const rows = await res.json();
        if (rows && rows.length > 0 && rows[0].data) {
            state = rows[0].data;
            ensureStateDefaults();
            localStorage.setItem("solto_marketing_hub_state", JSON.stringify(state));
            refreshActiveView();
            console.log('State loaded from Supabase for project: ' + projectId);
        } else {
            console.log('Initializing empty state for project in Supabase:', projectId);
            state.posts = [];
            state.pautas = JSON.parse(JSON.stringify(INITIAL_PAUTAS));
            state.roteiros = [];
            ensureStateDefaults();
            saveStateToSupabase(state);
            refreshActiveView();
        }
    } catch (e) {
        console.warn('Could not load state from Supabase, using localStorage cache:', e.message);
    }
}

async function saveStateToSupabase(stateSnapshot) {
    if (!isSupabaseMode) return;
    try {
        await fetch(_sbStateUpsertUrl(), {
            method: 'POST',
            headers: { ..._sbHeaders(), 'Prefer': 'resolution=merge-duplicates' },
            body: JSON.stringify({ id: projectId, data: stateSnapshot, updated_at: new Date().toISOString() })
        });
    } catch (e) {
        console.warn('Could not save state to Supabase:', e.message);
    }
}

function refreshActiveView() {
    const activeTab = document.querySelector(".nav-item.active")?.getAttribute("data-tab") || "dashboard";
    if (activeTab === "calendar") renderCalendar();
    else if (activeTab === "content") renderContentList();
    else if (activeTab === "pautas") renderPautas();
    else if (activeTab === "roteiros") renderRoteirosList();
    else if (activeTab === "dashboard") updateDashboardStats();
}

async function loadProjectInfoFromSupabase() {
    try {
        const key = window.SUPABASE_CONFIG.supabaseKey;
        const token = localStorage.getItem('hub_session_token');
        const res = await fetch(`${window.SUPABASE_CONFIG.supabaseUrl}/rest/v1/projects?id=eq.${projectId}&select=*`, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.ok) {
            const projectsList = await res.json();
            if (projectsList && projectsList.length > 0) {
                const proj = projectsList[0];
                document.getElementById('sidebar-doctor-name').textContent = proj.name;
                document.getElementById('sidebar-doctor-crm').textContent = proj.description || '';
                
                if (proj.color) {
                    document.documentElement.style.setProperty('--primary', proj.color);
                }

                // Atualiza o logo/ícone na sidebar
                const logoImg = document.getElementById('sidebar-client-logo-img');
                const logoIcon = document.getElementById('sidebar-client-icon');
                const logoWrap = document.getElementById('sidebar-client-logo-wrap');
                
                const logoUrl = proj.logo_url || proj.logoUrl;
                if (logoUrl) {
                    logoImg.src = logoUrl;
                    logoImg.style.display = 'block';
                    logoIcon.style.display = 'none';
                    if (logoWrap) logoWrap.style.background = 'transparent';
                } else {
                    logoImg.style.display = 'none';
                    logoIcon.style.display = 'block';
                    logoIcon.className = proj.icon || 'fa-solid fa-user-doctor';
                    if (logoWrap) logoWrap.style.background = 'var(--primary)';
                }
            }
        }
    } catch(e) {
        console.warn("Erro ao obter dados do projeto no Supabase:", e);
    }
}

async function loadProjectInfoLocal() {
    try {
        const token = localStorage.getItem('hub_session_token');
        const res = await fetch(`/api/projects/${projectId}/settings`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            const proj = data.project;
            if (proj) {
                document.getElementById('sidebar-doctor-name').textContent = proj.name;
                document.getElementById('sidebar-doctor-crm').textContent = proj.description || '';
                
                if (proj.color) {
                    document.documentElement.style.setProperty('--primary', proj.color);
                }

                // Atualiza o logo/ícone na sidebar
                const logoImg = document.getElementById('sidebar-client-logo-img');
                const logoIcon = document.getElementById('sidebar-client-icon');
                const logoWrap = document.getElementById('sidebar-client-logo-wrap');
                
                if (proj.logoUrl) {
                    logoImg.src = proj.logoUrl;
                    logoImg.style.display = 'block';
                    logoIcon.style.display = 'none';
                    if (logoWrap) logoWrap.style.background = 'transparent';
                } else {
                    logoImg.style.display = 'none';
                    logoIcon.style.display = 'block';
                    logoIcon.className = proj.icon || 'fa-solid fa-user-doctor';
                    if (logoWrap) logoWrap.style.background = 'var(--primary)';
                }
            }
        }
    } catch(e) {
        console.warn("Erro ao obter dados do projeto no local:", e);
    }
}
// ─────────────────────────────────────────────────────────────────────────────

function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem("solto_marketing_hub_state");
    if (savedState) {
        try {
            state = JSON.parse(savedState);
            ensureStateDefaults();
        } catch (e) {
            console.error("Error parsing localStorage state", e);
        }
    } else {
        state.posts = [];
        state.pautas = JSON.parse(JSON.stringify(INITIAL_PAUTAS));
        state.roteiros = [];
        state.settings = { geminiKey: "", openaiKey: "", supabaseUrl: "", supabaseKey: "", supabaseBucket: "media" };
        saveStateToLocalStorage();
    }

    if (isSupabaseMode) {
        // Netlify / cloud — load from Supabase
        loadStateFromSupabase();
        loadProjectInfoFromSupabase();
    } else if (isLocalServer) {
        // Local Node.js server — fetch project specific state
        const sessionToken = localStorage.getItem('hub_session_token');
        fetch(`/api/projects/${projectId}/state`, { 
            headers: { 'Authorization': `Bearer ${sessionToken}` },
            signal: initialLoadAbortController.signal 
        })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error('Falha ao carregar estado do servidor local');
            })
            .then(serverState => {
                if (serverState && serverState.posts) {
                    state = serverState;
                    ensureStateDefaults();
                    localStorage.setItem("solto_marketing_hub_state", JSON.stringify(state));
                    refreshActiveView();
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log("Initial state load aborted.");
                } else {
                    console.warn("Server DB load error, using local storage cache:", err);
                }
            });
        
        loadProjectInfoLocal();
    }
}

function ensureStateDefaults() {
    if (!state.pautas || state.pautas.length === 0) {
        state.pautas = JSON.parse(JSON.stringify(INITIAL_PAUTAS));
    }
    if (!state.roteiros) {
        state.roteiros = [];
    }
    if (!state.settings) {
        state.settings = { geminiKey: "", openaiKey: "", supabaseUrl: "", supabaseKey: "", supabaseBucket: "media", prompts: { ...DEFAULT_PROMPTS } };
    } else {
        if (state.settings.supabaseBucket === undefined) state.settings.supabaseBucket = "media";
        // Migrate prompts: ensure all keys from DEFAULT_PROMPTS exist in saved state
        if (!state.settings.prompts) {
            state.settings.prompts = { ...DEFAULT_PROMPTS };
        } else {
            for (const key of Object.keys(DEFAULT_PROMPTS)) {
                if (!state.settings.prompts[key]) {
                    state.settings.prompts[key] = DEFAULT_PROMPTS[key];
                }
            }
        }
    }
}

function saveStateToLocalStorage() {
    const snapshot = JSON.parse(JSON.stringify(state)); // deep clone
    localStorage.setItem("solto_marketing_hub_state", JSON.stringify(snapshot));
    
    // Abort any pending initial load to prevent race conditions
    initialLoadAbortController.abort();
    initialLoadAbortController = new AbortController();

    if (isSupabaseMode) {
        // Netlify / cloud — persist to Supabase based on project
        saveStateToSupabase(snapshot);
    } else if (isLocalServer) {
        // Local server — persist to data.json based on project
        const sessionToken = localStorage.getItem('hub_session_token');
        fetch(`/api/projects/${projectId}/state`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
            },
            body: JSON.stringify(snapshot)
        }).catch(err => console.error("Error saving state to server:", err));
    }
}

// --- Toast Notification helper ---
function showToast(text, duration = 3000) {
    const toast = document.getElementById("toast-message");
    const toastText = document.getElementById("toast-text");
    if (toast && toastText) {
        toastText.textContent = text;
        toast.classList.add("active");
        setTimeout(() => {
            toast.classList.remove("active");
        }, duration);
    }
}

// --- Navigation setup ---
function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const panels = document.querySelectorAll(".tab-panel");
    
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabName = item.getAttribute("data-tab");
            
            navItems.forEach(n => n.classList.remove("active"));
            item.classList.add("active");
            
            panels.forEach(p => {
                p.classList.remove("active");
                if (p.id === `view-${tabName}`) {
                    p.classList.add("active");
                }
            });

            // Trigger specific layout redraws if necessary
            if (tabName === "calendar") {
                renderCalendar();
            } else if (tabName === "content") {
                renderContentList();
            } else if (tabName === "pautas") {
                renderPautas();
            } else if (tabName === "roteiros") {
                renderRoteirosList();
            } else if (tabName === "dashboard") {
                updateDashboardStats();
                renderDashboardRecentList();
            }

            // Close mobile sidebar if open
            closeMobileSidebar();
        });
    });

    // JSON export action
    document.getElementById("btn-export-json").addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href",     dataStr);
        downloadAnchor.setAttribute("download", `solto_hub_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Backup JSON exportado com sucesso!");
    });

    // JSON import action
    document.getElementById("import-json-file").addEventListener("change", (e) => {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedState = JSON.parse(event.target.result);
                if (importedState && importedState.posts && importedState.settings) {
                    state = importedState;
                    ensureStateDefaults();
                    saveStateToLocalStorage();
                    showToast("Backup importado com sucesso! Recarregando painel...");
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    showToast("Formato de backup inválido.");
                }
            } catch (err) {
                showToast("Erro ao processar arquivo JSON.");
            }
        };
        if (e.target.files[0]) {
            fileReader.readAsText(e.target.files[0]);
        }
    });
}

// --- Dashboard Stats logic ---
function updateDashboardStats() {
    document.getElementById("stats-total-posts").textContent = state.posts.length;
    document.getElementById("stats-published-posts").textContent = state.posts.filter(p => p.status === "Publicado").length;
    document.getElementById("stats-pending-posts").textContent = state.posts.filter(p => p.status === "Agendado" || p.status === "Planejado").length;
    
    const statsRoteiros = document.getElementById("stats-total-roteiros");
    if (statsRoteiros) {
        statsRoteiros.textContent = (state.roteiros || []).length;
    }
    
    const statsIdealized = document.getElementById("stats-idealized-roteiros");
    if (statsIdealized) {
        statsIdealized.textContent = (state.roteiros || []).filter(r => r.status === "Ideia" || r.status === "Rascunho").length;
    }
    
    const statsRecordingRoteiros = document.getElementById("stats-recording-roteiros");
    if (statsRecordingRoteiros) {
        statsRecordingRoteiros.textContent = (state.roteiros || []).filter(r => r.status === "Para Gravar").length;
    }
    
    const statsEditing = document.getElementById("stats-editing-roteiros");
    if (statsEditing) {
        statsEditing.textContent = (state.roteiros || []).filter(r => r.status === "Gravado" || r.status === "Em Edição").length;
    }
    
    const statsConcluded = document.getElementById("stats-concluded-roteiros");
    if (statsConcluded) {
        statsConcluded.textContent = (state.roteiros || []).filter(r => r.status === "Concluído").length;
    }
    
    const statsAi = document.getElementById("stats-ai-generations");
    if (statsAi) {
        statsAi.textContent = state.aiGenerationsCount || 0;
    }
    
    renderDashboardRecentList();
    renderDashboardPlan();
}

function renderDashboardRecentList() {
    const list = document.getElementById("recent-posts-list");
    if (!list) return;

    // Sort posts by date ascending (or descending, let's do ascending for upcoming)
    const upcoming = state.posts
        .filter(p => p.status !== "Publicado")
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);

    if (upcoming.length === 0) {
        list.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Nenhum post agendado. Comece adicionando no calendário!</td></tr>`;
        return;
    }

    list.innerHTML = upcoming.map(p => {
        const pilarLabels = {
            explain: "1. Sintomas",
            alert: "2. Alerta",
            myth: "3. Mitos",
            practice: "4. Prática",
            conversion: "5. Atendimento"
        };
        const pilarLabel = pilarLabels[p.pilar] || p.pilar;
        
        let chanIcon = '<i class="fa-brands fa-instagram"></i>';
        if (p.channel.includes("threads")) chanIcon = '<i class="fa-brands fa-threads"></i>';
        if (p.channel.includes("tiktok")) chanIcon = '<i class="fa-brands fa-tiktok"></i>';

        const dateFormatted = new Date(p.date + 'T00:00:00').toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'});

        return `
            <tr>
                <td><strong>${dateFormatted}</strong> às ${p.time}</td>
                <td>${p.title}</td>
                <td><span class="badge badge-instagram">${chanIcon} ${p.channel.replace('instagram-', '')}</span></td>
                <td><span class="cal-event-tag pilar-${p.pilar}" style="display:inline-block; max-width:150px;">${pilarLabel}</span></td>
                <td><span class="badge badge-status ${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span></td>
                <td>
                    <div class="dash-actions">
                        <button class="btn-secondary-sm btn-edit-dash-post" data-id="${p.id}" title="Editar Post"><i class="fa-solid fa-pencil"></i></button>
                        ${p.mediaUrl ? `<a href="${p.mediaUrl}" class="btn-primary-sm btn-download-dash-media" download target="_blank" title="Baixar Mídia: ${p.mediaFileName || 'Arquivo'}"><i class="fa-solid fa-download"></i></a>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    // Attach click events
    list.querySelectorAll(".btn-edit-dash-post").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            openPostModal(id);
        });
    });
}

// --- WIZARD (Gerador de Plano) Logic ---
function setupWizard() {
    let currentStep = 1;
    const prevBtn = document.getElementById("btn-wiz-prev");
    const nextBtn = document.getElementById("btn-wiz-next");
    const generateBtn = document.getElementById("btn-wiz-generate");
    const indicators = document.querySelectorAll(".step-indicator");
    const panels = document.querySelectorAll(".wizard-step-panel");

    // Load inputs from state
    if (state.wizard) {
        document.getElementById("wiz-doctor-name").value = state.wizard.doctorName || "";
        document.getElementById("wiz-service-type").value = state.wizard.serviceType || "";
        document.getElementById("wiz-location").value = state.wizard.location || "";
        document.getElementById("wiz-value-prop").value = state.wizard.valueProp || "";
        document.getElementById("wiz-diferenciais").value = state.wizard.diferenciais || "";
        document.getElementById("wiz-pricing").value = state.wizard.pricing || "";
        document.getElementById("wiz-proof").value = state.wizard.proof || "";
        document.getElementById("wiz-target-audience").value = state.wizard.targetAudience || "";
        document.getElementById("wiz-pains").value = state.wizard.pains || "";
        document.getElementById("wiz-objections").value = state.wizard.objections || "";
    }

    function showStep(step) {
        panels.forEach(p => p.classList.remove("active"));
        indicators.forEach(i => {
            i.classList.remove("active", "completed");
            const stepNum = parseInt(i.getAttribute("data-step"));
            if (stepNum === step) {
                i.classList.add("active");
            } else if (stepNum < step) {
                i.classList.add("completed");
            }
        });

        document.getElementById(`step-panel-${step}`).classList.add("active");

        // Button states
        prevBtn.disabled = (step === 1);
        if (step === 4) {
            nextBtn.style.display = "none";
            generateBtn.style.display = "inline-flex";
            compileAndRenderPlan(); // Automatically compile on Step 4
        } else {
            nextBtn.style.display = "inline-flex";
            generateBtn.style.display = "none";
        }
    }

    prevBtn.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentStep < 4) {
            saveWizardInputs();
            currentStep++;
            showStep(currentStep);
        }
    });

    generateBtn.addEventListener("click", () => {
        saveWizardInputs();
        compileAndRenderPlan();
        showToast("Plano de marketing compilado com sucesso!");
    });

    function saveWizardInputs() {
        state.wizard = {
            doctorName: document.getElementById("wiz-doctor-name").value,
            serviceType: document.getElementById("wiz-service-type").value,
            location: document.getElementById("wiz-location").value,
            valueProp: document.getElementById("wiz-value-prop").value,
            diferenciais: document.getElementById("wiz-diferenciais").value,
            pricing: document.getElementById("wiz-pricing").value,
            proof: document.getElementById("wiz-proof").value,
            targetAudience: document.getElementById("wiz-target-audience").value,
            pains: document.getElementById("wiz-pains").value,
            objections: document.getElementById("wiz-objections").value
        };
        saveStateToLocalStorage();
        renderDashboardPlan();
    }

    function compileAndRenderPlan() {
        const w = state.wizard;
        const markdown = `# PLANO DE MARKETING PESSOAL E POSICIONAMENTO ESTRATÉGICO

## 👨‍⚕️ Informações Básicas da Marca
- **Médico:** ${w.doctorName}
- **Serviço Oferecido:** ${w.serviceType}
- **Local de Atendimento:** ${w.location}
- **Preço da Consulta:** ${w.pricing}

---

## 🎯 Proposta de Posicionamento e Proposta de Valor
> "${w.valueProp}"

---

## 👥 Perfil do Cliente Ideal (ICP)
- **Público-Alvo:** ${w.targetAudience}

### Principais Dores e Sintomas do ICP:
${w.pains}

### Objeções Comuns do ICP:
${w.objections}

---

## 💎 Diferenciais Estratégicos & Prova de Autoridade
### Nossos Diferenciais Reais:
${w.diferenciais}

### Elementos de Prova / Credibilidade:
${w.proof}

---

## 📅 Pilares de Conteúdo Recomendados (Mês 1)
1. **Sintomas Comuns Explicados (Pilar 1):** IVAS (gripe), Congestão Nasal, Febre e Tosse.
2. **Sinais de Alerta (Pilar 2):** Critérios visuais de esforço respiratório e desidratação (alta retenção e salvamento).
3. **Mitos e Desmistificação (Pilar 3):** Uso automático de antibióticos e mitos de xaropes.
4. **Orientações Práticas (Pilar 4):** Tutorial de lavagem nasal, uso do termômetro.
5. **Método de Atendimento (Pilar 5):** Explicar como funciona a consulta de escuta ativa e atendimento domiciliar.

---
Documento gerado localmente via Solto Studio Marketing Hub em ${new Date().toLocaleDateString('pt-BR')}.
`;

        document.getElementById("compiled-plan-text").textContent = markdown;

        // Setup download button
        const downloadBtn = document.getElementById("btn-download-plan");
        downloadBtn.onclick = () => {
            const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(markdown);
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href",     dataStr);
            downloadAnchor.setAttribute("download", `plano_marketing_${w.doctorName.split(' ')[1] || 'medico'}.md`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        };

        // Setup copy button
        document.getElementById("btn-copy-plan").onclick = () => {
            navigator.clipboard.writeText(markdown).then(() => {
                showToast("Texto copiado para a área de transferência!");
            });
        };
    }
}

// --- CALENDAR (Calendário Editorial) Logic ---
let calCurrentDate = new Date(2026, 5, 5); // Default start: June 2026 (based on system dates)

function setupCalendar() {
    document.getElementById("btn-cal-prev").addEventListener("click", () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("btn-cal-next").addEventListener("click", () => {
        calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById("filter-channel").addEventListener("change", renderCalendar);
    document.getElementById("filter-pilar").addEventListener("change", renderCalendar);
    
    document.getElementById("btn-new-post-cal").addEventListener("click", () => {
        const todayStr = new Date().toISOString().slice(0, 10);
        openPostModal(null, todayStr);
    });

    renderCalendar();
}

function renderCalendar() {
    const year = calCurrentDate.getFullYear();
    const month = calCurrentDate.getMonth();

    // Set header title
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById("calendar-month-year").textContent = `${months[month]} de ${year}`;

    const grid = document.getElementById("calendar-days-grid");
    if (!grid) return;
    grid.innerHTML = "";

    // Calculate days
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    const totalSlots = 42; // 6 rows * 7 days

    // Active filters
    const filterChan = document.getElementById("filter-channel").value;
    const filterPil = document.getElementById("filter-pilar").value;

    // Render slots
    for (let i = 0; i < totalSlots; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cal-day-cell");

        let dayNumber;
        let dayDateStr;
        let isCurrentMonth = true;

        if (i < firstDayIndex) {
            // Previous month days
            dayNumber = prevLastDay - firstDayIndex + i + 1;
            const prevMonth = month === 0 ? 11 : month - 1;
            const prevYear = month === 0 ? year - 1 : year;
            dayDateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            cell.classList.add("other-month");
            isCurrentMonth = false;
        } else if (i >= firstDayIndex + lastDay) {
            // Next month days
            dayNumber = i - firstDayIndex - lastDay + 1;
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextYear = month === 11 ? year + 1 : year;
            dayDateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            cell.classList.add("other-month");
            isCurrentMonth = false;
        } else {
            // Current month days
            dayNumber = i - firstDayIndex + 1;
            dayDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
            
            // Check if today
            const todayStr = new Date().toISOString().slice(0, 10);
            if (dayDateStr === todayStr) {
                cell.classList.add("today");
            }
        }

        // Cell header (number + add button)
        cell.innerHTML = `
            <div class="day-number-container">
                <span class="day-number">${dayNumber}</span>
                <span class="btn-add-day" data-date="${dayDateStr}" title="Adicionar post neste dia"><i class="fa-solid fa-plus-circle"></i></span>
            </div>
            <div class="day-events"></div>
        `;

        // Render events/posts for this day
        const dayEventsContainer = cell.querySelector(".day-events");
        const dayPosts = state.posts.filter(p => {
            if (p.date !== dayDateStr) return false;
            if (filterChan !== "all" && !p.channel.includes(filterChan)) return false;
            if (filterPil !== "all" && p.pilar !== filterPil) return false;
            return true;
        });

        dayPosts.forEach(post => {
            const tag = document.createElement("div");
            tag.classList.add("cal-event-tag", `pilar-${post.pilar}`);
            
            let chanIcon = '<i class="fa-brands fa-instagram channel-sm-tag"></i>';
            if (post.channel.includes("threads")) chanIcon = '<i class="fa-brands fa-threads channel-sm-tag"></i>';
            if (post.channel.includes("tiktok")) chanIcon = '<i class="fa-brands fa-tiktok channel-sm-tag"></i>';

            tag.innerHTML = `${chanIcon} <span>${post.title}</span>${post.mediaUrl ? ' <i class="fa-solid fa-paperclip" style="margin-left:auto; font-size:9px; opacity:0.8;" title="Contém mídia finalizada"></i>' : ''}`;
            tag.setAttribute("title", `${post.title} (${post.status})`);
            
            tag.addEventListener("click", (e) => {
                e.stopPropagation();
                openPostModal(post.id);
            });

            dayEventsContainer.appendChild(tag);
        });

        // Add day click event to open modal
        cell.querySelector(".btn-add-day").addEventListener("click", (e) => {
            e.stopPropagation();
            openPostModal(null, dayDateStr);
        });

        grid.appendChild(cell);
    }
}

// --- CONTENT MANAGER (Editor de Posts) Logic ---
function setupContentManager() {
    document.getElementById("btn-new-post-mgr").addEventListener("click", () => {
        const todayStr = new Date().toISOString().slice(0, 10);
        openPostModal(null, todayStr);
    });

    document.getElementById("search-posts").addEventListener("input", renderContentList);
    // (status filter removed — Kanban columns serve as status filters)
    

    // Post Form Counter character limits
    const captionTextarea = document.getElementById("post-caption");
    const counterLabel = document.getElementById("char-counter");
    const channelSelect = document.getElementById("post-channel");

    function updateCharCount() {
        const text = captionTextarea.value || "";
        const chan = channelSelect.value;
        let limit = 2200; // Default Instagram Limit
        if (chan === "threads") limit = 500; // Threads Limit
        
        counterLabel.textContent = `${text.length} / ${limit}`;
        if (text.length > limit) {
            counterLabel.style.color = "#ef4444";
        } else {
            counterLabel.style.color = "var(--text-secondary)";
        }
    }

    captionTextarea.addEventListener("input", updateCharCount);
    channelSelect.addEventListener("change", updateCharCount);

    // Drag & Drop / File Input setup for Post Media
    const mediaZone = document.getElementById("media-upload-zone");
    const mediaInput = document.getElementById("post-media-file");
    const removeMediaBtn = document.getElementById("btn-remove-media");

    if (mediaZone && mediaInput) {
        mediaZone.addEventListener("click", () => mediaInput.click());

        mediaZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            mediaZone.style.borderColor = "var(--primary)";
            mediaZone.style.background = "rgba(134, 77, 249, 0.04)";
        });

        ["dragleave", "dragend"].forEach(type => {
            mediaZone.addEventListener(type, () => {
                mediaZone.style.borderColor = "rgba(255, 255, 255, 0.1)";
                mediaZone.style.background = "rgba(255, 255, 255, 0.01)";
            });
        });

        mediaZone.addEventListener("drop", (e) => {
            e.preventDefault();
            mediaZone.style.borderColor = "rgba(255, 255, 255, 0.1)";
            mediaZone.style.background = "rgba(255, 255, 255, 0.01)";
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleMediaSelect(files[0]);
            }
        });

        mediaInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                handleMediaSelect(e.target.files[0]);
            }
        });
    }

    if (removeMediaBtn) {
        removeMediaBtn.addEventListener("click", () => {
            // Delete from Supabase bucket if applicable
            if (currentUploadedMedia?.url) {
                deleteSupabaseFile(currentUploadedMedia.url);
            }
            currentUploadedMedia = { url: null, filename: null, type: null };
            showUploadZoneState();
        });
    }

    // Modal buttons actions
    document.getElementById("btn-close-modal").addEventListener("click", closePostModal);
    document.getElementById("btn-cancel-post").addEventListener("click", closePostModal);
    document.getElementById("btn-save-post").addEventListener("click", savePostForm);
    document.getElementById("btn-delete-post").addEventListener("click", deletePostAction);

    // Prevent accidental page reloads when hitting Enter inside the post form
    const postForm = document.getElementById("post-form");
    if (postForm) {
        postForm.addEventListener("submit", (e) => {
            e.preventDefault();
            savePostForm();
        });
    }
}

function renderContentList() {
    const query = (document.getElementById("search-posts")?.value || "").toLowerCase();

    // Status → column ID mapping
    const colMap = {
        "Rascunho":        "rascunho",
        "Aguardando Arte": "aguardando-arte",
        "Planejado":       "planejado",
        "Agendado":        "agendado",
        "Publicado":       "publicado"
    };

    // Channel helpers
    const chanData = (channel) => {
        if (channel.includes("threads"))  return { icon: "fa-brands fa-threads",   cls: "badge-threads",   label: "Threads" };
        if (channel.includes("tiktok"))   return { icon: "fa-brands fa-tiktok",    cls: "badge-tiktok",    label: "TikTok" };
        return                                   { icon: "fa-brands fa-instagram",  cls: "badge-instagram", label: channel.replace("instagram-", "") };
    };

    const pilarLabels = {
        explain:    "Sintomas",
        alert:      "Alertas",
        myth:       "Mitos",
        practice:   "Dicas Práticas",
        conversion: "Atendimento"
    };

    // Clear all columns
    Object.values(colMap).forEach(colId => {
        const el = document.getElementById("cards-post-" + colId);
        if (el) el.innerHTML = "";
        const cnt = document.getElementById("count-post-" + colId);
        if (cnt) cnt.textContent = "0";
    });

    // Filter & distribute
    const counts = {};
    Object.values(colMap).forEach(c => counts[c] = 0);

    const sorted = [...(state.posts || [])].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(p => {
        const colId = colMap[p.status] || "rascunho";
        const container = document.getElementById("cards-post-" + colId);
        if (!container) return;

        // Text search
        if (query) {
            const haystack = (p.title + " " + p.caption + " " + (p.hookA||"") + " " + (p.hookB||"")).toLowerCase();
            if (!haystack.includes(query)) return;
        }

        counts[colId] = (counts[colId] || 0) + 1;

        const ch = chanData(p.channel);
        const pilarLabel = pilarLabels[p.pilar] || p.pilar;
        const dateStr = p.date
            ? new Date(p.date + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
            : "—";

        // Hook preview (first line only)
        const hookPreview = p.hookA
            ? `<div class="post-kcard-hook"><i class="fa-solid fa-quote-left"></i> ${p.hookA}</div>`
            : "";

        // Caption snippet
        const captionSnippet = p.caption
            ? `<div class="post-kcard-caption">${p.caption}</div>`
            : "";

        // Media badge
        const mediaBadge = p.mediaUrl
            ? `<span class="post-kcard-media-badge" title="Criativo pronto"><i class="fa-solid fa-photo-film"></i></span>`
            : "";

        const card = document.createElement("div");
        card.className = "post-kanban-card";
        card.innerHTML = `
            <div class="post-kcard-header">
                <h3 class="post-kcard-title">${p.title}</h3>
                ${mediaBadge}
            </div>

            <div class="post-kcard-meta">
                <span class="badge ${ch.cls}"><i class="${ch.icon}"></i> ${ch.label}</span>
                <span class="cal-event-tag pilar-${p.pilar} post-kcard-pilar">${pilarLabel}</span>
                <span class="post-kcard-date"><i class="fa-regular fa-calendar"></i> ${dateStr} ${p.time ? "· " + p.time : ""}</span>
            </div>

            ${hookPreview}
            ${captionSnippet}

            <div class="post-kcard-footer">
                <button class="btn-roteiro-action btn-edit-post" data-id="${p.id}" title="Editar">
                    <i class="fa-solid fa-pencil"></i> Editar
                </button>
                <button class="btn-roteiro-action btn-duplicate-post" data-id="${p.id}" title="Duplicar">
                    <i class="fa-solid fa-copy"></i>
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    // Update counts & show empty states
    Object.entries(colMap).forEach(([status, colId]) => {
        const cnt = document.getElementById("count-post-" + colId);
        if (cnt) cnt.textContent = counts[colId] || 0;

        const container = document.getElementById("cards-post-" + colId);
        if (container && container.children.length === 0) {
            container.innerHTML = `<div class="pipeline-empty-state">Nenhum post aqui ainda.</div>`;
        }
    });

    // Attach click handlers
    document.querySelectorAll("#posts-pipeline .btn-edit-post").forEach(btn => {
        btn.addEventListener("click", () => openPostModal(btn.getAttribute("data-id")));
    });

    document.querySelectorAll("#posts-pipeline .btn-duplicate-post").forEach(btn => {
        btn.addEventListener("click", () => duplicatePost(btn.getAttribute("data-id")));
    });
}


// --- MODAL & FORM Logic ---
function openPostModal(id = null, defaultDate = null) {
    const modal = document.getElementById("post-modal");
    const form = document.getElementById("post-form");
    const deleteBtn = document.getElementById("btn-delete-post");
    const titleText = document.getElementById("modal-title-text");

    form.reset();
    document.getElementById("post-edit-id").value = "";

    if (id) {
        // Edit Post
        const post = state.posts.find(p => p.id === id);
        if (post) {
            document.getElementById("post-edit-id").value = post.id;
            document.getElementById("post-title").value = post.title;
            document.getElementById("post-channel").value = post.channel;
            document.getElementById("post-pilar").value = post.pilar;
            document.getElementById("post-status").value = post.status;
            document.getElementById("post-date").value = post.date;
            document.getElementById("post-time").value = post.time;
            document.getElementById("post-hook-a").value = post.hookA || "";
            document.getElementById("post-hook-b").value = post.hookB || "";
            document.getElementById("post-caption").value = post.caption || "";
            document.getElementById("post-media-desc").value = post.mediaDesc || "";
            
            // Populate media info
            if (post.mediaUrl) {
                currentUploadedMedia = {
                    url: post.mediaUrl,
                    filename: post.mediaFileName || post.mediaUrl.split("/").pop(),
                    type: post.mediaType || (post.mediaUrl.match(/\.(mp4|webm|ogg|mov)$/i) ? "video" : "image")
                };
                showPreviewState(post.mediaUrl, currentUploadedMedia.filename, currentUploadedMedia.type);
            } else {
                currentUploadedMedia = null;
                showUploadZoneState();
            }
            
            titleText.textContent = "Editar Post Editorial";
            deleteBtn.style.display = "inline-flex";
        }
    } else {
        // Create Post
        titleText.textContent = "Novo Post Editorial";
        deleteBtn.style.display = "none";
        
        currentUploadedMedia = null;
        showUploadZoneState();
        
        if (defaultDate) {
            document.getElementById("post-date").value = defaultDate;
        }
    }

    modal.classList.add("active");
    // Trigger count change
    document.getElementById("post-caption").dispatchEvent(new Event("input"));
}

function closePostModal() {
    document.getElementById("post-modal").classList.remove("active");
}

function savePostForm() {
    const id = document.getElementById("post-edit-id").value;
    const title = document.getElementById("post-title").value;
    const channel = document.getElementById("post-channel").value;
    const pilar = document.getElementById("post-pilar").value;
    const status = document.getElementById("post-status").value;
    const date = document.getElementById("post-date").value;
    const time = document.getElementById("post-time").value;
    const hookA = document.getElementById("post-hook-a").value;
    const hookB = document.getElementById("post-hook-b").value;
    const caption = document.getElementById("post-caption").value;
    const mediaDesc = document.getElementById("post-media-desc").value;

    console.log("=== savePostForm CALLED ===");
    console.log("Post ID:", id);
    console.log("currentUploadedMedia:", JSON.stringify(currentUploadedMedia));

    if (!title || !date) {
        showToast("Por favor, preencha Título e Data!");
        return;
    }

    if (id) {
        // Update
        const idx = state.posts.findIndex(p => p.id === id);
        if (idx !== -1) {
            const existingPost = state.posts[idx];
            console.log("Existing post before update:", JSON.stringify(existingPost));
            state.posts[idx] = { 
                ...existingPost,
                title, channel, pilar, status, date, time, hookA, hookB, caption, mediaDesc,
                mediaUrl: currentUploadedMedia ? currentUploadedMedia.url : existingPost.mediaUrl,
                mediaType: currentUploadedMedia ? currentUploadedMedia.type : existingPost.mediaType,
                mediaFileName: currentUploadedMedia ? currentUploadedMedia.filename : existingPost.mediaFileName
            };
            // Clean up removed media fields
            if (currentUploadedMedia && currentUploadedMedia.url === null) {
                console.log("Removing media properties because currentUploadedMedia.url is null");
                delete state.posts[idx].mediaUrl;
                delete state.posts[idx].mediaType;
                delete state.posts[idx].mediaFileName;
            }
            console.log("Post after update:", JSON.stringify(state.posts[idx]));
            showToast("Post atualizado com sucesso!");
        }
    } else {
        // Insert
        const newPost = {
            id: "post-" + Date.now(),
            title, channel, pilar, status, date, time, hookA, hookB, caption, mediaDesc
        };
        if (currentUploadedMedia && currentUploadedMedia.url) {
            newPost.mediaUrl = currentUploadedMedia.url;
            newPost.mediaType = currentUploadedMedia.type;
            newPost.mediaFileName = currentUploadedMedia.filename;
        }
        console.log("New post being created:", JSON.stringify(newPost));
        state.posts.push(newPost);
        showToast("Novo post criado!");
    }

    console.log("State about to be saved. state.posts count:", state.posts.length);
    saveStateToLocalStorage();
    closePostModal();
    renderCalendar();
    renderContentList();
}

function deletePostAction() {
    const id = document.getElementById("post-edit-id").value;
    if (id) {
        if (confirm("Tem certeza que deseja deletar este post?")) {
            // Remove mídia do bucket Supabase se existir
            const post = state.posts.find(p => p.id === id);
            if (post?.mediaUrl) deleteSupabaseFile(post.mediaUrl);

            state.posts = state.posts.filter(p => p.id !== id);
            saveStateToLocalStorage();
            closePostModal();
            renderCalendar();
            renderContentList();
            showToast("Post removido.");
        }
    }
}

function duplicatePost(id) {
    const post = state.posts.find(p => p.id === id);
    if (post) {
        const duplicated = {
            ...post,
            id: "post-" + Date.now(),
            title: post.title + " (Cópia)",
            status: "Rascunho"
        };
        state.posts.push(duplicated);
        saveStateToLocalStorage();
        renderContentList();
        showToast("Post duplicado como rascunho!");
    }
}

// --- SETTINGS (API Keys & Maintenance) Logic ---
function setupSettings() {
    const geminiInput = document.getElementById("settings-key-gemini");
    const openaiInput = document.getElementById("settings-key-openai");
    const supabaseUrlInput = document.getElementById("settings-supabase-url");
    const supabaseKeyInput = document.getElementById("settings-supabase-key");
    const supabaseBucketInput = document.getElementById("settings-supabase-bucket");

    // Prompts inputs
    const baseContextInput = document.getElementById("settings-prompt-base");
    const childScriptInput = document.getElementById("settings-prompt-child-script");
    const conversationalInput = document.getElementById("settings-prompt-conversational");
    const singlePostInput = document.getElementById("settings-prompt-single-post");
    const threadsInput = document.getElementById("settings-prompt-threads");
    const carouselInput = document.getElementById("settings-prompt-carousel");

    const isCloudMode = window.SUPABASE_CONFIG && 
                        window.SUPABASE_CONFIG.supabaseUrl && 
                        window.SUPABASE_CONFIG.supabaseKey;

    if (state.settings) {
        geminiInput.value = state.settings.geminiKey || "";
        if (!state.settings.geminiKey && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.hasServerGeminiKey) {
            geminiInput.placeholder = "•••••••• (Configurado no Servidor)";
        } else {
            geminiInput.placeholder = "AIzaSy...";
        }

        openaiInput.value = state.settings.openaiKey || "";
        if (!state.settings.openaiKey && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.hasServerOpenaiKey) {
            openaiInput.placeholder = "•••••••• (Configurado no Servidor)";
        } else {
            openaiInput.placeholder = "sk-proj-...";
        }

        if (isCloudMode) {
            supabaseUrlInput.value = "";
            supabaseUrlInput.placeholder = "Configurado pelo Servidor (Modo Cloud)";
            supabaseUrlInput.disabled = true;

            supabaseKeyInput.value = "";
            supabaseKeyInput.placeholder = "Configurado pelo Servidor (Modo Cloud)";
            supabaseKeyInput.disabled = true;

            supabaseBucketInput.value = "";
            supabaseBucketInput.placeholder = window.SUPABASE_CONFIG.supabaseBucket || "media";
            supabaseBucketInput.disabled = true;

            const btnSaveStorage = document.getElementById("btn-save-storage");
            if (btnSaveStorage) {
                btnSaveStorage.innerHTML = '<i class="fa-solid fa-cloud"></i> Conectado à Nuvem';
                btnSaveStorage.disabled = true;
                btnSaveStorage.style.opacity = "0.7";
                btnSaveStorage.style.cursor = "not-allowed";
            }
        } else {
            supabaseUrlInput.value = state.settings.supabaseUrl || "";
            supabaseUrlInput.placeholder = "https://xxxxxxxxxxxxxxxxxxxx.supabase.co";
            supabaseUrlInput.disabled = false;

            supabaseKeyInput.value = state.settings.supabaseKey || "";
            supabaseKeyInput.placeholder = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
            supabaseKeyInput.disabled = false;

            supabaseBucketInput.value = state.settings.supabaseBucket || "media";
            supabaseBucketInput.placeholder = "Ex: media";
            supabaseBucketInput.disabled = false;

            const btnSaveStorage = document.getElementById("btn-save-storage");
            if (btnSaveStorage) {
                btnSaveStorage.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Salvar Armazenamento';
                btnSaveStorage.disabled = false;
                btnSaveStorage.style.opacity = "1";
                btnSaveStorage.style.cursor = "pointer";
            }
        }

        // Load prompts
        if (!state.settings.prompts) {
            state.settings.prompts = { ...DEFAULT_PROMPTS };
        }
        const prompts = state.settings.prompts;
        if (baseContextInput) baseContextInput.value = prompts.baseContext || DEFAULT_PROMPTS.baseContext;
        if (childScriptInput) childScriptInput.value = prompts.reelsStoriesChildScript || DEFAULT_PROMPTS.reelsStoriesChildScript;
        if (conversationalInput) conversationalInput.value = prompts.reelsShortConversational || DEFAULT_PROMPTS.reelsShortConversational;
        if (singlePostInput) singlePostInput.value = prompts.singlePostCaption || DEFAULT_PROMPTS.singlePostCaption;
        if (threadsInput) threadsInput.value = prompts.postThreads || DEFAULT_PROMPTS.postThreads;
        if (carouselInput) carouselInput.value = prompts.carouselOutline || DEFAULT_PROMPTS.carouselOutline;
    }

    document.getElementById("btn-save-keys").addEventListener("click", () => {
        state.settings.geminiKey = geminiInput.value;
        state.settings.openaiKey = openaiInput.value;
        saveStateToLocalStorage();
        showToast("Chaves de API salvas localmente!");
    });

    document.getElementById("btn-save-storage").addEventListener("click", () => {
        if (isCloudMode) return; // Segurança extra
        state.settings.supabaseUrl = supabaseUrlInput.value.trim();
        state.settings.supabaseKey = supabaseKeyInput.value.trim();
        state.settings.supabaseBucket = supabaseBucketInput.value.trim() || "media";
        saveStateToLocalStorage();
        showToast("Configurações de armazenamento salvas!");
    });

    const btnSavePrompts = document.getElementById("btn-save-prompts");
    if (btnSavePrompts) {
        btnSavePrompts.addEventListener("click", () => {
            if (!state.settings.prompts) {
                state.settings.prompts = {};
            }
            state.settings.prompts.baseContext = baseContextInput.value;
            state.settings.prompts.reelsStoriesChildScript = childScriptInput.value;
            state.settings.prompts.reelsShortConversational = conversationalInput.value;
            state.settings.prompts.singlePostCaption = singlePostInput.value;
            state.settings.prompts.postThreads = threadsInput.value;
            state.settings.prompts.carouselOutline = carouselInput.value;
            
            saveStateToLocalStorage();
            showToast("Templates de prompt atualizados com sucesso!");
        });
    }

    document.getElementById("btn-load-demo").addEventListener("click", () => {
        if (confirm("Isso irá substituir seus posts atuais por posts de demonstração. Continuar?")) {
            state.posts = [...DEMO_POSTS];
            saveStateToLocalStorage();
            showToast("Dados de demonstração carregados!");
            setTimeout(() => window.location.reload(), 1000);
        }
    });

    document.getElementById("btn-clear-all").addEventListener("click", () => {
        if (confirm("ATENÇÃO: Isso irá apagar todos os posts e configurações do local. Deseja continuar?")) {
            localStorage.removeItem("solto_marketing_hub_state");
            showToast("Dados totalmente limpos.");
            setTimeout(() => window.location.reload(), 1000);
        }
    });
}

// --- Client Account & Project Settings Setup ---
function setupClientSettings() {
    const trigger = document.getElementById("client-badge-dropdown-trigger");
    const menu = document.getElementById("client-dropdown-menu");
    
    if (!trigger || !menu) return;

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains("show");
        if (isOpen) {
            menu.classList.remove("show");
            trigger.classList.remove("dropdown-active");
        } else {
            menu.classList.add("show");
            trigger.classList.add("dropdown-active");
        }
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
        if (!trigger.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove("show");
            trigger.classList.remove("dropdown-active");
        }
    });

    // Modal elements
    const accountModal = document.getElementById("account-settings-modal");
    const projectModal = document.getElementById("project-settings-modal");

    // Close buttons
    document.getElementById("btn-close-account-modal")?.addEventListener("click", () => accountModal.classList.remove("active"));
    document.getElementById("btn-cancel-account")?.addEventListener("click", () => accountModal.classList.remove("active"));
    document.getElementById("btn-close-project-settings-modal")?.addEventListener("click", () => projectModal.classList.remove("active"));
    document.getElementById("btn-cancel-project-settings")?.addEventListener("click", () => projectModal.classList.remove("active"));

    // Open Account Settings
    document.getElementById("btn-open-account-settings")?.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.remove("show");
        trigger.classList.remove("dropdown-active");
        
        // Pre-fill user data
        const loggedUser = JSON.parse(localStorage.getItem("hub_user") || "{}");
        document.getElementById("acc-display-name").value = loggedUser.displayName || "";
        document.getElementById("acc-username").value = loggedUser.username || "";
        document.getElementById("acc-current-password").value = "";
        document.getElementById("acc-new-password").value = "";
        document.getElementById("acc-confirm-password").value = "";

        accountModal.classList.add("active");
    });

    // Open Project Settings
    document.getElementById("btn-open-project-settings")?.addEventListener("click", async (e) => {
        e.preventDefault();
        menu.classList.remove("show");
        trigger.classList.remove("dropdown-active");

        // Load project data
        let proj = {};
        if (isSupabaseMode) {
            try {
                const key = window.SUPABASE_CONFIG.supabaseKey;
                const token = localStorage.getItem('hub_session_token');
                const res = await fetch(`${window.SUPABASE_CONFIG.supabaseUrl}/rest/v1/projects?id=eq.${projectId}&select=*`, {
                    headers: { 'apikey': key, 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const list = await res.json();
                    if (list.length > 0) proj = list[0];
                }
            } catch(err) {
                console.error("Erro ao carregar dados do projeto no Supabase:", err);
            }
        } else {
            try {
                const token = localStorage.getItem('hub_session_token');
                const res = await fetch(`/api/projects/${projectId}/settings`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    proj = data.project || {};
                }
            } catch(err) {
                console.error("Erro ao carregar dados do projeto localmente:", err);
            }
        }

        // Pre-fill project fields
        document.getElementById("proj-name").value = proj.name || "";
        document.getElementById("proj-description").value = proj.description || "";
        document.getElementById("proj-icon").value = proj.icon || "fa-solid fa-user-doctor";
        document.getElementById("proj-color").value = proj.color || "#dc2626";
        document.getElementById("proj-color-text").value = proj.color || "#dc2626";
        
        const logoUrl = proj.logo_url || proj.logoUrl || "";
        document.getElementById("proj-logo-url").value = logoUrl;
        
        // Update previews
        updateLogoPreview(logoUrl, proj.icon || "fa-solid fa-user-doctor");

        projectModal.classList.add("active");
        
        // Keep reference to loaded project to know if columns exist
        projectModal.dataset.loadedProj = JSON.stringify(proj);
    });

    // Color inputs link
    const colorPicker = document.getElementById("proj-color");
    const colorText = document.getElementById("proj-color-text");
    if (colorPicker && colorText) {
        colorPicker.addEventListener("input", (e) => {
            colorText.value = e.target.value.toUpperCase();
        });
        colorText.addEventListener("input", (e) => {
            let val = e.target.value;
            if (val.startsWith("#") && val.length === 7) {
                colorPicker.value = val;
            }
        });
    }

    // Logo image upload handler
    const fileInput = document.getElementById("proj-logo-file");
    if (fileInput) {
        fileInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                let uploadedUrl = "";
                if (isSupabaseMode) {
                    const filename = `logo_${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
                    const key = window.SUPABASE_CONFIG.supabaseKey;
                    const token = localStorage.getItem('hub_session_token');
                    
                    const res = await fetch(`${window.SUPABASE_CONFIG.supabaseUrl}/storage/v1/object/${window.SUPABASE_CONFIG.supabaseBucket}/${projectId}/${filename}`, {
                        method: 'POST',
                        headers: {
                            'apikey': key,
                            'Authorization': `Bearer ${token}`
                        },
                        body: file
                    });
                    if (res.ok) {
                        uploadedUrl = `${window.SUPABASE_CONFIG.supabaseUrl}/storage/v1/object/public/${window.SUPABASE_CONFIG.supabaseBucket}/${projectId}/${filename}`;
                    } else {
                        const err = await res.json();
                        throw new Error(err.message || 'Falha no upload do Supabase');
                    }
                } else {
                    const token = localStorage.getItem('hub_session_token');
                    const res = await fetch(`/api/projects/${projectId}/upload`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` },
                        body: formData
                    });
                    if (res.ok) {
                        const data = await res.json();
                        uploadedUrl = data.url;
                    } else {
                        throw new Error('Falha no upload do servidor local');
                    }
                }

                if (uploadedUrl) {
                    document.getElementById("proj-logo-url").value = uploadedUrl;
                    updateLogoPreview(uploadedUrl);
                    showToast("Logotipo carregado com sucesso!");
                }
            } catch(err) {
                console.error(err);
                showToast("Erro ao fazer upload do logotipo: " + err.message);
            }
        });
    }

    // Remove logo button
    document.getElementById("btn-remove-logo")?.addEventListener("click", () => {
        document.getElementById("proj-logo-url").value = "";
        fileInput.value = "";
        updateLogoPreview("", document.getElementById("proj-icon").value);
    });

    // Save Account Settings
    document.getElementById("btn-save-account")?.addEventListener("click", async () => {
        const displayName = document.getElementById("acc-display-name").value.trim();
        const currentPassword = document.getElementById("acc-current-password").value;
        const newPassword = document.getElementById("acc-new-password").value;
        const confirmPassword = document.getElementById("acc-confirm-password").value;

        if (!displayName) {
            showToast("Nome de exibição é obrigatório!");
            return;
        }

        if (newPassword) {
            if (newPassword.length < 6) {
                showToast("A nova senha deve ter pelo menos 6 caracteres!");
                return;
            }
            if (newPassword !== confirmPassword) {
                showToast("A confirmação de senha não coincide!");
                return;
            }
        }

        try {
            if (isSupabaseMode) {
                const key = window.SUPABASE_CONFIG.supabaseKey;
                const token = localStorage.getItem('hub_session_token');
                
                // Update password if provided
                if (newPassword) {
                    const resPass = await fetch(`${window.SUPABASE_CONFIG.supabaseUrl}/auth/v1/user`, {
                        method: 'PUT',
                        headers: {
                            'apikey': key,
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ password: newPassword })
                    });
                    if (!resPass.ok) {
                        const err = await resPass.json();
                        throw new Error("Erro ao atualizar senha no Supabase: " + (err.message || err.error_description || ""));
                    }
                }

                // Update profile display_name
                const loggedUser = JSON.parse(localStorage.getItem("hub_user") || "{}");
                const resProfile = await fetch(`${window.SUPABASE_CONFIG.supabaseUrl}/rest/v1/user_profiles?id=eq.${loggedUser.id}`, {
                    method: 'PATCH',
                    headers: {
                        'apikey': key,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ display_name: displayName })
                });
                if (!resProfile.ok) {
                    throw new Error("Erro ao atualizar perfil no Supabase");
                }
            } else {
                // Local API
                const token = localStorage.getItem('hub_session_token');
                const res = await fetch('/api/me/settings', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ displayName, currentPassword, newPassword })
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || "Erro ao salvar alterações");
                }
            }

            // Sync user local cache
            const userObj = JSON.parse(localStorage.getItem("hub_user") || "{}");
            userObj.displayName = displayName;
            localStorage.setItem("hub_user", JSON.stringify(userObj));

            showToast("Configurações da conta salvas com sucesso!");
            accountModal.classList.remove("active");
        } catch(err) {
            console.error(err);
            showToast("Erro: " + err.message);
        }
    });

    // Save Project Settings
    document.getElementById("btn-save-project-settings")?.addEventListener("click", async () => {
        const name = document.getElementById("proj-name").value.trim();
        const description = document.getElementById("proj-description").value.trim();
        const icon = document.getElementById("proj-icon").value.trim();
        const color = document.getElementById("proj-color-text").value.trim();
        const logoUrl = document.getElementById("proj-logo-url").value;

        if (!name) {
            showToast("Nome do projeto é obrigatório!");
            return;
        }

        try {
            if (isSupabaseMode) {
                const key = window.SUPABASE_CONFIG.supabaseKey;
                const token = localStorage.getItem('hub_session_token');
                
                let loadedProj = {};
                try {
                    loadedProj = JSON.parse(projectModal.dataset.loadedProj || "{}");
                } catch(e) {}

                const updateBody = {
                    name,
                    description,
                    icon,
                    color
                };
                
                // Safely include logo url if the column exists in the table structure
                if ('logo_url' in loadedProj) {
                    updateBody.logo_url = logoUrl;
                } else if ('logoUrl' in loadedProj) {
                    updateBody.logoUrl = logoUrl;
                }

                const res = await fetch(`${window.SUPABASE_CONFIG.supabaseUrl}/rest/v1/projects?id=eq.${projectId}`, {
                    method: 'PATCH',
                    headers: {
                        'apikey': key,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateBody)
                });
                if (!res.ok) {
                    throw new Error("Erro ao atualizar projeto no Supabase");
                }
            } else {
                // Local API
                const token = localStorage.getItem('hub_session_token');
                const res = await fetch(`/api/projects/${projectId}/settings`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, description, icon, color, logoUrl })
                });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || "Erro ao salvar alterações do projeto");
                }
            }

            // Apply immediately to current UI
            document.getElementById('sidebar-doctor-name').textContent = name;
            document.getElementById('sidebar-doctor-crm').textContent = description;
            if (color) {
                document.documentElement.style.setProperty('--primary', color);
            }

            const sidebarLogoImg = document.getElementById('sidebar-client-logo-img');
            const sidebarLogoIcon = document.getElementById('sidebar-client-icon');
            const sidebarLogoWrap = document.getElementById('sidebar-client-logo-wrap');
            
            if (logoUrl) {
                sidebarLogoImg.src = logoUrl;
                sidebarLogoImg.style.display = 'block';
                sidebarLogoIcon.style.display = 'none';
                if (sidebarLogoWrap) sidebarLogoWrap.style.background = 'transparent';
            } else {
                sidebarLogoImg.style.display = 'none';
                sidebarLogoIcon.style.display = 'block';
                sidebarLogoIcon.className = icon || 'fa-solid fa-user-doctor';
                if (sidebarLogoWrap) sidebarLogoWrap.style.background = 'var(--primary)';
            }

            showToast("Configurações do projeto salvas com sucesso!");
            projectModal.classList.remove("active");
        } catch(err) {
            console.error(err);
            showToast("Erro: " + err.message);
        }
    });

    // Helper to update logo preview inside project settings modal
    function updateLogoPreview(logoUrl, iconClass) {
        const preview = document.getElementById("proj-logo-preview");
        const removeBtn = document.getElementById("btn-remove-logo");
        if (!preview) return;

        if (logoUrl) {
            preview.innerHTML = `<img src="${logoUrl}" alt="Logotipo">`;
            if (removeBtn) removeBtn.style.display = "block";
        } else {
            const cls = iconClass || "fa-solid fa-user-doctor";
            preview.innerHTML = `<i class="${cls}"></i>`;
            if (removeBtn) removeBtn.style.display = "none";
        }
    }
}

// --- AI MODULE (Client-Side Direct Fetch calling API) ---
function setupAIModule() {
    const aiTheme = document.getElementById("ai-theme");
    const aiTemplate = document.getElementById("ai-prompt-template");
    const customPromptGroup = document.getElementById("group-custom-prompt");
    const customPromptText = document.getElementById("ai-custom-prompt");
    const generateBtn = document.getElementById("btn-ai-generate");
    
    const loader = document.getElementById("ai-output-loader");
    const emptyResult = document.getElementById("ai-output-empty");
    const resultText = document.getElementById("ai-output-text");
    
    const copyBtn = document.getElementById("btn-copy-ai-output");
    const saveBtn = document.getElementById("btn-save-ai-output");
    const scheduleBtn = document.getElementById("btn-schedule-ai-output");

    function updateAIModuleButtons() {
        const isRoteiro = (aiTemplate.value === "reels-stories-child-script");
        const resultsTitle = document.getElementById("ai-results-title");
        if (isRoteiro) {
            scheduleBtn.innerHTML = `<i class="fa-solid fa-scroll"></i> Salvar Roteiro`;
            if (resultsTitle) {
                resultsTitle.innerHTML = `<i class="fa-solid fa-scroll"></i> Roteiro Gerado`;
            }
        } else {
            scheduleBtn.innerHTML = `<i class="fa-solid fa-file-pen"></i> Criar Post`;
            if (resultsTitle) {
                resultsTitle.innerHTML = `<i class="fa-solid fa-file-pen"></i> Post Gerado`;
            }
        }
    }

    aiTemplate.addEventListener("change", () => {
        if (aiTemplate.value === "custom") {
            customPromptGroup.style.display = "block";
        } else {
            customPromptGroup.style.display = "none";
        }
        updateAIModuleButtons();
    });

    updateAIModuleButtons();

    generateBtn.addEventListener("click", async () => {
        const theme = aiTheme.value.trim();
        const model = document.getElementById("ai-model-select").value;
        
        if (!theme) {
            showToast("Por favor, digite um tema/tópico!");
            return;
        }

        let apiKey = "";
        if (model.includes("gemini")) {
            apiKey = state.settings.geminiKey || "";
        } else {
            apiKey = state.settings.openaiKey || "";
        }

        const hasServerKey = window.SUPABASE_CONFIG && 
                             (model.includes("gemini") ? window.SUPABASE_CONFIG.hasServerGeminiKey : window.SUPABASE_CONFIG.hasServerOpenaiKey);

        if (!apiKey && !hasServerKey) {
            showToast(`Insira a chave do ${model.includes("gemini") ? "Gemini" : "OpenAI"} nas Configurações primeiro!`);
            return;
        }

        // Toggle visibility
        emptyResult.style.display = "none";
        resultText.style.display = "none";
        loader.style.display = "flex";
        generateBtn.disabled = true;
        copyBtn.disabled = true;
        saveBtn.disabled = true;
        scheduleBtn.disabled = true;

        try {
            const prompt = constructPrompt(theme, aiTemplate.value, customPromptText.value);
            let responseText = "";

            if (model.includes("gemini")) {
                responseText = await callGeminiAPI(apiKey, model, prompt);
            } else {
                responseText = await callOpenAIAPI(apiKey, model, prompt);
            }

            // Success
            resultText.textContent = responseText;
            loader.style.display = "none";
            resultText.style.display = "block";
            
            generateBtn.disabled = false;
            copyBtn.disabled = false;
            saveBtn.disabled = false;
            scheduleBtn.disabled = false;

            // Increment count
            state.aiGenerationsCount = (state.aiGenerationsCount || 0) + 1;
            saveStateToLocalStorage();
            updateDashboardStats();

            showToast("Conteúdo gerado com IA com sucesso!");

        } catch (error) {
            console.error("AI Generation failed", error);
            loader.style.display = "none";
            emptyResult.style.display = "flex";
            generateBtn.disabled = false;
            showToast(`Erro na IA: ${error.message}`);
        }
    });

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(resultText.textContent).then(() => {
            showToast("Conteúdo copiado!");
        });
    });

    saveBtn.addEventListener("click", () => {
        const generatedText = resultText.textContent;
        const theme = aiTheme.value.trim() || "Conteúdo Gerado";
        const selectedPilar = document.getElementById("ai-pilar")?.value || "explain";
        const isRoteiro = (aiTemplate.value === "reels-stories-child-script");
        
        if (isRoteiro) {
            const newRoteiro = {
                id: "roteiro-" + Date.now(),
                title: theme,
                pilar: selectedPilar,
                status: "Rascunho",
                scriptText: generatedText,
                caption: "",
                mediaDesc: "Roteiro gerado por IA",
                dateCreated: new Date().toISOString().slice(0, 10)
            };
            if (!state.roteiros) state.roteiros = [];
            state.roteiros.push(newRoteiro);
            saveStateToLocalStorage();
            updateDashboardStats();
            renderRoteirosList();
            
            showToast("Salvo como Rascunho na aba Roteiros!");
        } else {
            const newPost = {
                id: "post-" + Date.now(),
                title: theme,
                channel: "instagram-reels",
                pilar: selectedPilar,
                status: "Rascunho",
                date: new Date().toISOString().slice(0, 10),
                time: "18:00",
                hookA: theme,
                hookB: "",
                caption: generatedText,
                mediaDesc: "Post gerado por IA"
            };
            if (!state.posts) state.posts = [];
            state.posts.push(newPost);
            saveStateToLocalStorage();
            updateDashboardStats();
            renderContentList();
            renderCalendar();
            renderDashboardRecentList();
            
            showToast("Salvo como Rascunho na aba Posts!");
        }
        saveBtn.disabled = true;
    });

    scheduleBtn.addEventListener("click", () => {
        const generatedText = resultText.textContent;
        const theme = aiTheme.value.trim() || "Conteúdo Gerado";
        const selectedPilar = document.getElementById("ai-pilar")?.value || "explain";
        const isRoteiro = (aiTemplate.value === "reels-stories-child-script");
        
        if (isRoteiro) {
            const newRoteiro = {
                id: "roteiro-" + Date.now(),
                title: theme,
                pilar: selectedPilar,
                status: "Para Gravar",
                scriptText: generatedText,
                caption: "",
                mediaDesc: "Roteiro gerado por IA",
                dateCreated: new Date().toISOString().slice(0, 10)
            };
            if (!state.roteiros) state.roteiros = [];
            state.roteiros.push(newRoteiro);
            saveStateToLocalStorage();
            updateDashboardStats();
            renderRoteirosList();
            
            showToast("Roteiro de gravação salvo!");
            openRoteiroModal(newRoteiro.id);
        } else {
            const newPost = {
                id: "post-" + Date.now(),
                title: theme,
                channel: "instagram-reels",
                pilar: selectedPilar,
                status: "Rascunho",
                date: new Date().toISOString().slice(0, 10),
                time: "18:00",
                hookA: theme,
                hookB: "",
                caption: generatedText,
                mediaDesc: "Post gerado por IA"
            };
            if (!state.posts) state.posts = [];
            state.posts.push(newPost);
            saveStateToLocalStorage();
            updateDashboardStats();
            renderContentList();
            renderCalendar();
            renderDashboardRecentList();
            
            showToast("Post criado como rascunho!");
            openPostModal(newPost.id);
        }
    });
}

// Prompt Construction
function constructPrompt(theme, templateType, customPrompt) {
    const doctorName = state.wizard.doctorName || state.settings?.name || "Profissional";
    const valueProp = state.wizard.valueProp || "Serviços profissionais de alta qualidade";
    const target = state.wizard.targetAudience || "clientes";

    // Ensure state.settings has a prompts object
    if (!state.settings.prompts) {
        state.settings.prompts = { ...DEFAULT_PROMPTS };
    }
    const prompts = state.settings.prompts;

    // Get contexts and templates, falling back to defaults if empty
    const baseContextTemplate = prompts.baseContext || DEFAULT_PROMPTS.baseContext;
    
    // Interpolate baseContext variables
    const baseContext = baseContextTemplate
        .replace(/{doctorName}/g, doctorName)
        .replace(/{valueProp}/g, valueProp)
        .replace(/{target}/g, target);

    if (templateType === "custom") {
        return `${baseContext}
        
Instrução do usuário: ${customPrompt}
Tema a ser abordado: "${theme}"`;
    }

    let templateKey = "";
    if (templateType === "reels-short-conversational") {
        templateKey = "reelsShortConversational";
    } else if (templateType === "reels-stories-child-script") {
        templateKey = "reelsStoriesChildScript";
    } else if (templateType === "single-post-caption") {
        templateKey = "singlePostCaption";
    } else if (templateType === "post-threads") {
        templateKey = "postThreads";
    } else if (templateType === "carousel-outline") {
        templateKey = "carouselOutline";
    }

    const templateText = (templateKey && prompts[templateKey])
        ? prompts[templateKey]
        : (DEFAULT_PROMPTS[templateKey] || `Escreva um texto educativo sobre o tema "{theme}".`);

    // Interpolate template variables
    const finalPromptBody = templateText
        .replace(/{theme}/g, theme)
        .replace(/{doctorName}/g, doctorName)
        .replace(/{valueProp}/g, valueProp)
        .replace(/{target}/g, target);

    return `${baseContext}\n\n${finalPromptBody}`;
}

// client-side Gemini API call
// client-side Gemini API call (routed through server proxy)
async function callGeminiAPI(key, modelName, prompt) {
    const token = localStorage.getItem('hub_session_token');
    const response = await fetch('/api/generate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            model: modelName,
            prompt: prompt,
            clientKey: key // Optional fallback if server-side env vars are not set
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Geração com Gemini falhou");
    }

    const data = await response.json();
    return data.text;
}

// client-side OpenAI API call (routed through server proxy)
async function callOpenAIAPI(key, modelName, prompt) {
    const token = localStorage.getItem('hub_session_token');
    const response = await fetch('/api/generate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            model: modelName,
            prompt: prompt,
            clientKey: key // Optional fallback if server-side env vars are not set
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Geração com OpenAI falhou");
    }

    const data = await response.json();
    return data.text;
}

// Render Saved Marketing Plan Details on Dashboard dynamically
function renderDashboardPlan() {
    const w = state.wizard || {};
    
    // 1. Update Sidebar Doctor name & CRM dynamically
    const sidebarName = document.getElementById("sidebar-doctor-name");
    const sidebarCrm = document.getElementById("sidebar-doctor-crm");
    
    if (sidebarName && sidebarCrm && w.doctorName) {
        const docName = w.doctorName;
        let namePart = docName;
        let crmPart = "CRM | Médica";
        if (docName.includes("-")) {
            const parts = docName.split("-");
            namePart = parts[0].trim();
            crmPart = parts[1].trim();
        } else if (docName.includes("|")) {
            const parts = docName.split("|");
            namePart = parts[0].trim();
            crmPart = parts[1].trim();
        }
        sidebarName.textContent = namePart;
        sidebarCrm.textContent = crmPart;
    }
    
    // 2. Update Dashboard Pos Quote dynamically
    const dashQuote = document.getElementById("dash-pos-quote");
    if (dashQuote && w.valueProp) {
        dashQuote.textContent = `"${w.valueProp}"`;
    }
    
    // 3. Update Plan Summary Card Blocks
    const planDoctor = document.getElementById("dash-plan-doctor");
    const planServices = document.getElementById("dash-plan-services");
    const planLocation = document.getElementById("dash-plan-location");
    const planPricing = document.getElementById("dash-plan-pricing");
    const planTarget = document.getElementById("dash-plan-target");
    const planDiferenciais = document.getElementById("dash-plan-diferenciais");
    const planProof = document.getElementById("dash-plan-proof");
    
    if (planDoctor) planDoctor.textContent = w.doctorName || "-";
    if (planServices) planServices.textContent = w.serviceType || "-";
    if (planLocation) planLocation.textContent = w.location || "-";
    if (planPricing) planPricing.textContent = w.pricing || "-";
    if (planTarget) planTarget.textContent = w.targetAudience || "-";
    if (planDiferenciais) planDiferenciais.textContent = w.diferenciais || "-";
    if (planProof) planProof.textContent = w.proof || "-";
    
    // Render Pains list
    const painsList = document.getElementById("dash-plan-pains");
    if (painsList) {
        painsList.innerHTML = "";
        const painsText = w.pains || "";
        const lines = painsText.split("\n").filter(l => l.trim() !== "");
        if (lines.length > 0) {
            painsList.innerHTML = lines.map(line => `<li>${line.replace(/^[0-9\.\-\*\s]+/, '')}</li>`).join("");
        } else {
            painsList.innerHTML = "<li>Nenhuma dor mapeada ainda.</li>";
        }
    }
    
    // Render Objections list
    const objectionsList = document.getElementById("dash-plan-objections");
    if (objectionsList) {
        const objectionsText = w.objections || "";
        const lines = objectionsText.split("\n").filter(l => l.trim() !== "");
        if (lines.length > 0) {
            objectionsList.innerHTML = lines.map(line => `<li>${line.replace(/^[0-9\.\-\*\s]+/, '')}</li>`).join("");
        } else {
            objectionsList.innerHTML = "<li>Nenhuma objeção mapeada ainda.</li>";
        }
    }
}

// --- PAUTAS LIBRARY (Biblioteca de Pautas) Logic ---
function setupPautas() {
    const searchInput = document.getElementById("search-pautas");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            renderPautas();
        });
    }

    // Modal buttons actions
    const closeBtn = document.getElementById("btn-close-pauta-modal");
    const cancelBtn = document.getElementById("btn-cancel-pauta");
    const saveBtn = document.getElementById("btn-save-pauta");

    if (closeBtn) closeBtn.addEventListener("click", closePautaModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closePautaModal);
    if (saveBtn) saveBtn.addEventListener("click", savePautaForm);

    // Prevent accidental page reloads when hitting Enter inside the pauta form
    const pautaForm = document.getElementById("pauta-form");
    if (pautaForm) {
        pautaForm.addEventListener("submit", (e) => {
            e.preventDefault();
            savePautaForm();
        });
    }
}

function openPautaModal(pilarId) {
    const modal = document.getElementById("pauta-modal");
    const form = document.getElementById("pauta-form");
    if (modal && form) {
        form.reset();
        document.getElementById("pauta-pilar-id").value = pilarId;
        modal.classList.add("active");
    }
}

function closePautaModal() {
    const modal = document.getElementById("pauta-modal");
    if (modal) {
        modal.classList.remove("active");
    }
}

function savePautaForm() {
    const pilarId = document.getElementById("pauta-pilar-id").value;
    const title = document.getElementById("pauta-title-input").value.trim();
    const desc = document.getElementById("pauta-desc-input").value.trim();
    const apprTitle = document.getElementById("pauta-appr-title").value.trim();
    const apprGancho = document.getElementById("pauta-appr-gancho").value.trim();
    const apprMensagem = document.getElementById("pauta-appr-mensagem").value.trim();

    if (!title || !apprTitle || !apprGancho || !apprMensagem) {
        showToast("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    const pilar = state.pautas.find(p => p.id === pilarId);
    if (pilar) {
        const newPauta = {
            id: "pauta-" + Date.now(),
            title: title,
            desc: desc,
            approaches: [
                {
                    title: apprTitle,
                    gancho: apprGancho,
                    mensagem: apprMensagem
                }
            ]
        };
        pilar.items.push(newPauta);
        saveStateToLocalStorage();
        closePautaModal();
        renderPautas();
        showToast("Novo assunto estratégicos adicionado!");
    }
}

function deletePautaAction(pilarId, pautaId) {
    const pilar = state.pautas.find(p => p.id === pilarId);
    if (pilar) {
        const pauta = pilar.items.find(i => i.id === pautaId);
        if (pauta) {
            if (confirm(`Tem certeza que deseja excluir o assunto "${pauta.title}" do pilar?`)) {
                pilar.items = pilar.items.filter(i => i.id !== pautaId);
                saveStateToLocalStorage();
                renderPautas();
                showToast("Assunto removido da biblioteca.");
            }
        }
    }
}

function renderPautas() {
    const grid = document.getElementById("pautas-grid");
    if (!grid) return;

    const query = document.getElementById("search-pautas")?.value.toLowerCase().trim() || "";
    grid.innerHTML = "";

    state.pautas.forEach(pilar => {
        // Filter items in this pilar
        const filteredItems = pilar.items.filter(item => {
            if (!query) return true;
            
            const matchesTitle = item.title.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query));
            const matchesApproach = item.approaches.some(appr => 
                appr.title.toLowerCase().includes(query) || 
                appr.gancho.toLowerCase().includes(query) || 
                appr.mensagem.toLowerCase().includes(query)
            );
            
            return matchesTitle || matchesApproach;
        });

        // Hide pilar if searching and no items match
        if (query && filteredItems.length === 0) {
            return;
        }

        // Render Pilar Card (Accordion style)
        const pilarEl = document.createElement("div");
        pilarEl.classList.add("pilar-accordion-item");
        if (query) {
            pilarEl.classList.add("expanded");
        }

        pilarEl.innerHTML = `
            <div class="pilar-accordion-header">
                <div class="pilar-header-info">
                    <span class="pilar-title">${pilar.name}</span>
                    <span class="pilar-subtitle-text">${pilar.desc}</span>
                </div>
                <div class="pilar-header-arrow">
                    <i class="fa-solid fa-chevron-${query ? 'up' : 'down'}"></i>
                </div>
            </div>
            <div class="pilar-accordion-body" style="display: ${query ? 'block' : 'none'};">
                <div class="pilar-actions-bar">
                    <button class="btn-secondary-sm btn-add-pauta-trigger" data-pilar-id="${pilar.id}">
                        <i class="fa-solid fa-plus-circle"></i> Novo Assunto
                    </button>
                </div>
                <div class="pautas-accordion-list">
                    <!-- Loaded dynamically -->
                </div>
            </div>
        `;

        const body = pilarEl.querySelector(".pilar-accordion-body");
        const listContainer = pilarEl.querySelector(".pautas-accordion-list");

        // Toggle pilar body
        pilarEl.querySelector(".pilar-accordion-header").addEventListener("click", () => {
            const isExpanded = pilarEl.classList.toggle("expanded");
            body.style.display = isExpanded ? "block" : "none";
            const arrow = pilarEl.querySelector(".pilar-header-arrow i");
            if (isExpanded) {
                arrow.className = "fa-solid fa-chevron-up";
            } else {
                arrow.className = "fa-solid fa-chevron-down";
            }
        });

        if (filteredItems.length === 0) {
            listContainer.innerHTML = `<div class="pauta-empty-msg">Nenhum assunto cadastrado neste pilar.</div>`;
        } else {
            filteredItems.forEach(item => {
                const itemEl = document.createElement("div");
                itemEl.classList.add("pauta-item-card");
                if (query) {
                    itemEl.classList.add("expanded");
                }

                const isUsed = item.used ? true : false;
                const titleClass = isUsed ? "pauta-item-title pauta-title-used" : "pauta-item-title";
                const checkIcon = isUsed ? "fa-solid fa-circle-check" : "fa-regular fa-circle-check";
                const usedBtnClass = isUsed ? "btn-toggle-pauta-used used" : "btn-toggle-pauta-used";

                itemEl.innerHTML = `
                    <div class="pauta-item-header">
                        <button class="${usedBtnClass}" data-pilar-id="${pilar.id}" data-pauta-id="${item.id}" title="${isUsed ? 'Marcar como não utilizada' : 'Marcar como usada'}">
                            <i class="${checkIcon}"></i>
                        </button>
                        <div class="pauta-item-title-block">
                            <span class="${titleClass}">${item.title}</span>
                            ${item.desc ? `<span class="pauta-item-desc">${item.desc}</span>` : ''}
                        </div>
                        <div class="pauta-item-actions">
                            <button class="btn-delete-pauta" data-pilar-id="${pilar.id}" data-pauta-id="${item.id}" title="Excluir assunto">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <div class="pauta-item-arrow">
                                <i class="fa-solid fa-chevron-${query ? 'up' : 'down'}"></i>
                            </div>
                        </div>
                    </div>
                    <div class="pauta-item-body" style="display: ${query ? 'block' : 'none'};">
                        <div class="pauta-approaches-list">
                            <!-- Loaded dynamically -->
                        </div>
                        <div class="pauta-item-footer-actions">
                            <button class="btn-secondary-sm btn-generate-extra-approach" data-pilar-id="${pilar.id}" data-pauta-id="${item.id}">
                                <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary);"></i> Gerar Abordagem Extra (IA)
                            </button>
                        </div>
                    </div>
                `;

                const itemBody = itemEl.querySelector(".pauta-item-body");

                // Toggle pauta item body
                itemEl.querySelector(".pauta-item-header").addEventListener("click", (e) => {
                    if (e.target.closest(".btn-delete-pauta") || e.target.closest(".btn-toggle-pauta-used")) return;
                    const isExpanded = itemEl.classList.toggle("expanded");
                    itemBody.style.display = isExpanded ? "block" : "none";
                    const arrow = itemEl.querySelector(".pauta-item-arrow i");
                    if (isExpanded) {
                        arrow.className = "fa-solid fa-chevron-up";
                    } else {
                        arrow.className = "fa-solid fa-chevron-down";
                    }
                });

                // Render approaches inside pauta
                const apprListContainer = itemEl.querySelector(".pauta-approaches-list");
                item.approaches.forEach((appr, index) => {
                    const apprEl = document.createElement("div");
                    apprEl.classList.add("pauta-approach-item");
                    apprEl.innerHTML = `
                        <div class="appr-header">
                            <span class="appr-badge">Abordagem ${index + 1}</span>
                            <span class="appr-title">${appr.title}</span>
                        </div>
                        <div class="appr-content">
                            <div class="appr-field">
                                <span class="appr-field-label"><i class="fa-solid fa-magnet"></i> Gancho (Hook) A/B:</span>
                                <blockquote class="appr-field-value italic">"${appr.gancho}"</blockquote>
                            </div>
                            <div class="appr-field">
                                <span class="appr-field-label"><i class="fa-solid fa-comment-medical"></i> Mensagem Central:</span>
                                <p class="appr-field-value">${appr.mensagem}</p>
                            </div>
                            <div class="appr-actions">
                                <button class="btn-primary-sm btn-generate-ai"><i class="fa-solid fa-robot"></i> Gerar com IA</button>
                                <button class="btn-secondary-sm btn-create-roteiro"><i class="fa-solid fa-scroll"></i> Criar Roteiro</button>
                                <button class="btn-secondary-sm btn-create-post"><i class="fa-solid fa-file-pen"></i> Criar Post</button>
                            </div>
                        </div>
                    `;

                    // Actions listeners
                    apprEl.querySelector(".btn-generate-ai").addEventListener("click", (e) => {
                        e.stopPropagation();
                        sendToAIGenerator(pilar.id, item.title, appr.title, appr.gancho, appr.mensagem);
                    });

                    apprEl.querySelector(".btn-create-roteiro").addEventListener("click", (e) => {
                        e.stopPropagation();
                        createRoteiroFromPauta(pilar.id, item.title, appr.title, appr.gancho, appr.mensagem);
                    });

                    apprEl.querySelector(".btn-create-post").addEventListener("click", (e) => {
                        e.stopPropagation();
                        createPostFromPauta(pilar.id, item.title, appr.title, appr.gancho, appr.mensagem);
                    });

                    apprListContainer.appendChild(apprEl);
                });

                // Attach delete button
                itemEl.querySelector(".btn-delete-pauta").addEventListener("click", (e) => {
                    e.stopPropagation();
                    const pilarId = e.currentTarget.getAttribute("data-pilar-id");
                    const pautaId = e.currentTarget.getAttribute("data-pauta-id");
                    deletePautaAction(pilarId, pautaId);
                });

                // Attach used marker toggle
                itemEl.querySelector(".btn-toggle-pauta-used").addEventListener("click", (e) => {
                    e.stopPropagation();
                    const pilarId = e.currentTarget.getAttribute("data-pilar-id");
                    const pautaId = e.currentTarget.getAttribute("data-pauta-id");
                    togglePautaUsed(pilarId, pautaId);
                });

                // Attach generate extra approach trigger
                itemEl.querySelector(".btn-generate-extra-approach").addEventListener("click", (e) => {
                    e.stopPropagation();
                    const pilarId = e.currentTarget.getAttribute("data-pilar-id");
                    const pautaId = e.currentTarget.getAttribute("data-pauta-id");
                    generateExtraApproach(pilarId, pautaId);
                });

                listContainer.appendChild(itemEl);
            });
        }

        // Attach add pauta trigger
        pilarEl.querySelector(".btn-add-pauta-trigger").addEventListener("click", (e) => {
            e.stopPropagation();
            const pilarId = e.currentTarget.getAttribute("data-pilar-id");
            openPautaModal(pilarId);
        });

        grid.appendChild(pilarEl);
    });
}

function sendToAIGenerator(pilarId, pautaTitle, apprTitle, gancho, mensagem) {
    const aiTheme = document.getElementById("ai-theme");
    const aiTemplate = document.getElementById("ai-prompt-template");
    const aiPilar = document.getElementById("ai-pilar");
    
    if (aiTheme && aiTemplate) {
        // Pre-fill theme
        aiTheme.value = `${pautaTitle} — Abordagem: ${apprTitle}`;
        
        if (aiPilar) {
            aiPilar.value = pilarId;
        }

        // Select template based on pilar
        let templateValue = "reels-short-conversational"; // default
        if (pilarId === "explain") {
            templateValue = "reels-stories-child-script";
        } else if (pilarId === "alert") {
            templateValue = "reels-short-conversational";
        } else if (pilarId === "myth") {
            templateValue = "reels-short-conversational";
        } else if (pilarId === "practice") {
            templateValue = "carousel-outline";
        } else if (pilarId === "conversion") {
            templateValue = "single-post-caption";
        }
        
        aiTemplate.value = templateValue;
        aiTemplate.dispatchEvent(new Event("change"));
        
        // Click navigation to Módulo IA
        const aiTab = document.querySelector('.nav-item[data-tab="ai-module"]');
        if (aiTab) {
            aiTab.click();
            showToast("Pauta carregada! Clique em 'Gerar com IA' para rodar.");
            setTimeout(() => aiTheme.focus(), 150);
        }
    }
}

function createRoteiroFromPauta(pilarId, pautaTitle, apprTitle, gancho, mensagem) {
    const newRoteiro = {
        id: "roteiro-" + Date.now(),
        title: `${pautaTitle} (${apprTitle})`,
        pilar: pilarId,
        status: "Ideia",
        scriptText: `GANCHO:\n${gancho}\n\nCONTEÚDO:\n${mensagem}`,
        caption: "",
        mediaDesc: `Vídeo planejado: ${apprTitle}`,
        dateCreated: new Date().toISOString().slice(0, 10)
    };
    
    if (!state.roteiros) state.roteiros = [];
    state.roteiros.push(newRoteiro);
    saveStateToLocalStorage();
    updateDashboardStats();
    
    showToast("Roteiro criado com sucesso na aba Roteiros!");
    
    const roteirosTab = document.querySelector('.nav-item[data-tab="roteiros"]');
    if (roteirosTab) {
        roteirosTab.click();
    }
    openRoteiroModal(newRoteiro.id);
}

function createPostFromPauta(pilarId, pautaTitle, apprTitle, gancho, mensagem) {
    const signature = state.wizard.doctorName || state.settings?.name || "Assinatura do Profissional";
    const caption = `${mensagem}\n\n↳ Salve esse post para consultar depois.\n\n${signature}`;
    
    const newPost = {
        id: "post-" + Date.now(),
        title: `${pautaTitle} (${apprTitle})`,
        channel: "instagram-reels",
        pilar: pilarId,
        status: "Rascunho",
        date: new Date().toISOString().slice(0, 10), // today
        time: "18:00",
        hookA: gancho,
        hookB: "",
        caption: caption,
        mediaDesc: `Vídeo planejado: ${apprTitle}`
    };
    
    state.posts.push(newPost);
    saveStateToLocalStorage();
    updateDashboardStats();
    
    showToast("Post criado como Rascunho!");
    openPostModal(newPost.id);
}

// ==========================================
// --- ROTEIROS DE GRAVAÇÃO (SCRIPT MANAGER) ---
// ==========================================

// --- Roteiro Media Helper Variables & Functions ---
let currentUploadedRoteiroMedia = null;

function showRoteiroUploadZoneState() {
    const mediaZone = document.getElementById("roteiro-media-upload-zone");
    const mediaProgress = document.getElementById("roteiro-media-upload-progress");
    const mediaPreviewContainer = document.getElementById("roteiro-media-preview-container");
    const mediaPreviewBox = document.getElementById("roteiro-media-preview-box");
    const mediaInput = document.getElementById("roteiro-media-file");

    if (mediaZone) mediaZone.style.display = "flex";
    if (mediaProgress) mediaProgress.style.display = "none";
    if (mediaPreviewContainer) mediaPreviewContainer.style.display = "none";
    if (mediaPreviewBox) mediaPreviewBox.innerHTML = "";
    if (mediaInput) mediaInput.value = "";

    // Re-enable save button
    const saveBtn = document.getElementById("btn-save-roteiro");
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.opacity = "";
        saveBtn.style.cursor = "";
        saveBtn.textContent = "Salvar Roteiro";
    }
}

function showRoteiroProgressState(text = "Processando...") {
    const mediaZone = document.getElementById("roteiro-media-upload-zone");
    const mediaProgress = document.getElementById("roteiro-media-upload-progress");
    const mediaPreviewContainer = document.getElementById("roteiro-media-preview-container");
    const mediaProgressFill = document.getElementById("roteiro-media-upload-progress-fill");
    const mediaProgressText = document.getElementById("roteiro-media-upload-progress-text");

    if (mediaZone) mediaZone.style.display = "none";
    if (mediaProgress) mediaProgress.style.display = "flex";
    if (mediaPreviewContainer) mediaPreviewContainer.style.display = "none";
    if (mediaProgressFill) mediaProgressFill.style.width = "0%";
    if (mediaProgressText) mediaProgressText.textContent = text;

    // Disable save button during upload
    const saveBtn = document.getElementById("btn-save-roteiro");
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.style.opacity = "0.6";
        saveBtn.style.cursor = "not-allowed";
        saveBtn.textContent = "Carregando mídia...";
    }
}

function showRoteiroPreviewState(url, filename, type) {
    const mediaZone = document.getElementById("roteiro-media-upload-zone");
    const mediaProgress = document.getElementById("roteiro-media-upload-progress");
    const mediaPreviewContainer = document.getElementById("roteiro-media-preview-container");
    const mediaPreviewBox = document.getElementById("roteiro-media-preview-box");
    const mediaPreviewFilename = document.getElementById("roteiro-media-preview-filename");
    const downloadMediaBtn = document.getElementById("btn-roteiro-download-media");
    const warningBox = document.getElementById("roteiro-local-media-warning");

    if (mediaZone) mediaZone.style.display = "none";
    if (mediaProgress) mediaProgress.style.display = "none";
    if (mediaPreviewContainer) mediaPreviewContainer.style.display = "flex";
    
    if (mediaPreviewFilename) mediaPreviewFilename.textContent = filename;
    if (downloadMediaBtn) downloadMediaBtn.href = url;
    
    if (mediaPreviewBox) {
        mediaPreviewBox.innerHTML = "";
        if (type === "video") {
            const video = document.createElement("video");
            video.src = url;
            video.controls = true;
            mediaPreviewBox.appendChild(video);
        } else {
            const img = document.createElement("img");
            img.src = url;
            mediaPreviewBox.appendChild(img);
        }
    }

    if (warningBox) {
        if (url && (url.startsWith("media/") || url.startsWith("blob:"))) {
            warningBox.style.display = "flex";
        } else {
            warningBox.style.display = "none";
        }
    }

    // Re-enable save button
    const saveBtn = document.getElementById("btn-save-roteiro");
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.opacity = "";
        saveBtn.style.cursor = "";
        saveBtn.textContent = "Salvar Roteiro";
    }
}

function handleRoteiroMediaSelect(file) {
    const mediaProgressFill = document.getElementById("roteiro-media-upload-progress-fill");
    const mediaProgressText = document.getElementById("roteiro-media-upload-progress-text");
    const downloadMediaBtn = document.getElementById("btn-roteiro-download-media");

    if (isSupabaseMode) {
        showRoteiroProgressState("Iniciando upload para Supabase...");
        
        const config = {
            supabaseUrl: window.SUPABASE_CONFIG.supabaseUrl,
            supabaseKey: window.SUPABASE_CONFIG.supabaseKey,
            supabaseBucket: window.SUPABASE_CONFIG.supabaseBucket || "media"
        };

        uploadFileToSupabase(
            file,
            config,
            (percent) => {
                if (mediaProgressFill) mediaProgressFill.style.width = `${percent}%`;
                if (mediaProgressText) mediaProgressText.textContent = `Enviando para o servidor: ${percent}%`;
            },
            (result) => {
                currentUploadedRoteiroMedia = {
                    url: result.publicUrl,
                    filename: result.filename,
                    type: result.type
                };
                showRoteiroPreviewState(result.publicUrl, result.filename, result.type);
                showToast("Upload concluído com sucesso!");
            },
            (error) => {
                showRoteiroUploadZoneState();
                showToast(`Erro no upload: ${error.message}`);
                console.error("Supabase Upload Error", error);
            }
        );
    } else if (isLocalServer) {
        // Local Node.js server — upload to /api/projects/:projectId/upload
        showRoteiroProgressState("Enviando arquivo para o servidor local...");
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/api/projects/${projectId}/upload`, true);
        
        const token = localStorage.getItem('hub_session_token');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                if (mediaProgressFill) mediaProgressFill.style.width = `${percent}%`;
                if (mediaProgressText) mediaProgressText.textContent = `Enviando para o servidor: ${percent}%`;
            }
        };
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const result = JSON.parse(xhr.responseText);
                    currentUploadedRoteiroMedia = {
                        url: result.url,
                        filename: result.filename,
                        type: result.type
                    };
                    showRoteiroPreviewState(result.url, result.filename, result.type);
                    showToast("Upload para o servidor concluído com sucesso!");
                } catch(e) {
                    showRoteiroUploadZoneState();
                    showToast("Erro ao processar resposta do servidor.");
                }
            } else {
                showRoteiroUploadZoneState();
                showToast("Erro no upload do servidor.");
            }
        };
        
        xhr.onerror = function() {
            showRoteiroUploadZoneState();
            showToast("Erro de rede ao conectar com o servidor.");
        };
        
        const formData = new FormData();
        formData.append('file', file);
        xhr.send(formData);
        
    } else {
        const hasSupabase = state.settings && state.settings.supabaseUrl && state.settings.supabaseKey;
        
        if (hasSupabase) {
            showRoteiroProgressState("Iniciando upload para Supabase...");
            
            const config = {
                supabaseUrl: state.settings.supabaseUrl,
                supabaseKey: state.settings.supabaseKey,
                supabaseBucket: state.settings.supabaseBucket || "media"
            };

            uploadFileToSupabase(
                file,
                config,
                (percent) => {
                    if (mediaProgressFill) mediaProgressFill.style.width = `${percent}%`;
                    if (mediaProgressText) mediaProgressText.textContent = `Enviando para o servidor: ${percent}%`;
                },
                (result) => {
                    currentUploadedRoteiroMedia = {
                        url: result.publicUrl,
                        filename: result.filename,
                        type: result.type
                    };
                    showRoteiroPreviewState(result.publicUrl, result.filename, result.type);
                    showToast("Upload concluído com sucesso!");
                },
                (error) => {
                    showRoteiroUploadZoneState();
                    showToast(`Erro no upload: ${error.message}`);
                    console.error("Supabase Upload Error", error);
                }
            );
        } else {
            const type = file.type.startsWith("video/") ? "video" : "image";
            const relativeUrl = `media/${file.name}`;
            const tempUrl = URL.createObjectURL(file);
            
            currentUploadedRoteiroMedia = {
                url: relativeUrl,
                filename: file.name,
                type: type
            };
            
            showRoteiroPreviewState(tempUrl, file.name, type);
            if (downloadMediaBtn) downloadMediaBtn.href = relativeUrl;
            
            showToast(`Modo Local: Salve "${file.name}" na pasta "media/" do seu Google Drive.`);
        }
    }
}

// --- Roteiros Manager setup ---
function setupRoteirosManager() {
    const newRoteiroBtn = document.getElementById("btn-new-roteiro");
    const searchInput = document.getElementById("search-roteiros");
    const filterStatus = document.getElementById("filter-roteiros-status");
    
    if (newRoteiroBtn) {
        newRoteiroBtn.addEventListener("click", () => openRoteiroModal());
    }
    
    if (searchInput) {
        searchInput.addEventListener("input", renderRoteirosList);
    }
    
    if (filterStatus) {
        filterStatus.addEventListener("change", renderRoteirosList);
    }

    // Modal close & save actions
    const closeBtn = document.getElementById("btn-close-roteiro-modal");
    const cancelBtn = document.getElementById("btn-cancel-roteiro");
    const saveBtn = document.getElementById("btn-save-roteiro");
    const deleteBtn = document.getElementById("btn-delete-roteiro");
    const convertBtn = document.getElementById("btn-convert-roteiro-post");
    const aiConvertBtn = document.getElementById("btn-ai-convert-roteiro");

    if (closeBtn) closeBtn.addEventListener("click", closeRoteiroModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeRoteiroModal);
    if (saveBtn) saveBtn.addEventListener("click", saveRoteiroForm);
    if (deleteBtn) deleteBtn.addEventListener("click", deleteRoteiroAction);
    if (convertBtn) convertBtn.addEventListener("click", convertRoteiroToPostAction);
    if (aiConvertBtn) aiConvertBtn.addEventListener("click", aiConvertRoteiroToPostAction);

    // Prevent accidental page reloads
    const roteiroForm = document.getElementById("roteiro-form");
    if (roteiroForm) {
        roteiroForm.addEventListener("submit", (e) => {
            e.preventDefault();
            saveRoteiroForm();
        });
    }

    // Character counter for caption
    const captionTextarea = document.getElementById("roteiro-caption");
    const counterLabel = document.getElementById("roteiro-char-counter");
    if (captionTextarea && counterLabel) {
        captionTextarea.addEventListener("input", () => {
            const text = captionTextarea.value || "";
            counterLabel.textContent = `${text.length} / 2200`;
            if (text.length > 2200) {
                counterLabel.style.color = "#ef4444";
            } else {
                counterLabel.style.color = "var(--text-secondary)";
            }
        });
    }

    // Drag & Drop / File Input setup for Roteiro Media
    const mediaZone = document.getElementById("roteiro-media-upload-zone");
    const mediaInput = document.getElementById("roteiro-media-file");
    const removeMediaBtn = document.getElementById("btn-roteiro-remove-media");

    if (mediaZone && mediaInput) {
        mediaZone.addEventListener("click", () => mediaInput.click());

        mediaZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            mediaZone.style.borderColor = "var(--primary)";
            mediaZone.style.background = "rgba(134, 77, 249, 0.04)";
        });

        ["dragleave", "dragend"].forEach(type => {
            mediaZone.addEventListener(type, () => {
                mediaZone.style.borderColor = "rgba(255, 255, 255, 0.1)";
                mediaZone.style.background = "rgba(255, 255, 255, 0.01)";
            });
        });

        mediaZone.addEventListener("drop", (e) => {
            e.preventDefault();
            mediaZone.style.borderColor = "rgba(255, 255, 255, 0.1)";
            mediaZone.style.background = "rgba(255, 255, 255, 0.01)";
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleRoteiroMediaSelect(files[0]);
            }
        });

        mediaInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                handleRoteiroMediaSelect(e.target.files[0]);
            }
        });
    }

    if (removeMediaBtn) {
        removeMediaBtn.addEventListener("click", () => {
            // Delete from Supabase bucket if applicable
            if (currentUploadedRoteiroMedia?.url) {
                deleteSupabaseFile(currentUploadedRoteiroMedia.url);
            }
            currentUploadedRoteiroMedia = { url: null, filename: null, type: null };
            showRoteiroUploadZoneState();
        });
    }
}

// --- Render list ---
function renderRoteirosList() {
    const pipeline = document.getElementById("roteiros-pipeline");
    if (!pipeline) return;

    // Colunas containers
    const cols = {
        ideias: document.getElementById("cards-col-ideias"),
        gravar: document.getElementById("cards-col-gravar"),
        edicao: document.getElementById("cards-col-edicao"),
        concluidos: document.getElementById("cards-col-concluidos")
    };
    
    const counts = {
        ideias: document.getElementById("count-col-ideias"),
        gravar: document.getElementById("count-col-gravar"),
        edicao: document.getElementById("count-col-edicao"),
        concluidos: document.getElementById("count-col-concluidos")
    };

    // Reset html e contagens
    Object.keys(cols).forEach(k => {
        if (cols[k]) cols[k].innerHTML = "";
        if (counts[k]) counts[k].textContent = "0";
    });

    const query = document.getElementById("search-roteiros")?.value.toLowerCase().trim() || "";
    const filterStatus = document.getElementById("filter-roteiros-status")?.value || "all";

    // Filtrar roteiros
    const filtered = (state.roteiros || []).filter(r => {
        const matchesQuery = !query || r.title.toLowerCase().includes(query) || 
                             (r.scriptText && r.scriptText.toLowerCase().includes(query)) || 
                             (r.caption && r.caption.toLowerCase().includes(query));
        const matchesStatus = filterStatus === "all" || r.status === filterStatus;
        return matchesQuery && matchesStatus;
    });

    // Ordenar por ID decrescente (mais recentes primeiro)
    filtered.sort((a, b) => b.id.localeCompare(a.id));

    const pilarLabels = {
        explain: "1. Sintomas",
        alert: "2. Alerta",
        myth: "3. Mitos",
        practice: "4. Prática",
        conversion: "5. Atendimento"
    };

    const colItemCounts = { ideias: 0, gravar: 0, edicao: 0, concluidos: 0 };

    filtered.forEach(r => {
        const colKey = getColumnForStatus(r.status);
        const colContainer = cols[colKey];
        if (!colContainer) return;

        colItemCounts[colKey]++;

        const card = document.createElement("div");
        card.classList.add("roteiro-pipeline-card");
        
        const snippet = r.scriptText ? (r.scriptText.slice(0, 100) + (r.scriptText.length > 100 ? '...' : '')) : 'Sem roteiro escrito.';
        const pilarLabel = pilarLabels[r.pilar] || r.pilar;

        card.innerHTML = `
            <div class="roteiro-card-title">${r.title}</div>
            <div class="roteiro-card-snippet">${snippet.replace(/\n/g, '<br>')}</div>
            <div class="roteiro-card-meta">
                <span class="roteiro-card-pilar pilar-${r.pilar}">${pilarLabel}</span>
                <div class="roteiro-card-actions">
                    <button class="btn-roteiro-action btn-edit-roteiro" data-id="${r.id}" title="Editar Roteiro"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-roteiro-action btn-duplicate-roteiro" data-id="${r.id}" title="Duplicar Roteiro"><i class="fa-solid fa-copy"></i></button>
                    <button class="btn-roteiro-action btn-ai-convert-roteiro convert-ai" data-id="${r.id}" title="Transformar em Post com IA"><i class="fa-solid fa-wand-magic-sparkles"></i></button>
                    <button class="btn-roteiro-action btn-convert-roteiro convert" data-id="${r.id}" title="Agendar Post Direto"><i class="fa-solid fa-calendar-plus"></i></button>
                </div>
            </div>
        `;

        colContainer.appendChild(card);
    });

    // Atualizar contadores
    Object.keys(counts).forEach(k => {
        if (counts[k]) counts[k].textContent = colItemCounts[k];
    });

    // Attach click handlers
    pipeline.querySelectorAll(".btn-edit-roteiro").forEach(btn => {
        btn.addEventListener("click", () => openRoteiroModal(btn.getAttribute("data-id")));
    });
    pipeline.querySelectorAll(".btn-convert-roteiro").forEach(btn => {
        btn.addEventListener("click", () => convertRoteiroToPost(btn.getAttribute("data-id")));
    });
    pipeline.querySelectorAll(".btn-ai-convert-roteiro").forEach(btn => {
        btn.addEventListener("click", () => aiConvertRoteiroToPost(btn.getAttribute("data-id")));
    });
    pipeline.querySelectorAll(".btn-duplicate-roteiro").forEach(btn => {
        btn.addEventListener("click", () => duplicateRoteiro(btn.getAttribute("data-id")));
    });
}

function getColumnForStatus(status) {
    if (status === "Ideia" || status === "Rascunho") return "ideias";
    if (status === "Para Gravar") return "gravar";
    if (status === "Gravado" || status === "Em Edição") return "edicao";
    if (status === "Concluído") return "concluidos";
    return "ideias";
}

// --- Modal setup ---
function openRoteiroModal(id = null) {
    const modal = document.getElementById("roteiro-modal");
    const form = document.getElementById("roteiro-form");
    const deleteBtn = document.getElementById("btn-delete-roteiro");
    const convertBtn = document.getElementById("btn-convert-roteiro-post");
    const aiConvertBtn = document.getElementById("btn-ai-convert-roteiro");
    const teleprompterBtn = document.getElementById("btn-teleprompter-roteiro");
    const titleText = document.getElementById("roteiro-modal-title");
    
    if (form) form.reset();
    
    if (id) {
        const r = (state.roteiros || []).find(item => item.id === id);
        if (r) {
            document.getElementById("roteiro-edit-id").value = r.id;
            document.getElementById("roteiro-title").value = r.title;
            document.getElementById("roteiro-pilar").value = r.pilar;
            document.getElementById("roteiro-status").value = r.status;
            document.getElementById("roteiro-script").value = r.scriptText || "";
            document.getElementById("roteiro-caption").value = r.caption || "";
            document.getElementById("roteiro-media-desc").value = r.mediaDesc || "";
            
            // Populate media
            if (r.mediaUrl) {
                currentUploadedRoteiroMedia = {
                    url: r.mediaUrl,
                    filename: r.mediaFileName || r.mediaUrl.split("/").pop(),
                    type: r.mediaType || (r.mediaUrl.match(/\.(mp4|webm|ogg|mov)$/i) ? "video" : "image")
                };
                showRoteiroPreviewState(r.mediaUrl, currentUploadedRoteiroMedia.filename, currentUploadedRoteiroMedia.type);
            } else {
                currentUploadedRoteiroMedia = null;
                showRoteiroUploadZoneState();
            }
            
            titleText.textContent = "Editar Roteiro de Gravação";
            deleteBtn.style.display = "inline-flex";
            convertBtn.style.display = "inline-flex";
            if (aiConvertBtn) aiConvertBtn.style.display = "inline-flex";
            if (teleprompterBtn) {
                teleprompterBtn.style.display = "inline-flex";
                teleprompterBtn.onclick = () => {
                    const script = document.getElementById("roteiro-script").value.trim();
                    openTeleprompter(script || "", r.title);
                };
            }
        }
    } else {
        titleText.textContent = "Novo Roteiro de Gravação";
        deleteBtn.style.display = "none";
        convertBtn.style.display = "none";
        if (aiConvertBtn) aiConvertBtn.style.display = "none";
        if (teleprompterBtn) teleprompterBtn.style.display = "none";
        
        currentUploadedRoteiroMedia = null;
        showRoteiroUploadZoneState();
    }

    modal.classList.add("active");
    document.getElementById("roteiro-caption").dispatchEvent(new Event("input"));
}

function closeRoteiroModal() {
    const modal = document.getElementById("roteiro-modal");
    if (modal) modal.classList.remove("active");
}

function saveRoteiroForm() {
    const id = document.getElementById("roteiro-edit-id").value;
    const title = document.getElementById("roteiro-title").value.trim();
    const pilar = document.getElementById("roteiro-pilar").value;
    const status = document.getElementById("roteiro-status").value;
    const scriptText = document.getElementById("roteiro-script").value.trim();
    const caption = document.getElementById("roteiro-caption").value.trim();
    const mediaDesc = document.getElementById("roteiro-media-desc").value.trim();

    if (!title) {
        showToast("Por favor, preencha o Título do Vídeo!");
        return;
    }

    if (!state.roteiros) state.roteiros = [];

    if (id) {
        const idx = state.roteiros.findIndex(r => r.id === id);
        if (idx !== -1) {
            const existing = state.roteiros[idx];
            state.roteiros[idx] = {
                ...existing,
                title, pilar, status, scriptText, caption, mediaDesc,
                mediaUrl: currentUploadedRoteiroMedia ? currentUploadedRoteiroMedia.url : existing.mediaUrl,
                mediaType: currentUploadedRoteiroMedia ? currentUploadedRoteiroMedia.type : existing.mediaType,
                mediaFileName: currentUploadedRoteiroMedia ? currentUploadedRoteiroMedia.filename : existing.mediaFileName
            };
            if (currentUploadedRoteiroMedia && currentUploadedRoteiroMedia.url === null) {
                delete state.roteiros[idx].mediaUrl;
                delete state.roteiros[idx].mediaType;
                delete state.roteiros[idx].mediaFileName;
            }
            showToast("Roteiro atualizado com sucesso!");
        }
    } else {
        const newRoteiro = {
            id: "roteiro-" + Date.now(),
            title, pilar, status, scriptText, caption, mediaDesc,
            dateCreated: new Date().toISOString().slice(0, 10)
        };
        if (currentUploadedRoteiroMedia && currentUploadedRoteiroMedia.url) {
            newRoteiro.mediaUrl = currentUploadedRoteiroMedia.url;
            newRoteiro.mediaType = currentUploadedRoteiroMedia.type;
            newRoteiro.mediaFileName = currentUploadedRoteiroMedia.filename;
        }
        state.roteiros.push(newRoteiro);
        showToast("Roteiro criado com sucesso!");
    }

    saveStateToLocalStorage();
    closeRoteiroModal();
    renderRoteirosList();
    updateDashboardStats();
}

function deleteRoteiroAction() {
    const id = document.getElementById("roteiro-edit-id").value;
    if (id && confirm("Deseja realmente apagar este roteiro de gravação?")) {
        const idx = state.roteiros.findIndex(r => r.id === id);
        if (idx !== -1) {
            // Remove mídia do bucket Supabase se existir
            const roteiro = state.roteiros[idx];
            if (roteiro?.mediaUrl) deleteSupabaseFile(roteiro.mediaUrl);

            state.roteiros.splice(idx, 1);
            saveStateToLocalStorage();
            closeRoteiroModal();
            renderRoteirosList();
            updateDashboardStats();
            showToast("Roteiro excluído!");
        }
    }
}

function duplicateRoteiro(id) {
    const r = (state.roteiros || []).find(item => item.id === id);
    if (r) {
        const duplicated = {
            ...r,
            id: "roteiro-" + Date.now(),
            title: r.title + " (Cópia)",
            status: "Rascunho",
            dateCreated: new Date().toISOString().slice(0, 10)
        };
        state.roteiros.push(duplicated);
        saveStateToLocalStorage();
        renderRoteirosList();
        updateDashboardStats();
        showToast("Roteiro duplicado com sucesso!");
    }
}

function convertRoteiroToPost(id) {
    const r = (state.roteiros || []).find(item => item.id === id);
    if (r) {
        const newPost = {
            id: "post-" + Date.now(),
            title: r.title,
            channel: "instagram-reels",
            pilar: r.pilar,
            status: "Rascunho",
            date: new Date().toISOString().slice(0, 10),
            time: "18:00",
            hookA: r.title,
            hookB: "",
            caption: r.caption || "",
            mediaDesc: r.mediaDesc || "Material gravado a partir do roteiro"
        };
        
        if (r.mediaUrl) {
            newPost.mediaUrl = r.mediaUrl;
            newPost.mediaType = r.mediaType;
            newPost.mediaFileName = r.mediaFileName;
        }

        state.posts.push(newPost);
        saveStateToLocalStorage();
        updateDashboardStats();
        
        showToast("Roteiro copiado para o Calendário como Rascunho!");
        openPostModal(newPost.id);
    }
}

function convertRoteiroToPostAction() {
    const id = document.getElementById("roteiro-edit-id").value;
    if (id) {
        closeRoteiroModal();
        convertRoteiroToPost(id);
    }
}

async function aiConvertRoteiroToPost(id) {
    const r = (state.roteiros || []).find(item => item.id === id);
    if (!r) {
        showToast("Roteiro não encontrado!");
        return;
    }
    
    if (!r.scriptText || r.scriptText.trim() === "") {
        showToast("Escreva o roteiro primeiro para que a IA possa gerar o post!");
        return;
    }
    
    // Choose model and key from settings/select
    const modelSelect = document.getElementById("ai-model-select");
    const model = modelSelect ? modelSelect.value : "gemini-3.5-flash";
    
    let apiKey = "";
    if (model.includes("gemini")) {
        apiKey = state.settings.geminiKey || "";
    } else {
        apiKey = state.settings.openaiKey || "";
    }
    
    const hasServerKey = window.SUPABASE_CONFIG && 
                         (model.includes("gemini") ? window.SUPABASE_CONFIG.hasServerGeminiKey : window.SUPABASE_CONFIG.hasServerOpenaiKey);

    if (!apiKey && !hasServerKey) {
        showToast(`Configure a chave de API para o modelo ${model.includes("gemini") ? "Gemini" : "OpenAI"} nas Configurações!`);
        return;
    }
    
    // Show global loader overlay
    const loader = document.getElementById("global-loader");
    const loaderText = document.getElementById("global-loader-text");
    if (loader) {
        if (loaderText) {
            loaderText.textContent = `Processando o roteiro "${r.title}" com IA para gerar uma legenda de post de alta conversão.`;
        }
        loader.classList.add("active");
    }
    
    try {
        const doctorName = state.wizard.doctorName || state.settings?.name || "Profissional";
        const valueProp = state.wizard.valueProp || "Serviço de alta qualidade";
        const target = state.wizard.targetAudience || "clientes";
        
        const baseContext = `Você é um especialista em marketing e copywriting profissional de alta conversão. O cliente é ${doctorName}.
Sua especialidade/foco é: ${valueProp}.
Público Alvo: ${target}.
Foco em educação, clareza, empatia, credibilidade e sem promessas absurdas ou jargões técnicos não explicados. Respeite as regulamentações éticas da profissão do cliente (como CFM para médicos, OAB para advogados, etc., se aplicável). Fale em português do Brasil e no tom conversacional, usando quebras de linha e emojis como marcadores.`;
        
        const prompt = `${baseContext}

Você recebeu o seguinte Roteiro de Gravação de Vídeo:
Título: "${r.title}"
Roteiro/Conteúdo do Vídeo:
"${r.scriptText}"

Sua tarefa é transformar esse roteiro de vídeo em um Post Editorial para redes sociais (Instagram/TikTok/Threads).
Escreva uma legenda envolvente, educativa e persuasiva com base no conteúdo do roteiro.
A legenda deve conter:
1. Um gancho inicial forte (primeira linha) que chame a atenção dos pais imediatamente. Sem "Olá pessoal" ou introduções burocráticas.
2. Desenvolvimento explicativo claro, direto e scannable.
3. Dicas práticas em formato de lista (bullet points com emojis).
4. Uma chamada para ação (CTA) sutil e ética de acordo com as diretrizes de marketing médico.
5. A assinatura obrigatória no final: "${doctorName}".

Escreva apenas a legenda final para o post, sem comentários, explicações adicionais ou introduções.`;
        
        let captionResult = "";
        if (model.includes("gemini")) {
            captionResult = await callGeminiAPI(apiKey, model, prompt);
        } else {
            captionResult = await callOpenAIAPI(apiKey, model, prompt);
        }
        
        // Clean markdown wrapper or extra ticks if the AI output has them
        captionResult = captionResult.trim().replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
        
        // Create new Post draft
        const newPost = {
            id: "post-" + Date.now(),
            title: r.title,
            channel: "instagram-reels", // default
            pilar: r.pilar,
            status: "Rascunho",
            date: new Date().toISOString().slice(0, 10),
            time: "18:00",
            hookA: r.title,
            hookB: "",
            caption: captionResult,
            mediaDesc: r.mediaDesc || "Material de vídeo gerado com base no roteiro"
        };
        
        // Transfer raw media if present
        if (r.mediaUrl) {
            newPost.mediaUrl = r.mediaUrl;
            newPost.mediaType = r.mediaType;
            newPost.mediaFileName = r.mediaFileName;
        }
        
        if (!state.posts) state.posts = [];
        state.posts.push(newPost);
        
        saveStateToLocalStorage();
        updateDashboardStats();
        renderContentList();
        renderCalendar();
        renderDashboardRecentList();
        
        if (loader) loader.classList.remove("active");
        showToast("Roteiro convertido em post com sucesso via IA!");
        
        // Close Roteiro Modal if open, then open Post Modal
        closeRoteiroModal();
        openPostModal(newPost.id);
        
    } catch (error) {
        console.error("AI Script conversion failed", error);
        if (loader) loader.classList.remove("active");
        showToast(`Erro na conversão IA: ${error.message}`);
    }
}

function aiConvertRoteiroToPostAction() {
    const id = document.getElementById("roteiro-edit-id").value;
    if (id) {
        aiConvertRoteiroToPost(id);
    }
}

function togglePautaUsed(pilarId, pautaId) {
    const pilar = state.pautas.find(p => p.id === pilarId);
    if (pilar) {
        const item = pilar.items.find(i => i.id === pautaId);
        if (item) {
            item.used = !item.used;
            saveStateToLocalStorage();
            renderPautas();
            showToast(item.used ? "Assunto marcado como utilizado!" : "Assunto marcado como não utilizado!");
        }
    }
}

async function generateExtraApproach(pilarId, pautaId) {
    const pilar = state.pautas.find(p => p.id === pilarId);
    if (!pilar) return;
    const item = pilar.items.find(i => i.id === pautaId);
    if (!item) return;

    // Choose model and key from settings/select
    const modelSelect = document.getElementById("ai-model-select");
    const model = modelSelect ? modelSelect.value : "gemini-3.5-flash";
    
    let apiKey = "";
    if (model.includes("gemini")) {
        apiKey = state.settings.geminiKey || "";
    } else {
        apiKey = state.settings.openaiKey || "";
    }
    
    const hasServerKey = window.SUPABASE_CONFIG && 
                         (model.includes("gemini") ? window.SUPABASE_CONFIG.hasServerGeminiKey : window.SUPABASE_CONFIG.hasServerOpenaiKey);

    if (!apiKey && !hasServerKey) {
        showToast(`Configure a chave de API para o modelo ${model.includes("gemini") ? "Gemini" : "OpenAI"} nas Configurações!`);
        return;
    }
    
    // Show global loader overlay
    const loader = document.getElementById("global-loader");
    const loaderText = document.getElementById("global-loader-text");
    if (loader) {
        if (loaderText) {
            loaderText.textContent = `Gerando nova abordagem criativa para a pauta: "${item.title}"...`;
        }
        loader.classList.add("active");
    }
    
    try {
        const doctorName = state.wizard.doctorName || state.settings?.name || "Profissional";
        const valueProp = state.wizard.valueProp || "Serviço de alta qualidade";
        const target = state.wizard.targetAudience || "clientes";
        
        const baseContext = `Você é um especialista em marketing e copywriting profissional de alta conversão. O cliente é ${doctorName}.
Sua especialidade/foco é: ${valueProp}.
Público Alvo: ${target}.
Foco em educação, clareza, empatia, credibilidade e sem promessas absurdas ou jargões técnicos não explicados. Respeite as regulamentações éticas da profissão do cliente (como CFM para médicos, OAB para advogados, etc., se aplicável). Fale em português do Brasil e no tom conversacional, usando quebras de linha e emojis como marcadores.`;
        
        if (!item.approaches) item.approaches = [];
        const existingTitles = item.approaches.map(a => a.title).join(", ");
        
        const prompt = `${baseContext}

Você recebeu o seguinte assunto de saúde infantil (Pauta):
Pilar de Conteúdo: ${pilar.name} (${pilar.desc})
Título do Tema: "${item.title}"
Descrição/Contexto: "${item.desc || "Sem descrição adicional"}"

Abordagens que já existem e que você NÃO deve repetir (gere um ângulo totalmente novo!):
[${existingTitles}]

Sua tarefa é criar uma abordagem de conteúdo inédita (um ângulo ou foco diferente sobre o mesmo tema).
A resposta deve seguir ESTRITAMENTE o formato abaixo:

TITULO: [Título curto e chamativo para esta abordagem]
GANCHO: [Um gancho de impacto inicial que prenda a atenção dos pais nos primeiros 5 segundos]
MENSAGEM: [A explicação central ou mensagem a ser passada de forma clara, empática e cientificamente correta]

Não escreva nada além deste formato. Sem introduções, observações ou markdown extra.`;
        
        let aiResult = "";
        if (model.includes("gemini")) {
            aiResult = await callGeminiAPI(apiKey, model, prompt);
        } else {
            aiResult = await callOpenAIAPI(apiKey, model, prompt);
        }
        
        // Clean markdown wrapper or extra ticks
        aiResult = aiResult.trim().replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
        
        // Clean bold markers for headings if any
        const cleanText = aiResult.replace(/\*\*/g, "").trim();
        
        const titleMatch = cleanText.match(/TITULO:\s*(.+)/i);
        const ganchoMatch = cleanText.match(/GANCHO:\s*(.+)/i);
        const mensagemMatch = cleanText.match(/MENSAGEM:\s*([\s\S]+)/i);
        
        if (!titleMatch || !ganchoMatch || !mensagemMatch) {
            console.warn("Regex parsing failed, raw result:", cleanText);
            throw new Error("Não foi possível parsear a resposta da IA no formato esperado.");
        }
        
        const newApproach = {
            title: titleMatch[1].trim(),
            gancho: ganchoMatch[1].trim(),
            mensagem: mensagemMatch[1].trim()
        };
        
        item.approaches.push(newApproach);
        saveStateToLocalStorage();
        
        if (loader) loader.classList.remove("active");
        showToast("Nova abordagem gerada com sucesso pela IA!");
        renderPautas();
        
    } catch (error) {
        console.error("AI Extra Approach generation failed", error);
        if (loader) loader.classList.remove("active");
        showToast(`Erro na geração da abordagem: ${error.message}`);
    }
}

/* ============================================================
   TELEPROMPTER ENGINE
   ============================================================ */

(function initTeleprompter() {

    // --- State ---
    let tpText       = "";
    let tpScrollY    = 0;          // current scroll position (px)
    let tpPlaying    = false;
    let tpMirrored   = false;
    let tpBg         = "dark";     // "dark" | "light" | "green"
    let tpCountdown  = true;       // countdown enabled
    let tpFontSize   = 48;
    let tpSpeed      = 3;          // 1‒10
    let tpRAF        = null;       // requestAnimationFrame handle
    let tpLastTs     = null;
    let tpTrackH     = 0;          // total scrollable height (text-track.scrollHeight)
    let tpStageH     = 0;          // visible stage height
    let tpEditMode   = false;

    // --- DOM refs (resolved lazily on first open) ---
    let overlay, stage, track, progressFill, playIcon,
        fullscreenIcon, countdownEl, countdownNum, editorWrap,
        textInput, titleLabel;

    function resolveDOM() {
        overlay       = document.getElementById("teleprompter-overlay");
        stage         = document.getElementById("tp-stage");
        track         = document.getElementById("tp-text-track");
        progressFill  = document.getElementById("tp-progress-fill");
        playIcon      = document.getElementById("tp-play-icon");
        fullscreenIcon= document.getElementById("tp-fullscreen-icon");
        countdownEl   = document.getElementById("tp-countdown");
        countdownNum  = document.getElementById("tp-countdown-number");
        editorWrap    = document.getElementById("tp-editor-wrap");
        textInput     = document.getElementById("tp-text-input");
        titleLabel    = document.getElementById("tp-title-label");
    }

    // --- Render text ---
    function renderText() {
        if (!track) return;
        track.textContent = tpText || "(sem texto — clique em ✏ para adicionar)";
        track.style.fontSize = tpFontSize + "px";
        tpScrollY = 0;
        track.style.transform = `translateY(0px)`;
        tpTrackH = track.scrollHeight;
        tpStageH = stage.clientHeight;
        updateProgress();
    }

    // --- Scroll engine (rAF) ---
    function scrollStep(ts) {
        if (!tpPlaying) return;
        if (tpLastTs === null) tpLastTs = ts;
        const dt = ts - tpLastTs;
        tpLastTs = ts;

        // speed 1 = 20px/s ... speed 10 = 200px/s
        const pxPerSec = tpSpeed * 20;
        tpScrollY += (pxPerSec * dt) / 1000;

        // Re-measure in case font/size changed
        tpTrackH = track.scrollHeight;
        tpStageH = stage.clientHeight;

        const maxScroll = Math.max(0, tpTrackH - tpStageH / 2);
        if (tpScrollY >= maxScroll) {
            tpScrollY = maxScroll;
            pauseScroll();
            updateProgress();
            track.style.transform = `translateY(${-tpScrollY}px)`;
            return;
        }

        track.style.transform = `translateY(${-tpScrollY}px)`;
        updateProgress();
        tpRAF = requestAnimationFrame(scrollStep);
    }

    function playScroll() {
        tpPlaying = true;
        tpLastTs = null;
        if (playIcon) { playIcon.className = "fa-solid fa-pause"; }
        tpRAF = requestAnimationFrame(scrollStep);
    }

    function pauseScroll() {
        tpPlaying = false;
        if (tpRAF) cancelAnimationFrame(tpRAF);
        tpRAF = null;
        if (playIcon) { playIcon.className = "fa-solid fa-play"; }
    }

    function togglePlay() {
        if (tpPlaying) {
            pauseScroll();
        } else {
            if (tpCountdown) {
                runCountdown(() => playScroll());
            } else {
                playScroll();
            }
        }
    }

    function updateProgress() {
        if (!progressFill) return;
        const maxScroll = Math.max(1, tpTrackH - tpStageH / 2);
        const pct = Math.min(100, (tpScrollY / maxScroll) * 100);
        progressFill.style.width = pct + "%";
    }

    // --- Countdown 3-2-1 ---
    function runCountdown(cb) {
        if (!countdownEl || !countdownNum) { cb(); return; }
        let count = 3;
        countdownEl.style.display = "flex";
        countdownNum.textContent = count;
        // re-trigger animation
        countdownNum.style.animation = "none";
        void countdownNum.offsetWidth;
        countdownNum.style.animation = "";

        const interval = setInterval(() => {
            count--;
            if (count <= 0) {
                clearInterval(interval);
                countdownEl.style.display = "none";
                cb();
            } else {
                countdownNum.textContent = count;
                countdownNum.style.animation = "none";
                void countdownNum.offsetWidth;
                countdownNum.style.animation = "";
            }
        }, 900);
    }

    // --- Background ---
    function setBg(bg) {
        tpBg = bg;
        overlay.classList.remove("tp-bg-dark", "tp-bg-light", "tp-bg-green");
        overlay.classList.add("tp-bg-" + bg);
        document.querySelectorAll(".tp-bg-btn").forEach(btn => {
            btn.classList.toggle("tp-bg-selected", btn.dataset.bg === bg);
        });
    }

    // --- Mirror ---
    function setMirror(on) {
        tpMirrored = on;
        overlay.classList.toggle("tp-mirrored", on);
        const btn = document.getElementById("tp-btn-mirror");
        if (btn) btn.classList.toggle("tp-btn-active", on);
    }

    // --- Font size ---
    function applyFontSize(size) {
        tpFontSize = size;
        if (track) track.style.fontSize = size + "px";
        tpTrackH = track ? track.scrollHeight : 0;
    }

    // --- Fullscreen ---
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            overlay.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }

    document.addEventListener("fullscreenchange", () => {
        if (!fullscreenIcon) return;
        if (document.fullscreenElement) {
            fullscreenIcon.className = "fa-solid fa-compress";
        } else {
            fullscreenIcon.className = "fa-solid fa-expand";
        }
    });

    // --- Edit mode toggle ---
    function setEditMode(on) {
        tpEditMode = on;
        if (editorWrap) editorWrap.style.display = on ? "flex" : "none";
        const btn = document.getElementById("tp-btn-edit");
        if (btn) btn.classList.toggle("tp-btn-active", on);
        if (on && textInput) {
            textInput.value = tpText;
            textInput.focus();
        }
    }

    // --- OPEN ---
    window.openTeleprompter = function(text, title) {
        resolveDOM();
        if (!overlay) return;

        // Reset
        pauseScroll();
        tpText = (text || "").trim();
        tpScrollY = 0;
        tpEditMode = false;
        if (editorWrap) editorWrap.style.display = "none";
        if (countdownEl) countdownEl.style.display = "none";

        // Set title
        if (titleLabel) titleLabel.textContent = title ? `📺 ${title}` : "Teleprompter";

        // Apply defaults
        setBg(tpBg);
        setMirror(tpMirrored);
        document.getElementById("tp-speed").value = tpSpeed;
        document.getElementById("tp-font-size").value = tpFontSize;

        // Render
        overlay.style.display = "flex";
        setTimeout(() => {
            renderText();
        }, 60);
    };

    // --- CLOSE ---
    function closeTeleprompter() {
        pauseScroll();
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        if (overlay) overlay.style.display = "none";
        if (countdownEl) countdownEl.style.display = "none";
    }

    // --- Wire buttons (delegated — safe to call before DOM ready) ---
    document.addEventListener("DOMContentLoaded", () => {
        resolveDOM();
        if (!overlay) return;

        // Close
        document.getElementById("tp-btn-close")?.addEventListener("click", closeTeleprompter);

        // Play / Pause
        document.getElementById("tp-btn-play")?.addEventListener("click", togglePlay);

        // Speed slider
        document.getElementById("tp-speed")?.addEventListener("input", (e) => {
            tpSpeed = Number(e.target.value);
        });

        // Font size slider
        document.getElementById("tp-font-size")?.addEventListener("input", (e) => {
            applyFontSize(Number(e.target.value));
        });

        // Mirror
        document.getElementById("tp-btn-mirror")?.addEventListener("click", () => {
            setMirror(!tpMirrored);
        });

        // Countdown toggle
        document.getElementById("tp-btn-countdown")?.addEventListener("click", () => {
            tpCountdown = !tpCountdown;
            const btn = document.getElementById("tp-btn-countdown");
            if (btn) btn.classList.toggle("tp-btn-active", tpCountdown);
        });

        // Background color buttons
        document.querySelectorAll(".tp-bg-btn").forEach(btn => {
            btn.addEventListener("click", () => setBg(btn.dataset.bg));
        });

        // Edit text toggle
        document.getElementById("tp-btn-edit")?.addEventListener("click", () => {
            setEditMode(!tpEditMode);
        });

        // Apply text from editor
        document.getElementById("tp-btn-apply-text")?.addEventListener("click", () => {
            tpText = textInput ? textInput.value.trim() : "";
            setEditMode(false);
            renderText();
        });

        // Fullscreen
        document.getElementById("tp-btn-fullscreen")?.addEventListener("click", toggleFullscreen);

        // Keyboard shortcuts (only active when teleprompter is visible)
        document.addEventListener("keydown", (e) => {
            if (!overlay || overlay.style.display === "none") return;
            if (tpEditMode && e.target === textInput) return;  // don't steal from textarea

            switch (e.code) {
                case "Space":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "KeyF":
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case "KeyM":
                    e.preventDefault();
                    setMirror(!tpMirrored);
                    break;
                case "Escape":
                    if (tpEditMode) {
                        setEditMode(false);
                    } else {
                        closeTeleprompter();
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    tpSpeed = Math.min(10, tpSpeed + 1);
                    const speedUp = document.getElementById("tp-speed");
                    if (speedUp) speedUp.value = tpSpeed;
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    tpSpeed = Math.max(1, tpSpeed - 1);
                    const speedDown = document.getElementById("tp-speed");
                    if (speedDown) speedDown.value = tpSpeed;
                    break;
            }
        });
    });

})();
