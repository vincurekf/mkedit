/**
 * jquery.mkedit.js
 * @version: v0.1
 * @author: Filip Vincůrek
 *
 * Created by Filip Vincůrek on 2015-02-06.
 * Copyright (c) 2015 Filip Vincůrek
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

(function( $ ) {
    "use strict";
  $.fn.mkedit = function( action, options ) {
  	// set default options
		var defaults = $.extend({
			parsevalue: function(newValue) { return newValue },
			onsave : function(){},
			oncancel: function(){},
			onkeypress: function(el, id, key, e){
				if(key === 13) { $('.save[mke-id='+id+']').click(); }
			},
			savebutton: '<img style="width: 1em;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIzMiIgaWQ9ImNoZWNrIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxNCBMNSAxMCBMMTMgMTggTDI3IDQgTDMxIDggTDEzIDI2IHoiLz48L3N2Zz4="/>',
			saveclass: 'save',
			cancelbutton: '<img style="width: 1em;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIGhlaWdodD0iMzJweCIgaWQ9InN2ZzIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMyIDMyIiB3aWR0aD0iMzJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9ImJhY2tncm91bmQiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMzIiIHdpZHRoPSIzMiIvPjwvZz48ZyBpZD0iY2FuY2VsIj48cG9seWdvbiBwb2ludHM9IjIsMjYgNiwzMCAxNiwyMCAyNiwzMCAzMCwyNiAyMCwxNiAzMCw2IDI2LDIgMTYsMTIgNiwyIDIsNiAxMiwxNiAgIi8+PC9nPjwvc3ZnPg=="/>',
			cancelclass: 'cancel',
			eprevent: true
			}, options );
		
		//
		if ( action === "attach") {
			// attach buttons and stuff.
			this.each(function() {
	      var el = $( this );
	      // TODO: generate random string for use ans unique reference to the element (usefull when targeting multiple .class elements)
	      var id = el.attr('mke-id');
		    //el = $(el);
		    el.click(function() {
					// start making it editable
		      //var this = $('[mke:id='+id+']');
		      el.attr('contentEditable', true);
		      el.focus();
		      // check if is this object active
		      if (!el.hasClass('active')) {
		      	//
		        el.addClass('active');
		        // save the current value
		        var tmp = el.text();
		        // append "buttons"
		        el.after('<i class="'+defaults.saveclass+'" mke-id="'+id+'">'+defaults.savebutton+'</i>');
		        el.after('<i class="'+defaults.cancelclass+'" mke-id="'+id+'">'+defaults.cancelbutton+'</i>');
		        // make icons clickable
		        $('.save[mke-id='+id+']').click(function(){
		          // get the new value
				    	// call the callabck function (default or user defined)
				    	if(el.text() !== tmp){
		          	defaults.onsave(el, id, defaults.parsevalue(el.text()), tmp);
				    	}
		          //mkedit.close(el, id, newValue);
		          $('.'+defaults.saveclass+'[mke-id='+id+']').remove();
				      $('.'+defaults.cancelclass+'[mke-id='+id+']').remove();
				      el.attr('contentEditable', false);
				      el.removeClass('active');
				      el.text(defaults.parsevalue(el.text()));
		        });
		        $('.'+defaults.cancelclass+'[mke-id='+id+']').click(function(){
				    	// call the callabck function (default or user defined)
				    	defaults.oncancel(el, id, tmp);
		          // remove "buttons", return original value
				      $('.'+defaults.saveclass+'[mke-id='+id+']').remove();
				      $('.'+defaults.cancelclass+'[mke-id='+id+']').remove();
				      el.attr('contentEditable', false);
				      el.removeClass('active');
				      el.text(tmp);
		        });
		      }
		    });
	    });
	    return this;
	  }
	  if ( action === 'listen') {
	  	// attach buttons and stuff.
			this.each(function() {
	      var el = $( this );
	      var id = el.attr('mke-id');
	      el.keypress(function(e) {
	      	//console.log(e);
	      	defaults.onkeypress(el, id, e.which, e);
	      	if(defaults.eprevent){
		      	e.stopPropagation();
		      }
				});
			});
	  }
  };
}( jQuery ));