(function (definition) {
    if (typeof exports === "object") {
        module.exports = definition();
    } else if (typeof window.define === 'function' && window.define.amd) {
        window.define([], definition);
    } else {
        window.BezierEasing = definition();
    }
}(function () {

    /**
     * BezierEasing - use bezier curve for transition easing function
     * is inspired from Firefox's nsSMILKeySpline.cpp
     * Usage:
     * var spline = new BezierEasing(0.25, 0.1, 0.25, 1.0)
     * spline(x) => returns the easing value | x must be in [0, 1] range
     */
    function BezierEasing(mX1, mY1, mX2, mY2) {
        if (!(this instanceof BezierEasing)) return new BezierEasing(mX1, mY1, mX2, mY2);

        function A(aA1, aA2) {
            return 1.0 - 3.0 * aA2 + 3.0 * aA1;
        }

        function B(aA1, aA2) {
            return 3.0 * aA2 - 6.0 * aA1;
        }

        function C(aA1) {
            return 3.0 * aA1;
        }

        // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
        function CalcBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
        }

        // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
        function GetSlope(aT, aA1, aA2) {
            return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }

        function GetTForX(aX) {
            // Newton raphson iteration
            var aGuessT = aX;
            for (var i = 0; i < 4; ++i) {
                var currentSlope = GetSlope(aGuessT, mX1, mX2);
                if (currentSlope === 0.0) return aGuessT;
                var currentX = CalcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }

        return function (aX) {
            if (mX1 === mY1 && mX2 === mY2) return aX; // linear
            return CalcBezier(GetTForX(aX), mY1, mY2);
        };
    }

    // CSS mapping
    BezierEasing.css = {
        "ease": BezierEasing(0.25, 0.1, 0.25, 1.0),
        "linear": BezierEasing(0.00, 0.0, 1.00, 1.0),
        "ease-in": BezierEasing(0.42, 0.0, 1.00, 1.0),
        "ease-out": BezierEasing(0.00, 0.0, 0.58, 1.0),
        "ease-in-out": BezierEasing(0.42, 0.0, 0.58, 1.0)
    };

    return BezierEasing;

}));

/* -----------------------------------------------
/* Author : Guillaume Bonnet  - guillaumebonnet.fr
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : 
/* GitHub : github.com/stabla/
/* How to use? : Check the GitHub README
/* v1.0
/* ----------------------------------------------- */

