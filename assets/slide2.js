//var React = require('react');
//var ReactDOM = require('react-dom');

import React, { Component } from "react";
import { Heading } from "spectacle";
import { ReactDOM } from 'react-dom';
import imgRuler from './ruler1.png';
import imgRulerSmall from './rulerSmall.png';
import imgTapeM from './tapem.png';
import imgMTape from './mtapel.png';
import imgMeterStick from './meterstick.png';

//import { ReactCSSTransitionGroup } from "react-addons-css-transition-group";


export default class Slide2 extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 1,
    };
      this.handleClickNext = this.handleClickNext.bind(this);
      this.handleClickAll = this.handleClickAll.bind(this);

      this.grow1complete = this.grow1complete.bind(this);  //need this to be able to have this context correcct in callback
      this.grow2complete = this.grow2complete.bind(this);
      this.bulgedelay = this.bulgedelay.bind(this);
      this.shrinkcomplete = this.shrinkcomplete.bind(this);
      this.shrinkdelay = this.shrinkdelay.bind(this);
      //this.add = this.add.bind(this);
      this.iElem=1;
      this.iElemTot=4;
      this.showall=0;
  }


    move(element, delta, cb) {
        debugger;
        var to = 100;
        this.animate({
            delay: 10,
            duration: 1000, // 1 sec by default
            delta: delta,
            step: function(delta) {
                element.style.left = to*delta + "px"
            }
        } , cb);
      }
    animate(opts,cb) {
        debugger;
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
        debugger;
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
                clearInterval(id);
                cb();
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
        for (let f=1;f<=4;f++)
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
        );

/*        var parent = this;
        var array = [1, 2, 3, 4];
        array.forEach(
            function (item) {
                parent.iElem = item;
                document.getElementById('r'+parent.iElem).style.visibility = "visible";
                parent.bulge(document.getElementById('r'+parent.iElem),
                    function circ(progress) {return 1 - Math.sin(Math.acos(progress))},
                    parent.grow1complete, 0.1, 1
                );
            }
        )*/
    }
    handleClickNext(i) {
        debugger;
        //this.iElem = this.state.count;
        document.getElementById('r'+this.iElem).style.visibility = "visible";
        this.bulge(document.getElementById('r'+this.iElem),
            function circ(progress) {return 1 - Math.sin(Math.acos(progress))},
            this.grow1complete, 0.1, 1
        );
    }
    grow1complete() {
        var su = new SpeechSynthesisUtterance();
        su.lang = "en";
        su.text = document.getElementById('r'+this.iElem).getAttribute("data-spk");
        speechSynthesis.speak(su);
        setTimeout(this.bulgedelay, 1500); // call in 3s
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

            if (document.getElementById("btm").getAttribute("data-spk")!=''){
                var su = new SpeechSynthesisUtterance();
                su.lang = "en";
                su.text = document.getElementById("btm").getAttribute("data-spk");
                speechSynthesis.speak(su);
            }

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
      //debugger;
      //this.handleClickAll(1);
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
          position: "fixed; left: 800px; top: -320px;"
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
          position: "fixed; left: 900px; top: -320px;"
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
          position: "fixed; left: 10px; top: -320px;"
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
          position: "fixed; left: 10px; top: 280px;",
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
          position: "fixed; left: 0px; top: -200px;",
          visibility: "hidden"
       }
      const el2 = {
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
          position: "fixed; left: 00px; top: -120px;",
          visibility: "hidden"
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
          position: "fixed; left: 00px; top: -40px;",
          visibility: "hidden"
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
          position: "fixed; left: 00px; top: 90px;",
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
                2. Measuring Tools.
            </div>

            <div>
                <button id="bt1" style={nextbutton} type="button" onClick={this.handleClickNext.bind(this,1)}>Next</button>
            </div>
            <div>
                <button id="bt2" style={allbutton} type="button" onClick={this.handleClickAll.bind(this,1)}>All</button>
            </div>

            <div id="r1" data-spk="Meter Stick" style={el1}>
                <div id="r1_text" style={inlineBlocktext} >Meter Stick&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="r1_image" style={inlineBlock} src={imgMeterStick} ></img>
                </div>
            </div>

            <div id="r2" data-spk="Ruler" style={el2}>
                <div id="r2_text" style={inlineBlocktext} >Ruler&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="r2_image" style={inlineBlock} src={imgRulerSmall} ></img>
                </div>
            </div>

            <div id="r3" data-spk="Measuring Tape" style={el3}>
                <div id="r3_text" style={inlineBlocktext} >Measuring Tape&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="r3_image" style={inlineBlock} src={imgMTape} ></img>
                </div>
            </div>

            <div id="r4" data-spk="Tape Measure" style={el4}>
                <div id="r4_text" style={inlineBlocktext} >Tape Measure&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="r4_image" style={inlineBlock} src={imgTapeM} ></img>
                </div>
            </div>


            <div id="btm" data-spk="A Meterstick, Ruler, Measuring tape, and a Tape measure, are measuring tools." style={slidebottom}>
                A Meterstick, Ruler, Measuring tape and a Tape measure are measuring tools.
            </div>
        </div>
    );


  }
}



