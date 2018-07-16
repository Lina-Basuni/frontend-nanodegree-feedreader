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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* this is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined',function(){
           allFeeds.forEach(function(feed){
             var bool=Boolean(feed.url)
             expect(bool).toBe(true);
           }); // end forEach

        });// end it


        /* this is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Names are defined',function(){
            allFeeds.forEach(function(feed){
              var bool=Boolean(feed.name)
              expect(bool).toBe(true);
            }); //end forEach

         });//end it
    }); //end describe


    /* this is a new test suite named "The menu" */

    describe('The menu',function(){

      /* this is a test that ensures the menu element is
       * hidden by default.
       */
       it('is hidden by default',function(){
         var check = $('body').hasClass("menu-hidden") //"menu-hidden is the class name that applies the property of hidden menu"
         expect(check).toBe(true);
       });//end it

       /* this is a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        *  have two expectations: one for when the menu displays when
        * clicked and for when it hides when clicked again.
        */

         it('toggles on click',function(){

           $('.menu-icon-link').click();//first click after it we expect the menu to appear
           expect($('body').hasClass('menu-hidden')).toBe(false);

           $('.menu-icon-link').click();//second click after it we expect the menu to disappear
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });//end it
      });//end describe



    /* this is a new test suite named "Initial Entries" */
    describe('Initial Entries',function(){
      /* this is a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * loadFeed() is asynchronous so this test requires
       * using  Jasmine's beforeEach and asynchronous done() function.
       */
       beforeEach(function(done){
         loadFeed(0,done)

       });//end before each

       it('have at least one .entry within the .feed container',function(done){
         expect($(".feed > a").length).not.toBe(0)
         done()

       });//end it
     });//end describe

    /*this is new test suite named "New Feed Selection" */


    describe('New Feed Selection',function(){

      /* this is a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * loadFeed() is asynchronous.
      */
      let initFeed;
      beforeEach(function(done){
        loadFeed(0,function(){
          initFeed=$('.feed').html();
          loadFeed(1, done);

        });//end loadFeed function

      }); //end beforeEach

       it('should change content when a new feed is loaded',function(){
         expect($('.feed').html()).not.toEqual(initFeed)
       });//end it
    });//end describe

}());
