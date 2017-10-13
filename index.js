$(function (){

	var $tvShowsContainer = $('#app-body').find('div.tv-shows');
	
	$tvShowsContainer.on('click','button.like',function (ev){
		var $this = $(this);
		$this.animated({
			'font-size':'30px'
		})
	})	

	function renderShows(shows){
		$tvShowsContainer.find('.loader').remove();

		shows.forEach(function (show){
			var article = template
				.replace(':name:',show.name)
				.replace(':img:',show.image ? show.image.medium : '')
				.replace(':summary:',show.summary)
				.replace(':img_alt:',show.name + "Logo")
			
				var $article = $(article)
				$article.hide();
				$tvShowsContainer.append($article.fadeIn(3000))
		})
	}


// submit search form
	$('#app-body')
		.find('form')
		.submit(function (ev){
			ev.preventDefault();
			// alert("valor " + )
			var busqueda = $(this)
				.find('input[type="text"]')
				.val();

			$tvShowsContainer.find('.tv-show').remove()
			var $loader = $('<div class="loader">')
			$loader.appendTo($tvShowsContainer)
					
			$.ajax({
				url:'http://api.tvmaze.com/search/shows',
				data: { q: busqueda},
				success: function (res, textStatus, xhr){
					$loader.remove();
					var shows = res.map(function (el){
						return el.show
					})
					renderShows(shows);
				}
			})
		})

		var template = '<article class="tv-show">'+
					'<div class="left img-container">'+
						'<img src=":img:" alt=":img_alt:">'+
					'</div>'+
					'<div class="right info">'+
						'<h1>:name:</h1>'+
						'<p>:summary:</p>'+
						'<button class="like">emoji</button>'+
					'</div>'+
				'</article>';

		if(!localStorage.shows){
			$.ajax('http://api.tvmaze.com/shows')
				.then(function (shows){
					$tvShowsContainer.find('.loader').remove();
					localStorage.shows = JSON.stringify(shows);
					renderShows(shows);
				})

		}else{
			renderShows(JSON.parse(localStorage.shows));
		}



		// {
		// 	url: 'http://api.tvmaze.com/shows',		
		// 	success: function(shows, textStatus, xhr){

		// 		// console.log(data);
		// 	}
		// })

})



	// $('header#app-header')
	// 	.append($('<p>',{html: "Me acaban de crear"}))


	// var $h1 = $('h1');

	// $h1.addClass('danger');

	// setTimeout(function () {
	// 	$h1.removeClass('danger');		
	// }, 1500)
	
	// $h1.css({
	// 	'font-size': '70px'
	// })




	// var a = $('<a>', {
	// 	href : 'http://google.com',
	// 	target: '_blank',
	// 	html: 'Ir a google'
	// })

	// $('#app-body').append(a);
	
	// a
	// 	.attr('href', 'facebook.com')


	// a.attr({
	// 	href: 'https://facebook.com',
	// 	target: '_blank',
	// 	html: 'Ir a facebook'
	// })


	// todos los header con  data-title
	// $('header[data-title="Carlos"]')

	// $('#app-header').find('h1')

	// $('#app-header').has('h1')
	// todos los que tenga h1

	// $('p').filter('.text') <p class="text"></p>

	// $('p').filter('.text')
		// .eq(1) el segundo elemento
		// .first() solo el primero