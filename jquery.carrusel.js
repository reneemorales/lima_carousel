/* lima_slider.1.0  | @author: Renee Morales | @website: reneemorales.com */
(function($){
	
    $.fn.extend({
        lima_slider:function(options){
            /****************************************************/
            geek_carrusel_main=function(options)
            {
                /* inicializar*/
                jQuery(options.root).find(' .item').addClass('invisible');
                /* total */
                jQuery(options.root).css({
                    position: 'absolute'
                });
                var total=jQuery(options.root).find(' .item').length;
                options.total=total;
                carrusel_main_init_v2(options);
                jQuery(options.root_main).find( options.controls+' a.next').click(function(e){
                    e.preventDefault();
                    options.direccion="next";
                    carrusel_main_click_v2(options);
                    
                });
                jQuery(options.root_main).find(options.controls + ' a.prev').click(function(e) {
                    e.preventDefault();
                    options.direccion="prev";
                    carrusel_main_click_v2(options);
                });
            }
            /****************************************************/
            carrusel_main_init_v2=function (options)
            {
                total=options.total;
                var p=options.start;
                if(options.min_num%2==0){
                    var izq= Math.floor(options.min_num/2);
                    var der= izq-1;
                }else
                {
                    var izq= Math.floor(options.min_num/2);
                    var der= izq;
                }
                var p1=p-izq;
                var p2=p+der;
                if(p1<0)
                { 	
                    p2=p2+Math.abs(p1); 
                    p1=0;
                }
                if(p2>=total)
                {
                    p1= p1-(p2-total +1)
                    p2=total;
                }	
                console.log(' / p ='+p);
                console.log(' / p1='+p1);
                console.log('/  p2='+p2);
                console.log('/  total='+total);
                var sum=0;
                jQuery(options.root).find(' .item').removeClass('carrusel-visible');
                jQuery(options.root).find(' .item').each( function(index, val) {
                    if(index>=p1  && index<=p2){
                        jQuery(this).addClass('carrusel-visible')
                    }
                    if(index<p1){
                        sum=sum+jQuery(this).outerWidth(true);
                    }	
                    jQuery(this).attr('data-pos',index);
                });
                if(isNaN(options.sum)){
                    animar_action(-sum,options);
                }else{
                    animar_action(-options.sum,options);
                }
            }
            /*****************************************************/
            carrusel_main_click_v2=function (options)
            {
                if(jQuery(options.root).hasClass( 'animando'))
                {
                    return false;
                }
                jQuery(options.root).addClass('animando');
                if(options.direccion=='next'){
                    var pos=(jQuery(options.root).find(' .carrusel-visible').last().attr('data-pos'));
                    var nuevos_visibles=options.total-pos-1;
                }else
                {
                    var pos=(jQuery(options.root).find(' .carrusel-visible').first().attr('data-pos'));
                    var nuevos_visibles=0+pos;
                }
                if(nuevos_visibles>0){
                    var loop=jQuery(options.root).find(' .carrusel-visible');
                    if(options.direccion=='prev'){
                        var loop=loop.get().reverse();
                    }
                    jQuery(loop).each( function(index, val) {
                        if(nuevos_visibles>0){
                            jQuery(this).addClass('carrusel-temp');		
                            jQuery(this).removeClass('carrusel-visible');
                            nuevos_visibles--;
                        }
                    });
                    if(options.direccion=="next"){
                        var pos=parseInt(jQuery(options.root).find(' .carrusel-temp').last().attr('data-pos'));	
                        var evaluador=function(index,pos,min_num){
                            return (index>pos && index<=(pos+min_num));
                        };
                    }else
                    {
                        var pos=parseInt(jQuery(options.root).find(' .carrusel-temp').first().attr('data-pos'));
                        var evaluador=function(index,pos,min_num){ 
                            return (index>=(pos-min_num) && index<(pos));
                        };
                    }
                    jQuery(options.root).find(' .item').each( function(index, val) {
                        if(evaluador(index,pos,options.min_num)){
                            jQuery(this).addClass('carrusel-visible');
                        }
                    });
                    /* ejecuta  animacion */
                    animar(options);
                //jQuery(options.root+' a.carrusel-temp').removeClass('carrusel-temp');
            }else
            {
                    //alert('No hay mas elementos que mostrar');
                    optionsTemp=options;
                    optionsTemp.start=0;
                    optionsTemp.sum=0;
                    carrusel_main_init_v2(optionsTemp);
                //alert(options.start);
            }
        }
        /*****************************************************/
        animar=function (options)
        {
            var sum=0;
            jQuery(options.root).find(' .carrusel-temp').each( function(index, val) {
                sum=sum+jQuery(this).outerWidth(true);
            });
            var left = parseInt(jQuery(options.root).css('left'));
            if (isNaN(left)){
                left=0;
            }
            if(options.direccion=='next'){
                left=left-sum;	
            }else
            {
                left=left+sum;	
            }
                //alert(left);
                animar_action(left,options);
            }
            /*****************************************************/
            animar_action=function (left,options)
            {
                jQuery(options.root).animate(
                {
                    'left': left + 'px'
                // to move it towards the right and, probably, off-screen.
            }, 600, function(){
                jQuery(options.root).find(' .carrusel-temp').removeClass('carrusel-temp');
                jQuery(options.root).removeClass('animando');
            });
            }
            /*****************************************************/
            
            return this.each(function(index,value){
                var optionsTemp = jQuery.extend(true, {}, options);
                optionsTemp.root=jQuery(this).find('ul');
                optionsTemp.root_main=jQuery(this);
                geek_carrusel_main(optionsTemp);
            });
        }
    });
/* código */
})(jQuery)