import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import web3 from 'web3';
import initiWeb3 from './web3';
import contract from './contract';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kissanNum: '',
            registerUser: false,
            accounts: [],
            tokenbalance: null,
            balance: null,
            receiver: '',
            amount: 0
        }
        this.getValues = this.getValues.bind(this);
        this.sendAmount = this.sendAmount.bind(this);

    }
    async componentDidMount() {

        const accounts = await initiWeb3.eth.getAccounts();
        let tokenbalance = null;
        let balance = null
        if (accounts.length > 0) {
            balance = await initiWeb3.eth.getBalance(accounts[0]);
            tokenbalance = await contract.methods.balanceOf(accounts[0]).call();
        }
        this.setState({
            accounts: accounts,
            balance: balance,
            tokenbalance: tokenbalance
        })
    }
    getValues(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    sendAmount(){
        web3.sendTransaction({to:this.state.receiver, from:this.state.accounts[0], value: web3.utils.toHex(web3.utils.toWei(this.state.amount, 'ether'))});
    }
    render() {
        return (
            <Paper className="loginContianer" zDepth={1}>

                {this.state.accounts.length === 0 ? <div>connect to metamask <button onClick={async () => {

                    if (window.ethereum) {
                        window.web3 = new web3(window.ethereum);
                        try {
                            await window.ethereum.enable();
                        } catch (error) {
                        }
                    }
                    else {
                        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                    }
                }
                }>open</button></div> : <span>welcome
                    <p>connected account : {this.state.accounts[0]}</p>
                    <p>eth balance = {this.state.balance !== null && this.state.balance}   </p>                  <p> token balance = {this.state.tokenbalance !== null && this.state.tokenbalance}</p>
                    <div>
                        <form>
                            <input onChange={this.getValues} placeholder ="enter amount" name="amount" />
                            <input onChange={this.getValues} placeholder="receiver address" name="receiver"/>
                            <button onClick={this.sendAmount}>Send</button>
                        </form>
                    </div>
                    </span>}


            </Paper>
        )
    }
};
export default withRouter(Login);