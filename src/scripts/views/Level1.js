import React from "react";
import BasicLevel from "./BasicLevel";

import Level1Mechanics from "../classes/Level1Mechanics";

let l1m = new Level1Mechanics();

export default class Level1 extends React.Component {
    constructor() {
        super();

        this.env = {
            ctx: null,
            width: 0,
            height: 0,
        };

        this.start = this.start.bind(this);
        this.loop = this.loop.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    start() {
        let canvas = document.getElementById("level1"),
            ctx = canvas.getContext("2d"),
            width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight;

        l1m.init(width, height);

        this.env = {
            ctx,
            width,
            height
        };

        this.loop();
    }

    loop() {
        l1m.update();
        l1m.draw(this.env.ctx);
        requestAnimationFrame(this.loop);
    }

    render() {
        return (
            <div>
                <canvas id="level1"></canvas>
            </div>
        )
    }
}