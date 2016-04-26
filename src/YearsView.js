'use strict';

var React = require('react'),
	handleMouseDown = require('./utils').handleMouseDown
;

var DOM = React.DOM;
var DateTimePickerYears = React.createClass({
	render: function() {
		var year = parseInt(this.props.viewDate.year() / 10, 10) * 10;

		return DOM.div({ className: 'rdtYears' },[
			DOM.table({ key: 'a'}, DOM.thead({}, DOM.tr({},[
				DOM.th({
          key: 'prev',
          className: 'rdtPrev',
          onMouseDown: handleMouseDown(this.props.subtractTime(10, 'years'))
        }, DOM.span({ type: 'button' }, '‹')),
				DOM.th({
          key: 'year',
          className: 'rdtSwitch',
          colSpan: 2,
          onMouseDown: handleMouseDown(this.props.showView('years'))
        }, year + '-' + (year + 9) ),
				DOM.th({
          key: 'next',
          className: 'rdtNext',
          onMouseDown: handleMouseDown(this.props.addTime(10, 'years'))
        }, DOM.span({ type: 'button' }, '›'))
				]))),
			DOM.table({ key: 'years'}, DOM.tbody({}, this.renderYears( year )))
		]);
	},

	renderYears: function( year ) {
		var years = [],
			i = -1,
			rows = [],
			renderer = this.props.renderYear || this.renderYear,
			selectedDate = this.props.selectedDate,
			classes, props
		;

		year--;
		while (i < 11) {
			classes = 'rdtYear';
			if( i === -1 | i === 10 )
				classes += ' rdtOld';
			if( selectedDate && selectedDate.year() === year )
				classes += ' rdtActive';

			props = {
				key: year,
				'data-value': year,
				className: classes,
				onMouseDown: handleMouseDown(this.props.setDate('year'))
			};

			years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

			if( years.length == 4 ){
				rows.push( DOM.tr({ key: i }, years ) );
				years = [];
			}

			year++;
			i++;
		}

		return rows;
	},

	renderYear: function( props, year, selectedDate ){
		return DOM.td( props, year );
	}
});

module.exports = DateTimePickerYears;
