import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
	state = {
		seenIndexes: []
		,values: {}
		,index: ''
	};
	
	componentDidMount() {
		this.fetchValues();
		this.fetchIndexes();
	};

	async fetchValues() {
		try {
			const values = await axios.get('/api/values/current');
			this.setState( {values: values.data} );
			console.log("@ fetchValues():", values.data );
		} catch (error) {
			console.log(`Error @ fetchValues(): ${error} `);
		}
	};

	async fetchIndexes() {
		try {
			const seenIndexes = await axios.get('/api/values/all');
			this.setState( {seenIndexes: seenIndexes.data} );
			console.log("@ fetchIndexes():", JSON.stringify(seenIndexes) );
			
		} catch (error) {
			console.log(`Error @ fetchIndexes(): ${error} `);
		}
	};

	renderSeenIndexes() {
		return this.state.seenIndexes.map( ({number}) => number ).join(', ');
	};
	
	handleSubmit = async (event) => {
		event.preventDefault();
		await axios.post('/api/values', {index: this.state.index});
		this.setState({index: ''});
	};

	renderValues() {
		let entries = [];

		console.log("@ renderValues() :", this.state.values );
		for(let key in this.state.values) {
			entries.push(
				<div key={key}>
					Fib for {key} is {this.state.values[key]} 
				</div>
			);			
		}
		console.log("entries: "+entries.length);
		return entries;
	};

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Fibonacci I want to look for:</label>
					<p>
						<input 
							value={this.state.index}
							onChange={ event => this.setState( {index: event.target.value} ) }
						/>
					</p>
					<p>
						<button>Submit</button>
					</p>	
				</form>

				<h3>Indices I've seen:</h3>
				{ this.renderSeenIndexes() }

				<h3>Calculated values:</h3>
				{ this.renderValues() }
			</div>
		);
	};

}

export default Fib;