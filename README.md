# Guilloché Animator -- UNDER CONSTRUCTION

Highly inspired by http://2008.sub.blue/blog/2008/10/10/guilloche.html and 

## Demo

lien

## Install it

blabla 



## How it work




L'expliquer mathématiquement




https://github.com/pbakaus/scroller
https://github.com/pbakaus
https://andreasrohner.at/posts/Web%20Development/JavaScript/Some-simple-animated-fractals-using-HTML5-Canvas/
http://www.mathpuzzle.com/MAA/13-Guilloche%20Patterns/mathgames_02_09_04.html
https://www.google.fr/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=off&q=canvas+path+high+resolution
https://remysharp.com/2015/07/13/optimising-a-canvas-animation
http://www.professorcloud.com/js/canvas-nebula-demo.js
http://mathworld.wolfram.com/Trochoid.html
http://mathworld.wolfram.com/Hypotrochoid.html
http://mathworld.wolfram.com/Epitrochoid.html
http://codular.com/animation-with-html5-canvas
https://developers.coinbase.com/
https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/



# Guilloché Animator

Generating some spirography (Hypotrochoid, Epitrochoid or Hypocycloid) and make possible animation. 


## How it works.

The first step is to create a HTML5 canvas.
The second step is to draw the figure, but how exactly to draw the figure ? We have to know, what's a spirograph. At this time, the script only allow to make an Hypotrochoid, Epitrochoid or an Hypocycloid. So let's go to understand how draw a Hypotrochoid.

### Hypotrochoid

![hypotrochoid](https://upload.wikimedia.org/wikipedia/commons/f/fa/HypotrochoidOutThreeFifths.gif?raw=true)


So, this is, visually how it works. Now, lets do it by math. 

Not reinvent the wheel. So open your favorite search-engine and check more about " hypotrochoid ", we immediatly falling on [Wikipedia](https://en.wikipedia.org/wiki/Hypotrochoid). 

The radius of the biggest circle will be called `major`.
The radius of the internal circle will be called `minor`.
The point attached to the internal circle is to a distance d from the center of this same internal circle. Let's call it `radius`.

On wikipedia, we have our equation, so replace it with our notation :

![hypotrochoid_equation_x](https://wikimedia.org/api/rest_v1/media/math/render/svg/8be83627a6dc32417ac02b2b19f5fe6e0fe9cc0f?raw=true)
![hypotrochoid_equation_y](https://wikimedia.org/api/rest_v1/media/math/render/svg/67138f5859d844b0c0b507fe5300c313e87eccd4?raw=true)


In loop, we will draw it progressively, for each new incrementation, we change θ.


Set the value you want, and you can get something like that :
![hypotrochoid_preview](https://www.dropbox.com/s/e5naqrecg0hfw4j/hypotrochoid_preview_github.png?raw=true)


### Epitrochoid

![epitrochoid](https://upload.wikimedia.org/wikipedia/commons/2/20/EpitrochoidIn3.gif?raw=true)

Same for epitrochoid, we have this equation:
![epitrochoid_equation_x](https://wikimedia.org/api/rest_v1/media/math/render/svg/dda715d99f0bf446d5c5ef60e27f60a401e03dcc?raw=true)
![epitrochoid_equation_y](https://wikimedia.org/api/rest_v1/media/math/render/svg/ec2c6ea0a7878b1c0d59ff413e7922327a103637?raw=true)

Set the value value you want, and you can get something like that :
![epitrochoid_preview](https://www.dropbox.com/s/n1u8oaqudhemrfu/epitrochoid_preview_github.png?raw=true)

### Hypocycloid -- not complete yet

(inclure un gif)

Same for hypocycloid

Set the value you want, and you can get something like that : (inclure photo d'un résultat)



### 





