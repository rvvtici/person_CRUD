const mode = document.getElementById("icone");

mode.addEventListener('click', () => {
    const form = document.getElementById("form");
    const botao = document.getElementById("botao");
    const href = document.getElementById("href");
    const body = document.body;
    const a = document.a;

    if(mode.classList.contains('fa-sun')){
        mode.classList.remove('fa-sun');
        mode.classList.add('fa-moon');

        form.classList.add('dark');
        botao.classList.add('dark');
        body.classList.add('dark');
        a.classList.add('dark');
        href.classList.add('dark');


        return ;
    }

    mode.classList.remove('fa-moon');
    mode.classList.add('fa-sun');

    form.classList.remove('dark');
    botao.classList.remove('dark');
    body.classList.remove('dark');
    a.classList.remove('dark');
    href.classList.remove('dark');


});
