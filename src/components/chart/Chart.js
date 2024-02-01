import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart({ initialInvestment, budgets, budgetType, income, headline, description }) {
    const [chartData, setChartData] = useState([]);
    const [years, setYears] = useState(50);
    const interestRate = 7;

    function calculateFutureValue(P, r, n, t, PMT) {
        // P is the initial principal balance
        // r is the annual interest rate
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
            let data = [];

            if (budgetType === 'investment') {
                for (let i = 0; i <= years; i++) {
                    data.push({
                        time: `${currentDate.getFullYear() + i}`,
                        investment: calculateFutureValue(initialInvestment, interestRate, 12, i, budgets.investment * income)
                    });
                }
            } else if (budgetType === 'savings') {
                for (let i = 0; i <= years; i++) {
                    data.push({
                        time: `${currentDate.getFullYear() + i}`,
                        savings: budgets.savings * income * 12 * i
                    });
                }
            }

            return data;
        }

        setChartData(generateChartData());

    }, [budgets, income, budgetType, initialInvestment, years]);

    return (
        <div className='container'>
            <div className='headerElement'>
                <div className='w-1/2'>
                    <div className='headline'>{headline}</div>
                    <div className='description'>{description}</div>
                </div>
                <div className='flex justify-end w-1/2'>
                    <div className={`btn-sq ${years === 10 ? 'btn-focus' : ''}`} onClick={() => setYears(10)}>10y</div>
                    <div className={`btn-sq ${years === 20 ? 'btn-focus' : ''}`} onClick={() => setYears(20)}>20y</div>
                    <div className={`btn-sq ${years === 30 ? 'btn-focus' : ''}`} onClick={() => setYears(30)}>30y</div>
                    <div className={`btn-sq ${years === 50 ? 'btn-focus' : ''}`} onClick={() => setYears(50)}>50y</div>
                </div>
            </div>

            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    {budgetType === 'investment' && <Line type="monotone" dataKey="investment" stroke="#8884d8" />}
                    {budgetType === 'savings' && <Line type="monotone" dataKey="savings" stroke="#82ca9d" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;