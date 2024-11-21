<script>
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');

        // Respostas com palavras-chave agrupadas
        const respostasPorPalavrasChave = [
            {
                regex: /oi|olá|bom\s*dia/i,
                resposta: "Olá! Como posso ajudar você?"
            },
            {
                regex: /\b(?:signos?)\b/i, // Captura "signo" ou "signos"
                resposta: "Os signos do zodíaco representam diferentes arquétipos astrológicos associados aos 12 meses do ano. Cada signo possui características únicas e está ligado a um elemento: fogo, terra, ar ou água. Me diga o nome de um signo para saber mais!"
            },
            {
                regex: /pode\s*faz(er)?|o\s*que\s*voce\s*faz|oq\s*vc\s*faz/i,
                resposta: "Sou uma AI... Inteligência Artificial, eu estou disposto a poder te ajudar com a Astrologia"
            },
            // {
            //     regex: /contrato|negócios|data/i,
            //     resposta: "Para fechar um contrato de negócios, uma boa data pode ser no meio da semana, como uma quarta ou quinta-feira. Depende da sua disponibilidade e da outra parte."
            // },
            {
                regex: /tchau|adeus|até\s*mais/i,
                resposta: "Até mais! Foi um prazer ajudar."
            },
            {
                regex: /horóscopo|horoscopo|horoscop/i,
                resposta: "Para saber qual é o seu horóscopo, preciso saber a sua data de nascimento! Qual é a sua data de nascimento?"
            },
            {
                regex: /planeta|planetas/i,
                resposta: "Os planetas têm grande influência em nossa vida. Por exemplo, Marte está associado à ação e à coragem, enquanto Vênus rege o amor e os relacionamentos."
            },
            {
                regex: /casa astrológica|casas astrológicas|casas/i,
                resposta: "Existem 12 casas astrológicas que representam diferentes áreas da vida. Por exemplo, a 1ª casa está associada à sua personalidade e a 7ª à parceria e relacionamentos."
            },
            {
                regex: /qualidade|qualidades|fixo|cardeal|mutável/i,
                resposta: "Os signos têm três qualidades: Cardeal (início), Fixo (estabilidade) e Mutável (adaptação). Cada signo tem uma qualidade específica."
            },
            {
                regex: /\b(o\s*que\s*)?(é\s*)?(astrologia|astrologia|astros)\b/i,
                resposta: "Astrologia é uma prática ancestral que estuda a influência dos astros (como planetas e estrelas) sobre os eventos e comportamentos na Terra. Ela se baseia na ideia de que a posição dos corpos celestes no momento do nascimento de uma pessoa pode afetar suas características, comportamento e até mesmo o destino.\n"
                + "O sistema astrológico mais popular é o zodíaco, que é composto por 12 signos (Áries, Touro, Gêmeos, Câncer, Leão, Virgem, Libra, Escorpião, Sagitário, Capricórnio, Aquário e Peixes). Cada signo está associado a diferentes características e comportamentos, e a astrologia busca interpretar como esses signos e a posição dos planetas influenciam as vidas das pessoas."
                + "Além disso, a astrologia usa conceitos como casas astrológicas, aspectos planetários e elementos (fogo, terra, ar e água) para oferecer insights sobre áreas específicas da vida, como amor, carreira, saúde e mais. É importante notar que, enquanto a astrologia é uma prática com muitos seguidores, ela não é considerada uma ciência pela comunidade científica, sendo mais vista como uma forma de crença ou prática esotérica."
            },
            {
                regex: /astrologia amor|relacionamento|amor/i,
                resposta: "Quer saber sobre a compatibilidade amorosa? Me fale o signo de você e da sua pessoa, e posso te contar como os astros influenciam o amor entre vocês."
            },
            {
                regex: /astrologia carreira|trabalho|carreira|profissão/i,
                resposta: "Cada signo também tem suas características relacionadas à carreira. Por exemplo, Capricórnio é muito bom com planejamento e liderança, enquanto Gêmeos é excelente em comunicação e adaptação."
            },
            {
                regex: /horóscopo diário|previsão do dia|horóscopo hoje/i,
                resposta: "Posso te dar o horóscopo diário! Me fale seu signo para saber o que os astros reservam para hoje."
            },
            {
                regex: /horóscopo semanal|previsão semanal|astrologia semana/i,
                resposta: "Quer saber a previsão da semana? Me fale seu signo e eu te direi o que esperar para os próximos dias."
            },
            {
                regex: /elemento|elementos/i,
                resposta: "Na astrologia, os elementos são quatro: fogo, terra, ar e água. Cada um corresponde a três signos do zodíaco."
            },
            {
                regex: /\b(?:signo\s+de\s+)?(\w+)\b/i,
                resposta: (mensagem) => {
                    const signos = {
                        "aries": "Áries: O primeiro signo do zodíaco, impulsivo e cheio de energia. Perfeito para liderar.",
                        "touro": "Touro: Signo de terra, com foco em estabilidade e conforto material.",
                        "gemeos": "Gêmeos: Signo de ar, versátil e curioso. Sempre em busca de novas informações.",
                        "cancer": "Câncer: Signo de água, emocional e protetor. Valoriza a família e a intimidade.",
                        "leao": "Leão: Signo de fogo, criativo e generoso. Ama ser o centro das atenções.",
                        "virgem": "Virgem: Signo de terra, detalhista e prático. Busca a perfeição em tudo.",
                        "libra": "Libra: Signo de ar, diplomático e equilibrado. Ama a harmonia nas relações.",
                        "escorpiao": "Escorpião: Signo de água, intenso e misterioso. Busca profundidade nas emoções.",
                        "sagitario": "Sagitário: Signo de fogo, aventureiro e otimista. Ama a liberdade e novas experiências.",
                        "capricornio": "Capricórnio: Signo de terra, responsável e ambicioso. Foca em metas de longo prazo.",
                        "aquario": "Aquário: Signo de ar, inovador e humanitário. Sempre pensando no futuro.",
                        "peixes": "Peixes: Signo de água, sensível e intuitivo. Conectado com o mundo espiritual e emocional."
                    };

                    const match = mensagem.match(/\b(?:signo\s+de\s+)?(\w+)\b/i);

                    if (match) {
                        const nomeSigno = match[1]?.toLowerCase();

                        if (signos[nomeSigno]) {
                            return signos[nomeSigno];
                        } else {
                            return "Desculpe, não entendi o signo que você mencionou. Pode tentar novamente?";
                        }
                    }
                }
            }

        ];

        let esperandoData = false; // Variável de controle para saber se está esperando a data de nascimento

        // Função para remover acentos de uma string
        const removerAcentos = (texto) => {
            return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };

        // Função para encontrar a resposta com base nas palavras-chave
        const encontrarResposta = (mensagem) => {
            const mensagemSemAcentos = removerAcentos(mensagem.toLowerCase()); // Remove os acentos da mensagem

            if (esperandoData) {
                // Verifica se a data está no formato DD/MM
                const dataNascimento = mensagem.trim();
                const dataValida = validarData(dataNascimento);

                if (!dataValida) {
                    return "A data fornecida não é válida. Por favor, envie a data no formato DD/MM.";
                }

                // Calcula o signo com base na data
                const [dia, mes] = dataNascimento.split('/').map(Number);
                const signo = calcularSigno(dia, mes);

                // Resetar o estado de "esperandoData" após receber a data
                esperandoData = false;

                return `Entendi, sua data de nascimento é ${dataNascimento}. Seu signo é ${signo}. Aqui está o seu horóscopo para hoje...`;
            }

            // Verifica se alguma das expressões regulares corresponde à mensagem, removendo acentos
            for (const item of respostasPorPalavrasChave) {
                const regex = new RegExp(removerAcentos(item.regex.source), "i"); // Remove acentos da regex
                if (regex.test(mensagemSemAcentos)) {
                    if (item.regex.toString().includes("horóscopo")) {
                        esperandoData = true; // Marcar que estamos esperando a data
                        return item.resposta; // Solicita a data de nascimento
                    } else if (typeof item.resposta === 'function') {
                        return item.resposta(mensagem);
                    }
                    return item.resposta;
                }
            }

            return "Desculpe, não entendi sua pergunta.";
        };

        // Função para validar a data no formato DD/MM
        const validarData = (data) => {
            const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/;
            return regex.test(data);
        };

        // Função para calcular o signo baseado na data de nascimento
        const calcularSigno = (dia, mes) => {
            if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return "Áries";
            if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return "Touro";
            if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return "Gêmeos";
            if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return "Câncer";
            if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return "Leão";
            if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return "Virgem";
            if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return "Libra";
            if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return "Escorpião";
            if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return "Sagitário";
            if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return "Capricórnio";
            if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return "Aquário";
            if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return "Peixes";
        };

        // Enviar mensagem ao clicar no botão ou pressionar Enter
        const enviarMensagem = () => {
            const mensagem = chatInput.value.trim().toLowerCase();
            if (mensagem === "") return;

            // Adicionar mensagem do usuário
            adicionarMensagem("Você", mensagem);
            chatInput.value = "";

            // Responder com base em palavras-chave
            const resposta = encontrarResposta(mensagem);
            setTimeout(() => adicionarMensagem("Chatbot", resposta), 500);
        };

        // Função para adicionar mensagem ao chat
        const adicionarMensagem = (autor, texto) => {
            const novaMensagem = document.createElement('div');
            novaMensagem.style.marginBottom = "10px";
            novaMensagem.innerHTML = `<strong>${autor}:</strong> ${texto}`;
            chatMessages.appendChild(novaMensagem);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Rolar para o fim
        };

        // Event listeners
        sendButton.addEventListener('click', enviarMensagem);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === "Enter") enviarMensagem();
        });
    </script>
