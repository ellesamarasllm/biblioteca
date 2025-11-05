class BibliotecaError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BibliotecaError";
    }
}

class LivroNaoDisponivelError extends BibliotecaError {
    constructor(titulo: string) {
        super(`ERRO: O livro "${titulo}" não está disponível no momento.`);
        this.name = "LivroNaoDisponivelError";
    }
}

class LivroNaoEncontradoError extends BibliotecaError {
    constructor(titulo: string) {
        super(`ERRO: O livro "${titulo}" não foi encontrado na biblioteca.`);
        this.name = "LivroNaoEncontradoError";
    }
}

class OperacaoInvalidaError extends BibliotecaError {
    constructor(message: string) {
        super(`ERRO: ${message}`);
        this.name = "OperacaoInvalidaError";
    }
}

class Livro {
    public titulo: string;
    public autor: string;
    public disponivel: boolean;
    public emprestadoPara: string | null;

    constructor(titulo: string, autor: string) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = true;
        this.emprestadoPara = null;
    }
}

class Biblioteca {
    private livros: Livro[] = [];

    adicionarLivro(livro: Livro): void {
        if (!livro || !livro.titulo || !livro.autor) {
            throw new OperacaoInvalidaError("Dados do livro são inválidos.");
        }
        if (this.livros.some(l => l.titulo === livro.titulo)) {
            throw new OperacaoInvalidaError(`Livro "${livro.titulo}" já existe na biblioteca.`);
        }
        this.livros.push(livro);
    }

    private validarInput(valor: string, campo: string): void {
        if (!valor || valor.trim().length === 0) {
            throw new OperacaoInvalidaError(`${campo} não pode estar vazio.`);
        }
    }

    private buscarLivro(titulo: string): Livro {
        this.validarInput(titulo, "Título do livro");
        const livro = this.livros.find(l => l.titulo === titulo);
        if (!livro) {
            throw new LivroNaoEncontradoError(titulo);
        }
        return livro;
    }

    public async consultarStatus(titulo: string): Promise<{ disponivel: boolean; emprestadoPara: string | null }> {
        await new Promise(resolve => setTimeout(resolve, 100));
        const livro = this.buscarLivro(titulo);
        return {
            disponivel: livro.disponivel,
            emprestadoPara: livro.emprestadoPara
        };
    }

    public async emprestar(titulo: string, usuario: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 500)); 

        this.validarInput(usuario, "Nome do usuário");
        const livro = this.buscarLivro(titulo);

        if (!livro.disponivel) {
            throw new LivroNaoDisponivelError(titulo);
        }

        if (this.livros.some(l => !l.disponivel && l.emprestadoPara === usuario)) {
            throw new OperacaoInvalidaError(`Usuário ${usuario} já possui um livro emprestado.`);
        }

        livro.disponivel = false;
        livro.emprestadoPara = usuario;

        return `SUCESSO: "${titulo}" emprestado para ${usuario}.`;
    }

    public async devolver(titulo: string, usuario: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 300)); 
        
        this.validarInput(usuario, "Nome do usuário");
        const livro = this.buscarLivro(titulo);

        if (livro.disponivel) {
            throw new OperacaoInvalidaError(`O livro "${titulo}" já estava na biblioteca.`);
        }
        
        if (livro.emprestadoPara !== usuario) {
            throw new OperacaoInvalidaError(`"${titulo}" está emprestado para outro usuário.`);
        }

        livro.disponivel = true;
        livro.emprestadoPara = null;

        return `SUCESSO: "${titulo}" devolvido por ${usuario}.`;
    }

    public async listarLivros(): Promise<Livro[]> {
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.livros;
    }
}