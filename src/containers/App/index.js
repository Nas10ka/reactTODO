// Core
import React, { Component } from 'react';

// Instruments
import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';

export default class App extends Component {
    render () {
        return (
            <section>
                <Catcher>
                    <Feed />
                </Catcher>
            </section>
        );
    }
}
