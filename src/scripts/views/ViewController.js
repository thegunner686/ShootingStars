import React from "react";


import Menu from "./Menu";
import Level1 from "./Level1";

export default class ViewController extends React.Component {
    constructor() {
        super();

        this.state = {
            currentView: <Level1/>
        }
    }

    render() {
        return (
            <div>
                {this.state.currentView}
            </div>
        )
    }
}