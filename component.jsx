import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.styl';
import _ from 'lodash';

var LinkedStateMixin = require('./node_modules/react-addons-linked-state-mixin');

var SelectField = require('./node_modules/material-ui/lib/select-field'),
		NameElement = require('./node_modules/material-ui/lib/text-field'),
		EmailElement = require('./node_modules/material-ui/lib/text-field'),
		CheckBox = require('./node_modules/material-ui/lib/checkbox'),
		TextArea = require('./node_modules/material-ui/lib/enhanced-textarea'),
		SubmitBut = require('./node_modules/material-ui/lib/raised-button'),
		List = require('material-ui/lib/lists/list'),
		ListItem = require('material-ui/lib/lists/list-item');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var selectItems = [
	{ payload: '1', text: 'Motorola Droid Bionic' },
	{ payload: '2', text: 'Samsung Infuse' },
	{ payload: '3', text: 'Samsung Galaxy S II' },
	{ payload: '4', text: 'HTC Evo 4G' },
	{ payload: '5', text: 'Xiaomi Mi 2' }
];



var FirstForm = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function(){
		return({Name:'', Email:'', Product:'', Comments:''});
	},
	_onInputFocus: function(el){
		this.refs[el].setErrorText('');
	},
	_onSubmitForm: function(e) {
		e.preventDefault();
		var errorPosition=[];
		for(var key in this.state) {
			if(this.state[key]==''&&this.refs.hasOwnProperty(key)) {
				this.refs[key].setErrorText('Field can\'t be empty');
				errorPosition.push(ReactDOM.findDOMNode(this.refs[key]).offsetTop);
			}
		}
		if(errorPosition.length>=1) {
			window.scrollTo(0,errorPosition[0]);
		}
		if(errorPosition.length == 0){
			console.log('length=0');
			this.props.transmitValue(this.state);
		}

	},
	render: function(){
		return(
				<form className="form" action="" onSubmit={this._onSubmitForm}>
					<div className="form__title">Choose an appropriate product</div>
					<div>
						<NameElement  hintText="Enter your name" ref="Name" valueLink = {this.linkState('Name')}
						              onChange={this._onInputFocus.bind(this, 'Name')}/>
					</div>
					<div>
						<EmailElement
								hintText="Enter your email" ref="Email" valueLink = {this.linkState('Email')}
								onFocus={this._onInputFocus.bind(this, 'Email')}/>
					</div>
					<div>
						<SelectField
								selectedIndex={0}
								labelStyle={{background: 'none transparent'}}
								menuItems={selectItems}
								valueLink = {this.linkState('Product')}
								/>
					</div>
					<div>
						<CheckBox
								name="mailing"
								value="mailing"
								label="I want to get news about fresh updates"/>
					</div>
					<div>
						<TextArea rows={10} rowsMax={10} className="form__comments"
						          valueLink = {this.linkState('Comments')}
						          placeholder="Some comments..."/>
					</div>
					<div className="form__submit">
						<SubmitBut type="submit" label="Submit form" secondary={true}/>
					</div>

				</form>
		)
	}
});
var Sidebar = React.createClass({
	renderList: function(){
		let text = _.map(this.props.receiveData, (value, index) => {
        	let itemValue =  ('Product' === index) ?
					_.findWhere(selectItems, { 'payload': value}) :
					value;
		    itemValue = (itemValue && itemValue.text) ? itemValue.text : itemValue;
			return (<ListItem key={index} primaryText={index} secondaryText={value} />);
		})

		return text;
	},
	render: function(){
		return(<div className="form-sidebar">
			<List>
				{this.renderList()}
			</List>
		</div>);
	}
});

var FormWrap = React.createClass({
	getInitialState: function(){
		return({Name:'', Email:'', Product:'', Comments:''});
	},
	getValue: function(data){
		this.setState(data);
	},
	render: function(){
		return(
				<div className="form-wrap">
					<FirstForm transmitValue={this.getValue}/>
					<Sidebar receiveData={this.state}/>
				</div>
		)
	}
});


ReactDOM.render(
		<FormWrap />,
		document.getElementById('app')
);