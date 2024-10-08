import {useState, React} from 'react'
import surveyResults from '../data/surveyResults.json';
import ScreenReaderPieChart from './ScreenReaderPieChart';
import BrowserPieChart from './BrowserPieChart';
import LineGraph from './LineGraph';
import { getYearsList, processLineGraphSeries } from '../utils/util';
import './Dashboard.css';

// Along with chart.allowMutatingData = false, this prevents Highcharts from mutating the source data array.
const getOriginalData = () => {
    return surveyResults.resultsByYear;
};

const getLineGraphData = () => {
    return processLineGraphSeries(surveyResults.resultsByYear);
}

const getYears = () => {
    return getYearsList(surveyResults.resultsByYear);
}

export default function Dashboard() {

    const [year, setYear] = useState('2021');

    const originalData = getOriginalData();
    let yearData = originalData.find((results) => results.year === year);

    const liveMessage = `Displaying pie charts for the year ${year}.`;

    return (
        <div>
            <div className='visually-hidden' aria-live='assertive' role='alert'>
                <span>{liveMessage}</span>
            </div>
            <div className='intro-container'>
                <div className='intro-inner-container'>
                    <h1>Screen Reader User Preferences</h1>
                    <span>
                        This dashboard demonstrates the&nbsp;
                        <a href='https://webaim.org/projects/screenreadersurvey9/' target='_blank' rel='noreferrer'>WebAIM Screen Reader User Survey</a>
                        &nbsp;results for which primary&nbsp;
                        <a href='#footnote'>screen reader</a>
                        *&nbsp;and browser that respondents prefer. Each pie chart is filtered by the Survey Year.
                    </span>
                    <form>
                        <label htmlFor='survey-date'>Survey Year</label>
                        <select value={year} id='survey-date' onChange={e => setYear(e.target.value)}>
                            <option value='2021'>2021</option>
                            <option value='2019'>2019</option>
                            <option value='2017'>2017</option>
                            <option value='2015'>2015</option>
                            <option value='2014'>2014</option>
                            <option value='2012'>2012</option>
                            <option value='2010'>2010</option>
                            <option value='2009'>2009</option>
                        </select>
                    </form>
                </div>
            </div>
            <div id='dashboard'>
                <div className="dashboard-row-container">
                    <ScreenReaderPieChart 
                        seriesData={yearData.primaryScreenReader}
                    />
                    <BrowserPieChart
                        seriesData={yearData.primaryBrowser}
                    />
                </div>
                <div>
                    <LineGraph
                        seriesData={getLineGraphData()}
                        years={getYears()}
                    />
                </div>
            </div>
            <div>
                <p id='footnote'>* Screen readers are a type of assistive technology that translate digital content into audio or braille.
                They allow people with visual or cognitive disabilities to navigate digital content.</p>
            </div>
        </div>
    )
}