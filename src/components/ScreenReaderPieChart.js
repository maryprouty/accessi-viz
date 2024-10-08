import {React} from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Dashboard.css';

require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/sonification')(Highcharts);

export default function ScreenReaderPieChart({seriesData}) {

    // Removing overflow: hidden style so chart doesn't get clipped.
    const chartCallback = (chart) => {

        const domChart = document.getElementsByClassName('viz-container')[0]?.firstChild;
        domChart.style = '';

    }

    let options = {
        accessibility: {
            enabled: true,
            keyboardNavigation: {
                enabled: true,
                seriesNavigation:{
                    mode:'normal' 
                }
            },
            description: "A pie chart of the primary screen readers used on desktop for the selected year.",
            screenReaderSection: {
                afterChartFormat: null
            }
        },
        caption: {
            text: "A pie chart of the primary screen readers used on desktop for the selected year."
        },
        chart: {
            type: 'pie',
            borderColor: 'rgb(209, 217, 224)',
            borderRadius: 5,
            borderWidth: 1,
            allowMutatingData: false,
            animation: true
        },
        colors: ['#4059AD', '#6B9AC4', '#97D8C4', '#F4B982'],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true,
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                }
            }
        },
        title: {
        text: 'Primary Screen Reader',
        align: 'left'
        },
        series: [{
            name: 'Number of Respondents',
            colorByPoint: true,
            data: [...seriesData],
            dataLabels: {
                format: '{point.name}<br>{point.percentage:.1f}%',
            }
        }]
    }

    return (
        <div id='sr-viz' className='viz-container'>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                callback={chartCallback}
            /> 

        </div>
    );
}    