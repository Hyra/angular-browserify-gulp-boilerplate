module.exports = function() {
		
		var me = {
			naam: 'Initial var'
		};

		return {
			getVar: function() {
				return me;
			},
			setVar: function(naam) {
				me.naam = naam;
			}
		};

};

