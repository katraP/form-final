/**
 * Created by Kateryna_Porkhun on 11/16/2015.
 */
var log = {
	writeState: function(){
		for(var key in this.state){
			console.log(key + ": "+ (this.state[key]==''?'empty':this.state[key]));
		}
	},
	componentDidMount: function(){
		var self = this;
		setInterval(function(){
			self.writeState();
		},2000);
	}
};
module.exports = log;