import React from 'react';
import { BarChart , Bar , XAxis , YAxis , CartesianGrid , Tooltip , Legend , Cell , ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';

const CustomBarChart = ({data}) => {
  // Function to alternate colors for bars
  const getBarColor = (index) => index % 2 === 0 ? '#875cf5' : '#cfbefb';

  const CustomToolTip = ({active , payload}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
          <p className="text-sm text-gray-600">
              Amount :{" "} <span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
          </p>
        </div>
      );
    }

    return null;
  }

//   if (!data || data.length === 0) {
//     return <div className='bg-white mt-6 p-4'>No data to display</div>;
//   }

  return (
    <div className='bg-white mt-6'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} /*margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barSize={20}*/ >
          {/* <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Legend /> */}
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{fontSize : 12 , fill : '#555'}} stroke='none'/>
          <YAxis tick={{fontSize : 12 , fill : '#555'}} stroke='none'/>
          <Tooltip content={CustomTooltip}/>
          <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]} activeDot={{ r: 8 , fill : 'yellow'}} activeStyle={{fill : 'green'}}>
            {Array.isArray(data) ? data.map((entry , index) => <Cell key={`cell-${index}`} fill={getBarColor(index)} />) : null}
            // add array.isarray if condition
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
