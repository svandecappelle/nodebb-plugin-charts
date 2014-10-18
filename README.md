nodebb-plugin-charts
====================

The plugin allow users to add charts into post of nodebbplugins using jqplots charts.

## Usage:

In your post simply add the following pattern: 
```
@chart[data:[data]]{options:{opts}}
```

* Datas is on array form [1,6,9] for coordinate of points: [1;1] [2,6] [3,9]
You can also add the x coordinate : [[1,1],[2,6],[3,9]]

For a full list of usage see Jqplot Documentation here: http://www.jqplot.com/index.php
 
* Options are on object form:
You can specify option like this pattern: {optionKey: {subOptionKey: value, subOptionKey2: value}}
The full list of options are here: 

Exemples' page of jQplot official website: http://www.jqplot.com/deploy/dist/examples/ 


## Exemple:

```
@chart[data:[[4, -3, 3, 6, 2, -2]]]{options: {
       stackSeries: true,
       showMarker: false,
       seriesDefaults: {
           fill: true,
           fillToZero: true,
           rendererOptions: {
               highlightMouseDown: true
           }
       }
    }}
```

On screen: 
