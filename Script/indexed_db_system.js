class PlimDB {
    constructor(dbName = 'PlimDB', version = 1) {
        // Nome do banco de dados
        this.dbName = dbName;
        // Versão inicial do esquema. Incremente para forçar o 'onupgradeneeded'
        this.version = version;
        // Objeto IDBDatabase que será a conexão ativa
        this.db = null;
        // Array com os nomes de todas as Object Stores (tabelas)
        this.storeNames = [
            'Configuracoes',
            'Dashboards',
            'Origens',
            'Recursos',
            'Templates',
            'Modelos'
        ];

        // Certifica-se de que o IndexedDB é suportado
        if (!window.indexedDB) {
            console.error("Seu navegador não suporta IndexedDB.");
            throw new Error("IndexedDB não suportado.");
        }
    }

    /**
     * Abre a conexão com o banco de dados.
     * @returns {Promise<IDBDatabase>} A promessa resolve com o objeto IDBDatabase.
     */
    open() {
        return new Promise((resolve, reject) => {
            // Se já estiver conectado, resolve imediatamente
            if (this.db) {
                return resolve(this.db);
            }

            console.log(`Tentando abrir o banco de dados: ${this.dbName} (v${this.version})`);
            const request = window.indexedDB.open(this.dbName, this.version);

            // --- Gerenciamento de Erros e Sucesso ---

            request.onerror = (event) => {
                console.error("Erro ao abrir o IndexedDB:", event.target.errorCode);
                reject(new Error("Erro ao abrir o IndexedDB."));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log("Conexão com IndexedDB estabelecida com sucesso.");
                
                // Trata o fechamento inesperado do DB (ex: por outra aba)
                this.db.onversionchange = () => {
                    this.db.close();
                    alert("O banco de dados foi atualizado. Por favor, recarregue a página.");
                    this.db = null;
                };

                resolve(this.db);
            };

            // --- Criação/Atualização do Esquema (Tabelas) ---

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                console.log(`Upgrade/Criação do banco de dados necessário. Versão antiga: ${event.oldVersion}, Nova versão: ${event.newVersion}`);

                // Itera sobre os nomes das Object Stores desejadas
                this.storeNames.forEach(storeName => {
                    // Se a Object Store já existe, remove (apenas para exemplo de atualização limpa)
                    // **CUIDADO:** Em produção, você deve ter lógica mais fina para preservar dados.
                    if (db.objectStoreNames.contains(storeName)) {
                        db.deleteObjectStore(storeName);
                        console.log(`Object Store existente deletada: ${storeName}`);
                    }
                    
                    // Cria a Object Store com uma chave primária auto-incrementável ('id')
                    const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                    console.log(`Object Store criada: ${storeName}`);

                    // Exemplo de criação de índice (pode ser útil)
                    // store.createIndex('nomeIndex', 'nomeCampo', { unique: false });
                });
            };
        });
    }

    /**
     * Cria uma Transação para operações CRUD.
     * @param {string} storeName - O nome da Object Store.
     * @param {('readonly'|'readwrite')} mode - O modo da transação.
     * @returns {IDBObjectStore} O objeto Object Store da transação.
     */
    getTransactionStore(storeName, mode = 'readonly') {
        if (!this.db) {
            throw new Error("Conexão com o IndexedDB não está aberta. Chame PlimDB.open() primeiro.");
        }
        if (!this.storeNames.includes(storeName)) {
            throw new Error(`A Object Store "${storeName}" não existe.`);
        }
        
        const transaction = this.db.transaction([storeName], mode);
        return transaction.objectStore(storeName);
    }

    /**
     * Adiciona um novo item (ou atualiza se 'id' existir e o keyPath for usado).
     * @param {string} storeName - O nome da Object Store.
     * @param {object} data - O objeto de dados a ser adicionado/colocado.
     * @returns {Promise<number>} A promessa resolve com a chave primária (ID) do item.
     */
    add(storeName, data) {
        return new Promise((resolve, reject) => {
            try {
                const store = this.getTransactionStore(storeName, 'readwrite');
                const request = store.put(data);

                request.onsuccess = (event) => {
                    resolve(event.target.result); // O ID da chave
                };

                request.onerror = (event) => {
                    console.error(`Erro ao adicionar/atualizar em ${storeName}:`, event.target.error);
                    reject(event.target.error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Remove o item a partir do ID.
     * @param {string} storeName - O nome da Object Store.
     * @param {number} id - O id do objeto a ser deletado.
     * @returns {Promise<boolean>} A promessa resolve com verdadeiro.
     */
    delete(storeName, id) {
        return new Promise( async (resolve, reject) => {
            try {
                const item = await this.get(storeName, id);
                const store = this.getTransactionStore(storeName, 'readwrite');
                const request = store.delete(id);

                request.onsuccess = (event) => {
                    item ? resolve(true) : resolve(false)
                };

                request.onerror = (event) => {
                    console.error(`Erro ao adicionar/atualizar em ${storeName}:`, event.target.error);
                    reject(event.target.error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Busca o item a partir do ID.
     * @param {string} storeName - O nome da Object Store.
     * @param {number} id - O id do objeto a ser retornado.
     * @returns {Promise<object>} A promessa resolve com o item.
     */
    get(storeName, id) {
        return new Promise((resolve, reject) => {
            try {
                const store = this.getTransactionStore(storeName, 'readwrite');
                const request = store.get(id);

                request.onsuccess = (event) => {
                    resolve(event.target.result); // retorna o item
                };

                request.onerror = (event) => {
                    console.error(`Erro ao adicionar/atualizar em ${storeName}:`, event.target.error);
                    reject(event.target.error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // ... Aqui você adicionaria métodos como get(storeName, id), getAll(storeName), delete(storeName, id) ...
    
    /**
     * Retorna todos os objetos de uma Object Store.
     * @param {string} storeName - O nome da Object Store.
     * @returns {Promise<Array<object>>} Uma promessa que resolve com um array dos dados.
     */
    getAll(storeName) {
        return new Promise((resolve, reject) => {
            try {
                const store = this.getTransactionStore(storeName, 'readonly');
                const request = store.getAll();

                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };

                request.onerror = (event) => {
                    console.error(`Erro ao buscar todos em ${storeName}:`, event.target.error);
                    reject(event.target.error);
                };
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * Fecha a conexão com o banco de dados.
     */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
            console.log("Conexão com IndexedDB fechada.");
        }
    }
}

const plimDB = new PlimDB();
plimDB.open();