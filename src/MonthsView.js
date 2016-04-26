'use strict';

var React = require('react'),
  moment = require('moment'),
	handleMouseDown = require('./utils').handleMouseDown
;

var DOM = React.DOM;
var DateTimePickerMonths = React.createClass({
	render: function() {
		return DOM.div({ className: 'rdtMonths' },[
			DOM.table({ key: 'a'}, DOM.thead({}, DOM.tr({},[
				DOM.th({
          key: 'prev',
          className: 'rdtPrev',
          onMouseDown: handleMouseDown(this.props.subtractTime(1, 'years'))
        }, DOM.span({ type: 'button' }, '‹')),
				DOM.th({
          key: 'year',
          className: 'rdtSwitch',
          colSpan: 2,
          'data-value': this.props.viewDate.year(),
          onMouseDown: handleMouseDown(this.props.showView('years'))
        }, this.props.viewDate.year() ),
				DOM.th({
          key: 'next',
          className: 'rdtNext',
          onMouseDown: handleMouseDown(this.props.addTime(1, 'years'))
        }, DOM.span({ type: 'button' }, '›'))
			]))),
			DOM.table({ key: 'months'}, DOM.tbody({ key: 'b'}, this.renderMonths()))
		]);
	},

	renderMonths: function() {
		var date = this.props.selectedDate,
			month = this.props.viewDate.month(),
			year = this.props.viewDate.year(),
			rows = [],
			i = 0,
			months = [],
			renderer = this.props.renderMonth || this.renderMonth,
			classes, props
		;

		while (i < 12) {
			classes = "rdtMonth";
			if( date && i === month && year === date.year() )
				classes += " rdtActive";

			props = {
				key: i,
				'data-value': i,
				className: classes,
				onMouseDown: handleMouseDown(this.props.setDate('month'))
			};

			months.push( renderer( props, i, year, date && date.clone() ));

			if( months.length == 4 ){
				rows.push( DOM.tr({ key: month + '_' + rows.length }, months) );
				months = [];
			}

			i++;
		}

		return rows;
	},

	renderMonth: function( props, month, year, selectedDate ) {
		return DOM.td( props, this.props.viewDate.localeData()._monthsShort[ month ] );
	}
});

module.exports = DateTimePickerMonths;
