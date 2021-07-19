import React, { Component } from 'react'
import Board from '../../components/Board/board.component'
import { signout } from '../homepage/homepage.api-calls'
import {Redirect,Link} from 'react-router-dom'
import { isAuthenticated } from '../homepage/homepage.api-calls'
export default class Scoreboard extends Component {
    onsubmit = () => {
        signout();
        return <Redirect to='/' />
    }
    render() {
        if(isAuthenticated()) {
            return (
                <div className="bg-gray-100 h-screen w-screen">
                    <h1 className="py-4 mb-6 text-center font-black lg:text-5xl">Welcome to Admin Dashboard</h1>
                <Board className="pt-4"/>
                <Link>
                <button
                className="group relative mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/2 mt-6"
                onClick={this.onsubmit}
                >
                Sign Out
                </button>
                </Link>
                </div>
            )
        }
        return (<Redirect to="/"/>)
    }
}
