import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.styl';

var SelectField = require('./node_modules/material-ui/lib/select-field'),
		NameElement = require('./node_modules/material-ui/lib/text-field'),
		EmailElement = require('./node_modules/material-ui/lib/text-field'),
		CheckBox = require('./node_modules/material-ui/lib/checkbox'),
		TextArea = require('./node_modules/material-ui/lib/enhanced-textarea'),
		SubmitBut = require('./node_modules/material-ui/lib/raised-button');
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
	//_onClickMenu:function(){
	//	this.setState({ open: true });
	//},
	_onInputFocus: function(el){
		this.refs[el].setErrorText('');
	},
	_onSubmitForm: function(e) {
		var errorPosition=[];
		e.preventDefault();
		for(var key in this.refs){
			if(this.refs[key].props['data-require']=='true' && this.refs[key].getValue()=='') {
				this.refs[key].setErrorText('Field can\'t be empty');
				errorPosition.push(ReactDOM.findDOMNode(this.refs[key]).offsetTop);
			}
		}
		if(errorPosition.length>=1) {
			window.scrollTo(0,errorPosition[0]);
		}
	},
	render: function(){
		return(
				<form className="form" action="" onSubmit={this._onSubmitForm}>
					<div className="form__title">Choose an appropriate product</div>
					<div>
						<NameElement  hintText="Enter your name" ref="name" data-require="true"
						              onFocus={this._onInputFocus.bind(this, 'name')}/>
					</div>
					<div>
						<EmailElement
								hintText="Enter your email" ref="email"  data-require="true"
								onFocus={this._onInputFocus.bind(this, 'email')}/>
					</div>
					<div>
						<SelectField
								labelStyle={{background: 'none transparent'}}
								menuItems={selectItems} />
					</div>
					<div>
						<CheckBox
								name="mailing"
								value="mailing"
								label="I want to get news about fresh updates"/>
					</div>
					<div>
						<TextArea rows={10} rowsMax={10} className="form__comments" placeholder="Some comments..."/>
					</div>
					<div className="form__submit">
						<SubmitBut type="submit" label="Submit form" secondary={true}/>
					</div>

				</form>
		)
	}
});

ReactDOM.render(
		<FirstForm />,
		document.getElementById('app')
);