var guillocheTag = document.getElementById("guilloche");
var ctx;
var guillocheJS = function (canvas_el) {

    this.guillocheJS = {
        figure: {
            majorR: 40, // Major Ripple
            minorR: 0.25, // Minor Ripple
            steps: Math.round(Math.random() * 2400), // Divide circle this many times
            radius: 25, // Radius,
            angle: 1, // Angle multiplier
            amplitude: 4.5,
            Multiplier: 2,
            deg2rad: Math.PI / 180
        },
        appearance: {
            opacity: 1,
            lineColor: '#000000',
            backColor: '#FFFFFF',
            lineWidth: 0.5,
            spirograph: 'Hypotrochoid'
        },
        motion: {
            duration: 2000, // in ms
            delay: 100, // in ms
            easing: 'cubic-bezier(0.42, 0.0, 1.00, 1.0)', // put on github the table for ease-in, ease-in-out, linear
            iteration: 0, // 0 for infinite. Or 2 for two iteration
            direction: 'normal', // alternate-reverse
            timeBetween: 2000
        },
        toChange: {
            majorR: false,
            minorR: false,
            steps: false,
            angle: false,
            radius: false,
            amplitude: false,
            Multiplier: false
        },
        toChangeStep: {
            majorR: 1,
            minorR: 0.001,
            steps: 10,
            radius: 1,
            angle: 1,
            amplitude: 0.25,
            Multiplier: 1
        },
        animate: false,
    }


    var guillocheJS = this.guillocheJS;

    guillocheJS.section_length = 1;

    guillocheJS.ourEnvironnement = {
        el: canvas_el,
        w: guillocheJS.offsetWidth,
        h: guillocheJS.offsetHeight,
    };
    
 
    guillocheJS.fn = {
        clearIt: {},
        drawIt: {},
        animateIt: {},
        callDraw: {}
    }
    
    guillocheJS.loadState = {};

    guillocheJS.finalState = {
        majorR: guillocheJS.figure.majorR,
        minorR: guillocheJS.figure.minorR,
        steps: guillocheJS.figure.steps,
        radius: guillocheJS.figure.radius,
        angle: guillocheJS.figure.angle,
        amplitude: guillocheJS.figure.amplitude,
        Multiplier: guillocheJS.figure.Multiplier
    }
    
    
    
    
    var timeToDoAnimation = 0;
    var colorNeverChanged = true;
    guillocheJS.initialStateMemory = JSON.parse(JSON.stringify(guillocheJS.figure));
    
    /* initialise canvas */
    ctx = guillocheJS.ourEnvironnement.el.getContext("2d");

    /* set size canvas */
    ctx.canvas.width = guillocheTag.offsetWidth;
    ctx.canvas.height = guillocheTag.offsetHeight;

    /* cenver element */
    ctx.translate((ctx.canvas.width / 2) + 0.5, (ctx.canvas.height / 2) + 0.5);


    guillocheJS.fn.clearIt = function () { ctx.clearRect(-1 * (ctx.canvas.width / 2) - 1, -1 * (ctx.canvas.height / 2) - 1, ctx.canvas.width, ctx.canvas.height); }

    guillocheJS.fn.drawIt = function (sourceValue) {
        var timeStart = Date.now();
        
        if (typeof sourceValue !== 'undefined') {
            guillocheJS.figure = JSON.parse(JSON.stringify(sourceValue))
        };

        var l, x, y, oldX, oldY;
        var sl = 0;
        var theta = 0;
        var thetaStep, s, addition, subtraction, radiusGame; // difference
        var choosenSpirograph;
        var entiereTheta, cosVal, sinVal;
        
        if (colorNeverChanged) {
            ctx.fillStyle = guillocheJS.appearance.backColor;

            guillocheJS.fn.clearIt();
            ctx.fillRect(-1 * (ctx.canvas.width / 2), -1 * (ctx.canvas.height / 2), ctx.canvas.width, ctx.canvas.height)
        }


        ctx.strokeStyle = guillocheJS.appearance.lineColor;
        ctx.lineWidth = guillocheJS.appearance.lineWidth;
        ctx.globalAlpha = guillocheJS.appearance.opacity;
        sourceValue = typeof sourceValue !== 'undefined' ? sourceValue : 42;
        

        thetaStep = guillocheJS.figure.Multiplier * Math.PI / guillocheJS.figure.steps;

        s = (guillocheJS.figure.majorR - guillocheJS.figure.minorR) / guillocheJS.figure.minorR;
        addition = guillocheJS.figure.majorR + guillocheJS.figure.minorR;
        subtraction = guillocheJS.figure.majorR - guillocheJS.figure.minorR;
        radiusGame = guillocheJS.figure.minorR + guillocheJS.figure.radius;
        
        choosenSpirograph = guillocheJS.appearance.spirograph;
        


        for (var t = 0; t <= guillocheJS.figure.steps; t++) {
            entiereTheta = guillocheJS.figure.angle * theta;
            
            cosVal = Math.cos(entiereTheta);
            sinVal = Math.sin(entiereTheta);
            
            
            if(choosenSpirograph === 'Hypotrochoid') {
                x = (subtraction * cosVal) + (radiusGame * Math.cos((s) * entiereTheta))
                y =(subtraction * sinVal) + (radiusGame * Math.sin((s) * entiereTheta))
            } 
            else if (choosenSpirograph === 'Epitrochoid') {
                x = (addition * cosVal) + (radiusGame * Math.cos(((addition)/guillocheJS.figure.minorR) * entiereTheta)),
                y = (addition * sinVal) + (radiusGame * Math.sin(((addition)/guillocheJS.figure.minorR) * entiereTheta))
            } 
            else if (choosenSpirograph === 'Hypocycloid') {
                x = (subtraction * cosVal) + (guillocheJS.figure.minorR * Math.cos((s) * entiereTheta)),
                y = (subtraction * sinVal) + (guillocheJS.figure.minorR * Math.sin((s) * entiereTheta))
            } else {
                return;
            }
            
            x *= guillocheJS.figure.amplitude;
            y *= guillocheJS.figure.amplitude;

            if (sl == 0) {
                ctx.beginPath();

                if (t == 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.moveTo(oldX, oldY);
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            } else {
                // Append to line section
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            oldX = x;
            oldY = y;
            sl++;
            theta += thetaStep;
            if (sl == guillocheJS.section_length) sl = 0;

        }
        var timeEnd = Date.now();
        timeToDoAnimation = timeStart - timeEnd;
    }




    guillocheJS.fn.callDrawGeneral = function () {
        guillocheJS.fn.drawIt(guillocheJS.loadState);
    }

    
    
    // save finalState
    guillocheJS.finalStateMemory = JSON.parse(JSON.stringify(guillocheJS.finalState));

    
    
    var alreadyReversed = false;
    var countNq = 1;
    
    guillocheJS.fn.Easing = function (render, duration, easing) {
        
        // Get step, and know the step to have for dividing, to have the right animation when easing.
        // Difference is final value - initial value = res, and divide res by the duration
console.log(guillocheJS.motion.duration + " duration ");
        var start = Date.now();
        var t0, t1, oldT, tDuration;



        t0 = performance.now();
        (function loop() {

            var p = (Date.now() - start) / duration;
            if (p > 1) {
                for (var i in guillocheJS.finalState) {
                    guillocheJS.loadState[i] = guillocheJS.finalState[i];
                }
               render();
                
                // end of animation, if animate option is okay, redo this with inverse value
                if(guillocheJS.animate && (countNq) !== guillocheJS.motion.iteration) {
                    setTimeout(function(){
                        console.log('okdf');
                        
        console.log(guillocheJS.motion.timeBetween + " time between ");
                         countNq++;
                    if(alreadyReversed) {
                        alreadyReversed = false;
                        guillocheJS.figure = JSON.parse(JSON.stringify(guillocheJS.initialStateMemory))
            guillocheJS.finalState = JSON.parse(JSON.stringify(guillocheJS.finalStateMemory))
                     guillocheJS.fn.Easing(guillocheJS.fn.callDrawGeneral, guillocheJS.motion.duration, BezierEasing(guillocheJS.motion.easing));
                        
                    } else {
                        
                         alreadyReversed = true;
                        
                        guillocheJS.figure = JSON.parse(JSON.stringify(guillocheJS.finalStateMemory))
            guillocheJS.finalState = JSON.parse(JSON.stringify(guillocheJS.initialStateMemory))
                     guillocheJS.fn.Easing(guillocheJS.fn.callDrawGeneral, guillocheJS.motion.duration, BezierEasing(guillocheJS.motion.easing));
                    }  
                    }, guillocheJS.motion.timeBetween)
                   
                }
             
            } else {
                var type = 'less';
                var g = guillocheJS,
                    fnSt = g.finalState,
                    gF = g.figure,
                    isFirstTime = true;

                function AllFalse(obj) {
                    for (var i in obj) {
                        if (obj[i] === true) return false;
                    }
                    return true;
                }

                /* Check which values are changed in input, if it's changed, increase to 1 else take default value */
                for (var k in g.finalState) {
                    if (fnSt[k] !== gF[k]) g.toChange[k] = true;
                }
                if (fnSt.Multiplier !== g.figure.Multiplier) {
                    g.toChange.Multiplier = true;
                }

                (function animateAndDraw() {

                    // check in loop for each value where is true, add to loadState +1
                    //if (isFirstTime) {
                    for (var i in g.toChange) {
                        if (g.toChange[i]) {
                            (g.finalState[i] > g.figure[i]) ?
                            (g.loadState[i] = g.figure[i] + g.toChangeStep[i], type = 'more') : (g.loadState[i] = g.figure[i] - g.toChangeStep[i]);


                        } else {
                            g.loadState[i] = g.figure[i];
                        }
                    }
                })();

                requestAnimationFrame(loop);
                
                render(easing(p));
            }
            
              // Check if objectLoad !== objectFinal   
                // RequestAnimation only if AllFalse === false
                //  if (AllFalse(g.toChange) === false) {
                if (!isNaN(oldT)) {
                    tDiff = (Date.now() - start) - oldT;
                    for (var j in guillocheJS.toChangeStep) {
                        guillocheJS.toChangeStep[j] = Math.abs(guillocheJS.finalState[j] - guillocheJS.figure[j]) / (tDiff);
                    }
                    console.log(JSON.stringify(guillocheJS.toChangeStep))
                };

                oldT = (Date.now() - start);
            
        }());
    }

    guillocheJS.fn.animateIt = function () {
        setTimeout(function () {
            guillocheJS.fn.Easing(guillocheJS.fn.callDrawGeneral, guillocheJS.motion.duration, BezierEasing(guillocheJS.motion.easing))
        }, guillocheJS.motion.delay);

    }
    
    
    
   


    if (guillocheJS.animate) {
        /* Launch anime function for when user have downloaded it and have its own config, no panel */
        guillocheJS.fn.animateIt();
    }

}







/* ---------- guilloche functions - start ------------ */

/* pJS elements */
var guilloche_canvas_class = 'guilloche-canvas',
    exist_canvas = guillocheTag.getElementsByClassName(guilloche_canvas_class);


/* remove canvas if exists into the guillocheJS target tag */
if (exist_canvas.length) {
    while (exist_canvas.length > 0) {
        guillocheTag.removeChild(exist_canvas[0]);
    }
}

/* create canvas element */
var canvas_el = document.createElement('canvas');
canvas_el.className = guilloche_canvas_class;

/* append canvas */
document.getElementById("guilloche").appendChild(canvas_el);

/* Get canvas */
var canvas = document.getElementById("guilloche").firstElementChild;
guillocheJS(canvas);

/* Draw Guilloché */
guillocheJS.fn.drawIt();