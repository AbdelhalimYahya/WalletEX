import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId , Types } from "mongoose";

// Dashboard Data
export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        // Fetch total income and expense
        const totalIncome = await Income.aggregate([{$match: {userId: userObjectId}} , {$group: {_id: null , totalIncome: {$sum: "$amount"}}}]);
        console.log("totalIncome" , {totalIncome , userId : isValidObjectId(userId)});
        const totalExpense = await Expense.aggregate([{$match: {userId: userObjectId}} , {$group: {_id: null , totalExpense: {$sum: "$amount"}}}]);
        console.log("totalExpense" , {totalExpense , userId : isValidObjectId(userId)});

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);

        // Get expense transactions in the last 60 days
        const last60DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total expense for last 60 days
        const expenseLast60Days = last60DaysExpenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);

        // Fetch last 5 transactoins ( income + expense )
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({...txn.toObject() , type: "income"})),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({...txn.toObject() , type: "income"})),
        ].sort((a , b) => b.date - a.date); // Sort latest first

        // Final response
        res.json({
            // This 60 or 30 expenses days you can manage it from here
            totalBalance: (totalIncome[0]?.totalIncome || 0) - (totalExpense[0]?.totalExpense || 0),
            totalIncome: totalIncome[0]?.totalIncome || 0,
            totalExpense: totalExpense[0]?.totalExpense || 0,
            last60DaysExpenses: {total: expenseLast60Days , transactions: last60DaysExpenseTransactions},
            last60DaysIncome: {total: incomeLast60Days , transactions: last60DaysIncomeTransactions},
            recentTransactions: lastTransactions
        })

    } catch (error) {
        res.status(500).json({ message: "server Error" , error });
    }
}