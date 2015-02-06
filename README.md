# mkedit
mkedit is jQuery plugin which makes specified element(s) editable and provides callbacks.

Just click on the element you want to edit, make chages and click save.
Yeah! It's that simple.

# Usage
Basic usage is the same as with every jQuery plugin.
We need to have an element with ```mke-id``` attribute, this should be unique value. mkedit uses it as unique reference to the element.
```
<span class="editable" mke-id="1">
```

Attach the plugin to the element and let it do its small magic:
```
$('.editable').mkedit('attach', options);
```

If you want to listen for keypress on that element you can add ```listen```:
```
$('.editable').mkedit('listen', options);
```

## Options:
We have some default options to work with:
```javascript
var options = {
    parsevalue: function(newValue){
        // you can parse the return value after saving
        // just do whatever you want here but remember to return the parsed value back
        return newValue
        },
    onsave: function(el, id, newValue, tmp){
        // default callback before hiding the control elements (save/close)
        // returns the element, id(mke-id attribute value), new value, old value
        // default callback is empty
        },
    oncancel: function(el, id, tmp){
        // default callback before hiding the control elements (save/close)
        // returns the element, id(mke-id attribute value), old value
        // default callback is empty
        },
    onkeyprees: function(el, id, key, e){
        // default callback before hiding the control elements (save/close)
        // returns the element, id(mke-id attribute value), pressed key id (ie. ENTER = 17), event object
        // default callback just checks for ENTER key and then clicks on save
        },
    savebutton: 'SAVE', // could be anything
    saveclass: '.save', // could be any class
    cancelbutton: 'CANCEL', // could be anything
    cancelclass: '.cancel', // could be any class
    eprevent: true // prevent key press propagation
}
```

For key reference see this great post: [javascript keymap keycodes in json](http://www.lsauer.com/2011/08/javascript-keymap-keycodes-in-json.html)

