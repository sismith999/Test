// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";
import Interactive1 from "../assets/interactive";
import Slide2 from "../assets/slide2";
import Slide3 from "../assets/slide3";
import Slide3b from "../assets/slide3b";
import Slide3c from "../assets/slide3c";

import Slide6 from "../assets/slide6";
import Slide6b from "../assets/slide6b";


// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#ff4081"
});



export default class Presentation extends React.Component {
    componentDidMount() {
        var su = new SpeechSynthesisUtterance();su.lang = "en";
        su.text = "mathematics";
        speechSynthesis.speak(su);
    }

  render() {
    return (
        
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
            <Slide transition={["zoom"]} bgColor="white">
                <Heading size={1} fit caps lineHeight={1} textColor="black">
                Mathematics
                </Heading>
                <Text textSize="1.5em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>
            </Slide>

            <Slide transistion={["fade"]} bgColor="white" textColor="black">
                <Slide2/>
            </Slide>

            <Slide transistion={["fade"]} bgColor="white" textColor="black">
                <Slide3/>
            </Slide>
            <Slide transistion={["fade"]} bgColor="white" textColor="black">
                <Slide3b/>
            </Slide>
            <Slide transistion={["fade"]} bgColor="white" textColor="black">
                <Slide3c/>
            </Slide>

            <Slide transistion={["fade"]} bgColor="white" textColor="black">
                <Slide6/>
            </Slide>
            <Slide transistion={["fade"]} bgColor="white" textColor="black">
                <Slide6b/>
            </Slide>

          <Slide transition={["slide"]} bgImage={images.city.replace("/", "")} bgDarken={0.75}>
            <Appear fid="1">
              <Heading size={1} caps fit textColor="primary">
                Full Width
              </Heading>
            </Appear>
          </Slide>



          <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
            <List>
              <Appear><ListItem>Inline style based theme system</ListItem></Appear>
              <Appear><ListItem>Autofit text</ListItem></Appear>
              <Appear><ListItem>Flexbox layout system</ListItem></Appear>
              <Appear><ListItem>React-Router navigation</ListItem></Appear>
              <Appear><ListItem>PDF export</ListItem></Appear>
              <Appear><ListItem>And...</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              End of Slides
            </Heading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
