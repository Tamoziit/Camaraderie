import { BudgetSplitterItem } from "../types";

const calculateBudgetSplitter = (budgetSplitter: BudgetSplitterItem[]) => {
    const totalExpenditure = budgetSplitter.reduce(
        (sum: number, item: any) => sum + item.expenditure,
        0
    );

    const numberOfUsers = budgetSplitter.length;
    const averageShare = totalExpenditure / numberOfUsers;

    const updatedSplitter = budgetSplitter.map((item: any) => {
        const diff = +(item.expenditure - averageShare).toFixed(2);

        const toGive = diff < 0
            ? Math.max(+(Math.abs(diff) - item.received).toFixed(2), 0)
            : 0;

        const toReceive = diff > 0
            ? Math.max(+(diff - item.received).toFixed(2), 0)
            : 0;

        return {
            ...item,
            toGive,
            toReceive
        };
    });

    return updatedSplitter;
};

export default calculateBudgetSplitter;