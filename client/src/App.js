import React from 'react';
import WelcomeContract from './artifacts/WelcomeContract.json'
import { DrizzleContext } from '@drizzle/react-plugin'
import { Drizzle } from "@drizzle/store";
import Web3 from "web3"
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;
const drizzleOptions = {
    web3: {
        block: false,
        customProvider: new Web3("ws://localhost:7545"),
    },
    contracts: [WelcomeContract]
}
const drizzle = new Drizzle(drizzleOptions);
function App() {
    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;
                    if (!initialized) {
                        return "Loading..."
                    }
                    return (
                        <div>
                            <h5>Current Welcome:</h5>
                            <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="WelcomeContract"
                                method="getWelcome" />
                            <h5>Set Welcome:</h5>
                            <ContractForm
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="WelcomeContract"
                                method="setWelcome" />
                        </div>
                    )
                }}
            </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    );
}
export default App;
