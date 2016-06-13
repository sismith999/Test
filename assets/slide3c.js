//var React = require('react');
//var ReactDOM = require('react-dom');

import React, { Component } from "react";
import { Heading } from "spectacle";
import { ReactDOM } from 'react-dom';

import imgMeterStickZoomMm from './meterstickZoomMm.png';
import imgLineA from './lineA.png';

//import { ReactCSSTransitionGroup } from "react-addons-css-transition-group";


export default class Slide3c extends React.Component {
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
      this.iElemTot=1;
      this.showall=0;
  }


    move(element, delta, cb) {
        debugger;
        var to = 38;
        this.animate({
            delay: 10,
            duration: 1000, // 1 sec by default
            delta: delta,
            step: function(delta) {
                element.style.left = -570+ to*delta + "px"
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
        var to = 60;
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
        document.getElementById('r1').style.zoom =1.2;
        document.getElementById('r2').style.visibility = "visible";
        document.getElementById('r2_image').style.left= "-600px";

        this.move(document.getElementById('r2_image'),
            function circ(progress) {return 1 - Math.sin(Math.acos(progress))}, 600,
            this.grow1complete
        )

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
          position: "fixed; left: 0px; top: -100px",
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
          position: "fixed; left: 92px; top: 90px",
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
                3c. Unit Length
            </div>

            <div>
                <button id="bt1" style={nextbutton} type="button" onClick={this.handleClickNext.bind(this,1)}>Next</button>
            </div>
            <div>
                <button id="bt2" style={allbutton} type="button" onClick={this.handleClickAll.bind(this,1)}>All</button>
            </div>

            <div id="r1"  style={el1}>
                <div id="r1_text" style={inlineBlocktext} >Meter Stick&nbsp;&nbsp;&nbsp;&nbsp;
                    <img id="r1_image" style={inlineBlock} src={imgMeterStickZoomMm} ></img>
                </div>
            </div>
            <div id="r2" data-spk="Line" style={el2}>

                    <img id="r2_image" style={imgline} src={imgLineA} ></img>

            </div>





            <div id="btm" data-spk="Millimeter uses em,em, as an abbreviation" style={slidebottom}>
                Millimetre uses mm. as an abbreviation.
            </div>
        </div>
    );


  }
}



