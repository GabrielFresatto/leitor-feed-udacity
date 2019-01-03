/* feedreader.js JASMINE SPEC


/* 	O código se encontra dentro de $() para garantir que só execute esse arquivo
	após carregar os elementos HTML. */
$(function() {
    describe('RSS Feeds', function() {
        /* Verifica se	allFeeds foi definido e não está vazio*/
        it('Foram definidos', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Todos os feeds possuem uma url válida */
		it('Tem uma URL válida', function() {
			allFeeds.forEach(function(value, index) {
				expect(value.url).toBeDefined();
				expect(value.url).not.toBe('');
			});
		});


        /* Todos os feeds devem ter um nome */

		 it('Existe um nome pro feed', function() {
			allFeeds.forEach(function(value, index) {
				expect(value.name).toBeDefined();
				expect(value.name).not.toEqual('');
			});
		 });
    });


    describe("The menu", function() {
		/* Verifica se o menu está oculto por padrão. */
		it('Menu oculto por padrão', function(){
			const hasMenuHiddenClass = $('body').hasClass('menu-hidden');
			expect(hasMenuHiddenClass).toBe(true);
		});
		
		/* Verifica a visibilidade do menu esteja certaem cada clique */
		it('Ao clicar no ícone do menu', function() {
			const menuIcon = $('.menu-icon-link');
			let isNotVisible;
			
			// Simula um clique no botão
			menuIcon.click();
			isNotVisible = $('body').hasClass('menu-hidden');
			expect(isNotVisible).toBe(false);

			// Simula outro clique no botão
			menuIcon.click();
			isNotVisible = $('body').hasClass('menu-hidden');
			expect(isNotVisible).toBe(true);
		});	 
	});


	describe('Initial Entries', function() {
		/* Verifica se ao menos uma entrada existe quando a função loadFeed for executada */
		beforeEach(function(done){
			loadFeed(0, done);
		});

		it('Ao menos um elemento .entry no container .feed', function(done) {
			const entrysOnFeed = $('.feed').find('.entry');
			expect(entrysOnFeed.length).toBeGreaterThan(0);
			done();
		});
	});


    describe('New Feed Selection', function() {
		let oldFirstTitle,
			newFirstTitle;
		
		/* Confirma se o conteúdo muda escolher outro feed */
		beforeEach(function(done) {
			loadFeed(0, function() {
				oldFirstTitle = $('.entry h2:first');
				done();
			});
			loadFeed(1, function(){
				newFirstTitle = $('.entry h2:first');
				done();
			});
		});

		it('Confirmação de que o conteúdo mudou!', function(done) {
			expect(oldFirstTitle).not.toBe(newFirstTitle);
			done();
		});
	});
}());
