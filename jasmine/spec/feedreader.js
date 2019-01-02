/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Foram definidos', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('Tem uma URL válida', function() {
			allFeeds.forEach(function(value, index) {
				expect(value.url).toBeDefined();
				expect(value.url).not.toBe('');
			});
		});


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

		 it('Existe um nome pro feed', function() {
			allFeeds.forEach(function(value, index) {
				expect(value.name).toBeDefined();
				expect(value.name).not.toEqual('');
			});
		 });
    });


    /* TODO: Write a new test suite named "The menu" */
	describe("The menu", function() {
		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('Menu oculto por padrão', function(){
			const hasMenuHiddenClass = $('body').hasClass('menu-hidden');
			expect(hasMenuHiddenClass).toBe(true);
		});
		
		/* TODO: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('Ao clicar no ícone do menu', function() {
			// Verifica se o botão foi clicado
			// Se não foi clicado recebe FALSE e se for clicado recebe TRUE.
			let clicked = false;

			// Pego o icone do menu
			const menuIcon = $('menu-icon-link');

			// Verifico se o menu está sendo exibido ou não.
			const hasMenuHiddenClass = $('body').hasClass('menu-hidden');
			
			// Verifica o estado do botão (se já foi clicado ou não)
			switch(clicked) {
				// Se FALSE, o menu deve estar ocultado
				case false:
					expect(hasMenuHiddenClass).toBe(true);
					clicked = true;		
					break;
				// Se TRUE, o menu deve estar sendo exibido
				case true:
					expect(hasMenuHiddenClass).toBe(false);
					clicked = false;
					break;
			}

			menuIcon.on('click', function () {
				(clicked) ? clicked = false : clicked = true;
			});
		});	 
	});


	/* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done){
			loadFeed(0, done);
		});

		it('Ao menos um elemento .entry no container .feed', function(done) {
			const entrysOnFeed = $('.feed').find('.entry');
			expect(entrysOnFeed.length).toBeGreaterThan(0);
			done();
		});
	});


    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('Confirmação de que o conteúdo mudou!', function(done) {
			let oldFirstTitleLink;
			let newFirstTitleLink;
			
			loadFeed(0, function() {
				oldFirstTitleLink = $('.entry h2:first');
				loadFeed(1, function() {
					newFirstTitleLink = $('.entry h2:first');
					expect(newFirstTitleLink).not.toBe(oldFirstTitleLink);
					done();
				});
			});
		});
	});
}());
