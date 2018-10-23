
/* Modulo de dependencias */
import $ from 'jquery';

$(function(){
  var $tvShowsContainer = $('#app-body').find('.tv-shows');
  $tvShowsContainer.on('click','button.like',function(ev){
   var $this = $(this);
   $this.closest('.tv-show').toggleClass('liked')
   /*$this.animate({  // De esta forma pdemos agregar animacions desde wuqry 
    'fontSize':'30px'
  }.'fast');*/
  });
function renderShows(shows){//shws en forma de  un arreglo 
  $tvShowsContainer.find('.loader').remove();
  shows.forEach(function(show){
          var article = template
          .replace(':name:',show.name)
          .replace(':img:',show.image ? show.image.medium:'')
          .replace(':summary:',show.summary)
          .replace(':img alt:',show.name + "logo")
          var $article = $(article)
          console.log($article)

          
           $tvShowsContainer.append($article.fadeIn(1500));
 });
 }


   $('#app-body').find('form').submit(function(ev){
   	ev.preventDefault();
   var textbusqueda=$(this)//En este momento seria el formulario .
   .find('input[type="text"]')
   .val();

   $tvShowsContainer.find('.tv-show').remove()
    var $loader=$('<div class="loader">');
    $loader.appendTo($tvShowsContainer);
   $.ajax({
    url:'http://api.tvmaze.com/search/shows',
    data:{q:busqueda},
    success: function(res,textStatus,xhr){
      $loader.remove();
        var shows = res.map(function(el){
          return el.shows;
        
      renderShows(shows);
      }).forEach(function(show){
    
    console.log();
    })
  } 
   })
   //alert("se ha buscado " + textbusqueda);
})
      //alert(' Se ha enviado el formulario');



      //para hacer un reques de tipo ajax
  var template= '<article class="tv-show">'+
                 '<div class="left img-container">'+
                  '<img src=":img:" alt=":img alt:">'+
                '</div>'+
                '<div class="right info">'+
                 '<h1>:name:</h1>'+
                 '<p>:summary:</p>'+
                 '<button class="like">like</button>'+
                '</div>'+
              '</article>';

     /*$.ajax({
     	url:'http://api.tvmaze.com/shows',
     	success: function(shows,textStatus,xhr){
     		var $tvShowsContainer =$('#app-body').find('div.tv-shows')
        $tvShowsContainer.find('.loader').remove();
     	   renderShows(shows);
     			

     		}
     	

     })*/
     if(!localStorage.shows){
     $.ajax('http://api.tvmaze.com/shows')
        .then(function(shows){
        $tvShowsContainer.find('.loader').remove();
        localStorage.shows = JSON.stringify(shows);
         renderShows(shows);
          

        })
      }else{
        renderShows(JSON.parse (localStorage.shows));
      }
  })
