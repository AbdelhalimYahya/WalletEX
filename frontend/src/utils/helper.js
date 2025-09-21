import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test((email));
};

export const getInitials = (name) => {
    if (!name) return "";
    
    const words = name.split(" ");
    let initials = "";

    for (let i = 0 ; i < Math.min(words.length , 2) ; i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "0";

    const [integerPart , FractionalPart] = num.toString().split(".");
    const formatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g , ",");

    return `${formatedInteger}${FractionalPart ? `.${FractionalPart}` : ""}`;
};

export const prepareExpenseBarChartData = (data = []) => {
    const ChartData = data.map((item) => {
        return {
            category: item.category , 
            amount: item.amount
        }
    }) 

    return ChartData;
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a , b) => new Date(a.date) - new Date(b.date)); // Sort data by date in descending order
    const ChartData = sortedData.map((item) => ({
        month: moment(item?.date).format("MMM") ,
        amount: item?.amount,
        source: item?.source,
    }))

    return ChartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a , b) => new Date(a.date) - new Date(b.date)); // Sort data by date in descending order
    const ChartData = sortedData.map((item) => ({
        month: moment(item?.date).format("MMM DD") ,
        amount: item?.amount,
        category: item?.category,
    }))

    return ChartData;
};