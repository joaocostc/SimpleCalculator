const { createApp } = Vue // Importa a função "createApp" do Vue

createApp({ // 
    // Define os dados do aplicativo
    data() {
        return {
            display: "0",
            numeroAtual: null,
            numeroAnterior: null,
            operador: null
        }
    },
    // Define os métodos do aplicativo
    methods: {
        // Método para lidar com os cliques dos botões da calculadora 
        lidarBotao(botao) {
            switch (botao) {
                // Caso o botão clicado seja um operador aritmético (+, -, /, *)
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao);
                    break
                // Caso o botão clicado seja um ponto para números decimais
                case ".":
                    this.lidarDecimal();
                    break
                case "=":
                // Caso o botão clicado represente a operação de igualdade
                    this.lidarIgual();
                    break
                // Caso o botão clicado represente o botão "AC" (All Clear)
                case "AC":
                    this.lidarClear();
                    break
                // Caso o botão clicado represente um número
                default:
                    this.lidarNumero(botao);
            }
        },
        // Método para lidar com cliques em operadores aritméticos (+, -, *, /)
        lidarOperador(botao) {
            if (this.numeroAtual !== null) {
                this.lidarIgual();
            }
            this.operador = botao;
            this.numeroAnterior = parseFloat(this.display);
            this.numeroAtual = null;
        },
        // Método para lidar com cliques em pontos decimais (.)
        lidarDecimal() {
            if (!this.numeroAtual.includes(".")) {
                this.numeroAtual += ".";
            }
        },
        // Método para com cliques no botão de igual (=)
        lidarIgual() {
            if (this.numeroAtual !== null) {
                switch (this.operador) {
                    case "+":
                        this.display = parseFloat(this.numeroAnterior) + parseFloat(this.display);
                        break
                    case "-":
                        this.display = parseFloat(this.numeroAnterior) - parseFloat(this.display);
                        break
                    case "*":
                        this.display = parseFloat(this.numeroAnterior) * parseFloat(this.display);
                        break
                    case "/":
                        // Verificação para evitar divisão por zero
                        const divisor = parseFloat(this.display);
                        if (divisor !== 0) {
                            this.display = parseFloat(this.numeroAnterior) / divisor;
                        } else {
                            this.display = "Erro";
                        }
                        break;
                }
                this.numeroAnterior = null;
                this.numeroAtual = null;
                this.operador = null;
            }
        },
        // Método para lidar com cliques no botão "AC" (All Clear)
        lidarClear() {
            this.display = 0;
            this.operador = null;
            this.numeroAnterior = null;
            this.numeroAtual = null;
        },
        // Método para lidar com cliques em números
        lidarNumero(numeroClicado) {
            if (this.numeroAtual === null) {
                this.numeroAtual = numeroClicado;
            } else {
                this.numeroAtual += numeroClicado;
            }
            this.display = this.numeroAtual;
        }
    }
}).mount("#app") // Monta o aplicativo na tag div que contém o id "app"