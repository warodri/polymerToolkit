import { PolymerElement } from "./node_modules/@polymer/polymer/polymer-element.js";
import { GestureEventListeners } from "./node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
/*
    OPFFICIAL DOC:
    https://polymer-library.polymer-project.org/3.0/docs/quick-tour
    
    Attributes and observables for attribute changes: 
    https://www.youtube.com/watch?v=CDQ2Peqk6bI&index=5&list=PLvVKmViR0Z7bZj2XH_u-EolXGVoc1VwcT
    
    Drag and Drop:
    https://www.youtube.com/watch?v=Fr-VemMXbGs
    
*/

class MyApp extends GestureEventListeners(PolymerElement) {
  constructor() {
    super();
    this.classToAdd = 'divColorBlue';
  }
  /*
      Polymer looks for this method
      to render on screen
  */


  static get template() {
    return `
<style>
    .polymer_container {
        border:3px solid black;
        padding:1em;
        background-color:#f2f2f2;
    }
    .dragme {
        background-color:white;
        border:1px solid black;
        padding:1em;
        cursor:pointer;
        position:absolute;
        top:300px;
        left:300px;
        user-select:none;
    }
    .divColorBlue {
        height:50px;
        margin-top:0.5em;
        background-color:blue;
        padding:0.5em;
    }
    .divColorGreen {
        height:50px;
        margin-top:0.5em;
        background-color:green;
        padding:0.5em;
    }
</style>
<div class="polymer_container">
    <b>My Polymer 3 Toolkit</b>
    
    <div class="dragme" id="student" on-track="handleTrack">Hey, [[name]]. Drag me all other the screen</div>
    
    <div style="margin-top:1em;">
        <p>Current value: [[name]]</p>
        <input type="text" id="newValue" placeholder="Enter your name" />
        <button on-click="changeParameter" style="margin:0.5em;">
            Change Name
        </button>
    </div>

    <div style="margin-top:1em;">
        <button on-click="toggleColor">
            Toggle color
        </button>
        <div id="divColor" class="{{classToAdd}}">
            <p>Click the button above to change this background color rom blue to green!</p>
        </div>
    </div>

</div>
        `;
  }

  toggleColor() {
    this.$.divColor.classList.remove("divColorBlue");
    this.$.divColor.classList.remove("divColorGreen");
    this.classToAdd = this.classToAdd == "divColorBlue" ? "divColorGreen" : "divColorBlue";
    this.$.divColor.classList.add(this.classToAdd);
  }

  changeParameter(e) {
    this.name = this.$.newValue.value;
  }

  handleTrack(e) {
    if (e.detail.state == 'track') {
      let mouseX = e.detail.x;
      let mouseY = e.detail.y;
      let newX = mouseX - this.$.student.offsetWidth;
      let newY = mouseY - this.$.student.offsetHeight;
      this.$.student.style.left = newX + 'px';
      this.$.student.style.top = newY + 'px';
    }
  }
  /*
      Polymer looks for this method
      to get / analyze properties
  */


  static get properties() {
    return {
      name: {
        type: String,
        value: 'Default value for name'
      }
    };
  }
  /*
      Which attributes are being observed
  */


  observedAttributes() {
    return ['name'];
  }
  /*
      Callback when an attribute changes
  */


  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Attribute changed to: " + newValue);
    if (name == 'name') this.name = newValue;
  }

}

customElements.define('my-app', MyApp);