import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Chart.css'

function Chart({ initialInvestment, monthlyInvestmentContribution }) {
    const [endDate, setEndDate] = useState(new Date());
    const [chartData, setChartData] = useState([]);
    const interestRate = 7;

    function calculateFutureValue(P, r, n, t, PMT) {
        // P is the initial principal balance
        // r is the annual interest rate (in decimal form)
        // n is the number of times that interest is compounded per unit 
        // t is the time the money is invested for in years
        // PMT is the monthly contribution

        r = r / 100;
        const compoundInterest = P * Math.pow(1 + r / n, n * t);
        const futureValueSeries = PMT * (Math.pow(1 + r / n, n * t) - 1) / (r / n);
        const futureValue = compoundInterest + futureValueSeries;
        
        return futureValue;
      }

    useEffect(() => {
        const generateChartData = () => {
            const currentDate = new Date();
            const years = endDate.getFullYear() - currentDate.getFullYear();
            let data = [];

            for (let i = 0; i <= years; i++) {
                data.push({
                    time: `${currentDate.getFullYear() + i}`,
                    investment: calculateFutureValue(initialInvestment, interestRate, 12, i, monthlyInvestmentContribution)
                });
            }

            return data;
        }

        setChartData(generateChartData());

    }, [endDate, initialInvestment, monthlyInvestmentContribution]);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <div>
                <label>Select End Date: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy"
                    showYearPicker
                    minDate={new Date()}
                />
            </div>

            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="investment" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;