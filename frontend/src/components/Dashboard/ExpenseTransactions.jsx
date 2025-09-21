import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseTransactions = ({transactions , onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex justify-between items-center'>
        <h5 className='text-lg'>Expenses</h5>
        <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
      </div>

      <div className='mt-6'>
        {transactions?.slice(0, 4)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.category}
            icon={item.icon}
            date={moment(item.date).format("MMM DD, YYYY")}
            amount={item.amount}
            // category={expense.category}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseTransactions
