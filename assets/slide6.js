//var React = require('react');
//var ReactDOM = require('react-dom');

import React, { Component } from "react";
import { Heading } from "spectacle";
import { ReactDOM } from 'react-dom';

import imgMeterStick from './meterstick.png';
import imgLineA from './lineA.png';
//import imgHowtomeasure_ex1 from './howtomeasure_ex1.png';
import imgRulerMeasure from './rulermeasure.png';
import imgMeasurePin from './measurepin.png';
import imgMeasureKey from './measurekey.png';
import imgMeasureKnife from './measureknife.png';

//import { ReactCSSTransitionGroup } from "react-addons-css-transition-group";


export default class Slide6 extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1,
    };
      this.handleClickNext = this.handleClickNext.bind(this);
      this.handleClickAll = this.handleClickAll.bind(this);
      this.handleMovableClick = this.handleMovableClick.bind(this);
      this.handleMarkit = this.handleMarkit.bind(this);

      this.startDrag= this.startDrag.bind(this);
      this.dragDiv= this.dragDiv.bind(this);
      this.stopDrag= this.stopDrag.bind(this);

      this.grow1complete = this.grow1complete.bind(this);  //need this to be able to have this context correcct in callback
      this.grow2complete = this.grow2complete.bind(this);
      this.bulgedelay = this.bulgedelay.bind(this);
      this.shrinkcomplete = this.shrinkcomplete.bind(this);
      this.shrinkdelay = this.shrinkdelay.bind(this);
      //this.add = this.add.bind(this);
      this.iElem=1;
      this.iElemTot=1;
      this.showall=0;

      this.drag;
      this.targ=null;
      this.offsetX=0;
      this.offsetY=0;
      this.coordX=0;
      this.coordY=0;
  }

    handleMarkit() {
        debugger;

        if (document.getElementById('ans1').value == '1.5') {
            document.getElementById('ans1').style.backgroundColor = "green";
        } else {
            document.getElementById('ans1').style.backgroundColor = "red";
        }
        if (document.getElementById('ans2').value == '15') {
            document.getElementById('ans2').style.backgroundColor = "green";
        } else {
            document.getElementById('ans2').style.backgroundColor = "red";
        }

        if (document.getElementById('ans3').value == '2.6') {
            document.getElementById('ans3').style.backgroundColor = "green";
        } else {
            document.getElementById('ans3').style.backgroundColor = "red";
        }
        if (document.getElementById('ans4').value == '26') {
            document.getElementById('ans4').style.backgroundColor = "green";
        } else {
            document.getElementById('ans4').style.backgroundColor = "red";
        }

        if (document.getElementById('ans5').value == '7.3') {
            document.getElementById('ans5').style.backgroundColor = "green";
        } else {
            document.getElementById('ans5').style.backgroundColor = "red";
        }
        if (document.getElementById('ans6').value == '73') {
            document.getElementById('ans6').style.backgroundColor = "green";
        } else {
            document.getElementById('ans6').style.backgroundColor = "red";
        }
    }


    startDrag(e) {
        // determine event object
        if (!e) {
            var e = window.event;
        }
        if(e.preventDefault) e.preventDefault();

        // IE uses srcElement, others use target
        //this.targ = e.target ? e.target : e.srcElement;
        this.targ = document.getElementById('r1');
        debugger;

        //if (this.targ.className != 'dragme') {return};
        // calculate event X, Y coordinates
        this.offsetX = e.clientX;
        this.offsetY = e.clientY;

        // assign default values for top and left properties
        if(!this.targ.style.left) { this.targ.style.left='0px'};
        if (!this.targ.style.top) { this.targ.style.top='0px'};

        // calculate integer values for top and left
        // properties
        this.coordX = parseInt(this.targ.style.left);
        this.coordY = parseInt(this.targ.style.top);
        this.drag = true;

        // move div element
        document.onmousemove=this.dragDiv;
        return false;
    }
    dragDiv(e) {
        if (!this.drag) {return};
        if (!e) { var e= window.event};
        // var targ=e.target?e.target:e.srcElement;
        // move div element
        this.targ.style.left=this.coordX+e.clientX-this.offsetX+'px';
        this.targ.style.top=this.coordY+e.clientY-this.offsetY+'px';
        return false;
    }
    stopDrag() {
        this.drag=false;
    }

    handleMovableClick()  {


    }






    move(element, delta, cb) {
         var to = 570;
        this.animate({
            delay: 10,
            duration: 1000, // 1 sec by default
            delta: delta,
            step: function(delta) {
                element.style.left = -600+ to*delta + "px"
            }
        } , cb);
      }
    animate(opts,cb) {
        var start = new Date;
        var id = setInterval(function() {
            var timePassed = new Date - start;
            var progress = timePassed / opts.duration;
            if (progress > 1) progress = 1;
            var delta = opts.delta(progress);
            opts.step(delta);
            if (progress == 1) {
                clearInterval(id);
                cb();
            }
        }, opts.delay || 10)
    }
    textsize(element){
        element.style.fontSize = 100 + "px"
    }


    shrink(element, delta, cb, ratiodelta, startzoom) {
        var to = 100;
        this.animatebulge({
            delay: 10,
            duration: 500, // 1 sec by default
            delta: delta,
            step: function(delta) {
                element.style.zoom = startzoom-( ratiodelta*((to*delta)/100) )   //1.2
            }
        } , cb);
    }
    bulge(element, delta, cb, ratiodelta, startzoom) {
        debugger;
        var to = 100;
        this.animatebulge({
            delay: 10,
            duration: 500, // 1 sec by default
            delta: delta,
            step: function(delta) {
                element.style.zoom = startzoom+( ratiodelta*((to*delta)/100) )   //1.2
            }
        } , cb);
    }
    animatebulge(opts,cb) {
        var start = new Date;
        var id = setInterval(function() {
            var timePassed = new Date - start;
            var progress = timePassed / opts.duration;
            if (progress > 1) progress = 1;
            var delta = opts.delta(progress);
            opts.step(delta);
            if (progress == 1) {
                cb();
                clearInterval(id)
            }
        }, opts.delay || 10)
    }




    add(event){
       // var su = new SpeechSynthesisUtterance();
        //su.lang = "en";
        //su.text = "key";
        //speechSynthesis.speak(su);
    }
    handleClickAll(i){
        debugger;

        document.getElementById('r1').style.visibility = "visible";

        document.getElementById("btm").style.visibility = "visible";
        if (document.getElementById("btm").getAttribute("data-spk")!=''){
            var su = new SpeechSynthesisUtterance();
            su.lang = "en";
            su.text = document.getElementById("btm").getAttribute("data-spk");
            speechSynthesis.speak(su);
        }


/*        for (let f=1;f<=4;f++)
        {
            document.getElementById('r'+f).style.visibility = "hidden";
            document.getElementById('r'+f).style.zoom =1;
        }
        this.iElem = i;
        this.showall = 1;
        document.getElementById('r'+this.iElem).style.visibility = "visible";
        this.bulge(document.getElementById('r'+this.iElem),
            function circ(progress) {return 1 - Math.sin(Math.acos(progress))},
            this.grow1complete, 0.1, 1
        );*/


    }
    handleClickNext(i) {
        debugger;

        document.getElementById('r1').style.visibility = "visible";
        document.getElementById('r1').style.zoom =1.2;

    }
    grow1complete() {
        var su = new SpeechSynthesisUtterance();
        su.lang = "en";
        su.text = document.getElementById('r'+this.iElem).getAttribute("data-spk");
        speechSynthesis.speak(su);
        //setTimeout(this.bulgedelay, 1500); // call in 3s
    }
    bulgedelay () {
        this.bulge(document.getElementById('r'+this.iElem),
            function circ(progress) {return 1 - Math.sin(Math.acos(progress))},
            this.grow2complete, 0.2, 1.1
        );
    }
    grow2complete () {
        setTimeout(this.shrinkdelay, 1500); // call in 3s
    }
    shrinkdelay() {
        this.shrink(document.getElementById('r'+this.iElem),
            function circ(progress) {return 1 - Math.sin(Math.acos(progress))},
            this.shrinkcomplete, 0.2, 1.2
        );
    }
    shrinkcomplete() {
        document.getElementById('r'+this.iElem).style.zoom = 1;
        /*this.setState({
            count: this.state.count + 1
        });
        if (this.state.count>=5) {
            document.getElementById("btm").style.visibility = "visible";
        }*/
        this.iElem+=1;
        if (this.iElem>this.iElemTot) {
            this.iElem = 1;
            this.showall=0;
            document.getElementById("btm").style.visibility = "visible";
        }
        else{
            if (this.showall == 1) {
                debugger;
                document.getElementById('r'+this.iElem).style.visibility = "visible";
                this.bulge(document.getElementById('r'+this.iElem),
                    function circ(progress) {return 1 - Math.sin(Math.acos(progress))},
                    this.grow1complete, 0.1, 1
                );
            }
        }



    }



  componentDidMount() {
/*    var $this = $(ReactDOM.findDOMNode(this));
    //$this.text('xx');
      $this.offsetParent.addEventListener('keypress', function (e) {
          var su = new SpeechSynthesisUtterance();
          su.lang = "en";
          su.text = "key1";
          speechSynthesis.speak(su);
      }.bind(this));*/

      //document.getElementById('tries').scrollIntoView()
      //React.findDOMNode(this.refs.r1).focus();
      //ReactDOM.findDOMNode(this.refs.r1).focus();
  }

  render() {
      const fltimg = {
          position: "absolute; left: 100px; top: 150px"
      }
     const inlineBlock = {
          display: "inline-block",
          verticalAlign: "middle"
      }
      const inlineBlocktext = {
          display: "inline-block",
          verticalAlign: "middle",
          fontSize: "30px"
      }
    const nextbutton = {
          padding: 5,
          background: "black",
          minWidth: 100,
          marginTop: 20,
          textTransform: "uppercase",
          border: "none",
          color: "white",
          outline: "none",
          fontWeight: "bold",
          fontSize: "0.5em",
          position: "fixed; left: 800px; top: -320px"
          // visibility: "hidden"
      }
      const allbutton = {
          padding: 5,
          background: "black",
          minWidth: 100,
          marginTop: 20,
          textTransform: "uppercase",
          border: "none",
          color: "white",
          outline: "none",
          fontWeight: "bold",


          fontSize: "0.5em",
          position: "fixed; left: 900px; top: -320px"
          // visibility: "hidden"
      }
      const markit = {
          padding: 5,
          background: "black",
          minWidth: 100,
          marginTop: 20,
          textTransform: "uppercase",
          border: "none",
          color: "white",
          outline: "none",
          fontWeight: "bold",
          fontSize: "0.5em",
          position: "fixed; left: 900px; top: 200px"
          // visibility: "hidden"
      }
      const slidetitle = {
          padding: 5,
          background: "white",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "24px",
          position: "fixed; left: 10px; top: -320px"
          // visibility: "hidden"
      }

      const panel1 = {
          padding: 5,
          background: "blue",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "24px",
          position: "fixed; left: 600px; top: -225px",
          width: "200px"
          // visibility: "hidden"
      }
      const panel2 = {
          padding: 5,
          background: "blue",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "24px",
          position: "fixed; left: 600px; top: -125px",
          width: "200px"
          // visibility: "hidden"
      }
      const panel3 = {
          padding: 5,
          background: "blue",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "24px",
          position: "fixed; left: 600px; top: -25px",
          width: "200px"
          // visibility: "hidden"
      }


      const slidebottom = {
          padding: 5,
          background: "white",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "24px",
          position: "fixed; left: 10px; top: 280px",
          visibility: "hidden"
      }

      const el1 = {
          padding: 5,
          background: "white",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "0.5em",
          position: "fixed; left: 0px; top: 0px",
          visibility: "hidden"
       }
      const el2 = {
          width: "650px",
          padding: 10,
          background: "white",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "0.5em",
          position: "fixed; left: 200px; top: -120px",
          overflow: "hidden",
          visibility: "hidden"
      }

      const imgline= {
          position: "relative; left: -600px"
      }


      const el3 = {
          padding: 10,
          background: "white",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "0.5em",
          position: "fixed; left: 00px; top: -40px",
          visibility: "hidden",
      }
      const el4 = {
          padding: 10,
          background: "white",
          minWidth: 100,
          marginTop: 20,
          //textTransform: "uppercase",
          border: "none",
          color: "black",
          outline: "none",
          fontWeight: "bold",
          fontSize: "0.5em",
          position: "fixed; left: 00px; top: 90px",
          visibility: "hidden"
      }

/*      if (this.state.count == 0) {
          var su = new SpeechSynthesisUtterance();
          su.lang = "en";
          su.text = this.props.spk;
          speechSynthesis.speak(su);
          //debugger;
          this.setState({
              count: this.state.count + 1
          });
      }*/

    return (
        <div ref="d1" onKeyDown={this.add} >
            <div style={slidetitle}>
                6 Exercise : How to measure an object/item.
            </div>

            <div>
                <button id="bt1" style={nextbutton} type="button" onClick={this.handleClickNext.bind(this,1)}>Next</button>
            </div>
            <div>
                <button id="bt2" style={allbutton} type="button" onClick={this.handleClickAll.bind(this,1)}>All</button>
            </div>
            <div>
                <button id="btMarkit" style={markit} type="button" onClick={this.handleMarkit.bind(this,1)}>Mark It</button>
            </div>

            <div style={panel1}>
                <span style={{ "float": "right" }}>Pin in cm:&nbsp;<input style={{ "float": "right" , "width" : "50px" , "height" : "30px"  }} type="text" id="ans1"></input></span>
                <span style={{ "float": "right" }}>Pin in mm:&nbsp;<input style={{ "float": "right" , "width" : "50px" , "height" : "30px"  }} type="text" id="ans2"></input></span>
            </div>

            <div style={panel2}>
                <span style={{ "float": "right" }}>Key in cm:&nbsp;<input style={{ "float": "right" , "width" : "50px" , "height" : "30px"  }} type="text" id="ans3"></input></span>
                <span style={{ "float": "right" }}>Key in mm:&nbsp;<input style={{ "float": "right" , "width" : "50px" , "height" : "30px"  }} type="text" id="ans4"></input></span>
            </div>

            <div style={panel3}>
                <span style={{ "float": "right" }}>Knife in cm:&nbsp;<input style={{ "float": "right" , "width" : "50px" , "height" : "30px"  }} type="text" id="ans5"></input></span>
                <span style={{ "float": "right" }}>Knife in mm:&nbsp;<input style={{ "float": "right" , "width" : "50px" , "height" : "30px"  }} type="text" id="ans6"></input></span>
            </div>

            <img style={{ "position": "fixed; left: 50px; top: -200px" }} src={imgMeasurePin} ></img>

            <img style={{ "position": "fixed; left: 50px; top: -100px" }} src={imgMeasureKey} ></img>

            <img style={{ "position": "fixed; left: 50px; top: -00px" }} src={imgMeasureKnife} ></img>

            <div id="r1" style={fltimg} onMouseDown={this.startDrag.bind()} onMouseUp={this.stopDrag.bind()}  >
                <img id="r1_image" src={imgRulerMeasure}  ></img>
            </div>






            <div id="btm" data-spk="Measure the following distances in centimeters and millimeters." style={slidebottom}>
                Measure the following distances in centimeters and millimeters.
            </div>
        </div>
    );


  }
}



