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


## Exemples:

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
![Screeshot_area_chart](https://i.imgur.com/JhtbtuE.png)


```
@chart[data:[[['a',6], ['b',8], ['c',14], ['d',20]],[['a', 8], ['b', 12], ['c', 6], ['d', 9]]]]{options: {
    seriesDefaults: {
      renderer:$.jqplot.DonutRenderer,
      rendererOptions:{
        sliceMargin: 3,
        startAngle: -90,
        showDataLabels: true,
        dataLabels: 'value'
      }
    }
```
On screen: 
![Screeshot_donut_chart](https://i.imgur.com/rpmFz9X.png)
