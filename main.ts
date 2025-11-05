async function main() {
    console.log("--- Sistema de Gerenciamento de Livros ---");

    const biblioteca = new Biblioteca();
    biblioteca.adicionarLivro(new Livro("A Riqueza das Nações", "Adam Smith"));
    biblioteca.adicionarLivro(new Livro("1984", "George Orwell"));
    biblioteca.adicionarLivro(new Livro("O Pequeno Príncipe", "Saint-Exupéry"));

    const usuario1 = "Maria Silva";
    const usuario2 = "João Souza";
    const livro1 = "A Riqueza das Nações";
    const livro2 = "1984";
    const livro3 = "O Morro dos Ventos Uivantes";

    console.log(`\nLivros iniciais na biblioteca:`);
    (await biblioteca.listarLivros()).forEach(l => console.log(`- ${l.titulo} (Disponível: ${l.disponivel})`));

    console.log("\n--- TESTE 1: Empréstimo BEM-SUCEDIDO ---");
    try {
        const resultado = await biblioteca.emprestar(livro1, usuario1);
        console.log(resultado);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error(`Falha na operação: ${errorMessage}`);
    }


    console.log("\n--- TESTE 2: Empréstimo de Livro INDISPONÍVEL (Exceção) ---");
    try {
        const resultado = await biblioteca.emprestar(livro1, usuario2);
        console.log(resultado);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error(`Falha na operação: ${errorMessage}`);
    }

    console.log("\n--- TESTE 3: Devolução BEM-SUCEDIDA ---");
    try {
        const resultado = await biblioteca.devolver(livro1, usuario1);
        console.log(resultado);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error(`Falha na operação: ${errorMessage}`);
    }
    
    console.log("\n--- TESTE 4: Empréstimo de Livro INEXISTENTE (Exceção) ---");
    try {
        const resultado = await biblioteca.emprestar(livro3, usuario2);
        console.log(resultado);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error(`Falha na operação: ${errorMessage}`);
    }

    console.log("\n--- STATUS FINAL ---");
    (await biblioteca.listarLivros()).forEach(l => console.log(`- ${l.titulo} (Disponível: ${l.disponivel}, Emprestado para: ${l.emprestadoPara ?? 'Ninguém'})`));
}

main();