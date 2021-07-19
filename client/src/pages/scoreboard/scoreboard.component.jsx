import React, { Component } from 'react'
import Board from '../../components/Board/board.component'
import { signout } from '../homepage/homepage.api-calls'
import {Redirect} from 'react-router'
export default class Scoreboard extends Component {
    onsubmit = () => {
        signout();
        return <Redirect to='/' />
    }
    render() {
        return (
            <div className="bg-gray-100 h-screen">
                <h1 className="py-4 mb-6 text-center font-black text-5xl">Welcome to Admin Dashboard</h1>
                <p className="py-4 mb-6 text-center font-bold text-3xl">
                    Hi! {this.props.user.name.toUpperCase()}
                </p>
            <Board className="pt-4"/>
            <button
              className="group relative mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/2 mt-6"
              onClick={this.onsubmit}
            >
              Sign Out
            </button>
            </div>
        )
    }
}
